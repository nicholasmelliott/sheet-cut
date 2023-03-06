const colors = [
    '#cc6699',
    '#9c6', 
    '#69c',
    '#9933cc',
    '#669933',
    '#cc9966',
    '#336699',
    '#ff9900',
    '#663399',
    '#0099cc',
  ];
  
  const getHexColorByIndex = (index) => {
    // Ensure index is within bounds of colors array
    const boundedIndex = index % colors.length;
    return colors[boundedIndex];
  };
  
  export default getHexColorByIndex;