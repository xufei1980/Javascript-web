/**
 * Created by Bill on 2017/4/16.
 */
/**
 * Created by Bill on 2017/4/10.
 */
var utils = (function () {
    var flag = !/MSIE (6|7|8)/i.test(navigator.userAgent);
    function listToArray(likeAry) {
        var ary=[];
        try{
            ary=Array.prototype.slice.call(likeAry);
        }catch (e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length]=likeAry[i];
            }
        }
        return ary;
    }
    function jasonParse(str) {
        try{
            JSON.parse(str);
        }catch (e){
            eval("("+str+")");
        }

    }
    function win(attr,value) {
        if(typeof value ==="undefined"){
            return document.documentElement[attr]||
                    document.body[attr];
        }else {
            document.documentElement[attr]=value;
            document.body[attr]=value;
        }

    }
    function offset(curEle) {
        var totalLeft=0,totalTop=0,par=curEle.offsetParent;
        totalLeft+=curEle.offsetLeft;
        totalTop+=curEle.offsetTop;
        while (par){
            if(navigator.userAgent.indexOf("MSIE 8.0")===-1){
                totalLeft+=curEle.clientLeft;
                totalTop+=curEle.clientTop;
            }
            totalLeft+=par.offsetLeft;
            totalTop+=par.offsetTop;
            par=par.offsetParent;
        }
        return {left:totalLeft,top:totalTop};
    }
    function children(curEle,tagName) {
        var ary=[];
        if(!flag) {
            var nodeList = curEle.childNodes;
            for (i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                if (curNode.nodeType === 1) {
                    ary[ary.length] = curNode;
                }

            }
        }else{
            ary=Array.prototype.slice.call(curEle.children);
        }
        if(typeof tagName==="string"){
            for(k=0;k<ary.length;k++){
                var curEleNode=ary[k];
                if(curEleNode.nodeName.toLowerCase()!==tagName.toLowerCase()){
                    ary.splice(k,1);
                    k--;
                }
            }
        }
        return ary;
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        } else {
            var pre = curEle.previousSibling;

            while (pre && pre.nodeType !== 1) {
                pre = pre.previousSibling;
            }
            return pre;
        }

    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var next = curEle.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    }

    function prevAll(curEle) {
        var ary=[];
        var pre=this.prev(curEle);
        while(pre){
            ary.unshift(pre);
            pre=this.prev(pre);
        }
        return ary;
    }

    function nextAll(curEle) {
        var ary=[];
        var next=this.next(curEle);
        while(next){
            ary.push(next);
            next=this.next(next);
        }
        return ary;

    }
    function sibling(curEle) {
        var pre=this.prev(curEle);
        var next=this.next(curEle);
        var ary=[];
        pre?ary.push(pre):null;
        next?ary.push(next):null;
        return ary;

    }

    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));

    }

    function index(curEle) {
        return this.prevAll(curEle).length;

    }
    function firstChild(curEle) {
        var chen=this.children(curEle);
        return chen.length>0?chen[0]:null;

    }

    function lastChild(curEle) {
        var chen=this.children(curEle);
        return chen.length>0?chen[chen.length-1]:null;
    }
    function append(newEle,container) {
        container.appendChild(newEle);

    }
    function prepend(newEle,container) {
        var fir=this.firstChild(container);
        if(fir){
            container.insertBefore(newEle,fir);
            return;
        }
        container.appendChild(newEle);

    }
    function insertBefore(newEle,oldEle) {
        oldEle.parentNode.insertBefore(newEle,oldEle);

    }
    function insertAfter(newEle,oldEle) {
        var nex=this.next(oldEle);
        if(nex){
            oldEle.parentNode.insertBefore(newEle,nex);
            return;
        }
        oldEle.parentNode.appendChild(newEle);

    }
    function hasClass(curEle,className) {
        var reg=new RegExp("(^| +)"+className+"( +|$)","g");
        return reg.test(curEle.className);
    }
    function addClass(curEle,className) {
        var ary=className.split(/ +/g);
        for(var i=0;i<ary.length;i++){
            var curName=ary[i];
            if(!this.hasClass(curEle,curName)){
                curEle.className+=" "+curName;
            }
            else {
                console.log(curName+" has already exist");
            }
        }

    }

    function removeClass(curEle,className) {
        var ary=className.split(/ +/g);
        for(var i=0;i<ary.length;i++) {
            var curName = ary[i];
            var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
            if (this.hasClass(curEle, curName)) {
                curEle.className = curEle.className.replace(reg, " ");

            }
        }
    }

    function getElementsByClass(strClass,context) {
        context=context||document;
        if(flag){
            var olist=context.getElementsByClassName(strClass);
            return Array.prototype.slice.call(olist);
        }
        var ary=[];
        var strClassAry=strClass.replace(/(^ +)|( +$)/g,"").split(/ +/g);
        var nodeList=context.getElementsByTagName("*");
        for(var i=0,len=nodeList.length;i<len;i++){
            var curNode=nodeList[i];
            var isOk=true;
            for(var j=0;j<strClassAry.length;j++){
                var curName=strClassAry[j];
                var reg=new RegExp("(^| +)"+curName+"( +|$)");
                if(!reg.test(curNode.className)){
                    isOk=false;
                    break;
                }

            }
            if(isOk){
                ary[ary.length]=curNode; }
        }
        return ary;

    }
    function getCss(attr) {
        var val=null,reg=null;
        if ("getComputedStyle" in window){
            val=window.getComputedStyle(this,null)[attr];
        }else{
            //IE6-8
            if(attr==="opacity"){
                val=this.currentStyle["filter"];
                reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                val=reg.test(val)?reg.exec(val)[1]/100:1

            }else
            {
                val=this.currentStyle[attr];
            }
        }
        reg=/^-?\d+(\.\d+)?(px|em|pt|rem)?$/i;
        if(reg.test(val)){
            return parseFloat(val);
        }else{
            return val;
        }

    }
    function setCss(attr,value) {
        var reg=/^(width|height|top|bottom|left|right|((margin|padding)|(Top|Bottom|Left|Right)?))$/;
        if(reg.test(attr)){
            if(!isNaN(value)){
                value+="px";
            }
            this["style"][attr]=value;
        }
        if(attr==="opacity"){
            this["style"]["opacity"]=value;
            this["style"]["filter"]="alpha(opacity="+value*100+")";
            return;
        }
        if(attr==="float"){
            this["style"]["cssFloat"]=value;
            this["style"]["styleFloat"]=value;
            return;
        }
        this["style"][attr]=value;
    }
    function setGroupCss(options) {
        // options=options||0;
        // if(options.toString()!=="[object Object]"){
        //     return;
        // }
        for(var key in options){
            //attr:key value:options[key]
            if(options.hasOwnProperty(key)){
               setCss.call(this,key,options[key]);
            }
        }

    }

    function css(curEle) {
        var ary=Array.prototype.slice.call(arguments,1);
        var argTwo=arguments[1];
        if(typeof argTwo==="string") {
            var argThree = arguments[2];
            if (typeof argThree === "undefined") {
                return getCss.apply(curEle, ary);
            } else {
                return setCss.apply(curEle, ary);
            }
        }
        argTwo=argTwo||0;
        if(argTwo.toString()==="[object Object]"){
            return setGroupCss.apply(curEle,ary);
        }
    }
    return {
        listToArray:listToArray,
        jasonParse:jasonParse,
        win:win,
        offset:offset,
        children:children,
        prev: prev,
        next: next,
        prevAll:prevAll,
        nextAll:nextAll,
        sibling:sibling,
        siblings:siblings,
        index:index,
        firstChild:firstChild,
        lastChild:lastChild,
        append:append,
        prepend:prepend,
        insertBefore:insertBefore,
        insertAfter:insertAfter,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        getElementsByClass:getElementsByClass,
        css:css

    }


})();

