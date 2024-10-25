import{a as T,S as N,r as b,v as H,b as O,e as E,o as L,h as W,i as e,w as a,M,L as $,g as x,B as F,T as k,a9 as z,Y as P,Z as C,a8 as Y,D as S,C as U,E as Q,K as A,_ as K,$ as j,ac as D,U as ee,W as te,X as ae,ad as ne,ae as oe,a0 as le,a1 as ie,f as re,F as se,j as ce,a2 as de,t as ue,a3 as I,a4 as R,m as fe}from"./index-B9z1J0xF.js";import{d as q}from"./vuedraggable.umd-ChH2Clv4.js";const me={key:0},ge={class:"absolute top-0 right-3"},_e={class:"btn-settings"},pe=T({__name:"MediaLibrary",setup(V){const h=N.useToast(),r=b(!0),l={type:"library",name:"媒体库目录",path:"",media_type:"all",category:"all"},v=b({}),g=b([l]);function u(n){g.value[n].category=v.value[g.value[n].media_type][0]}function t(){g.value.push(l)}function s(n){g.value.splice(n,1)}async function i(){try{const n=await A.get("/transfer/media_category");v.value=n}catch(n){console.error("Error fetching category:",n)}}async function f(){try{const n=await A.get("/system/settings/media_directory");c(n),r.value=!1}catch(n){console.error("Error fetching media_directory:",n)}}async function o(){try{let n={settings:g.value,name:"media_directory"};const _=await A.post("/system/save_settings",n);_.success?h.success(_.message):h.error(_.message)}catch(n){console.error("Error fetching  saveConfig:",n)}}function c(n){g.value=n}return H(()=>{f(),i()}),(n,_)=>{const m=O("IconBtn"),p=O("VPathInput");return E(r)?Q("",!0):(L(),W("div",me,[e($,{title:"媒体目录",subtitle:"设置媒体文件整理后存储目录和分类，智能匹配"},{default:a(()=>[e(M,null,{default:a(()=>[e(E(q),{list:E(g),handle:".cursor-move",delay:"100","item-key":"id",tag:"div","component-data":{class:"grid gap-3 grid-directory"}},{item:a(({element:d,index:w})=>[e($,{title:"",color:"card"},{default:a(()=>[x("span",ge,[e(m,{onClick:t},{default:a(()=>[e(F,{icon:"mdi-plus"})]),_:1}),e(m,{onClick:y=>s(w)},{default:a(()=>[e(F,{icon:"mdi-minus"})]),_:2},1032,["onClick"]),e(m,null,{default:a(()=>[e(F,{class:"cursor-move",icon:"mdi-drag"})]),_:1})]),e(k,{class:"mt-3"},{default:a(()=>[e(z,{label:"名称",modelValue:d.name,"onUpdate:modelValue":y=>d.name=y},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(k,{class:"path-input"},{default:a(()=>[e(p,{label:"路径",modelValue:d.path,"onUpdate:modelValue":y=>d.path=y},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(k,{class:"mb-3"},{default:a(()=>[e(P,null,{default:a(()=>[e(C,{cols:"5"},{default:a(()=>[e(Y,{label:"媒体类型",items:[{title:"电影",value:"movie"},{title:"电视剧",value:"tv"}],modelValue:d.media_type,"onUpdate:modelValue":y=>d.media_type=y,class:"t-select","onUpdate:modelValue:":y=>u(w)},null,8,["modelValue","onUpdate:modelValue","onUpdate:modelValue:"])]),_:2},1024),e(C,{cols:"7"},{default:a(()=>[e(Y,{label:"媒体类别",items:E(v)[d.media_type],modelValue:d.category,"onUpdate:modelValue":y=>d.category=y,class:"t-select"},null,8,["items","modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:1},8,["list"])]),_:1}),x("div",_e,[e(S,{onClick:o},{default:a(()=>_[0]||(_[0]=[U("保存")])),_:1})])]),_:1})]))}}}),ve=K(pe,[["__scopeId","data-v-b3a62803"]]),he={key:0},ke={class:"btn-settings"},ye=T({__name:"MediaConfig",setup(V){const h=N.useToast(),r=b(!0),l=b({transfer_type:"move",fanart_enable:!1,scrape:!0,file_size_limit:0,movie_name_rule:"{% if title %}{{ title }}{% endif %}{% if year %} ({{ year }}){% endif %}{% if tmdbid %} {tmdb-{{ tmdbid }}}{% endif %}/{% if title %}{{ title }}{% endif %}{% if year %} ({{ year }}){% endif %}{% if resolution %} - {{ resolution }}{% endif %}{% if source %}.{{ source }}{% endif %}{% if dolby_vision %}.{{ dolby_vision }}{% endif %}{% if color_space %}.{{ color_space }}{% endif %}{% if video_codec %}.{{ video_codec }}{% endif %}{% if audio_codec %}.{{ audio_codec }}{% endif %}{% if release_group %}-{{ release_group }}{% endif %}{{ext}}",tv_name_rule:"{% if title %}{{ title }}{% endif %}{% if year %} ({{ year }}){% endif %}{% if tmdbid %} {tmdb-{{ tmdbid }}}{% endif %}/{% if season %}Season {{ season  }}{% endif %}/{% if title %}{{ title }}{% endif %}{% if year %} ({{ year }}){% endif %}}{% if resolution %} - {{ resolution }}{% endif %}{% if season_episode %}.{{ season_episode  }}{% endif %}{% if part %}-{{ part }}{% endif %}{% if episode %}.第{{ episode  }}集{% endif %}{% if source %}.{{ source }}{% endif %}{% if dolby_vision %}.{{ dolby_vision }}{% endif %}{% if color_space %}.{{ color_space }}{% endif %}{% if video_codec %}.{{ video_codec }}{% endif %}{% if audio_codec %}.{{ audio_codec }}{% endif %}{% if release_group %}-{{ release_group }}{% endif %}{{ext}}"});async function v(){try{const u=await A.get("/system/settings/media_config");l.value=u,console.log(l.value),r.value=!1}catch(u){console.error("Error fetching sync config:",u)}}async function g(){try{let u={settings:l.value,name:"media_config"};const t=await A.post("/system/save_settings",u);t.success?h.success(t.message):h.error(t.message)}catch(u){console.error("Error fetching  saveConfig:",u)}}return H(()=>{v()}),(u,t)=>r.value?Q("",!0):(L(),W("div",he,[e(P,null,{default:a(()=>[e(C,{cols:"12",md:"10",title:"掉盘检测"},{default:a(()=>[e($,null,{default:a(()=>[e(k,{class:"mt-5"},{default:a(()=>[e(Y,{label:"转移方式",items:[{title:"移动",value:"move"},{title:"复制",value:"copy"},{title:"硬链接",value:"link"},{title:"软链接",value:"symlink"}],modelValue:l.value.transfer_type,"onUpdate:modelValue":t[0]||(t[0]=s=>l.value.transfer_type=s),hint:"","persistent-hint":""},null,8,["modelValue"])]),_:1}),e(k,null,{default:a(()=>[e(P,null,{default:a(()=>[e(C,{cols:"6"},{default:a(()=>[e(j,{label:"刮削元数据",modelValue:l.value.scrape,"onUpdate:modelValue":t[1]||(t[1]=s=>l.value.scrape=s),class:"p-0 m-0"},null,8,["modelValue"])]),_:1}),e(C,{cols:"6"},{default:a(()=>[e(j,{label:"Fanart刮削",modelValue:l.value.fanart_enable,"onUpdate:modelValue":t[2]||(t[2]=s=>l.value.fanart_enable=s),class:"p-0 m-0"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(k,null,{default:a(()=>[e(D,{label:"电视剧命名规则",modelValue:l.value.tv_name_rule,"onUpdate:modelValue":t[3]||(t[3]=s=>l.value.tv_name_rule=s),"auto-grow":"",outlined:"",hint:"","persistent-hint":""},null,8,["modelValue"])]),_:1}),e(k,null,{default:a(()=>[e(D,{label:"电影命名规则",modelValue:l.value.movie_name_rule,"onUpdate:modelValue":t[4]||(t[4]=s=>l.value.movie_name_rule=s),"auto-grow":"",outlined:"",hint:"","persistent-hint":""},null,8,["modelValue"])]),_:1}),e(k,{class:"mb-5"},{default:a(()=>[e(z,{label:"最小文件大小（MB）",modelValue:l.value.file_size_limit,"onUpdate:modelValue":t[5]||(t[5]=s=>l.value.file_size_limit=s),hint:"只整理大于最小文件大小的文件","persistent-hint":""},null,8,["modelValue"])]),_:1}),x("div",ke,[e(S,{onClick:g},{default:a(()=>t[6]||(t[6]=[U("保存")])),_:1})])]),_:1})]),_:1})]),_:1})]))}}),be={key:0},Ve={class:"absolute top-0 right-3"},xe={class:"btn-settings"},Ce=T({__name:"TransferWatcher",setup(V){const h=N.useToast(),r=b(!0),l={source_dir:"",dest_dir:"",transfer_type:"move",watch_mode:"observer",scrape:!1,switch:!1,exclude_words:"",interval:10,scheduled_time:"",id:""};b({});const v=b([l]);function g(){v.value.push(l)}function u(o){v.value.splice(o,1)}async function t(o){}async function s(){try{const o=await A.get("/system/settings/transfer_watcher");console.log(o),f(o),r.value=!1}catch(o){console.error("Error fetching transfer_watcher:",o)}}async function i(){try{let o={settings:v.value,name:"transfer_watcher"};const c=await A.post("/system/save_settings",o);c.success?h.success(c.message):h.error(c.message)}catch(o){console.error("Error fetching  saveConfig:",o)}}function f(o){v.value=o}return H(()=>{s()}),(o,c)=>{const n=O("IconBtn"),_=O("VPathInput");return E(r)?Q("",!0):(L(),W("div",be,[e($,{title:"目录监控",subtitle:"实时监控目录,自动进行整理转移"},{default:a(()=>[e(M,null,{default:a(()=>[e(E(q),{list:E(v),handle:".cursor-move",delay:"100","item-key":"id",tag:"v-row"},{item:a(({element:m,index:p})=>[e(C,{cols:"12",md:"6"},{default:a(()=>[e($,{title:"",color:"card"},{default:a(()=>[x("span",Ve,[e(n,{onClick:g},{default:a(()=>[e(F,{icon:"mdi-plus"})]),_:1}),e(n,{onClick:d=>u(p)},{default:a(()=>[e(F,{icon:"mdi-minus"})]),_:2},1032,["onClick"]),e(ee,{text:"同步"},{activator:a(({props:d})=>[e(n,te(d,{onClick:ae(w=>t(m),["stop"])}),{default:a(()=>[e(F,{icon:"mdi-cloud-sync-outline"})]),_:2},1040,["onClick"])]),_:2},1024),e(n,null,{default:a(()=>[e(F,{class:"cursor-move",icon:"mdi-drag"})]),_:1})]),e(k,{class:"path-input"},{default:a(()=>[e(_,{label:"源目录",modelValue:m.source_dir,"onUpdate:modelValue":d=>m.source_dir=d},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(k,{class:"path-input"},{default:a(()=>[e(_,{label:"目的目录",modelValue:m.dest_dir,"onUpdate:modelValue":d=>m.dest_dir=d},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(k,null,{default:a(()=>[e(Y,{label:"转移方式",items:[{title:"默认",value:""},{title:"移动",value:"move"},{title:"复制",value:"copy"},{title:"硬链接",value:"link"},{title:"软链接",value:"symlink"}],modelValue:m.transfer_type,"onUpdate:modelValue":d=>m.transfer_type=d,hint:"","persistent-hint":""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(k,null,{default:a(()=>[e(Y,{label:"监控模式",items:[{title:"事件通知",value:"observer"},{title:"轮询模式",value:"polling_observer"}],modelValue:m.watch_mode,"onUpdate:modelValue":d=>m.watch_mode=d,hint:"监控本地文件夹推荐事件通知,网盘文件夹推荐轮询模式","persistent-hint":""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(k,null,{default:a(()=>[e(z,{label:"屏蔽词",modelValue:m.exclude_words,"onUpdate:modelValue":d=>m.exclude_words=d,hint:"","persistent-hint":""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(k,null,{default:a(()=>[e(z,{label:"入库消息延迟",modelValue:m.interval,"onUpdate:modelValue":d=>m.interval=d,hint:"","persistent-hint":""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(k,null,{default:a(()=>[e(z,{label:"定时同步",modelValue:m.scheduled_time,"onUpdate:modelValue":d=>m.scheduled_time=d,hint:"5位cron表达式，留空关闭，如果想要5分钟同步一次，就填*/5 * * * *","persistent-hint":""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(k,null,{default:a(()=>[e(P,null,{default:a(()=>[e(C,{cols:"6"},{default:a(()=>[e(j,{label:"刮削元数据",modelValue:m.scrape,"onUpdate:modelValue":d=>m.scrape=d,class:"p-0 m-0"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(C,{cols:"6"},{default:a(()=>[e(j,{label:"启用",modelValue:m.switch,"onUpdate:modelValue":d=>m.switch=d,class:"p-0 m-0"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:1},8,["list"]),x("div",xe,[e(S,{onClick:i},{default:a(()=>c[0]||(c[0]=[U("保存")])),_:1})])]),_:1})]),_:1})]))}}}),Ae=K(Ce,[["__scopeId","data-v-ae81000b"]]);var we={exports:{}};(function(V,h){ace.define("ace/mode/yaml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,l,v){var g=r("../lib/oop"),u=r("./text_highlight_rules").TextHighlightRules,t=function(){this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"list.markup",regex:/^(?:-{3}|\.{3})\s*(?=#|$)/},{token:"list.markup",regex:/^\s*[\-?](?:$|\s)/},{token:"constant",regex:"!![\\w//]+"},{token:"constant.language",regex:"[&\\*][a-zA-Z0-9-_]+"},{token:["meta.tag","keyword"],regex:/^(\s*\w[^\s:]*?)(:(?=\s|$))/},{token:["meta.tag","keyword"],regex:/(\w[^\s:]*?)(\s*:(?=\s|$))/},{token:"keyword.operator",regex:"<<\\w*:\\w*"},{token:"keyword.operator",regex:"-\\s*(?=[{])"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:/[|>][-+\d]*(?:$|\s+(?:$|#))/,onMatch:function(s,i,f,o){o=o.replace(/ #.*/,"");var c=/^ *((:\s*)?-(\s*[^|>])?)?/.exec(o)[0].replace(/\S\s*$/,"").length,n=parseInt(/\d+[\s+-]*$/.exec(o));return n?(c+=n-1,this.next="mlString"):this.next="mlStringPre",f.length?(f[0]=this.next,f[1]=c):(f.push(this.next),f.push(c)),this.token},next:"mlString"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:/(\b|[+\-\.])[\d_]+(?:(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)(?=[^\d-\w]|$)$/},{token:"constant.numeric",regex:/[+\-]?\.inf\b|NaN\b|0x[\dA-Fa-f_]+|0b[10_]+/},{token:"constant.language.boolean",regex:"\\b(?:true|false|TRUE|FALSE|True|False|yes|no)\\b"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:/[^\s,:\[\]\{\}]+/}],mlStringPre:[{token:"indent",regex:/^ *$/},{token:"indent",regex:/^ */,onMatch:function(s,i,f){var o=f[1];return o>=s.length?(this.next="start",f.shift(),f.shift()):(f[1]=s.length-1,this.next=f[0]="mlString"),this.token},next:"mlString"},{defaultToken:"string"}],mlString:[{token:"indent",regex:/^ *$/},{token:"indent",regex:/^ */,onMatch:function(s,i,f){var o=f[1];return o>=s.length?(this.next="start",f.splice(0)):this.next="mlString",this.token},next:"mlString"},{token:"string",regex:".+"}]},this.normalizeRules()};g.inherits(t,u),l.YamlHighlightRules=t}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(r,l,v){var g=r("../range").Range,u=function(){};(function(){this.checkOutdent=function(t,s){return/^\s+$/.test(t)?/^\s*\}/.test(s):!1},this.autoOutdent=function(t,s){var i=t.getLine(s),f=i.match(/^(\s*\})/);if(!f)return 0;var o=f[1].length,c=t.findMatchingBracket({row:s,column:o});if(!c||c.row==s)return 0;var n=this.$getIndent(t.getLine(c.row));t.replace(new g(s,0,s,o-1),n)},this.$getIndent=function(t){return t.match(/^\s*/)[0]}}).call(u.prototype),l.MatchingBraceOutdent=u}),ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(r,l,v){var g=r("../../lib/oop"),u=r("./fold_mode").FoldMode,t=r("../../range").Range,s=l.FoldMode=function(){};g.inherits(s,u),(function(){this.commentBlock=function(i,f){var o=/\S/,c=i.getLine(f),n=c.search(o);if(!(n==-1||c[n]!="#")){for(var _=c.length,m=i.getLength(),p=f,d=f;++f<m;){c=i.getLine(f);var w=c.search(o);if(w!=-1){if(c[w]!="#")break;d=f}}if(d>p){var y=i.getLine(d).length;return new t(p,_,d,y)}}},this.getFoldWidgetRange=function(i,f,o){var c=this.indentationBlock(i,o);if(c||(c=this.commentBlock(i,o),c))return c},this.getFoldWidget=function(i,f,o){var c=i.getLine(o),n=c.search(/\S/),_=i.getLine(o+1),m=i.getLine(o-1),p=m.search(/\S/),d=_.search(/\S/);if(n==-1)return i.foldWidgets[o-1]=p!=-1&&p<d?"start":"","";if(p==-1){if(n==d&&c[n]=="#"&&_[n]=="#")return i.foldWidgets[o-1]="",i.foldWidgets[o+1]="","start"}else if(p==n&&c[n]=="#"&&m[n]=="#"&&i.getLine(o-2).search(/\S/)==-1)return i.foldWidgets[o-1]="start",i.foldWidgets[o+1]="","";return p!=-1&&p<n?i.foldWidgets[o-1]="start":i.foldWidgets[o-1]="",n<d?"start":""}}).call(s.prototype)}),ace.define("ace/mode/folding/yaml",["require","exports","module","ace/lib/oop","ace/mode/folding/coffee","ace/range"],function(r,l,v){var g=r("../../lib/oop"),u=r("./coffee").FoldMode,t=r("../../range").Range,s=l.FoldMode=function(){};g.inherits(s,u),(function(){this.getFoldWidgetRange=function(i,f,o){var c=/\S/,n=i.getLine(o),_=n.search(c),m=n[_]==="#",p=n[_]==="-";if(_!=-1){var d=n.length,w=i.getLength(),y=o,Z=o;if(m){var B=this.commentBlock(i,o);if(B)return B}else if(p){var B=this.indentationBlock(i,o);if(B)return B}else for(;++o<w;){var n=i.getLine(o),X=n.search(c);if(X!=-1){if(X<=_&&n[_]!=="-"){var G=i.getTokenAt(o,0);if(!G||G.type!=="string")break}Z=o}}if(Z>y){var J=i.getLine(Z).length;return new t(y,d,Z,J)}}},this.getFoldWidget=function(i,f,o){var c=i.getLine(o),n=c.search(/\S/),_=i.getLine(o+1),m=i.getLine(o-1),p=m.search(/\S/),d=_.search(/\S/),w=c[n]==="-";if(n==-1)return i.foldWidgets[o-1]=p!=-1&&p<d?"start":"","";if(p==-1){if(n==d&&c[n]=="#"&&_[n]=="#")return i.foldWidgets[o-1]="",i.foldWidgets[o+1]="","start"}else if(p==n&&c[n]=="#"&&m[n]=="#"&&i.getLine(o-2).search(/\S/)==-1)return i.foldWidgets[o-1]="start",i.foldWidgets[o+1]="","";return p!=-1&&p<n||p!=-1&&p==n&&w?i.foldWidgets[o-1]="start":i.foldWidgets[o-1]="",n<d?"start":""}}).call(s.prototype)}),ace.define("ace/mode/yaml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/yaml_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/yaml","ace/worker/worker_client"],function(r,l,v){var g=r("../lib/oop"),u=r("./text").Mode,t=r("./yaml_highlight_rules").YamlHighlightRules,s=r("./matching_brace_outdent").MatchingBraceOutdent,i=r("./folding/yaml").FoldMode,f=r("../worker/worker_client").WorkerClient,o=function(){this.HighlightRules=t,this.$outdent=new s,this.foldingRules=new i,this.$behaviour=this.$defaultBehaviour};g.inherits(o,u),(function(){this.lineCommentStart=["#"],this.getNextLineIndent=function(c,n,_){var m=this.$getIndent(n);if(c=="start"){var p=n.match(/^.*[\{\(\[]\s*$/);p&&(m+=_)}return m},this.checkOutdent=function(c,n,_){return this.$outdent.checkOutdent(n,_)},this.autoOutdent=function(c,n,_){this.$outdent.autoOutdent(n,_)},this.createWorker=function(c){var n=new f(["ace"],"ace/mode/yaml_worker","YamlWorker");return n.attachToDocument(c.getDocument()),n.on("annotate",function(_){c.setAnnotations(_.data)}),n.on("terminate",function(){c.clearAnnotations()}),n},this.$id="ace/mode/yaml"}).call(o.prototype),l.Mode=o}),function(){ace.require(["ace/mode/yaml"],function(r){V&&(V.exports=r)})}()})(we);var Fe={exports:{}};(function(V,h){ace.define("ace/theme/monokai-css",["require","exports","module"],function(r,l,v){v.exports=`.ace-monokai .ace_gutter {
  background: #2F3129;
  color: #8F908A
}

.ace-monokai .ace_print-margin {
  width: 1px;
  background: #555651
}

.ace-monokai {
  background-color: #272822;
  color: #F8F8F2
}

.ace-monokai .ace_cursor {
  color: #F8F8F0
}

.ace-monokai .ace_marker-layer .ace_selection {
  background: #49483E
}

.ace-monokai.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #272822;
}

.ace-monokai .ace_marker-layer .ace_step {
  background: rgb(102, 82, 0)
}

.ace-monokai .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid #49483E
}

.ace-monokai .ace_marker-layer .ace_active-line {
  background: #202020
}

.ace-monokai .ace_gutter-active-line {
  background-color: #272727
}

.ace-monokai .ace_marker-layer .ace_selected-word {
  border: 1px solid #49483E
}

.ace-monokai .ace_invisible {
  color: #52524d
}

.ace-monokai .ace_entity.ace_name.ace_tag,
.ace-monokai .ace_keyword,
.ace-monokai .ace_meta.ace_tag,
.ace-monokai .ace_storage {
  color: #F92672
}

.ace-monokai .ace_punctuation,
.ace-monokai .ace_punctuation.ace_tag {
  color: #fff
}

.ace-monokai .ace_constant.ace_character,
.ace-monokai .ace_constant.ace_language,
.ace-monokai .ace_constant.ace_numeric,
.ace-monokai .ace_constant.ace_other {
  color: #AE81FF
}

.ace-monokai .ace_invalid {
  color: #F8F8F0;
  background-color: #F92672
}

.ace-monokai .ace_invalid.ace_deprecated {
  color: #F8F8F0;
  background-color: #AE81FF
}

.ace-monokai .ace_support.ace_constant,
.ace-monokai .ace_support.ace_function {
  color: #66D9EF
}

.ace-monokai .ace_fold {
  background-color: #A6E22E;
  border-color: #F8F8F2
}

.ace-monokai .ace_storage.ace_type,
.ace-monokai .ace_support.ace_class,
.ace-monokai .ace_support.ace_type {
  font-style: italic;
  color: #66D9EF
}

.ace-monokai .ace_entity.ace_name.ace_function,
.ace-monokai .ace_entity.ace_other,
.ace-monokai .ace_entity.ace_other.ace_attribute-name,
.ace-monokai .ace_variable {
  color: #A6E22E
}

.ace-monokai .ace_variable.ace_parameter {
  font-style: italic;
  color: #FD971F
}

.ace-monokai .ace_string {
  color: #E6DB74
}

.ace-monokai .ace_comment {
  color: #75715E
}

.ace-monokai .ace_indent-guide {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y
}

.ace-monokai .ace_indent-guide-active {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQIW2PQ1dX9zzBz5sz/ABCcBFFentLlAAAAAElFTkSuQmCC) right repeat-y;
}
`}),ace.define("ace/theme/monokai",["require","exports","module","ace/theme/monokai-css","ace/lib/dom"],function(r,l,v){l.isDark=!0,l.cssClass="ace-monokai",l.cssText=r("./monokai-css");var g=r("../lib/dom");g.importCssString(l.cssText,l.cssClass,!1)}),function(){ace.require(["ace/theme/monokai"],function(r){V&&(V.exports=r)})}()})(Fe);const $e={key:0},Ue={class:"btn-settings"},Ee=T({__name:"MediaCategory",setup(V){const h=N.useToast(),r=b(""),l=b(!0),v=ne({useWorker:!0,enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!0,showPrintMargin:!1,highlightActiveLine:!0,highlightSelectedWord:!0,tabSize:2,fontSize:14,wrap:!1,readonly:!1});async function g(){l.value=!1;try{const t=await A.get("/media/get_category_config");r.value=t,l.value=!1}catch(t){console.error("Error fetching sync config:",t)}}async function u(){try{const t=await A.post("/media/save_category_config",{settings:r.value});t.success?h.success(t.message):h.error(t.message)}catch(t){console.error("Error fetching  saveConfig:",t)}}return H(()=>{g()}),(t,s)=>{const i=O("VAceEditor");return l.value?Q("",!0):(L(),W("div",$e,[e(i,{value:r.value,"onUpdate:value":s[0]||(s[0]=f=>r.value=f),lang:"yaml",theme:"monokai",options:v,class:"vue-ace-editor mx-5"},null,8,["value","options"]),x("div",Ue,[e(S,{onClick:u},{default:a(()=>s[1]||(s[1]=[U("保存")])),_:1})])]))}}}),Se=K(Ee,[["__scopeId","data-v-19ff61de"]]),Le={key:0},We={class:"btn-settings"},Me={class:"btn-settings"},Te={class:"btn-settings"},Be=T({__name:"CustomWords",setup(V){const h=N.useToast(),r=b(!0),l=b({replace_words:"",release_group:"",exclude_words:""});async function v(){try{const u=await A.get("/system/settings/custom_words");l.value=u,console.log(l.value),r.value=!1}catch(u){console.error("Error fetching sync config:",u)}}async function g(){try{let u={settings:l.value,name:"custom_words"};const t=await A.post("/system/save_settings",u);t.success?h.success(t.message):h.error(t.message)}catch(u){console.error("Error fetching  saveConfig:",u)}}return H(()=>{v()}),(u,t)=>r.value?Q("",!0):(L(),W("div",Le,[e(P,null,{default:a(()=>[e(C,{cols:"12"},{default:a(()=>[e($,{title:"自定义识别词",subtitle:"整理时先进行预处理以加强识别效果"},{default:a(()=>[e(M,null,{default:a(()=>[e(D,{modelValue:l.value.replace_words,"onUpdate:modelValue":t[0]||(t[0]=s=>l.value.replace_words=s),hint:"支持正则表达式，特殊字符需要\\转义，一行为一组",placeholder:"支持正则表达式，特殊字符需要\\转义，一行为一组","persistent-hint":"","auto-grow":"",outlined:""},null,8,["modelValue"])]),_:1}),e(M,null,{default:a(()=>[e(oe,{type:"info",variant:"tonal",title:"支持的配置格式（注意空格）："},{default:a(()=>t[3]||(t[3]=[x("span",{innerHTML:`
              屏蔽词<br>
              被替换词 => 替换词
              `},null,-1)])),_:1})]),_:1}),x("div",We,[e(S,{onClick:g},{default:a(()=>t[4]||(t[4]=[U("保存")])),_:1})])]),_:1})]),_:1}),e(C,{cols:"12"},{default:a(()=>[e($,{title:"自定义制作组",subtitle:"目录名或文件名中包含屏蔽词时不进行整理"},{default:a(()=>[e(M,null,{default:a(()=>[e(D,{modelValue:l.value.replace_words,"onUpdate:modelValue":t[1]||(t[1]=s=>l.value.replace_words=s),hint:"支持正则表达式，特殊字符需要\\转义，一行为一组",placeholder:"支持正则表达式，特殊字符需要\\转义，一行为一组","persistent-hint":"","auto-grow":"",outlined:""},null,8,["modelValue"])]),_:1}),x("div",Me,[e(S,{onClick:g},{default:a(()=>t[5]||(t[5]=[U("保存")])),_:1})])]),_:1})]),_:1}),e(C,{cols:"12"},{default:a(()=>[e($,{title:"整理屏蔽词",subtitle:"目录名或文件名中包含屏蔽词时不进行整理"},{default:a(()=>[e(M,null,{default:a(()=>[e(D,{modelValue:l.value.replace_words,"onUpdate:modelValue":t[2]||(t[2]=s=>l.value.replace_words=s),hint:"支持正则表达式，特殊字符需要\\转义，一行为一组",placeholder:"支持正则表达式，特殊字符需要\\转义，一行为一组","persistent-hint":"","auto-grow":"",outlined:""},null,8,["modelValue"])]),_:1}),x("div",Te,[e(S,{onClick:g},{default:a(()=>t[6]||(t[6]=[U("保存")])),_:1})])]),_:1})]),_:1})]),_:1})]))}}),Ie=T({__name:"file_transfer",setup(V){const h=re(),r=b(h.query.tab),l=[{tab:"transfer_watcher",icon:"mdi-cloud-sync-outline",title:"同步配置"},{tab:"directory",icon:"mdi-folder-outline",title:"目录配置"},{tab:"media_config",icon:"mdi-cog-outline",title:"刮削选项"},{tab:"media_category",icon:"mdi-format-list-bulleted",title:"二级分类"},{tab:"custom_words",icon:"mdi-file-word-box",title:"词表"}];function v(g){fe.push("/file_transfer?tab="+g)}return(g,u)=>(L(),W("div",null,[e(le,{modelValue:r.value,"onUpdate:modelValue":u[0]||(u[0]=t=>r.value=t),"show-arrows":"",class:"v-tabs-pill"},{default:a(()=>[(L(),W(se,null,ce(l,t=>e(de,{key:t.icon,value:t.tab,"selected-class":"v-slide-group-item--active v-tab--selected",onClick:s=>v(t.tab)},{default:a(()=>[x("div",null,[e(F,{size:"20",start:"",icon:t.icon},null,8,["icon"]),U(" "+ue(t.title),1)])]),_:2},1032,["value","onClick"])),64))]),_:1},8,["modelValue"]),e(ie,{modelValue:r.value,"onUpdate:modelValue":u[1]||(u[1]=t=>r.value=t),class:"mt-5 disable-tab-transition",touch:!1},{default:a(()=>[e(I,{value:"transfer_watcher"},{default:a(()=>[e(R,{name:"fade-slide",appear:""},{default:a(()=>[e(Ae)]),_:1})]),_:1}),e(I,{value:"directory"},{default:a(()=>[e(R,{name:"fade-slide",appear:""},{default:a(()=>[e(ve)]),_:1})]),_:1}),e(I,{value:"media_config"},{default:a(()=>[e(R,{name:"fade-slide",appear:""},{default:a(()=>[e(ye)]),_:1})]),_:1}),e(I,{value:"media_category"},{default:a(()=>[e(R,{name:"fade-slide",appear:""},{default:a(()=>[e(Se)]),_:1})]),_:1}),e(I,{value:"custom_words"},{default:a(()=>[e(R,{name:"fade-slide",appear:""},{default:a(()=>[e(Be)]),_:1})]),_:1})]),_:1},8,["modelValue"])]))}}),De=K(Ie,[["__scopeId","data-v-2a6fffc5"]]);export{De as default};
