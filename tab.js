/**
 * Created by Administrator on 17-2-19.
 */

var oTab=document.getElementById("tab");
var oLis=oTab.getElementsByTagName("li");
var oDivs=oTab.getElementsByTagName("div");
function  tabChange(nIndex) {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = "";
        oDivs[i].className = "";

    }
    oLis[nIndex].className = "select";
    oDivs[nIndex].className = "select";
}
    for(var i=0;i<oLis.length;i++){
        oLis[i].innn=i
        oLis[i].onmouseover=function () {
            tabChange(this.innn);

        }
    }


