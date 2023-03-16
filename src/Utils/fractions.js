const generateReducedFractions = (denominator) => {
  const superscript = [ '⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹' ];
  const subscript = [ '₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉' ];
    const reducedFractions = Array.from({ length: denominator }, (_, i) => {
      const fraction = `${i}/${denominator}`;
      const fractionArray = fraction.split("/");
      const gcd = (a, b) => !b ? a : gcd(b, a % b);
      const reducer = gcd(fractionArray[0], fractionArray[1]);
      if(i === 0){
        return {fraction: "0", decimal: 0};
      }
      const reducedNumerator = fractionArray[0] / reducer;
    const reducedDenominator = fractionArray[1] / reducer;
    const numeratorSubscript = reducedNumerator.toString().split('').map(digit => superscript[digit]).join('');
    const denominatorSubscript = reducedDenominator.toString().split('').map(digit => subscript[digit]).join('');
    const fractionSubscript = `${numeratorSubscript}/${denominatorSubscript}`;
    const decimal = reducedNumerator / reducedDenominator;
    return {fraction: fractionSubscript, decimal};
    });
    return reducedFractions;
  };
  
  export default generateReducedFractions;