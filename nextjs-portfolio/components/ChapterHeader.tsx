import React from 'react';

export interface ChapterHeaderProps {
  chapter: string;
  title: string;
  subtitle?: string;
  color?: string;
}

export default function ChapterHeader({
  chapter,
  title,
  subtitle,
  color = 'blush'
}: ChapterHeaderProps) {
  const chapterNumber = chapter.replace('Chapter ', '').replace('Epilogue', 'E');
  
  // Dynamic color classes - using template literals for Tailwind
  const colorClasses = {
    blush: {
      text: 'text-blush-600 dark:text-blush-400',
      textLight: 'text-blush-200 dark:text-blush-700',
      textMedium: 'text-blush-300 dark:text-blush-600',
      bg: 'bg-blush-400 dark:bg-blush-500',
      bgLight: 'bg-blush-300 dark:bg-blush-600',
      bgLighter: 'bg-blush-200 dark:bg-blush-700',
    },
    sky: {
      text: 'text-sky-600 dark:text-sky-400',
      textLight: 'text-sky-200 dark:text-sky-700',
      textMedium: 'text-sky-300 dark:text-sky-600',
      bg: 'bg-sky-400 dark:bg-sky-500',
      bgLight: 'bg-sky-300 dark:bg-sky-600',
      bgLighter: 'bg-sky-200 dark:bg-sky-700',
    },
    mint: {
      text: 'text-mint-600 dark:text-mint-400',
      textLight: 'text-mint-200 dark:text-mint-700',
      textMedium: 'text-mint-300 dark:text-mint-600',
      bg: 'bg-mint-400 dark:bg-mint-500',
      bgLight: 'bg-mint-300 dark:bg-mint-600',
      bgLighter: 'bg-mint-200 dark:bg-mint-700',
    },
    lavender: {
      text: 'text-lavender-600 dark:text-lavender-400',
      textLight: 'text-lavender-200 dark:text-lavender-700',
      textMedium: 'text-lavender-300 dark:text-lavender-600',
      bg: 'bg-lavender-400 dark:bg-lavender-500',
      bgLight: 'bg-lavender-300 dark:bg-lavender-600',
      bgLighter: 'bg-lavender-200 dark:text-lavender-700',
    },
    butter: {
      text: 'text-butter-600 dark:text-butter-400',
      textLight: 'text-butter-200 dark:text-butter-700',
      textMedium: 'text-butter-300 dark:text-butter-600',
      bg: 'bg-butter-400 dark:bg-butter-500',
      bgLight: 'bg-butter-300 dark:bg-butter-600',
      bgLighter: 'bg-butter-200 dark:text-butter-700',
    },
  };

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blush;

  return (
    <header className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" className={colors.textLight}></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"></rect>
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 opacity-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 L90 90 L10 90 Z" fill="currentColor" className={colors.textMedium}></path>
        </svg>
      </div>
      
      <div className="absolute bottom-10 right-10 w-16 h-16 opacity-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className={colors.textMedium}></circle>
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Chapter Number */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-ink-800 shadow-story mb-6">
          <span className={`font-heading text-2xl font-bold ${colors.text}`}>
            {chapterNumber}
          </span>
        </div>

        {/* Chapter Label */}
        <p className={`${colors.text} font-medium mb-4 tracking-wide uppercase text-sm`}>
          {chapter}
        </p>

        {/* Title */}
        <h1 className="font-heading text-4xl lg:text-6xl font-bold text-ink-800 dark:text-ink-100 mb-6 leading-tight">
          <span className="inline-block animate-fade-in">
            {title}
          </span>
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xl text-ink-600 dark:text-ink-300 max-w-2xl mx-auto animate-slide-up">
            {subtitle}
          </p>
        )}

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mt-8">
          <div className={`w-8 h-1 ${colors.bg} rounded-full`}></div>
          <div className={`w-4 h-1 ${colors.bgLight} rounded-full mx-2`}></div>
          <div className={`w-2 h-1 ${colors.bgLighter} rounded-full`}></div>
        </div>
      </div>
    </header>
  );
}

