export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Immediately execute to prevent any flash
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // Determine the theme
            const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
            
            // Apply theme immediately
            if (shouldUseDark) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            
            // Show the body once theme is applied
            if (document.body) {
              document.body.classList.add('theme-loaded');
            } else {
              document.addEventListener('DOMContentLoaded', () => {
                document.body.classList.add('theme-loaded');
              });
            }
            
            // Additional safety check for any remaining flash
            const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                  // Ensure theme is maintained
                  const currentTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldUseDark = currentTheme === 'dark' || (!currentTheme && prefersDark);
                  
                  if (shouldUseDark && !document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.add('dark');
                  } else if (!shouldUseDark && document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                  }
                }
              });
            });
            
            // Start observing
            observer.observe(document.documentElement, {
              attributes: true,
              attributeFilter: ['class']
            });
          })();
        `,
      }}
    />
  );
}

