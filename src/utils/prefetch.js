/**
 * Utility to handle route prefetching
 */

// Tracks which routes have already been prefetched
const prefetchedRoutes = new Set();

/**
 * Prefetches routes based on priority
 * @param {Object} router - Vue Router instance
 * @param {Object} options - Prefetching options
 */
export function setupPrefetching(router, options = {}) {
  const {
    delay = 2000, // Delay before starting prefetch (ms)
    onDemand = true, // Enable on-demand prefetching on hover
    priorityThreshold = 5, // Priority threshold for automatic prefetching
  } = options;

  // Wait for initial page load before prefetching other routes
  setTimeout(() => {
    const routesToPrefetch = router
      .getRoutes()
      .filter(route => route.meta?.prefetch && !prefetchedRoutes.has(route.name))
      .sort((a, b) => (a.meta.priority || Infinity) - (b.meta.priority || Infinity));

    // Prefetch routes with high priority first
    routesToPrefetch
      .filter(route => (route.meta.priority || 999) <= priorityThreshold)
      .forEach(route => {
        prefetchRoute(router, route.name);
      });
  }, delay);

  // Set up on-demand prefetching if enabled
  if (onDemand) {
    setupOnDemandPrefetching(router);
  }
}

/**
 * Prefetches a specific route
 * @param {Object} router - Vue Router instance
 * @param {String} routeName - Name of the route to prefetch
 */
export function prefetchRoute(router, routeName) {
  const route = router.getRoutes().find(r => r.name === routeName);

  if (!route || prefetchedRoutes.has(routeName)) {
    return;
  }

  try {
    // Force prefetch of the route's component
    if (typeof route.components?.default === "function") {
      route.components.default();
      prefetchedRoutes.add(routeName);
    }
  } catch {
    // We could add proper error handling here if needed
  }
}

/**
 * Sets up on-demand prefetching on link hover
 * @param {Object} router - Vue Router instance
 */
function setupOnDemandPrefetching(router) {
  // We'll implement this in a globally registered directive
  document.addEventListener(
    "mouseover",
    event => {
      // Check if the hovered element is a link
      if (event.target.tagName === "A" && event.target.hasAttribute("href")) {
        const href = event.target.getAttribute("href");

        // Find a matching route
        const route = router.resolve(href);
        if (route && route.name && !prefetchedRoutes.has(route.name)) {
          prefetchRoute(router, route.name);
        }
      }
    },
    { passive: true }
  );
}
