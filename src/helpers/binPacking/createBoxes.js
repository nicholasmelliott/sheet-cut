import { BP2D as BinPacking2D } from 'binpackingjs'
const { Box } = BinPacking2D;

// Create a new class that extends the Box class
class CustomBox extends Box {
  constructor(width, height, w, h, thickness, index, colorIndex, quantity, wFracText, hFracText, tFracText) {
    super(width, height);
    this.w = w;
    this.h = h;
    this.thickness = thickness;
    this.index = index;
    this.colorIndex = colorIndex;
    this.quantity = quantity;
    this.wFrac = wFracText;
    this.hFrac = hFracText;
    this.tFrac = tFracText;
  }
}

const createBoxes = (array) => {
    return array.map((el) => {
      const { width, height, heightFraction, widthFraction, heightFractionText, widthFractionText, thicknessFraction, thicknessFractionText, index, colorIndex, quantity } = el;
      
      const isWidthGreater = width > height;
      const dimensions = {
        updatedWidth: isWidthGreater ? height : width,
        updatedHeight: isWidthGreater ? width : height,
        updatedWFrac: isWidthGreater ? heightFraction : widthFraction,
        updatedHFrac: isWidthGreater ? widthFraction : heightFraction,
        updatedWFracText: isWidthGreater ? heightFractionText : widthFractionText,
        updatedHFracText: isWidthGreater ? widthFractionText : heightFractionText
      };
  
      const box = new CustomBox(
        dimensions.updatedWidth + dimensions.updatedWFrac, 
        dimensions.updatedHeight + dimensions.updatedHFrac,
        dimensions.updatedWidth,
        dimensions.updatedHeight, 
        thicknessFraction, 
        index, 
        colorIndex, 
        quantity, 
        dimensions.updatedWFracText, 
        dimensions.updatedHFracText, 
        thicknessFractionText
      );
  
      return box;
    });
  }

export default createBoxes;
