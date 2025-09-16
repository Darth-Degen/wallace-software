import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useColorTheme } from '@stores';

/**
 * Hook to track active section based on route changes only
 * Perfect for no-scroll websites where navigation is purely route-based
 */
export const useRouteActiveSection = () => {
  const router = useRouter();
  const { setActiveSection } = useColorTheme();

  useEffect(() => {
    // Update active section based on current route
    // Handle both regular routes and hash fragments
    const currentPath = router.asPath;
    setActiveSection(currentPath);
  }, [router.asPath, setActiveSection]);
};
