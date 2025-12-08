import Link from 'next/link';
import ChapterHeader from '@/components/ChapterHeader';

export const metadata = {
  title: "My Tech Journey - Chapter II",
  description: "From first lines of code to full-stack development - the evolution of a software engineer",
};

export default function JourneyPage() {
  return (
    <>
      <ChapterHeader
        chapter="Chapter II"
        title="My Tech Journey"
        color="sky"
      />

      <section className="py-20 bg-white dark:bg-ink-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-semibold text-ink-800 dark:text-ink-100 mb-8">
              The Evolution of a Developer
            </h2>
            <p className="text-xl text-ink-600 dark:text-ink-300 max-w-3xl mx-auto">
              Every developer has a unique story. Here&apos;s mine — from the first &quot;Hello, World!&quot; to building complex systems that serve real users.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-sky-600 dark:from-sky-500 dark:to-sky-700"></div>

            <div className="space-y-12">
              {/* Timeline items */}
              <div className="relative flex items-start">
                <div className="absolute left-4 w-8 h-8 rounded-full bg-sky-400 dark:bg-sky-500 border-4 border-white dark:border-ink-800 shadow-soft"></div>
                <div className="ml-16">
                  <div className="bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft">
                    <p className="text-xs uppercase tracking-widest text-sky-500 mb-2">Sept 2019 – Jun 2022</p>
                    <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">B.E. Information Technology</h3>
                    <p className="text-ink-700 dark:text-ink-300 mb-4">
                      Graduated with <strong>CGPA 8.86/10</strong> while prototyping Magpie—the geospatial capstone that combined Next.js, Go, and PostGIS to boost researcher retention by 12% during usability testing.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">Algorithms</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">Capstone: Magpie</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">CGPA 8.86</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* More timeline items would go here */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-sky-100 to-mint-100 dark:from-sky-900/20 dark:to-mint-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-6">
            Ready to See What I Can Build?
          </h2>
          <p className="text-ink-700 dark:text-ink-300 mb-8 max-w-2xl mx-auto">
            Now that you know my journey, let&apos;s explore the tools and technologies I use to bring ideas to life.
          </p>
          <Link href="/toolkit" className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-mint-500 text-white font-medium hover:shadow-chapter transition-all duration-300 hover:scale-105">
            <span>Explore My Toolkit</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

