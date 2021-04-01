function getMyTime()
{
    let all = document.getElementsByTagName('td'); //获取所有单元格
    let showTime = document.querySelectorAll('.years > span'); //标题展示时间
    initail();
    function initail()
    {
        let t = nowTime();
        let s = t.w; //标记空白数, 从第n个单元格开始写入数字 写到days
        // week  ==> vacuum
        // 4     ==> 4
        // 0     ==> 0

        showTime[0].innerText = `${t.y} /${t.m+1} /${t.d}`;// y/m+1/date 

        switch(t.wn)
        {
            case 0:t.n = "天";break;
            case 1:t.n = "一";break;
            case 2:t.n = "二";break;
            case 3:t.n = "三";break;
            case 4:t.n = "四";break;
            case 5:t.n = "五";break;
            case 6:t.n = "六";break;
        }
        showTime[1].innerText = `星期${t.n}`;// 星期{0-6}
        Array.from(all, el=>el.innerHTML=""); //清空单元格的内容
        for(let i = 1; i <= (+t.days); i++)
        {
            // i ==> 标记天数

            (i === t.d)?all[s].classList.add('active'):null; // 当前遍历天数 等于 时间戳里的当前天数
            all[s].innerText = i;// 从第s个空格开始写,
            s++;
        }

    }

    function nowTime(date=Date.now())
    {

        //传入时间戳/yyyy-mm-dd, 返回年 月 日 星期 该月天数
        let oDate = new Date(date); // 根据1号来推算星期, 存两个星期, 一个是1号的星期, 一个是当前星期
        let time = null;
        // let oDate2 = new Date(time.y, time.m, 1); //该月1号的time
        let oDate2 = new Date(+oDate); //该月1号的time
        oDate2.setDate(1);

        time = 
        {
            "y":oDate.getFullYear(),
            "m":oDate.getMonth(),    // Month value - 1
            'd':oDate.getDate(),    // day
            'wn':oDate.getDay(),   // weekNow ==> 标记当前的星期数
            'w':oDate2.getDay(),  // w ==> 标记该月1号的星期
        };
        time.days = getDays(time);
        return time;
    }

    
    function getDays(time)
    {
        //返回该月的天数,
        let {y, m, d, w} = time;
        let days = "312x31303130313130313031";
        days = leapYear(y)?days.replace('x','9'):days.replace('x','8');
        {//get string 
        // 0 ==> 0 - 2
        // 1 ==> 2 - 4
        // 2 ==> 4 - 6
        // 3 ==> 6 - 8
        // 4 ==> 8 - 10
        // 5 ==> 10 - 12
        // 6 ==> 12 - 14
        // 7 ==> 14 - 16
        // 8 ==> 16 - 18
        // 9 ==> 18 - 20
        //10 ==> 20 - 22
        //11 ==> 22 - 24
        }
        return days.slice(m*2,m*2+2);
    }

    function leapYear(y)
    {
        //判断闰年
        return (y % 4 === 0 && y % 100 !== 0 || y % 400 === 0);
    }
}