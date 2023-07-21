import {Graph1D, Indicator} from "../../scripts/graphing/Graph1D.js";

/**
 * Plot 1
 */
const nLabel = document.getElementById("nLabel")
const sliderN = document.getElementById("sliderN");
const L = 1;
const graph = new Graph1D("plot1");
graph.setLabelX("x");
graph.setLabelY("Ψ", -5);
graph.setLimits(-0.2, 1.2, -1.6, 1.8);
graph.setSteps(1000);
graph.setFunc((x)=>{
    let n = parseInt(sliderN.value);
    if(x<0 || x>L)return null;
    return Math.sqrt(2/L) * Math.sin(n*Math.PI*x / L) * Math.exp();
})
nLabel.innerText = sliderN.value;

graph.setIndicators([new Indicator(L, "L", false)],[])

graph.animate();

// Sliders
sliderN.oninput = ()=>{
    graph.redraw();
    nLabel.innerText = sliderN.value;
}