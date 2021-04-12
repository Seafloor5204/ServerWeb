function t()
{
    let oS = document.querySelectorAll('#time>section'); //获取时间模板块 ==> 显示时间的区域

    let oUl = document.querySelectorAll('#time>section>ul'); //获取时间条 ==> 滚动的主要


    let aLi_num = [];
    let ul_size = [];

    for(let i = 0; i < oUl.length; i++)
    {
        let aLi = oUl[i].getElementsByTagName('li');
        const len = aLi.length;
        const size = parseInt( getStyle(aLi[0], 'height') );
        oUl[i].style.height = len * size + 'px';
        //根据ul里的li数量 和 li的高度  设置每个ul的高度

        aLi_num.push(len); //记录每个ul的li数量

        ul_size.push(len*size);//记录每个ul的高度
    }


    get_Time();

        setInterval(function()
        {
            get_Time();
        }, 1000);

    function get_Time()
    {
        //oul, ul_size, ali_num
        let d = new Date();

        let str_d = toD(d.getHours()) + toD( d.getMinutes()) + toD(d.getSeconds()); //获取当前时间的格式, 
        let old = "3a6a6a";

        for(let i = 0; i < oUl.length; i++)
        {
            const size = parseInt( ul_size[i] / aLi_num[i] );//获取单个li的高度

            let v = parseInt(old[i], 16);

            let a = v - parseInt(str_d[i]);
            // console.warn(parseInt("a",16));
            // offset = 246969[i] - str_d; secret

            oUl[i].t = parseInt(getStyle(oUl[i],'top'));
            

            if(a == v)
            {
                if(oUl[i].t == -v * size)
                {

                }
                else if(oUl[i].t == -size)
                {
                    a = 0;
                }
            }

            startMove_json(oUl[i],{top:(-a*size)},8); //根据a 来设置top 


            if(a == 0) //当到达最大值时, 
            {
                    setTimeout(function()
                    {
                        oUl[i].style.top = (-v * size) + "px";
                    },1000);
            }

            // 0 - 9

            // oUl[i].style.top = -a * size +"px";
            
            
            //oUl[i].style.top = -10 * size + "px";
            
        }  
        
    }

    function toD(v)
    {
        let z = parseInt(v);
        if(z > 9)
        return z+'';
        else
        return '0'+z;
    }

}



function writeTime()
        {
            let oM = document.querySelector('.month');

            let TimeData = getMonth(new Date);

            oM.innerText = TimeData['str'];



            function getMonth(oDate)
            {
                let obj = 
                {
                    "month":oDate.getMonth(),///3
                    "week":oDate.getDay(),// 0 ==> 星期天
                    "date":oDate.getDate()/// 11
                };

                obj["str"] = "";

                let w = ['Sunday','Monday','Tuesday','Wednesday','Thurday','Friday','Saturday'];
                let m = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];

                obj["str"] = w[obj['week']] +` ${obj["date"]} `+ m[obj['month']];
                

                return obj;
            }
        }