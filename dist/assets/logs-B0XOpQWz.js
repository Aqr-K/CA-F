import{a as L,s as C,r as E,q as V,v as B,N as O,o as r,h as a,e as d,i,O as S,g as t,E as m,w as U,P as $,F as f,B as D,j as R,Q as F,t as p,_ as I}from"./index-DI_hYhUU.js";const W={key:0,class:"mt-5 w-full text-center flex flex-col items-center"},K={key:1,class:"flex flex-center mt-10"},M={class:"flex align-center"},P=["href"],T={class:"text-sm info py-3"},j={class:"inline-block w-[85px]"},z={span:"",class:"inline-block w-[90px]"},A={class:"inline-block mx-10 w-[140px] text-center"},G=["innerHTML"],H=L({__name:"logs",setup(q){const g=C(),l=E([]);let c=null;function x(){return`api/v1system/logging?token=${g.token}&length=-1`}function _(){const n=g.token;c=new EventSource(`api/v1system/logging?token=${n}`),c.addEventListener("message",e=>{const s=e.data;s&&l.value.push(s)})}function h(n){const e=[],s=/^【(.*?)】[0-9\-:]*\s(.*?)\s-\s(.*?)\s-\s(.*)$/;for(const o of n){const u=RegExp(s).exec(o);if(u&&u.length===5){const[Q,N,b,y,w]=u;e.unshift({level:N,time:b,program:y,content:w})}else e.length>0?e[0].content+=`</br></br>${o}`:e.push({level:"UNKNOWN",time:"UNKNOWN",program:"UNKNOWN",content:o})}return e}function v(n){switch(n){case"DEBUG":return"primary";case"INFO":return"secondary";case"WARNING":return"warning";case"ERROR":return"error";default:return"secondary"}}const k=V(()=>h(l.value));return B(()=>{_()}),O(()=>{c&&c.close()}),(n,e)=>(r(),a(f,null,[d(l).length===0?(r(),a("div",W,[i(S,{size:"48",indeterminate:"",color:"primary"}),e[0]||(e[0]=t("span",{class:"mt-3"},"正在刷新 ...",-1))])):m("",!0),d(l).length>0?(r(),a("div",K,[i($,{"hide-default-footer":"","disable-sort":""},{default:U(()=>[t("tbody",null,[t("tr",null,[t("td",null,[t("div",M,[e[2]||(e[2]=t("span",{class:"text-[20px] font-bold"}," 实时日志 ",-1)),t("a",{class:"mx-2 px-3 py-1 inline-flex items-center justify-center",style:{background:"#4d5562",color:"white","border-radius":"20px",cursor:"pointer"},href:x(),target:"_blank"},[i(D,{icon:"mdi-open-in-new"}),e[1]||(e[1]=t("span",{class:"ms-1"},"查看全部日志",-1))],8,P)])])]),(r(!0),a(f,null,R(d(k),(s,o)=>(r(),a("tr",{key:o,class:"text-sm"},[t("td",T,[t("span",j,[i(F,{size:"small",color:v(s.level),variant:"elevated",textContent:p(s.level)},null,8,["color","textContent"])]),t("span",z,p(s.time),1),t("span",A,p(s.program),1),t("span",{innerHTML:s.content.replace(/\\hf/g,"<br><br>")},null,8,G)])]))),128))])]),_:1})])):m("",!0)],64))}}),X=I(H,[["__scopeId","data-v-fc453bdd"]]);export{X as default};
