import dataArray from '../data/Quantity_10_ProductResults_2023-03-18_08-44-35-AM_ProductResults_2023-02-25_08-30-06-AM_product_w_Dimensions.json';
  
// Validate if user entered dimensions fall within available dimensions
const areDimensionsValid = (userDimensionsArray) => {
    if (!Array.isArray(userDimensionsArray) || !Array.isArray(dataArray)) {
      return false;
    }
  
    // Iterate over each userDimensions object in the array
    for (const userDimensions of userDimensionsArray) {
      const userWidth = (parseFloat(userDimensions.width) || 0) + (parseFloat(userDimensions.widthFraction) || 0);
      const userHeight = (parseFloat(userDimensions.height) || 0) + (parseFloat(userDimensions.heightFraction) || 0);
  
      let isValidForAnyDataObject = false;
  
      // Check against each dataObject in the dataArray
      for (const dataObject of dataArray) {
        const { dimensions: dataDimensions } = dataObject;
        
        if (!dataDimensions) {
          continue;
        }
  
        const { width: dataWidth, height: dataHeight } = dataDimensions;
  
        if (
          typeof userWidth === 'number' && typeof userHeight === 'number' &&
          typeof dataWidth === 'number' && typeof dataHeight === 'number'
        ) {
          if ((userWidth <= dataWidth && userHeight <= dataHeight) || (userWidth <= dataHeight && userHeight <= dataWidth)) {
            isValidForAnyDataObject = true;
            break;
          }
        }
      }
  
      if (!isValidForAnyDataObject) {
        return false;
      }
    }
  
    return true;
  };

export default areDimensionsValid;
  