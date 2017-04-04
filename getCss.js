/**
 * Created by Administrator on 17-4-4.
 */
function getCss(curEle,attr) {
    var val=null,reg=null;
    if ("getComputedStyle" in window){
        val=window.getComputedStyle(curEle,null)[attr];
    }else{
      //IE6-8
        if(attr==="opacity"){
            val=curEle.currentStyle["filter"];
            reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
            val=reg.test(val)?reg.exec(val)[1]/100:1

        }else
        {
            val=curEle.currentStyle[attr];
        }
    }
      reg=/^-?\d+(\.\d+)?(px|em|pt|rem)?$/i;
      if(reg.test(val)){
          return parseFloat(val);
      }else{
          return val;
      }

}
