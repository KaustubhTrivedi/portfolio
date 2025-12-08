import ChapterHeader from '@/components/ChapterHeader';

export const metadata = {
  title: "The End is Just a New Beginning - Epilogue",
  description: "Connect with Kaustubh Trivedi for collaboration, opportunities, or just to geek out about technology",
};

export default function ContactPage() {
  return (
    <>
      <ChapterHeader
        chapter="Epilogue"
        title="The End is Just a New Beginning"
        color="blush"
      />

      <section className="py-20 bg-white dark:bg-ink-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl font-semibold text-ink-800 dark:text-ink-100 mb-8">
            The End is Just a New Beginning
          </h2>
          <blockquote className="text-2xl font-heading text-ink-700 dark:text-ink-300 italic border-l-4 border-blush-400 dark:border-blush-500 pl-6 my-8">
            &quot;Every great story needs a satisfying ending... but the best ones always leave room for a sequel.&quot;
          </blockquote>
          {/* Contact content would go here */}
        </div>
      </section>
    </>
  );
}

