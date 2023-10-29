// Utility function to find the greatest common divisor
const gcd = (a, b) => !b ? a : gcd(b, a % b);

// Utility function to convert numbers to superscript or subscript
const convertToSuperOrSubScript = (num, type) => {
  const superscript = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
  const subscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  
  const digits = num.toString().split("");
  return digits.map(digit => type === "superscript" ? superscript[parseInt(digit)] : subscript[parseInt(digit)]).join("");
};

// Function to generate reduced fractions
const generateReducedFractions = (denominator) => {
  const reducedFractions = Array.from({ length: denominator }, (_, i) => {
    const fraction = `${i}/${denominator}`;
    const fractionArray = fraction.split("/");
    const reducer = gcd(parseInt(fractionArray[0]), parseInt(fractionArray[1]));

    if(i === 0){
      return {fraction: "0", decimal: 0};
    }

    const reducedNumerator = fractionArray[0] / reducer;
    const reducedDenominator = fractionArray[1] / reducer;
    const fractionSubscript = `${convertToSuperOrSubScript(reducedNumerator, "superscript")}/${convertToSuperOrSubScript(reducedDenominator, "subscript")}`;
    const decimal = reducedNumerator / reducedDenominator;
    return {fraction: fractionSubscript, decimal};
  });

  return reducedFractions;
};

// Function to convert float to reduced fraction with a maximum denominator of 16
export const floatToReducedFraction = (floatNum, denominator) => {
  const numerator = Math.round(floatNum * denominator);
  const reducer = gcd(numerator, denominator);

  const reducedNumerator = numerator / reducer;
  const reducedDenominator = denominator / reducer;

  if (reducedDenominator === 1) return `${reducedNumerator}`;
  return `${convertToSuperOrSubScript(reducedNumerator, "superscript")}/${convertToSuperOrSubScript(reducedDenominator, "subscript")}`;
};
  
  export default generateReducedFractions;