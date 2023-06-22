/**
 * Create a spherical graph centered on the origin.
 */

export class Spherical2dGraph {
    // Attributes
    container;
    canvas;
    ctx;
    // Width and height of the canvas element.
    w;
    h;
    // Limits in the x and y directions.
    startX;
    endX;
    startY;
    endY;
    // Function plotted.
    func;

    canvasBackgroundColor = "rgb(255,255,255)";
    shapeFillColor = "rgb(240,240,240)";

    // Number of steps used.
    steps;

    // Rotation
    rotation = 0;

    // Smoothness factor affects the render
    smoothnessFactor = 1;

    constructor(containerId, func, startX, endX, startY, endY, steps) {
        this.container = document.getElementById(containerId);
        // Create a canvas in the container
        this.canvas = document.createElement("canvas");
        this.canvas.style = "width:100%;height:100%";
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.func = func;
        this.steps = steps;

        // Set width and height
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        // Set limits
        this.startX = startX;
        this.endX = endX;
        this.startY = startY;
        this.endY = endY;
        // Change the origin of canvas to center
        this.ctx.translate(this.w*0.5, this.h*0.5);
        // Initialise the canvas
        this.clearCanvas();
        // Start animation
        this.animate();
    }   

    /**
     * Clear the canvas contents
     */
    clearCanvas() {
        this.ctx.fillStyle = this.canvasBackgroundColor;
        this.ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
        // Draw axes
        this.ctx.strokeStyle = "black"
        this.ctx.beginPath();
        this.ctx.moveTo(-this.w/2,0);
        this.ctx.lineTo(this.w/2,0);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(0,-this.h/2);
        this.ctx.lineTo(0,this.h/2);
        this.ctx.stroke();
        // Axis labels
        this.ctx.fillStyle = "black"
        this.ctx.font = "14px sans-serif"
        this.ctx.fillText("x",this.w/2 - 15, -5);
        this.ctx.fillText("z",3,-this.h/2+15)
    }

    /**
     * Draw the function given.
     */
    drawFunction() {
        this.ctx.beginPath();
        const increment = 2*Math.PI / this.steps;
        for(let i = 0; i <= this.steps; i++) {
            let theta = increment * i;
            let r = this.func(theta);
            let x = r * Math.sin(theta);
            let z = r * Math.cos(theta);

            // Transform using the limit values
            x*=this.w/(2*this.endX);
            z*=this.h/(2*this.endY);
            // Make the new point (account for the z axis being reversed).
            this.ctx.lineTo(x,-z);
        }
        this.ctx.fillStyle = this.shapeFillColor;
        this.ctx.fill();
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
    }

    /**
     * Change the function of this graph.
     */
    modifyFunc(newFunc) {
        this.func = newFunc;
    }
    
    /**
     * Set the rotation angle around the X axis for this graph.
     * @param {Number} a The new rotation angle
     */
    setRotation(a) {
        this.rotation = a;
    }

    /**
     * Called at every time step to make sure the canvas has the right size.
     */
    resizeDisplay() {
        if(this.smoothnessFactor*this.container.clientWidth !== this.canvas.width || 
            this.smoothnessFactor*this.container.clientHeight !== this.canvas.height) {

            this.canvas.height = this.smoothnessFactor*this.container.clientHeight;
            this.canvas.width = this.smoothnessFactor*this.container.clientWidth;
            this.w = this.canvas.width;
            this.h = this.canvas.height;
            this.ctx.translate(this.w*0.5, this.h*0.5);
        }
    }

    /**
     * Animation loop
     */
    animate() {
        this.clearCanvas();
        // Changes to the graph go here.

        this.canvas.style.transform = `rotateY(15deg) rotateX(${this.rotation}deg)`

        this.drawFunction();
        this.resizeDisplay();
        requestAnimationFrame(this.animate.bind(this));
    }
}
