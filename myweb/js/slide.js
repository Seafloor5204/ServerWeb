
function slip()
{
    let oMore = document.querySelector('#title');
    let oSlip = document.getElementById('slip');
    let oBox = document.getElementById('box');
    // <!-- title, main, footer -->
    let initial;
    let x = !0;
    oMore.addEventListener('click',e=>
    {
        var oEvent = e||Event;
        x?(oSlip.style.opacity=1,initial = parseInt(getStyle(oSlip,'left')),startMove_json(oSlip,{left:0},9)):(startMove_json(oSlip,{left:initial},9,()=>{startMove_json(oSlip,{opacity:0},9)}));
        x=!x;

        oEvent.cancelBubble = true;
    })
    oBox.addEventListener('click',()=>x==!1?(startMove_json(oSlip,{left:initial},9,()=>{startMove_json(oSlip,{opacity:0},9)}),x=!x):null)
    oSlip.addEventListener('click',e=>(e.cancelBubble = true));

};

function loadText(url,n)
{

    const pro = Ajax(url);

    pro.then(
        v=>sentence(v),
        e=>writeErr()
    )
    
        function writeErr()
    {
        let oData1 = document.querySelector('#content');
        let oData2 = document.querySelector('#from');
        oData1.firstChild.data = "为了能体面的死去, 而狼狈地活着"; 
        oData2.firstChild.data = "-"+"---佚名";
    }

        function sentence(v)
    {
        let oData1 = document.querySelector('#content');
        let oData2 = document.querySelector('#from');


        oData1.addEventListener('contextmenu',function(e)
        {
            var oEvent = e||Event;
            oEvent.preventDefault();
        });


        let obj = JSON.parse(v);

        let keys=[];
        const d = 
        [
            ['hitokoto','from'],
            ['sentence','name'],
            ['Content','Source'],
        ];

        for(let o = 0; o < 2; o++)
        {
            keys.push(d[n][o]);
        }
        n===1?obj=obj['data']:null;

        oData1.firstChild.data =  obj[keys[0]] ; 
        oData2.firstChild.data = "---"+obj[keys[1]] ;
    }
}



