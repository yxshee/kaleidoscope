<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aesthetic Interactive p5.js Kaleidoscope</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #f4f7f6; /* Page background */
            --text-color: #333; /* Default text color */
            --primary-accent: #007bff; /* Main accent color for UI elements */
            --secondary-accent: #6c757d; /* Secondary accent for less prominent elements */
            --border-color: #d1d1d1; /* Border color for inputs and fieldsets */
            --input-bg: #fff; /* Background for inputs */
            --card-bg: #fff; /* Background for control panels (fieldsets) */
            --shadow-color: rgba(0,0,0,0.08); /* Soft shadow color */
            --title-font: 'Playfair Display', serif; /* Font for the main title */
            --body-font: 'Roboto', sans-serif; /* Font for UI controls and text */
        }

        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: var(--bg-color);
            font-family: var(--body-font);
            color: var(--text-color);
            padding: 20px 10px; 
            box-sizing: border-box;
        }

        .main-title {
            font-family: var(--title-font);
            font-size: clamp(2.5em, 5vw, 3.8em); /* Responsive font size for title */
            color: #2c3e50; /* Dark, sophisticated title color */
            text-align: center;
            margin-bottom: 20px;
            letter-spacing: 1px; /* Adds a touch of elegance */
        }

        .info-text {
            font-size: clamp(0.9em, 2vw, 1em); /* Responsive info text */
            color: var(--secondary-accent);
            text-align: center;
            margin-bottom: 25px;
            max-width: 600px; /* Keeps info text readable */
        }

        #canvas-container {
            margin-bottom: 30px;
            box-shadow: 0 8px 25px var(--shadow-color); /* Prominent shadow for canvas */
            border-radius: 12px; /* Rounded corners for the canvas container */
            overflow: hidden; /* Ensures canvas respects border-radius */
            background-color: #fff; 
        }

        canvas {
            display: block; /* Removes extra space below canvas */
            border-radius: 10px; /* Rounded corners for the canvas itself */
        }

        .controls-grid {
            display: flex;
            flex-wrap: wrap; /* Allows controls to stack on smaller screens */
            gap: 20px; /* Space between control panels */
            justify-content: center; /* Center panels horizontally */
            max-width: 900px; /* Max width for the control area */
            width: 100%; /* Full width up to max-width */
        }

        fieldset {
            border: 1px solid var(--border-color);
            border-radius: 12px; /* Consistent rounded corners */
            padding: 20px 25px; /* Ample padding inside panels */
            background-color: var(--card-bg);
            box-shadow: 0 5px 15px var(--shadow-color); /* Subtle shadow for depth */
            flex: 1 1 280px; /* Flex properties for responsive panel sizing */
            min-width: 260px; /* Minimum width before stacking */
            transition: box-shadow 0.3s ease; /* Smooth shadow transition on hover */
        }
        fieldset:hover {
            box-shadow: 0 8px 20px rgba(0,0,0,0.12); /* Enhanced shadow on hover */
        }

        fieldset legend {
            font-family: var(--body-font);
            font-weight: 500; /* Medium weight for legends */
            color: var(--primary-accent);
            padding: 0 10px;
            font-size: 1.2em; /* Clear, readable legend size */
            margin-left: 5px; 
        }

        fieldset div {
            margin-bottom: 18px; /* Spacing between controls within a panel */
            display: flex;
            flex-direction: column; /* Stack labels above inputs */
            gap: 8px; /* Space between label and its input */
        }

        fieldset div.inline-control { /* For controls where label and input are side-by-side */
            flex-direction: row;
            align-items: center;
            justify-content: space-between; 
        }
         fieldset div.inline-control label {
            margin-right: 10px; 
        }

        fieldset label {
            font-size: 0.95em;
            color: #555; /* Slightly darker label text for readability */
            font-weight: 400; 
        }

        /* Custom styling for range inputs (sliders) */
        input[type="range"] {
            -webkit-appearance: none; /* Remove default Safari styling */
            appearance: none; /* Remove default Chrome/Firefox styling */
            width: 100%;
            height: 8px; /* Height of the slider track */
            background: #ddd; /* Color of the slider track */
            border-radius: 5px; /* Rounded track */
            outline: none; /* Remove focus outline */
            padding: 0; /* Override default padding */
        }

        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px; /* Width of the slider thumb */
            height: 18px; /* Height of the slider thumb */
            background: var(--primary-accent); /* Thumb color */
            border-radius: 50%; /* Circular thumb */
            cursor: pointer;
            border: 2px solid var(--input-bg); /* Border for visual separation */
        }

        input[type="range"]::-moz-range-thumb { /* Firefox thumb styling */
            width: 16px;
            height: 16px;
            background: var(--primary-accent);
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid var(--input-bg);
        }
        
        /* General styling for other inputs and buttons */
        select, .toggle-switch button {
            width: 100%;
            padding: 10px 12px;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            background-color: var(--input-bg);
            box-sizing: border-box;
            font-size: 0.95em;
            font-family: var(--body-font);
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        input[type="range"]:focus, select:focus, .toggle-switch button:focus {
            border-color: var(--primary-accent);
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2); /* Focus indicator */
            outline: none;
        }

        input[type="checkbox"] {
            width: 1.3em; /* Larger, easier to click checkbox */
            height: 1.3em;
            margin-right: 8px;
            accent-color: var(--primary-accent); /* Modern checkbox coloring */
            cursor: pointer;
            vertical-align: middle; /* Align checkbox with label text */
        }

        button.control-button { 
            color: white;
            background-color: var(--primary-accent);
            cursor: pointer;
            transition: background-color 0.2s ease, transform 0.1s ease;
            border: none;
            font-size: 1em;
            font-weight: 500;
            padding: 12px 15px;
            border-radius: 6px; /* Consistent button rounding */
        }
        button.control-button:hover {
            background-color: #0056b3; /* Darker shade on hover */
            transform: translateY(-1px); /* Subtle lift effect */
        }
        button.control-button:active {
            transform: translateY(0px); /* Press down effect */
        }

        #saveImageButton { background-color: #28a745; /* Green for save button */ }
        #saveImageButton:hover { background-color: #1e7e34; }

        .slider-value { /* Display for slider's current value */
            font-weight: 500;
            color: var(--primary-accent);
            margin-left: 8px;
            font-size: 0.9em;
        }
        
        /* Custom toggle switch for canvas theme */
        .toggle-switch {
            display: flex;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            overflow: hidden; /* Keeps child button rounding neat */
        }
        .toggle-switch button {
            flex: 1; /* Each button takes equal space */
            padding: 10px;
            border: none;
            background-color: var(--input-bg);
            color: var(--secondary-accent);
            cursor: pointer;
            transition: background-color 0.2s ease, color 0.2s ease;
            border-radius: 0; 
        }
        .toggle-switch button.active { /* Style for the active toggle button */
            background-color: var(--primary-accent);
            color: white;
            font-weight: 500;
        }
        .toggle-switch button:first-child { /* Separator line for toggle */
            border-right: 1px solid var(--border-color); 
        }

    </style>
</head>
<body>
    <h1 class="main-title">Kaleidoscope Dreams</h1>
    <p class="info-text">Craft mesmerizing symmetrical art. Click and drag on the canvas, and explore the controls to shape your vision.</p>
    <div id="canvas-container"></div>

    <div class="controls-grid">
        <fieldset>
            <legend>Artistry</legend>
            <div>
                <label for="drawingModeSelect">Drawing Mode:</label>
                <select id="drawingModeSelect">
                    <option value="line">Flowing Lines</option>
                    <option value="circle">Mystic Circles</option>
                    <option value="triangle">Crystal Triangles</option>
                    <option value="star">Celestial Stars</option>
                    <option value="randomShape">Chaotic Polygons</option>
                </select>
            </div>
            <div>
                <label for="brushSizeSlider">Brush Size: <span id="brushSizeValue" class="slider-value">10</span></label>
                <input type="range" id="brushSizeSlider" min="1" max="50" value="10">
            </div>
             <div class="inline-control">
                <label for="shapeSpinCheckbox">Shape Spin:</label>
                <input type="checkbox" id="shapeSpinCheckbox">
            </div>
        </fieldset>

        <fieldset>
            <legend>Color Realm</legend>
            <div>
                <label for="colorPaletteSelect">Color Palette:</label>
                <select id="colorPaletteSelect">
                    <option value="rainbow">Rainbow Cycle</option>
                    <option value="ocean">Ocean Blues</option>
                    <option value="sunset">Sunset Hues</option>
                    <option value="forest">Forest Greens</option>
                    <option value="monochrome">Monochrome Grays</option>
                </select>
            </div>
            <div>
                <label for="saturationSlider">Saturation: <span id="saturationValue" class="slider-value">90</span></label>
                <input type="range" id="saturationSlider" min="0" max="100" value="90">
            </div>
            <div>
                <label for="brightnessSlider">Brightness: <span id="brightnessValue" class="slider-value">90</span></label>
                <input type="range" id="brightnessSlider" min="0" max="100" value="90">
            </div>
            <div>
                <label for="alphaSlider">Shape Opacity: <span id="alphaValue" class="slider-value">70</span></label>
                <input type="range" id="alphaSlider" min="0" max="100" value="70">
            </div>
        </fieldset>

        <fieldset>
            <legend>Canvas & Effects</legend>
            <div>
                <label for="canvasThemeToggle">Canvas Theme:</label>
                <div class="toggle-switch" id="canvasThemeToggle">
                    <button data-theme="light" class="active">Light</button>
                    <button data-theme="dark">Dark</button>
                </div>
            </div>
            <div>
                <label for="symmetrySlider">Symmetry: <span id="symmetryDisplayValue" class="slider-value">6</span></label>
                <input type="range" id="symmetrySlider" min="2" max="30" value="6"> 
            </div>
            <div class="inline-control">
                <label for="trailEffectCheckbox">Trail Effect:</label>
                <input type="checkbox" id="trailEffectCheckbox">
            </div>
            <div>
                <label for="trailFadeSlider">Trail Persistence: <span id="trailFadeValue" class="slider-value">85</span></label>
                <input type="range" id="trailFadeSlider" min="0" max="98" value="85" disabled>
            </div>
            <button id="clearButton" class="control-button">Clear Canvas</button>
            <button id="saveImageButton" class="control-button">Save Image</button>
        </fieldset>
    </div>

    <script>
        // --- Global Variables ---
        let symmetry = 6; // Number of symmetrical segments
        let angle;       // Angle of each segment (calculated from symmetry)
        let p5Canvas;    // Holds the p5.js canvas object

        // Drawing Style Variables
        let drawingMode = 'line';       // Current shape being drawn
        let currentBrushSize = 10;    // Size of the drawing tool
        let enableShapeSpin = false;    // Flag to enable/disable individual shape rotation
        let currentShapeAngle = 0;    // Current rotation angle for spinning shapes

        // Color Variables
        let hueValue = 0;             // Base hue for cycling colors
        let saturationValue = 90;     // Saturation component of HSB color
        let brightnessValue = 90;     // Brightness component of HSB color
        let alphaValue = 70;          // Opacity of the drawn shapes
        let selectedColorPalette = 'rainbow'; // Active color palette preset

        // Canvas & Effects Variables
        let isDarkTheme = false;      // Flag for canvas theme (light/dark)
        let trailEffectActive = false;// Flag for enabling/disabling drawing trails
        let trailPersistence = 85;    // How long trails last (0=quick fade, 98=long trail)

        // Canvas base colors (HSB format: [Hue, Saturation, Brightness])
        const lightThemeBg = [10, 5, 97]; // Very light grey for light theme
        const darkThemeBg = [220, 15, 15]; // Dark blue-grey for dark theme

        // Predefined color palettes
        const palettes = {
            rainbow: { type: 'cycle', hues: [0, 360] }, // Full spectrum hue cycle
            ocean: { type: 'random', colors: [[180, 70, 80], [190, 80, 70], [200, 90, 90], [210, 60, 60], [220, 75, 75]] },
            sunset: { type: 'random', colors: [[15, 90, 90], [30, 100, 85], [45, 85, 90], [5, 80, 80], [350, 90, 75]] },
            forest: { type: 'random', colors: [[90, 60, 50], [100, 70, 60], [110, 50, 40], [120, 65, 55], [80, 55, 45]] },
            monochrome: { type: 'random', colors: [[0, 0, 20], [0, 0, 40], [0, 0, 60], [0, 0, 70], [0, 0, 80]] }
        };
        let currentPaletteColorIndex = 0; // Index for iterating through predefined palette colors


        // --- P5.js Setup Function: Runs once when the sketch starts ---
        function setup() {
            p5Canvas = createCanvas(600, 600); // Create the drawing canvas
            p5Canvas.parent('canvas-container'); // Place canvas in designated HTML div

            angleMode(DEGREES); // Use degrees for rotation calculations
            colorMode(HSB, 360, 100, 100, 100); // Set color mode: Hue, Sat, Bright, Alpha
            applyCanvasTheme(); // Set the initial canvas background based on theme
            updateSymmetry(symmetry); // Calculate initial segment angle

            // --- UI Element Setup & Event Handlers ---
            // Drawing Mode Selector
            select('#drawingModeSelect').changed(function() { drawingMode = this.value(); });
            
            // Brush Size Slider
            select('#brushSizeSlider').input(function() {
                currentBrushSize = parseInt(this.value());
                select('#brushSizeValue').html(currentBrushSize);
            });
            select('#brushSizeValue').html(currentBrushSize); // Initial display

            // Shape Spin Checkbox
            select('#shapeSpinCheckbox').changed(function() { enableShapeSpin = this.checked(); });

            // Color Palette Selector
            select('#colorPaletteSelect').changed(function() { 
                selectedColorPalette = this.value(); 
                currentPaletteColorIndex = 0; // Reset index when palette changes
            });

            // Saturation Slider
            select('#saturationSlider').input(function() {
                saturationValue = parseInt(this.value());
                select('#saturationValue').html(saturationValue);
            });
            select('#saturationValue').html(saturationValue);

            // Brightness Slider
            select('#brightnessSlider').input(function() {
                brightnessValue = parseInt(this.value());
                select('#brightnessValue').html(brightnessValue);
            });
            select('#brightnessValue').html(brightnessValue);
            
            // Shape Opacity Slider
            select('#alphaSlider').input(function() { 
                alphaValue = parseInt(this.value());
                select('#alphaValue').html(alphaValue);
            });
            select('#alphaValue').html(alphaValue);

            // Canvas Theme Toggle Buttons
            const themeToggleButtons = selectAll('#canvasThemeToggle button');
            themeToggleButtons.forEach(button => {
                button.mousePressed(() => {
                    isDarkTheme = button.attribute('data-theme') === 'dark';
                    themeToggleButtons.forEach(btn => btn.removeClass('active')); // Deactivate all
                    button.addClass('active'); // Activate clicked button
                    applyCanvasTheme(); // Apply the new theme
                });
            });

            // Symmetry Slider
            select('#symmetrySlider').input(function() {
                updateSymmetry(parseInt(this.value()));
            });
            select('#symmetryDisplayValue').html(symmetry);

            // Trail Persistence Slider
            const trailFadeSlider = select('#trailFadeSlider');
            trailFadeSlider.input(function() {
                trailPersistence = parseInt(this.value());
                select('#trailFadeValue').html(trailPersistence);
            });
            select('#trailFadeValue').html(trailPersistence); 

            // Trail Effect Checkbox
            select('#trailEffectCheckbox').changed(function() {
                trailEffectActive = this.checked();
                if (trailEffectActive) {
                    trailFadeSlider.removeAttribute('disabled'); // Enable persistence slider
                } else {
                    trailFadeSlider.attribute('disabled', ''); // Disable persistence slider
                    applyCanvasTheme(); // Clear to solid background if trail is turned off
                }
            });

            // Clear Canvas Button
            select('#clearButton').mousePressed(applyCanvasTheme); 
            // Save Image Button
            select('#saveImageButton').mousePressed(saveKaleidoscopeImage);
        }
        
        // --- Function to apply the current canvas theme (background color) ---
        function applyCanvasTheme() {
            let bg = isDarkTheme ? darkThemeBg : lightThemeBg; // Choose background based on theme
            background(bg[0], bg[1], bg[2]); // Apply background color
        }

        // --- Function to update symmetry settings ---
        function updateSymmetry(newSymmetry) {
            symmetry = newSymmetry;
            angle = 360 / symmetry; // Recalculate segment angle
            select('#symmetryDisplayValue').html(symmetry); // Update UI display
            applyCanvasTheme(); // Clear canvas with new theme when symmetry changes
        }

        // --- Function to save the current canvas as a PNG image ---
        function saveKaleidoscopeImage() {
            saveCanvas(p5Canvas, 'kaleidoscope_dream', 'png'); // p5.js function to save canvas
        }
        
        // --- Helper function to draw a star shape ---
        function drawStar(x, y, radius1, radius2, npoints) {
            let angleOffset = 360 / npoints; // Angle between points of the star
            let halfAngleOffset = angleOffset / 2.0; // Angle to inner vertices
            beginShape(); // Start drawing a custom shape
            for (let a = 0; a < 360; a += angleOffset) { // Iterate through star points
                // Outer vertex
                vertex(x + cos(a) * radius2, y + sin(a) * radius2);
                // Inner vertex
                vertex(x + cos(a + halfAngleOffset) * radius1, y + sin(a + halfAngleOffset) * radius1);
            }
            endShape(CLOSE); // Close the shape
        }
        
        // --- Function to get the current drawing color based on palette and sliders ---
        function getCurrentDrawingColor() {
            let h, s, b; // Hue, Saturation, Brightness
            const palette = palettes[selectedColorPalette]; // Get the active palette object

            if (palette.type === 'cycle') { // For 'rainbow' or other cycling palettes
                hueValue = (hueValue + 0.7) % 360; // Increment hue for cycling effect
                h = hueValue;
                s = saturationValue; // Use global saturation slider value
                b = brightnessValue; // Use global brightness slider value
            } else { // For palettes with predefined colors ('ocean', 'sunset', etc.)
                let colors = palette.colors;
                // Change color from the palette less frequently for a more deliberate effect
                if (frameCount % 10 === 0) { 
                     currentPaletteColorIndex = (currentPaletteColorIndex + 1) % colors.length;
                }
                let selected = colors[currentPaletteColorIndex]; // Get current color from palette
                h = selected[0]; // Use hue from palette
                s = selected[1]; // Use saturation from palette
                b = selected[2]; // Use brightness from palette
                // One could optionally allow global sliders to further modify palette colors here
            }
            return [h, s, b, alphaValue]; // Return HSB + Alpha array
        }


        // --- P5.js Draw Loop: Runs continuously to draw frames ---
        function draw() {
            // Handle trail effect: redraw background with transparency if active
            if (trailEffectActive) {
                let bg = isDarkTheme ? darkThemeBg : lightThemeBg;
                // Map trailPersistence (0-98) to background alpha (95-2 for HSB mode's 0-100 alpha)
                // Higher persistence means lower alpha for background redraw, making trails last longer.
                let trailAlphaForBg = map(trailPersistence, 0, 98, 95, 2); 
                background(bg[0], bg[1], bg[2], trailAlphaForBg);
            } else if (frameCount === 1 && !trailEffectActive) { 
                // Ensure solid background if trail is off from the very start
                applyCanvasTheme();
            }

            // Move origin to canvas center for symmetrical drawing
            translate(width / 2, height / 2);

            // Update angle for spinning shapes if enabled
            if (enableShapeSpin) {
                currentShapeAngle = (currentShapeAngle + 0.5) % 360; // Slow spin
            }

            // Draw only if mouse is pressed and within canvas bounds
            if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
                // Get mouse positions relative to the new center origin
                let mx = mouseX - width / 2;
                let my = mouseY - height / 2;
                let pmx = pmouseX - width / 2; // Previous mouse X
                let pmy = pmouseY - height / 2; // Previous mouse Y

                let [h, s, b, a] = getCurrentDrawingColor(); // Get current drawing color
                
                stroke(h, s, b, a); // Set stroke color and opacity
                fill(h, s, b, a * 0.85); // Set fill color (slightly more transparent by default)
                
                // Call function to draw the shapes symmetrically
                drawSymmetricalShapes(mx, my, pmx, pmy);
            }
        }

        // --- Function to draw shapes symmetrically across all segments ---
        function drawSymmetricalShapes(mx, my, pmx, pmy) {
            for (let i = 0; i < symmetry; i++) { // Loop for each symmetrical segment
                rotate(angle); // Rotate the coordinate system for the current segment
                
                push(); // Save current transformation state (segment rotation)
                // Apply individual shape spin if enabled and not drawing lines
                if (enableShapeSpin && drawingMode !== 'line') {
                    translate(mx, my); // Move origin to the shape's intended center
                    rotate(currentShapeAngle); // Rotate the shape itself
                    drawCurrentShape(0, 0, pmx - mx, pmy - my); // Draw shape at new (0,0) origin
                                                              // pmx, pmy adjusted for line mode if it were spinning
                } else {
                    drawCurrentShape(mx, my, pmx, pmy); // Draw shape normally without individual spin
                }
                pop(); // Restore segment rotation state
                
                // Draw the reflection within the segment
                push();
                scale(1, -1); // Flip the Y-axis for reflection
                // Apply shape spin to the reflection as well
                if (enableShapeSpin && drawingMode !== 'line') {
                    translate(mx, my);
                    rotate(currentShapeAngle);
                    drawCurrentShape(0, 0, pmx - mx, pmy - my);
                } else {
                    drawCurrentShape(mx, my, pmx, pmy);
                }
                pop(); // Restore from reflection scaling
            }
        }

        // --- Function to draw a single instance of the currently selected shape ---
        function drawCurrentShape(shapeX, shapeY, prevShapeX, prevShapeY) {
            // Note: shapeX, shapeY are the primary drawing coordinates.
            // For spinning shapes, these will be (0,0) due to prior translation.
            // For non-spinning, they are mx, my.
            push(); // Isolate shape's own transformations and styles
            
            let R = currentBrushSize * 1.5; // Base radius for shapes, proportional to brush size
            let lineWeight = currentBrushSize; // Default line weight

            if (drawingMode === 'line') {
                // Dynamic stroke weight for lines based on mouse speed for a more organic feel
                let speed = dist(mouseX, mouseY, pmouseX, pmouseY); // Use absolute mouse coords for speed calc
                lineWeight = map(speed, 0, 30, currentBrushSize * 1.5, currentBrushSize * 0.5, true);
                lineWeight = constrain(lineWeight, 1, currentBrushSize * 2); // Clamp line weight
                strokeWeight(lineWeight);
                noFill(); // Lines typically don't have a fill
            } else {
                // For filled shapes, stroke can be thinner or off entirely
                strokeWeight(max(1, currentBrushSize / 6)); 
                // fill() is already set before calling drawSymmetricalShapes
            }

            // Draw the selected shape
            switch (drawingMode) {
                case 'line':
                    line(shapeX, shapeY, prevShapeX, prevShapeY);
                    break;
                case 'circle':
                    ellipse(shapeX, shapeY, R * 2, R * 2);
                    break;
                case 'triangle':
                    let r = R * 1.2; // Adjusted size for better triangle appearance
                    triangle(
                        shapeX, shapeY - r, // Top point
                        shapeX - r * cos(30), shapeY + r * sin(30), // Bottom-left
                        shapeX + r * cos(30), shapeY + r * sin(30)  // Bottom-right
                    );
                    break;
                case 'star':
                    drawStar(shapeX, shapeY, R * 0.6, R * 1.3, 5); // Inner radius, outer radius, num points
                    break;
                case 'randomShape': // Draws a small, random polygon
                    beginShape();
                    let numVertices = floor(random(3, 8)); // 3 to 7 vertices
                    for (let j = 0; j < numVertices; j++) {
                        let angleR = random(360); // Random angle for vertex
                        let radiusR = random(R * 0.3, R * 1.2); // Random radius for vertex
                        vertex(shapeX + cos(angleR) * radiusR, shapeY + sin(angleR) * radiusR);
                    }
                    endShape(CLOSE);
                    break;
            }
            pop(); // Restore transformations from before this shape
        }

        // --- Touch event handlers to prevent default browser actions (like scrolling) on canvas ---
        function touchStarted(event) {
          // Check if the touch event originated on the p5.js canvas
          if (event.target === p5Canvas.elt) { 
            return false; // Prevent default browser action
          }
        }
        function touchMoved(event) {
          if (event.target === p5Canvas.elt) {
            return false; // Prevent default browser action
          }
        }
    </script>
</body>
</html>
