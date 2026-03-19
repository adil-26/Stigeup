import "server-only"

import fs from "node:fs"
import path from "node:path"

type GithubContentResponse = {
  type: "file"
  encoding: "base64"
  content: string
  sha: string
}

function getGithubConfig() {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || "main"

  if (!token || !owner || !repo) return null
  return { token, owner, repo, branch }
}

function decodeBase64Content(content: string) {
  const normalized = content.replace(/\n/g, "")
  return Buffer.from(normalized, "base64").toString("utf8")
}

function encodeBase64Content(text: string) {
  return Buffer.from(text, "utf8").toString("base64")
}

async function githubFetch(url: string, token: string, init?: RequestInit) {
  const res = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers || {}),
    },
  })

  return res
}

async function readJsonFromGithub<T>(filePath: string, fallback: T): Promise<{ data: T; sha?: string }> {
  const cfg = getGithubConfig()
  if (!cfg) return { data: readJsonFromDisk(filePath, fallback) }

  const apiPath = encodeURIComponent(filePath).replace(/%2F/g, "/")
  const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${apiPath}?ref=${encodeURIComponent(cfg.branch)}`
  const res = await githubFetch(url, cfg.token)
  if (res.status === 404) {
    return { data: fallback }
  }
  if (!res.ok) {
    throw new Error(`GitHub read failed (${res.status})`)
  }
  const json = (await res.json()) as GithubContentResponse
  const raw = decodeBase64Content(json.content)
  return { data: JSON.parse(raw) as T, sha: json.sha }
}

async function writeJsonToGithub<T>(filePath: string, data: T, message: string) {
  const cfg = getGithubConfig()
  if (!cfg) {
    writeJsonToDisk(filePath, data)
    return
  }

  const current = await readJsonFromGithub(filePath, null as unknown as T)
  const apiPath = encodeURIComponent(filePath).replace(/%2F/g, "/")
  const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${apiPath}`
  const content = encodeBase64Content(JSON.stringify(data, null, 2) + "\n")

  const body: Record<string, unknown> = {
    message,
    content,
    branch: cfg.branch,
  }
  if (current.sha) body.sha = current.sha

  const res = await githubFetch(url, cfg.token, {
    method: "PUT",
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub write failed (${res.status}): ${text}`)
  }
}

function readJsonFromDisk<T>(filePath: string, fallback: T): T {
  const full = path.join(process.cwd(), filePath)
  try {
    const raw = fs.readFileSync(full, "utf8")
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJsonToDisk<T>(filePath: string, data: T) {
  const full = path.join(process.cwd(), filePath)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, JSON.stringify(data, null, 2) + "\n", "utf8")
}

export async function readRepoJson<T>(filePath: string, fallback: T) {
  const { data } = await readJsonFromGithub(filePath, fallback)
  return data
}

export async function writeRepoJson<T>(filePath: string, data: T, message: string) {
  await writeJsonToGithub(filePath, data, message)
}

