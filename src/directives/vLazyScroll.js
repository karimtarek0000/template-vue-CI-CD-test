export default {
  mounted(el, binding) {
    const options = {
      root: null,
      rootMargin: binding.value?.rootMargin || '0px',
      threshold: binding.value?.threshold || 0,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        // Update the component's visibility state
        if (binding.value?.onVisibilityChange) {
          binding.value.onVisibilityChange(entry.isIntersecting);
        }

        // Unobserve if once is set and element is visible
        if (entry.isIntersecting && binding.value?.once) {
          entry.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    el.lazyScrollObserver = observer;
    observer.observe(el);
  },

  // When a component is unmounted, disconnect the observer
  beforeUnmount(el) {
    if (el.lazyScrollObserver) {
      el.lazyScrollObserver.disconnect();
      delete el.lazyScrollObserver;
    }
  },
};
