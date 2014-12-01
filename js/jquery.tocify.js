!function(t){"use strict";t(window.jQuery,window,document)}(function(t,e,s){"use strict";var i="tocify",o="tocify-focus",n="tocify-hover",a="tocify-hide",l="tocify-header",r="."+l,h="tocify-subheader",d="."+h,c="tocify-item",f="."+c,u="tocify-extend-page",p="."+u;t.widget("toc.tocify",{version:"1.9.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var s=this;s.extendPageScroll=!0,s.items=[],s._generateToc(),s._addCSSClasses(),s.webkit=function(){for(var t in e)if(t&&-1!==t.toLowerCase().indexOf("webkit"))return!0;return!1}(),s._setEventHandlers(),t(e).load(function(){s._setActiveElement(!0),t("html, body").promise().done(function(){setTimeout(function(){s.extendPageScroll=!1},0)})})},_generateToc:function(){var e,s,o=this,n=o.options.ignoreSelector;return e=t(this.options.context).find(-1!==this.options.selectors.indexOf(",")?this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(",")):this.options.selectors.replace(/ /g,"")),e.length?(o.element.addClass(i),void e.each(function(e){t(this).is(n)||(s=t("<ul/>",{id:l+e,"class":l}).append(o._nestElements(t(this),e)),o.element.append(s),t(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===t(this).find(o.options.selectors).length?t(this).filter(o.options.selectors).each(function(){t(this).is(n)||o._appendSubheaders.call(this,o,s)}):t(this).find(o.options.selectors).each(function(){t(this).is(n)||o._appendSubheaders.call(this,o,s)})}))})):void o.element.addClass(a)},_setActiveElement:function(t){var s=this,i=e.location.hash.substring(1),o=s.element.find('li[data-unique="'+i+'"]');return i.length?(s.element.find("."+s.focusClass).removeClass(s.focusClass),o.addClass(s.focusClass),s.options.showAndHide&&o.click()):(s.element.find("."+s.focusClass).removeClass(s.focusClass),!i.length&&t&&s.options.highlightDefault&&s.element.find(f).first().addClass(s.focusClass)),s},_nestElements:function(e,s){var i,o,n;return i=t.grep(this.items,function(t){return t===e.text()}),this.items.push(i.length?e.text()+s:e.text()),n=this._generateHashValue(i,e,s),o=t("<li/>",{"class":c,"data-unique":n}),"bootstrap3"!==this.options.theme?o.append(t("<a/>",{text:e.text().length>12?e.text().substr(0,12)+"...":e.text()})):o.text(e.text().length>12?e.text().substr(0,12)+"...":e.text()),e.before(t("<div/>",{name:n,"data-unique":n})),o},_generateHashValue:function(t,e,s){var i="",o=this.options.hashGenerator;if("pretty"===o){for(i=e.text().toLowerCase().replace(/\s/g,"-");i.indexOf("--")>-1;)i=i.replace(/--/g,"-");for(;i.indexOf(":-")>-1;)i=i.replace(/:-/g,"-")}else i="function"==typeof o?o(e.text(),e):e.text().replace(/\s/g,"");return t.length&&(i+=""+s),i},_appendSubheaders:function(e,s){var i=t(this).index(e.options.selectors),o=t(e.options.selectors).eq(i-1),n=+t(this).prop("tagName").charAt(1),a=+o.prop("tagName").charAt(1);a>n?e.element.find(d+"[data-tag="+n+"]").last().append(e._nestElements(t(this),i)):n===a?s.find(f).last().after(e._nestElements(t(this),i)):s.find(f).last().after(t("<ul/>",{"class":h,"data-tag":n})).next(d).append(e._nestElements(t(this),i))},_setEventHandlers:function(){var i=this;this.element.on("click.tocify","li",function(){if(i.options.history&&(e.location.hash=t(this).attr("data-unique")),i.element.find("."+i.focusClass).removeClass(i.focusClass),t(this).addClass(i.focusClass),i.options.showAndHide){var s=t('li[data-unique="'+t(this).attr("data-unique")+'"]');i._triggerShow(s)}i._scrollTo(t(this))}),this.element.find("li").on({"mouseenter.tocify":function(){t(this).addClass(i.hoverClass),t(this).css("cursor","pointer")},"mouseleave.tocify":function(){"bootstrap"!==i.options.theme&&t(this).removeClass(i.hoverClass)}}),(i.options.extendPage||i.options.highlightOnScroll||i.options.scrollHistory||i.options.showAndHideOnScroll)&&t(e).on("scroll.tocify",function(){t("html, body").promise().done(function(){var o,n,a,l,r=t(e).scrollTop(),h=t(e).height(),d=t(s).height(),c=t("body")[0].scrollHeight;if(i.options.extendPage&&(i.webkit&&r>=c-h-i.options.extendPageOffset||!i.webkit&&h+r>d-i.options.extendPageOffset)&&!t(p).length){if(n=t('div[data-unique="'+t(f).last().attr("data-unique")+'"]'),!n.length)return;a=n.offset().top,t(i.options.context).append(t("<div />",{"class":u,height:"50px","data-unique":u})),i.extendPageScroll&&(l=i.element.find("li.active"),i._scrollTo(t('div[data-unique="'+l.attr("data-unique")+'"]')))}setTimeout(function(){var s,n=null,a=null,l=t(i.options.context).find("div[data-unique]");l.each(function(e){var s=Math.abs((t(this).next().length?t(this).next():t(this)).offset().top-r-i.options.highlightOffset);return null==n||n>s?(n=s,void(a=e)):!1}),s=t(l[a]).attr("data-unique"),o=t('li[data-unique="'+s+'"]'),i.options.highlightOnScroll&&o.length&&(i.element.find("."+i.focusClass).removeClass(i.focusClass),o.addClass(i.focusClass)),i.options.scrollHistory&&e.location.hash!=="#"+s&&e.location.replace("#"+s),i.options.showAndHideOnScroll&&i.options.showAndHide&&i._triggerShow(o,!0)},0)})})},show:function(e){var s=this;if(!e.is(":visible"))switch(e.find(d).length||e.parent().is(r)||e.parent().is(":visible")?e.children(d).length||e.parent().is(r)||(e=e.closest(d)):e=e.parents(d).add(e),s.options.showEffect){case"none":e.show();break;case"show":e.show(s.options.showEffectSpeed);break;case"slideDown":e.slideDown(s.options.showEffectSpeed);break;case"fadeIn":e.fadeIn(s.options.showEffectSpeed);break;default:e.show()}return s.hide(t(d).not(e.parent().is(r)?e:e.closest(r).find(d).not(e.siblings()))),s},hide:function(t){var e=this;switch(e.options.hideEffect){case"none":t.hide();break;case"hide":t.hide(e.options.hideEffectSpeed);break;case"slideUp":t.slideUp(e.options.hideEffectSpeed);break;case"fadeOut":t.fadeOut(e.options.hideEffectSpeed);break;default:t.hide()}return e},_triggerShow:function(t,e){var s=this;return t.parent().is(r)||t.next().is(d)?s.show(t.next(d),e):t.parent().is(d)&&s.show(t.parent(),e),s},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(r+","+d).addClass("nav nav-list"),this.focusClass="active"):"bootstrap3"===this.options.theme?(this.element.find(r+","+d).addClass("list-group"),this.element.find(f).addClass("list-group-item"),this.focusClass="active"):(this.focusClass=o,this.hoverClass=n),this},setOption:function(){t.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){t.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(e){var s=this,i=s.options.smoothScroll||0,o=s.options.scrollTo,n=t('div[data-unique="'+e.attr("data-unique")+'"]');return n.length?(t("html, body").promise().done(function(){t("html, body").animate({scrollTop:n.offset().top-(t.isFunction(o)?o.call():o)+"px"},{duration:i})}),s):s}})});