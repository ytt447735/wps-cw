//↓下面参数需要手动配置（改引号里面的内容）
let Time = ["20:35","20:45","20:55","21:00"];//打卡的时间
let Value = ["参数1","参数2","参数3","参数4","参数4","参数5"];//提交的内容从第一个开始
let ShowHow = "打卡";//情况说明
//↑上面参数需要手动配置（改引号里面的内容）





console.clear();//清空控制台
let version = "2021-10-8 02:50:32";
console.log("当前版本编译时间：" + version);
window.onbeforeunload = function(){return'Reload?';}

console.log(Time,Value);

function GetInputValue(input,Value){
    let lastValue = input.value;
    input.value = Value;
    let event = new Event('input', { bubbles: true });
    event.simulated = true;
    let tracker = input._valueTracker;
    if (tracker) {
    tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
}
Date.prototype.format = function(fmt) {
     var o = {
        "M+" : this.getMonth()+1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),                   
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth()+3)/3),
        "S"  : this.getMilliseconds() 
    };
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt;
}
//↓计算刷新时间
let Timer = [];
for(let T of Time){
    var t = new Date('2021-10-05 ' + T + ':00');
    var t_s = t.getTime();
    t.setTime(t_s - 1000 * 60 * 1);//设置新时间比旧时间多一分钟
    Timer.push(t.format("hh:mm"));
}
//↑计算刷新时间
function setCookie (name, value){ 
    //name相当于key,value为转入的值
    var Days = 365;
    var expdate = new Date();   //初始化时间
    expdate.setTime(expdate.getTime() + Days*24*60*60*1000);   //时间单位毫秒
    document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";
}
function getCookie(c_name) {
	//这里的c_name为setCookie()中name的key值
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1){
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
                c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return ""
}
function RefreshPage(){
    var current = location.href;
    var fr4me = '<frameset cols=\'*\' onload="GetForm()" id=\'framesets\' name=\'framesets\'>\n<frame src=\'' + current + '\'/>';
    fr4me += '</frameset>';
    with (document) {
        write(fr4me);
        void(close())
    }
}
function GetForm(){
    var id0 =setInterval(function () {
        let Iframe = window.frames;
        if(Iframe.length>0){
            Iframe=Iframe[0];
            let input = Iframe.document.getElementsByClassName("pc-input_1NdI7  write-model-input_1I0_X");
            if(input.length>0){
                let box = Iframe.document.getElementsByClassName("src-clockin-pc-pages-ClockinWrite-component-ClockinWriteContainer-index__clockin-button");
                if(box.length==0){
                    console.log(1111111);
                    //console.clear();//清空控制台
                    RefreshPage();
                    clearInterval(id0);
                }
                if(box[0].className != "" && box[0].className!="src-clockin-pc-pages-ClockinWrite-component-ClockinWriteContainer-index__clockin-button"){
                    //console.clear();//清空控制台
                    console.log(2222222);
                    RefreshPage();
                    clearInterval(id0);
                }
                if(Iframe.document.getElementsByClassName("src-clockin-pc-pages-ClockinWrite-component-ClockinWriteContainer-index__explain-block").length>0){
                    //console.clear();//清空控制台
                    console.log(3333333);
                    RefreshPage();
                    clearInterval(id0);
                }
                console.log('当前是3:',new Date().format("yyyy-MM-dd hh:mm:ss"));
                //console.log(Iframe);
                //console.log(input);
                let i=0;
                for (let k of input){
                    GetInputValue(k,Value[i]);
                    i++;
                }
                box[0].click();
                let a = Iframe.document.getElementsByClassName('ant-input pc-input_1NdI7  src-common-components-pc-Textarea-index__left src-clockin-pc-pages-ClockinWrite-component-ClockinWriteContainer-index__explain-write-input');
                if(a.length > 0){
                    GetInputValue(a[0],ShowHow);
                }
            console.log('当前是4:',new Date().format("yyyy-MM-dd hh:mm:ss"));
            clearInterval(id0);
            }
        }
        
    },20,id0)
}
var id =setInterval(function () {
        if(Timer.indexOf(new Date().format("hh:mm"))>-1 && new Date().getSeconds()==58){
            console.log('当前是1:',new Date().format("yyyy-MM-dd hh:mm:ss"));
            RefreshPage();
            
            //iframe加载完成后，对其子元素进行操作
            //setTimeout(function (){
                
                /*
                var result = Iframe.document.getElementsByClassName("ant-message").length;
                while(result > 0){
                    result = Iframe.document.getElementsByClassName("ant-message").length;
                }
                console.log('响应结果:' + result[0].innerText);
                */
            //}, 2000);
            console.log('当前是2:',new Date().format("yyyy-MM-dd hh:mm:ss"));
            //clearInterval(id);
        } else{
            console.log('时间未到')
        }
    },1000,id)