let offsetX = 0, offsetY = 0; // Offsets for dragging the shape
let initialMouseX = 0, initialMouseY = 0; // Initial mouse coordinates on drag start
let dragging = false; // Dragging state

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(60);
  background(0);
}

function draw() {
  let i = frameCount;
  background(0,70);

  const centerX = width / 2 + offsetX;
  const centerY = height / 2 + offsetY;

  drawNoiseShape(i, centerX, centerY);
}

function drawNoiseShape(i, centerX, centerY) {
  stroke(255, 20);
  strokeWeight(1);
  noFill();
  translate(centerX, centerY - 150); // Center the shape based on drag

  for (let angle = 0; angle <= 360; angle += 0.2) {
    const radius = 200 * noise(i / 300) + 100;
    const x = radius * cos(radians(angle));
    const y = radius * sin(radians(angle)) + (200 - noise(radians(angle), i / 100) * 400);
    stroke(noise(radians(angle)) * 255, 120, 255, 60);
    line(0, 0, x, y);
  }

  resetMatrix(); // Reset the translation after drawing
}

function mousePressed() {
  // Record the start position of a drag
  initialMouseX = mouseX;
  initialMouseY = mouseY;
  dragging = true;
}

function mouseDragged() {
  if (dragging) {
    // Update the offset based on mouse movement
    offsetX += mouseX - initialMouseX;
    offsetY += mouseY - initialMouseY;
    
    // Update the initial positions for the next call
    initialMouseX = mouseX;
    initialMouseY = mouseY;
  }
}

function mouseReleased() {
  dragging = false;
}
