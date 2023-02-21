const generateReducedFractions = (denominator) => {
    const reducedFractions = Array.from({ length: denominator }, (_, i) => {
      const fraction = `${i}/${denominator}`;
      const fractionArray = fraction.split("/");
      const gcd = (a, b) => !b ? a : gcd(b, a % b);
      const reducer = gcd(fractionArray[0], fractionArray[1]);
      if(i === 0){
        return "";
      }
      return `${fractionArray[0] / reducer}/${fractionArray[1] / reducer}`;
    });
    return reducedFractions;
  };
  
  export default generateReducedFractions;