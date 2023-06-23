import { Graph1D } from "../../scripts/graphing/Graph1D";

export class WellGraph extends Graph1D {
    constructor() {
        super("plot1", -0.2, 2.2, -3, 3, 300);
        this.sliderL = document.getElementById("sliderL");
        this.sliderN = document.getElementById("sliderN");
    }

    // Returns the well function
    getFunc() {
        let L = parseFloat(sliderL.value);
        let n = parseInt(sliderN.value);
        return (x)=>{
            if(x < 0 || x > L) return null;
            return Math.sqrt(2/L)*Math.sin(n*Math.PI*x/L);
        }
    }

    animate() {
        super.clearCanvas();
        super.drawFunction();
        super.drawAxes();
        this.resizeDisplay();
        requestAnimationFrame(this.animate.bind(this));
    }
}