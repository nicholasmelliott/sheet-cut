// viewBoxConstants.js

// General constants
const PREV_HEIGHT = 0;
const MULTIPLIER = 15;
const CBORDER = 250;
const CMARGIN = CBORDER / 2;
const HEIGHT_INCREMENT = 0;

// Donor piece constants
const DONOR_PIECE_FILL = "#003d34";
const DONOR_PIECE_STROKE = "#000";
const DONOR_TOP_DIM_DECREMENT = 10;
const DONOR_LEFT_DIM_DECREMENT = 25;
const DONOR_SIDES_FONT_SIZE = 30;
const DONOR_SIDES_TEXT_FILL = "#000";
const DONOR_THICKNESS_INCREMENT = 90;

// To be cut piece constants
const TO_BE_CUT_PIECE_FILL = "#c7dcff";
const TO_BE_CUT_PIECE_STROKE_DASHARRAY = 10;
const TO_BE_CUT_PIECE_STROKE = "#000";
const TO_BE_CUT_TOP_DIM_INCREMENT = 35;
const TO_BE_CUT_BOTTOM_DIM_DECREMENT = 15;
const TO_BE_CUT_LEFT_DIM_INCREMENT = 15;
const TO_BE_CUT_RIGHT_DIM_DECREMENT = 15;
const TO_BE_CUT_SHEET_NUM_FONT_SIZE = 25;
const TO_BE_CUT_SIDE_DIMS_FONT_SIZE = 20;
const TO_BE_CUT_MAIN_DIM_FILL = "#000";
const TO_BE_CUT_SIDE_DIMS_FILL = "#FFF";

// To be cut list constants
const TO_BE_CUT_LIST_ALT_ITEM_FILL_1 = "#eee";
const TO_BE_CUT_LIST_ALT_ITEM_FILL_2 = "#fff";

// Export constants with lowercase aliases
export {
    PREV_HEIGHT as prevHeight,
    MULTIPLIER as multiplier,
    HEIGHT_INCREMENT as heightIncrement,
    CBORDER as cBorder,
    CMARGIN as cMargin,
    DONOR_PIECE_FILL as donorPieceFill,
    DONOR_PIECE_STROKE as donorPieceStroke,
    DONOR_TOP_DIM_DECREMENT as donorTopDimDecrement,
    DONOR_LEFT_DIM_DECREMENT as donorLeftDimDecrement,
    DONOR_SIDES_FONT_SIZE as donorSidesFontSize,
    DONOR_SIDES_TEXT_FILL as donorSidesTextFill,
    DONOR_THICKNESS_INCREMENT as donorThicknessIncrement,
    TO_BE_CUT_PIECE_FILL as toBeCutPieceFill,
    TO_BE_CUT_PIECE_STROKE_DASHARRAY as toBeCutPieceStrokeDasharray,
    TO_BE_CUT_PIECE_STROKE as toBeCutPieceStroke,
    TO_BE_CUT_TOP_DIM_INCREMENT as toBeCutTopDimIncrement,
    TO_BE_CUT_BOTTOM_DIM_DECREMENT as toBeCutBottomDimDecrement,
    TO_BE_CUT_LEFT_DIM_INCREMENT as toBeCutLeftDimIncrement,
    TO_BE_CUT_RIGHT_DIM_DECREMENT as toBeCutRightDimDecrement,
    TO_BE_CUT_SHEET_NUM_FONT_SIZE as toBeCutSheetNumFontSize,
    TO_BE_CUT_SIDE_DIMS_FONT_SIZE as toBeCutSideDimsFontSize,
    TO_BE_CUT_MAIN_DIM_FILL as toBeCutMainDimFill,
    TO_BE_CUT_SIDE_DIMS_FILL as toBeCutSideDimsFill,
    TO_BE_CUT_LIST_ALT_ITEM_FILL_1,
    TO_BE_CUT_LIST_ALT_ITEM_FILL_2
};
