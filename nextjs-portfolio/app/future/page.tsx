import ChapterHeader from '@/components/ChapterHeader';

export const metadata = {
  title: "What's Next - Chapter VI",
  description: "Exploring the future of technology and my aspirations in software engineering",
};

export default function FuturePage() {
  return (
    <>
      <ChapterHeader
        chapter="Chapter VI"
        title="What's Next"
        color="butter"
      />

      <section className="py-20 bg-white dark:bg-ink-900">
        <div className="max-w-6xl mx-auto px-6">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-semibold text-ink-800 dark:text-ink-100 mb-8">
              The Future is Bright
            </h2>
            <p className="text-xl text-ink-600 dark:text-ink-300 max-w-3xl mx-auto">
              Technology evolves rapidly, and so do I. Here&apos;s where I&apos;m headed and what excites me about the future of software engineering.
            </p>
          </div>

          {/* Focus Areas */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Cloud Architecture & DevOps */}
            <div className="bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft hover:shadow-chapter transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-butter-200 to-butter-400 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100">Cloud Architecture & DevOps</h3>
              </div>
              <p className="text-ink-700 dark:text-ink-300 mb-6">
                I&apos;m diving deep into cloud-native development, container orchestration, and infrastructure as code. The future is serverless, and I want to be at the forefront.
              </p>
              <h4 className="font-semibold text-ink-800 dark:text-ink-100 mb-3">Focus Areas:</h4>
              <ul className="space-y-2 text-ink-700 dark:text-ink-300 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  AWS Solutions Architect certification
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Kubernetes and container orchestration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Infrastructure as Code with Terraform
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  CI/CD pipeline optimization
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Microservices architecture patterns
                </li>
              </ul>
            </div>

            {/* Engineering Leadership */}
            <div className="bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft hover:shadow-chapter transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-butter-200 to-butter-400 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100">Engineering Leadership</h3>
              </div>
              <p className="text-ink-700 dark:text-ink-300 mb-6">
                Beyond coding, I&apos;m passionate about mentoring, team building, and technical decision-making. Great software comes from great teams.
              </p>
              <h4 className="font-semibold text-ink-800 dark:text-ink-100 mb-3">Focus Areas:</h4>
              <ul className="space-y-2 text-ink-700 dark:text-ink-300 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Technical mentorship and coaching
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Architecture decision making
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Cross-functional team collaboration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Code review and quality standards
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Agile and lean development practices
                </li>
              </ul>
            </div>

            {/* System Design & Backend Excellence */}
            <div className="bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft hover:shadow-chapter transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-butter-200 to-butter-400 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100">System Design & Backend Excellence</h3>
              </div>
              <p className="text-ink-700 dark:text-ink-300 mb-6">
                Building scalable, resilient systems that handle millions of users. Performance, security, and reliability are non-negotiable.
              </p>
              <h4 className="font-semibold text-ink-800 dark:text-ink-100 mb-3">Focus Areas:</h4>
              <ul className="space-y-2 text-ink-700 dark:text-ink-300 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Distributed systems design
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Database optimization and scaling
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  API design and documentation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Security best practices
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-butter-400 rounded-full mr-3"></div>
                  Performance monitoring and optimization
                </li>
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-16 text-center">
              My Roadmap
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Next 6 Months */}
              <div className="bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft">
                <h3 className="font-heading text-2xl font-semibold text-ink-800 dark:text-ink-100 mb-6">Next 6 Months</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 rounded-lg bg-white dark:bg-ink-800 shadow-soft">
                    <div className="w-3 h-3 bg-butter-400 rounded-full mr-4"></div>
                    <span className="font-medium text-ink-800 dark:text-ink-100">AWS Solutions Architect Certification</span>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-white dark:bg-ink-800 shadow-soft">
                    <div className="w-3 h-3 bg-butter-400 rounded-full mr-4"></div>
                    <span className="font-medium text-ink-800 dark:text-ink-100">Master Docker + Kubernetes</span>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-white dark:bg-ink-800 shadow-soft">
                    <div className="w-3 h-3 bg-butter-400 rounded-full mr-4"></div>
                    <span className="font-medium text-ink-800 dark:text-ink-100">GitHub Actions + CI/CD Deep Dive</span>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-white dark:bg-ink-800 shadow-soft">
                    <div className="w-3 h-3 bg-butter-400 rounded-full mr-4"></div>
                    <span className="font-medium text-ink-800 dark:text-ink-100">Start a Public Dev Blog</span>
                  </div>
                </div>
              </div>

              {/* Next 1–2 Years */}
              <div className="bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 rounded-2xl p-8 shadow-soft">
                <h3 className="font-heading text-2xl font-semibold text-ink-800 dark:text-ink-100 mb-6">Next 1–2 Years</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 rounded-lg bg-white dark:bg-ink-800 shadow-soft">
                    <div className="w-3 h-3 bg-butter-400 rounded-full mr-4"></div>
                    <span className="font-medium text-ink-800 dark:text-ink-100">Senior Developer / Tech Lead Role</span>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-white dark:bg-ink-800 shadow-soft">
                    <div className="w-3 h-3 bg-butter-400 rounded-full mr-4"></div>
                    <span className="font-medium text-ink-800 dark:text-ink-100">Launch a personal SaaS product</span>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-white dark:bg-ink-800 shadow-soft">
                    <div className="w-3 h-3 bg-butter-400 rounded-full mr-4"></div>
                    <span className="font-medium text-ink-800 dark:text-ink-100">Speak at a Dev Conference</span>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-white dark:bg-ink-800 shadow-soft">
                    <div className="w-3 h-3 bg-butter-400 rounded-full mr-4"></div>
                    <span className="font-medium text-ink-800 dark:text-ink-100">Contribute to a meaningful Open Source initiative</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emerging Technologies */}
          <div className="mb-20">
            <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-12 text-center">
              Emerging Technologies I&apos;m Exploring
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 rounded-xl p-6 shadow-soft">
                <h3 className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100 mb-2">WebAssembly & Edge Computing</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">High-performance web applications and edge deployment strategies.</p>
              </div>

              <div className="bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 rounded-xl p-6 shadow-soft">
                <h3 className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100 mb-2">Serverless Infrastructure</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">Event-driven architectures and function-as-a-service platforms.</p>
              </div>

              <div className="bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 rounded-xl p-6 shadow-soft">
                <h3 className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100 mb-2">Cybersecurity & Privacy Tech</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">Secure coding practices and privacy-first development.</p>
              </div>

              <div className="bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 rounded-xl p-6 shadow-soft">
                <h3 className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100 mb-2">Container Orchestration at Scale</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">Kubernetes, service mesh, and cloud-native patterns.</p>
              </div>

              <div className="bg-gradient-to-br from-white to-butter-50 dark:from-ink-800 dark:to-ink-700 rounded-xl p-6 shadow-soft">
                <h3 className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100 mb-2">Decentralized Apps & Web3 (Exploratory)</h3>
                <p className="text-ink-700 dark:text-ink-300 text-sm">Blockchain integration and decentralized application development.</p>
              </div>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="bg-gradient-to-br from-butter-50 to-sky-50 dark:from-butter-900/20 dark:to-sky-900/20 rounded-3xl p-12 text-center">
            <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-8">
              My Vision for the Future
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-butter-300 to-butter-500 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">Human-Centered</h3>
                <p className="text-ink-700 dark:text-ink-300">
                  Technology should serve people, not the other way around. I want to build systems that make lives better, easier, and more connected.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 to-sky-500 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">Innovation-Driven</h3>
                <p className="text-ink-700 dark:text-ink-300">
                  I want to be part of teams that push boundaries, experiment with new technologies, and create solutions that didn&apos;t exist before.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mint-300 to-mint-500 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-3">Collaborative</h3>
                <p className="text-ink-700 dark:text-ink-300">
                  The best solutions come from diverse teams working together. I want to foster environments where everyone can contribute and grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-butter-100 to-blush-100 dark:from-butter-900/20 dark:to-blush-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-semibold text-ink-800 dark:text-ink-100 mb-6">
            Let&apos;s Build the Future Together
          </h2>
          <p className="text-ink-700 dark:text-ink-300 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re looking for a developer who thinks about the big picture, or you want to explore what&apos;s possible, I&apos;d love to hear from you.
          </p>
          <a href="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-butter-500 to-blush-500 text-white font-medium hover:shadow-chapter transition-all duration-300 hover:scale-105">
            <span>Get in Touch</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}

