function getStyle(obj, str)
{
    if(obj.currentStyle)return parseInt( obj.currentStyle[str] );
    else return parseInt( getComputedStyle(obj, '')[str] );
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


    function oPage_width()
    {
        let oPage = document.getElementById('page')
        let oLists = oPage.getElementsByTagName('section');
        oPage.style.width = oLists.length * getStyle(oLists[0],'width') + "px";
    }

    function varyPage()
    {
        let oPage = document.getElementById('page');
        let oBtn_li = document.querySelectorAll('#Btn>li');

        const page_w = 360;
        let now = 0;
        for(let i = 0; i < oBtn_li.length; i++)
        {
            oBtn_li[i].addEventListener('click',function(ev)
            {
                let oEven = ev||event;
                if(i == now)return;
                now = i;
                startMove_json(oPage, {left:-now*page_w}, 10);
                oEven.cancelBubble = true;
            })
        }

        let touch={now_page:0};

        oPage.addEventListener('touchstart', function(ev)
        {
            let oEvent = ev||event;
            touch.sx = oEvent.touches[0].pageX;

            oEvent.cancelBubble = true;
        })
        oPage.addEventListener('touchend',function(ev)
        {
            let oEvent = ev||event;
            touch.ex = oEvent.changedTouches[0].pageX;

            oEvent.cancelBubble= true;

            movePage(oPage,2, page_w);
        })



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
    }


    function loadMusic()
    {
                let oPng = document.querySelector('.music>img');
                let oBox = document.querySelector('.music');
                let muList = ['love.mp3', 'mom.mp3', 'yong.mp3', 'gentleman.mp3', 'huangting.mp3', 'light.mp3', 'meet.mp3', 'notkonw.mp3', 'summerwind.mp3'];
                let num = Math.floor(rand(0, 8));
                let x = false;
    
    
                let media = new Audio(`./music/${muList[num]}`);
                    
                oPng.addEventListener('click',music_png);
    
                
                let timer = null;
                function music_png(ev)
                {  
                    let oEvent = ev||Event;
                        x = !x;
                        
                        if(x)
                        {
                            media.play();
                            clearInterval(timer);
                            timer = setInterval(function()
                            {
                                oBox.style.background = randColor(0, 200);
                            },500)
                            
                            oPng.style.animationPlayState = "running";
                        }
                        else
                        {
                            clearInterval(timer);
                            oBox.style.background = "";
                            
                            media.pause();
                            oPng.style.animationPlayState = "paused";
                        }
                    
                        oEvent.cancelBubble = true;
                }
    }
    

    function loadText(x)
            {
                let url;
                x===1?url="https://api.66mz8.com/api/music.163.php":url="https://v1.hitokoto.cn";
                fetch(url)
                .then(
                    response=>response.json()
                )
                .then(
                    v=>{
                        x===1?write_Text(v['comments'], v['name']):write_Text(v['hitokoto'], v['from']);
                    },
                    e=>console.log(e)
            )


            
            function write_Text(v, v2)
            {
                let oText = document.querySelector('#message');
                let arr = v.split('');
                let i = 0;
                let aImg = [];

                let timer2 = setInterval(function()
                {
                    if(arr[i])
                    {
                        aImg[i] = createImg("img/love.png");
                        oText.append(arr[i]);

                        oText.append(aImg[i]);
                        if(i != 0)
                        oText.removeChild(aImg[i-1]);
                    }
                    else
                    {
                        let op = document.querySelector('#from>bdo');
                        let end = 
                        {
                            timer:null,
                            text:v2.split(''),
                            img:[]
                        };
                        let j = 0;
                        end.text.reverse();
                        end.timer= setInterval(function()
                        {
                            
                            if(end.text[j])
                            {
                                end.img[j] = createImg("img/love.png");
                                op.append(end.text[j]);
                                op.append(end.img[j]);
                                if(j != 0)
                                op.removeChild(end.img[j-1]);
                            }
                            else
                            {
                                op.removeChild(end.img[end.img.length-1]);
                                clearInterval(end.timer);
                            }
                            j++;
                        },300)

 

                        clearInterval(timer2);
                    }

                    i++;
                },300)

                function createImg(src)
                {
                    let oImg = document.createElement('img');
                    oImg.src = src;
                    return oImg;
                }

            }

            
            }

            function dropPage()
            {
                let oMore = document.getElementById('more');
                let touchMore = document.getElementById('show');
                let oMoreImg = touchMore.getElementsByTagName('img')[0];
                let oPage = document.getElementById('page');
                let initial = {};
                let x = false;

            touchMore.addEventListener('touchstart', function(ev)
            {
                    let oEvent = ev||event;

                    initial.sy = oEvent.touches[0].pageY;
                
                    ev.cancelBubble = true;
            })
            touchMore.addEventListener('touchend',function(ev)
            {
                let oEvent = ev||event;

                initial.ey = oEvent.changedTouches[0].pageY;
                
                moveMore(initial, oMore);
                ev.cancelBubble = true;
            })

            function moveMore(data, obj)
            {
                let {sy:sy, ey:ey} = data;

                console.log(Math.ceil(sy-ey));
                if(Math.ceil(ey - sy) > 30)
                {
                    x = !x;
                    initial.oMore_H = getStyle(oMore, 'top');
                    oMore.style.background = "rgba(88, 201, 185, 0.6)";
                    startMove_json(oMore, {top:0}, 10);
                }
                if(Math.ceil(sy - ey) > 20)
                {
                    x = !x;
                    oMore.style.background = "rgba(88, 201, 185, 1)";
                    startMove_json(oMore, {top:initial.oMore_H}, 10);
                }
            }
            oMoreImg.addEventListener('click',function(ev)
            {
                let oEvent = ev||event;

                x = !x;
                if(x)
                {
                    initial.oMore_H = getStyle(oMore, 'top');
                    oMore.style.background = "rgba(88, 201, 185, 0.6)";
                    startMove_json(oMore, {top:0}, 10);
                }
                else
                {
                    oMore.style.background = "rgba(88, 201, 185, 1)";
                    startMove_json(oMore, {top:initial.oMore_H}, 10);
                }
                
                
                ev.cancelBubble = true;
            })

            oPage.addEventListener('click',function(ev)
            {
                let oEvent = ev||event;
                if(x)
                {
                    oMore.style.background = "rgba(88, 201, 185, 1)";
                    startMove_json(oMore, {top:initial.oMore_H}, 10);
                    x = !x;
                }
                
                ev.cancelBubble = true;
            })

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

function rand(min, max) { return ( min + Math.random() * (max + 1 - min) );}