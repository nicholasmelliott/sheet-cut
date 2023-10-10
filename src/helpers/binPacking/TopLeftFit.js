import Base from 'binpackingjs/src/2D/heuristics/Base';
import Score from 'binpackingjs/src/2D/Score';

export default class SameSizeFit extends Base {
    calculateScore(freeRect, rectWidth, rectHeight) {
      // If the box can't fit in the free rectangle, return a very high score
      if (freeRect.width < rectWidth || freeRect.height < rectHeight) {
        return new Score(Number.MAX_VALUE, Number.MAX_VALUE);
      }
  
      // Calculate "wasted" space if this box is placed here
      let leftOverHoriz = freeRect.width - rectWidth;
      let leftOverVert = freeRect.height - rectHeight;
  
      // Prefer positions where the box fits perfectly, or where the leftover space forms
      // a new free rectangle that could fit another box of the same size
      if (leftOverHoriz % rectWidth === 0 && leftOverVert % rectHeight === 0) {
        return new Score(0, 0);
      }
  
      // Otherwise, return the total amount of "wasted" space as the score
      return new Score(leftOverHoriz + leftOverVert, 0);
    }
  }


