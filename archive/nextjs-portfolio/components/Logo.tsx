import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`logo-container flex items-center justify-center ${className}`}>
      {/* Light mode logo */}
      <img
        src="https://res.cloudinary.com/dqzyjtrqy/image/upload/v1754443204/kt-logo-bg-transparent_bezga1.svg"
        alt="Kaustubh Trivedi Logo"
        className="w-[45%] h-[45%] object-contain dark:hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      />
      
      {/* Dark mode logo with white filter */}
      <img
        src="https://res.cloudinary.com/dqzyjtrqy/image/upload/v1754443204/kt-logo-bg-transparent_bezga1.svg"
        alt="Kaustubh Trivedi Logo"
        className="w-[45%] h-[45%] object-contain hidden dark:block transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] brightness-0 invert"
      />
    </div>
  );
}

