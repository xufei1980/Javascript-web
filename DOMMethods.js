/**
 * Created by Bill on 2017/4/10.
 */
var DOMmethods = (function () {
    var flag = !/MSIE (6|7|8)/i.test(navigator.userAgent);

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
    return {
        children:children,
        prev: prev,
        next: next,
        prevAll:prevAll,
        nextAll:nextAll,
        sibling:sibling,
        siblings:siblings,
        index:index,
        firstChild:firstChild,
        lastChild:lastChild
    }


})();
