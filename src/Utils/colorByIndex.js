
const colors = [
  "#e51636",
  "#36e579", // Spring Green
  "#e5cc36", // Goldenrod
  "#363be5", // Royal Blue
  "#e5369c", // Deep Pink
  "#36e5cf", // Celeste
  "#e56236", // Dark Orange
  "#3684e5", // Dodger Blue
  "#9c36e5", // Purple
  "#36b8e5", // Maya Blue
  "#e5366b"  // Cerise
];


  const getHexColorByIndex = (index) => {
    // Ensure index is within bounds of colors array
    const boundedIndex = index % colors.length;
    return colors[boundedIndex];
  };
  
  export default getHexColorByIndex;