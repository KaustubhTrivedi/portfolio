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

          {/* Education & Certifications */}
          <div className="mb-20">
            <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-12 text-center">
              Education & Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 shadow-soft">
                <p className="text-xs uppercase tracking-widest text-sky-500 mb-2">MSc in Computer Science</p>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-heading text-2xl font-semibold text-ink-800 dark:text-ink-100">Advanced Software Development</h3>
                  <span className="text-sm font-medium text-ink-500 dark:text-ink-300">Sept 2023 – Mar 2025</span>
                </div>
                <p className="text-sm text-ink-600 dark:text-ink-300 mb-2">Second-Class Honours</p>
                <p className="text-ink-700 dark:text-ink-300">
                  Deepening expertise in distributed systems, cloud-native design, and AI-assisted tooling while balancing research sprints with part-time consulting.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 shadow-soft">
                <p className="text-xs uppercase tracking-widest text-sky-500 mb-2">B.E. in Information Technology</p>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-heading text-2xl font-semibold text-ink-800 dark:text-ink-100">Undergraduate Journey</h3>
                  <span className="text-sm font-medium text-ink-500 dark:text-ink-300">Sept 2019 – Jun 2022</span>
                </div>
                <p className="text-sm text-ink-600 dark:text-ink-300 mb-2">CGPA 8.86 / 10</p>
                <p className="text-ink-700 dark:text-ink-300">
                  Focused on algorithms, database systems, and capstone research that ultimately became the Magpie geospatial project.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-ink-800/80 border border-sky-100 dark:border-ink-700">
                <p className="text-xs uppercase tracking-widest text-sky-500 mb-1">Ongoing</p>
                <h4 className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100">Agentic AI Engineering Course</h4>
                <p className="text-sm text-ink-600 dark:text-ink-300">2025 cohort exploring agent orchestration patterns, safety, and evaluation pipelines.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 dark:bg-ink-800/80 border border-sky-100 dark:border-ink-700">
                <p className="text-xs uppercase tracking-widest text-sky-500 mb-1">HackerRank</p>
                <h4 className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100">Software Engineer Certification</h4>
                <p className="text-sm text-ink-600 dark:text-ink-300">Validated problem-solving skills across data structures, REST design, and debugging.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 dark:bg-ink-800/80 border border-sky-100 dark:border-ink-700">
                <p className="text-xs uppercase tracking-widest text-sky-500 mb-1">HackerRank</p>
                <h4 className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100">Java (Basic)</h4>
                <p className="text-sm text-ink-600 dark:text-ink-300">Assessed on core syntax, OOP patterns, and standard library fluency.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 dark:bg-ink-800/80 border border-sky-100 dark:border-ink-700">
                <p className="text-xs uppercase tracking-widest text-sky-500 mb-1">HackerRank</p>
                <h4 className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100">JavaScript (Basic)</h4>
                <p className="text-sm text-ink-600 dark:text-ink-300">Covers ES6 fundamentals, asynchronous patterns, and DOM manipulation.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 dark:bg-ink-800/80 border border-sky-100 dark:border-ink-700">
                <p className="text-xs uppercase tracking-widest text-sky-500 mb-1">HackerRank</p>
                <h4 className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100">React (Basic)</h4>
                <p className="text-sm text-ink-600 dark:text-ink-300">Demonstrates comfort with hooks, component composition, and state management.</p>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-20">
            <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-12 text-center">
              Professional Experience
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Openspace Services */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-blush-50 dark:from-ink-800 dark:to-ink-700 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-blush-500">Openspace Services Pvt Ltd</p>
                    <h3 className="font-heading text-2xl font-semibold text-ink-800 dark:text-ink-100">Software Engineer</h3>
                  </div>
                  <span className="text-sm font-medium text-ink-500 dark:text-ink-300">Nov 2022 – Jun 2023</span>
                </div>
                <p className="text-ink-700 dark:text-ink-300 mb-4">
                  Led the rebuild of a multi-tenant real-estate platform that blended storytelling landing pages with operational dashboards powered by Next.js and Strapi CMS.
                </p>
                <ul className="space-y-3 text-sm text-ink-700 dark:text-ink-300 mb-6">
                  <li className="flex gap-3">
                    <span className="font-semibold text-blush-500">35%</span>
                    <span>Improved platform load times through incremental static regeneration, smarter caching, and responsive media delivery.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-blush-500">12%</span>
                    <span>Boosted property watcher retention by adding event-driven nudges and usage analytics to product rituals.</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-blush-100 dark:bg-blush-900 text-blush-700 dark:text-blush-300 text-xs font-medium">Next.js</span>
                  <span className="px-3 py-1 rounded-full bg-blush-100 dark:bg-blush-900 text-blush-700 dark:text-blush-300 text-xs font-medium">TypeScript</span>
                  <span className="px-3 py-1 rounded-full bg-blush-100 dark:bg-blush-900 text-blush-700 dark:text-blush-300 text-xs font-medium">Strapi CMS</span>
                  <span className="px-3 py-1 rounded-full bg-blush-100 dark:bg-blush-900 text-blush-700 dark:text-blush-300 text-xs font-medium">TailwindCSS</span>
                </div>
              </div>

              {/* PPLWork */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-blush-50 dark:from-ink-800 dark:to-ink-700 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-blush-500">PPLWork</p>
                    <h3 className="font-heading text-2xl font-semibold text-ink-800 dark:text-ink-100">Software Engineering Intern</h3>
                  </div>
                  <span className="text-sm font-medium text-ink-500 dark:text-ink-300">Mar 2022 – Sep 2022</span>
                </div>
                <p className="text-ink-700 dark:text-ink-300 mb-4">
                  Built payment-processing microservices with Spring Boot and PostgreSQL, covering everything from ledger consistency to API security and deployment automation.
                </p>
                <ul className="space-y-3 text-sm text-ink-700 dark:text-ink-300 mb-6">
                  <li className="flex gap-3">
                    <span className="font-semibold text-blush-500">40%</span>
                    <span>Cut manual deployment effort by containerizing services and wiring Jenkins + GitHub Actions gates.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-blush-500">24/7</span>
                    <span>Ensured API uptime with health probes, observability dashboards, and automated rollback playbooks.</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-blush-100 dark:bg-blush-900 text-blush-700 dark:text-blush-300 text-xs font-medium">Java</span>
                  <span className="px-3 py-1 rounded-full bg-blush-100 dark:bg-blush-900 text-blush-700 dark:text-blush-300 text-xs font-medium">Spring Boot</span>
                  <span className="px-3 py-1 rounded-full bg-blush-100 dark:bg-blush-900 text-blush-700 dark:text-blush-300 text-xs font-medium">PostgreSQL</span>
                  <span className="px-3 py-1 rounded-full bg-blush-100 dark:bg-blush-900 text-blush-700 dark:text-blush-300 text-xs font-medium">Docker</span>
                  <span className="px-3 py-1 rounded-full bg-blush-100 dark:bg-blush-900 text-blush-700 dark:text-blush-300 text-xs font-medium">Jenkins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mb-20">
            <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-12 text-center">
              Fun Facts About Me
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Coffee Adventurer */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-blush-50 dark:from-ink-800 dark:to-ink-700 shadow-soft hover:shadow-chapter transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-200 to-blush-400 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V3A2,2 0 0,0 20,3Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-2">Coffee Adventurer</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">
                  I&apos;ve tried brews from over 20 countries — from Mumbai&apos;s street-side filter kaapi to Dublin&apos;s third-wave cafés.
                </p>
              </div>

              {/* Midnight Engineer */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-sky-50 dark:from-ink-800 dark:to-ink-700 shadow-soft hover:shadow-chapter transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-2">Midnight Engineer</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">
                  My best code often happens between 10 PM and 2 AM — quiet, focused, and powered by playlists and persistence.
                </p>
              </div>

              {/* Open Source Ally */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-mint-50 dark:from-ink-800 dark:to-ink-700 shadow-soft hover:shadow-chapter transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mint-200 to-mint-400 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-2">Open Source Ally</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">
                  I contribute to GitHub projects and believe in technology that&apos;s inclusive, accessible, and community-built.
                </p>
              </div>

              {/* Lifelong Learner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-lavender-50 dark:from-ink-800 dark:to-ink-700 shadow-soft hover:shadow-chapter transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lavender-200 to-lavender-400 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-2">Lifelong Learner</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">
                  From DevOps to Python ML libraries, I complete at least one technical course every month.
                </p>
              </div>

              {/* Problem Solver */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 shadow-soft hover:shadow-chapter transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-butter-200 to-butter-400 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-2">Problem Solver</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">
                  I love debugging and brain teasers — solving Rubik&apos;s cubes is just my warm-up for untangling spaghetti code.
                </p>
              </div>

              {/* Music & Code */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-blush-50 dark:from-ink-800 dark:to-ink-700 shadow-soft hover:shadow-chapter transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-200 to-sky-200 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,3V13.55C11.41,13.21 10.73,13 10,13A3,3 0 0,0 7,16A3,3 0 0,0 10,19A3,3 0 0,0 13,16V7H17V4H12M10,16.5A0.5,0.5 0 0,1 10.5,16A0.5,0.5 0 0,1 10,15.5A0.5,0.5 0 0,1 9.5,16A0.5,0.5 0 0,1 10,16.5Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-2">Music & Code</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">
                  I play guitar and compose music; I believe both music and code are about patterns, rhythm, and intuition.
                </p>
              </div>
            </div>
          </div>

          {/* Development Philosophy */}
          <div className="bg-gradient-to-br from-blush-50 to-sky-50 dark:from-blush-900/20 dark:to-sky-900/20 rounded-3xl p-12">
            <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-8 text-center">
              My Development Philosophy
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blush-300 to-blush-500 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">Clean Code</h3>
                <p className="text-ink-700 dark:text-ink-300">
                  Code should be readable, maintainable, and self-explanatory — if it&apos;s not elegant, it&apos;s not done.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 to-sky-500 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">User-Centric</h3>
                <p className="text-ink-700 dark:text-ink-300">
                  I always build with empathy — the best code serves real people with real needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mint-300 to-mint-500 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">Continuous Growth</h3>
                <p className="text-ink-700 dark:text-ink-300">
                  If you think you&apos;ve mastered it all, you&apos;re already falling behind. I&apos;m always learning and iterating.
                </p>
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

