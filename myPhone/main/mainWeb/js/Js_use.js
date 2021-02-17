let banner = document.getElementsByClassName('banner')[0];

let Mark_l = document.getElementsByClassName('Mark-left')[0];
let Mark_r = document.getElementsByClassName('Mark-right')[0];

let oBtn_l = document.getElementById('Btn-left');
let oBtn_r = document.getElementById('Btn-right');

let oUl = banner.getElementsByTagName('ul')[0];
let aLi = oUl.getElementsByTagName('li');

let left = 0;
let center = 1;
let right = 2;

let timer_Btn = null;

oBtn_l.addEventListener('click', Left_fn, false);
oBtn_r.addEventListener('click', Right_fn, false);


btn();
main_change();
getData();
poem_data();


clearInterval(timer_Btn);
timer_Btn = setInterval(function()
{
    oBtn_r.click();


},5000);

banner.addEventListener('mouseover',function()
{
    clearInterval(timer_Btn);
},false);

banner.addEventListener('mouseout',function()
{
    timer_Btn = setInterval(function()
    {
        oBtn_r.click();
    },5000)
},false);

function btn()
{
    oBtn_l.onmouseover=Mark_l.onmouseover=()=>
    {
        startMove(oBtn_l, 'opacity', 40);
    }
    oBtn_l.onmouseout=Mark_l.onmouseout=()=>
    {
        startMove(oBtn_l, 'opacity', 0);
    }

    oBtn_r.onmouseover=Mark_r.onmouseover=()=>
    {
        startMove(oBtn_r, 'opacity', 40);
    }
    oBtn_r.onmouseout=Mark_r.onmouseout=()=>
    {
        startMove(oBtn_r, 'opacity', 0);
    }
}

for(let i = 0; i < aLi.length; i++)
{
    aLi[i].v = i;
    aLi[i].onclick=()=>
    {
        
        if(i === left)
        {
            center = i;

            left = left - 1;
            if(left === -1)left = 2;

            right = right - 1;
            if(right === -1)right=2;

            setMargin(left, center, right);
            return;
        }
        if(i === right)
        {
            center = i;

            right = right + 1;
            if(right === 3)right = 0;

            left = left + 1;
            if(left === 3)left = 0;

            setMargin(left, center, right);
            return;
        }
    }
}



function setMargin(left, center, right)
{

    aLi[left].className = 'left scale';
    aLi[center].className = 'center';
    aLi[right].className = 'right scale';
}

function Left_fn()
{
    left = left + 1;
    if(left ===  3)left = 0;
    center = center + 1;
    if(center === 3)center = 0;
    right = right + 1;
    if(right === 3)right = 0;
    setMargin(left, center, right);
    return;
}


function Right_fn()
{
    left = left - 1;
    if(left ===  -1)left = 2;

    center = center - 1;
    if(center === -1)center = 2;

    right = right - 1;
    if(right === -1)right = 2;
    setMargin(left, center, right);
    return;
}





function main_change()
{
let oNav_now = 0;
let oNav = document.getElementsByClassName('catalog')[0];

let oNav_ul = oNav.getElementsByTagName('ul')[0];

let oNav_li = oNav_ul.getElementsByTagName('li');
let oMain = document.getElementsByTagName('main')[0];
let oMain_div = oMain.querySelectorAll('div:not(.content)');




function Nav_change()
{



    i = this.index;
    if(i === oNav_now)return;

        oNav_now = i;

        for(let j = 0; j < oNav_li.length; j++)
        {
            oNav_li[j].classList.remove('toBig');
            oMain_div[j].style.display='none';
        }
        oMain_div[oNav_now].style.display='block';
        oNav_li[i].classList.add('toBig');
}

for(let i = 0; i < oNav_li.length; i++)
{
    oNav_li[i].index = i;
    oNav_li[i].addEventListener('click', Nav_change, false);
}

}



function getData()
{
    const url = 'https://v0.yiketianqi.com/api?version=v61&appid=87127569&appsecret=aly23QOk';
    const flagTime = 'import_Time';
    let oDiv_22 = document.querySelector('.ov4>div');
    const weaEn = ['city','week','wea','air_level'];
    
    if(!getCookie(weaEn[1]))
    {
        console.log('url');
        cookieNull(url);
    }
    else
    {
        console.log('cookie');
        
        if(delyTime(flagTime, 1000*60*10))
        {
            console.log('超时, 重新获取');
            cookieNull(url,true);
        }
        
        writeWea();
        
    }
}



function poem_data()
{
    let oDiv_port = document.querySelector('.ov3>div');
    const setKeys = ['content','origin'];
    const url = 'https://v1.jinrishici.com/all.json';
    const flagTime = 'poemTime';
    if(!getCookie(setKeys[0]))
    {
        console.log('url');
        writeData(url, oDiv_port, setKeys,flagTime);
    }
    else
    {
        console.log('cookie');
        if(delyTime(flagTime, 1000*60*5))
        {
            console.log('超时，重新拉取');
            writeData(url, oDiv_port, setKeys,flagTime);
        }
        
        cookie_data(oDiv_port,setKeys);
        
    }

}

function writeData(url, setObj,setKeys,flagTime)
{
    let pro = Ajax(url);

    pro.then(
        value=>
        {
            let data = JSON.parse(value);

            if(value)
            {


                let setDate = time_count(flagTime);

                if(getCookie(flagTime))
                {
                    for(let k of setKeys)
                    {
                        setCookie(k, data[k], {'max-age': setDate});
                    }
                }

                //content  origin

                cookie_data(setObj,setKeys);


            }
        },
        error=>console.log(error)
    );
}



function cookie_data(setObj,setKeys)
{
    //从cookie 写数据进页面

    //先写cookie;
    setObj.innerHTML = '';
    setObj.innerHTML += `<li>${getCookie(setKeys[0])}  ___  <span style="text-align:right;">${getCookie(setKeys[1])}</span><li>`;

    
}

function time_count(flagTime)
{
    let oDate = new Date();
    let oDate2 = new Date(oDate);

    oDate2.setHours(23,59,59,59);

    let setDate = oDate2 - oDate;

    let z = setDate / 1000/60;
    setCookie(flagTime,oDate.getTime(), {'max-age': setDate});

    return setDate;
    //返回剩余过期时间
}


function delyTime(flagTime, maxTime)//时间标准, 过了多少时间重新获取
{
    let oldDate = getCookie(flagTime);
    let x;
    
    let oDate = new Date();
    
    console.log((oDate-oldDate)/1000/60);
    //1000 * 60 * 10
    oDate-oldDate>maxTime?x=true:x=false;

    return x;

}






















function cookieNull(url,x=false)
        {

                const weaEn = ['city','week','wea','air_level'];
                const flagTime = 'import_Time';
                let pro = Ajax(url);
                pro.then(
                value=>{
                    return eval('('+value+')');
                })
                .then(
                    data=>
                    {
                        if(x)
                        deleteCookie(flagTime);

                        let setDate = time_count(flagTime);

                        if(getCookie(flagTime))
                        {
                            for(let k of weaEn)
                            {
                                setCookie(k, data[k], {'max-age': setDate});
                            }
                        }
                        writeWea();
                    }
                )

            }


    function writeWea()
    {
        let oDiv_22 = document.querySelector('.ov4>div');
        let weaEn = ['date','city','week','wea','air_level'];
        let tag_zh = ['日期','城市','星期','天气','空气'];

            oDiv_22.innerHTML = "";

            weaEn.forEach((value, index)=>
            {
                if(value == 'date' || value == 'week')
                {

                    let date= new Date();
                    if(value == 'date')
                    {
                        let strDate = date.getFullYear()+'-'+(date.getMonth()+1) + '-' + date.getDate();
                        oDiv_22.innerHTML += `<li>${tag_zh[index]}: ${strDate}</li>`;
                    }
                    else
                    {
                        let strWeek = date.getDay();
                        let weekArr = ['天','一','二','三','四','五', '六'];
                        oDiv_22.innerHTML += `<li>${tag_zh[index]}: 星期${weekArr[strWeek]}</li>`;
                    }
                }
                else
                {
                    oDiv_22.innerHTML += `<li>${tag_zh[index]}: ${getCookie(weaEn[index])}</li>`;
                }

            })
    }






