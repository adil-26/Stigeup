export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage?: string
  coverImageAlt?: string
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
}

export type ContactSubmission = {
  id: string
  name: string
  email: string
  company?: string
  message: string
  createdAt: string
}
