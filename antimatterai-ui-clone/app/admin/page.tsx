import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminApp } from "@/components/admin/admin-app"

export const dynamic = "force-dynamic"

export default function AdminPage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
              Admin
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Manage blog posts and review contact submissions.
            </p>
          </div>
          <div className="mt-10">
            <AdminApp />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

