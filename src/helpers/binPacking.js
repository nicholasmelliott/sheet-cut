import { BP2D as BinPacking2D } from 'binpackingjs'
const { Bin, Box, Packer } = BinPacking2D;
import data from '../data/ProductResults_2023-03-18_08-44-35-AM_ProductResults_2023-02-25_08-30-06-AM_product_w_Dimensions.json';

const splitArryByThickness = arr => {
    const newArry = [];
    
    if(!Array.isArray(arr)){
      return []; // Return an empty array if the input is not an array
    }
  
    const result = arr.reduce((acc, curr) => {
        if(!curr){
            return acc; // Skip the current element if it is falsy
        }
  
        const thickness = curr.thicknessFraction;
        if (!acc[thickness]) {
          acc[thickness] = [curr]; // Create a new array for the current thickness and add the current element to it
        } else {
          const index = acc[thickness].findIndex(obj => obj.thicknessFraction < thickness);
          if (index === -1) {
            acc[thickness].push(curr); // Add the current element to the end of the existing array for the current thickness
          } else {
            acc[thickness].splice(index, 0, curr); // Insert the current element at the correct position in the existing array for the current thickness
          }
        }
        return acc; // Return the accumulator object with updated arrays for each thickness
    }, {}); // Initialize the accumulator object as an empty object
  
    for(const thickness in result){
      newArry.push(result[thickness]);
    }
    return newArry;
  };
  

const createBoxes = (array) => {
    const boxes = [];
    array.forEach((el, i) => {
        boxes.push(new Box(parseInt(el.width) + parseFloat(el.widthFraction), parseInt(el.height) + parseFloat(el.heightFraction)));
        boxes[i].thickness = parseFloat(el.thicknessFraction);
        boxes[i].index = i;
        boxes[i].w = el.width;
        boxes[i].wFrac = el.widthFractionText;
        boxes[i].h = el.height;
        boxes[i].hFrac = el.heightFractionText;
        boxes[i].tFrac = el.thicknessFractionText;
    });
    return boxes;
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
    const nonEmptyBins = [];
    for(let i = 0; i < bins.length; i++) {
        if(bins[i].boxes.length != 0) {
            nonEmptyBins.push(bins[i]);
        }
    }
    return nonEmptyBins;
}

const packBoxes = (array) => {
    let finalArray = [];
    const arraysByThick = splitArryByThickness(array);
    arraysByThick.forEach(el => {
        const bins = createBins(data, parseFloat(el[0].thicknessFraction)); 
        const boxes = createBoxes( el );
        const packer = new Packer(bins);
        packer.pack(boxes);
        const nonEmptyBins = removeEmptyBins(packer.bins);
        finalArray = [...finalArray, ...nonEmptyBins];
    })
    return finalArray;
}

export default packBoxes;
