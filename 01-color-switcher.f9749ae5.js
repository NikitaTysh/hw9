const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),a=document.querySelector("button[data-stop]");let r;function n(a){"data-start"===a.target.attributes[1].name?(r=setInterval((()=>{t.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.setAttribute("disabled","")):"data-stop"===a.target.attributes[1].name&&(e.removeAttribute("disabled"),clearInterval(r))}e.addEventListener("click",n),a.addEventListener("click",n);
//# sourceMappingURL=01-color-switcher.f9749ae5.js.map