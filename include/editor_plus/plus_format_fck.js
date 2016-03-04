/*******************************************************************************
* KindEditor 3.2 ÔöÇ¿°æ for DedeCMS V5.3.1 / V5.5 
* 
* ÕûºÏ£ºÐ¡ÃÔºý
* ÑÝÊ¾µØÖ·£ºhttp://hezu.lanrentuku.com/kindeditor-demo/  

* ±¾³ÌÐòÔ­Ê¼´úÂëÓÉ ÍøÂç±à¼­Ö®¼Ò(www.eastit.cn)Ìá¹© 
*
* ×ðÖØ×÷ÕßÀÍ¶¯£¬×ªÔØÇë±£ÁôÒÔÉÏÐÅÏ¢
*******************************************************************************/


//ÉèÖÃ±à¼­Æ÷ÖÐÄÚÈÝ
function SetContents(codeStr){
   var oEditor = FCKeditorAPI.GetInstance(content) ;
   oEditor.SetHTML(codeStr) ;
}
 
// »ñÈ¡±à¼­Æ÷ÖÐHTMLÄÚÈÝ
function getEditorHTMLContents(EditorName) { 
    var oEditor = FCKeditorAPI.GetInstance(EditorName); 
    return(oEditor.GetXHTML(true)); 
}
// »ñÈ¡±à¼­Æ÷ÖÐÎÄ×ÖÄÚÈÝ
function getEditorTextContents(EditorName) { 
    var oEditor = FCKeditorAPI.GetInstance(EditorName); 
    return(oEditor.EditorDocument.body.innerText); 
}
// ÉèÖÃ±à¼­Æ÷ÖÐÄÚÈÝ
function SetEditorContents(EditorName, ContentStr) { 
    var oEditor = FCKeditorAPI.GetInstance(EditorName) ; 
    oEditor.SetHTML(ContentStr) ; 
}

//Ïò±à¼­Æ÷²åÈëÖ¸¶¨´úÂë
function insertHTMLToEditor(content,codeStr){
   var oEditor = FCKeditorAPI.GetInstance(content);
   if (oEditor.EditMode==FCK_EDITMODE_WYSIWYG){
     oEditor.InsertHtml(codeStr);
   }else{
     return false;
   }
}



//¸ñÊ½»¯
function FormatText(bodyname) {
   var myeditor = FCKeditorAPI.GetInstance(bodyname);
   if (myeditor.EditMode==FCK_EDITMODE_WYSIWYG){
        var temps = new Array();

        isPart = false; //ÔÝÊ±ÎÞ·¨ÊµÏÖ¾Ö²¿¸ñÊ½»¯
        if (!isPart) {
            var imgs = FCKeditorAPI.GetInstance(bodyname).EditorDocument.images;
            if (imgs != null && imgs.length > 0) {
                for (j = 0; j < imgs.length; j++) {
                    var t = document.createElement("IMG");
                    t.alt = imgs[j].alt;
                    t.src = imgs[j].src;
                    t.width = imgs[j].width;
                    t.height = imgs[j].height;
                    t.align = imgs[j].align;
                    temps[temps.length] = t;
                }
                var formatImgCount = 0;
                for (j = 0; j < imgs.length;) {
                    imgs[j].outerHTML = "#FormatImgID_" + formatImgCount + "#";
                    formatImgCount++;
                }
            }
			var strongarray	= new Array();
			var strongcount = 0;
			for(var i=0;i<myeditor.EditorDocument.body.getElementsByTagName('b').length;i++){
				strongarray[strongcount]	= myeditor.EditorDocument.body.getElementsByTagName('b')[i].innerText.trim();
				myeditor.EditorDocument.body.getElementsByTagName('b')[i].innerHTML	= "#FormatStrongID_" + strongcount + "#";
				strongcount++;
			}

			for(var i=0;i<myeditor.EditorDocument.body.getElementsByTagName('strong').length;i++){
				strongarray[strongcount]	= myeditor.EditorDocument.body.getElementsByTagName('strong')[i].innerText.trim();
				myeditor.EditorDocument.body.getElementsByTagName('strong')[i].innerHTML	= "#FormatStrongID_" + strongcount + "#";
				strongcount++;
			}

            var html = processFormatText(myeditor.EditorDocument.body.innerText);
            if (temps != null && temps.length > 0) {
                for (j = 0; j < temps.length; j++) {
                    var imghtml = "<p align=\"center\"><img src=\"" + temps[j].src + "\" alt=\"" + temps[j].alt + "\" width=\"" + temps[j].width + "\" height=\"" + temps[j].height + "\" align=\"" + temps[j].align + "\" border=\"0\"></p>";
                    html = html.replace("#FormatImgID_" + j + "#", imghtml);
                }
            }

			for(var i=0;i<strongcount;i++){
				html = html.replace("#FormatStrongID_" + i + "#", "<strong>"+strongarray[i]+"</strong>");
			}
			
			while(html.indexOf("</p></p>")!=-1)	html=html.replace("</p></p>","</p>");
			while(html.indexOf('<p><p align="center">')!=-1)	html=html.replace('<p><p align="center">','<p align="center">');

			SetEditorContents(bodyname, html);
			
        } else {

        }
   }else{
		alert('±ØÐëÔÚÉè¼ÆÄ£Ê½ÏÂ²Ù×÷£¡');
   }
}

//¸ñÊ½»¯Í¼Æ¬¸ñÊ½
function FormatImages(bodyname) {
   var myeditor = FCKeditorAPI.GetInstance(bodyname);
   if (myeditor.EditMode==FCK_EDITMODE_WYSIWYG){
        var temps = new Array();

        isPart = false; //ÔÝÊ±ÎÞ·¨ÊµÏÖ¾Ö²¿¸ñÊ½»¯
        if (!isPart) {
            var imgs = FCKeditorAPI.GetInstance(bodyname).EditorDocument.images;
            if (imgs != null && imgs.length > 0) {
                for (j = 0; j < imgs.length; j++) {
                    var t = document.createElement("IMG");
                    t.alt = imgs[j].alt;
                    t.src = imgs[j].src;
                    t.width = imgs[j].width;
                    t.height = imgs[j].height;
                    t.align = imgs[j].align;
                    temps[temps.length] = t;
                }
                var formatImgCount = 0;
                for (j = 0; j < imgs.length;) {
                    imgs[j].outerHTML = "#FormatImgID_" + formatImgCount + "#";
                    formatImgCount++;
                }
            }

            var html = processFormatText(myeditor.EditorDocument.body.innerHTML);
            if (temps != null && temps.length > 0) {
                for (j = 0; j < temps.length; j++) {
                    var imghtml = "<p align=\"center\"><img src=\"" + temps[j].src + "\" alt=\"" + temps[j].alt + "\" width=\"" + temps[j].width + "\" height=\"" + temps[j].height + "\" align=\"" + temps[j].align + "\" border=\"0\"></p>";
                    html = html.replace("#FormatImgID_" + j + "#", imghtml);
                }
            }

			while(html.indexOf("</p></p>")!=-1)	html=html.replace("</p></p>","</p>");
			while(html.indexOf('<p><p align="center">')!=-1)	html=html.replace('<p><p align="center">','<p align="center">');

			SetEditorContents(bodyname, html);
			
        } else {
            

        }
   }else{
		alert('±ØÐëÔÚÉè¼ÆÄ£Ê½ÏÂ²Ù×÷£¡');
   }
}



function processFormatText(textContext) {
    var text = DBC2SBC(textContext);
    var prefix = "¡¡¡¡";
    var tmps = text.split("\n");
    var html = "";
	var ifblank = document.getElementById("ifblank");
    for (i = 0; i < tmps.length; i++) {
      var tmp = tmps[i].trim();
      if (tmp.length > 0) {
	  if (ifblank)
	  {
		  if (ifblank.checked)
			html += "<p>¡¡¡¡" + tmp + "</p>\n";
			else
			html += "<p>" + tmp + "</p>\n";
		  }
	  }else{
			html += "<p>" + tmp + "</p>\n";
	  }
    }
  return html;
}


function DBC2SBC(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    // ¡°65281¡±ÊÇ¡°£¡¡±£¬¡°65373¡±ÊÇ¡°£ý¡±£¬¡°65292¡±ÊÇ¡°£¬¡±¡£²»×ª»»"£¬"

    if (code >= 65281 && code < 65373 && code != 65292 && code != 65306){
    //  ¡°65248¡±ÊÇ×ª»»Âë¾à
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}


String.prototype.trim = function()
{
  return this.replace(/(^[\s¡¡]*)|([\s¡¡]*$)/g, "");
};

String.prototype.leftTrim = function()
{
  return this.replace(/(^\s*)/g, "");
};

String.prototype.rightTrim = function()
{
  return this.replace(/(\s*$)/g, "");
};


//¼ò·±×ª»»º¯Êý
function jian2fan(content) {
	var fan=FCKeditorAPI.GetInstance(content).GetXHTML(true).j2f();
	SetEditorContents(content, fan);
}

var s="ÍòÓë³ó×¨Òµ´Ô¶«Ë¿¶ªÁ½ÑÏÉ¥¸öãÜ·áÁÙÎªÀö¾ÙÃ´ÒåÎÚÀÖÇÇÏ°ÏçÊéÂòÂÒÕùÓÚ¿÷ÔÆØ¨ÑÇ²úÄ¶Ç×ÙôÒÚ½ö´ÓÂØ²ÖÒÇÃÇ¼ÛÖÚÓÅ»ï»áØñÉ¡Î°´«ÉËØöÂ×Ø÷Î±ØùÌåÓàÓ¶ÙÝÏÀÂÂ½ÄÕì²àÇÈ¿ëÙ­Ù¯Ù¶Ù±Ù²Á©Ù³¼óÕ®ÇãÙÌÙÍÙÇ³¥ÙÎÙÏ´¢ÙÐ¶ù¶ÒÙðµ³À¼¹ØÐË×ÈÑøÊÞÙæÄÚ¸Ô²áÐ´¾üÅ©Ú£·ë³å¾ö¿ö¶³¾»ÆàÁ¹Áè¼õ´ÕÁÝ¼¸·ïÙìÆ¾¿­»÷ÛÊÔäÛ»»®ÁõÔò¸Õ´´É¾±ð„iØÙ¹ôØÛØÜ¼Á¹Ð½£°þ¾çÈ°°ìÎñÛ½¶¯Àø¾¢ÀÍÊÆÑ«ÛÂ„ÖÔÈØÐØÑÇøÒ½»ªÐ­µ¥ÂôÂ¬Â±ÎÔÎÀÈ´Úá³§ÌüÀúÀ÷Ñ¹ÑáØÇ²ÞÏáØÉÏÃ³ø¾ÇØËÏØÈþ²Î…¥…¦Ë«·¢±äÐðµþÒ¶ºÅÌ¾ß´ÓõºóÏÅÂÀÂðßÄ¶ÖÌýÆôÎâß¼ß½Å»ß¿ßÂÔ±ßÃÇºÎØÓ½ßÇÁüßÌßÐßåßÔÏÌßßÏìÑÆßÕßØßÙßÜ»©ßàßâßæÓ´ßé†yßë†|ßïßð»½ßüßõØÄßùÄö†ª†®Ð¥Åçà¶à·à¿àÀàÈÐêàÓÖöàààèÏùàëÍÅÔ°´ÑÎ§àð¹úÍ¼Ô²Ê¥ÛÛ³¡Ûà»µ¿é¼áÌ³ÛÞ°ÓÎë·Ø×¹Â¢ÛâÛäÀÝ¿ÑÛðÛÑµæÛëˆ™ˆ›ÛîÛñÛõÛ÷ÛöÛþÛûÇµ¶é‰GÜ«Ç½×³Éù¿Çºø‰×´¦±¸¸´¹»Í·¿ä¼Ð¶áÞÆÛ¼·Ü½±°Â×±¸¾Âèåüåýæ£æ©½ªÂ¦æ«æ¬½¿æ®Óéæ´æµ‹OÓ¤æ¿ÉôæÁæÈæÉæÍæÖËïÑ§ÂÏÄþ±¦Êµ³èÉóÏÜ¹¬¿í±öÇÞ¶ÔÑ°µ¼ÊÙ½«¶û³¾³¢Ò¢ÞÏÊ¬¾¡²ãŒÁÌë½ìÊôÂÅåðÓìËêÆñá«¸Úá­á®á°µºÁëÔÀá´¿ùNá»Ï¿iá½á¿ÂÍáÀáÁÕ¸áÉÂáÎáÐáÕáÛ¹®ÛÏ±ÒË§Ê¦àøÕÊÁ±ÖÄ´øÖ¡°ïàüàýàþÃÝá¥¸É²¢çÛ¹ã×¯ÇìÂ®âÐ¿âÓ¦ÃíÅÓ·ÏŽöâÞ¿ªÒìÆúÕÅÃÖåòÍäµ¯Ç¿¹éµ±Â¼¦Ñå³¹¾¶áâÓùÒäâãÓÇâé»³Ì¬ËËâäâæâêâëÁ¯×Üí¡âøÁµ¿Ò¶ñâúâûâýâüÄÕã¢ÔÃí¨Ðüã¥Ãõ¾ª¾å²Ò³Í±¹ã«²Ñµ¬¹ßíªã³·ßã´Ô¸Éå‘\ãÀí¯ÀÁãÁí°ê§Ï·ê¨Õ½ê¯»§ÔúÆËÇ¤Ö´À©ÞÑÉ¨ÑïÈÅ¸§Å×ÞÒ¿ÙÂÕÇÀ»¤±¨µ£ÄâÂ£¼ðÓµÀ¹Å¡²¦Ôñ¹ÒÖ¿ÂÎ’¥ÎÎÌ¢Ð®ÄÓµ²ÞØÕõ¼·»Ó’¦ÀÌËð¼ñ»»µ·¾ÝÄíÂ°ÞâÖÀµ§²ôÞèÞêÀ¿Þì²ó¸éÂ§½ÁÐ¯ÉãÞó°ÚÒ¡±÷Ì¯Þü³ÅÄìß¢ß£ß¥ËÓÔÜµÐÁ²ÊýÕ«ìµ¶·Õ¶¶ÏÎÞ¾ÉÊ±¿õ•Dê¼Öç•oÏÔ½úÉ¹ÏþêÊÔÎêÍÔÝêÓÔýÊõÆÓ»úÉ±ÔÓÈ¨ÌõÀ´Ñîè¿½Ü¼«¹¹èÈÊàÔæèÀèÅèÇÇ¹·ãèÉ¹ñÄûèßèÙÕ¤±êÕ»èÎèÐ¶°èÓèÝÀ¸Ê÷ÆÜÑùèïèðèâèãèåµµèçÇÅèëèí½°×®ÃÎ—ƒ—…¼ìèùé¤èüèýé¡ÍÖÂ¥é­é´éµé·˜–¼÷éÄéÆºáéÉÓ£éÍ³÷éÖéÚéÜéÝ»¶ì£Å·¼ßéâéä²ÐéæéçéééëÅ¹»Ùì±±Ï±ÐÕ±ë§ëªÆøÇâë²ëµ»ãººÎÛÌÀÐÚí³¹µÃ»ããÅ½Á¤ÂÙ²×›hãí»¦›mÅ¢Àáí´ãñãòãøÐºÆÃÔóãþ½àÈ÷ÍÝä¤Ç³½¬½½ä¥›¸×Ç²âä«¼Ãä¯›º»ëä°Å¨ä±›»Í¿Ó¿ÌÎÀÔäµÁ°ä¶ÎÐ›é»ÁµÓÈó½§ÕÇÉ¬µíÔ¨äË×ÕäÂ½¥äÅÓæäÉÉøÎÂÓÎÍåÊªÀ£½¦äÓœ¾ää¹öÖÍäÙäÜÂúäÞÂËÀÄÂÐ±õÌ²œùäíäëäìäòÎ«Ç±äóÀ½äþ±ôå°ÃðµÆÁéÔÖ²Óì¾Â¯ìÀì¿ìÁµãÁ¶³ãË¸ÀÃÌþÖòÑÌ·³ÉÕìÇ»âÌÌ½ýÈÈ»ÀìËìâìÑìÎìÕìÖ°®Ò¯ë¹êóÇ£Îþ¶¿êñáë×´áîáïÓÌ±·áóªAÄü¶ÀÏÁÊ¨áöÕøÓüáøáýÁÔâ¨â¤ÖíÃ¨â¬Ï×Ì¡çá«_«`Âêçâ»·ÏÖ«oçôçëçå·©çç«šçõ¬QçöËöÇíÑþè¨è¯è¬è¶ÎÍê±µç»­³©î´³ëðÜÁÆÅ±ðÝÑñðß´¯·èðåðâÓ¸¾·Ñ÷ðéðì»¾ðï³Õð÷¯}ðùðü±ñÌ±ñ«ñ¨ñ®Ñ¢ñ²ñ³°¨ÖåñäÕµÑÎ¼à¸ÇµÁÅÌíîíö±€×ÅÕöíùíúÂ÷Öõ½Ãí¶·¯¿óí¸Âë×©íºÑâí¿íÂíÃÀù´¡³n¹èË¶íÌíÍ³}³~È·¼ï°­íÓí×¼îíÛíÞÀñµtìòìõµ»»öÙ÷Â»ìøÀëÍº¸ÑÖÖ»ý³Æ»à¶ŒïùË°öÕÎÈð£ÇîÇÔÇÏÒ¤´ÜÎÑ¿úñ¼ñÀÊú¾ºóÆËñ±ÊóÈ¼ãÁýóÖÖþóÙÉ¸¹YóÝ³ïÇ©¼ò¹‚óåóæóêÂáóìóïóñÂ¨ÀºÀéóýô¥ÙáÀàôÌôÐôÏÔÁ·àÁ¸ôÖô×½ôôêæù¾ÀæúºìæûÏËæüÔ¼¼¶æýæþ¼ÍÈÒÎ³ç¡À€´¿ç¢É´¸ÙÄÉÀ×ÝÂÚ·×Ö½ÎÆ·ÄÀ‚ÀƒÅ¦ç£Ïßç¤ç¥ç¦Á·×éÉðÏ¸Ö¯ÖÕç§°íç¨ç©ÉÜÒï¾­çª°óÈÞ½áç«ÈÆÀ„ç¬»æ¸øÑ¤ç­Âç¾ø½ÊÍ³ç®ç¯¾îÐåÀ…ËçÌÐ¼Ìç°¼¨Ð÷ç±À†Ðøç²ç³´Âç´çµÉþÎ¬Ãàç·±Á³ñÀ‡ç¸ç¹×ÛÕÀçºÂÌ×ºç»ç¼ç½¼êÃåÀÂç¾ç¿¼©ÀˆçÀçÁç¶¶ÐçÂÀ‰çÃçÄ»ºµÞÂÆ±àçÅÔµçÆ¸¿çÈçÇ·ìÀŠçÉ²øçÊçËçÌçÍçÎçÏçÐÓ§ËõçÑçÒçÓçÔÉÉçÕçÖç×çØçÙ½ÉçÚó¿ÍøÂÞ·£°Õî¼î¿ôÇÏÛÇÌÁ™ÁšñìñïËÊ³ÜÄôÁûÖ°ñ÷Áªñù´ÏËà³¦·ôëÉÉöÖ×ÕÍÐ²µ¨Ê¤ëÊëËëÍëÖ½ºÂöëÚÔàÆêÄÔÅ§Ùõ½ÅÍÑëáÁ³À°ëçÄNëñÄåëïëðÌÚë÷ÅHÓßô¯½¢²Õôµ¼èÑÞÜ³ÒÕ½ÚØÂÜ¼ÎßÂ«ÜÊÎ­ÜÂÜÈÜÉ²ÔÜÑËÕÜÜÆ»¾¥Ü×ÜàÜãÜä¼ë¾£¼öÇQ¼ÔÜéÜêÜñÜöÜùµ´ÈÙ»çÜþÜýÓ«Ý¡Ý£Ý¥ÒñÝ¤Ý¦Ý§Ò©Ý°Ý¯À³Á«ÝªÝ«Ý²»ñÝµÓ¨ÝºÝ»È[ÂÜÓ©ÓªÝÓÏôÈø´ÐÝÛÝÞ½¯ÝäÀ¶¼»ÝñÝ÷ÝöÝëÇ¾ÝüÝþ°ªÞ­ÔÌÞ´Þ»ÞºÂ²ÂÇÐé³æò°ò±ËäÏºò²Ê´ÒÏÂì²Ïòºò¹¹ÆòÃòÉÂùÕÝòÌòÍòÏòÓÍÉÎÏÀ¯Ó¬òå²õÐ«ò÷òîÎ…òýÏ]ÐÆÏÎ²¹³ÄÙò°ÀôÁÐ„ÍàÏ®ÑB×°ñÉÑTñÍñÏ¿ãñÐñÚñÜñßÒ[¼û¹ÛÓ_¹æÃÙÊÓêèÀÀ¾õêéêêêëÓ`êìêíêîêïõü´¥ö£Ô€ÓþÌÜÚ¥¼Æ¶©¸¼ÈÏ¼¥Ú¦Ú§ÌÖÈÃÚ¨ÆýÑµÒéÑ¶¼Ç×š½²»äÚ©ÚªÑÈÚ«Ðí¶ïÂÛ×›ËÏ·íÉè·Ã¾÷Ö¤Ú¬Ú­ÆÀ×çÊ¶×œÕ©ËßÕïÚ®Öß´ÊÚ°Ú¯×ÒëÚ±Ú²Ú³ÊÔÚ´Ê«ÚµÚ¶³ÏÖïÚ·»°µ®Ú¸Ú¹¹îÑ¯ÒèÚº¸ÃÏê²ïÚ»Ú¼×ž½ëÎÜÓïÚ½ÎóÚ¾ÓÕ»åÚ¿ËµËÐÚÀÇëÖîÚÁÅµ¶ÁÚÂ·Ì¿ÎÚÃÚÄË­ÚÅµ÷ÚÆÁÂ×»ÚÇÌ¸ÒêÄ±ÚÈµý»ÑÚÉÐ³ÚÊÚËÎ½ÚÌÚÍÚÎ²÷ÚÑÚÏÑèÚÐÃÕÚÒ× ÚÓÚÔÚÕÐ»Ò¥°ùÚÖÇ«Ú×½÷Ã¡ÚØÚÙÃýÌ·ÚÚÚÛÀ¾Æ×ÚÜÚÝÇ´ÚÞÚß¹ÈØk±´Õê¸ºÚO¹±²ÆÔðÏÍ°ÜÕË»õÖÊ··Ì°Æ¶±á¹ºÖü¹á·¡¼úêÚêÛÌù¹óêÜ´ûÃ³·ÑºØêÝÔôêÞ¼Ö»ßêßÁÞÂ¸Ôß×ÊêàêáêäêâêãÉÞ¸³¶ÄêåÊêÉÍ´ÍÚPÚQâÙÅâêæÀµÚR×¸êç×¬ÈüØÓØÍÔÞÚSÔùÉÄÓ®¸ÓÚWÕÔ¸ÏÇ÷ôõõ»Ô¾õÄõÅõÈ¼ùÛQõÎõÏõÑõÒÓ»³ì×ÙõÙõÜõæõçõé´ÚõïõòÇû³µÔþ¹ìÐùÞaéí×ªéîÂÖÈíºäéïéðéñÖáéòéóéõéôéöé÷ÇáéøÔØéù½ÎÞbéúéû½Ïéü¸¨Á¾éý±²»Ô¹õéþÞcê¡ê¢ê£·ø¼­ÞdÊäàÎÔ¯Ï½Õ·ê¤ÕÞê¥´Ç±ç±è±ßÁÉ´ïÇ¨¹ýÂõÔË»¹Õâ½øÔ¶Î¥Á¬³ÙåÇåÉ¼£ÊÊÑ¡Ñ·µÝåÎÂßÒÅÒ£µËÚ÷ÚùÓÊ×ÞÚþÁÚÓôÛ§Û£Û¦Ö£Û©ÛªÔÇµ¦ÔÍáN½´õ¦õ§ÄðÊÍÀïâ ¼øöÇöÉîÅîÆÕë¶¤îÈîÇîÉîÊÇ¥îËîÌè•·°µöîÍîÏè–îÎè—¸ÆîÐîÑ¶Û³®ÖÓÄÆ±µ¸ÖîÓîÔÔ¿ÇÕ¾ûÎÙ¹³îÖîÕîØî×Å¥îÙîÚÇ®îÛÇ¯îÜ²§îÝîÞîßîàîá×êîâîã¼ØîäÓËÌú²¬ÁåîåÇ¦Ã­îæîçîèîéîêîëîìè™îíîîîïèšè›îðîñîòîôîóèœîõÍ­ÂÁîöî÷îøÕ¡îùÏ³îúîûèîüîýï¡îþï¢¸õÃúï£ï¤½ÂÒ¿²ùï¥ï¦ï§Òøï¨Öýï©ÆÌèžïªï«Á´ï¬ÏúËøï®ï­³ú¹øï¯ï°Ðâï±ï²·æÐ¿ï³ï´ïµÈñÌàï¶ï·ï¸ï¹ïºÕàï»´íÃªï¼èŸï½ï¾ï¿è ÎýïÀÂà´¸×¶½õé@ÏÇïÃïÁïÂïÄ¶§¼ü¾âÃÌïÅïÆéAïÇïÏïÈïÉïÊÇÂïñ¶ÍïËéBïÌïÍ¶ÆÃ¾ïÎéCïÐïÑïÒÕòéDïÓÄ÷éEïÔÄøïÕïÖ¸ä°÷ï×ïØïÙéFïÚïÛïÜïÝéGïÞ¾µïáïßïàéHïâïãÁÍïäïåïæïçïèïéïêïëïìÀØéIïíÁ­ïîïïïðéJéKÏâ³¤ÃÅãÅÉÁãÆê\±ÕÎÊ´³ÈòãÇÏÐãÈ¼äãÉãÊÃÆÕ¢ÄÖ¹ëÎÅãËÃöãÌê]·§¸óºÒãÍãÎÔÄãÏê^ãÐÑËãÑãÒãÓãÔÑÖãÕ²ûÀ»ãÖê_À«ã×ãØãÙê`ãÚãÛêa¶ÓÑôÒõÕó½×¼ÊÂ½Â¤³ÂÚêÉÂÚíÔÉÏÕËæÒþÁ¥öÁÄÑ³ûöÅö¨Îíö«Ã¹ö°ö¦¾²ØÌ÷²÷³÷µ÷¹Î¤ÈÍí‚º«è¸è¹èºÔÏÒ³¶¥ÇêñüÏîË³ÐëçïÍç¹Ë¶Ùñý°äËÌñþÔ¤Â­ÁìÆÄ¾±ò¡¼ÕïFò¢ò£ïGò¤ÒÃÆµïHÍÇò¥ïIÓ±¿ÅÌâïJò¦ò§ÑÕ¶îò¨ò©µßòªò«ïK²üò¬ò­È§·çïrïsì©ìªì«ïtì¬ïuïvÆ®ì­ì®·É÷Ï÷Ðð—¼¢ð˜â¼â½â¾â¿âÀâÁ·¹Òû½¤ÊÎ±¥ËÇð™âÂ¶üÈÄâÃðšð›½Èðœ±ýâÄð¶öâÅÄÙðžðŸâÆÏÚ¹ÝâÇÀ¡ð âÈ²öñ@âÉñAÁóâÊâËÂøâÌâÍâÎÂíÔ¦ÍÔÑ±³ÛÇýóR²µÂ¿æàÊ»æáæâ¾Ôæã×¤ÍÕæå¼ÝæäæææçÂîóS½¾æèÂæº§æéóTæê³ÒÑéóUóV¿¥æëÆïæìæíóWóXæîÆ­æïóYÉ§æðæñæòå¹æóæôÂâæõæöÖèæ÷óZæø÷Ã÷Å÷Æ÷Þ÷Ê÷ËÓã÷÷‚öÏ÷ƒÂ³öÐ÷…öÑöÒöÓöÔ÷†÷‡öÖ÷ˆ±«ö×÷‰öØöÙöÚ÷ŠöÛöÜ÷‹÷Œ÷÷ŽöÝöÞÏÊ÷ößöàöáöâöãöäÀðöåöæöçöèöé÷öê÷‘öëöì÷’öíöîöïöðöñöòöóöô¾¨÷“öõööö÷öø÷”÷•÷–÷—÷˜Èúöùöúöûöü÷™÷šöýöþ÷¡÷¢÷£÷¤÷¥÷›÷œ÷¦÷§÷¨±î÷©÷ª÷«÷ž÷¬÷­ÁÛ÷®÷Ÿ÷ ÷¯ø@Äñð¯¼¦ð°Ãùû\Å¸Ñ»û]ð±ð²ð³ð´ðµÑ¼û^Ñìû_ð·ð¶Ô§û`ÍÒð¸ðºð¹ð»ð¼ûaûb¸ëð½ºèûcð¾ð¿¾éðÀ¶ìðÁðÂðÃðÄÈµðÅðÆûdðÇÅôûeðÈûfûgûhðÉûiðÊ÷½ûjðËðÌðÍûkðÎûlûmûnûoðÏº×ûpðÐðÑðÒðÓðÔðÕðÖðØûrÓ¥ð×ûsðÙûtõºÂóôï»ÆÙäüd÷ò÷õö¼ö½ü…ö¾Ø»÷ú÷þÆëì´³Ýö³ý†ý‡ö´Áäöµö¶ö·ö¸ö¹öºÈ£ö»Áú¹¨íè¹ê"

var t="ÈfÅcáhŒ£˜I…²–|½zGƒÉ‡À†Ê‚€ãÝØSÅRžéûÅeüNÁxžõ˜·†ÌÁ•àl•øÙIy Žì¶Ìë…ƒ†®a®€ÓHÒC‡¾ƒ|ƒHÄö‚}ƒx‚ƒƒr±Šƒžâ·•þ‚ø‚ã‚¥‚÷‚û‚t‚‚á‚ÎÐówðN‚òƒL‚b‚Hƒe‚É‚ÈƒSƒ~ƒŠƒz‚Rƒ‰ƒ°‚zƒ«ƒ€‚ùƒA‚ôƒEƒfƒ”ƒ¯ƒ†ƒ¦ƒ®ƒºƒ¶ƒ¼ühÌmêPÅdÆðB«F‡ÏƒÈŒùƒÔŒ‘ÜŠÞr‰VñT›_›Q›rƒöœQœD›öœRœpœ„CŽ×øPøD‘{„P“ôšëèÆc„„¢„t„‚„“„h„e„}„q„£„¥„’„©„Ž„¦„ƒ„¡„ñÞk„Õ„ê„Ó„î„Å„Ú„Ý„ìÃÍ„ã„ò…Q…T…^átÈA…f†ÎÙu±RûuÅPÐl…sŽ„Sd•Ñ…–‰º…’…‡ŽúŽû…˜BNŽýP¿hÈý…¢ìaì^ëp°l×ƒ”¢¯BÈ~Ì–šU‡\»náá‡˜…Î†á†w‡Â †¢…Ç‡`‡Ò‡I‡³†h†T†J†Ü†èÔ†U‡µ‡“‡zß¸‡jûyßÉí‘†¡‡}‡^†ô‡‚‡W‡ˆ‡‡†Ñ‡O†ß‡Z†¤†î†r†¾ºô‡K†Ý‡Êým‡Ó‡c‡[‡Š‡D‡¿‡ËºÇ‡†‡u‡Â‡Ú‡£Åü‡ÌÖoˆFˆ@‡è‡ú‡÷‡øˆDˆAÂ}‰¿ˆöÚæ‰Ä‰KˆÔ‰¯‰È‰Î‰]‰ž‰‹‰Å‰Å‰À‰¾‰¨ˆsˆ×‰|ˆº‰¡‰³‰Nˆß‰P‰_ˆå‰|ˆ‰q‰™‰ÏÔ­ ‰ÑÂ•š¤‰Ø‰ÚÌŽ‚äÑ}‰òî^ÕFŠAŠZŠYŠJŠ^ª„ŠWŠy‹D‹Œ‹³‹ž‹‚Š™ËKŠä‹I‹Æ‹ÉŒDŠÊ‹z‹¹‹½‹ë‹È‹ð‹‹‹Ü‹å‹Ô‹ßŒOŒWŒ\ŒŽŒšŒŒ™Œ‘—ŒmŒ’ÙeŒ‹Œ¦Œ¤Œ§‰ÛŒ¢ –‰m‡LˆòŒÀŒÆ±MŒÓŒÚŒÏŒÃŒÙŒÒŒÕŽZšqØMçsŽS¹uŽXŽ[–ŽhŽGŽF{ŽAþ˜Žn÷ˆŽMäŽVô£â¼¹Žpì–Ž€ŽÅŽ›ŽŸŽ®Ž¤ºŸŽÃŽ§Ž¬ŽÍŽÎŽ¾Ž½ƒçÒLŽÖKÃ´VÇf‘c]TŽì‘ªRý‹UF[é_®—‰ˆ›†—Ššw®”ä›§©Ø½Æ¶R‘›‘Ô‘n÷‘Ñ‘B‘Z‘“‘Yí‘z¿‚‘»‘«‘Ù‘©º‘Q‘ÃðÅÀÁ‚â‘Ò‘a‘‘ó@‘Ö‘K‘Í‘vÜ‘M‘„‘Tœ¡‘C‘‘|îŠ‘Ø‘€âð‘¿‘Ð‘¬‘ß‘â‘ò‘ê‘ð‘ì‘ô¼™“ä’LˆÌ”U’Ð’ß“P”_“á’“»“¸’à“Œ×oˆó“ú”M”n’þ“í”r”Q“Ü“ñ’ì“´”’é“ë“é’¶“Ï“õ“×’ê”D“]“Í“Æ“p“ì“Q“v“þ“Ó“ï“”S“Û“½“¥“«”ˆ“å”v”R“§”‡”y”z”d”[“u”P”‚”t“Î”f”X”]”x”\”€”³”¿”µýS”ÌôY”Ø”àŸoÅf•r•ç•ª•Ò•ƒ•îï@•x•ñ•Ô•Ï•ž•Ÿ•º•á„žÐg˜ã™Cš¢ës™à—lí—î˜q‚Ü˜O˜‹˜º˜Ð——™À—g—–˜Œ—÷—n™™™Ž™f—d–Å˜Ë—£™±™É—™¾™µ™Ú˜ä—«˜Ó™è—¨—¿˜ï˜E™n˜˜ò˜å™u˜ª˜¶‰ô™„—®™z™ô˜¡™³˜ ™å™E˜Ç™ì™Â™°™Î™x™‘™‰™½™M™{™Ñ™Á™»™©™´º™™_šgšešWšžš{š‘šˆšŒššš—š›šªš§Ýž®…”ÀšÖšÐšÚšâšäšåšè¡h›@œ«›°ßeœÏ›]ž–ažrœSœæœtœ¿œûðôœIÍž{žožTžaŠÉ›Üž¢¸D›Ñœ\{²œœÛáœyÒúžgIœ†Gâ¡ø‰Tœ¥ý³œZi¬œuœÝœoœì™¾q­ÕœYœOnž^uÆOžcBœØß[ž³ñ¢žRsU§Lœþž¹ž—Mž]žVžEž´žIž©ËžEžužtž‡žH“žzž‘ž|žlž®œçŸôì`žÄ NŸ¬ tŸõŸ˜ŸÍücŸ’Ÿë q €ŸN TŸŸŸ©ŸýŸî Z C aŸáŸ¨ F cŸºýÍËÁïÛ ” © Ó ¿ Þ ÙŠÈ® î«EªwªqªNûƒªžªŸªšªMª{ªœªbªzªsª«C«J«MØiØˆÎo«I«H­^­m¬„¬”¬|­h¬F¬š­t¬z«k¬m­‡­c¬q­\­I¬­‚¬Ž­a­v­‹­‘®Y®TëŠ®‹•³ÙÜ® °X¯Ÿ¯‘°O¯ƒóœ¯¯‚°’åí°b¯d°W¯{°A¯ˆ°B°V°D¯”¯Ž¯›°T°c°a°`°]°_°dÄŸ°}°™°—±Kû}±OÉw±I±P²g±{²”Öø± ²A²€²m²š³C´‰µ\µV´X´a´u³Œ³Ž´^µZµaµ[µA³Îù´T³ˆ´“´o´™´_û|µK´ƒ´~‰AïàL¶Y¶B¶[µ¶\µœ·Aµ“¶Uëx¶d¶’·N·e·Q·x·v·„¶·d·€·w¸F¸`¸[¸G¸Z¸C¸Q¸]¸MØQ¸‚ºV¹S¹P¹a¹{»\»eºBº`ºYºš¹~»Iºžº†»UºjºD»X»jº„ººˆºt»@»h»f»[¼eî¶i¼g¼c»›¼S¼Z¼Rðf¾o¿{ôé¼m¼u¼t¼qÀw¼v¼s¼‰¼wÀk¼o¼x¾•¼‹¼‡¼ƒ¼„¼†¾V¼{¼Œ¿v¾]¼Š¼ˆ¼y¼¼Ÿ¼…¼~¼‚¾€½C½X¼›¾š½M¼¼š¿—½K¿U½O½E½I½BÀ[½›½H½‰½q½Y½fÀ@½x½WÀL½o½k½{½j½^½g½y½Ž½‹½ÀC½”½—½dÀ^½¿ƒ¾w¾c¾xÀm¾_¾p¾b¾y¾iÀK¾S¾d¾R¿‡¾I¾T¾^¾J¾C¾`¾U¾G¾Y¾l¾~¾|¾}¾’À|¾Ÿ¾˜¾ƒ¿ZÀD¾Œ¾E¾„¾œ¾€¾—¿P¾¾†¿|¾Ž¾‡¾‰¿N¿`¿d¿b¿p¿\¿cÀp¿r¿O¿VÀ_¿~¿z¿wÀt¿s¿Š¿‰Ài¿¿˜¿•í\À`ÀRÀQÀUÀyÀ›¾WÁ_ÁPÁTÁ`ÁbÁuÁwÂNÂPÂEÂgÂeÂ–uÂ™Ã@ÂšÂœÂ“Â˜Â”ÃCÄcÄwÄdÄIÄ[Ã›Ã{Ä‘„Ù–VÄLÅFÃ„ÄzÃ}Ä’óvÄšÄXÄ“ÅLÄ_Ã“ÄTÄ˜ÅDáZÄsý|ÄìtÄeòvÄœÅNÝ›ÅœÅžÅ“ÆAÆDØWÆHË‡¹ÁdËGÊÌJÉÈ”ËžÇ{ÈOÉnÆrÌK™”ÌOÇoÌdÊ\‰LŸ¦ÀOÇGË]ËRÇvÊÉœÊwËCËjÊŽ˜sÈœî ÎŸÉÊnË|ÉpÊaÊ{È‡È’ËŽÉWÉ‰ÈRÉÉPÈnËW«@Ê~¬“úLÉ”ÌEÌ}Îž I¿MÊ’Ë_Ê[ÊrÊ‰ÊYÊVË{ËEÌyÊšævò‡ËNÌ`ÌAÌ@ÌIÌNË’éÂÌ\Ì”‘]Ì“ÏxÍAÏlëmÎrÏŠÎgÏÎ›ÐQÏ–Í˜ÐMÏ Ï|ÐUÏUÍÏuÎ‡Ï“Í‘ÎÏžÏ‰ÏXÏsÏÏNÏ”ÏQÏ\ÐDá…ã•ÑaÒrÐ–Ò\‹–Ñ‹ÒmÒuÒUÑbÒdÑ‚ÑžÒcÑÒMÒ@Òh¿‹ÒwÒŠÓ^ÒÒŽÒ’Ò•Ò—Ó[ÓXÓJÒ Ó]ÓCÓDÓMÓPÓUÓxÓ|Óz×„×uÖ`Ó…Ó‹Ó†Ó‡ÕJ×IÓ“ÓÓ‘×ŒÓ˜Ó™Ó–×hÓÓ›Ó•ÖvÖMÖŽÔnÓ ÔGÔSÓžÕ“ÔKÔAÖSÔOÔLÔE×CÔbÔXÔuÔ{×RÔwÔpÔVÔ\ÔgÖaÔ~ÔxÔtÔv×gÔrÕEÕCÔ‡ÔŸÔŠÔ‘ÔœÕ\ÕDÔ–Ô’ÕQÔÔÔŽÔƒÔ„ÕŠÔ“Ô”ÔŒÕŸÔ‚×pÕ]Õ_ÕZÕVÕ`ÕaÕTÕdÕNÕfÕbÕOÕˆÖTÕŒÖZ×xÕŽÕuÕnÕ†Õ˜ÕlÕ”Õ{Õ~ÕÕÕrÕ„ÕxÖ\ÖRÕ™ÖeÖGÖCÖoÖ]Ö^Ö@ÖIÖX×‹ÖJÖOÖVÖBÖiÕ›ÕšÖƒ×•ÖqÖxÖ{ÖrÕžÖtÖkÖ”Ö™Ö†×vÖ‡×T×P×S×Ž×V×H×—×l×d×·YØrØØ‘Ø“Ø’Ø•Ø”ØŸÙt”¡Ù~Ø›Ù|ØœØØšÙHÙÙAØžÙEÙvÙSÙBÙNÙFÙLÙJÙQÙMÙRÙOÙ\Ù—ÙZÙVÙDÙUÙTÚEÙYÙWÚBÙgÙcÙlÙdÙxÙ€ýVÚHÙpÙnÚFÙkÙsÙrÙyÙ‡ÙˆÙ˜ÙŽÙÙÙ‘ÚIÙÙšÙ›Ù ÚAÚMÚXÚwÚsÚ…ÚŽÜOÜSÛ„Û•ÜVÛ`ÜJÜEÛ‹Ü]ÜQÛxÜPÛ™ÜWÜUÜbÛ˜ÜXÜfÜkÜgÜ|Ü‡ÜˆÜ‰ÜŽÜÜÞDÜ—Ý†Ü›ÞZÝMÝVÞ_ÝSÝTÝWÜ ÝFÞ]ÝUÝpÝYÝdÝeÞIÝcÝbÝ`Ý^ÝmÝoÝvÝ‚Ý…ÝxÝÝyÝˆÝzÝwÝÝ—Ý‹ÝœÝ”Þ\Þ@Ý ÝšÞAÞHÞOÞoÞqÞpß…ß|ß_ßwß^ß~ß\ß€ß@ßMßhß`ßBßtßƒÞŸÛEßmßxßdßfßŠß‰ßzßbà‡à—àwà]àuà’àôdàSàPà”ààiáBàyàájáwáuá‰á‡á„áŒÑYîÒèbèŽçYááá˜á”á“á•á‘âQâTâAáŸâlâCážå{âSåâOâ]â}âbââgânæRâcä^ä“âkâjè€šJâxæuã^â‚â[â€â^âoâZâ•åXã`ãQâ’ÀâŽãOâ˜â“ãXèãfãgâ›âšâ™èFãKâèpãUãTâ‹ãCãBãGâ‰â”èIãoäDã™ãsä€åEäBä…äeäyçtã‡èKã~äXäHãŸæzåŽããŠäbäAã”çfãŒæ|ãxã“ãtã‘åPäCãqãžçPã|ç|ä@ãyãœèTç„ääoånäˆæœçHäNæiä‡ä{äzåä†ä~çnäSäsähä\äç˜ç™äJäRäZäuä|åHäæNåŸåeå^åQåWåuä˜åKå_åaådèŒåNåFå\èeåväŸåxäžåUåVæIäåiåOå›å}å|çIæJåŠåšæ@æRå‘æ}å–æDæXåƒæVçUætçšæ[æŸæ‚ænækè‡è’çæ‡æ“æyæ€æ^æ„æ‰è\ægçSçMçNæ çaçOçRçCæ—æ›çBç†è‘ç‚çhèuç…è|ç’è‰çjç‹èZèDèGèCç èOèdèsènèè‚éLéTéVéWéZé\é]†–êJécééeébégéhé`žélô[é|Â„êYé}é‚êGéyéwéué€ôbé†éêAé“éŽé‹ô]é”é’éé‘êUê@é˜êTéŸé êHêDêFêIêRêXê ê–êŽê‡ëAëHê‘ë]êê€ê„êŸëEëUëSë[ë`ëhëyër×‡ìZìFìVüqì\ìnìoìví^íXídíxífígíhínítíyíwíí“í”í•í™í—í˜íšíœîBî™îDí îCížî@îAïBîIîHîiîRîaîcîM}ŸâîWîUîlî_îjîhîe·fîwî}î„î€î…îî~ïDî”îî‹î—ÀhîîžïAïEïLï^ïQïRïSïZï\ï`ï_ïdïhïjïjïwð‹ðï}ð‡ï€ðhï‚ðqïƒï„ï†ïˆï‹ðTï—ï–ï•ï˜ïðDðˆðAïðEïœðFïžðGðLðIðNðHðKðRðQðWð^ðlððkðtð’ðvðxðoðsð}ð~ðzð€ð‚ð–ñRñSñWñZñYòŒñ_ñgóHñzñ‚ñ†ñ€ñxò|ñvñ„ñwñ{óAñ~ò”ÁRñ—òœò‘ñ˜ñ”ñ‰óQóPòGòžòHñŸòEòUòTòSòKòRò“ò‰ò_òsòjò}ò\òˆòtòqò~òŠò…ò‹ò–óEóKóLóJótóyóxôWô|ôuô~ô€ô‡ôœôô”ô™ôŸõEõGöT÷|õOõWõVõNõU÷cõQõTõqõ^õwõnõbõjöfõ`÷d÷qõoõrõ~õœ÷\õ†÷~ö–öžõŽöˆöœõ…õõŒõzöaõ—õ›öNõšöOöEöHöKöAöFöTõ öLöYöXõ™÷aölös÷lö[ö“ögöw÷{öqövömöe÷Föcö…üö’ööŠöŽö„öö˜÷B÷L÷Mö öš÷I÷@÷Z÷X÷[÷V÷s÷h÷k÷gøBøFëuøSøQøOútøfúIødøcøù…ûRø†ø{ø„øoø|øzøxøŠørúƒúvøøŽø ø’ù@øû[ø™ùMùPûZùNù]ùZùOú‘ùYù^ùoù‘ùgúAùlùiùkù‡ùˆùtú‰ù–ùŸù˜úXù”ú\úBúFúgú_úOúVúWú^úYúQúsûWúpúwúú„úú–ú˜ûDú—ûIûLûXûUûzûœûŸüSüZüsütüoüwüxü{üƒìŠýBýOýRýWýXýZý[ý]ýeýgý_ýfýbýlýrýpýxý}ýˆýýý”"


function String.prototype.j2f(){
var k=''
var buttonj2f = document.getElementById("buttonj2f");
if(buttonj2f.value=='¼ò->·±')
{
for(var i=0;i<this.length;i++) k+=(s.indexOf(this.charAt(i))==-1)?this.charAt(i):t.charAt(s.indexOf(this.charAt(i)));
buttonj2f.value='·±->¼ò';
}
else
{
for(var i=0;i<this.length;i++) k+=(t.indexOf(this.charAt(i))==-1)?this.charAt(i):s.charAt(t.indexOf(this.charAt(i)));
buttonj2f.value='¼ò->·±';
}
return k
}


