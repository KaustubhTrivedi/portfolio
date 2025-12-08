import ChapterHeader from '@/components/ChapterHeader';

export const metadata = {
  title: "The Final Year Boss Fight - Chapter V",
  description: "Every great journey has a boss level — mine was Magpie, a geospatial intelligence platform",
};

export default function FinalProjectPage() {
  return (
    <>
      <ChapterHeader
        chapter="Chapter V"
        title="The Final Year Boss Fight"
        color="butter"
      />

      <section className="py-20 bg-gradient-to-br from-butter-50 to-lavender-50 dark:from-ink-800 dark:to-ink-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-ink-800 dark:text-ink-100 mb-6">
              Project Magpie
            </h1>
            <p className="text-xl text-ink-700 dark:text-ink-300 max-w-3xl mx-auto leading-relaxed mb-8">
              <em>&quot;Every great journey has a boss level — mine was Magpie.&quot;</em>
            </p>
          </div>
          {/* Project details would go here */}
        </div>
      </section>
    </>
  );
}

