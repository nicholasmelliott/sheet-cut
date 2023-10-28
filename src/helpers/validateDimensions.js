import dataArray from '../data/Quantity_10_ProductResults_2023-03-18_08-44-35-AM_ProductResults_2023-02-25_08-30-06-AM_product_w_Dimensions.json';

// Preprocess the thickness values to rounded numbers 
const preProcessedDataArray = dataArray.map(dataObject => {
    if (dataObject.dimensions && !isNaN(dataObject.dimensions.thickness)) {
      return {
        ...dataObject,
        dimensions: {
          ...dataObject.dimensions,
          thickness: parseFloat(dataObject.dimensions.thickness)
        }
      };
    }
    return dataObject;
  });

// Validate if user entered dimensions fall within available dimensions
const areDimensionsValid = (userDimensionsArray) => {
    if (!Array.isArray(userDimensionsArray) || !Array.isArray(preProcessedDataArray)) {
      return false;
    }
  
    // Iterate over each userDimensions object in the array
    for (const userDimensions of userDimensionsArray) {
      const userWidth = (parseFloat(userDimensions.width) || 0) + (parseFloat(userDimensions.widthFraction) || 0);
      const userHeight = (parseFloat(userDimensions.height) || 0) + (parseFloat(userDimensions.heightFraction) || 0);
      const userThickness = parseFloat(userDimensions.thicknessFraction);
  
      let isValidForAnyDataObject = false;
  
      // Check against each dataObject in the preProcessedDataArray
      for (const dataObject of preProcessedDataArray) {
        const { dimensions: dataDimensions } = dataObject;
        
        if (!dataDimensions) {
          continue;
        }
  
        const { width: dataWidth, height: dataHeight, thickness: dataThickness } = dataDimensions;
  
        if (
          typeof userWidth === 'number' && typeof userHeight === 'number' &&
          typeof dataWidth === 'number' && typeof dataHeight === 'number' &&
          typeof dataThickness === 'number' && typeof userThickness === 'number'
        ) {
          if ((userWidth <= dataWidth && userHeight <= dataHeight && userThickness === dataThickness) || (userWidth <= dataHeight && userHeight <= dataWidth && userThickness === dataThickness)) {
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
  