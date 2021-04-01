//get style -->value
function getStyle(obj, name)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[name];
    }
    else
    {
        return getComputedStyle(obj, '')[name];
    }
    //返回的xxx px
    //解决方法parseInt(),  +不行, Number不行
}

function test()
{
    alert("yes");
}
function getStyle_min(obj, name)
{
    if(obj.currentStyle) return obj.currentStyle[name];
    else return getComputedStyle(obj,'')[name];
    //返回xxx 属性值, 可能包含字符
}

function MyStartMove(obj, str, Itaget)
        {
            clearInterval(obj.timer);

            obj.timer = setInterval(function()
            {
                let curr = parseInt(getStyle(obj, str));//获取对象当前属性值
                let speed = (Itaget - curr)/6;//根据目标和当前值, 计算速度==>匀速

                speed = speed>0?Math.ceil(speed):Math.floor(speed);//速度取整

                if(Itaget == curr)
                {
                    clearInterval(obj.timer);
                }
                else
                {
                    obj.style[str] = curr + speed + 'px';
                }
            },30);
        }



        function startMove(obj, str, Itaget, s)
        {
            clearInterval(obj.timer);
            obj.timer = setInterval(function()
            {
                let curr;
                if(str === 'opacity')
                {
                    curr = Math.round(parseFloat(getStyle(obj,str)) * 100);
                    //1   == >  100
                    //0.3 == >  30
                    // console.log('当前透明度*100='+curr);
                }
                else
                {
                    curr = parseInt(getStyle(obj, str));
                }
                

                let speed = (Itaget - curr)/s;
                
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                // console.log('speed'+speed);//-12
                if(Itaget == curr)
                {
                    clearInterval(obj.timer);
                }
                else
                {
                    if(str === 'opacity')
                    {
                    obj.style[str] = (curr+speed) / 100;
                    // console.log('当前div透明度的值应该是'+((curr+speed)/100));
                    }
                    else
                    obj.style[str] = curr + speed + 'px';
                }
                
            },30);
        }



        function startMove_json(obj,json,s,fn)
{

        clearInterval(obj.timer);
        obj.timer=setInterval(function()
            {
                var x =true;
        for(var name in json)
        {
                var curre =0;
                if(name =='opacity')
                {
                    curre=Math.round(parseFloat(getStyle(obj,name))*100);
                    // console.log(curre);
                    //此时获取的是透明值小数。故*100
                }
                else
                {
                    curre = parseInt(getStyle(obj,name));
                }
                var speed=(json[name]-curre)/s;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                if(curre!=json[name])
                    x=false;
                if(name=='opacity')
                    {
                        obj.style.filter='alpha(opacity:'+(curre+speed)+')';
                        // console.log(curre+speed);
                        obj.style.opacity=(curre+speed)/100;
                    }
                    else
                    {
                        obj.style[name]=(curre+speed)+'px';
                    }
            }
            if(x)
            {
                clearInterval(obj.timer);
                if(fn)
                    fn();
            }
            },30);
    }


    function Ajax(url)
    {

        return new Promise(function(resolve, reject)
        {
            let oAjax = new XMLHttpRequest();

            oAjax.open('GET', url, true);

            oAjax.send();

                oAjax.onreadystatechange = function()
            {
                if(oAjax.readyState == 4)
                {
                    if(oAjax.status == 200)
                    {
                        resolve(oAjax.responseText);
                    }
                    else
                    {
                        reject(oAjax.status);
                    }
                }
            }
        })

    }
	
	
	
	function statis_time(nowTime, endTime)
{
    let obj = {};
    let seconds = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);//两个时间点的时间差(秒)
    obj.d = parseInt(seconds / 3600 / 24);//得到天数
    obj.h = parseInt(seconds / 3600 % 24);//小时
    obj.m = parseInt(seconds / 60 % 60);//分钟
    obj.s = parseInt(seconds % 60);//秒
    return obj;

}
function analyze_time(date)
{
    let obj = {};

    obj.year = date.getFullYear();
    obj.month = date.getMonth() + 1;
    obj.day = date.getDate();
    obj.hours = date.getHours();
    obj.miu = date.getMinutes();
    obj.Second = date.getSeconds();
    return obj;
}



function rand(min, max) { return ( min + Math.random() * (max + 1 - min) );}






function movePage(moveObj,maxPage, page_w)
{
    let {sx:sx, ex:ex} = touch;

    if(sx-ex>50)
    {
        if(Math.ceil(now) >= maxPage)return;
        else
        {
            now++;
            startMove_json(moveObj, {left:-now*page_w},10);
        }
    }
    else if(Math.ceil(ex-sx) > 50)
    {
        if(now <= 0)return;
        else
        {
            now--;
            startMove_json(moveObj, {left:(-now*page_w)},10);
        }
    }
}


function randColor(min, max)
{
            let color="";

            for(let j = 0; j < 3; j++)
            {
                color += Math.floor( rand(min, max) ) +",";
            }

            color += rand(0, 1).toFixed(2);

            return `rgba(${color})`;
}


                let unicode = {
                    stringify: function(str)
                    {
                        let arr=[];

                        for(let i = 0; i < str.length; i++)
                        {
                            arr[i] = ( str.charCodeAt(i).toString(16).slice(-4) );
                            arr[i].length == 2?arr[i] = "00"+arr[i]:null;
                        }
                        return str? "\\u" + arr.join("\\u"):"";
                    },

                    parse:function(str)
                    {
                        str = str.replace(/\\/g, '%');

                        return unescape(str);
                    }
                }