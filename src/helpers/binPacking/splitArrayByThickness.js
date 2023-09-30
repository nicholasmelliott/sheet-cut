const splitArrayByThickness = arr => {
    
    // Return an empty array if the input is not an array
    if (!Array.isArray(arr)) {
      return []; 
    }
  
    const result = {};
    
    for (const curr of arr) {
      // Skip the current element if it is falsy or has invalid width and/or height properties
      if (!curr || (curr.width === "" && curr.widthFraction === 0) || (curr.height === "" && curr.heightFraction === 0)) {
        continue; 
      }
      
      const thickness = curr.thicknessFraction;
      if (!result[thickness]) {
        // Create a new array for the current thickness and add the current element to it
        result[thickness] = [curr]; 
      } else {
        // Add the current element to the end of the existing array for the current thickness
        const index = result[thickness].findIndex(obj => obj.thicknessFraction < thickness);
        if (index === -1) {
          result[thickness].push(curr); 
        } else {
          // Insert the current element at the correct position in the existing array for the current thickness
          result[thickness].splice(index, 0, curr); 
        }
      }
    }
    // Return an array of arrays, each containing objects with the same thicknessFraction value
    return Object.values(result); 
  };
  

export default splitArrayByThickness;

