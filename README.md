# TAKUMI Project WebAR Experience

A stylish web application that showcases traditional Japanese craftsmanship as art using 3D models with WebAR support.

## Features

- Interactive 3D models of traditional Japanese craftsmanship
- WebAR support for placing the artworks in your space
- Responsive design for mobile and desktop
- Multiple camera angles to explore the models
- Elegant UI with informative content about TAKUMI Project and Japanese traditional crafts

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## Adding Your 3D TAKUMI Project Models

This project uses Google's `<model-viewer>` to display 3D models with WebAR support. To add your own traditional craft models:

1. Place your GLB/GLTF model file in the `src/models` directory
   - The current models include KING.gltf and QUEEN.gltf
   - You can find or create models that showcase traditional Japanese craftsmanship

2. (Optional) Add environment HDR for better lighting:
   - Place your HDR file in `src/assets/environment.hdr`

3. (Optional) Add a poster image to show before the model loads:
   - Place your poster image in `src/assets/poster.webp`

## Technologies Used

- TypeScript
- Google's `<model-viewer>` for 3D and AR functionality
- Webpack for bundling
- Modern CSS with Grid and Flexbox

## WebAR Support

WebAR is supported on:
- Android: Chrome and other browsers that support WebXR
- iOS: Safari with Quick Look AR

## License

MIT 