
function  getStyle(obj, name)
{
    if(obj.currentStyle) return obj.currentStyle[name];
    else return getComputedStyle(obj,'')[name];
}



        function startMove(obj, str, Itaget)
        {
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
                

                let speed = (Itaget - curr)/5;
                
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                if(Itaget == curr)
                {
                    clearInterval(obj.timer);
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



function myTel()
{
alert("邮箱:472338795@qq.com");
}