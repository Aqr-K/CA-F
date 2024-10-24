import{d as $,r as p,a as B,S as U,v as E,o as b,h as k,i as e,w as n,a0 as I,a1 as N,E as j,f as D,K as C,F,j as L,a2 as W,g as a,B as q,C as i,t as z,a3 as c,a4 as v,D as u,m as V,_ as K}from"./index-BcogOgP3.js";import{S as M}from"./variable-YuAkxgsS.js";import{_ as R,a as A,b as G,c as H,d as J}from"./TreeSync.vue_vue_type_script_setup_true_lang-_VV9nX6k.js";const O=$("buttonShow",()=>{const m=p(!1);function r(){m.value=!1}function y(){m.value=!0}return{isShow:m,hideButton:r,showButton:y}}),P={key:0},Q={class:"btn-settings"},X={class:"btn-settings"},Y={class:"btn-settings"},Z={class:"btn-settings"},h={class:"btn-settings"},ss=B({__name:"sync_config",setup(m){const r=U.useToast();O();const y=D(),{id:w}=y.params,_=p(!0),l=p({...M}),g=p(y.query.tab),x=[{tab:"symlink",icon:"mdi-link-variant",title:"软链接"},{tab:"scheduled_task",icon:"mdi-calendar-clock",title:"定时任务"},{tab:"sync_observer",icon:"mdi-eye",title:"实时监控"},{tab:"cloud_status",icon:"mdi-weather-cloudy",title:"掉盘检测"},{tab:"tree_sync",icon:"mdi-sync",title:"目录树同步"}];async function S(){try{const o=await C.get(`/autosymlink/sync_config/${w}`);l.value=o,_.value=!1}catch(o){console.error("Error fetching sync config:",o)}}async function d(){try{const o=await C.post("/autosymlink/save_config",l.value);o.success?r.success(o.message):r.error(o.message)}catch(o){console.error("Error fetching sync config:",o)}}async function f(){try{const o=await C.post("/autosymlink/delete_config",l.value);o.success?r.success(o.message):r.error(o.message),setTimeout(()=>{V.push("/sync_list")},1e3)}catch(o){console.error("Error fetching sync config:",o)}}function T(o){V.push("/sync_config/"+l.value.id+"?tab="+o)}return E(()=>{S()}),(o,s)=>_.value?j("",!0):(b(),k("div",P,[e(I,{modelValue:g.value,"onUpdate:modelValue":s[0]||(s[0]=t=>g.value=t),"show-arrows":"",class:"v-tabs-pill"},{default:n(()=>[(b(),k(F,null,L(x,t=>e(W,{key:t.icon,value:t.tab,"selected-class":"v-slide-group-item--active v-tab--selected",onClick:es=>T(t.tab)},{default:n(()=>[a("div",null,[e(q,{size:"20",start:"",icon:t.icon},null,8,["icon"]),i(" "+z(t.title),1)])]),_:2},1032,["value","onClick"])),64))]),_:1},8,["modelValue"]),e(N,{modelValue:g.value,"onUpdate:modelValue":s[6]||(s[6]=t=>g.value=t),class:"mt-5 disable-tab-transition",touch:!1},{default:n(()=>[e(c,{value:"symlink"},{default:n(()=>[e(v,{name:"fade-slide",appear:""},{default:n(()=>[a("div",null,[e(R,{syncConfig:l.value,"onUpdate:syncConfig":s[1]||(s[1]=t=>l.value=t)},{footer:n(()=>[a("div",Q,[e(u,{color:"red",onClick:f},{default:n(()=>s[7]||(s[7]=[i("删除")])),_:1}),s[9]||(s[9]=a("span",{class:"mx-3"},null,-1)),e(u,{onClick:d},{default:n(()=>s[8]||(s[8]=[i("保存")])),_:1})])]),_:1},8,["syncConfig"])])]),_:1})]),_:1}),e(c,{value:"scheduled_task"},{default:n(()=>[e(v,{name:"fade-slide",appear:""},{default:n(()=>[a("div",null,[e(A,{syncConfig:l.value,"onUpdate:syncConfig":s[2]||(s[2]=t=>l.value=t)},{footer:n(()=>[a("div",X,[e(u,{color:"red",onClick:f},{default:n(()=>s[10]||(s[10]=[i("删除")])),_:1}),s[12]||(s[12]=a("span",{class:"mx-3"},null,-1)),e(u,{onClick:d},{default:n(()=>s[11]||(s[11]=[i("保存")])),_:1})])]),_:1},8,["syncConfig"])])]),_:1})]),_:1}),e(c,{value:"sync_observer"},{default:n(()=>[e(v,{name:"fade-slide",appear:""},{default:n(()=>[a("div",null,[e(G,{syncConfig:l.value,"onUpdate:syncConfig":s[3]||(s[3]=t=>l.value=t)},{footer:n(()=>[a("div",Y,[e(u,{color:"red",onClick:f},{default:n(()=>s[13]||(s[13]=[i("删除")])),_:1}),s[15]||(s[15]=a("span",{class:"mx-3"},null,-1)),e(u,{onClick:d},{default:n(()=>s[14]||(s[14]=[i("保存")])),_:1})])]),_:1},8,["syncConfig"])])]),_:1})]),_:1}),e(c,{value:"cloud_status"},{default:n(()=>[e(v,{name:"fade-slide",appear:""},{default:n(()=>[a("div",null,[e(H,{syncConfig:l.value,"onUpdate:syncConfig":s[4]||(s[4]=t=>l.value=t)},{footer:n(()=>[a("div",Z,[e(u,{color:"red",onClick:f},{default:n(()=>s[16]||(s[16]=[i("删除")])),_:1}),s[18]||(s[18]=a("span",{class:"mx-3"},null,-1)),e(u,{onClick:d},{default:n(()=>s[17]||(s[17]=[i("保存")])),_:1})])]),_:1},8,["syncConfig"])])]),_:1})]),_:1}),e(c,{value:"tree_sync"},{default:n(()=>[e(v,{name:"fade-slide",appear:""},{default:n(()=>[a("div",null,[e(J,{syncConfig:l.value,"onUpdate:syncConfig":s[5]||(s[5]=t=>l.value=t)},{footer:n(()=>[a("div",h,[e(u,{color:"red",onClick:f},{default:n(()=>s[19]||(s[19]=[i("删除")])),_:1}),s[21]||(s[21]=a("span",{class:"mx-3"},null,-1)),e(u,{onClick:d},{default:n(()=>s[20]||(s[20]=[i("保存")])),_:1})])]),_:1},8,["syncConfig"])])]),_:1})]),_:1})]),_:1},8,["modelValue"])]))}}),as=K(ss,[["__scopeId","data-v-759f0c5e"]]);export{as as default};