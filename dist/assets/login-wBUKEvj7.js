import{a as S,p as T,r as n,s as B,a7 as M,v as D,aF as N,o as p,h as f,i as l,w as r,al as U,E as v,g as u,ah as j,L as A,F as Z,aG as E,K as C,c as P,ak as $,M as q,aa as z,X as G,a9 as k,D as K,C as R,t as X,_ as H}from"./index-DI_hYhUU.js";import{c as J}from"./index-sZoAhobJ.js";const O="data:image/svg+xml,%3csvg%20width='112'%20height='88'%20viewBox='0%200%20112%2088'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M14.31%2029.15C19.2233%2017.3367%2027.3467%209.07333%2038.68%204.36C56.12%20-2.89%2073.31%202.11%2087.48%2013.27C87.5935%2013.359%2087.6866%2013.4712%2087.7531%2013.5991C87.8196%2013.7271%2087.8579%2013.8678%2087.8655%2014.0118C87.8731%2014.1558%2087.8498%2014.2998%2087.7971%2014.434C87.7444%2014.5682%2087.6635%2014.6896%2087.56%2014.79L78.99%2023.03C78.7186%2023.2903%2078.3663%2023.45%2077.9917%2023.4827C77.6171%2023.5155%2077.2425%2023.4192%2076.93%2023.21C68.1367%2017.3233%2059.1667%2015.02%2050.02%2016.3C47%2016.72%2044.3233%2017.6533%2041.99%2019.1C32.41%2025.02%2027.17%2033.5933%2026.27%2044.82C26.2526%2045.0064%2026.1669%2045.1795%2026.03%2045.3054C25.8931%2045.4312%2025.7147%2045.5006%2025.53%2045.5L1.22%2045.51C0.693338%2045.51%200.433339%2045.2467%200.440005%2044.72L0.479999%2030.26C0.479999%2029.92%200.650008%2029.75%200.990008%2029.75L13.27%2029.84C13.77%2029.8467%2014.1167%2029.6167%2014.31%2029.15Z'%20fill='%231F66CF'/%3e%3cpath%20d='M57.0872%2057.7199C65.0346%2057.6922%2071.456%2051.6121%2071.4299%2044.1398C71.4038%2036.6674%2064.9401%2030.6323%2056.9928%2030.6601C49.0454%2030.6878%2042.624%2036.7679%2042.6501%2044.2402C42.6762%2051.7126%2049.1399%2057.7477%2057.0872%2057.7199Z'%20fill='%231F66CF'/%3e%3cpath%20d='M98.91%2059.54C93.06%2073.66%2082.45%2083.11%2067.34%2086.75C52.69%2090.28%2037.25%2084.88%2025.71%2075.2C25.4233%2074.96%2025.4133%2074.7033%2025.68%2074.43L34.75%2065.29C34.9005%2065.1363%2035.1007%2065.041%2035.3149%2065.0208C35.5291%2065.0007%2035.7434%2065.0571%2035.92%2065.18C44.68%2071.33%2057.76%2075.31%2068.08%2071.18C76.57%2067.79%2083.63%2059.68%2085.88%2051.06C86.46%2048.8467%2086.8867%2046.47%2087.16%2043.93C87.2133%2043.4633%2087.4733%2043.2333%2087.94%2043.24L110.91%2043.25C111.085%2043.25%20111.253%2043.3195%20111.377%2043.4433C111.5%2043.5671%20111.57%2043.735%20111.57%2043.91L111.49%2058.27C111.49%2058.3365%20111.477%2058.4024%20111.451%2058.4637C111.425%2058.525%20111.388%2058.5806%20111.34%2058.6271C111.293%2058.6737%20111.236%2058.7103%20111.174%2058.7349C111.113%2058.7594%20111.047%2058.7713%20110.98%2058.77L100.16%2058.71C99.56%2058.7033%2099.1433%2058.98%2098.91%2059.54Z'%20fill='%231F66CF'/%3e%3c/svg%3e",Q={key:0,class:"absolute inset-0"},W={class:"main d-flex justify-center align-center"},Y={key:0,class:"text-error mt-2 text-shadow"},e2=S({__name:"login",setup(a2){const{global:h}=T(),t=n({username:"",password:""}),x=n(!1),i=n(!1),c=B(),w=E(),d=n("");let g=null;const m=n(!1),s=n("");function b(){if(s.value="",!t.value.username||!t.value.password){s.value="请输入完整信息";return}const a=new FormData;a.append("username",t.value.username),a.append("password",t.value.password),C.post("/login/access-token",a,{headers:{Accept:"application/json"}}).then(e=>{const o=e.access_token,F=e.user_name;c.token=o,c.user=F,_()}).catch(e=>{e.response?e.response.status===401?s.value="登录失败，请检查用户名、密码是否正确":e.response.status===403?s.value="登录失败，您没有权限访问":e.response.status===500?s.value="登录失败，服务器错误":s.value=`登录失败 ${e.response.status}，请检查用户名、密码是否正确`:s.value="登录失败，请检查网络连接"})}async function y(){try{const a=await C.get("/login/wallpapers");a.success&&(d.value=a.message)}catch(a){console.log(a)}}M(d,()=>{m.value=!1});function V(){m.value=!0}async function _(){w.push(c.originalUrl??"/")}async function L(){const a=await C.get("/system/settings/theme");return a||null}async function I(){let a=await L()||localStorage.getItem("theme")||"light";const e=J()?"dark":"light";h.name.value=a==="auto"?e:a,localStorage.setItem("theme",a),localStorage.setItem("materio-initial-loader-bg",h.current.value.colors.background)}return D(async()=>{c.token?w.push("/"):(I(),await y(),g=setInterval(y,1e4))}),N(()=>{g&&clearInterval(g)}),(a,e)=>(p(),f(Z,null,[d.value?(p(),f("div",Q,[l(U,{src:d.value,class:"w-full h-full",cover:"",position:"center top",onLoad:V},{placeholder:r(()=>[m.value?v("",!0):(p(),P($,{key:0,class:"object-cover"}))]),default:r(()=>[e[3]||(e[3]=u("div",{class:"absolute inset-0",style:{"background-image":"linear-gradient(rgba(45, 55, 72, 33%) 0%, rgb(26, 32, 46) 100%)"}},null,-1))]),_:1},8,["src"])])):v("",!0),u("div",W,[l(A,{class:j(["px-7 py-3 rounded-lg",{"opacity-85":m.value}]),"min-width":"380","max-width":"380"},{default:r(()=>[l(q,null,{default:r(()=>[l(z,{onSubmit:G(b,["prevent"])},{default:r(()=>[e[5]||(e[5]=u("div",{class:"d-flex justify-center align-center"},[u("img",{src:O,class:"logo"}),u("div",{class:"text-2xl title font-weight-semibold text-uppercase"},"Cloud Asst")],-1)),l(k,{modelValue:t.value.username,"onUpdate:modelValue":e[0]||(e[0]=o=>t.value.username=o),label:"用户名",required:"",class:"my-5"},null,8,["modelValue"]),l(k,{modelValue:t.value.password,"onUpdate:modelValue":e[1]||(e[1]=o=>t.value.password=o),label:"密码",type:i.value?"text":"password","append-inner-icon":i.value?"mdi-eye-off-outline":"mdi-eye-outline","onClick:appendInner":e[2]||(e[2]=o=>i.value=!i.value)},null,8,["modelValue","type","append-inner-icon"]),l(K,{type:"submit",color:"primary",block:"",loading:x.value,class:"my-8"},{default:r(()=>e[4]||(e[4]=[R(" 登录 ")])),_:1},8,["loading"]),s.value?(p(),f("div",Y,X(s.value),1)):v("",!0)]),_:1})]),_:1})]),_:1},8,["class"])])],64))}}),l2=H(e2,[["__scopeId","data-v-b520bfcf"]]);export{l2 as default};
