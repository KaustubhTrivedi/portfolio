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
          <div className="relative mb-20">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-sky-600 dark:from-sky-500 dark:to-sky-700"></div>

            <div className="space-y-12">
              {/* B.E. */}
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

              {/* PPLWork */}
              <div className="relative flex items-start">
                <div className="absolute left-4 w-8 h-8 rounded-full bg-sky-400 dark:bg-sky-500 border-4 border-white dark:border-ink-800 shadow-soft"></div>
                <div className="ml-16">
                  <div className="bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft">
                    <p className="text-xs uppercase tracking-widest text-sky-500 mb-2">Mar 2022 – Sep 2022</p>
                    <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">Software Engineering Intern · PPLWork</h3>
                    <p className="text-ink-700 dark:text-ink-300 mb-4">
                      Joined the payments squad to deliver Spring Boot microservices, ledger APIs, and CI/CD automation that reduced manual deployment effort by <strong>40%</strong>.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">Spring Boot</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">PostgreSQL</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">Jenkins + GitHub Actions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Openspace */}
              <div className="relative flex items-start">
                <div className="absolute left-4 w-8 h-8 rounded-full bg-sky-400 dark:bg-sky-500 border-4 border-white dark:border-ink-800 shadow-soft"></div>
                <div className="ml-16">
                  <div className="bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft">
                    <p className="text-xs uppercase tracking-widest text-sky-500 mb-2">Nov 2022 – Jun 2023</p>
                    <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">Software Engineer · Openspace Services</h3>
                    <p className="text-ink-700 dark:text-ink-300 mb-4">
                      Owned the Next.js + Strapi CMS platform that powers luxury real-estate storytelling—shipping features that made pages load <strong>35%</strong> faster and lifted engaged property-watchers by 12%.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">Next.js</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">Strapi CMS</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">TypeScript</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MSc */}
              <div className="relative flex items-start">
                <div className="absolute left-4 w-8 h-8 rounded-full bg-sky-400 dark:bg-sky-500 border-4 border-white dark:border-ink-800 shadow-soft"></div>
                <div className="ml-16">
                  <div className="bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft">
                    <p className="text-xs uppercase tracking-widest text-sky-500 mb-2">Sept 2023 – Mar 2025</p>
                    <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">MSc Computer Science · Advanced Software Development</h3>
                    <p className="text-ink-700 dark:text-ink-300 mb-4">
                      Pursuing Second-Class Honours while researching distributed systems, AI-assisted developer tooling, and resilient cloud architectures.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">Distributed Systems</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">LLM Tooling</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">Cloud Native</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agentic AI */}
              <div className="relative flex items-start">
                <div className="absolute left-4 w-8 h-8 rounded-full bg-sky-400 dark:bg-sky-500 border-4 border-white dark:border-ink-800 shadow-soft"></div>
                <div className="ml-16">
                  <div className="bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft">
                    <p className="text-xs uppercase tracking-widest text-sky-500 mb-2">2025 – Ongoing</p>
                    <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">Agentic AI Engineering Course</h3>
                    <p className="text-ink-700 dark:text-ink-300 mb-4">
                      Exploring agent orchestration, safety guardrails, and evaluation pipelines so I can bring AI copilots into future client work.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">Agentic AI</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">LLM Evaluation</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm">Prompt Engineering</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Backend Expertise */}
            <div className="bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">Backend Expertise</h3>
              <p className="text-ink-700 dark:text-ink-300 text-sm">
                Java, Spring Boot, microservices architecture, and database design. Building robust, scalable systems that handle real-world loads.
              </p>
            </div>

            {/* Frontend Skills */}
            <div className="bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">Frontend Skills</h3>
              <p className="text-ink-700 dark:text-ink-300 text-sm">
                React, TypeScript, modern CSS frameworks. Creating intuitive, responsive interfaces that users love to interact with.
              </p>
            </div>

            {/* DevOps & Cloud */}
            <div className="bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">DevOps & Cloud</h3>
              <p className="text-ink-700 dark:text-ink-300 text-sm">
                Docker, AWS, CI/CD pipelines. Understanding the full deployment lifecycle and cloud-native development practices.
              </p>
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

