<p align="center">
  <img width="588" alt="Kaleidoscope Preview" src="https://github.com/user-attachments/assets/785d0300-d7fc-4535-b3e7-c758239ae3cc" />
</p>





<h1 align="center"> Kaleidoscope </h1>

<p align="center">
  An interactive kaleidoscope created using p5.js. Draw with various shapes and settings, mirrored across multiple segments to create beautiful, symmetrical patterns. Dynamically adjust symmetry, colors, brush styles, and effects through a user-friendly interface.
</p>

<p align="center">
  <a href="#features">✨ Features</a> •
  <a href="#how-to-run-locally">🚀 How to Run</a> •
  <a href="#controls-interface">🛠️ Controls</a> •
  <a href="#file-structure">📂 File Structure</a> •
  <a href="#technologies-used">💻 Technologies</a> •
  <a href="#license">📜 License</a> •
  <a href="#contributing">🤝 Contributing</a>
</p>

<!-- Optional: Live Demo Badge -->
<!-- 
<p align="center">
  <a href="YOUR_LIVE_DEMO_URL_HERE">
    <img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=netlify" alt="Live Demo"/>
  </a>
</p>
-->

---

## ✨ Features

*   **✍️ Interactive Drawing**: Click and drag your mouse on the canvas to draw.
*   **🎨 Multiple Drawing Modes**:
    *   **Line**: Classic line drawing.
    *   **Circle**: Draws filled circles.
    *   **Triangle**: Draws filled equilateral triangles.
    *   **Star**: Draws 5-pointed stars.
    *   **Random Polygon**: Draws small polygons with 3-6 vertices.
*   **🖌️ Adjustable Brush Size**: Control the thickness/size of the drawing tool.
*   **🔄 Adjustable Symmetry**: Slider to change symmetrical segments (2 to 24).
*   **🌈 Dynamic Color Control**:
    *   **Hue**: Cycles automatically for a rainbow effect.
    *   **Saturation**: Slider to control color intensity (0-100).
    *   **Brightness**: Slider to control color lightness/darkness (0-100).
    *   **Opacity (Alpha)**: Slider for drawing transparency (0-100).
*   **🌫️ Trail Effect**: Toggle a visual trail where drawings fade slowly.
*   **🗑️ Clear Canvas**: Button to erase the drawing.
*   **💾 Save Image**: Download artwork as a PNG (`kaleidoscope_art.png`).
*   **📱 Responsive Controls**: Layout adapts to screen sizes.
*   **👆 Touch Friendly**: Smooth experience on touch devices.

---

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/kaleidoscope.git # Replace your-username
    cd kaleidoscope
    ```

2.  **Navigate to the `code` directory:**
    ```bash
    cd code
    ```

3.  **Open `main.html` in your browser:**
    *   Double-click `main.html`.
    *   Or, use a local web server (e.g., Python's):
        ```bash
        # Using Python 3
        python -m http.server
        ```
        Then open `http://localhost:8000/main.html` in your browser.

---

## 🛠️ Controls Interface

The controls are located below the canvas, grouped into logical sections:

### 1. Drawing Style
   *   **Shape**: Dropdown (`Line`, `Circle`, `Triangle`, `Star`, `Random Polygon`).
   *   **Brush Size**: Slider to adjust tool size.

### 2. Color Palette
   *   **Saturation**: Slider for color intensity.
   *   **Brightness**: Slider for color lightness.
   *   **Opacity**: Slider for stroke transparency.

### 3. Canvas & Effects
   *   **Symmetry Segments**: Slider for segment count.
   *   **Trail Effect**: Checkbox to toggle.
   *   **Clear Canvas Button**: Erases the drawing.
   *   **Save Image Button**: Downloads canvas as PNG.

---

## 📂 File Structure

```
kaleidoscope/
├── code/
│   ├── main.html       # Main HTML file (structure, UI controls)
│   ├── style.css       # CSS styles
│   └── sketch.js       # p5.js sketch (JavaScript logic)
├── docs/
│   └── kaleidoscope_preview.gif # Example preview image (replace with your own)
├── .gitignore          # Specifies intentionally untracked files
├── LICENSE             # CC0 1.0 Universal License file
└── README.md           # This file
```
*Note: The `kaleidoscope_preview.gif` in `docs/` is a placeholder. You should replace it with your actual preview image/gif.*

---

## 💻 Technologies Used

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/p5.js-ED225D?style=for-the-badge&logo=p5dotjs&logoColor=white" alt="p5.js"/>
</p>

---

## 📜 License

This project is released under the **CC0 1.0 Universal (CC0 1.0) Public Domain Dedication**.

<p align="left">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg?style=for-the-badge" alt="License: CC0 1.0"/>
  </a>
</p>

This means it is free to use, modify, and distribute, even for commercial purposes, without any restrictions. See the [LICENSE](LICENSE) file for more details.

---

## 💡 Future Enhancements (Ideas)

*   Advanced Color Palettes (predefined, color pickers)
*   More Brush Options (textures, calligraphy)
*   Animation (auto-draw, evolving patterns)
*   Sound Reactivity (visuals change with audio input)
*   Undo/Redo Functionality
*   Saving/Loading Configurations
*   Background Options (color change, image upload)
*   Performance Optimization

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests with bug fixes, new features, or improvements.

1.  **Fork** the repository.
2.  Create a **new branch** (`git checkout -b feature/YourFeature`).
3.  Make your **changes**.
4.  **Commit** your changes (`git commit -m 'Add some feature'`).
5.  **Push** to the branch (`git push origin feature/YourFeature`).
6.  Open a **Pull Request**.

---

<p align="center">Made with ❤️ and p5.js</p>

<p align="center">
  <img width="24%" alt="Kaleidoscope Preview" src="https://github.com/user-attachments/assets/94067d96-f1ff-43e4-b3f5-14bfa51b8c04" />


  <img width="24%" alt="Kaleidoscope Preview" src="https://github.com/user-attachments/assets/534a8158-054a-493d-899b-763b427b0e27" />

  <img width="24%" alt="Kaleidoscope Preview" src="https://github.com/user-attachments/assets/f021c42f-c1c1-4113-b6c7-69b6068b554d" />

  <img width="24%" alt="Kaleidoscope Preview" src="https://github.com/user-attachments/assets/59699315-cd12-4ae1-ac36-fba05e7af943" />
</p>





