<?php
require_once(dirname(__FILE__).'/../../../dialog/config.php');
require_once(dirname(__FILE__).'/../../../image.func.php');
if(empty($dopost)) $dopost = '';
if(empty($imgwidthValue)) $imgwidthValue = 400;
if(empty($imgheightValue)) $imgheightValue = 300;
if(empty($urlValue)) $urlValue = '';
if(empty($imgsrcValue)) $imgsrcValue = '';
if(empty($imgurl)) $imgurl = '';
if(empty($dd)) $dd = '';
$imgHtml = '';

if($dopost=='upload')
{
	$imgHtml = "<center>\r\n";
	$oknum = 0;
	for($i=1; $i <= $totalform; $i++)
	{
		$imgfile = ${'imgfile'.$i};
		if(!is_uploaded_file($imgfile))
		{
			continue;
		}
		else
		{
			$imgfile_name = ${'imgfile'.$i.'_name'};
			$imgfile_type = ${'imgfile'.$i.'_type'};
		}
	
		if(!eregi("\.(jpg|gif|png|bmp)$",$imgfile_name)) {
			continue;
		}
	
		$sparr = Array('image/pjpeg','image/jpeg','image/gif','image/png','image/xpng','image/wbmp');
		$imgfile_type = strtolower(trim($imgfile_type));
		if(!in_array($imgfile_type,$sparr)) {
			continue;
		}
	
		$nowtme = time();
		$y = MyDate('ymd',$nowtme);
		$filename = $cuserLogin->getUserID().'_'.MyDate('His',$nowtme).'_'.$i;
		if(!is_dir($cfg_basedir.$cfg_medias_dir."/$y"))
		{
			MkdirAll($cfg_basedir.$cfg_medias_dir."/$y",0777);
			CloseFtp();
		}
	
		$fs = explode('.',$imgfile_name);
		if(eregi("php|asp|pl|shtml|jsp|cgi",$fs[count($fs)-1])) {
			continue;
		}
	
		$bfilename = $cfg_medias_dir."/$y/".$filename.".".$fs[count($fs)-1];
		$litfilename = $cfg_medias_dir."/$y/".$filename."_lit.".$fs[count($fs)-1];
		$dbbigfile = $filename.".".$fs[count($fs)-1];
		$dblitfile = $filename."_lit.".$fs[count($fs)-1];
		$fullfilename = $cfg_basedir.$bfilename;
		$full_litfilename = $cfg_basedir.$litfilename;
	
		if(file_exists($fullfilename)) {
			ShowMsg("本目录已经存在同名的文件，请更改！","-1");
			exit();
		}
	
		move_uploaded_file($imgfile,$fullfilename) or die("上传文件到 $fullfilename 失败！");
			if($cfg_remote_site=='Y' && $remoteuploads == 1)
			{
				//分析远程文件路径
				$remotefile = str_replace(DEDEROOT, '', $fullfilename);
				//$localfile = '../..'.$remotefile;
				$localfile = $fullfilename;
				$remotedir = preg_replace('/[^\/]*\.(jpg|gif|bmp|png)/', '', $remotefile);
				$ftp->rmkdir($remotedir);
				$ftp->upload($localfile, $remotefile);
			}
		if($dd=='yes')
		{
			copy($fullfilename,$full_litfilename);
			if(in_array($imgfile_type,$cfg_photo_typenames)) {
				ImageResize($full_litfilename,$w,$h);
			}
			$urlValue = $bfilename;
			$imgsrcValue = $litfilename;
			$info = '';
			$sizes = getimagesize($full_litfilename,$info);
			$imgwidthValue = $sizes[0];
			$imgheightValue = $sizes[1];
			$imgsize = filesize($full_litfilename);
			$inquery = "INSERT INTO `#@__uploads`(title,url,mediatype,width,height,playtime,filesize,uptime,mid)
       VALUES ('小图{$dblitfile}','$imgsrcValue','1','$imgwidthValue','$imgheightValue','0','{$imgsize}','{$nowtme}','".$cuserLogin->getUserID()."');
     	";
			$dsql->ExecuteNoneQuery($inquery);
		}
		else
		{
			$imgsrcValue = $bfilename;
			$urlValue = $bfilename;
			$info = '';
			$sizes = getimagesize($fullfilename,$info);
			$imgwidthValue = $sizes[0];
			$imgheightValue = $sizes[1];
			$imgsize = filesize($fullfilename);
		}
	
		$bsizes = getimagesize($fullfilename,$info);
		$bimgwidthValue = $bsizes[0];
		$bimgheightValue = $bsizes[1];
		$bimgsize = filesize($fullfilename);
	
		$inquery = "INSERT INTO `#@__uploads`(title,url,mediatype,width,height,playtime,filesize,uptime,mid)
    	VALUES ('{$dbbigfile}','$bfilename','1','$bimgwidthValue','$bimgheightValue','0','{$bimgsize}','{$nowtme}','".$cuserLogin->getUserID()."');
  	";
		$dsql->ExecuteNoneQuery($inquery);
		if($cfg_remote_site=='Y' && $remoteuploads == 1) $urlValue = $remoteupUrl.$urlValue;
		if(in_array($imgfile_type,$cfg_photo_typenames))
		{
			WaterImg($fullfilename,'up');
		}
		
		$oknum++;
		
		$imgHtml .=  "<img src='$imgsrcValue'/></a>\r\n";
		
	}
	$imgHtml .= "</center>\r\n";
}
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Image Properties</title>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<meta name="robots" content="noindex, nofollow" />
	<script src="common/fck_dialog_common.js" type="text/javascript"></script>
	<script src="fck_image/fck_image.js" type="text/javascript"></script>
	<script type="text/javascript">
document.write( FCKTools.GetStyleHtml( GetCommonDialogCss() ) ) ;
	</script>
</head>
<body scroll="no" style="overflow: hidden">
	<div id="divInfo">
		<table cellspacing="1" cellpadding="1" border="0" width="100%" height="100%">
			<tr>
				<td>
					<table cellspacing="0" cellpadding="0" width="100%" border="0">
<form enctype="multipart/form-data" name="form1" id="form1" method="post">
<input type="hidden" name="dopost" value="upload">
<input type="hidden" name="himgheight" value="<?php echo $imgheightValue?>">
<input type="hidden" name="himgwidth" value="<?php echo $imgwidthValue?>">
<input type="hidden" name="totalform" id="totalform" value="1">
						<tr>
							<td width="100%">
								<span fcklang="DlgImgURL">URL</span>
							</td>
							<td id="tdBrowse" style="display: none" nowrap="nowrap" rowspan="2">
								&nbsp;
								<input id="btnBrowse" onClick="BrowseServer('form1.txtUrl');" type="button" value="Browse Server"
									fcklang="DlgBtnBrowseServer" />
							</td>
						</tr>
						<tr>
							<td valign="top">
								<input id="txtUrl" value="<?php echo $urlValue?>" style="width: 100%" type="text" onBlur="UpdatePreview();" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
					<span fcklang="DlgImgAlt">Short Description</span><br />
					<input id="txtAlt" style="width: 100%" type="text" /><br />
				</td>
			</tr>
			<tr height="100%">
				<td valign="top">
					<table cellspacing="0" cellpadding="0" width="100%" border="0" height="100%">
						<tr>
							<td valign="top">
								<br />
								<table cellspacing="0" cellpadding="0" border="0">
									<tr>
										<td nowrap="nowrap">
											<span fcklang="DlgImgWidth">Width</span>&nbsp;</td>
										<td>
											<input type="text" size="3" id="txtWidth" value="<?php echo $imgwidthValue?>" onKeyUp="OnSizeChanged('Width',this.value);" /></td>
										<td rowspan="2">
											<div id="btnLockSizes" class="BtnLocked" onMouseOver="this.className = (bLockRatio ? 'BtnLocked' : 'BtnUnlocked' ) + ' BtnOver';"
												onmouseout="this.className = (bLockRatio ? 'BtnLocked' : 'BtnUnlocked' );" title="Lock Sizes"
												onclick="SwitchLock(this);">
											</div>
										</td>
										<td rowspan="2">
											<div id="btnResetSize" class="BtnReset" onMouseOver="this.className='BtnReset BtnOver';"
												onmouseout="this.className='BtnReset';" title="Reset Size" onClick="ResetSizes();">
											</div>
										</td>
									</tr>
									<tr>
										<td nowrap="nowrap">
											<span fcklang="DlgImgHeight">Height</span>&nbsp;</td>
										<td>
											<input type="text" size="3" id="txtHeight" value="<?php echo $imgheightValue?>" onKeyUp="OnSizeChanged('Height',this.value);" /></td>
									</tr>
								</table>
								<br />
								<table cellspacing="0" cellpadding="0" border="0">
									<tr>
										<td nowrap="nowrap">
											<span fcklang="DlgImgBorder">Border</span>&nbsp;</td>
										<td>
											<input type="text" size="2" value="0" id="txtBorder" onKeyUp="UpdatePreview();" /></td>
									</tr>
									<tr>
										<td nowrap="nowrap">
											<span fcklang="DlgImgHSpace">HSpace</span>&nbsp;</td>
										<td>
											<input type="text" size="2" id="txtHSpace" onKeyUp="UpdatePreview();" /></td>
									</tr>
									<tr>
										<td nowrap="nowrap">
											<span fcklang="DlgImgVSpace">VSpace</span>&nbsp;</td>
										<td>
											<input type="text" size="2" id="txtVSpace" onKeyUp="UpdatePreview();" /></td>
									</tr>
									<tr>
										<td nowrap="nowrap">
											<span fcklang="DlgImgAlign">Align</span>&nbsp;</td>
										<td>
											<select id="cmbAlign" onChange="UpdatePreview();">
												<option value="" selected="selected"></option>
												<option fcklang="DlgImgAlignLeft" value="left">Left</option>
												<option fcklang="DlgImgAlignAbsBottom" value="absBottom">Abs Bottom</option>
												<option fcklang="DlgImgAlignAbsMiddle" value="absMiddle">Abs Middle</option>
												<option fcklang="DlgImgAlignBaseline" value="baseline">Baseline</option>
												<option fcklang="DlgImgAlignBottom" value="bottom">Bottom</option>
												<option fcklang="DlgImgAlignMiddle" value="middle">Middle</option>
												<option fcklang="DlgImgAlignRight" value="right">Right</option>
												<option fcklang="DlgImgAlignTextTop" value="textTop">Text Top</option>
												<option fcklang="DlgImgAlignTop" value="top">Top</option>
											</select>
										</td>
									</tr>
								</table>
							</td>
							<td>
								&nbsp;&nbsp;&nbsp;</td>
							<td width="100%" valign="top">
								<table cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed">
									<tr>
										<td>
											<span fcklang="DlgImgPreview">Preview</span></td>
									</tr>
									<tr>
										<td valign="top">
											<iframe class="ImagePreviewArea" src="fck_image/fck_image_preview.html" frameborder="0"
												marginheight="0" marginwidth="0"></iframe>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	<div id="divUpload" style="display: none">
				<span fckLang="DlgLnkUpload">Upload</span><br />
				<span id="DefUploadInput"><input id="imgfile1" style="WIDTH: 100%" type="file" size="40" name="imgfile1" /><br /></span>
				<div id='moreupload'></div>
        <input type="checkbox" name="dd" value="yes"><span fcklang="DlgImagesThumb">Create Images Thumb</span>&nbsp;
			<span fcklang="DlgImgWidth">Width</span>&nbsp;
              <input name="w" type="text" value="<?php echo $cfg_ddimg_width?>" size="3">
		   <span fcklang="DlgImgHeight">Height</span>&nbsp;
              <input name="h" type="text" value="<?php echo $cfg_ddimg_height?>" size="3">
				<br />
				<input id="picSubmit" name="picSubmit" type="submit" value="Send it to the Server" fckLang="DlgLnkBtnUpload" /><br />
	</div>
	<div id="divLink" style="display: none">
		<table cellspacing="1" cellpadding="1" border="0" width="100%">
			<tr>
				<td>
					<div>
						<span fcklang="DlgLnkURL">URL</span><br />
						<input id="txtLnkUrl" name="txtLnkUrl" value="" style="width: 100%" type="text" onBlur="UpdatePreview();" />
					</div>
					<div id="divLnkBrowseServer" align="right">
						<input type="button" id="CopyLinkThis" value="Copy Images Url" fckLang="DlgCopyImagesUrl" onClick="CopyLink();" />
						<input type="button" value="Browse Server" fcklang="DlgBtnBrowseServer" onClick="BrowseServer('form1.txtLnkUrl');" />
					</div>
					<div>
						<span fcklang="DlgLnkTarget">Target</span><br />
						<select id="cmbLnkTarget">
							<option value="" fcklang="DlgGenNotSet" selected="selected">&lt;not set&gt;</option>
							<option value="_blank" fcklang="DlgLnkTargetBlank">New Window (_blank)</option>
							<option value="_top" fcklang="DlgLnkTargetTop">Topmost Window (_top)</option>
							<option value="_self" fcklang="DlgLnkTargetSelf">Same Window (_self)</option>
							<option value="_parent" fcklang="DlgLnkTargetParent">Parent Window (_parent)</option>
						</select>
					</div>
				</td>
			</tr>
		</table>
	</div>
	<div id="divAdvanced" style="display: none">
		<table cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
			<tr>
				<td valign="top" width="50%">
					<span fcklang="DlgGenId">Id</span><br />
					<input id="txtAttId" style="width: 100%" type="text" />
				</td>
				<td width="1">
					&nbsp;&nbsp;</td>
				<td valign="top">
					<table cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
						<tr>
							<td width="60%">
								<span fcklang="DlgGenLangDir">Language Direction</span><br />
								<select id="cmbAttLangDir" style="width: 100%">
									<option value="" fcklang="DlgGenNotSet" selected="selected">&lt;not set&gt;</option>
									<option value="ltr" fcklang="DlgGenLangDirLtr">Left to Right (LTR)</option>
									<option value="rtl" fcklang="DlgGenLangDirRtl">Right to Left (RTL)</option>
								</select>
							</td>
							<td width="1%">
								&nbsp;&nbsp;</td>
							<td nowrap="nowrap">
								<span fcklang="DlgGenLangCode">Language Code</span><br />
								<input id="txtAttLangCode" style="width: 100%" type="text" />&nbsp;
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td colspan="3">&nbsp;
					</td>
			</tr>
			<tr>
				<td colspan="3">
					<span fcklang="DlgGenLongDescr">Long Description URL</span><br />
					<input id="txtLongDesc" style="width: 100%" type="text" />
				</td>
			</tr>
			<tr>
				<td colspan="3">&nbsp;
					</td>
			</tr>
			<tr>
				<td valign="top">
					<span fcklang="DlgGenClass">Stylesheet Classes</span><br />
					<input id="txtAttClasses" style="width: 100%" type="text" />
				</td>
				<td>
				</td>
				<td valign="top">
					&nbsp;<span fcklang="DlgGenTitle">Advisory Title</span><br />
					<input id="txtAttTitle" style="width: 100%" type="text" />
				</td>
			</tr>
		</table>
		<span fcklang="DlgGenStyle">Style</span><br />
		<input id="txtAttStyle" style="width: 100%" type="text" />
	</div>
	<div id="divMultiple" style="display:none">
<table width="100%" border="0">
	<tr>
		<td nowrap='1'>
		<fieldset>
			<legend>上传后得到的图片HTML信息</legend>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td nowrap='1'>
					<textarea name='imghtml' id="imghtml" style='width:100%;height:350px;'></textarea>
					</td>
				</tr>
			</table>
			</fieldset>
		</td>
	</tr>
</table>
	</div>
		</form>
</body>
</html>