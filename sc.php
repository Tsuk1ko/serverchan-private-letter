<?php
//不是post直接返回
header('Content-Type: text/html;charset=utf-8');
if ($_SERVER["REQUEST_METHOD"] != "POST"){
    die('<script>alert("别闹（。");location.href="./";</script>');
}

include_once('.key.php');
function sc_send($text , $desp = '' , $key = SCKEY){
	$postdata = http_build_query(
        array(
            'text' => $text,
            'desp' => $desp
        )
    );
    $opts = array(
        'http' => array(
            'method'  => 'POST',
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'content' => $postdata
        ),
        "ssl" => array(
            "verify_peer" => false,
            "verify_peer_name" => false
        )
    );
    $context  = stream_context_create($opts);
    return $result = file_get_contents('https://sc.ftqq.com/'.$key.'.send', false, $context);
}
function getIP() {
	if (getenv("HTTP_CLIENT_IP"))
		$ip = getenv("HTTP_CLIENT_IP");
	else if(getenv("HTTP_X_FORWARDED_FOR"))
		$ip = getenv("HTTP_X_FORWARDED_FOR");
	else if(getenv("REMOTE_ADDR"))
		$ip = getenv("REMOTE_ADDR");
	else $ip = "Unknow";
	return $ip;
}

header('Content-Type: application/json;charset=utf-8');
$text = "";
$contact = "";
$desp = "";

//获取post参数
if(isset($_POST["text"])){
    $text = $_POST["text"];
}
if(empty($text)){
    $json['errno']=1;
    $json['errmsg']="消息标题不能为空啦";
    die(json_encode($json));
}
if(isset($_POST["contact"])){
    $contact = $_POST["contact"];
}
if(isset($_POST["desp"])){
    $desp = $_POST["desp"];
}

if(!empty($contact)){
    $desp .= "  \n**Contact: " . $contact . "**";
}
$desp .= "  \n**IP: " . getIP() . "**";

echo sc_send($text,$desp);