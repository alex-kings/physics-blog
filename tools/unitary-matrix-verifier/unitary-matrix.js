// import {
//     create,
//     evaluateDependencies
// } from 'mathjs'

// // Create just the functions we need
// const {evaluate } = create({
// evaluateDependencies
// }, {})
import { complex, conj, evaluate, matrix, multiply} from "mathjs";

const matrixGrid = document.getElementById("matrix");
const dimInput = document.getElementById("dimension-input");
const dimBtn = document.getElementById("dimension-btn");
const checkBtn = document.getElementById("check-btn");
let dim = 3;

// CHANGE OF DIMENSIONS
dimBtn.addEventListener("click",()=>{
    dim = parseInt(dimInput.value);
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
    let matA = [];
    let matB = [];
    for(let i = 0; i < dim; i++) {
        matA.push([]);
        matB.push([]);
    }
    for(let i = 0; i < dim; i++) {
        for(let j = 0; j < dim; j++) {
            let num = evaluate(document.getElementById(`${i}${j}`).value);
            matA[i][j] = num;
            matB[j][i] = conj(num);
        }
    }  
    matA = matrix(matA);
    matB = matrix(matB);
    let matC = multiply(matA, matB);
    console.log(matC);
    console.log(dim);
    console.log(checkIdentity(matC));
})

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
