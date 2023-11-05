import Base from 'binpackingjs/src/2D/heuristics/Base';
import Score from 'binpackingjs/src/2D/Score';

export default class FirstFit extends Base {

    calculateScore(freeRect, rectWidth, rectHeight) {
        // If the box can't fit in the free rectangle, return a very high score
        if (freeRect.width < rectWidth || freeRect.height < rectHeight) {
            return new Score(Number.MAX_VALUE, Number.MAX_VALUE);
        }

        // Return a low score (indicating suitability) for the first space where the box fits
        return new Score(0, 0);
    }
}
