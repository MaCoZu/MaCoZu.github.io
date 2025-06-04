import{S as L,i as N,s as P,l as E,e as $,b as H,c as j,j as x,d as q}from"./transform.B6Pbmi-0.js";import{r as h}from"./index.BVOCwoKb.js";import{s as F}from"./eco_footprint.a30ac79d.CnZiUZHe.js";class D extends Map{constructor(r,t=z){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:t}}),r!=null)for(const[n,o]of r)this.set(n,o)}get(r){return super.get(v(this,r))}has(r){return super.has(v(this,r))}set(r,t){return super.set(M(this,r),t)}delete(r){return super.delete(O(this,r))}}function v({_intern:e,_key:r},t){const n=r(t);return e.has(n)?e.get(n):t}function M({_intern:e,_key:r},t){const n=r(t);return e.has(n)?e.get(n):(e.set(n,t),t)}function O({_intern:e,_key:r},t){const n=r(t);return e.has(n)&&(t=e.get(n),e.delete(n)),t}function z(e){return e!==null&&typeof e=="object"?e.valueOf():e}function S(e){return new L([document.querySelectorAll(e)],[document.documentElement])}const R=Symbol("implicit");function A(){var e=new D,r=[],t=[],n=R;function o(l){let u=e.get(l);if(u===void 0){if(n!==R)return n;e.set(l,u=r.push(l)-1)}return t[u%t.length]}return o.domain=function(l){if(!arguments.length)return r.slice();r=[],e=new D;for(const u of l)e.has(u)||e.set(u,r.push(u)-1);return o},o.range=function(l){return arguments.length?(t=Array.from(l),o):t.slice()},o.unknown=function(l){return arguments.length?(n=l,o):n},o.copy=function(){return A(r,t).unknown(n)},N.apply(o,arguments),o}const B=(e,r)=>{h.useEffect(()=>{if(!r||!e.current)return;const t={top:10,right:30,bottom:80,left:90},n=950-t.left-t.right,o=550-t.top-t.bottom,l=P(e.current);l.selectAll("*").remove();const d=l.append("div").attr("id","chart-container").style("display","flex").style("flex-direction","row").style("align-items","center").append("svg").attr("width",n+t.left+t.right).attr("height",o+t.top+t.bottom).append("g").attr("transform",`translate(${t.left},${t.top})`),c=E().domain($(r,a=>a.HDI)).range([0,n]),i=E().domain($(r,a=>a["Number of Earths required"])).range([o,0]);d.append("g").attr("transform",`translate(0,${o})`).call(H(c)),d.append("text").attr("x",n/2).attr("y",o+60).style("text-anchor","middle").text("Human Development Index"),d.append("g").call(j(i)),d.append("text").attr("transform",`translate(-60, ${o/2}) rotate(-90)`).attr("text-anchor","middle").text("Number of Earths");const p=A().domain(["Africa","EU-27","Other Europe","Middle East/Central Asia","Asia-Pacific","North America","Central America/Caribbean","South America"]).range(["darkgoldenrod","blue","tan","darkolivegreen","crimson","blueviolet","fuchsia","purple"]);let f=null;const m=l.append("div").attr("class","tooltip").style("opacity",0).style("position","absolute").style("background","white").style("border","1px solid #ccc").style("padding","10px").style("border-radius","5px"),C=(a,s)=>{m.transition().duration(200).style("opacity",.9),m.html(`
        <table class="custom-table"">
          <tr>
                <td>Country</td>
                <td style="width: 30px;"></td>
                <td style="padding: 2px 0;"><strong>${s.Country}</strong></td>
            </tr>
            <tr>
                <td>Region</td>
                <td style="width: 30px;"></td>
                <td style="padding: 2px 0;"><strong>${s.Region}</strong></td>
            </tr>
            <tr>
                <td class="tight-lines">Earths<br>required</td>
                <td style="width: 30px;"></td>
                <td><strong>${s["Number of Earths required"]}</strong></td>
            </tr>
            <tr>
                <td>SDG</td>
                <td style="width: 30px;"></td>
                <td><strong>${s.SDGi.toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td>HDI</td>
                <td style="width: 30px;"></td>
                <td><strong>${s.HDI.toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td class="tight-lines">Life<br>Expectancy</td>
                <td style="width: 30px;"></td>
                <td><strong>${s["Life Expectancy"].toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td>GDP pc.</td>
                <td style="width: 30px;"></td>
                <td><strong>$ ${s["Per Capita GDP in $"].toFixed(0)}</strong></td>
            </tr>
        </table>
                `).style("left",`${a.pageX+10}px`).style("top",`${a.pageY-28}px`).style("z-index",10)},G=()=>{m.transition().duration(500).style("opacity",0)},b=(a,s)=>{const y=s.Region||s;S(".dot").transition().duration(200).style("fill",g=>g.Region===y?p(y):"grey").attr("r",g=>g.Region===y?7:3)},k=()=>{f||S(".dot").transition().duration(200).style("fill",a=>p(a.Region)).attr("r",4)},w=(a,s)=>{const y=s.Region||s;f===y?(f=null,k()):(f=y,b(a,s))};d.append("line").attr("class","refLine").style("stroke","rgb(142, 138, 138)").style("stroke-width","2px").style("stroke-dasharray","3, 3").attr("x1",0).attr("x2",n).attr("y1",i(1)).attr("y2",i(1)).attr("stroke-width",2.5).attr("stroke-dasharray","3 3"),d.append("text").attr("id","bio-label").attr("x",10).attr("y",i(1)-10).text("World Biocapacity"),d.append("line").attr("class","refLine").style("stroke","rgb(142, 138, 138)").style("stroke-width","2px").style("stroke-dasharray","3, 3").attr("x1",c(.7)).attr("x2",c(.7)).attr("y1",i(8.5)).attr("y2",i(.1)).attr("stroke-width",2).attr("stroke-dasharray","3 3"),d.append("text").attr("class","ref-label").attr("x",c(.71)).attr("y",i(8.2)).text("High"),d.append("line").attr("class","refLine").style("stroke","rgb(142, 138, 138)").style("stroke-width","2px").style("stroke-dasharray","3, 3").attr("x1",c(.8)).attr("x2",c(.8)).attr("y1",i(8.5)).attr("y2",i(.1)).attr("stroke-width",2).attr("stroke-dasharray","3 3"),d.append("text").attr("class","ref-label").attr("x",c(.81)).attr("y",i(8.2)).selectAll("tspan").data(["Very high","human","development"]).enter().append("tspan").attr("x",c(.81)).attr("dy",(a,s)=>s===0?0:20).text(a=>a),d.append("rect").attr("id","sdg-quadrant").attr("x",c(.7)).attr("y",i(1)).attr("width",c(.26)).attr("height",54).style("opacity",.3),d.append("text").attr("id","bio-label").attr("x",c(.71)).attr("y",i(.54)).selectAll("tspan").data(["Global Sustainable","Development Quadrant"]).enter().append("tspan").attr("x",c(.71)).attr("dy",(a,s)=>s*20).text(a=>a),d.append("g").selectAll("dot").data(r).enter().append("circle").attr("class",a=>`dot ${a.Region.replace(/\s+/g,"")}`).attr("cx",a=>c(a.HDI)).attr("cy",a=>i(a["Number of Earths required"])).attr("r",4).style("fill",a=>p(a.Region)).on("mouseover",C).on("mouseout",G).on("click",w);const I=d.append("g").attr("class","legend").attr("transform","translate(50, 30)");return p.domain().forEach((a,s)=>{const y=I.append("g").attr("transform",`translate(0, ${s*28})`);y.append("circle").attr("r",7).attr("fill",p(a)),y.append("text").attr("x",15).attr("y",5).style("font-size","14px").text(a),y.on("mouseover",g=>b(g,a)).on("mouseleave",k).on("click",g=>w(g,a)).style("cursor","pointer")}),()=>{l.selectAll("*").remove()}},[r,e])},X=({csvPath:e})=>{const r=h.useRef(null),[t,n]=h.useState(null),[o,l]=h.useState(!0),[u,d]=h.useState(null);return B(r,t),h.useEffect(()=>{async function c(){try{const i=await q(e,p=>({Country:p.Country,Region:p.Region,SDGi:+p.SDGi,HDI:+p.HDI,"Life Expectancy":+p["Life Expectancy"],"Per Capita GDP in $":+p["Per Capita GDP in $"],"Income Group":p["Income Group"],"Population (millions)":+p["Population (millions)"],"Number of Earths required":+p["Number of Earths required"]}));n(i)}catch(i){console.error("Failed to load CSV:",i),d("Failed to load data")}finally{l(!1)}}c()},[e]),o?x.jsx("div",{children:"Loading chart data..."}):u?x.jsxs("div",{children:["Error loading chart data: ",u]}):t?x.jsx("div",{ref:r,className:F.chartContainer}):x.jsx("div",{children:"No data available"})};export{X as default};
