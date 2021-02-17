<?php
    // $url = "https://du.shadiao.app/api.php?from=asdf5204";


        // $url = "https://v1.hitokoto.cn";

    // $url = "https://tianqiapi.com/api?version=v6&appid=87127569&appsecret=aly23QOk";

    // $url = "https://tianqiapi.com/api?version=v6&appid=87127569&appsecret=aly23QOk";


    // $url = 'https://chp.shadiao.app/api.php?from=asdf5204';



    $url = "https://api.oioweb.cn/api/yiyan.php";

    // $utl = "https://api.oioweb.cn/api/saohua.php";


    // $url = "bqd316xy61.bt/api/yan/gc.php";
    $result = file_get_contents($url);

    print_r($result);
?>