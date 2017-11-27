/**
 * Created by think on 2017/11/27.
 */
Function.prototype.myBind=function myBind(context) {
     var _this=this;
     var outerArg=Array.prototype.slice.call(arguments,1);
     if("bind" in Function.prototype){
         return this.bind.apply(this,[context].concat(outerArg));
     }
    return function () {
        var innerArg=Array.prototype.splice.call(arguments,0);
        innerArg.length===0?innerArg[0]=window.event:null;
        _this.apply(context,outerArg.concat(innerArg));
    }
}