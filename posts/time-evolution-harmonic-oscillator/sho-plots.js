import {Graph1D, Indicator, Function} from "../../scripts/graphing/Graph1D.js";


// Eigenfunctions time-dependance plot
const graph1 = new Graph1D("plot1");
const nLabel = document.getElementById("nLabel")
const sliderN = document.getElementById("sliderN");

graph1.setLabelX("x");
graph1.setLabelY("Ψ", -5);
graph1.setLimits(-4.5,4.5, -1, 1);
graph1.setSteps(1000);
graph1.showLegend();
graph1.addFunc(new Function((x)=>{
    const n = parseInt(sliderN.value);
    let A = 0.751;
    if(n == 0) {
        return A*Math.exp(-(x**2)/2)*Math.cos((n+1/2)*graph1.t/2);
    }
    else if(n == 1) {
        return A*Math.SQRT2*x*Math.exp(-(x**2)/2)*Math.cos((n+1/2)*graph1.t/2);
    }
    else if(n == 2) {
        return A*(1/Math.SQRT2)*(2*x**2-1)*Math.exp(-(x**2)/2)*Math.cos((n+1/2)*graph1.t/2);
    }
    else if(n == 3) {
        return A*0.577*(2*x**3-3*x)*Math.exp(-(x**2)/2)*Math.cos((n+1/2)*graph1.t/2);
    }
},"blue","Real part"))
graph1.addFunc(new Function((x)=>{
    const n = parseInt(sliderN.value);
    let A = 0.751;
    if(n == 0) {
        return A*Math.exp(-(x**2)/2)*Math.sin(-1*(n+1/2)*graph1.t/2);
    }
    else if(n == 1) {
        return A*Math.SQRT2*x*Math.exp(-(x**2)/2)*Math.sin(-1*(n+1/2)*graph1.t/2);
    }
    else if(n == 2) {
        return A*(1/Math.SQRT2)*(2*x**2-1)*Math.exp(-(x**2)/2)*Math.sin(-1*(n+1/2)*graph1.t/2);
    }
    else if(n == 3) {
        return A*0.577*(2*x**3-3*x)*Math.exp(-(x**2)/2)*Math.sin(-1*(n+1/2)*graph1.t/2);
    }
},"red","Imaginary part"))
nLabel.innerText = sliderN.value;

graph1.animate();


// Sliders
sliderN.oninput = ()=>{
    nLabel.innerText = sliderN.value;
}



/**
 * Graph 2
 */
const sliderA1 = document.getElementById("sliderA1");
const sliderA2 = document.getElementById("sliderA2");
const sliderA3 = document.getElementById("sliderA3");
let coef = 0.751;

function psi0(x) {
    return ;
}
function psi1(x) {
    return ;
}
function psi2(x) {
    return ;
}

const graph2 = new Graph1D("plot2");
graph2.setLabelX("x");
graph2.setLabelY("|Ψ|"+String.fromCharCode(178), -25);
graph2.setLimits(-4.5,4.5, -1, 1);
graph2.setSteps(600);

graph2.setIndicators([new Indicator(1, "x₀")],[])

graph2.addFunc(new Function((x)=>{
    let a1 = parseFloat(sliderA1.value);
    let a2 = parseFloat(sliderA2.value);
    let a3 = parseFloat(sliderA3.value);
    let A = 1/Math.sqrt(a1**2 + a2**2 + a3**2);
    let psi0 = a1*coef*Math.exp(-(x**2)/2);
    let psi1 = a2*coef*Math.SQRT2*x*Math.exp(-(x**2)/2)
    let psi2 = a3*coef*(1/Math.SQRT2)*(2*x**2-1)*Math.exp(-(x**2)/2);
    return A**2*(psi0**2+psi1**2+psi2**2
    +2*psi0*psi1*Math.cos(graph2.t)
    +2*psi0*psi2*Math.cos(2*graph2.t)
    +2*psi1*psi2*Math.cos(graph2.t)
    );
}))

// Animate the plot
graph2.animate();

/**
 * Change expression.
 */
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
        graphExpr.style.display = "block math";
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

document.getElementById("btnT0").onclick=()=>{
    graph2.t = 0;
}
const btnStop = document.getElementById("btnStopStart");
btnStop.onclick=()=>{
    graph2.stopped = !graph2.stopped;
    btnStop.innerHTML = graph2.stopped? "Restart" : "Stop";
}



