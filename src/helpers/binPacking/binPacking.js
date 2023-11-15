import { BP2D as BinPacking2D } from 'binpackingjs'
const { Bin, Packer } = BinPacking2D;
import splitArrayByThickness from './splitArrayByThickness';
import createBoxes from './createBoxes';
import {floatToReducedFraction} from '../../utils/fractions';
import data from '../../data/Quantity_10_ProductResults_2023-03-18_08-44-35-AM_ProductResults_2023-02-25_08-30-06-AM_product_w_Dimensions.json';
import getPackingConfiguration from './packingConfiguration';
import { MAX_DENOMINATOR, PRICE_PROP } from '../../constants/constants';

// TODO: The following heuristic import is commented out for now as we are using 'BestAreaFit'.
// import heuristic from './TopLeftFit';

//Creates bins depending on thickness and adds needed properties to bin
const createBins = (array, matThickness, matThicknessText, config) => {
    const bins = [];
    array.forEach(el => {
        const dims = el.dimensions;
        if (dims) {
            if(dims.thickness == matThickness){
              const wInt = Math.floor(dims.width);
              const hInt = Math.floor(dims.height);
              let wDec = dims.width - wInt;
              let hDec = dims.height - hInt;
              
              // Convert decimals into reduced fractions with largest denominator of 16
              if (wDec % 1 !== 0) {
                wDec = floatToReducedFraction(wDec, MAX_DENOMINATOR)
              }
              if (hDec % 1 !== 0) {
                hDec = floatToReducedFraction(hDec, MAX_DENOMINATOR)
              }

              const bin = new Bin(dims.width, dims.height, new config.heuristic);
              bin.wInt = wInt;
              bin.hInt = hInt;
              bin.wDec = wDec;
              bin.hDec = hDec;
              bin.thickness = dims.thickness;
              bin.thicknessText = matThicknessText;
              // Check for price property and assign 0 if undefined
              bin.price = (typeof el[PRICE_PROP] !== 'undefined') ? el[PRICE_PROP] : 0;
              bins.push(bin);
            }
        }
    });
    // Sort the bins by width and then by height in ascending order
    bins.sort(config.sortFunction);
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

// Main function to pack boxes into bins based on their thickness
const packBoxes = (array) => {
    const config = getPackingConfiguration(array);
    let finalArray = [];

    // Group boxes by thickness
    const arraysByThick = splitArrayByThickness(array);

    // Iterate through each thickness group
    arraysByThick.forEach((el) => {
        // Create bins and boxes for the current group
        const bins = createBins(data, el[0].thicknessFraction, el[0].thicknessFractionText, config); 
        const boxes = createBoxes( el );

        // Pack the boxes into the bins
        const packer = new Packer(bins);
        packer.pack(boxes);

        // Filter out empty bins and calculate box quantities
        const nonEmptyBins = removeEmptyBins(packer.bins);
        const boxQuantityArray = calculateBoxQuantities(nonEmptyBins);

        // Update the final array
        finalArray = [...finalArray, ...boxQuantityArray];
    })
    return finalArray;
}

export default packBoxes;
