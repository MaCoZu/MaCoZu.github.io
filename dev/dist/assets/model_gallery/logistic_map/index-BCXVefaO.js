import{l as S}from"../../loadComponents-IR4gVqQb.js";import{s as B}from"../../transform-D0hhaYzD.js";import{l as C,a as $,b as X}from"../../axis-d8_a1sG8.js";import{m as M}from"../../max-DBeXZoyG.js";import{l as P}from"../../line-CJFRD-Fx.js";import"../../init-BFKUnIhM.js";const R=[{name:"navbar",targetId:"navbar"},{name:"footer",targetId:"footer"},{name:"model_drawer",targetId:"model_drawer"}];S(R);function W(a,{height:l=400,margin:e={top:50,right:50,bottom:50,left:70}}={}){const g=B(a).node().getBoundingClientRect().width;let i=3.5,d=.5,n=100;const c=g-e.left-e.right,v=l-e.top-e.bottom,o=B(a).append("svg").attr("width",g).attr("height",l),p=C().domain([0,n]).range([0,c]),s=C().domain([0,1]).range([v,0]),w=t=>t===0?"":t,h=$(p).ticks(10).tickPadding(10),k=X(s).ticks(10).tickPadding(8).tickFormat(w).tickSize(-c);o.append("g").attr("class","x-axis").attr("transform",`translate(${e.left}, ${l-e.bottom})`).call(h).selectAll(".tick text").style("font-size","14px");const _=o.append("g").attr("class","y-axis").attr("transform",`translate(${e.left}, ${e.top})`).call(k);_.selectAll(".tick").style("opacity",t=>t===s.domain()[1]?0:1).select("line").style("stroke-opacity",t=>t===s.domain()[1]?0:.2),_.selectAll(".tick text").style("font-size","14px"),o.append("text").attr("class","x-axis-label").attr("x",e.left+c/2).attr("y",l).style("text-anchor","middle").text("t").style("font-size","20px").style("font-family","sans-serif"),o.append("text").attr("class","y-axis-label").attr("transform","rotate(-90)").attr("x",-e.top-v/2).attr("y",15).style("text-anchor","middle").text("Population").style("font-size","20px").style("font-family","sans-serif");const b=P().x((t,x)=>p(x)+e.left).y(t=>s(t)+e.top);function E(t,x,z){const u=[x];for(let f=1;f<=z;f++){const I=u[f-1],L=t*I*(1-I);u.push(L)}return u}let r=E(i,d,n);const A=o.append("path").datum(r).attr("fill","none").attr("stroke","steelblue").attr("stroke-width",2.5).attr("d",b);function m(){r=E(i,d,n);const t=M(r);s.domain([0,Math.max(1,t)]),o.select(".y-axis").transition().duration(500).call(k),A.datum(r).transition().duration(300).attr("d",b)}return{updateR(t){i=+t,m()},updateX0(t){d=+t,m()},updateSteps(t){n=+t,p.domain([0,n]),o.select(".x-axis").transition().duration(300).call(h),m()}}}const y=W("#logistic_map_chart");document.getElementById("r_map").addEventListener("input",a=>{document.getElementById("r-value_map").textContent=a.target.value,y.updateR(a.target.value)});document.getElementById("x0_map").addEventListener("input",a=>{document.getElementById("x0-value_map").textContent=a.target.value,y.updateX0(a.target.value)});document.getElementById("steps_map").addEventListener("input",a=>{document.getElementById("steps-value_map").textContent=a.target.value,y.updateSteps(a.target.value)});
