# Material Cutting App

The Material Cutting App is a web application designed to optimize material usage by generating cutting plans for desired material sheet sizes. It helps users make efficient use of available donor material sheets by providing a visual representation of the recommended cutting layout. The app allows users to input their desired material sheet dimensions and finds the best way to cut them from available donor sheets. With an interactive interface and the ability to print cutting layouts for offline reference, the Material Cutting App streamlines the material cutting process and minimizes waste.

## Features

- Input material dimensions: Users can enter the dimensions of the material sheets they want to cut.
- Finding donor material sheets: The app finds the available donor material sheet(s) that can accommodate the desired material sheets.
- Cutting layout visualization: The app provides a visual representation of the recommended cutting layout, showing how the desired material sheets can be cut from the donor material sheet(s).
- Dimension labels: The app displays dimensions (width, height) for the donor material sheet(s) and the cut pieces.
- Price estimation: The app shows the price estimation for each cut piece based on the donor material sheet's price and thickness.
- Interactive interface: Users can interact with the cutting plan, zoom in/out, and scroll to view different parts of the layout.
- Print feature: Users can print the cutting layout for offline reference.

## Technologies Used
- Vite: Build tool that provides a fast development server and optimized production build.
- React: JavaScript library for building the user interface.
- SVG: Scalable Vector Graphics used to render the cutting layout.
- CSS: Styling and layout of the app.
- JavaScript: Programming language used for app logic and calculations.

### Getting started

Clone the repository and run `npm install` or `yarn` to install all dependencies:

```bash
git clone https://github.com/your-repo/material-cutting-app.git
cd material-cutting-app
npm install
# or
yarn
```

### Run the app locally

Start the application in development mode with Vite:

```bash
npm run dev
# or
yarn dev
```

### Building for production

To create a production-ready build of the app:

```bash
npm run build
# or
yarn build
```

## Usage

1. Enter the dimensions of the material sheets you want to cut.
2. The app will find the available donor material sheet(s) that can accommodate the desired sheets.
3. The cutting plan will be displayed, showing the recommended layout of the cut pieces on the donor material sheet(s).
4. Interact with the cutting plan by zooming in/out and scrolling to view different parts of the layout.
5. The dimensions and price estimation for each cut piece will be displayed.
6. Use the print feature to print the cutting layout for offline reference.
7. Adjust the input dimensions if needed, and the cutting plan will be updated accordingly.


<img src="./public/SheetCutExample.gif" alt="Your GIF" style="width: 300px; height: 500px;">
