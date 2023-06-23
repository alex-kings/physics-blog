/**
 * Create a spherical graph centered on the origin.
 */

export class Graph1D {
    // Attributes
    container;
    canvas;
    ctx;
    // Limits in the x and y directions.
    startX = 0;
    endX = 1;
    startY = 0;
    endY = 1;

    // Add axes indicators
    indicatorsX = [];
    indicatorsY = [];

    // Function plotted.
    func;

    canvasBackgroundColor = "rgb(255,255,255)";
    shapeFillColor = "rgb(240,240,240)";

    // Number of steps used.
    steps = 100;

    // Rotation
    rotation = 0;

    constructor(containerId) {
        this.container = document.getElementById(containerId);
        // Create a canvas in the container
        this.canvas = document.createElement("canvas");
        this.canvas.style = "width:100%;height:100%";
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        // Set width and height - scale by DPI for proper rendering.
        this.canvas.height = Math.round(this.canvas.clientHeight * window.devicePixelRatio);
        this.canvas.width = Math.round(this.canvas.clientWidth * window.devicePixelRatio);
    }   

    setLimits(startX, endX, startY, endY) {
        this.startX = startX;
        this.endX = endX;
        this.startY = startY;
        this.endY = endY;
    }

    setSteps(steps) {
        this.steps = steps;
    }

    setFunc(func) {
        this.func = func;
    }

    /**
     * Set indicators.
     */
    setIndicators(ix, iy) {
        this.indicatorsX = ix;
        this.indicatorsY = iy;
    }

    /**
     * Clear the canvas contents
     */
    clearCanvas() {
        this.ctx.fillStyle = this.canvasBackgroundColor;
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    }

    /**
     * Draw canvas axes.
     */
    drawAxes() {
        this.ctx.lineWidth = 1.4
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
        this.ctx.font = "24px sans-serif"
        this.ctx.fillText("x",center[0] - 18, 24);
        this.ctx.fillText("y",this.canvas.width - 24,center[1]+18);

        // Draw indicators
        for(let ix of this.indicatorsX) {
            let location = this.getCanvasCoordinates([ix.pos, 0]);
            // Draw segment
            this.ctx.strokeStyle = ix.color;
            this.ctx.fillStyle = ix.color;
            this.ctx.beginPath();
            if(ix.large) {
                this.ctx.setLineDash([5,15]);
                this.ctx.moveTo(location[0], 0);
                this.ctx.lineTo(location[0], this.canvas.height);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                this.ctx.fillText(ix.name,location[0]+4, location[1]+24);
            }
            else {
                this.ctx.moveTo(location[0], location[1]-8);
                this.ctx.lineTo(location[0], location[1]+8);c
                this.ctx.stroke(); 
                this.ctx.fillText(ix.name,location[0]-10, location[1]+24);
            }
        }
        for(let iy of this.indicatorsY) {
            let location = this.getCanvasCoordinates([0, iy.pos]);
            // Draw segment
            this.ctx.strokeStyle = iy.color;
            this.ctx.fillStyle = iy.color;
            this.ctx.beginPath();
            if(iy.large) {
                this.ctx.setLineDash([5,15]);
                this.ctx.moveTo(0, location[1]);
                this.ctx.lineTo(this.canvas.width, location[1]);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                this.ctx.fillText(iy.name,location[0]-20, location[1]-5);
            }
            else {
                this.ctx.moveTo(location[0]-8, location[1]);
                this.ctx.lineTo(location[0]+8, location[1]);
                this.ctx.stroke();
                this.ctx.fillText(iy.name,location[0]-24, location[1]+10);
            }
            
        }
    }

    /**
     * Draw the function given.
     */
    drawFunction() {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "red";
        this.ctx.beginPath();
        const increment = (this.endX - this.startX) / this.steps;
        for(let i = 0; i < this.steps+1; i++) {
            let x = i*increment + this.startX;
            let y = this.func(x);
            if(y!=null) {
                let canvasCoords = this.getCanvasCoordinates([x,y]);
                this.ctx.lineTo(canvasCoords[0], canvasCoords[1]);
            }
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
     * Called at every time step to make sure the canvas has the right size.
     */
    resizeDisplay() {
        if(Math.round(this.canvas.clientWidth * window.devicePixelRatio) !== this.canvas.width || 
            Math.round(this.canvas.clientHeight * window.devicePixelRatio) !== this.canvas.height) {
                console.log("resized")
            this.canvas.height = Math.round(this.container.clientHeight * window.devicePixelRatio);
            this.canvas.width = Math.round(this.container.clientWidth * window.devicePixelRatio);
        }
    }

    /**
     * Animation loop
     */
    animate() {
        this.clearCanvas();
        this.drawFunction();
        this.drawAxes();
        this.resizeDisplay();
        requestAnimationFrame(this.animate.bind(this));
    }
}

/**
 * An indicator for a graph.
 */
export class Indicator {
    constructor(pos, name, large, color) {
        this.pos = pos;
        this.name = name || pos.toString();
        this.large = large || false;
        this.color = color || "0x000000";
    }
}