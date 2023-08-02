import {Graph1D, Indicator, Function} from "../../scripts/graphing/Graph1D.js";

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
graph.showLegend();
graph.addFunc(new Function((x)=>{
    let n = parseInt(sliderN.value);
    if(x<0 || x>L)return null;
    return Math.sqrt(2/L) * Math.sin(n*Math.PI*x / L)*Math.cos(n**2*graph.t/2);
}, "blue","Real part"))
graph.addFunc(new Function((x)=>{
    let n = parseInt(sliderN.value);
    if(x<0 || x>L)return null;
    return Math.sqrt(2/L) * Math.sin(n*Math.PI*x / L)*Math.sin(-1*n**2*graph.t/2);
}, "red", "Imaginary part"));
nLabel.innerText = sliderN.value;

graph.setIndicators([new Indicator(L, "L", false)],[])

graph.animate();

// Sliders
sliderN.oninput = ()=>{
    nLabel.innerText = sliderN.value;
}

/**
 * Plot 2
 */

const graph2 = new Graph1D("plot2");
graph2.setLabelX("x");
graph2.setLabelY("|Ψ|"+String.fromCharCode(178), -25);
const sliderA1 = document.getElementById("sliderA1")
const sliderA2 = document.getElementById("sliderA2")
const sliderA3 = document.getElementById("sliderA3")
graph2.setLimits(-0.2, 3.4, -1.5, 2);
graph2.setSteps(600);
let n1 = 1;
let n2 = 2;
let n3 = 3;
let a = 3;
graph2.addFunc(new Function((x)=>{
    let a1 = parseFloat(sliderA1.value);
    let a2 = parseFloat(sliderA2.value);
    let a3 = parseFloat(sliderA3.value);
    let A = 1/Math.sqrt(a1**2 + a2**2 + a3**2);
    if(x < 0 || x > a) return null;
    return A**2*(
        a1**2*Math.sin(Math.PI*x/a)**2 + 
        a2**2*Math.sin(2*Math.PI*x/a)**2 + 
        a3**2*Math.sin(3*Math.PI*x/a)**2 +
        a1*a2*Math.sin(Math.PI*x/a)*Math.sin(2*Math.PI*x/a)*Math.cos((n1**2-n2**2)*graph2.t/2) +
        a2*a3*Math.sin(2*Math.PI*x/a)*Math.sin(3*Math.PI*x/a)*Math.cos((n2**2-n3**2)*graph2.t/2) +
        a1*a3*Math.sin(Math.PI*x/a)*Math.sin(3*Math.PI*x/a)*Math.cos((n1**2-n3**2)*graph2.t/2))
}))
graph2.setIndicators([new Indicator(a, "L")],[])
// Animate the plot
graph2.animate();


const aTot = document.getElementById("aTot");
const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");
const a3 = document.getElementById("a3");
const plus1 = document.getElementById("plus1");
const plus2 = document.getElementById("plus2");
const graphExpr = document.getElementById("graph-expression");
const invalidExpr = document.getElementById("invalid-expression");

// Set the normalizes amplitude
function setAtot() {
    if(sliderA1.value === "0" && sliderA2.value === "0" && sliderA3.value === "0"){
        invalidExpr.style.display = "block";
        graphExpr.style.display = "none";
    }
    else {
        invalidExpr.style.display = "none";
        graphExpr.style.display = "block";
    }
    let s = Math.sqrt(parseFloat(sliderA1.value)**2 + parseFloat(sliderA2.value)**2 + parseFloat(sliderA3.value)**2);
    s = 1/s;
    aTot.innerHTML = Number(s).toFixed(2);
}
function setA1() {
    let amplitude = sliderA1.value;
    if(amplitude === "1") amplitude = "";
    else if(amplitude === "-1") amplitude = "-";
    a1.innerHTML = amplitude;
}
function setA2() {
    let amplitude = sliderA2.value;
    if(amplitude < 0) {
        plus1.innerHTML = "−";
    }
    else plus1.innerHTML = "+";
    if(amplitude === "1" || amplitude === "-1") {
        a2.innerHTML = "";
        return;
    }
    a2.innerHTML = Math.abs(parseFloat(amplitude));
}
function setA3() {
    let amplitude = sliderA3.value;
    if(amplitude < 0) {
        plus2.innerHTML = "−";
    }
    else plus2.innerHTML = "+";
    if(amplitude === "1" || amplitude === "-1") {
        a3.innerHTML = "";
        return;
    }
    a3.innerHTML = Math.abs(parseFloat(amplitude));
}

// Initialise values
setA1();
setA2();
setA3();
setAtot();

// Initialise formula
sliderA1.oninput = ()=>{ 
    setA1();
    setAtot();
}
sliderA2.oninput = ()=>{ 
    setA2();
    setAtot();
}
sliderA3.oninput = ()=>{ 
    setA3();
    setAtot();
}