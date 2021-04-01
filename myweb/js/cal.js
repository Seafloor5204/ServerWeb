function main()
{
    let aEx = document.getElementsByClassName('exper');
    let aText = document.querySelectorAll('.answer>input');
    let aBt = document.querySelectorAll('.answer+li');

    let t = document.getElementsByClassName('t')[0];
    let f = document.getElementsByClassName('f')[0];

    let nowPage = 0;


    loadEx()

    function loadEx()
    {
        let s = creatEx();
        aEx[nowPage].innerHTML = s;
        
        aEx[nowPage].value = cal(s);

        aBt[nowPage].addEventListener('click',check);
        //当前页面时, 自动获得焦点, 去掉不可编辑状态

        aText[nowPage].setAttribute("autofocus","autofocus");
        aText[nowPage].removeAttribute("disabled");

        setTimeout(()=>{aText[nowPage].focus();},500);

        //给另一页添加, 禁用文本框, 取消自动获得焦点
        
        

        aText[nowPage].addEventListener('keydown',checkDown);
        aText[nowPage].addEventListener('keydown',checkRagne);
        //加载页面, 单页单页加
    }

        function clear(n)
        {
            aEx[n].innerHTML = '';
            aText[n].value = '';
            aText[n].setAttribute("disabled","disabled");
            aText[n].setAttribute("autofocus","false");
            //清理上一页的内容

        }
        function checkDown(e)
        {
            if(e.keyCode == 13 || e.keyCode == 32)
            {
                //回车，空格的情况 
                check(e);
            }
            return false;
        }

    function checkRagne(e)
    {
        let n = e.keyCode;
        if( !((n>=48&&n<=57) || (n>=96&&n<=105) || (n==189) || (n==109) || (n==107) || (n == 8) || (n==37) || (n==39)))
        {
            e.preventDefault();
            //如果输入, 不是这些则阻止
        }
        return false;
    }   

        function check(e)
        {
            // console.log("-" == "－" == "-"); 

                // aText[nowPage].value ==> 文本框的值__用户输入
                // aEx[nowPage].value ==> 存储标准答案

                if(~(''+aText[nowPage].value.indexOf('－') ))
                {
                    let str = ''+aText[nowPage].value;

                    str = str.replace('－','-');

                    aText[nowPage].value = str;
                }

                if(aText[nowPage].value == aEx[nowPage].value)
                {
                    nowPage = +(!nowPage);
                    loadEx();
                    if(nowPage == 1)
                    {
                        t.classList.add('c1');
                        f.classList.remove('c3');
                        f.classList.add('c2');
                    }
                    else
                    {
                        t.classList.remove('c1');
                        f.classList.remove('c2');
                        f.classList.add('c3');
                    }
                    setTimeout(()=>clear(+(!nowPage)),1000);
                }
            e.stopPropagation();
        }






    function cal(str)
    {
        //传入表达式, 返回值
        let arr = str.split('');
        let value = 0;
        for(let i = 0; i < arr.length; i++)
        {

            if(!+arr[i] && arr[i] != '0')
            {
                let num='', num2='';
                for(let j = 0; j < i; j++){num += arr[j];}
                for(let j = i+1; j < arr.length; j++){num2 += arr[j];}
                num = parseInt(num);
                num2 = parseInt(num2);
                switch(arr[i])
                {
                    case '+':
                        value = num + num2;
                        break;
                    case '-':
                        value = num - num2;
                        break;
                    case '*':
                        value = num * num2;
                }
            }
        }

        return value;
    }



    function creatEx()
    {
        //随机制造两数表达式, 
        let exData=[];
        let y = ['+','-','*'];
        let str="";
        let u = 0;
        let r = 0;
        let r2 = Math.floor(rand(0,2));
        for(let i = 0; i < 2; i++)
        {
            if(r2 === 2)
            {
                r = Math.floor(rand(1,20));
            } 
            else
            {
                r = Math.floor(rand(1,99));
            }
            str = i===1?str+r:str + r + y[r2];
            
        }
        return str;
    }
}