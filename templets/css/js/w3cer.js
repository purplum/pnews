/*源码真心不好看啊 ~囧~ */
/*记住我们吧！97站长网 - www.97zzw.com*/
$(document).ready(function() {
jQuery.jqtab = function(tabtit,tabcon) {
$(tabcon).hide();
$(tabtit+" li:first").addClass("thistab").show(); 
$(tabcon+":first").show();
$(tabtit+" li").click(function() {
$(tabtit+" li").removeClass("thistab");
$(this).addClass("thistab"); 
$(tabcon).hide(); 
var activeTab = $(this).find("a").attr("tab"); 
$("#"+activeTab).fadeIn(); 
return false;
});

};
$.jqtab("#tabs",".tab_con");
$.jqtab("#tabss",".tab_cons");
});

//cookie读写脚本
document.writeln("<script type=\"text/javascript\" >BAIDU_CLB_SLOT_ID = \"748531\";</script>");
document.writeln("<script type=\"text/javascript\" src=\"http://cbjs.baidu.com/js/o.js\"></script>");

function GetCookieVal(offset)
{
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}

function SetCookie(name, value)
{
var expires = new Date();
expires.setTime(expires.getTime() + 12 * 30 * 24 * 60 * 60 * 1000);
document.cookie = name + "=" + value + ";expires=" + expires.toGMTString();
}

function DelCookie(name)
{
var exp = new Date();
exp.setTime (exp.getTime() - 1);
var cval = GetCookie (name);
document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}

function GetCookie(name)
{
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen)
{
var j = i + alen;
if (document.cookie.substring(i, j) == arg)
return GetCookieVal (j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break;
}
return null;
}


//工具栏
var tfs=GetCookie('bookfs');
var tbg=GetCookie('bookbg');
var tfc=GetCookie('bookfc');
if (tfs != null){
document.write ('<style type="text/css">');
document.write ('#a_fontsize {font-size: '+tfs+'px; }');
document.write ('</style>');
}
if (tbg != null){
document.write ('<style type="text/css">');
document.write ('#a_fontsize {  background-color: '+tbg+' }');
document.write ('</style>');
}
if(tfc != null)
{
document.write('<style type="text/css">');
document.write('#a_fontsize {color:'+tfc+'}');
document.write ('</style>');
}


function setfs(id){
document.getElementById('a_fontsize').style.fontSize=id+"px";
SetCookie('bookfs',id);
}

function setbg(id){
document.getElementById('a_fontsize').style.backgroundColor=id;
SetCookie('bookbg',id);
}

function setfc(id)
{
document.getElementById('a_fontsize').style.color = id;
SetCookie('bookfc',id);
}

jQuery(document).ready(
function($){
$("img").lazyload({
placeholder : "../images/reload.gif",
effect      : "fadeIn"
});
});
window.onload = function ()
{
var aInput = document.getElementById("search-keyword");
var oBtn = document.getElementById("search-submit");
oBtn.onclick=function(){
if(aInput.value==""){
alert("别忘了输入关键字哦")
aInput.focus();
return false;
}
}

};
var TINY = {};
function getTagID(i) {
return document.getElementById(i)
}
function getTagName(e, p) {
p = p || document;
return p.getElementsByTagName(e)
}
TINY.slideshow = function(n) {
this.infoSpeed = this.imgSpeed = this.speed = 10;
this.thumbOpacity = this.navHover = 50;
this.navOpacity = 0;
this.scrollSpeed = 5;
this.letterbox = '#000';
this.n = n;
this.c = 0;
this.a = [];
};
TINY.slideshow.prototype = {
init: function(s, z, b, f, q) {
s = getTagID(s);
var m = getTagName('li', s),
i = 0,
w = 0;
this.l = m.length;
this.q = getTagID(q);
this.f = getTagID(z);
this.r = getTagID(this.info);
this.o = parseInt(TINY.style.val(z, 'width'));
this.p = getTagID(this.thumbs);
if (this.left && this.right) {
var u = getTagID(this.left),
r = getTagID(this.right);
u.onmouseover = new Function('TINY.scroll.init("' + this.thumbs + '",-1,' + this.scrollSpeed + ')');
u.onmouseout = r.onmouseout = new Function('TINY.scroll.cl("' + this.thumbs + '")');
r.onmouseover = new Function('TINY.scroll.init("' + this.thumbs + '",1,' + this.scrollSpeed + ')');
}
for (i; i < this.l; i++) {
this.a[i] = {};
var h = m[i],
a = this.a[i];
a.t = getTagName('h3', h)[0].innerHTML;
a.l = getTagName('a', h)[0] ? getTagName('a', h)[0].href: '';
a.p = getTagName('span', h)[0].innerHTML;
if (this.thumbs) {
if(this.numClass){
var pbox = document.createElement("p");
pbox.innerHTML = (i+1);
var imgbox = "<span>" + pbox.innerHTML + "</span>";
}
else{
var pbox = getTagName('p', h)[0];
var g = getTagName('img', h)[0];
var imgbox = "<span>" + g.parentNode.innerHTML + "</span>";

}
this.p.appendChild(pbox);
w += parseInt(pbox.offsetWidth);
if (i != this.l - 1) {
pbox.style.marginRight = this.spacing + 'px';
w += this.spacing
}
if (this.left && this.right) this.p.style.width = w + 'px';
if(i != 0 && this.numClass){
pbox.onclick = new Function(this.n + '.pr(' + i + ',1)');
}
else if(i != 0){
g.style.opacity = this.thumbOpacity / 100;
g.style.filter = 'alpha(opacity=' + this.thumbOpacity + ')';
g.onmouseover = new Function('TINY.alpha.set(this,100,5)');
g.onmouseout = new Function('TINY.alpha.set(this,' + this.thumbOpacity + ',5)');
g.onclick = new Function(this.n + '.pr(' + i + ',1)');
}
else if(i == 0 && this.numClass){
pbox.onclick = new Function(this.n + '.pr(' + i + ',1)');
pbox.className=this.numClass;
}
else if(i == 0){
g.style.borderColor = this.active ? this.active : '';
g.style.opacity = this.thumbOpacity / 70;
g.style.filter = 'alpha(opacity=100)';
g.onmouseover = new Function('TINY.alpha.set(this,100,5)');
g.onmouseout = new Function('TINY.alpha.set(this,' + this.thumbOpacity + ',5)');
g.onclick = new Function(this.n + '.pr(' + i + ',1)');
}
}
}
if (b && f) {
b = getTagID(b);
f = getTagID(f);
b.style.opacity = f.style.opacity = this.navOpacity / 100;
b.style.filter = f.style.filter = 'alpha(opacity=' + this.navOpacity + ')';
b.onmouseover = f.onmouseover = new Function('TINY.alpha.set(this,' + this.navHover + ',5)');
b.onmouseout = f.onmouseout = new Function('TINY.alpha.set(this,' + this.navOpacity + ',5)');
b.onclick = new Function(this.n + '.mv(-1,1)');
f.onclick = new Function(this.n + '.mv(1,1)')
}
this.auto ? this.is(0, 0) : this.is(0, 1);
},
mv: function(d, c) {
var t = this.c + d;
this.c = t = t < 0 ? this.l - 1 : t > this.l - 1 ? 0 : t;
this.pr(t, c)

},
pr: function(t, c) {
var aa = this.numClass ? getTagName('p', this.p):getTagName('img', this.p);
clearTimeout(this.lt);
if (c) {
clearTimeout(this.at);
aa[t].onmouseover = new Function('TINY.alpha.set(this,100,5)');
aa[t].onmouseout = new Function('TINY.alpha.set(this,100,5)');
aa[t].style.borderColor = this.active ? this.active : '';
this.at = setTimeout(new Function(this.n + '.mv(1,0)'), this.speed * 1000)
}
this.c = t;
this.is(t, c);
if(this.numClass){
aa[t].className=this.numClass;
}
else{
aa[t].style.opacity = this.thumbOpacity / 70;
aa[t].style.filter = 'alpha(opacity=100)';
aa[t].style.borderColor = this.active ? this.active : '';
}
},
is: function(s, c) {
if (this.info && !this.sctollTex) {
TINY.height.set(this.r, 1, this.infoSpeed / 2, -1)
}
var i = new Image();
i.style.opacity = 0;
i.style.filter = 'alpha(opacity=0)';
this.i = i;
i.onload = new Function(this.n + '.le(' + s + ',' + c + ')');
i.src = this.a[s].p;
if (this.thumbs) {
var a = this.numClass ? getTagName('p', this.p) : getTagName('img', this.p),
l = a.length,
x = 0;
for (x; x < l; x++) {
if(x != s && this.numClass){
a[x].className=this.numCurClass;
a[x].style.filter='';
}
else if(x!=s){
a[x].style.borderColor = '';
a[x].style.opacity = this.thumbOpacity / 100;
a[x].style.filter = 'alpha(opacity=' + this.thumbOpacity + ')';
a[x].onmouseover = new Function('TINY.alpha.set(this,100,5)');
a[x].onmouseout = new Function('TINY.alpha.set(this,' + this.thumbOpacity + ',5)');
}
}
}
},
le: function(s, c) {
this.f.appendChild(this.i);
var w = this.o - parseInt(this.i.offsetWidth);
if (w > 0) {
var l = Math.floor(w / 2);
this.i.style.borderLeft = l + 'px solid ' + this.letterbox;
this.i.style.borderRight = (w - l) + 'px solid ' + this.letterbox
}
TINY.alpha.set(this.i, 100, this.imgSpeed);
var n = new Function(this.n + '.nf(' + s + ')');
this.lt = this.sctollTex ? setTimeout(n,0) : setTimeout(n, this.imgSpeed * 100);
if (!c) {
this.at = setTimeout(new Function(this.n + '.mv(1,0)'), this.speed * 1000)
}
if (this.a[s].l != '') {
this.q.onclick = new Function('window.open("' + this.a[s].l + '")');
this.q.onmouseover = new Function('this.className="' + this.link + '"');
this.q.onmouseout = new Function('this.className=""');
this.q.style.cursor = 'pointer'
} else {
this.q.onclick = this.q.onmouseover = null;
this.q.style.cursor = 'default'
}
var m = getTagName('img', this.f);
if (m.length > 2) {
this.f.removeChild(m[0])
}
},
nf: function(s) {
if (this.info) {
s = this.a[s];
getTagName('h3', this.r)[0].innerHTML = s.t;
if(this.sctollTex){
this.r.style.height = '25px';
}
else{
this.r.style.height = 'auto';
var h = parseInt(this.r.offsetHeight);	
this.r.style.height = 0;
TINY.height.set(this.r, h, this.infoSpeed, 0);
}
}
}
};
TINY.scroll = function() {
return {
init: function(e, d, s) {
e = typeof e == 'object' ? e: getTagID(e);
var p = e.style.left || TINY.style.val(e, 'left');
e.style.left = p;
var l = d == 1 ? parseInt(e.offsetWidth) - parseInt(e.parentNode.offsetWidth) : 0;
e.si = setInterval(function() {
TINY.scroll.mv(e, l, d, s)
},
20)
},
mv: function(e, l, d, s) {
var c = parseInt(e.style.left);
if (c == l) {
TINY.scroll.cl(e)
} else {
var i = Math.abs(l + c);
i = i < s ? i: s;
var n = c - i * d;
e.style.left = n + 'px'
}
},
cl: function(e) {
e = typeof e == 'object' ? e: getTagID(e);
clearInterval(e.si)
}
}
} ();
TINY.height = function() {
return {
set: function(e, h, s, d) {
e = typeof e == 'object' ? e: getTagID(e);
var oh = e.offsetHeight,
ho = e.style.height || TINY.style.val(e, 'height');
ho = oh - parseInt(ho);
var hd = oh - ho > h ? -1 : 1;
clearInterval(e.si);
e.si = setInterval(function() {
TINY.height.tw(e, h, ho, hd, s)
},
20)
},
tw: function(e, h, ho, hd, s) {
var oh = e.offsetHeight - ho;
if (oh == h) {
clearInterval(e.si)
} else {
if (oh != h) {
var h = Math.ceil(Math.abs(h - oh) / s) * hd;
e.style.height = ((oh + h) < 0 ? 0 : (oh + h)) + 'px'
}
}
}
}
} ();
TINY.alpha = function() {
return {
set: function(e, a, s) {
e = typeof e == 'object' ? e: getTagID(e);
var o = e.style.opacity || TINY.style.val(e, 'opacity'),
d = a > o * 100 ? 1 : -1;
e.style.opacity = o;
clearInterval(e.ai);
e.ai = setInterval(function() {
TINY.alpha.tw(e, a, d, s)
},
20)
},
tw: function(e, a, d, s) {
var o = Math.round(e.style.opacity * 100);
if (o == a) {
clearInterval(e.ai)
} else {
var n = o + Math.ceil(Math.abs(a - o) / s) * d;
e.style.opacity = n / 100;
e.style.filter = 'alpha(opacity=' + n + ')'
}
}
}
} ();
TINY.style = function() {
return {
val: function(e, p) {
e = typeof e == 'object' ? e: getTagID(e);
return e.currentStyle ? e.currentStyle[p] : document.defaultView.getComputedStyle(e, null).getPropertyValue(p)
}
}
} ();

$(function() {
$.fn.manhuatoTop = function(options) {
var defaults = {			
showHeight : 150,
speed : 1000
};
var options = $.extend(defaults,options);
$("body").prepend("<div id='totop'><a>我要上去</a></div>");
var $toTop = $(this);
var $top = $("#totop");
var $ta = $("#totop a");
$toTop.scroll(function(){
var scrolltop=$(this).scrollTop();		
if(scrolltop>=options.showHeight){				
$top.fadeIn();
}
else{
$top.fadeOut();
}
});	
$ta.hover(function(){ 		
$(this).addClass("cur");	
},function(){			
$(this).removeClass("cur");		
});	
$top.click(function(){
$("html,body").animate({scrollTop: 0}, options.speed);	
});
}
});

//ajax search
function lookup(inputString) { 
if(inputString.length == 0) { 
// Hide the suggestion box. 
$('#suggestions').hide(); 
} else { 
$.post("/plus/search_list.php", {queryString: ""+inputString+""}, function(data){ 
if(data.length >0) { 
$('#suggestions').show(); 
$('#autoSuggestionsList').html(data); 
} 
}); 
} 
} // lookup 

function fill(thisValue) { 
$('#inputString').val(thisValue); 
setTimeout("$('#suggestions').hide();", 200); 
} 

//killError
function killErrors() {
return true;
}
window.onerror = killErrors;

//weibo
function inset(code){
if (code=="weibo"){
document.writeln ('<iframe allowtransparency="" border="0" frameborder="0" height="22" marginheight="0" marginwidth="0" scrolling="no" src="http://widget.weibo.com/relationship/followbutton.php?width=200&amp;height=22&amp;uid=2472608300&amp;style=5&amp;btn=red&amp;dpc=1" style="width: 64px; height: 22px;" width="200"></iframe>');}
if(code=="qq"){
document.writeln('网页技术交流群：244262900')
}
}

/*$(document).ready(function(e) {			
	t = $('.rand').offset().top;
	mh = $('.article_article_left').height();
	fh = $('.rand').height();
	$(window).scroll(function(e){
		s = $(document).scrollTop();	
		if(s > t - 10){
			$('.rand').css('position','fixed');
			if(s + fh > mh){
				$('.rand').css('top',mh-s-fh+14+'px');	
			}				
		}else{
			$('.rand').css('position','');
		}
	})
});*/