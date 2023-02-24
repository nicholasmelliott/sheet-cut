const generateReducedFractions = (denominator) => {
    const reducedFractions = Array.from({ length: denominator }, (_, i) => {
      const fraction = `${i}/${denominator}`;
      const fractionArray = fraction.split("/");
      const gcd = (a, b) => !b ? a : gcd(b, a % b);
      const reducer = gcd(fractionArray[0], fractionArray[1]);
      if(i === 0){
        return {fraction: "", decimal: 0};
      }
      const reducedNumerator = fractionArray[0] / reducer;
      const reducedDenominator = fractionArray[1] / reducer; 
      const decimal = reducedNumerator / reducedDenominator;
      return {fraction: `${reducedNumerator}/${reducedDenominator}`, decimal};
    });
    return reducedFractions;
  };
  
  export default generateReducedFractions;