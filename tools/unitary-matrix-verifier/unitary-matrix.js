// import {
//     create,
//     evaluateDependencies
// } from 'mathjs'

// // Create just the functions we need
// const {evaluate } = create({
// evaluateDependencies
// }, {})
import { conj, evaluate, matrix, multiply} from "mathjs";

const matrixGrid = document.getElementById("matrix");
const dimInput = document.getElementById("dimension-input");
const dimBtn = document.getElementById("dimension-btn");
const checkBtn = document.getElementById("check-btn");
const globalFactorInput = document.getElementById("global-factor-input");
const msgOutput = document.getElementById("msg-output");
const msgSuccess = document.getElementById("msg-success");
const msgFail = document.getElementById("msg-fail");
let dim = 3;
let globalFactor = 1;

// CHANGE OF DIMENSIONS & GLOBAL FACTOR
dimBtn.addEventListener("click",()=>{
    dim = parseInt(dimInput.value);
    globalFactor = evaluate(globalFactorInput.value);
    if(globalFactor === undefined) globalFactor = 1;
    if(dim && dim > 1 && dim < 10) changeDimensions();
})
function changeDimensions() {
    matrixGrid.style.gridTemplateColumns = `repeat(${dim},1fr)`;
    matrixGrid.style.gridTemplateRows = `repeat(${dim},1fr)`;
    matrixGrid.innerHTML = "";
    for(let i = 0; i < dim; i++) {
        for(let j = 0; j < dim; j++) {
            let elem = document.createElement("input")
            elem.id=`${i}${j}`
            matrixGrid.appendChild(elem)
        }
    }
}
document.addEventListener("keydown",(event)=>{
    if(event.key === 'Enter') dimBtn.click();
})

// Verify if matrix is unitary
checkBtn.addEventListener("click",()=>{
    // Reset visibility
    msgOutput.style.visibility = "hidden";
    msgFail.style.display = "none";
    msgSuccess.style.display = "none";

    let result = checkUnitary();

    // Show output
    window.scrollBy({top:10, behavior:"smooth"});
    msgOutput.style.visibility = "visible";
    if(result) msgSuccess.style.display = "inline-block";
    else msgFail.style.display = "inline-block";
})

// Check if the given matrix is the identity
function checkIdentity(mat) {
    for(let i = 0; i < dim; i++) {
        for(let j = 0; j < dim; j++) {
            if(i===j) {
                if(parseFloat(mat.get([i,j]).toFixed(4)) !== 1) return false;
            }
            else if(parseFloat(mat.get([i,j]).toFixed(4)) !== 0) return false;
        }
    }
    return true;
}

// Obtain the matrices from user inputs
function getMatrices() {
    let matA = [];
    let matB = [];
    for(let i = 0; i < dim; i++) {
        matA.push([]);
        matB.push([]);
    }
    for(let i = 0; i < dim; i++) {
        for(let j = 0; j < dim; j++) {
            let num = evaluate(document.getElementById(`${i}${j}`).value);
            if(!num) {
                return null;
            }
            matA[i][j] = num;
            matB[j][i] = conj(num);
        }
    }  
    return [matrix(matA),matrix(matB)];
}

// Return whether the input matrix is unitary
function checkUnitary() {
    let mats = getMatrices();
    if(!mats) return false;
    let [matA, matB] = mats;

    // console.log(matA.toTex())
    
    let matC = multiply(matA, matB);
    matC = multiply(matC, globalFactor * globalFactor);
    return(checkIdentity(matC));
}
