import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useColorTheme, AccentColor } from '@stores';
import { PAGES } from '@constants';

/**
 * Hook to detect the currently active section on the page
 * Works by monitoring scroll position and URL hash changes
 * Updates the Zustand store with the active section
 * Optionally auto-updates accent color based on active section
 */
export const useActiveSection = (autoUpdateAccentColor = false) => {
  const router = useRouter();
  const { activeSection, setActiveSection, setAccentColorAndSection } = useColorTheme();

  useEffect(() => {
    // Set initial active section based on URL hash
    const hash = router.asPath.split('#')[1];
    if (hash) {
      setActiveSection(`/#${hash}`);
    } else {
      setActiveSection('/');
    }

    const updateActiveSection = (newSection: string) => {
      // Auto-update accent color if enabled
      if (autoUpdateAccentColor) {
        const page = PAGES.find(p => p.path === newSection);
        if (page?.accentColor) {
          setAccentColorAndSection(page.accentColor as AccentColor, newSection);
        } else {
          setActiveSection(newSection);
        }
      } else {
        setActiveSection(newSection);
      }
    };

    const handleScroll = () => {
      // Get all sections that have IDs (potential navigation targets)
      const sections = document.querySelectorAll('[id]');
      const scrollTop = window.scrollY + 100; // Offset for header
      
      let currentSection = '/';
      
      sections.forEach((section) => {
        const element = section as HTMLElement;
        const sectionId = element.id;
        
        // Skip non-navigation sections
        const navSections = ['about', 'experience', 'skills', 'portfolio'];
        if (!navSections.includes(sectionId)) return;
        
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollTop >= offsetTop && scrollTop < offsetTop + offsetHeight) {
          currentSection = `/#${sectionId}`;
        }
      });
      
      // If we're at the very top, show home as active
      if (window.scrollY < 100) {
        currentSection = '/';
      }
      
      updateActiveSection(currentSection);
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      const newSection = hash ? `/${hash}` : '/';
      updateActiveSection(newSection);
    };

    // Listen for scroll and hash changes
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [router.asPath, autoUpdateAccentColor, setActiveSection, setAccentColorAndSection]);

  return activeSection;
};
