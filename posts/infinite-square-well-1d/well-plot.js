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

// Inputs
sliderA1.oninput = ()=>{ 
    graph2.redraw();
    drawExpression();
}
sliderA2.oninput = ()=>{ 
    graph2.redraw();
    drawExpression();
}
sliderA3.oninput = ()=>{ 
    graph2.redraw();
    drawExpression();
}

function drawExpression() {
    // Rest
    const amp1 = parseFloat(sliderA1.value);
    const amp2 = parseFloat(sliderA2.value);
    const amp3 = parseFloat(sliderA3.value);

    // Atot
    if(sliderA1.value === "0" && sliderA2.value === "0" && sliderA3.value === "0"){
        invalidExpr.style.display = "block";
        graphExpr.style.display = "none";
        return;
    }
    else {
        invalidExpr.style.display = "none";
        graphExpr.style.display = "block";
    }
    let s = 1/(Math.sqrt(amp1**2 + amp2**2 + amp3**2));
    let aTot = Number(s).toFixed(2);

    let plus1 = "+";
    let plus2 = "+";
    let a1 = amp1;
    let a2 = amp2;
    let a3 = amp3;
    let show1 = true;
    let show2 = true;
    let show3 = true;
    // Display expressions
    if(amp1===0)show1=false;
    if(amp2==-0)show2=false;
    if(amp3===0)show3=false;

    // Display sign of "plus" signs
    if(amp2 === 0) {
        if(amp3 < 0) plus1 = "-";
    } 
    else if(amp2 < 0) plus1 = "-";
    if(amp3 < 0) plus2 = "-";

    // Display "plus" signs
    if(amp1 === 0) plus1 = "";
    if(amp2 === 0) plus2 = "";
    if(amp3 === 0) {
        if (amp2 === 0) plus1 = ""; 
        else plus2 = "";
    }
    // Display amplitudes
    // a1
    if(amp1 === 1) a1 = "";
    else if(amp1 === -1) a1 = "-";
    else a1 = amp1;
    // a2
    if(amp1 === 0) {
        if(amp2 === 1) a2 = "";
        else if(amp2 === -1) a2 = "-";
        else a2 = amp2;
    }
    else {
        if(amp2 === 1 || amp2 === -1) a2 = "";
        else a2 = Math.abs(amp2);
    }
    // a3
    if(amp2 === 0 && amp1 === 0) {
        if(amp3 === 1) a3 = "";
        else if(amp3 === -1) a3 = "-";
        else a3 = amp3;
    }
    else {
        if(amp3 === 1 || amp3 === -1) a3 = "";
        else a3 = Math.abs(amp3);
    }
    // Render expression
    katex.render(`\\psi=${aTot}\\left(${show1?a1+"\\sin\\left(\\frac{\\pi x}{L}\\right)":""}${plus1}${show2?a2+"\\sin\\left(\\frac{2\\pi x}{L}\\right)":""}${plus2}${show3?a3+"\\sin\\left(\\frac{3\\pi x}{L}\\right)":""}\\right)`,
    document.getElementById("graph-expression"),{
        throwOnError:false,
        displayMode:true
    })
}
// Initialise
drawExpression();


/**
 * Window resize
 */
window.onresize = ()=>{
    graph.redraw();
    graph2.redraw();
}
