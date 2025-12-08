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
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-semibold text-ink-800 dark:text-ink-100 mb-8">
              The Future is Bright
            </h2>
            <p className="text-xl text-ink-600 dark:text-ink-300 max-w-3xl mx-auto">
              Technology evolves rapidly, and so do I. Here&apos;s where I&apos;m headed and what excites me about the future of software engineering.
            </p>
          </div>
          {/* Future content would go here */}
        </div>
      </section>
    </>
  );
}

