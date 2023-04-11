import { BP2D as BinPacking2D } from 'binpackingjs'
const { Bin, Box, Packer } = BinPacking2D;
import data from '../data/Quantity_10_ProductResults_2023-03-18_08-44-35-AM_ProductResults_2023-02-25_08-30-06-AM_product_w_Dimensions.json';

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

  

  const createBoxes = (array) => {
    return array.map((el) => {
      const { width, height, heightFraction, widthFraction, heightFractionText, widthFractionText, thicknessFraction, thicknessFractionText, index, colorIndex } = el;
      const updatedWidth = width > height ? height : width;
      const updatedHeight = width > height ? width : height;
      const updatedWFrac = width > height ? heightFraction : widthFraction;
      const updatedHFrac = width > height ? widthFraction : heightFraction;
      const updatedWFracText = width > height ? heightFractionText : widthFractionText;
      const updatedHFracText = width > height ? widthFractionText : heightFractionText;
      const box = new Box((updatedWidth + updatedWFrac), (updatedHeight + updatedHFrac));
      box.thickness = thicknessFraction;
      box.index = index;
      box.colorIndex = colorIndex;
      box.w = updatedWidth;
      box.wFrac = updatedWFracText;
      box.h = updatedHeight;
      box.hFrac = updatedHFracText;
      box.tFrac = thicknessFractionText;
      return box;
    });
  }
  

//Creates bins depending on thickness
const createBins = (array, matThickness) => {
    const bins = [];
    array.forEach(el => {
        const dims = el.dimensions;
        if (dims) {
            // console.log(dims.thickness + " : " + matThickness);
            if(dims.thickness == matThickness){
                const bin = new Bin(dims.width, dims.height);
                bin.thickness = dims.thickness;
                bin.price = el["Ace Retail"];
                bins.push(bin);
            }
        }
    });
    bins.sort(function(a, b) { return b.width - a.width || b.height - a.height });
    return bins;
}

const removeEmptyBins = (bins) => {
  const nonEmptyBins = bins.filter(({ boxes }) => boxes.length > 0);
  nonEmptyBins.sort((a, b) => a.boxes[0].index - b.boxes[0].index);
  return nonEmptyBins;
}

const packBoxes = (array) => {
    let finalArray = [];
    const arraysByThick = splitArrayByThickness(array);
    arraysByThick.forEach((el) => {
        const bins = createBins(data, el[0].thicknessFraction); 
        const boxes = createBoxes( el );
        const packer = new Packer(bins);
        packer.pack(boxes);
        const nonEmptyBins = removeEmptyBins(packer.bins);
        finalArray = [...finalArray, ...nonEmptyBins];
    })
    return finalArray;
}

export default packBoxes;
