// import heuristic from 'binpackingjs/src/2D/heuristics/BestAreaFit';
import FirstFit from './FirstFit'
import BestShortSide from '../../../node_modules/binpackingjs/src/2D/heuristics/BestShortSideFit.js'

// Checks if all boxes are the same size.
const allBoxesAreSameSize = (boxes) => {
    const [firstBox] = boxes;
    
    // Check if any box has width and height of 0 or empty strings
    return boxes.every(box => 
        // Check if the box has zero or empty size
        (((box.width === 0 || box.width === '') && box.widthFraction === 0) ||
         ((box.height === 0 || box.height === '') && box.heightFraction === 0)) ||
        // OR check if the box is the same size as the first box
        (box.width === firstBox.width && box.height === firstBox.height)
    );
};

const boxesAreDifferentSizes = (boxes) => {
    const [firstBox] = boxes;
    return boxes.some(box => box.width !== firstBox.width || box.height !== firstBox.height);
};

const getPackingConfiguration = (boxes) => {
    if (allBoxesAreSameSize(boxes)) {
        return {
            heuristic: FirstFit,
            sortFunction: (a, b) => a.width - b.width || a.height - b.height
        };
    } else if (boxesAreDifferentSizes(boxes)) {
        return {
            heuristic: BestShortSide,
            sortFunction: (a, b) => b.width - a.width || b.height - a.height
        };
    }
    // Return default heuristic
    return {
        heuristic: BestShortSide,
        sortFunction: (a, b) => b.width - a.width || b.height - a.height
    };
};

export default getPackingConfiguration;