import Link from 'next/link';
import ChapterHeader from '@/components/ChapterHeader';

export const metadata = {
  title: "The Person Behind the Code - Chapter I",
  description: "Meet Kaustubh Trivedi, a software engineer passionate about crafting thoughtful, scalable solutions",
};

export default function AboutPage() {
  return (
    <>
      <ChapterHeader
        chapter="Chapter I"
        title="The Person Behind the Code"
        color="blush"
      />

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-ink-900">
        <div className="max-w-6xl mx-auto px-6">
          {/* Bio Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-6">
                Hi, I&apos;m Kaustubh Trivedi
              </h2>
              <div className="prose text-ink-700 dark:text-ink-300 space-y-6">
                <p className="text-lg leading-relaxed">
                  I&apos;m a <strong>software engineer</strong> with a passion for crafting thoughtful, scalable solutions that bridge backend logic and frontend elegance.
                </p>
                <p>
                  My journey into tech started with curiosity and evolved into a deep-rooted mission: <em>to create tools that make a meaningful difference.</em> I believe that technology should amplify human potential — not complicate it.
                </p>
                <p>
                  With <strong>two years of hands-on experience</strong> in Java-based backend development, and a growing love for frontend storytelling, I thrive in full-stack environments. I&apos;ve worked across diverse domains, from enterprise-grade microservices to AI-assisted dashboards, and I&apos;m constantly exploring the latest in cloud-native tech, machine learning, and developer experience tooling.
                </p>
                <p>
                  Whether I&apos;m collaborating on a complex system, building a solo side project, or experimenting with new AI dev tools, I code with one goal in mind: <strong>make someone&apos;s day easier, smarter, or a little more magical.</strong>
                </p>
              </div>
            </div>

            {/* Illustration/Avatar */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-3xl bg-gradient-to-br from-blush-100 via-sky-100 to-mint-100 dark:from-blush-900/20 dark:via-sky-900/20 dark:to-mint-900/20 shadow-story flex items-center justify-center relative overflow-hidden">
                {/* Floating Elements */}
                <div className="absolute top-12 left-12 w-8 h-8 bg-blush-300 dark:bg-blush-600 rounded-full animate-float"></div>
                <div className="absolute top-20 right-16 w-6 h-6 bg-sky-300 dark:bg-sky-600 rounded-full animate-float" style={{ animationDelay: '-1s' }}></div>
                <div className="absolute bottom-16 left-20 w-10 h-10 bg-mint-300 dark:bg-mint-600 rounded-full animate-float" style={{ animationDelay: '-2s' }}></div>

                {/* Central Avatar */}
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white to-parchment-100 dark:from-ink-700 dark:to-ink-600 flex items-center justify-center shadow-soft">
                  <svg className="w-32 h-32 text-ink-600 dark:text-ink-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9M19 19H5V3H13V9H19Z" />
                  </svg>
                </div>

                {/* Code Snippets */}
                <div className="absolute top-6 right-6 bg-white dark:bg-ink-800 rounded-lg shadow-soft p-3">
                  <code className="text-blush-600 dark:text-blush-400 text-sm font-mono">System.out.println(&quot;Hello!&quot;);</code>
                </div>

                <div className="absolute bottom-6 left-6 bg-white dark:bg-ink-800 rounded-lg shadow-soft p-3">
                  <code className="text-sky-600 dark:text-sky-400 text-sm font-mono">function dream() {'{}'}</code>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blush-100 to-sky-100 dark:from-blush-900/20 dark:to-sky-900/20 rounded-3xl p-12 text-center">
            <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-6">
              Let&apos;s Continue the Story
            </h2>
            <p className="text-ink-700 dark:text-ink-300 mb-8 max-w-2xl mx-auto">
              Now that you&apos;ve met the developer, let&apos;s flip to the next chapter: How it all started — my tech journey through education, internships, and aha moments.
            </p>
            <Link href="/journey" className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blush-500 to-sky-500 text-white font-medium hover:shadow-chapter transition-all duration-300 hover:scale-105">
              <span>Read Chapter II: My Tech Journey</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

