"use client"

import { useEffect, useMemo, useState } from "react"
import type { BlogPost, ContactSubmission } from "@/lib/blog-types"

type Tab = "posts" | "contacts"

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

const emptyPost: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  coverImageAlt: "",
  tags: [],
  published: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export function AdminApp() {
  const [tab, setTab] = useState<Tab>("posts")
  const [authed, setAuthed] = useState(false)
  const [key, setKey] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const selectedPost = useMemo(
    () => posts.find((p) => p.slug === selectedSlug) || null,
    [posts, selectedSlug]
  )

  const [draft, setDraft] = useState<BlogPost>(emptyPost)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const res = await fetch("/api/admin/me", { cache: "no-store" })
        if (!cancelled) setAuthed(res.ok)
      } catch {
        if (!cancelled) setAuthed(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!authed) return
    void refresh()
  }, [authed])

  useEffect(() => {
    if (selectedPost) {
      setDraft(selectedPost)
      return
    }
    setDraft(emptyPost)
  }, [selectedPost])

  const refresh = async () => {
    setError(null)
    setBusy(true)
    try {
      const [postsRes, contactsRes] = await Promise.all([
        fetch("/api/admin/posts", { cache: "no-store" }),
        fetch("/api/admin/contacts", { cache: "no-store" }),
      ])
      if (!postsRes.ok || !contactsRes.ok) {
        throw new Error("Unauthorized")
      }
      const postsJson = (await postsRes.json()) as { posts: BlogPost[] }
      const contactsJson = (await contactsRes.json()) as { submissions: ContactSubmission[] }
      setPosts(postsJson.posts)
      setContacts(contactsJson.submissions)
      if (postsJson.posts.length > 0 && !selectedSlug) {
        setSelectedSlug(postsJson.posts[0].slug)
      }
    } catch {
      setError("Failed to load admin data")
    } finally {
      setBusy(false)
    }
  }

  const login = async () => {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      })
      if (!res.ok) {
        setError("Invalid admin key")
        setAuthed(false)
        return
      }
      setAuthed(true)
      setKey("")
    } catch {
      setError("Login failed")
    } finally {
      setBusy(false)
    }
  }

  const logout = async () => {
    setBusy(true)
    setError(null)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      setAuthed(false)
      setPosts([])
      setContacts([])
      setSelectedSlug(null)
      setDraft(emptyPost)
    } finally {
      setBusy(false)
    }
  }

  const startNew = () => {
    setSelectedSlug(null)
    setDraft({
      ...emptyPost,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  const save = async () => {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          tags: draft.tags.filter(Boolean),
        }),
      })
      if (!res.ok) throw new Error("Save failed")
      const json = (await res.json()) as { slug: string }
      await refresh()
      setSelectedSlug(json.slug)
    } catch {
      setError("Failed to save post")
    } finally {
      setBusy(false)
    }
  }

  const remove = async (slug: string) => {
    const ok = window.confirm(`Delete "${slug}"?`)
    if (!ok) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Delete failed")
      await refresh()
      setSelectedSlug(null)
      setDraft(emptyPost)
    } catch {
      setError("Failed to delete post")
    } finally {
      setBusy(false)
    }
  }

  if (!authed) {
    return (
      <div className="max-w-xl rounded-3xl border border-border bg-card/20 p-6 md:p-8">
        <p className="text-sm text-muted-foreground">Enter your admin key to continue.</p>
        <div className="mt-4 flex gap-3">
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="ADMIN_KEY"
            type="password"
            className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
          />
          <button
            onClick={login}
            disabled={busy || key.length === 0}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
          >
            Sign in
          </button>
        </div>
        {error ? <p className="mt-3 text-xs text-primary">{error}</p> : null}
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card/20">
      <div className="flex flex-col gap-4 border-b border-border p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("posts")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === "posts" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-card/50"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setTab("contacts")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === "contacts"
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-card/50"
            }`}
          >
            Contacts
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            disabled={busy}
            className="rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-card disabled:opacity-60"
          >
            Refresh
          </button>
          <button
            onClick={logout}
            disabled={busy}
            className="rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-card disabled:opacity-60"
          >
            Sign out
          </button>
        </div>
      </div>

      {error ? <div className="px-5 pt-4 text-xs text-primary">{error}</div> : null}

      {tab === "contacts" ? (
        <div className="p-4 md:p-5">
          {contacts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card/30 p-6 text-sm text-muted-foreground">
              No submissions yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="min-w-[860px] w-full border-collapse">
                <thead className="bg-card/40">
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id} className="border-t border-border text-sm">
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(c.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-foreground">{c.name}</td>
                      <td className="px-4 py-3">
                        <a
                          className="text-primary underline underline-offset-4"
                          href={`mailto:${c.email}`}
                        >
                          {c.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-foreground">{c.company || "—"}</td>
                      <td className="px-4 py-3 text-foreground">
                        <div className="max-w-[520px] whitespace-pre-wrap text-sm leading-relaxed">
                          {c.message}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[320px_1fr] md:gap-5 md:p-5">
          <div className="rounded-2xl border border-border bg-card/30">
            <div className="flex items-center justify-between border-b border-border p-4">
              <p className="text-sm font-medium text-foreground">Posts</p>
              <button
                onClick={startNew}
                className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition hover:brightness-110"
              >
                New
              </button>
            </div>
            <div className="max-h-[520px] overflow-auto">
              {posts.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground">No posts yet.</div>
              ) : (
                posts.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => setSelectedSlug(p.slug)}
                    className={`w-full border-b border-border px-4 py-3 text-left transition ${
                      selectedSlug === p.slug ? "bg-card/50" : "hover:bg-card/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium text-foreground">{p.title}</p>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] ${
                          p.published
                            ? "border-primary/40 text-primary"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="mt-1 truncate font-mono text-[10px] text-muted-foreground">
                      {p.slug}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/30 p-4 md:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Editor</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Use plain text. It renders with line breaks.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {draft.slug ? (
                  <a
                    href={`/blog/${draft.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-card"
                  >
                    Preview
                  </a>
                ) : null}
                {selectedSlug ? (
                  <button
                    onClick={() => remove(selectedSlug)}
                    disabled={busy}
                    className="rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-card disabled:opacity-60"
                  >
                    Delete
                  </button>
                ) : null}
                <button
                  onClick={save}
                  disabled={busy || draft.title.trim().length === 0}
                  className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground">Title</label>
                  <input
                    value={draft.title}
                    onChange={(e) => {
                      const nextTitle = e.target.value
                      setDraft((d) => ({
                        ...d,
                        title: nextTitle,
                        slug: d.slug || slugify(nextTitle),
                      }))
                    }}
                    className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                    placeholder="Post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Slug</label>
                  <input
                    value={draft.slug}
                    onChange={(e) => setDraft((d) => ({ ...d, slug: slugify(e.target.value) }))}
                    className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                    placeholder="post-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">Excerpt</label>
                <textarea
                  value={draft.excerpt}
                  onChange={(e) => setDraft((d) => ({ ...d, excerpt: e.target.value }))}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                  placeholder="Short summary"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Cover image URL/path
                  </label>
                  <input
                    value={draft.coverImage || ""}
                    onChange={(e) => setDraft((d) => ({ ...d, coverImage: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                    placeholder="/blog/my-post.jpg or https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Cover image alt</label>
                  <input
                    value={draft.coverImageAlt || ""}
                    onChange={(e) => setDraft((d) => ({ ...d, coverImageAlt: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                    placeholder="Describe the image"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground">Tags</label>
                  <input
                    value={draft.tags.join(", ")}
                    onChange={(e) => {
                      const next = e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                      setDraft((d) => ({ ...d, tags: next }))
                    }}
                    className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                    placeholder="AI, Platform, Growth"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 rounded-xl border border-border bg-background/30 px-4 py-3 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={draft.published}
                      onChange={(e) => setDraft((d) => ({ ...d, published: e.target.checked }))}
                    />
                    Published
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">Content</label>
                <textarea
                  value={draft.content}
                  onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
                  rows={14}
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                  placeholder="Write your post..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
