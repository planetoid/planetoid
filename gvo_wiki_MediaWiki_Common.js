/* Any JavaScript here will be loaded for all users on every page load. */
/* ���B��JavaScript�N���J��Ҧ��Τ�C�@�ӭ����C */
/* add to http://address_of_wik/MediaWiki:Common.js  */
/* <pre> */

/*
�Ҧ��Τ�b�[�����󭶭��ɡA�o�̪�JavaScript���|�[��

== ���U�B�z ==
*/
//�\��]�w
var JSConfig={
	edittoolsMode:'plus', //�]�m�s����s��סA�i�۩w���
	isEdit0:true, //�]�m�O�_��ܽs�譺�q���s
	editSectionLink:'right',//�]�m�s����s�O�_�b�k��
	collapseText:wgULS('���á�','���á�'),//���ܧ�?���Y���q�{��r
	expandText:wgULS('��ܡ�','��ܡ�'),//���ܧ�?�i�}���q�{��r
	autoCollapse:2,  //�峹�֤_ autoCollapse �ӧ�?���ɡA���۰ʧ�?
	SpecialSearchEnhancedDisabled:false//�O�_�T��W�[�䥦�j������
}
// �ݮe�ʭץ�
if (document.attachEvent && document.compatMode && document.compatMode == "CSS1Compat")
{
	var oldWidth;
	var docEl = document.documentElement;

	function fixIEScroll()
	{
		if (!oldWidth || docEl.clientWidth > oldWidth){
			doFixIEScroll();
		}else{
			setTimeout(doFixIEScroll, 1);
		}
		oldWidth = docEl.clientWidth;
	}

	function doFixIEScroll() {
		docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
	}

	document.attachEvent("onreadystatechange", fixIEScroll);
	attachEvent("onresize", fixIEScroll);
}

// ���ʤ���
function elementMoveto(node, refNode, pos){//�q�{��m��refNode�e
	if(node && refNode){
		var parent=refNode.parentNode;
		if (pos && pos=='after') {refNode=refNode.nextSibling;}
		try {
			if(refNode){
				parent.insertBefore(node, refNode);
			}else{
				parent.appendChild(node);
			}
		} catch (DOMException) {};
	}
}
//�Ыؤ���
function createElement(tag,children,props){
	var element = document.createElement(tag);
	if(children instanceof Array){
		for(var i=0;i<children.length;i++){
			var child=children[i];
			if(typeof child=='string'){child=document.createTextNode(child);}
			if(child){element.appendChild(child);}
		}
	}
	if(typeof props=='object'){
		for(var k in props){
			switch(k){
			case 'styles':
				var styles=props.styles;
				if(typeof styles=='object'){
					for(var s in styles){element.style[s]=styles[s];}
				}
				break;
			case 'events':
				var events=props.events;
				if(typeof events=='object'){
					for(var e in events){element['on'+e]=events[e];}
				}
				break;
			case 'class':
				element.className=props[k];break;
			default:
				element.setAttribute(k,props[k]);
			}
		}
	}
	return element;
}
 
//�ɤJ�Ҷ�
function getWikiPath(page,paras){
	paras.ctype=paras.ctype||'text';
	paras.dontcountme=paras.dontcountme||'s';
	paras.action=paras.action||'raw';
	var url = wgScriptPath + '/index.php?title=' + encodeURI( page.replace( ' ', '_' ) );
	for(var k in paras){url += '&' + k + '=' + paras[k]; }
	return url;
}
function importScript( page ) {
	var src= /^https?:\/\//.test(page) ? page : getWikiPath(page,{'ctype':'text/javascript'});
	var scriptElem = createElement( 'script',null,{'src':src,'type':'text/javascript'} );
	document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
}
function importStylesheet( page ) {
	var sheet= /^https?:\/\//.test(page) ? page : getWikiPath(page,{'ctype':'text/css'});
	var styleElem = createElement( 'style', ['@import "'+sheet+'";'], {'type':'text/css'} );
	document.getElementsByTagName( 'head' )[0].appendChild( styleElem );
}

/* ���դ������O�_�t�����w��?�� **************************************
 * Description: �ϥΥ��h���P�w�s�Ӵ����ʯ�
 * Maintainers: User:fdcn @zh.wikipedia
 *              [[en:User:Mike Dillon]], [[en:User:R. Koot]], [[en:User:SG]] @en.wikipedia
 */
var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
 })();

//�]�m����y����
var htmlE=document.documentElement;
htmlE.setAttribute("lang",wgUserLanguage);
htmlE.setAttribute("xml:lang",wgUserLanguage);

//��^�c²�r��
function wgULS(cn,tw,hk,sg,zh){
	return {//�O�ҨC�@�y������
		'zh-cn':cn||sg,
		'zh-sg':sg||cn,
		'zh-tw':tw||hk,
		'zh-hk':hk||tw,
		'zh':zh||cn||tw||hk||sg
	}[wgUserLanguage];
}
/*

== �y���ഫ�W�j ==
*/
/** lan enhanced Conversion ***********************************************************
 *
 *  Description: 
 *  Maintainers: [[User:Fdcn]]?
 */
addOnloadHook(function(){
	var lanBlocks=getElementsByClassName(document.getElementById('bodyContent'),"*","lanOptional");
	for(var i = 0; i < lanBlocks.length; i++) {
		if(!hasClass(lanBlocks[i],wgUserLanguage)){lanBlocks[i].style.display="none";}
	}
});

/*

== �u�㴣�ܻP�ֱ��� ==
*/
ta = {};
ta['ca-article'] = ['a',wgULS('�s?���إ���','�s�����إ���')];
ta['ca-nomove'] = ['',wgULS('�A���ಾ�ʳo�ӭ���','�A���ಾ�ʳo�ӭ���')];
ta['n-Featured_articles']=['',wgULS('�d�ݤ���Taipedia���S�����','�d�ݤ���Taipedia���S�����')];
ta['n-Featured_content']=['',wgULS('�d�ݤ���Taipedia���S��?�e','�d�ݤ���Taipedia���S�⤺�e')];
ta['n-commonsupload'] = ['',wgULS('��ۥѪ��v�Ϥ��W�Ǩ����@�ɸ귽','��ۥѪ��v�Ϥ��W�Ǩ����@�ɸ귽')];
ta['n-contact'] = ['',wgULS('�p���p��Taipedia','�p���p��Taipedia')];
ta['n-villagepump'] = ['',wgULS('�ѻPTaipedia���s���Q��','�ѻPTaipedia���s���Q��')];
ta['n-Information_desk'] = ['',wgULS('�ѵ�����PTaipedia�L�������D���a��','�ѵ�����PTaipedia�L�������D���a��')];
ta['n-conversion'] = ['',wgULS('���X�c²����?�ШD','���X�c²���ഫ�ШD')];
ta['n-allpages'] = ['',wgULS('�s?�Ҧ��������M��','�s���Ҧ��������M��')];
ta['ca-nstab-project'] = ['a',wgULS('�d�ݺ���p������','�d�ݺ���p�e����','�d�ݺ���p������')];
ta['n-policy'] = ['',wgULS('�d��Taipedia����w�M����','�d��Taipedia����w�M����')];

/*

== �S������u�}�P�����챵���==
*/

addOnloadHook(function() 
{
	if ( document.getElementById( "p-lang" ) ) {
		var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );

		for ( var i = 0; i < InterwikiLinks.length; i++ ) {
			if ( document.getElementById( InterwikiLinks[i].className + "-fa" ) ) {
				InterwikiLinks[i].className += " FA"
				InterwikiLinks[i].title = wgULS("�����ج��S����ءC","�����ج��S����ءC");
			}
			if ( document.getElementById( InterwikiLinks[i].className + "-ga" ) ) {
				InterwikiLinks[i].className += " GA"
				InterwikiLinks[i].title = wgULS("�����ج��u�}���ءC","�����ج��u�}���ءC");
			}
		}
	}
});

/*

== �վ�s��u����==

*/
//�[���s��u��\��
importScript('MediaWiki:Edittools.js');

//mwEditButtons , mwCustomEditButtons ���w�]���s�T�����X
function addEditButton(imageId, imageFile, tagOpen, sampleText, tagClose, speedTip){
	var item={
		"imageId": imageId,
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/" + imageFile,
		"tagOpen": tagOpen,
		"sampleText": sampleText,
		"tagClose": tagClose,
		"speedTip": speedTip
	};
	mwCustomEditButtons.push(item);
	if(imageId){mwCustomEditButtons[imageId]=item;}
	return item;
}

//define buttons�@�w�q���s
var __temp;
addEditButton('btnBold','6/6f/Bold_icon.png','\'\'\'','����','\'\'\'','����');
addEditButton('btnItalic','d/d7/Italic_icon.png','\'\'','����','\'\'','����'); 
addEditButton('btnInterLink','f/f3/Internal_link_icon.png','[[','�챵���D',']]','?���챵');
addEditButton('btnSignature','c/c7/Signature_icon.png','�X~~\~~','','','ñ�W');
addEditButton('btnHeadline2','e/e9/Button_headline2.png','== ','���D��r',' ==','2�ż��D��r');
addEditButton('btnHr','a/a4/H-line_icon.png','\n----\n','','',wgULS('����?','�����u'));
addEditButton('btnMediaLink','9/9d/Media_icon.png','[[Media:','Example.ogg',']]','�C�����챵');
addEditButton('btnExtraLink','7/73/External_link_icon.png','[','http://www.example.com �챵���D',']','�~���챵(�[�e�� http://)');
addEditButton('btnTemplateLink',"9/97/Template_button.png", "\n<blockquote>\n", "�ޤ�", "\n</blockquote>","�ޤ�");
addEditButton('btnRedirect',"4/47/Button_redir.png", "#REDIRECT [[", wgULS("�ؼб��ئW","�ؼб��ئW"), "]]", "���w�V");
addEditButton('btnImage','f/f0/Image_icon.png','\n�o�̦��Ϥ�\n','','','�o�̦��Ϥ�');
addEditButton('btnGallery',"9/9e/Btn_toolbar_gallery.png","<gallery>",__temp+__temp,"\n</gallery>",wgULS("�e�Y", "�e�Y"));
addEditButton('btnMath','5/5b/Math_icon.png','<math>','���J�ƾǤ���','</math>','���J�ƾǤ���(LaTeX)');
addEditButton('btnNowiki','8/82/Nowiki_icon.png','<nowiki>','���J�D�榡�奻','</nowiki>','���J�D�榡�奻');
addEditButton('btnUnderline','f/fd/Button_underline.png','<span style="text-decoration: underline;">',__temp,'</span>',__temp);
__temp=wgULS("?��?","�R���u");
addEditButton('btnStrike',"c/c9/Button_strike.png", "<del>",__temp, "</del>",__temp);
__temp=wgULS("�����","�����");
addEditButton('btnAlignLeft',"e/ea/Button_align_left.png", '<div style="text-align: left;">\n',__temp, "\n</div>",__temp);
addEditButton('btnAlignCenter',"5/5f/Button_center.png", '<div style="text-align: center;">\n', "�~��", "\n</div>","�~��");
__temp=wgULS("�k���","�k���");
addEditButton('btnAlignRight',"a/a5/Button_align_right.png", '<div style="text-align: right;">\n',__temp, "\n</div>",__temp);
__temp=wgULS("�W��","�W��");
addEditButton('btnSup',"6/6a/Button_sup_letter.png", "<sup>",__temp, "</sup>", __temp);
__temp=wgULS("�U��","�U��");
addEditButton('btnSub',"a/aa/Button_sub_letter.png", "<sub>",__temp, "</sub>",__temp);
addEditButton('btnShift',"8/8e/Button_shifting.png", ":", "", "", wgULS("�Y�i","�Y�i") );
addEditButton('btnEnum',"8/88/Btn_toolbar_enum.png", "#", "", "", wgULS("�Ʀr�C��","�Ʀr�C��") );
addEditButton('btnList',"1/11/Btn_toolbar_liste.png", "*", "", "", wgULS("�Ÿ��C��","�Ÿ��C��") );
addEditButton('btnDefine',"d/d3/Button_definition_list.png", "; ", wgULS("���q","���q") , " : ", wgULS("�w�q�奻","�w�q�奻") );
addEditButton('btnColor',"1/1e/Button_font_color.png", '<span style="color: ColorName;">', "�m��奻", "</span>", "�m��奻");
addEditButton('btnQuote',"f/fd/Button_blockquote.png", '{\{quote2|\n', "�ޤ�", "\n|\n}\}", wgULS("���ޥ�","���ޥ�"));
addEditButton('btnCode',"2/23/Button_code.png", "<code>", wgULS("�N�X","�N�X"), "</code>", wgULS("�N�X�奻","�N�X�奻"));
addEditButton('btnComment',"3/34/Button_hide_comment.png", "<!-- ", wgULS("���ä�r","���ä�r"), " -->", wgULS("�`�������ä�r","�`�������ä�r"));
__temp=wgULS("�Ѧ�","�Ѧ�");
addEditButton('btnRef2', "c/cf/Button_ref_adv.png", '<ref name="">', __temp, '</ref>', __temp  );
addEditButton('btnReferences', "f/fe/Button_refs.png", '\n==�ѦҤ��m==\n<div class="references-small">\n<references />\n</div>', '', '', wgULS("�ѦҤ��m��","�ѦҤ��m��")  );
delete __temp;

//�]�m�e��
mwCustomEditButtons['btnRef2'].width = 12;
//�]�m��s��Ҧ�
mwCustomEditButtons['btnHeadline2'].doClick=
mwCustomEditButtons['btnAlignLeft'].doClick=
mwCustomEditButtons['btnAlignCenter'].doClick=
mwCustomEditButtons['btnAlignRight'].doClick=
mwCustomEditButtons['btnShift'].doClick=
mwCustomEditButtons['btnEnum'].doClick=
mwCustomEditButtons['btnList'].doClick=
mwCustomEditButtons['btnDefine'].doClick=
function(info){insertLine(info.tagOpen,info.sampleText, info.tagClose,true);}

//�W�[�U�Կ��
addOnloadHook(function(){
	if(JSConfig.edittoolsMode=='min'){mwCustomEditButtons=[];return;}
	mwEditButtons=[];//�M����t�Ϋ��s

	var menu=createDropdownMenu('�峹����',"articleEdit","dropdownListEditTools");
	if(!menu) return;
	menu.add("���","seealso",
		"\n[[category:���]]\n");
	menu.add("Bolivia ���Q����","seealso",
		"\n[[category:���Q����]]\n");
	menu.add("����","seealso",
		"\n[[category:����]]\n");
	menu.add("�L��","seealso",
		"\n[[category:�L��]]\n");
	menu.add("���I��","seealso",
		"\n[[category:���I��]]\n");
	menu.add("Ecuador �̥ʦh","seealso",
		"\n[[category:�̥ʦh]]\n");
	menu.add("�Ȭw","seealso",
		"\n[[category:�Ȭw]]\n");
	menu.add("���w","stub",
		"\n[[category:���w]]\n");
	menu.add("�D�w","stub",
		"\n[[category:�D�w]]\n");
	menu.add("�ڬw","stub",
		"\n[[category:�ڬw]]\n");
	menu.add("�ڰ򴵩Z","stub",
		"\n{{", "�ڰ򴵩Z", "}}\n");
	

	menu=createDropdownMenu('�峹�s��i��',"langTags","dropdownListEditTools");
	if(!menu) return;
	menu.add("½Ķ��","seealso",
		"\n[[category:GVO½Ķ���M��]]\n");
	menu.add("�ݮչ�","seealso",
		"\n[[category:GVO�ݮչ�M��]]\n");
	menu.add("�չ襤","seealso",
		"\n[[category:GVO�չ襤�M��]]\n");
	menu.add("�ݽT�{","seealso",
		"\n[[Category:GVO�ݽT�{�M��]]\n");
	menu.add("�ݤW�Z","seealso",
		"\n[[Category:GVO�ݤW�Z�M��]]\n");
	menu.add("�w�W�Z","seealso",
		"\n[[category:GVO�w�W�Z�M��]]\n");
});

// �վ�u��
hookEvent("load",function(){
	var wpEditToolbar=document.getElementById("toolbar");
	if(!wpEditToolbar){return;}
	var dropdownListEditTools=document.getElementById('dropdownListEditTools');
	//���ʤU�Կ��
	if(dropdownListEditTools){wpEditToolbar.appendChild(dropdownListEditTools);}

	//���ʲŸ���
	var editspecialchars=document.getElementById("editpage-specialchars");
	elementMoveto(editspecialchars , wpEditToolbar , 'after' );
});

/*

== �W�[�S��Ÿ����U�Կ�� ==
*/
/**
 * add menu for selecting subsets of secial characters
 * must match MediaWiki:Edittools
 * Maintainers: User:fdcn @zh.wikipedia
 */
addOnloadHook(function(){
	var edittools = document.getElementById('editpage-specialchars');
	if (edittools) {
		// select subsection of special characters
		var lines = edittools.getElementsByTagName('p');
		function chooseCharSubset() {
			var s=menu.selectedIndex;
			for (var i = 0,p; p=lines[i] ; i++) {
				p.style.display = i == s ? 'inline' : 'none';
			}
		}

		var menu=createElement("select",null,{
			'styles':{'display':"inline"},
			'events':{'change':chooseCharSubset}
		});
		for (var i = 0,p; p=lines[i] ; i++) {
			menu.options[i]=new Option(p.title?p.title:p.id);
		}
		edittools.insertBefore(menu,edittools.firstChild);
		chooseCharSubset();
	}
});

/*

== �q���s��s�� ==
*/
//JSConfig.isEdit0 �]�m�O�_�X�{�u�s�譺�q�v���s
//�藍�ݭn�s�譺�q�������A�٥i�b�������[ Template:NoEdit �ҪO�ӸT�ΡC
//JSConfig.editSectionLink �]�m�u�s��v���s����m
if (wgIsArticle && wgAction == "view") {
	//�W�[�s�譺�q���s
	addOnloadHook(function(){
		if(!JSConfig.isEdit0||(document.getElementById&&document.getElementById('no-edit-0'))){return;}
		var caEdit=document.getElementById&&document.getElementById('ca-edit');
		if (!caEdit){return;}
		var linkAttributes={
			'href':caEdit.firstChild.href + '&section=0',
			'title':wgULS('�s�西��Ҧ����D���e����r�]�q�`�٬����q�ξɨ��^','�s�西��Ҧ����D���e����r�]�q�`�٭��q�ξɨ��^'),
			'accesskey':'0'
		}

		//�W�[0���s��ñ
		var caEdit0 = createElement(
			'li',
			[createElement('A',['0'],linkAttributes)],
			{id:'ca-edit-0'}
		);
		caEdit.className = 'istalk';
		elementMoveto(caEdit0,caEdit,"after");

		//�W�[���ؼ��D�U�����s�譺�q�����s
		var editsection0= createElement(
			'span',
			['[',createElement('A',[wgULS('�s�譺�q','�s�譺�q')],linkAttributes),']'],
			{'class':'editsection'}
		);
		var siteSub=document.getElementById&&document.getElementById('siteSub');
		elementMoveto( editsection0 , siteSub.firstChild );
	});
	
	//�]�m�s����s��m�O�_�B��
	addOnloadHook(function(){
		if (JSConfig.editSectionLink=='right') { return; }
		var editLinks=getElementsByClassName(document.getElementById('bodyContent'),"span","editsection");
		for(var i = 0; i < editLinks.length; i++) {
			editLinks[i].style.cssFloat = editLinks[i].style.float = 'none';
			editLinks[i].style.textAlign = "left" ;
			editLinks[i].parentNode.appendChild(editLinks[i]);
		}
	});
}

/*

== �W�[���|�\�� ==
*/
/** ���| div table *****************************
 *  Description: ��{div.NavFrame�Mtable.collapsible���i��?�ʡC
 *  JSConfig��collapseText�BexpandText�BautoCollapse�ݩʩw�q�q�{��r�M�q�{�̤֦۰ʧ�?��
 *  Maintainers: User:fdcn
 */
addOnloadHook(function(){
	function toggleState(item){
		var nstate=1-item.state;
		if(item.text[0]){
			item.text[item.state].style.display = 'inline';
			item.text[nstate].style.display='none';
		}
		item.state=nstate;
		item.action(item);
	}

	function cancelBubble(e){
		e=e||window.event;
		if(e.stopPropagation){e.stopPropagation();}else{e.cancelBubble=true;}
	}
	function createToggleButton(head,frame,toggle){
		var textS,textH;
		var button=getElementsByClassName(head,"span","NavToggle")[0];
		if(button){
			textS=getElementsByClassName(button,"span","NavToggleShow")[0]
			textH=getElementsByClassName(button,"span","NavToggleHide")[0];
		}else {
			textS=createElement("span",[JSConfig.expandText]);
			textH=createElement('span',[JSConfig.collapseText]);
			button=createElement("span",[textS,textH],{'class':"NavToggle",styles:{'width':"3.8em"}});
		}
		if(textS){textS.style.display='none';}
		button.style.display='inline';
		var item={'state':0, 'text':[textS,textH],'frame':frame,'action':toggle}

		var links=head.getElementsByTagName("A");
		for(var i=0,l;l=links[i];i++){l.onclick=cancelBubble;}
		
		head.insertBefore( button, head.childNodes[0] );
		head.onclick=function(){toggleState(item);}
		head.style.cursor = "pointer";
		return item;
	}
	
	// ���|div 
	function toggleNavigationBar(item)
	{
		var cls=item.state?'none':'block';
		for (
			var NavChild = item.frame.firstChild;
			NavChild != null;
			NavChild = NavChild.nextSibling
		){
			if (NavChild.className == 'NavPic' || NavChild.className == 'NavContent') {
				NavChild.style.display = cls;
			}
		}
	}
	
	// ���|���
	function collapseTable( item )
	{
		var rows = item.frame.getElementsByTagName( "tr" ); 
		var rowsLen=rows.length;
		if (item.state ) {
			for ( var i = 1; i < rowsLen; i++ ) {
				rows[i].style.display = "none";
			}
		} else {
			for ( var i = 1; i < rowsLen; i++ ) {
				rows[i].style.display = rows[0].style.display;
			}
		}
	}
	
	//init
	var item,items=[];
	var NavFrames=getElementsByClassName(document,"div","NavFrame");
	for(var i=0,NavFrame;NavFrame = NavFrames[i];i++) {
		var heads=getElementsByClassName(NavFrame,"div","NavHead");
		for(var ih=0,head; head = heads[ih]; ih++ ) {
			if (head.parentNode != NavFrame) {continue;}
			items.push(createToggleButton(head,NavFrame,toggleNavigationBar));
			break;
		}
	 }

	var tables = getElementsByClassName(document,"table","collapsible");
	for ( var i = 0,table; table= tables[i]; i++ ) {
		var head = table.getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
		items.push(createToggleButton(head,table,collapseTable));
	}

	var count=items.length;
	for ( var i = 0;  i<count; i++ ) {
		item=items[i];
		if ( hasClass( item.frame, "collapsed" ) || ( count >= JSConfig.autoCollapse && hasClass( item.frame, "autocollapse" ) ) ) {
			toggleState(item);
		}
	}
});

//�ץ����|��w���ܤ�
hookEvent("load",function(){if(location.hash){location.href=location.hash;}});

/*

== ������X�ץ� ==
*/
/** ������X�ץ� *******************************************************
  *
  *  �y�z:
  *  ���@��: [[User:Fdcn]]
  */

var isMainPageFront = ("����" == wgTitle);// "����" == wgTitle�@�N���w�V��
var isMainPage = ( isMainPageFront  && /(title=|\/wiki\/)([Tt]alk:|)/.test(document.location) );
var locationsearch=document.location.search;
var isDiff = ( locationsearch && (locationsearch.indexOf("diff=") != -1 || locationsearch.indexOf("oldid=") != -1));

if (isMainPage){
	//��������y���챵���[�JTaipedia�y���C���챵
	function appendOtherLanguageLink() {
		var mpInterwiki = document.getElementById("p-lang")
		var ul=mpInterwiki&&mpInterwiki.getElementsByTagName("ul")[0];
		if(ul) {
			var link=createElement('A',
				[ createElement('strong',[wgULS('Taipedia�y���C��','Taipedia�y���C��')]) ],
				{'href':'http://zh.wikipedia.org/wiki/Wikipedia:%E7%BB%B4%E5%9F%BA%E7%99%BE%E7%A7%91%E8%AF%AD%E8%A8%80%E5%88%97%E8%A1%A8'}
			);
			ul.appendChild(createElement("li",[link]));
		}
	}

	if (isMainPageFront && !isDiff){
		document.write('<style type="text/css">/*<![CDATA[*/ #lastmod, #siteSub, #contentSub, h1.firstHeading { display: none !important; } /*]]>*/</style>');
		onloadFuncts.push(appendOtherLanguageLink);
	}

	var mpSmallEnabled;
	var mpMinWidth = 700;

	function mainPageTransform(){
		if (document.getElementById('ca-nstab-main')) {
			document.getElementById('ca-nstab-main').firstChild.innerHTML = wgULS('����','����');
		}

		var mpContentEl = document.getElementById("bodyContent");
		var mpBrowseEl = document.getElementById("EnWpMpBrowse");
		var mpContainEl = document.getElementById("EnWpMpBrowseContainer");
		var mpMarginEl = document.getElementById("EnWpMpMargin");
		var mpEl = document.getElementById("EnWpMainPage");

		if (!mpContentEl || !mpBrowseEl || !mpContainEl || !mpMarginEl || !mpEl)
			return;

		if (!mpSmallEnabled && mpContentEl.offsetWidth < mpMinWidth)
		{
			mpContainEl.insertBefore(mpBrowseEl, mpContainEl.firstChild);
			mpBrowseEl.className = "EnWpMpBrowseBottom";
			mpMarginEl.style.marginRight = 0;
			mpSmallEnabled = true;
		}
		else if (mpSmallEnabled && mpContentEl.offsetWidth > mpMinWidth)
		{
			mpEl.insertBefore(mpBrowseEl, mpEl.firstChild);
			mpBrowseEl.className = "EnWpMpBrowseRight";
			mpMarginEl.style.marginRight = "13.8em";
			mpSmallEnabled = false;
		}
	}

	addOnloadHook(mainPageTransform);

	hookEvent("resize", mainPageTransform);
}

/*

== �����׭q�s��K�n�ץ� ==
*/
/**
 fix edit summary prompt for undo
 this code fixes the fact that the undo function combined with the "no edit summary prompter" causes problems if leaving the edit summary unchanged
 this was added by [[:en:User:Deskana]], code by [[:en:User:Tra]]
 */
addOnloadHook(function () {
	var autoSummary=document.getElementsByName('wpAutoSummary')[0];
	if (document.location.search.indexOf("undo=") != -1 && autoSummary)
	{
		 autoSummary.value='';
	}
})

/*

==[[Special:Search]]��L�j�M�����s�����==
*/
var searchEngines=[];
var createSearchForm;//�i�b��?�ֽ�JS���ۦ�W�[�����C
function SpecialSearchEnhanced() 
{
	if (
		JSConfig.SpecialSearchEnhancedDisabled ||
		wgCanonicalNamespace != "Special" ||
		wgCanonicalSpecialPageName != "Search"
	){return;}
	if(skin == "monobook" || skin == "cologneblue" || skin == "simple"){
		var mainNode = document.getElementsByTagName("form")[0];
	}
	if (!mainNode) return;
	var searchbox=document.getElementById("lsearchbox");
	var div= createElement("div",null,{styles:{'width':"100%",'textAlign':'center'}});
	mainNode.appendChild(div);

	/**
	 * �إߤ@�ӷj������
	 */
	createSearchForm=function(engine_name, engine_url, logo_url, search_action_url, 
	search_field_name, add_search_field, field_array, logo_width, logo_height)
	{
		var input=createElement("input",null,{'type':"hidden",'name':search_field_name})
		var inputs = [input];
		for( var k in field_array){
			inputs.push(createElement(
				"input",null,{'type':"hidden",'name':k,'value':field_array[k]}
			));
		}
		inputs.push(createElement(
			"input",null,{'type':"submit",'value':wgULS('�j��','�j�M')}
		));
		var form = createElement("form",inputs,
			{
				'method':"get",
				'action':search_action_url,
				'styles':{'display':"inline"},
				'events':{'submit':function(){input.value = searchbox.value+add_search_field;}}
			}
		);
		
		var img = createElement("img",null,{
			'src':logo_url,
			'alt':engine_name,
			'styles':{'borderWidth':"0",'padding':"5px",'width':logo_width||'135px','height':logo_height||'35px'}
		});
		var a = createElement("a",[img],{'href':engine_url});
		var span= createElement("span",[form,a],{styles:{'marginRight':"1em"}});

		searchEngines.push(span);
		searchEngines[engine_name]=span;
		div.appendChild(span);
	}

	//�󦹶}�l�C�ܦU�����C
	//google
	createSearchForm(
		"Google","http://www.google.com/",  
		"http://www.google.com/logos/powered_by_google_135x35.gif", 
		"http://www.google.com/search","q", "", 
		{"as_sitesearch": "zh.wikipedia.org"},
		"135px","35px"
	);		
	//live search
	createSearchForm(
		"Live", "http://search.live.com/",   
		"http://upload.wikimedia.org/wikipedia/zh/thumb/1/17/Mslivelogo.png/120px-Mslivelogo.png",
		"http://search.live.com/results.aspx","q", "",
		{"q1":"site:zh.wikipedia.org"},
		'120px','24px'
	);
	//yahoo
	createSearchForm(
		"Yahoo!", "http://www.yahoo.com/",  
		"http://upload.wikimedia.org/wikipedia/zh/thumb/a/ad/Yahoo_Logo.svg/120px-Yahoo_Logo.svg.png",
		"http://search.yahoo.com/search","p", "", 
		{"vs": "zh.wikipedia.org","ei":"UTF-8"},
		'135px','25px'
	);
	//zhosisterps
	createSearchForm(
		"����t�����p���j�M", "http://www.google.com/coop/",
		"http://www.google.com/coop/images/google_coop_sm.gif",
		"http://www.google.com/"+"cse","q","",
		{"cx":"009212467671870524522:mw9ug06rtl4","cof":"FORID:0","sa":"Search"},
		"150px","58px"
	);
	//zhsisterps
	createSearchForm(
		"�������C��j��", "http://www.google.com/coop/",
		"http://www.google.com/coop/images/google_coop_sm.gif",
		"http://www.google.com/"+"cse","q","",
		{"cx":"012948615710733534834:sce7kigca9g","cof":"FORID:0","sa":"Search"},
		"150px","58px"
	);

}

addOnloadHook(SpecialSearchEnhanced); //�Ұ�Search Engine

/*
==Wikimedia�C�鼽��==
*/

/** MediaWiki media player *******************************************************
  *
  *  Description: A Java player for in-browser playback of media files.
  *  Created by: [[:en:User:Gmaxwell]]
  */
 
importScript('Mediawiki:Wikimediaplayer.js');

/*

==WikiCharts�����s���p�ƾ�==
*/
/** pageview counter ***********************************************************
 *
 *  Description: Please talk to de:User:LeonWeber before changing anything or 
 *               if there are any issues with that.
 *  Maintainers: [[:de:User:LeonWeber]]?
 *  �ثeWikiCharts�٨S���W�[zh�ﶵ�A�G�Ȯɤ��ϥΥ��qJS�C --[[User:�²ª��pB|�²ª��pB]] | [[User_talk:�²ª��pB|20��]] 2007�~8��21�� (�G) 16:22 (UTC)
 */

// this should be adjusted to a good value.
// BE CAREFUL, you will break zedler if it's too low!
// And then DaB. will kill Leon :-(
/* 
var disable_counter = 0;
var counter_factor = 6000;

function pgcounter_setup()
{
	if(disable_counter == 0)
	{
		var url = window.location.href;
		if(Math.floor(Math.random()*counter_factor)==42)  // the probability thing
		{
			if(wgIsArticle==true || wgArticleId==0) // do not count history pages etc.
			{
				var pgcountNs = wgCanonicalNamespace;
				if(wgCanonicalNamespace=="")
				{
					pgcountNs = "0";
				}
				var cnt_url = "http://pgcount.wikimedia.de/index.png?ns=" + pgcountNs + "&title=" + encodeURI(wgTitle) + "&factor=" + counter_factor +"&wiki=zhwiki";
				var img = new Image(); 
				img.src = cnt_url;
			}
		}
	}
}
*/
// Do not use aOnloadFunctions[aOnloadFunctions.length] = pgcounter_setup;, some browsers don't like that.
//pgcounter_setup();
/*

==WikiMiniAtlas�@�ɦa��==
*/
/** WikiMiniAtlas *******************************************************
   *
   *  �y�z�GWikiMiniAtlas�O�@��popup�ӥi�I��P�즲���@�ɦa�ϡC
   *               �o�Ӹ}���N�|���Ҧ����g�n�׼Хܤ����WikiMiniAtlas��popup�}�ҫ��s�C
   *               �ѩ�Q�\�h�p�e�ϥΡA�]���}����m�b�����򤤡C
   *               ��h��T�иԨ�[[Meta:WikiMiniAtlas]]�C
   *  �Ыت̡G[[:en:User:Dschwen]]
   */
 
importScript('http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&dontcountme=s');

/* </pre> */
