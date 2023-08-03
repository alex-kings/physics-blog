import {Graph1D, Indicator, Function} from "../../scripts/graphing/Graph1D.js";

/**
 * Plot 1
 */
const nLabel = document.getElementById("quantumNumber")
const sliderN = document.getElementById("sliderN");
const sliderL = document.getElementById("sliderL");
const graph = new Graph1D("plot1");
graph.setLabelX("x");
graph.setLabelY("Ψ", -5);
graph.setLimits(-0.2, 3.4, -1.6, 1.8);
graph.setSteps(1000);
graph.addFunc(new Function((x)=>{
    let n = parseInt(sliderN.value);
    let L = parseFloat(sliderL.value);
    if(x<0 || x>L)return null;
    return Math.sqrt(2/L) * Math.sin(n*Math.PI*x / L);
}))
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
graph2.setLabelX("x");
graph2.setLabelY("Ψ", -5);
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
    return A*(a1*Math.sin(n1*Math.PI*x/a) + a2*Math.sin(n2*Math.PI*x/a) + a3*Math.sin(n3*Math.PI*x/a))
}))
graph2.setIndicators([new Indicator(a, "L")],[])
graph2.redraw();

// Amplitude values
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

// Display the amplitude labels
function displayLabels() {
    const amp1 = parseFloat(sliderA1.value);
    const amp2 = parseFloat(sliderA2.value);
    const amp3 = parseFloat(sliderA3.value);

    // Display expressions
    if(amp1 === 0) expr1.style.display = "none";
    else expr1.style.display = "block";
    if(amp2 === 0) expr2.style.display = "none";
    else expr2.style.display = "block";
    if(amp3 === 0) expr3.style.display = "none";
    else expr3.style.display = "block";

    // Display sign of "plus" signs
    if(amp2 === 0) plus1.innerHTML = (amp3 < 0 ? "−" : "+");
    else plus1.innerHTML = (amp2 < 0 ? "−" : "+");
    plus2.innerHTML = (amp3 < 0 ? "−" : "+");

    // Display "plus" signs
    if(amp1 === 0) plus1.style.display = "none";
    else plus1.style.display = "block";
    if(amp2 === 0) plus2.style.display = "none";
    else plus2.style.display = "block";
    if(amp3 === 0) {
        if(amp2 === 0) plus1.style.display = "none";
        else plus2.style.display = "none";
    }

    // Display amplitudes
    // a1
    if(amp1 === 1) a1.innerHTML = "";
    else if(amp1 === -1) a1.innerHTML = "-";
    else a1.innerHTML = amp1;
    // a2
    if(amp1 === 0) {
        if(amp2 === 1) a2.innerHTML = "";
        else if (amp2 === -1) a2.innerHTML = "-";
        else a2.innerHTML = amp2;
    }
    else {
        if(amp2 === 1 || amp2 === -1) a2.innerHTML = ""; 
        else a2.innerHTML = Math.abs(amp2);
    }
    // a3
    if(amp2 === 0 && amp1 === 0) {
        if(amp3 === 1) a3.innerHTML = "";
        else if(amp3 === -1) a3.innerHTML = "-";
        else a3.innerHTML = amp3;
    }
    else {
        if(amp3 === 1 || amp3 === -1) a3.innerHTML = "";
        else a3.innerHTML = Math.abs(amp3);
    }
}


// Initialise values
// displayLabels();
// setAtot();

// Initialise formula
sliderA1.oninput = ()=>{ 
    graph2.redraw();
    // displayLabels();
    // setAtot();
    drawExpression();
}
sliderA2.oninput = ()=>{ 
    graph2.redraw();
    // displayLabels();
    // setAtot();
    drawExpression();
}
sliderA3.oninput = ()=>{ 
    graph2.redraw();
    // displayLabels();
    // setAtot();
    drawExpression();
}

function drawExpression() {
    const amp1 = parseFloat(sliderA1.value);
    const amp2 = parseFloat(sliderA2.value);
    const amp3 = parseFloat(sliderA3.value);

    const container = document.getElementById("graph-expression");
    katex.render(`\\psi=A\\left(${amp1}\\psi_1+${amp2}\\psi_2+${amp3}\\psi_3\\right)`,container,{
        throwOnError:false,
        displayMode:true
    })

    // Display expressions
    if(amp1 === 0) expr1.style.display = "none";
    else expr1.style.display = "block";
    if(amp2 === 0) expr2.style.display = "none";
    else expr2.style.display = "block";
    if(amp3 === 0) expr3.style.display = "none";
    else expr3.style.display = "block";

    // Display sign of "plus" signs
    if(amp2 === 0) plus1.innerHTML = (amp3 < 0 ? "−" : "+");
    else plus1.innerHTML = (amp2 < 0 ? "−" : "+");
    plus2.innerHTML = (amp3 < 0 ? "−" : "+");

    // Display "plus" signs
    if(amp1 === 0) plus1.style.display = "none";
    else plus1.style.display = "block";
    if(amp2 === 0) plus2.style.display = "none";
    else plus2.style.display = "block";
    if(amp3 === 0) {
        if(amp2 === 0) plus1.style.display = "none";
        else plus2.style.display = "none";
    }

    // Display amplitudes
    // a1
    if(amp1 === 1) a1.innerHTML = "";
    else if(amp1 === -1) a1.innerHTML = "-";
    else a1.innerHTML = amp1;
    // a2
    if(amp1 === 0) {
        if(amp2 === 1) a2.innerHTML = "";
        else if (amp2 === -1) a2.innerHTML = "-";
        else a2.innerHTML = amp2;
    }
    else {
        if(amp2 === 1 || amp2 === -1) a2.innerHTML = ""; 
        else a2.innerHTML = Math.abs(amp2);
    }
    // a3
    if(amp2 === 0 && amp1 === 0) {
        if(amp3 === 1) a3.innerHTML = "";
        else if(amp3 === -1) a3.innerHTML = "-";
        else a3.innerHTML = amp3;
    }
    else {
        if(amp3 === 1 || amp3 === -1) a3.innerHTML = "";
        else a3.innerHTML = Math.abs(amp3);
    }
}
drawExpression();


/**
 * Window resize
 */
window.onresize = ()=>{
    graph.redraw();
    graph2.redraw();
}
