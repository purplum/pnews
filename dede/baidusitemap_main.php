<?php
set_time_limit(0);
require_once(dirname(__FILE__)."/config.php");
require_once(DEDEINC."/oxwindow.class.php");
require_once(DEDEINC."/channelunit.class.php");
require_once(DEDEINC."/baidusitemap.func.php");
require_once(DEDEINC."/baiduxml.class.php");

if(empty($dopost)) $dopost = '';
if(empty($action)) $action = '';

check_installed();

if($dopost=='auth'){
	$siteurl=$cfg_basehost;
    $sigurl="http://baidu.api.dedecms.com/index.php?siteurl=".urlencode($siteurl);
    $result = baidu_http_send($sigurl);
	//var_dump($result);exit();
    $data = json_decode($result, true); 
    baidu_set_setting('siteurl', $data['siteurl']);
    baidu_set_setting('checksign', $data['checksign']);
    if($data['status']==0){
        $checkurl=$siteurl."{$cfg_plus_dir}/baidusitemap.php?dopost=checkurl&checksign=".$data['checksign'];

        $authurl="http://zz.baidu.com/api/opensitemap/auth?siteurl=".$data ['siteurl']."&checkurl=".urlencode($checkurl)."&checksign=".$data['checksign'];
        $authdata = baidu_http_send($authurl);
        $output = json_decode($authdata, true);
        if($output['status']==0){
            baidu_set_setting('pingtoken', $output['token']);
            if($action=='resubmit')
            {
                $sign = md5($data['siteurl'].$output['token']);
                baidu_delsitemap($data['siteurl'],1,$sign);
                baidu_set_setting('bdpwd','');
            }
            $old_bdpwd = baidu_get_setting('bdpwd');
            if(empty($old_bdpwd))
            {
                $bdpwd = baidu_gen_sitemap_passwd();
                baidu_set_setting('bdpwd', $bdpwd);
                $sign = md5($data['siteurl'].$output['token']);
                //�ύȫ������
                $allreturnjson = baidu_savesitemap('save',$data ['siteurl'], 1, $bdpwd, $sign);
                $allresult = json_decode($allreturnjson['json'], true);
                baidu_set_setting('lastuptime_all', time());
            } else {
                //�ύ��������
                $sign = md5($data['siteurl'].$output['token']);
                baidu_delsitemap($data['siteurl'],2,$sign);
                $allreturnjson = baidu_savesitemap('save',$data['siteurl'], 2, $old_bdpwd, $sign);
                $allresult = json_decode($allreturnjson['json'], true);
                baidu_set_setting('lastuptime_inc', time());
            }
            if(0==$allresult['status'])
            {
                ShowMsg("�ɹ��ύ�ٶȵ�ͼ����","baidusitemap_main.php",0,5000);
                exit();
            } else {
                ShowMsg("�ύ�ٶȵ�ͼ����ʧ��","baidusitemap_main.php",0,5000);
                exit();
            }
        } else {
            ShowMsg("�ύ�ٶȵ�ͼ����ʧ�ܣ��޷�У�鱾����Կ��","baidusitemap_main.php");
            exit();
        }
    }
} elseif($dopost=='checkupdate')
{
    $get_latest_ver = baidu_http_send('http://baidu.api.dedecms.com/index.php?c=welcome&m=get_latest_ver');
    if(version_compare($get_latest_ver, PLUS_BAIDUSITEMAP_VER,'>'))
    {
        ShowMsg("��鵽���°汾����ǰȥ���أ�<br /><a href='http://bbs.dedecms.com/646271.html' target='_blank' style='color:blue'>���ǰȥ����</a> <a href='baidusitemap_main.php' >����</a>","javascript:;");
        exit();
    } else {
        ShowMsg("��ǰΪ���°汾���������ظ��£�","javascript:;");
        exit();
    }
} elseif($dopost=='viewsub')
{
    $query="SELECT * FROM `#@__plus_baidusitemap_list` ORDER BY sid DESC";
    $dsql->SetQuery($query);
    $dsql->Execute('dd');
    $liststr="";
    while($arr=$dsql->GetArray('dd'))
    {
        $typestr=$arr['type']==1?'[ȫ��]':'[����]';
        $liststr.="&nbsp;&nbsp;&nbsp;{$typestr} {$arr['url']}<br/>\r\n";
    }
    //���سɹ���Ϣ
    $msg = "
    {$liststr}";
    $msg = "<div style=\"line-height:20px;\">    {$msg}</div>";

    $wintitle = '���Ѿ��ύ�������б�';
    $wecome_info = '<a href=\'baidusitemap_main.php\'>��������</a> ���ٶȽṹ�����ݵ�ͼ::��������';
    $win = new OxWindow();
    $win->AddTitle($wintitle);
    $win->AddMsgItem($msg);
    $winform = $win->GetWindow('hand', '&nbsp;', false);
    $win->Display();
} else {
    //���سɹ���Ϣ
    $siteurl = baidu_get_setting('siteurl');
    $setupmaxaid = baidu_get_setting('setupmaxaid');
    $lastuptime_all = date('Y-m-d',baidu_get_setting('lastuptime_all'));
    $lastuptime_inc = date('Y-m-d',baidu_get_setting('lastuptime_inc'));
    $bdarcs = new BaiduArticleXml;
    $bdarcs->setSitemapType(1);
    $maxaid = $bdarcs->getMaxAid();
    $msg = "    ����ѡ������Ҫ�Ĳ�����
    <a href='javascript:isGoUrl(\"baidusitemap_main.php?dopost=auth\",\"�Ƿ�ȷ���ύ����������\");'><u>�ύ��������</u></a>
    &nbsp;&nbsp;
    <a href='javascript:isGoUrl(\"baidusitemap_main.php?dopost=auth&action=resubmit\",\"�Ƿ�ȷ�������ύȫ��������\");' ><u>�����ύȫ������</u></a>
    &nbsp;&nbsp;
    <a href='baidusitemap_main.php?dopost=viewsub'><u>�鿴�ύ����</u></a>
    &nbsp;&nbsp;
    <a href='baidusitemap_main.php?dopost=checkupdate'><u>���������</u></a>
    &nbsp;&nbsp;
<br />
<div style=\"padding:20px; color:#666\">
�����Ϣ��<br />
վ���ַ��<span style='color:black'><b>{$siteurl}</b></span><br />
����ύ�ĵ�ID��<span style='color:black'><b>{$setupmaxaid}</b></span>����ǰ�ĵ�����ID��<span style='color:black'><b>{$maxaid}</b></span><br />
������������ύ��<span style='color:black'><b>{$lastuptime_all}</b></span><br />
ȫ����������ύ��<span style='color:black'><b>{$lastuptime_inc}</b></span><br />
<hr/>
����˵����<br />
���ύ����������
�����ύ����Ƶ�ʽ�Ƶ����������һ����ȫ�������ύ��ɺ�ÿ�θ����������ݺ�������������ύ��<br />
�������ύȫ��������
���¶�ȫվ�İٶȵ�ͼ���������ύ��<br />
<span style=\"color:red\">ע������ύ����ܵȴ�ʱ��ϳ��������ĵȴ���</span><br />
</div>
  ";
    $msg = "<div style=\"line-height:36px;height:280px\">{$msg}</div><script type=\"text/javascript\">
function isGoUrl(url,msg)
{
	if(confirm(msg))
	{
		window.location.href=url;
	} else {
		return false;
	}
}
</script>";

    $wintitle = '�ύ�ٶȽṹ�����ݵ�ͼ������';
    $wecome_info = '�ٶȽṹ�����ݵ�ͼ::��������';
    $win = new OxWindow();
    $win->AddTitle($wintitle);
    $win->AddMsgItem($msg);
    $winform = $win->GetWindow('hand', '&nbsp;', false);
    $win->Display();
}

