/**
 * Create a spherical graph centered on the origin.
 */

export class Graph1D {
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
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        this.drawAxes();
    }

    /**
     * Draw canvas axes.
     */
    drawAxes() {
        // Draw axes
        this.ctx.strokeStyle = "black"
        this.ctx.beginPath();

        let center = this.getCanvasCoordinates([0,0]);

        this.ctx.moveTo(center[0],0);
        this.ctx.lineTo(center[0],this.canvas.height);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(0,center[1]);
        this.ctx.lineTo(this.canvas.width, center[1]);
        this.ctx.stroke();
        // Axis labels
        this.ctx.fillStyle = "black"
        this.ctx.font = "16px serif"
        this.ctx.fillText("x",center[0] - 15, 12);
        this.ctx.fillText("y",this.canvas.width - 15,center[1]+12);
    }

    /**
     * Draw the function given.
     */
    drawFunction() {
        this.ctx.beginPath();
        const increment = (this.endX - this.startX) / this.steps;
        for(let i = 0; i < this.steps+1; i++) {
            let x = i*increment + this.startX;
            let y = this.func(x);
            let canvasCoords = this.getCanvasCoordinates([x,y]);
            this.ctx.lineTo(canvasCoords[0], canvasCoords[1]);
        }
        this.ctx.stroke();
    }

    /**
     * Pass x and y in the function coordinates and obtain the equivalent canvas coordinates.
     */
    getCanvasCoordinates([x,y]) {
        let canvasX = (x-this.startX)*this.canvas.width / (this.endX - this.startX);
        let canvasY = (this.endY - y)*this.canvas.height/ (this.endY - this.startY);
        return [canvasX, canvasY];
    }

    /**
     * Change the function of this graph.
     */
    modifyFunc(newFunc) {
        this.func = newFunc;
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
        this.drawFunction();
        this.resizeDisplay();
        requestAnimationFrame(this.animate.bind(this));
    }
}
