// import {
//     create,
//     evaluateDependencies
// } from 'mathjs'

// // Create just the functions we need
// const {evaluate } = create({
// evaluateDependencies
// }, {})
import { evaluate } from "mathjs";

console.log(evaluate("awdasdaw"))



// const matrix = document.getElementById("matrix");
// const dimInput = document.getElementById("dimension-input");
// const dimBtn = document.getElementById("dimension-btn");
// const checkBtn = document.getElementById("check-btn");
// let dim = 3;
// // Deal with change in dimension
// dimBtn.addEventListener("click",()=>{
//     dim = parseInt(dimInput.value);
//     if(dim && dim > 1 && dim < 10) changeDimensions();
// })
// function changeDimensions() {
//     matrix.style.gridTemplateColumns = `repeat(${dim},1fr)`;
//     matrix.style.gridTemplateRows = `repeat(${dim},1fr)`;
//     matrix.innerHTML = "";
//     for(let i = 0; i < dim*dim; i++) {
//         let elem = document.createElement("input")
//         elem.id=i
//         matrix.appendChild(elem)
//     }
// }
// document.addEventListener("keydown",(event)=>{
//     if(event.key === 'Enter') dimBtn.click();
// })

// // Verify if matrix is unitary
// checkBtn.addEventListener("click",()=>{
//     let a = document.getElementById("0").value
//     if(a.includes('i')) console.log("imaginary")

//     else {
//         let b = parseFloat(a);
//         if(!b) console.log("wrong");
//     }

// })
