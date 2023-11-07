// Initialize cursor position and movement variables
let cursorPosition = { x: 0, y: 0 };
let isCursorMoving = false;
let cursorMoveTimeout;
let circles = [];
let circleRemovalInterval;

// Get a reference to the cursor element in the HTML
const cursor = document.getElementById("main");

// Listen for mousemove events to track cursor movement
document.addEventListener("mousemove", (e) => {
    // Update cursor position
    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;

    // Update the cursor's position on the screen
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Set the cursor as moving
    isCursorMoving = true;

    // Clear the cursorMoveTimeout to prevent it from triggering
    clearTimeout(cursorMoveTimeout);

    // After a brief delay, mark the cursor as not moving
    cursorMoveTimeout = setTimeout(() => {
        isCursorMoving = false;

        // After 1 second of inactivity, start removing circles
        setTimeout(() => {
            clearInterval(circleRemovalInterval);
            circleRemovalInterval = setInterval(() => {
                if (circles.length > 0) {
                    let circle = circles.shift();
                    circle.remove();
                } else {
                    clearInterval(circleRemovalInterval);
                }
            }, 25);
        }, 1000);
    }, 100);
});

// Create circles when the cursor is moving
setInterval(() => {
    if (isCursorMoving) {
        // Create a new circle element
        const circle = document.createElement("div");
        circle.classList.add("circle");

        // Set its initial position to match the cursor
        circle.style.left = cursorPosition.x + "px";
        circle.style.top = cursorPosition.y + "px";

        // Add the circle to the document and store it in the circles array
        document.body.appendChild(circle);
        circles.push(circle);
    }
}, 10);

//////////////////////////////////////// OR /////////////////////////////////////////

// OPTIMIZED
const cursor = document.getElementById("main");
const circles = [];

document.addEventListener("mousemove", (e) => {
    // Update the cursor's position to match the mouse
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Create a new circle element
    const circle = document.createElement("div");
    circle.classList.add("circle");

    // Set its position to match the cursor
    circle.style.left = e.clientX + "px";
    circle.style.top = e.clientY + "px";

    // Add the circle to the document and store it
    document.body.appendChild(circle);
    circles.push(circle);

    // Remove the oldest circle after 1 second
    setTimeout(() => {
        if (circles.length > 0) {
            const oldestCircle = circles.shift();
            oldestCircle.remove();
        }
    }, 1000);
});
