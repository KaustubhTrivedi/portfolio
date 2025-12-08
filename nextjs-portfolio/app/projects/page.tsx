import ChapterHeader from '@/components/ChapterHeader';

export const metadata = {
  title: "Professional & Academic Projects - Chapter IV",
  description: "Case studies that translate résumé bullet points into real shipping software and measurable impact",
};

export default function ProjectsPage() {
  return (
    <>
      <ChapterHeader
        chapter="Chapter IV"
        title="Professional & Academic Projects"
        color="lavender"
      />

      <section className="py-20 bg-white dark:bg-ink-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-semibold text-ink-800 dark:text-ink-100 mb-8">
              Professional & Academic Projects
            </h2>
            <p className="text-xl text-ink-600 dark:text-ink-300 max-w-3xl mx-auto">
              Each build reflects real stakeholders, deadlines, and the lessons captured on my résumé—from multi-tenant platforms in production to research-driven capstones that pushed my technical range.
            </p>
          </div>
          {/* Projects content would go here */}
        </div>
      </section>
    </>
  );
}

