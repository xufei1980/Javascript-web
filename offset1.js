/**
 * Created by Administrator on 17-4-4.
 */
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