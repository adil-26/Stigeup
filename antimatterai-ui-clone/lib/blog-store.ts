import "server-only"

import crypto from "node:crypto"
import type { BlogPost, ContactSubmission } from "@/lib/blog-types"
import { readRepoJson, writeRepoJson } from "@/lib/github-json-store"
import { notify } from "@/lib/notify"

const POSTS_PATH = "data/blog/posts.json"
const CONTACTS_PATH = "data/contact/submissions.json"

type PostsFile = {
  posts: BlogPost[]
}

type ContactsFile = {
  submissions: ContactSubmission[]
}

function sortByUpdatedDesc(a: BlogPost, b: BlogPost) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
}

export async function getAllPosts() {
  const file = await readRepoJson<PostsFile>(POSTS_PATH, { posts: [] })
  return file.posts.slice().sort(sortByUpdatedDesc)
}

export async function getPublishedPosts() {
  const posts = await getAllPosts()
  return posts.filter((p) => p.published)
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts()
  return posts.find((p) => p.slug === slug)
}

export async function upsertPost(input: BlogPost) {
  const now = new Date().toISOString()
  const file = await readRepoJson<PostsFile>(POSTS_PATH, { posts: [] })

  const existingIndex = file.posts.findIndex((p) => p.slug === input.slug)
  const existing = existingIndex >= 0 ? file.posts[existingIndex] : null
  const wasPublished = Boolean(existing?.published)
  if (existingIndex >= 0) {
    file.posts[existingIndex] = {
      ...existing,
      ...input,
      updatedAt: now,
      createdAt: existing?.createdAt || now,
    }
  } else {
    file.posts.unshift({
      ...input,
      createdAt: input.createdAt || now,
      updatedAt: now,
    })
  }

  await writeRepoJson(POSTS_PATH, file, `Update blog post: ${input.slug}`)

  if (input.published && (!wasPublished || !existing)) {
    await notify({
      type: "blog_published",
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      tags: input.tags,
    })
  }
  return input.slug
}

export async function deletePost(slug: string) {
  const file = await readRepoJson<PostsFile>(POSTS_PATH, { posts: [] })
  const next = file.posts.filter((p) => p.slug !== slug)
  await writeRepoJson(POSTS_PATH, { posts: next }, `Delete blog post: ${slug}`)
}

export async function createContactSubmission(input: Omit<ContactSubmission, "id" | "createdAt">) {
  const now = new Date().toISOString()
  const file = await readRepoJson<ContactsFile>(CONTACTS_PATH, { submissions: [] })
  const submission: ContactSubmission = {
    id: crypto.randomUUID(),
    createdAt: now,
    ...input,
  }

  file.submissions.unshift(submission)
  await writeRepoJson(CONTACTS_PATH, file, `New contact submission: ${submission.email}`)

  await notify({
    type: "contact_submitted",
    name: submission.name,
    email: submission.email,
    company: submission.company,
    message: submission.message,
  })
  return submission.id
}

export async function getContactSubmissions() {
  const file = await readRepoJson<ContactsFile>(CONTACTS_PATH, { submissions: [] })
  return file.submissions.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}
