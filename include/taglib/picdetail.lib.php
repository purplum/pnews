<?php
if(!defined('DEDEINC')){
    exit("Request Error!");
}

 
function lib_picdetail(&$ctag,&$refObj)
{
    global $dsql,$envs;
    
    //���Դ���
    $attlist="row1|12";
    FillAttsDefault($ctag->CAttribute->Items,$attlist);
    extract($ctag->CAttribute->Items, EXTR_SKIP);
    $revalue = '';
    
    //�����д�Ĵ��룬������echo֮���﷨�������շ���ֵ����$revalue
    //------------------------------------------------------
	 $row = $dsql->GetOne("select imgurls from #@__addonimages where aid='{$refObj->Fields['aid']}'");
    $imgsrc=$refObj->Fields['imgurls'];
   $imgsrc=substr($imgsrc,strpos($imgsrc,'src=')+5);
    $imgsrc=substr($imgsrc,0,strpos($imgsrc,"'"));
	$arr=explode("{/dede:img}",$row['imgurls']);
	foreach($arr as $val){
$tmp='';
$tmp=trim(substr($val,strrpos($val,'}')+1));
if($tmp==$imgsrc){$tmp=$val;break;}
}

if(!empty($tmp)){
if(strpos($tmp,"desc=")>-1){
$desc=substr($tmp,strpos($tmp,'desc=')+6);
$desc=substr($desc,0,strpos($desc,"'"));
}
if(strpos($tmp,"link1=")>-1){
$link1=substr($tmp,strpos($tmp,'link1=')+7);
$link1=substr($link1,0,strpos($link1,"'"));
}
if(strpos($tmp,"link2=")>-1){
$link2=substr($tmp,strpos($tmp,'link2=')+7);
$link2=substr($link2,0,strpos($link2,"'"));
}

}


    $revalue .= "<div id=picdetail><table style='display:none;'>";
	if(!empty($desc)){
	$revalue .= "<tr><td align=right valign=top>ͼƬ������</td><td align=left>$desc</td></tr>";
    }
	if(!empty($link1)||(empty($link1)&&strpos("ulink1=")<0)){
	$revalue .= "<tr><td align=right valign=top>������ַ1��</td><td align=left>";
	if(empty($link1)&&strpos("ulink1=")<0){
	$revalue .="<button onclick=\"supplyAddr({$refObj->Fields['aid']},'$imgsrc',1);\">��������ַ</button>";
	}else{
	$revalue .="$link1";
	
	}
	$revalue .="</td></tr>";
	}
	
		if(!empty($link2)||(empty($link2)&&strpos("ulink2=")<0)){
	$revalue .= "<tr><td align=right valign=top>������ַ2��</td><td align=left>";
	if(empty($link2)&&strpos("ulink2=")<0){
	$revalue .="<button onclick=\"supplyAddr({$refObj->Fields['aid']},'$imgsrc',2);\">��������ַ</button>";
	}else{
	$revalue .="$link2";
	
	}
	$revalue .="</td></tr>";
	}
	
	$revalue .= "</table></div>";
$revalue .= "<script>timer1=setInterval(function(){var div=document.getElementById('picdetail');var isrc=document.getElementById('imgsrc1');if(isrc&&div){myajax = new DedeAjax(div,false,false,'','','');myajax.SendGet2('/picDetail.php?id={$refObj->Fields['aid']}&imgsrc='+isrc.innerText);DedeXHTTP=null;clearInterval(timer1);}},1000);</script>";

    //------------------------------------------------------
    return $revalue;
}