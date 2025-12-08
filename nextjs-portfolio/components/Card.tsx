import React from 'react';
import Link from 'next/link';

export interface CardProps {
  title?: string;
  subtitle?: string;
  href?: string;
  variant?: 'default' | 'project' | 'skill' | 'timeline';
  gradient?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses = {
  default: 'bg-gradient-to-br from-white to-parchment-50 dark:from-ink-800 dark:to-ink-700 hover:shadow-chapter hover:scale',
  project: 'bg-gradient-to-br from-white via-sky-50 to-blush-50 dark:from-ink-800 dark:via-ink-700 dark:to-ink-700 hover:shadow-story group hover:scale',
  skill: 'bg-gradient-to-br from-white via-lavender-50 to-mint-50 dark:from-ink-800 dark:via-ink-700 dark:to-ink-700 hover:shadow-chapter hover:scale',
  timeline: 'bg-gradient-to-br from-white via-butter-50 to-sky-50 dark:from-ink-800 dark:via-ink-700 dark:to-ink-700 border-l-4 border-blush-400 dark:border-blush-500 hover:scale'
};

export default function Card({
  title,
  subtitle,
  href,
  variant = 'default',
  gradient = 'from-white to-parchment-50',
  icon,
  className = '',
  children
}: CardProps) {
  const cardClasses = `p-6 rounded-2xl shadow-soft transition-all duration-300 ${variantClasses[variant]} ${className}`;

  const cardContent = (
    <>
      {icon && (
        <div className="mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-200 to-sky-200 dark:from-blush-600 dark:to-sky-600 flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
      
      {title && (
        <h3 className="font-heading text-xl font-semibold text-ink-800 dark:text-ink-100 mb-2">
          {title}
        </h3>
      )}
      
      {subtitle && (
        <p className="text-ink-600 dark:text-ink-300 mb-4 text-sm">
          {subtitle}
        </p>
      )}
      
      <div className="text-ink-700 dark:text-ink-200">
        {children}
      </div>
      
      {variant === 'project' && (
        <div className="mt-4 flex items-center text-blush-600 dark:text-blush-400 text-sm font-medium group-hover:text-blush-700 dark:group-hover:text-blush-300 transition-colors">
          <span>View Project</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        <div className={cardClasses}>
          {cardContent}
        </div>
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      {cardContent}
    </div>
  );
}

