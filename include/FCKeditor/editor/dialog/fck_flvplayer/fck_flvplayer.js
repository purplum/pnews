/*
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2003-2008 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * Scripts related to the Flash dialog window (see fck_flash.html).
 */

var dialog		= window.parent ;
var oEditor		= dialog.InnerDialogLoaded() ;
var FCK			= oEditor.FCK ;
var FCKLang		= oEditor.FCKLang ;
var FCKConfig	= oEditor.FCKConfig ;
var FCKTools	= oEditor.FCKTools ;

//#### Dialog Tabs

// Set the dialog tabs.
dialog.AddTab( 'Info', oEditor.FCKLang.DlgInfoTab ) ;
dialog.AddTab( 'Advanced', oEditor.FCKLang.DlgAdvancedTag ) ;
dialog.AddTab( 'Colors', '样式' ) ;

// Function called when a dialog tag is selected.
function OnDialogTabChange( tabCode )
{
	ShowE('divInfo'		, ( tabCode == 'Info' ) ) ;
	ShowE('divAdvanced'	, ( tabCode == 'Advanced' ) ) ;
	ShowE('divColors'	, ( tabCode == 'Colors' ) ) ;
}

// Get the selected flash embed (if available).
var oFakeImage = dialog.Selection.GetSelectedElement() ;
var oEmbed ;

if ( oFakeImage )
{
	if ( oFakeImage.tagName == 'IMG' && oFakeImage.getAttribute('_fckflvplayer') )
		oEmbed = FCK.GetRealElement( oFakeImage ) ;
	else
		oFakeImage = null ;
}

window.onload = function()
{
	// Translate the dialog box texts.
	oEditor.FCKLanguageManager.TranslatePage(document) ;

	GetE('txtLink').value	=	FCKConfig.FlvPlayerLink ;
	GetE('txtImage').value	=	FCKConfig.FlvPlayerImage ;
	GetE('txtLogo').value	=	FCKConfig.FlvPlayerLogo ;
	GetE('txtSkins').value	=	FCKConfig.FlvPlayerSkins ;
	GetE('txtWidth').value	=	FCKConfig.MediaPlayerWidth ;
	GetE('txtHeight').value	=	FCKConfig.MediaPlayerHeight ;

	// Load the selected element information (if any).
	LoadSelection() ;

	// Show/Hide the "Browse Server" button.
	GetE('tdBrowse').style.display = FCKConfig.FlashBrowser	? '' : 'none' ;
	GetE('tdBrowseImage').style.display = FCKConfig.ImageBrowser	? '' : 'none' ;
	GetE('tdBrowseLogo').style.display = FCKConfig.ImageBrowser	? '' : 'none' ;
	GetE('tdBrowseSkins').style.display = FCKConfig.FlashBrowser	? '' : 'none' ;

	dialog.SetAutoSize( true ) ;

	// Activate the "OK" button.
	dialog.SetOkButton( true ) ;

	SelectField( 'txtUrl' ) ;
}

function FindSelected(A, B){
	var re = GetE(A) ;
	for(var i = 0; i < re.length; i++){
		if(re.options(i).value	== B)
			 re.selectedIndex = i ;
	}
}

function LoadSelection()
{
	if ( ! oEmbed ) return ;
	var sParam = getURLParams();

	GetE('txtUrl').value    = sParam['file'] ;
	GetE('txtWidth').value  = GetAttribute( oEmbed, 'width', '' ) ;
	GetE('txtHeight').value = GetAttribute( oEmbed, 'height', '' ) ;

	// Get Advances Attributes
	GetE('chkFullscreen').checked		= GetAttribute( oEmbed, 'allowfullscreen', 'true' ) == 'true' ;
	GetE('chkAutoPlay').checked	= sParam['autostart'] ;
	GetE('chkMute').checked	= sParam['mute'] ;
	GetE('txtVolume').value	= sParam['volume'] ;

	FindSelected('selRepeat', sParam['repeat']) ;
	FindSelected('selStretching', sParam['stretching']) ;
	FindSelected('cmbControlbar', sParam['controlbar']) ;

	GetE('txtBgColor').value	= sParam['backcolor'] ? sParam['backcolor'] : '' ;
	GetE('txtFrontColor').value	= sParam['frontcolor']  ? sParam['frontcolor'] : '';
	GetE('txtLightColor').value	= sParam['lightcolor']  ? sParam['lightcolor'] : '';
	GetE('txtScreenColor').value	= sParam['screencolor']  ? sParam['screencolor'] : '';
	if(/\.xml($|#|\?)/i.test(sParam['file'])){
		GetE('chkFileType').checked = true ;
		GetE('DlgURL').innerHTML = '播放列表地址';
		GetE('selPlaylist').disabled = false ;
		FindSelected('selPlaylist', sParam['playlist']) ;
		chgPlaylistSize() ;
		GetE('txtPlaylistSize').value = sParam['playlistsize'] ;
	}
	if(sParam['link']){
		GetE('txtLink').disabled = false ;
		GetE('chkShowLink').checked = true ;
		GetE('txtLink').value = sParam['link'] ;
	}
	if(sParam['image']){
		GetE('btnBrowseImage').disabled = GetE('txtImage').disabled = false ;
		GetE('chkShowImage').checked = true ;
		GetE('txtImage').value = sParam['image'] ;
	}
	if(sParam['logo']){
		GetE('btnBrowseLogo').disabled = GetE('txtLogo').disabled = false ;
		GetE('chkShowLogo').checked = true ;
		GetE('txtLogo').value = sParam['logo'] ;
	}
	if(sParam['skin']){
		GetE('btnBrowseSkins').disabled = GetE('txtSkins').disabled = false ;
		GetE('chkShowSkins').checked = true ;
		GetE('txtSkins').value = sParam['skin'] ;
	}
}

function getURLParams(){
	var sParams = new Object() ;
	var sParam = GetAttribute( oEmbed, 'flashvars', '' ) ;
	if(sParam != ''){
		var sParam = sParam.split('&') ;
		for ( var i = 0 ; i < sParam.length ; i++ ){
			var aParam = sParam[i].split('=') ;
			sParams[ aParam[0] ] = aParam[1] ;
		}
	}
	return sParams ;
}

function SelectColor(A)
{
	oEditor.FCKDialog.OpenDialog(
		'FCKDialog_Color',
		oEditor.FCKLang.DlgColorTitle,
		'dialog/fck_colorselector.html',
		400,
		330,
		function(color){ GetE(A).value = color ;},
		window
	) ;
}

function chgPlaylistSize(){
	var re = GetE('selPlaylist').value ;
	if(re == 'bottom'){
		GetE('txtPlaylistSize').disabled = false ;
		GetE('DlgPlaylistSize').innerHTML = '列表高度' ;
		GetE('txtPlaylistSize').value = 60 ;
	}else if(re == 'right'){
		GetE('txtPlaylistSize').disabled = false ;
		GetE('DlgPlaylistSize').innerHTML = '列表宽度' ;
		GetE('txtPlaylistSize').value = 60 ;
	}else{
		GetE('txtPlaylistSize').disabled = true ;
		GetE('DlgPlaylistSize').innerHTML = '列表大小' ;
		GetE('txtPlaylistSize').value = '' ;
	}
}

//#### The OK button was hit.
function Ok()
{
	if ( GetE('txtUrl').value.length == 0 )
	{
		dialog.SetSelectedTab( 'Info' ) ;
		GetE('txtUrl').focus() ;

		alert( oEditor.FCKLang.DlgAlertUrl ) ;

		return false ;
	}

	oEditor.FCKUndo.SaveUndoStep() ;
	if ( !oEmbed )
	{
		oEmbed		= FCK.EditorDocument.createElement( 'EMBED' ) ;
		oFakeImage  = null ;
	}
	UpdateEmbed( oEmbed ) ;

	if ( !oFakeImage )
	{
		oFakeImage	= oEditor.FCKDocumentProcessor_CreateFakeImage( 'FCK__Flash', oEmbed ) ;
		oFakeImage.setAttribute( '_fckflvplayer', 'true', 0 ) ;
		oFakeImage	= FCK.InsertElement( oFakeImage ) ;
	}

	oEditor.FCKEmbedAndObjectProcessor.RefreshView( oFakeImage, oEmbed ) ;

	return true ;
}

function UpdateEmbed( e )
{

	SetAttribute( e, 'src', FCKConfig.FlvPlayerPath ) ;
	SetAttribute( e, "width" , GetE('txtWidth').value ) ;
	SetAttribute( e, "height", GetE('txtHeight').value ) ;
	SetAttribute( e, 'allowfullscreen'	, GetE('chkFullscreen').checked ? 'true' : 'false' ) ;
	SetAttribute( e, 'allowscriptaccess'	, 'always' ) ;
	SetAttribute( e, 'bgcolor'	, GetE('txtBgColor').value ? GetE('txtBgColor').value : '#FFFFFF' ) ;

	// Advances Attributes
	var flvars = 'file=' + GetE('txtUrl').value ;
	if(GetE('chkFileType').checked && GetE('selPlaylist').value){
		flvars += '&playlist=' + GetE('selPlaylist').value ;
		if(GetE('selPlaylist').value == 'bottom' || GetE('selPlaylist').value == 'right')
			flvars += '&playlistsize=' + GetE('txtPlaylistSize').value ;
	}
	if(GetE('chkAutoPlay').checked) flvars += '&autostart=true' ;
	if(GetE('chkShowLink').checked) flvars += '&link=' + GetE('txtLink').value ;
	if(GetE('chkShowImage').checked) flvars += '&image=' + GetE('txtImage').value ;
	if(GetE('chkShowLogo').checked) flvars += '&logo=' + GetE('txtLogo').value ;
	if(GetE('chkMute').checked) flvars += '&mute=' + GetE('chkMute').checked ;
	if(GetE('txtVolume').value) flvars += '&volume=' + GetE('txtVolume').value ;
	if(GetE('selRepeat').value) flvars += '&repeat=' + GetE('selRepeat').value ;
	if(GetE('cmbControlbar').value) flvars += '&controlbar=' + GetE('cmbControlbar').value ;
	if(GetE('selStretching').value) flvars += '&stretching=' + GetE('selStretching').value ;
	if(GetE('txtBgColor').value) flvars += '&backcolor=' + GetE('txtBgColor').value ;
	if(GetE('txtFrontColor').value) flvars += '&frontcolor=' + GetE('txtFrontColor').value ;
	if(GetE('txtLightColor').value) flvars += '&lightcolor=' + GetE('txtLightColor').value ;
	if(GetE('txtScreenColor').value) flvars += '&screencolor=' + GetE('txtScreenColor').value ;

	if(GetE('chkShowSkins').checked) flvars += '&skin=' + GetE('txtSkins').value ;

	SetAttribute( e, 'flashvars', flvars ) ;

}

var ePreview ;

function SetPreviewElement( previewEl )
{
	ePreview = previewEl ;

	if ( GetE('txtUrl').value.length > 0 )
		UpdatePreview() ;
}

function BrowseServer(A)
{
	OpenFileBrowser(
		FCKConfig.FlashBrowserURL + '?f=' + A,
		FCKConfig.FlashBrowserWindowWidth,
		FCKConfig.FlashBrowserWindowHeight ) ;
}

function BrowseImageServer(A)
{
	OpenFileBrowser(
		FCKConfig.ImageBrowserURL + '?f=' + A,
		FCKConfig.ImageBrowserWindowWidth,
		FCKConfig.ImageBrowserWindowHeight ) ;
}

function ChangShow(B){
	GetE('btnBrowse' + B).disabled = GetE('txt' + B).disabled = !GetE('chkShow' + B).checked ;
}
