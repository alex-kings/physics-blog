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

    // Time
    stopped = false; // Whether the animation is on.
    t = 0;

    // Main axis labels
    xLabel = "x";
    yLabel = "y";
    xLabelDist = 0;
    yLabelDist = 0;

    // Add axes indicators
    indicatorsX = [];
    indicatorsY = [];

    // Functions
    funcs = [];

    canvasBackgroundColor = "rgb(255,255,255)";
    shapeFillColor = "rgb(240,240,240)";

    // Number of steps used.
    steps = 100;

    // Rotation
    rotation = 0;

    // Legend
    legendVisible = false;
    legendX;
    legendY;
    legendFontSize = 20;

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

        // Legend parameters
        this.legendX = this.canvas.width*2/3;
        this.legendY = 0;
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

    addFunc(func) {
        this.funcs.push(func);
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
     * Make the legend visible.
     */
    showLegend() {
        this.legendVisible = true;
    }

    /**
     * Draw canvas axes.
     */
    drawAxes() {
        this.ctx.lineWidth = 1.4
        // Draw axes
        this.ctx.strokeStyle = "black"
        
        let center = this.getCanvasCoordinates([0,0]);
        
        // x axis
        this.ctx.beginPath();
        this.ctx.moveTo(center[0],this.canvas.height);
        this.ctx.lineTo(center[0],0);
        this.ctx.lineTo(center[0] - 8, 12);
        this.ctx.moveTo(center[0], 0);
        this.ctx.lineTo(center[0] + 8, 12);
        this.ctx.stroke();
        
        // y axis
        this.ctx.beginPath();
        this.ctx.moveTo(0,center[1]);
        this.ctx.lineTo(this.canvas.width, center[1]);
        this.ctx.lineTo(this.canvas.width - 12, center[1] - 8);
        this.ctx.moveTo(this.canvas.width, center[1]);
        this.ctx.lineTo(this.canvas.width - 12, center[1] + 8);
        this.ctx.stroke();

        // Axis labels
        this.ctx.fillStyle = "black"
        this.ctx.font = "24px sans-serif"
        this.ctx.fillText(this.yLabel,center[0] - 18 + this.yLabelDist, 32);
        this.ctx.fillText(this.xLabel,this.canvas.width - 28 + this.xLabelDist,center[1]+18);

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
                this.ctx.lineTo(location[0], location[1]+8);
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
     * Set the x label.
     * @param {String} xLabel The new label.
     * @param {Number} xLabelDist (optional) The new dist value for this label.
     */
    setLabelX(xLabel, xLabelDist) {
        this.xLabel = xLabel;
        this.xLabelDist = xLabelDist || 0;
    }

    /**
     * Set the y label.
     * @param {String} yLabel The new label.
     * @param {Number} yLabelDist (optional) The new dist value for this label.
     */
    setLabelY(yLabel, yLabelDist) {
        this.yLabel = yLabel;
        this.yLabelDist = yLabelDist || 0;
    }

    /**
     * Draw all the functions
     */
    drawFunctions() {
        this.ctx.lineWidth = 2;
        const increment = (this.endX - this.startX) / this.steps;

        // Draw all the functions
        for(let func of this.funcs) {
            this.ctx.strokeStyle = func.color;
            this.ctx.beginPath();
            for(let i = 0; i < this.steps+1; i++) {
                let x = i*increment + this.startX;
                let y = func.func(x);
                if(y!=null) {
                    let canvasCoords = this.getCanvasCoordinates([x,y]);
                    this.ctx.lineTo(canvasCoords[0], canvasCoords[1]);
                }
            }
            this.ctx.stroke();
        }
    }

    /**
     * Draw this graph's legend.
     */
    drawLegend() { 
        let height = 0;
        this.ctx.font = `${this.legendFontSize}px sans-serif`;
        for(let func of this.funcs) {
            this.ctx.strokeStyle = func.color;
            this.ctx.beginPath();
            this.ctx.moveTo(this.legendX, this.legendY + this.legendFontSize/2 + height);
            this.ctx.lineTo(this.legendX+20, this.legendY + this.legendFontSize/2 + height);
            this.ctx.stroke();
            this.ctx.fillStyle = "black";
            this.ctx.fillText(func.name, this.legendX+25, this.legendY + this.legendFontSize + height)
            height += this.legendFontSize;
        }
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
            this.canvas.height = Math.round(this.container.clientHeight * window.devicePixelRatio);
            this.canvas.width = Math.round(this.container.clientWidth * window.devicePixelRatio);
            this.legendX = 2*this.canvas.width/3;
        }
    }

    /**
     * Animation loop
     */
    prevFrame = performance.now();
    animate() {
        const now = performance.now();
        const dt = (now - this.prevFrame)/1000; // In seconds
        this.prevFrame = now;
        if(!this.stopped) {
            this.t+=dt;
        }
        this.resizeDisplay();
        this.clearCanvas();
        if(this.legendVisible) this.drawLegend();
        this.drawFunctions();
        this.drawAxes();
        requestAnimationFrame(this.animate.bind(this));
    }

    // Redraw the entire graph.
    redraw() {
        this.resizeDisplay();
        this.clearCanvas();
        if(this.legendVisible) this.drawLegend();
        this.drawFunctions();
        this.drawAxes();
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

/**
 * Class representing a mathematical function to plot on the graph.
 */
export class Function {
    constructor(func, color, name) {
        this.func = func;
        this.color = color || "red";
        this.name = name || "";
    }
}