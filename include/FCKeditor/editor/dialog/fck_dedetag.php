<?php 
require_once(dirname(__FILE__)."/../../../../dede/config.php");
require_once(dirname(__FILE__)."/../../../typelink.class.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv='Content-Type' content='text/html; charset=gb2312'>
<title>���ܱ����</title>
<script src="common/fck_dialog_common.js" type="text/javascript"></script>
<script language="JavaScript">
var dialog			= window.parent ;
var oEditor			= dialog.InnerDialogLoaded() ;

var FCK				= oEditor.FCK ;

window.onload = function()
{
	dialog.SetOkButton( true ) ;
	dialog.SetAutoSize( true ) ;
}

function ChangeListStyle(){
   var itxt = GetE("myinnertext");
   var myems = document.getElementsByName("liststyle");
   if(myems[0].checked) itxt.value = GetE("list1").innerHTML;
   else if(myems[1].checked) itxt.value = GetE("list2").innerHTML;
   else if(myems[2].checked) itxt.value = GetE("list3").innerHTML;
   else if(myems[3].checked) itxt.value = GetE("list4").innerHTML;
   itxt.value = itxt.value.replace("<BR>","<BR/>");
   itxt.value = itxt.value.toLowerCase();
}
function SelectCatalog(fname,vname,bt,channelid,pos,opall){
   if(document.all){
     var posLeft = window.event.clientY-100;
     var posTop = window.event.clientX-400;
   }
   else{
     var posLeft = 100;
     var posTop = 100;
   }
   if(!fname) fname = 'form1';
   if(!vname) vname = 'typeid';
   if(!bt) bt = 'selct';
   window.open("../../../../dede/catalog_tree.php?f="+fname+"&opall="+opall+"&v="+vname+"&bt="+bt+"&c="+channelid, "popUpSelCWin", "scrollbars=yes,resizable=yes,statebar=no,width=450,height=300,left="+posLeft+", top="+posTop);
}
function SelectArcList(fname){
   var posLeft = 10;
   var posTop = 10;
   window.open("../../../../dede/content_select_list.php?f="+fname, "selArcList", "scrollbars=yes,resizable=yes,statebar=no,width=700,height=500,left="+posLeft+", top="+posTop);
}
function DoSubmit(j){
	GetE('gettagOver').innerHTML = 'ģ���������ɣ�������ȷ������ť�ύ' ;
	document.form1.dopost.value = j;
	document.form1.submit();
}
function Ok(){
	FCK.InsertHtml(stafrm.document.getElementById("partcode").value);
	dialog.Cancel();
}
</script>
<base target="_self">
</head>
<body>
<center>
<span style="display:none" id="list1">
��[field:textlink/]([field:pubdate function=strftime('%m-%d',@me)/])<br/>
</span>
<span style="display:none" id="list2">
��[field:typelink/] [field:textlink/]<br/>
</span>
<span style="display:none" id="list3">
<table width='98%' border='0' cellspacing='2' cellpadding='0'>
   <tr><td align='center'>[field:imglink/]</td></tr>
   <tr><td align='center'>[field:textlink/]</td></tr>
</table>
</span>
<span style="display:none" id="list4">
<table width='100%' border='0' cellspacing='2' cellpadding='2'>
  <tr> 
    <td width='30%' rowspan='2' align='center'>[field:imglink/]</td>
    <td width='70%'><a href='[field:filename/]'>[field:title/]</a></td>
  </tr>
  <tr><td>[field:info/]</td></tr>
</table>
</span>
<table width="96%" border="0" cellpadding="1" cellspacing="1" align="center" class="tbtitle">
  <form action="../../../../../dede/mytag_tag_guide_ok.php" method="post" target="stafrm" name="form1">
  <input type="hidden" name="dopost" value="gettag"/>
  <tr> 
    <td height="165" valign="top" bgcolor="#FFFFFF"><table width="99%" border="0" align="right" cellpadding="0" cellspacing="0">
          <tr> 
            <td height="92" align="left"><table width="99%" border="0" cellspacing="0" cellpadding="0">
                <tr> 
                  <td width="25%" height="52"><img src="../../../../../dede/img/g_t2.gif" width="90" height="60"> 
                    <input name="liststyle"  type="radio" onClick="ChangeListStyle()" value="1" checked> 
                  </td>
                  <td width="25%"><img src="../../../../../dede/img/g_t1.gif" width="90" height="60"> 
                  <input type="radio"  onClick="ChangeListStyle()" name="liststyle" value="2"></td>
                  <td width="25%"><img src="../../../../../dede/img/g_t3.gif" width="90" height="60"> 
                    <input type="radio"  onClick="ChangeListStyle()" name="liststyle" value="3"></td>
                  <td><img src="../../../../../dede/img/g_t4.gif" width="90" height="60"> <input type="radio"  onClick="ChangeListStyle()" name="liststyle" value="4"></td>
                </tr>
              </table></td>
          </tr>
          <tr> 
            <td height="18" align="left">&nbsp;&nbsp;������Ŀ��              
              <?php
       $tl = new TypeLink(0);
       $typeOptions = $tl->GetOptionArray(0,$cuserLogin->getUserChannel(),0,1);
       echo "<select name='typeid' style='width:284'>\r\n";
       echo "<option value='0' selected>������Ŀ...</option>\r\n";
       echo $typeOptions;
       echo "</select>";
		?>             </td>
          </tr>
          <tr> 
            <td height="18" align="left"> &nbsp;&nbsp;�޶�Ƶ���� 
              <?php
     echo "<select name='channel' style='width:100px'>\r\n";
     echo "<option value='0' selected>����Ƶ��...</option>\r\n";
     $tl->dsql->SetQuery("Select id,typename From #@__channeltype where id>0");
	   $tl->dsql->Execute();
	   while($row = $tl->dsql->GetObject())
	   {
	      echo "<option value='{$row->id}'>{$row->typename}</option>\r\n";
	   }
       echo "</select>";
		?>
              ���������ԣ� 
              <?php
       echo "<select name='att' style='width:100px'>\r\n";
       echo "<option value='0' selected>����...</option>\r\n";
       $tl->dsql->SetQuery("Select * From #@__arcatt");
	   $tl->dsql->Execute();
	   while($row = $tl->dsql->GetObject())
	   {
	      echo "<option value='{$row->att}'>{$row->attname}</option>\r\n";
	   }
       echo "</select>";
		?>             </td>
          </tr>
          <tr> 
            <td height="18" align="left">&nbsp;&nbsp;���������� 
              <input name="row" type="text" id="row" value="10" size="2">
              ����ʾ������ 
              <input name="col" type="text" id="col" value="1" size="2">
              �����ⳤ�ȣ� 
              <input name="titlelen" type="text" id="titlelen" value="24" size="2"> �ֽ�</td>
          </tr>
          <tr> 
            <td height="18" align="left"> &nbsp;&nbsp;�߼�ɸѡ�� 
              <input name="types[]" type="checkbox" id="type[]" value="image" >
              ������ͼ 
              <input name="types[]" type="checkbox" id="type[]" value="commend" >
              �Ƽ� 
              <input name="types[]" type="checkbox" id="type[]" value="spec" >
              ר��<br /> &nbsp;&nbsp;�ؼ��֣� 
              <input name="keyword" type="text" id="keyword" size="30">
              ��&quot;,&quot;���ŷֿ���</td>
          </tr>
          <tr> 
            <td height="18" align="left">&nbsp;&nbsp;����˳�� 
              <select name="orderby" id="orderby" style="width:120">
                <option value="sortrank">�ö�Ȩ��ֵ</option>
                <option value="pubdate" selected>����ʱ��</option>
                <option value="senddate">¼��ʱ��</option>
                <option value="click">�����</option>
                <option value="id">�ĵ��ɣ�</option>
                <option value="lastpost">�������ʱ��</option>
                <option value="postnum">��������</option>
                <option value="rand">�����ȡ</option>
              </select>
              �� 
              <input name="order" type="radio"   value="desc" checked>
              �ɸߵ��� 
              <input type="radio" name="order"  value="asc">
              �ɵ͵���</td>
          </tr>
          <tr> 
            <td height="18" align="left">&nbsp;&nbsp;�ĵ�����ʱ�䣺 
              <input name="subday" type="text" id="subday" value="0" size="6">
              ������ ��0 ��ʾ���ޣ�</td>
          </tr>
          <tr>
            <td height="18" align="left">��ȡ�ض��ĵ��� <input name="selarc" type="button" id="selarc" value="ѡ��ڵ�����" style="width:100" onClick="SelectArcList('form1.arcid');">&nbsp;&nbsp;<br />
            <textarea name="arcid" rows="3" id="arcid" style="width:90%"></textarea>
            </td>
          </tr>
          <tr> 
            <td height="18" align="left">&nbsp;&nbsp;������¼��ʽ(InnerText)��</td>
          </tr>
          <tr>
            <td height="19" align="left"><textarea name="innertext" cols="80" rows="2" id="myinnertext">��[field:textlink/]([field:pubdate function=strftime('%m-%d',@me)/])<br/></textarea></td>
          </tr>
          <tr> 
            <td height="25" align="left">
            	<input name="Submit1" type="button" id="Submit1" onClick="DoSubmit('gettag')" value="����ģ����ñ��" class="inputbut">
            	<span id="gettagOver"></span>
              </td>
          </tr>
        </table></td>
  </tr>
</form>
  <tr height="1" style="display:none"> 
      <td height="1" valign="top" bgcolor="#FFFFFF">
        <iframe name="stafrm" frameborder="0" id="stafrm" width="100%" height="100%"></iframe>
	  </td>
  </tr>
</table>
</center>
</body>
</html>
