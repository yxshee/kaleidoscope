# Advanced p5.js Interactive Kaleidoscope

This project is an interactive kaleidoscope created using p5.js. Users can draw on a canvas with various shapes and settings, and their strokes are mirrored across multiple segments to create beautiful, symmetrical patterns. The number of segments, colors, brush styles, and effects can be adjusted dynamically through a user-friendly interface.

## Live Demo

*(Optional: Add a link to a live demo if you deploy it, e.g., using GitHub Pages)*
[Link to Live Demo](#) *(Replace with actual link)*

## Preview

![Kaleidoscope Preview](docs/kaleidoscope_preview.gif)
*(Suggestion: Replace `docs/kaleidoscope_preview.gif` with an actual screenshot or animated GIF of your kaleidoscope in action. You can record a short GIF using tools like LICEcap (Windows/macOS), ScreenToGif (Windows), or Kap (macOS). For a static image, a screenshot of a complex pattern would be great. Place the image in a `docs` folder in your repository.)*

## Features

*   **Interactive Drawing**: Click and drag your mouse on the canvas to draw.
*   **Multiple Drawing Modes**:
    *   **Line**: Classic line drawing.
    *   **Circle**: Draws filled circles at the mouse position.
    *   **Triangle**: Draws filled equilateral triangles.
    *   **Star**: Draws 5-pointed stars.
    *   **Random Polygon**: Draws small polygons with a random number of vertices (3-6).
*   **Adjustable Brush Size**: Control the thickness/size of the selected shape or line.
*   **Adjustable Symmetry**: Use a slider to change the number of symmetrical segments (from 2 to 24).
*   **Dynamic Color Control**:
    *   **Hue**: Cycles automatically as you draw, creating a rainbow effect.
    *   **Saturation**: Slider to control the intensity of the color (0-100).
    *   **Brightness**: Slider to control the lightness/darkness of the color (0-100).
    *   **Opacity (Alpha)**: Slider to control the transparency of the drawing (0-100).
*   **Trail Effect**: Toggle a visual trail effect where previous drawings fade slowly, creating layered patterns.
*   **Clear Canvas**: A button to erase the current drawing and start fresh.
*   **Save Image**: Download the current canvas artwork as a PNG file named `kaleidoscope_art.png`.
*   **Responsive Control Layout**: Controls are organized in fieldsets and adapt to different screen sizes.
*   **Touch Friendly**: Designed to work on touch devices, preventing default browser scroll/zoom actions on the canvas for a smoother drawing experience.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/kaleidoscope.git
    cd kaleidoscope
    ```
    *(Replace `your-username` with your actual GitHub username if applicable)*

2.  **Navigate to the `code` directory:**
    ```bash
    cd code
    ```

3.  **Open `main.html` in your browser:**
    *   You can usually just double-click the `main.html` file.
    *   Alternatively, if you have a local web server (e.g., Python's built-in server, Node.js `http-server`):
        ```bash
        # Using Python 3
        python -m http.server
        ```
        Then open `http://localhost:8000/main.html` (or the port shown) in your web browser.

## Controls Interface

The controls are located below the canvas and are grouped into logical sections:

### 1. Drawing Style
   *   **Shape**: A dropdown menu to select the drawing tool.
       *   Options: `Line`, `Circle`, `Triangle`, `Star`, `Random Polygon`.
   *   **Brush Size**: A slider to adjust the size or thickness of the drawing tool. The current value is displayed.

### 2. Color Palette
   *   **Saturation**: A slider to control the saturation of the colors. The current value is displayed.
   *   **Brightness**: A slider to control the brightness of the colors. The current value is displayed.
   *   **Opacity**: A slider to control the transparency of the strokes. The current value is displayed.

### 3. Canvas & Effects
   *   **Symmetry Segments**: A slider to change the number of symmetrical segments in the kaleidoscope. The current value is displayed.
   *   **Trail Effect**: A checkbox to toggle the trail effect. When enabled, previous strokes fade out slowly.
   *   **Clear Canvas Button**: Clears the drawing area to a fresh background.
   *   **Save Image Button**: Saves the current state of the canvas as a PNG image.

## File Structure

```
kaleidoscope/
├── code/
│   ├── main.html       # Main HTML file (structure, UI controls)
│   ├── style.css       # CSS styles for layout and appearance
│   └── sketch.js       # p5.js sketch (JavaScript for drawing logic and interactivity)
├── LICENSE             # CC0 1.0 Universal License file
├── README.md           # This file (project overview, setup, usage)
└── docs/               # Documentation assets (images, GIFs)
    └── kaleidoscope_preview.gif  # Example preview image
```

## Technologies Used

*   **HTML5**: For the basic structure and UI elements.
*   **CSS3**: For styling the page and controls.
*   **JavaScript (ES6+)**: For the application logic and interactivity.
*   **p5.js (v1.9.0)**: A JavaScript library for creative coding, used for canvas manipulation, drawing, and handling user input.

## License

This project is released under the [CC0 1.0 Universal (CC0 1.0) Public Domain Dedication](LICENSE). This means it is free to use, modify, and distribute, even for commercial purposes, without any restrictions.

## Future Enhancements (Ideas)

*   **Advanced Color Palettes**: Predefined palettes, color pickers for base hue.
*   **More Brush Options**: Different textures, calligraphy styles.
*   **Animation**: Auto-drawing modes, evolving patterns over time.
*   **Sound Reactivity**: Visuals change based on microphone input or an uploaded audio file.
*   **Undo/Redo Functionality**: Step back or forward in the drawing process.
*   **Saving/Loading Configurations**: Allow users to save their favorite control settings.
*   **Background Options**: Ability to change background color or use an image.
*   **Performance Optimization**: For very complex drawings or higher segment counts.

## Contributing

Contributions are welcome! Feel free to submit pull requests with bug fixes, new features, or improvements to the documentation.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request.