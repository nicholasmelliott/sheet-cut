const scrollLeft = (container) => {
  const start = container.current.scrollLeft;
  const end = container.current.scrollWidth - container.current.clientWidth;
  const duration = 100; // milliseconds

  const animateScroll = (timestamp) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const scrollPos = start + (end - start) * progress;
    container.current.scrollLeft = scrollPos;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  const startTime = performance.now();
  requestAnimationFrame(animateScroll);
};

  export default scrollLeft;