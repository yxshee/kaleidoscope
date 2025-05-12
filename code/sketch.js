// Global variables for kaleidoscope settings
let symmetry = 6; // Default number of symmetrical segments
let angle;       // Angle of each segment
let canvas;

// Color variables
let hueValue = 0;
let saturation = 90;
let brightness = 90;
let alpha = 70; // Opacity of the stroke

// Brush size variables
let minBrushSize = 1;
let maxBrushSize = 10;
let currentBrushSize = 3;

function setup() {
    // Create canvas and place it inside the div
    canvas = createCanvas(600, 600);
    canvas.parent('canvas-container');

    angleMode(DEGREES); // Use degrees for rotation
    background(20);     // Set a dark background
    updateSymmetry(symmetry); // Initialize angle based on default symmetry

    // --- UI Element Setup ---
    const clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);

    const symmetrySlider = select('#symmetrySlider');
    symmetrySlider.input(handleSymmetryChange);

    // Initialize symmetry value display
    select('#symmetryValue').html(symmetry);
}

function updateSymmetry(newSymmetry) {
    symmetry = newSymmetry;
    angle = 360 / symmetry; // Calculate the angle for each segment
    select('#symmetryValue').html(symmetry); // Update the display
    clearDrawing(); // Clear canvas when symmetry changes for a fresh start
}

function handleSymmetryChange() {
    updateSymmetry(this.value());
}

function clearDrawing() {
    background(20); // Reset background to dark grey
}

function draw() {
    // Translate to the center of the canvas for symmetrical drawing
    translate(width / 2, height / 2);

    // Only draw if the mouse is pressed and within canvas bounds
    if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        // Get current and previous mouse positions relative to the center
        let mx = mouseX - width / 2;
        let my = mouseY - height / 2;
        let pmx = pmouseX - width / 2;
        let pmy = pmouseY - height / 2;

        // --- Dynamic Stroke Color ---
        hueValue = (hueValue + 0.5) % 360; // Cycle through hues
        colorMode(HSB, 360, 100, 100, 100);
        stroke(hueValue, saturation, brightness, alpha);

        // --- Dynamic Brush Size (optional, based on mouse speed) ---
        let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
        currentBrushSize = map(speed, 0, 20, maxBrushSize, minBrushSize, true); // Faster speed = smaller brush
        strokeWeight(currentBrushSize);

        // Loop through each segment of the kaleidoscope
        for (let i = 0; i < symmetry; i++) {
            rotate(angle); // Rotate by the segment angle

            // Draw a line from the previous to the current mouse position
            line(mx, my, pmx, pmy);

            // Create a reflection within the segment
            push(); // Save current transformation state
            scale(1, -1); // Flip the y-axis
            line(mx, my, pmx, pmy); // Draw the reflected line
            pop(); // Restore previous transformation state

            // --- Optional: Add other shapes for more complex patterns ---
            // Example: Draw circles at the mouse position
            // noFill(); // or fill(hueValue, saturation, brightness, alpha / 2);
            // ellipse(mx, my, currentBrushSize * 2, currentBrushSize * 2);
            // push();
            // scale(1, -1);
            // ellipse(mx, my, currentBrushSize * 2, currentBrushSize * 2);
            // pop();
        }
    }
}

// Prevent default browser behavior for touch events on canvas to improve mobile experience
function touchStarted() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    return false;
  }
}

function touchMoved() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    return false;
  }
}
