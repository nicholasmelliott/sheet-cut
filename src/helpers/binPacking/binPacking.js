import { BP2D as BinPacking2D } from 'binpackingjs'
const { Bin, Packer } = BinPacking2D;
import splitArrayByThickness from './splitArrayByThickness';
import createBoxes from './createBoxes';
import data from '../../data/Quantity_10_ProductResults_2023-03-18_08-44-35-AM_ProductResults_2023-02-25_08-30-06-AM_product_w_Dimensions.json';
import heuristic from 'binpackingjs/src/2D/heuristics/BestAreaFit';
// TODO: The following heuristic import is commented out for now as we are using 'BestAreaFit'.
// import heuristic from './TopLeftFit';

//Creates bins depending on thickness
const createBins = (array, matThickness, matThicknessText) => {
    const bins = [];
    array.forEach(el => {
        const dims = el.dimensions;
        if (dims) {
            if(dims.thickness == matThickness){
                const bin = new Bin(dims.width, dims.height, new heuristic);
                bin.thickness = dims.thickness;
                bin.thicknessText = matThicknessText;
                bin.price = el["Ace Retail"];
                bins.push(bin);
            }
        }
    });
    // Sort the bins by width and then by height in descending order
    bins.sort(function(a, b) { return b.width - a.width || b.height - a.height });
    return bins;
}

// Remove bins that are empty and sort the remaining bins by the index of their first box
const removeEmptyBins = (bins) => {
  // Filter out bins that have no boxes
  const nonEmptyBins = bins.filter(({ boxes }) => boxes.length > 0);
  
  // Sort non-empty bins based on the index of the first box in each bin
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
