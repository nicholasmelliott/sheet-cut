
const colors = [
  "#36b8e5", // Maya Blue
  "#36e579", // Spring Green
  "#e5cc36", // Goldenrod
  "#ffb300", // Orange
  "#e366ff", // Purple
  "#d44b28",
  "#e5369c", // Deep Pink
  "#36e5cf", // Celeste,
  "#3684e5", // Dodger Blue
  "#f8fa7a" // Yellow

];


  const getHexColorByIndex = (index) => {
    // Ensure index is within bounds of colors array
    const boundedIndex = index % colors.length;
    return colors[boundedIndex];
  };
  
  export default getHexColorByIndex;