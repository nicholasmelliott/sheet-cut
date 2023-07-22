import { BP2D as BinPacking2D } from 'binpackingjs'
const { Box } = BinPacking2D;

const createBoxes = (array) => {
    return array.map((el) => {
      const { width, height, heightFraction, widthFraction, heightFractionText, widthFractionText, thicknessFraction, thicknessFractionText, index, colorIndex, quantity } = el;
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
      box.tFrac = thicknessFractionText
      box.quantity = quantity;
      return box;
    });
  }

export default createBoxes;
