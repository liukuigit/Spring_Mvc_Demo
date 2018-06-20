/// <reference name="MicrosoftAjax.js"/>
//-----------------------------使用js脚本设置cookie-----------------------
function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
var Days = 100; //此 cookie 将被保存 30 天
var exp   = new Date(); //new Date("December 31, 9998");
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}
//-----------------------------使用js脚本设置cookie结束-------------------
//-----------------------------使用js脚本读取cookie-----------------------
function getCookie(name)//取cookies函数       
{
var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;

}
//-----------------------------使用js脚本读取cookie结束-------------------
//-----------------------------使用js脚本删除cookie-----------------------
function delCookie(name)//删除cookie
{
//return;
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//-----------------------------使用js脚本删除cookie结束-------------------

 
  //将数字转变为用千分符分割的字符串
  function FormatCash(no) {
            no = no+"";    
            var str = String.format("{0:C}", Number.parseInvariant(no))
            var headlength=1;
            var ss = str.substr(headlength, str.length - headlength);            
            return ss;
        }      
        