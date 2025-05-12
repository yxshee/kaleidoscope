// --- Global Variables ---
let symmetry = 6;
let angle;
let canvas;

// Drawing Style
let drawingMode = 'line';
let currentBrushSize = 10;

// Color
let hueValue = 0;
let saturationValue = 90;
let brightnessValue = 90;
let alphaValue = 70;

// Effects
let trailEffectActive = false;
const TRAIL_ALPHA = 15; // Opacity of background redraw for trail effect

// --- P5.js Setup Function ---
function setup() {
    canvas = createCanvas(600, 600);
    canvas.parent('canvas-container');

    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 100); // Set color mode once
    background(10, 5, 95); // Initial very light grey, almost white background for drawing area
    updateSymmetry(symmetry);

    // --- UI Element Setup & Event Handlers ---
    select('#drawingModeSelect').changed(function() { drawingMode = this.value(); });
    
    select('#brushSizeSlider').input(function() {
        currentBrushSize = this.value();
        select('#brushSizeValue').html(currentBrushSize);
    });
    select('#brushSizeValue').html(currentBrushSize); // Initial display

    select('#saturationSlider').input(function() {
        saturationValue = this.value();
        select('#saturationValue').html(saturationValue);
    });
    select('#saturationValue').html(saturationValue);

    select('#brightnessSlider').input(function() {
        brightnessValue = this.value();
        select('#brightnessValue').html(brightnessValue);
    });
    select('#brightnessValue').html(brightnessValue);
    
    select('#alphaSlider').input(function() {
        alphaValue = this.value();
        select('#alphaValue').html(alphaValue);
    });
    select('#alphaValue').html(alphaValue);

    select('#symmetrySlider').input(function() {
        updateSymmetry(parseInt(this.value()));
    });
    select('#symmetryDisplayValue').html(symmetry);


    select('#trailEffectCheckbox').changed(function() {
        trailEffectActive = this.checked();
        if (!trailEffectActive) { // If trail is turned off, clear to solid background once
            clearDrawing();
        }
    });

    select('#clearButton').mousePressed(clearDrawing);
    select('#saveImageButton').mousePressed(saveKaleidoscopeImage);
}

// --- Update Symmetry ---
function updateSymmetry(newSymmetry) {
    symmetry = newSymmetry;
    angle = 360 / symmetry;
    select('#symmetryDisplayValue').html(symmetry);
    clearDrawing(); // Clear canvas for new symmetry
}

// --- Clear Drawing Area ---
function clearDrawing() {
    // Set a solid background (light grey, almost white)
    background(10, 5, 95); // HSB: very low saturation, high brightness
}

// --- Save Canvas Image ---
function saveKaleidoscopeImage() {
    saveCanvas(canvas, 'kaleidoscope_art', 'png');
}

// --- Draw Star Shape ---
function drawStar(x, y, radius1, radius2, npoints) {
    let angleOffset = 360 / npoints;
    let halfAngleOffset = angleOffset / 2.0;
    beginShape();
    for (let a = 0; a < 360; a += angleOffset) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngleOffset) * radius1;
        sy = y + sin(a + halfAngleOffset) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}


// --- P5.js Draw Loop ---
function draw() {
    // Handle trail effect: draw a semi-transparent background
    if (trailEffectActive) {
        background(10, 5, 95, TRAIL_ALPHA); // HSB with alpha. Alpha is 0-100 for HSB mode.
    }

    // Translate to the center for symmetrical drawing
    translate(width / 2, height / 2);

    // Only draw if mouse is pressed and within canvas bounds
    if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let mx = mouseX - width / 2;
        let my = mouseY - height / 2;
        let pmx = pmouseX - width / 2;
        let pmy = pmouseY - height / 2;

        // Dynamic hue cycling
        hueValue = (hueValue + 0.7) % 360;
        
        // Set stroke and fill properties
        // Note: currentBrushSize is a string from the slider, convert to number for stroke weight
        strokeWeight(Number(currentBrushSize));
        stroke(hueValue, Number(saturationValue), Number(brightnessValue), Number(alphaValue));
        fill(hueValue, Number(saturationValue), Number(brightnessValue), Number(alphaValue) * 0.8); // Slightly more transparent fill
        

        // Main symmetry loop
        for (let i = 0; i < symmetry; i++) {
            rotate(angle);

            // --- Draw selected shape ---
            push(); // Isolate transformations for the shape itself
            
            let R = Number(currentBrushSize) * 1.5; // Radius for shapes, proportional to brush size

            switch (drawingMode) {
                case 'line':
                    noFill(); // Lines don't typically have fill
                    line(mx, my, pmx, pmy);
                    break;
                case 'circle':
                    noStroke(); // Example: filled circles
                    ellipse(mx, my, R * 2, R * 2);
                    break;
                case 'triangle':
                    noStroke();
                    let rTri = R * 1.5; // Use a local variable for triangle radius
                    triangle(
                        mx, my - rTri,
                        mx - rTri * cos(30), my + rTri * sin(30),
                        mx + rTri * cos(30), my + rTri * sin(30)
                    );
                    break;
                case 'star':
                    noStroke();
                    drawStar(mx, my, R*0.8, R*1.6, 5);
                    break;
                case 'randomShape':
                    noStroke();
                    beginShape();
                    let numVertices = floor(random(3, 7)); // 3 to 6 vertices
                    for (let j = 0; j < numVertices; j++) {
                        let angleR = random(360);
                        let radiusR = random(R * 0.5, R * 1.5);
                        vertex(mx + cos(angleR) * radiusR, my + sin(angleR) * radiusR);
                    }
                    endShape(CLOSE);
                    break;
            }
            pop(); // Restore from shape-specific transformations

            // --- Reflection ---
            push();
            scale(1, -1); // Flip y-axis for reflection

            // Redraw the selected shape for reflection
            switch (drawingMode) {
                case 'line':
                    noFill();
                    line(mx, my, pmx, pmy);
                    break;
                case 'circle':
                    noStroke();
                    ellipse(mx, my, R * 2, R * 2);
                    break;
                case 'triangle':
                    noStroke();
                    let rTriRef = R * 1.5; // Use a local variable for triangle radius
                    triangle(
                        mx, my - rTriRef,
                        mx - rTriRef * cos(30), my + rTriRef * sin(30),
                        mx + rTriRef * cos(30), my + rTriRef * sin(30)
                    );
                    break;
                case 'star':
                     noStroke();
                    drawStar(mx, my, R*0.8, R*1.6, 5);
                    break;
                case 'randomShape':
                    noStroke();
                    beginShape();
                    let numVerticesRef = floor(random(3, 7)); // Potentially different random shape for reflection
                    for (let j = 0; j < numVerticesRef; j++) {
                        let angleRRef = random(360);
                        let radiusRRef = random(R * 0.5, R * 1.5);
                        vertex(mx + cos(angleRRef) * radiusRRef, my + sin(angleRRef) * radiusRRef);
                    }
                    endShape(CLOSE);
                    break;
            }
            pop(); // Restore from reflection scale
        }
    }
}

// Prevent default browser behavior for touch events on canvas
function touchStarted() {
  if (canvas && canvas.elt && event.target === canvas.elt) { // Check if touch is on canvas
    return false; // Prevent default
  }
}

function touchMoved() {
  if (canvas && canvas.elt && event.target === canvas.elt) {
    return false;
  }
}
