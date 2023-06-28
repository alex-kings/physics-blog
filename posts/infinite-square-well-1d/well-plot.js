import {Graph1D, Indicator} from "../../scripts/graphing/Graph1D.js";

/**
 * Plot 1
 */
const nLabel = document.getElementById("quantumNumber")
const sliderN = document.getElementById("sliderN");
const sliderL = document.getElementById("sliderL");
const graph = new Graph1D("plot1");
graph.setLimits(-0.2, 3.4, -1.8, 1.8);
graph.setSteps(1000);
graph.setFunc((x)=>{
    let n = parseInt(sliderN.value);
    let L = parseFloat(sliderL.value);
    if(x<0 || x>L)return null;
    return Math.sqrt(2/L) * Math.sin(n*Math.PI*x / L);
})
nLabel.innerText = sliderN.value;

let L = parseFloat(sliderL.value);
graph.setIndicators([new Indicator(L, "L", true)],[new Indicator(Math.sqrt(2/L), "A")])
graph.redraw();


// Sliders
sliderN.oninput = ()=>{
    graph.redraw();
    nLabel.innerText = sliderN.value;
}
sliderL.oninput = ()=>{
    L = parseFloat(sliderL.value);
    graph.setIndicators([new Indicator(L, "L", true)],[new Indicator(Math.sqrt(2/L), "A")])
    graph.redraw();
}

/**
 * Plot 2
 */
const graph2 = new Graph1D("plot2");
const sliderA1 = document.getElementById("sliderA1")
const sliderA2 = document.getElementById("sliderA2")
const sliderA3 = document.getElementById("sliderA3")
graph2.setLimits(-0.2, 3.4, -1.5, 2);
graph2.setSteps(600);
let n1 = 1;
let n2 = 2;
let n3 = 3;
let a = 3;
graph2.setFunc((x)=>{
    let a1 = parseFloat(sliderA1.value);
    let a2 = parseFloat(sliderA2.value);
    let a3 = parseFloat(sliderA3.value);
    let A = 1/Math.sqrt(a1**2 + a2**2 + a3**2);
    if(x < 0 || x > a) return null;
    return A*(a1*Math.sin(n1*Math.PI*x/a) + a2*Math.sin(n2*Math.PI*x/a) + a3*Math.sin(n3*Math.PI*x/a))
})
graph2.setIndicators([new Indicator(a, "L", true)],[])
graph2.redraw();

sliderA1.oninput = ()=>{ 
    graph2.redraw();

    // Update maths
    // document.getElementById("superposition-maths").innerHTML = "$$lambda$$";
}
sliderA2.oninput = ()=>{ graph2.redraw();}
sliderA3.oninput = ()=>{ graph2.redraw();}
