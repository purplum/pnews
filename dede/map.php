<?php
require_once(dirname(__FILE__)."/config.php");
require_once(DEDEINC."/arc.rssview.class.php");
require_once DEDEINC."/arc.partview.class.php";

if(empty($dopost)){
	include DedeInclude('templets/map.htm');
	exit();
}

if($x!="sitemap" && $x!="feed" && $x!="baidumap"){
	ShowMsg("��������!","-1");
	exit();
}
if(empty($cfg_cmspath)){$cfg_cmspath='/';}
$murl=$cfg_cmspath. $x.'.xml';
if(!empty($dopost) && !empty($x)){
$pv = new PartView();
$pv->SetTemplet($cfg_basedir . $cfg_templets_dir . '/plus' .'/'. $x.'.xml');
$pv->SaveToHtml(dirname(__FILE__).'/../'. $x.'.xml');
echo "<a href='$murl' target='_blank'>�ɹ������ļ�: $murl ���...</a>";
exit();
}
?>