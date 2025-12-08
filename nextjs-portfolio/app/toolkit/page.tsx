import Link from 'next/link';
import ChapterHeader from '@/components/ChapterHeader';

export const metadata = {
  title: "My Development Toolkit - Chapter III",
  description: "A comprehensive overview of the technologies, frameworks, and tools I use to build software",
};

export default function ToolkitPage() {
  return (
    <>
      <ChapterHeader
        chapter="Chapter III"
        title="My Development Toolkit"
        color="mint"
      />

      <section className="py-20 bg-white dark:bg-ink-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-semibold text-ink-800 dark:text-ink-100 mb-8">
              The Tools That Power My Work
            </h2>
            <p className="text-xl text-ink-600 dark:text-ink-300 max-w-3xl mx-auto">
              Every craftsman needs the right tools. Here&apos;s my carefully curated collection of technologies, frameworks, and utilities that help me build robust, scalable software.
            </p>
          </div>

          {/* Toolkit content would go here */}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-mint-100 to-lavender-100 dark:from-mint-900/20 dark:to-lavender-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-6">
            Ready to See These Tools in Action?
          </h2>
          <p className="text-ink-700 dark:text-ink-300 mb-8 max-w-2xl mx-auto">
            Now that you know what I work with, let&apos;s explore the projects I&apos;ve built using these technologies.
          </p>
          <Link href="/projects" className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-mint-500 to-lavender-500 text-white font-medium hover:shadow-chapter transition-all duration-300 hover:scale-105">
            <span>View Professional & Academic Projects</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

