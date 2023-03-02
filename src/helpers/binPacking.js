import { BP2D as BinPacking2D } from 'binpackingjs'
const { Bin, Box, Packer } = BinPacking2D;
import data from '../data/Product_w_Dimensions.json';

const ranBoxes = () => {
    const boxes = [];
    for(let i = 0; i < 15; i++) {
        boxes.push(new Box(i + 5, i + 5));
    }
    return boxes;
}

const createBoxes = (array) => {
    const boxes = [];
    array.forEach((el, i) => {
        boxes.push(new Box(parseInt(el.width) + parseFloat(el.widthFraction), parseInt(el.height) + parseFloat(el.heightFraction)));
        boxes[i].thickness = parseFloat(el.thicknessFraction);
    });
    return boxes;
}

const createBins = function(array) {
    const bins = [];
    array.forEach(el => {
        const dims = el.dimensions;
        if (dims.thickness == "2.500") {
            const bin = new Bin(dims.width, dims.height);
            bin.thickness = dims.thickness;
            bin.price = el["Ace Retail"];
            bins.push(bin);
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
    const bins = createBins(data);
    const boxes = createBoxes( array );
    const packer = new Packer(bins);
    const packed_boxes = packer.pack(boxes);
    const nonEmptyBins = removeEmptyBins(packer.bins);
    return nonEmptyBins;
}

export default packBoxes;
