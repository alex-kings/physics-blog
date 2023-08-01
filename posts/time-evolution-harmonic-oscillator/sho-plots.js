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





// const eigenfunction = () => {
//     const n = parseInt(sliderN.value);
//     let A = 0.751;
//     if(n == 0) {
//         return A*Math.exp(-(x**2)/2);
//     }
//     else if(n == 1) {
//         return A*Math.SQRT2*x*Math.exp(-(x**2)/2);
//     }
//     else if(n == 2) {
//         return A*(1/Math.SQRT2)*(2*x**2-1)*Math.exp(-(x**2)/2);
//     }
//     else if(n == 3) {
//         return A*0.577*(2*x**3-3*x)*Math.exp(-(x**2)/2);
//     }
// }



