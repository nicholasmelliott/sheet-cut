const windowWidth = window.innerWidth;
const cBorder = 250;
const multiplier = 15;

// Scales font size and spacing to maintain consistency across all SVG viewboxes.
const scaleWithWindow = (viewBoxWidth, adjVal) => {
    const xlWindowMult = 3;
    const lgWindowMult = 2;
    if(windowWidth > 1200){
      return (((viewBoxWidth * multiplier) + cBorder)/ windowWidth) * (adjVal * xlWindowMult);
    }else if(windowWidth > 768){
      return (((viewBoxWidth * multiplier) + cBorder)/ windowWidth) * (adjVal * lgWindowMult);
    }else{
      return (((viewBoxWidth * multiplier) + cBorder)/ windowWidth) * adjVal;
    }
  }

export default scaleWithWindow;