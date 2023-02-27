const scrollLeft = (container) => {
    if (container.current) {
      container.current.scrollLeft = container.current.scrollWidth;
    }
  }
  
  export default scrollLeft;