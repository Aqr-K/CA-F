import{a as n,o as i,c,w as t,e as l,aH as _,g as o,t as a,ab as p,i as d,C as m,D as u}from"./index-BcogOgP3.js";const x="/assets/no-data-CAiMF3xg.svg",f={class:"mt-8 text-2xl"},g={class:"text-subtitle mt-3"},C=n({__name:"NoDataFound",props:{errorCode:{},errorTitle:{},errorDescription:{}},setup(s){const r=s;return(e,D)=>(i(),c(_,{image:l(x),size:"250"},{title:t(()=>[o("div",f,a(r.errorTitle),1)]),text:t(()=>[o("div",g,a(r.errorDescription),1)]),actions:t(()=>[p(e.$slots,"button")]),_:3},8,["image"]))}}),b=n({__name:"[...all]",setup(s){return(r,e)=>(i(),c(C,{"error-code":"404","error-title":"页面不存在 ⚠️","error-description":"您想要访问的页面不存在，请检查地址是否正确。"},{button:t(()=>[d(u,{to:"/",class:"mt-10"},{default:t(()=>e[0]||(e[0]=[m(" 返回 ")])),_:1})]),_:1}))}});export{b as default};