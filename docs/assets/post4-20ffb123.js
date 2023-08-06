import"./about-d901c400.js";/* empty css               */import{G as S,I as T,F as g}from"./Graph1D-612edaa8.js";const a=new S("plot1"),B=document.getElementById("nLabel"),d=document.getElementById("sliderN");a.setIndicators([new T(1,"x₀")],[]);a.setLabelX("x");a.setLabelY("Ψ",-5);a.setLimits(-4.5,4.5,-1,1);a.setSteps(1e3);a.showLegend();a.addFunc(new g(t=>{const e=parseInt(d.value);let s=.751;if(e==0)return s*Math.exp(-(t**2)/2)*Math.cos((e+1/2)*a.t/2);if(e==1)return s*Math.SQRT2*t*Math.exp(-(t**2)/2)*Math.cos((e+1/2)*a.t/2);if(e==2)return s*(1/Math.SQRT2)*(2*t**2-1)*Math.exp(-(t**2)/2)*Math.cos((e+1/2)*a.t/2);if(e==3)return s*.577*(2*t**3-3*t)*Math.exp(-(t**2)/2)*Math.cos((e+1/2)*a.t/2)},"blue","Real part"));a.addFunc(new g(t=>{const e=parseInt(d.value);let s=.751;if(e==0)return s*Math.exp(-(t**2)/2)*Math.sin(-1*(e+1/2)*a.t/2);if(e==1)return s*Math.SQRT2*t*Math.exp(-(t**2)/2)*Math.sin(-1*(e+1/2)*a.t/2);if(e==2)return s*(1/Math.SQRT2)*(2*t**2-1)*Math.exp(-(t**2)/2)*Math.sin(-1*(e+1/2)*a.t/2);if(e==3)return s*.577*(2*t**3-3*t)*Math.exp(-(t**2)/2)*Math.sin(-1*(e+1/2)*a.t/2)},"red","Imaginary part"));B.innerText=d.value;a.animate();d.oninput=()=>{B.innerText=d.value};const c=document.getElementById("sliderA1"),h=document.getElementById("sliderA2"),f=document.getElementById("sliderA3");let y=.751;const l=new S("plot2");l.setLabelX("x");l.setLabelY("|Ψ|"+String.fromCharCode(178),-25);l.setLimits(-4.5,4.5,-1,1);l.setSteps(600);l.setIndicators([new T(1,"x₀")],[]);l.addFunc(new g(t=>{let e=parseFloat(c.value),s=parseFloat(h.value),u=parseFloat(f.value),M=1/Math.sqrt(e**2+s**2+u**2),n=e*y*Math.exp(-(t**2)/2),i=s*y*Math.SQRT2*t*Math.exp(-(t**2)/2),o=u*y*(1/Math.SQRT2)*(2*t**2-1)*Math.exp(-(t**2)/2);return M**2*(n**2+i**2+o**2+2*n*i*Math.cos(l.t)+2*n*o*Math.cos(2*l.t)+2*i*o*Math.cos(l.t))}));l.animate();const E=document.getElementById("graph-expression"),w=document.getElementById("invalid-expression");function m(){const t=parseFloat(c.value),e=parseFloat(h.value),s=parseFloat(f.value);if(c.value==="0"&&h.value==="0"&&f.value==="0"){w.style.display="block",E.style.display="none";return}else w.style.display="none",E.style.display="block";let u=1/(t**2+e**2+s**2),M=Number(u).toFixed(2),n="+",i="+",o,r,p,I=!0,b=!0,v=!0;t===0&&(I=!1),e==-0&&(b=!1),s===0&&(v=!1),e===0?s<0&&(n="-"):e<0&&(n="-"),s<0&&(i="-"),t===0&&(n=""),e===0&&(i=""),s===0&&(e===0?n="":i=""),t===1?o="":t===-1?o="-":o=t,t===0?e===1?r="":e===-1?r="-":r=e:e===1||e===-1?r="":r=Math.abs(e),e===0&&t===0?s===1?p="":s===-1?p="-":p=s:s===1||s===-1?p="":p=Math.abs(s),katex.render(`|\\psi|^2=${M}\\left|${I?o+"\\psi_0(t)":""}${n}${b?r+"\\psi_1(t)":""}${i}${v?p+"\\psi_2(t)":""}\\right|^2`,document.getElementById("graph-expression"),{throwOnError:!1,displayMode:!0})}m();c.oninput=()=>{m()};h.oninput=()=>{m()};f.oninput=()=>{m()};document.getElementById("btnT0").onclick=()=>{l.t=0};const F=document.getElementById("btnStopStart");F.onclick=()=>{l.stopped=!l.stopped,F.innerHTML=l.stopped?"Play":"Pause"};
