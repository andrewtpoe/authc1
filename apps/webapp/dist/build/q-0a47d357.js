import{f as u,V as d,G as s,_ as i,e as c,d as t,K as n,p as m}from"./q-0edf180f.js";const g=()=>{const[l]=u();l.value=!l.value},b=d(s(()=>i(()=>import("./q-877ee4f3.js"),["build/q-877ee4f3.js","build/q-0edf180f.js"]),"s_pCwS02AANnM")),y=l=>{const a=c(!1);return t("div",null,{class:"relative inline-block text-left"},[t("button",null,{type:"button",class:"inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",id:"menu-button","aria-expanded":n(e=>e.value,[a]),"aria-haspopup":"true",onClick$:s(()=>i(()=>Promise.resolve().then(()=>o),void 0),"s_1amCZXHO3j8",[a])},[m(b,null,3,"13_0"),t("span",null,{class:"truncate max-w-[100px]"},n(e=>e.userName,[l]),3,null),t("svg",null,{class:"-mr-1 h-5 w-5 text-primary",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},t("path",null,{"fill-rule":"evenodd",d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z","clip-rule":"evenodd"},null,3,null),3,null)],1,null),t("div",{class:`absolute right-0 mt-2 w-56 origin-top-right rounded-md dark:bg-cyan-950 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ${a.value?"ease-out duration-100 transform opacity-100 scale-100 z-10":"ease-in duration-75 transform opacity-0 scale-95 -z-10"}`},{role:"menu","aria-orientation":"vertical","aria-labelledby":"menu-button"},t("div",null,{role:"none"},[t("div",null,{class:"py-3 px-5 bg-primary bg-opacity-20 rounded-t-lg"},[t("p",null,{class:"text-sm text-gray-500 dark:text-gray-400"},"Signed in as",3,null),t("p",null,{class:"text-sm font-medium text-primary truncate"},n(e=>e.email,[l]),3,null)],3,null),t("div",null,{class:"mb-2 mt-2"},[l.options.map((e,r)=>t("a",{href:e==null?void 0:e.href,id:`menu-item-${r}`},{class:"text-zinc-800 dark:text-zinc-200 block px-4 py-2 text-sm font-medium hover:bg-primary hover:bg-opacity-10",role:"menuitem"},e==null?void 0:e.label,1,e==null?void 0:e.href)),t("button",null,{class:"text-gray-500 dark:text-gray-400 block px-4 py-2 text-sm font-medium hover:bg-primary hover:bg-opacity-10 text-left w-full",onClick$:s(()=>i(()=>Promise.resolve().then(()=>o),void 0),"s_wgGgWIOTN8k",[l])},"Logout",3,null)],1,null)],1,null),1,null)],1,"13_1")};function x(l,a){const e=document.createElement("div");e.classList.add("fixed","bottom-0","right-0","m-4","p-4","rounded-md","text-secondary","font-semibold","text-base","z-50"),a==="success"?e.classList.add("bg-green-200"):a==="error"?e.classList.add("bg-red-200"):e.classList.add("bg-gray-200");const r=document.createTextNode(l);e.appendChild(r),document.body.appendChild(e),setTimeout(()=>{e.remove()},5e3)}const _=async()=>{const[l]=u();try{await l.logoutAction.submit()}catch{x("Error while logging out!","error")}},o=Object.freeze(Object.defineProperty({__proto__:null,s_1amCZXHO3j8:g,s_4BMRT0W6yJk:y,s_wgGgWIOTN8k:_},Symbol.toStringTag,{value:"Module"}));export{g as s_1amCZXHO3j8,y as s_4BMRT0W6yJk,_ as s_wgGgWIOTN8k};