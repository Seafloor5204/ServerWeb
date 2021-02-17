function loadingPage()
{
    let oLoad = document.getElementById('load');
    let oLoad_div = document.getElementsByClassName('load-page')[0];
    let oLoad_p = oLoad_div.getElementsByTagName('p');

    
    let i = 0;
    let timer = null;

    clearInterval(timer);
    timer = setInterval(()=>
    {
        if(i >= 100)
        {
            clearInterval(timer);
            

            startMove(oLoad, "opacity", 0,function()
            {
                oLoad.style.backgroundColor = "white";
                oLoad.style.display = "none";
            });

            
            
        }
        oLoad_p[1].innerHTML = `${i++}%`;
        
    },30);

}

function slid()
{
    let aLi =document.querySelectorAll('#page2-Text>ul>li');

    let show_pic = document.querySelector('.small-box');


    const li_h = 160;
    let now = 0;

    for(let i = 0; i < aLi.length; i++)
    {   
        aLi[i].addEventListener('click',function()
        {
            if(i === now)return;
            now = i;
            show_pic.style.transform = `translate(0px, ${li_h * -i}px)`;
        })
    }
}


function data_hito()
{
    let oText_p = document.querySelector('.page3-Text');
    let url = "https://api.oioweb.cn/api/yiyan.php";
    let pro = Ajax(url);
    pro.then(data=>oText_p.innerHTML = data)
}


function data_poem()
{
    let oText_p = document.querySelector('.page3-Text');
    let url = "https://v1.jinrishici.com/all.json";
    let pro = Ajax(url);
    pro.then(
        data=>
        {
            let obj = JSON.parse(data);
            oText_p.innerHTML = obj['content'];
        }
    )

}


function music_on()
{
    let oPage1 = document.getElementById('page1');
    let oPage_img = document.querySelector('#rotate-pic');

    let oPage_a = oPage_img.getElementsByTagName('a');


    let oMu = document.getElementsByClassName('music')[0];
    
    let x =true;

    oPage_img.addEventListener('click', ()=>
    {


        if(x)
        {
            oMu.play();
            Array.from(oPage_a).forEach(o=>getPage_a(o, x));
            oPage_img.style.animationPlayState="running";
        }
        else
        {
            oMu.pause();
            Array.from(oPage_a).forEach(o=>getPage_a(o, x));
            oPage_img.style.animationPlayState='paused';
        }

        x = !x;
    })

    let arr = [0, 1, 2, 3, 4, 5]
    for(let i = 0; i < oPage_a.length; i++)
    {
        oPage_a[i].addEventListener('click', function(ev)
        {
            let color="";

            for(let j = 0; j < 3; j++)
            {
                color += Math.floor( rand(50, 250) ) +",";
            }

            color += rand(0, 1).toFixed(2);

            let c = `rgba(${color})`;

            oPage_a[i].style.backgroundColor = c;
            //点击小圆圈, 1 改变音乐, 2. 弹出内容
            ev.cancelBubble=true;
        })
    }
    initia()
    
}

function initia()
{
    let oPage_a = document.querySelectorAll('#rotate-pic>a');
    for(let i = 0; i < oPage_a.length; i++)
    {
        oPage_a[i].click();
    }
}
function getPage_a(obj, x)
    {
        if(x)
        obj.style.animationPlayState="running";
        else
        obj.style.animationPlayState='paused';
    }




    function varyPage()
            {
                let oNext = document.getElementById('next');
            let oNext_img = document.querySelector('#next>img');
            oNext.style.opacity = 1;

            

            let main_content = document.querySelector('.content');
            let aSection = document.querySelectorAll('.content>section');
            let page = aSection.length;

            

            let touchData={};

            main_content.addEventListener('touchstart', function(e)
            {
                touchData['sX'] = e.touches[0].pageX;
                touchData['sY'] = e.touches[0].pageY;
            });

            main_content.addEventListener('touchend', function(e)
            {
                touchData['eX'] = e.changedTouches[0].pageX;
                touchData['eY'] = e.changedTouches[0].pageY;

                changePage(main_content, touchData, 642, 2);
            });
            
            let nowPage = 0;

            function changePage(obj, data, pageH=642, maxPage)
            {
                //maxPage 0 1 2 begin
                let {sY:sy, eY:ey} = data;

                if(Math.ceil(ey - sy) > 40)
                {
                    if(nowPage <= 0)return;
                    nowPage--;
                    obj.style.transform = "translate(0, "+(-nowPage*pageH)+"px)";
                    nowPage==0?oNext_img.style.transform = "rotate(0deg)":null;
                }
                else if(Math.ceil(sy - ey) > 40)
                {
                    if(nowPage >= maxPage)return;
                    nowPage++;
                    obj.style.transform = "translate(0, -"+(nowPage*pageH)+"px)";

                    nowPage==maxPage?oNext_img.style.transform = "rotate(180deg)":'';
                }
            }
            }





function getStyle(obj, name)
{
    if(obj.currenStyle)return obj.currenStyle[name];
    else return getComputedStyle(obj, '')[name];
}
function startMove(obj, str, Itaget, fn)
{
    obj.timer = null;
    clearInterval(obj.timer);
    obj.timer = setInterval(function()
    {
        let curr;
        if(str === 'opacity')
        {
            curr = Math.round(parseFloat(getStyle(obj,str)) * 100);
        }
        else
        {
            curr = parseInt(getStyle(obj, str));
        }
        
        let speed = (Itaget - curr)/2;
        
        speed = speed>0?Math.ceil(speed):Math.floor(speed);
        if(Itaget == curr)
        {
            clearInterval(obj.timer);
            if(fn)
            fn();
        }
        else
        {
            if(str === 'opacity')
            {
            obj.style[str] = (curr+speed) / 100;
            }
            else
            obj.style[str] = curr + speed + 'px';
        }
        
    },30);
}







function Ajax(url)
{
    return new Promise(function(resolve, reject)
    {
        let oAjax = new XMLHttpRequest();

        oAjax.open('GET',url);

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


    });
}


function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options = {}) {

    options = {
    path: '/',
    samesite:'lax',
    // 如果需要，可以在这里添加其他默认值
    ...options
    };

    if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
    }
    }

    document.cookie = updatedCookie;
}


function deleteCookie(name) {
setCookie(name, "", {
    'max-age': -1
});
}



function rand(min, max) { return ( min + Math.random() * (max + 1 - min) );}