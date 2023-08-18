import { BP2D as BinPacking2D } from 'binpackingjs'
const { Bin, Packer } = BinPacking2D;
import createBoxes from './createBoxes';
import data from '../../data/Quantity_10_ProductResults_2023-03-18_08-44-35-AM_ProductResults_2023-02-25_08-30-06-AM_product_w_Dimensions.json';

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

//Creates bins depending on thickness
const createBins = (array, matThickness, matThicknessText) => {
    const bins = [];
    array.forEach(el => {
        const dims = el.dimensions;
        if (dims) {
            if(dims.thickness == matThickness){
                const bin = new Bin(dims.width, dims.height);
                bin.thickness = dims.thickness;
                bin.thicknessText = matThicknessText;
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

// Calculates the sub quantity of boxes in a bin out of the total quantity of of a single form input
const calculateBoxQuantities = (array) => {
  array.forEach((obj) => {
    let boxQtys = {};
    obj.boxes.forEach((box) => {
      // If the colorIndex exists in the boxQtys object, increment its count. Otherwise, set it to 1.
      boxQtys[box.colorIndex] = (boxQtys[box.colorIndex] || 0) + 1;
    });
    // Add quantities to the parent object as a "boxQuantity" property
    obj.boxQuantity = boxQtys;
  });
  return array;
}

const packBoxes = (array) => {
    let finalArray = [];
    const arraysByThick = splitArrayByThickness(array);
    arraysByThick.forEach((el) => {
        const bins = createBins(data, el[0].thicknessFraction, el[0].thicknessFractionText); 
        const boxes = createBoxes( el );
        const packer = new Packer(bins);
        packer.pack(boxes);
        const nonEmptyBins = removeEmptyBins(packer.bins);
        const boxQuantityArray = calculateBoxQuantities(nonEmptyBins);
        finalArray = [...finalArray, ...boxQuantityArray];
    })
    return finalArray;
}

export default packBoxes;