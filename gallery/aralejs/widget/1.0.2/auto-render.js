define("auto-render",["$"],function(e,t){var n=e("$"),r="data-widget-auto-rendered";t.autoRender=function(e){return(new this(e)).render()},t.autoRenderAll=function(e,i){typeof e=="function"&&(i=e,e=null),e=n(e||document.body);var s=[],o=[];e.find("[data-widget]").each(function(e,n){t.isDataApiOff(n)||(s.push(n.getAttribute("data-widget").toLowerCase()),o.push(n))}),s.length&&seajs.use(s,function(){for(var e=0;e<arguments.length;e++){var t=arguments[e],s=n(o[e]);if(s.attr(r))continue;t.autoRender&&t.autoRender({element:s,renderType:"auto"}),s.attr(r,"true")}i&&i()})};var i=n(document.body).attr("data-api")==="off";t.isDataApiOff=function(e){var t=n(e).attr("data-api");return t==="off"||t!=="on"&&i}});