/* Any JavaScript here will be loaded for all users on every page load. */
/* 此處的JavaScript將載入於所有用戶每一個頁面。 */
/* add to http://address_of_wik/MediaWiki:Common.js  */
/* <pre> */

/*
所有用戶在加載任何頁面時，這裡的JavaScript都會加載

== 輔助處理 ==
*/
//功能設定
var JSConfig={
	edittoolsMode:'plus', //設置編輯按鈕方案，可自定方案
	isEdit0:true, //設置是否顯示編輯首段按鈕
	editSectionLink:'right',//設置編輯按鈕是否在右側
	collapseText:wgULS('隱藏▲','隱藏▲'),//指示折?收縮的默認文字
	expandText:wgULS('顯示▼','顯示▼'),//指示折?展開的默認文字
	autoCollapse:2,  //文章少于 autoCollapse 個折?塊時，不自動折?
	SpecialSearchEnhancedDisabled:false//是否禁止增加其它搜索引擎
}
// 兼容性修正
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

// 移動元素
function elementMoveto(node, refNode, pos){//默認位置為refNode前
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
//創建元素
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
 
//導入模塊
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

/* 測試元素中是否含有指定的?式 **************************************
 * Description: 使用正則式與緩存來提高性能
 * Maintainers: User:fdcn @zh.wikipedia
 *              [[en:User:Mike Dillon]], [[en:User:R. Koot]], [[en:User:SG]] @en.wikipedia
 */
var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
 })();

//設置中文語言頁
var htmlE=document.documentElement;
htmlE.setAttribute("lang",wgUserLanguage);
htmlE.setAttribute("xml:lang",wgUserLanguage);

//返回繁簡字串
function wgULS(cn,tw,hk,sg,zh){
	return {//保證每一語言有值
		'zh-cn':cn||sg,
		'zh-sg':sg||cn,
		'zh-tw':tw||hk,
		'zh-hk':hk||tw,
		'zh':zh||cn||tw||hk||sg
	}[wgUserLanguage];
}
/*

== 語言轉換增強 ==
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

== 工具提示與快捷鍵 ==
*/
ta = {};
ta['ca-article'] = ['a',wgULS('瀏?條目正文','瀏覽條目正文')];
ta['ca-nomove'] = ['',wgULS('你不能移動這個頁面','你不能移動這個頁面')];
ta['n-Featured_articles']=['',wgULS('查看中文Taipedia的特色條目','查看中文Taipedia的特色條目')];
ta['n-Featured_content']=['',wgULS('查看中文Taipedia的特色?容','查看中文Taipedia的特色內容')];
ta['n-commonsupload'] = ['',wgULS('把自由版權圖片上傳到維基共享資源','把自由版權圖片上傳到維基共享資源')];
ta['n-contact'] = ['',wgULS('如何聯絡Taipedia','如何聯絡Taipedia')];
ta['n-villagepump'] = ['',wgULS('參與Taipedia社群的討論','參與Taipedia社群的討論')];
ta['n-Information_desk'] = ['',wgULS('解答任何與Taipedia無關的問題的地方','解答任何與Taipedia無關的問題的地方')];
ta['n-conversion'] = ['',wgULS('提出繁簡體轉?請求','提出繁簡體轉換請求')];
ta['n-allpages'] = ['',wgULS('瀏?所有頁面的清單','瀏覽所有頁面的清單')];
ta['ca-nstab-project'] = ['a',wgULS('查看維基計劃頁面','查看維基計畫頁面','查看維基計劃頁面')];
ta['n-policy'] = ['',wgULS('查看Taipedia的方針和指引','查看Taipedia的方針和指引')];

/*

== 特色條目優良與條目鏈接顯示==
*/

addOnloadHook(function() 
{
	if ( document.getElementById( "p-lang" ) ) {
		var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );

		for ( var i = 0; i < InterwikiLinks.length; i++ ) {
			if ( document.getElementById( InterwikiLinks[i].className + "-fa" ) ) {
				InterwikiLinks[i].className += " FA"
				InterwikiLinks[i].title = wgULS("此條目為特色條目。","此條目為特色條目。");
			}
			if ( document.getElementById( InterwikiLinks[i].className + "-ga" ) ) {
				InterwikiLinks[i].className += " GA"
				InterwikiLinks[i].title = wgULS("此條目為優良條目。","此條目為優良條目。");
			}
		}
	}
});

/*

== 調整編輯工具欄==

*/
//加載編輯工具功能
importScript('MediaWiki:Edittools.js');

//mwEditButtons , mwCustomEditButtons 為預設按鈕訊息集合
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

//define buttons　定義按鈕
var __temp;
addEditButton('btnBold','6/6f/Bold_icon.png','\'\'\'','粗體','\'\'\'','粗體');
addEditButton('btnItalic','d/d7/Italic_icon.png','\'\'','斜體','\'\'','斜體'); 
addEditButton('btnInterLink','f/f3/Internal_link_icon.png','[[','鏈接標題',']]','?部鏈接');
addEditButton('btnSignature','c/c7/Signature_icon.png','—~~\~~','','','簽名');
addEditButton('btnHeadline2','e/e9/Button_headline2.png','== ','標題文字',' ==','2級標題文字');
addEditButton('btnHr','a/a4/H-line_icon.png','\n----\n','','',wgULS('水平?','水平線'));
addEditButton('btnMediaLink','9/9d/Media_icon.png','[[Media:','Example.ogg',']]','媒體文件鏈接');
addEditButton('btnExtraLink','7/73/External_link_icon.png','[','http://www.example.com 鏈接標題',']','外部鏈接(加前綴 http://)');
addEditButton('btnTemplateLink',"9/97/Template_button.png", "\n<blockquote>\n", "引文", "\n</blockquote>","引文");
addEditButton('btnRedirect',"4/47/Button_redir.png", "#REDIRECT [[", wgULS("目標條目名","目標條目名"), "]]", "重定向");
addEditButton('btnImage','f/f0/Image_icon.png','\n這裡有圖片\n','','','這裡有圖片');
addEditButton('btnGallery',"9/9e/Btn_toolbar_gallery.png","<gallery>",__temp+__temp,"\n</gallery>",wgULS("畫廊", "畫廊"));
addEditButton('btnMath','5/5b/Math_icon.png','<math>','插入數學公式','</math>','插入數學公式(LaTeX)');
addEditButton('btnNowiki','8/82/Nowiki_icon.png','<nowiki>','插入非格式文本','</nowiki>','插入非格式文本');
addEditButton('btnUnderline','f/fd/Button_underline.png','<span style="text-decoration: underline;">',__temp,'</span>',__temp);
__temp=wgULS("?除?","刪除線");
addEditButton('btnStrike',"c/c9/Button_strike.png", "<del>",__temp, "</del>",__temp);
__temp=wgULS("左對齊","左對齊");
addEditButton('btnAlignLeft',"e/ea/Button_align_left.png", '<div style="text-align: left;">\n',__temp, "\n</div>",__temp);
addEditButton('btnAlignCenter',"5/5f/Button_center.png", '<div style="text-align: center;">\n', "居中", "\n</div>","居中");
__temp=wgULS("右對齊","右對齊");
addEditButton('btnAlignRight',"a/a5/Button_align_right.png", '<div style="text-align: right;">\n',__temp, "\n</div>",__temp);
__temp=wgULS("上標","上標");
addEditButton('btnSup',"6/6a/Button_sup_letter.png", "<sup>",__temp, "</sup>", __temp);
__temp=wgULS("下標","下標");
addEditButton('btnSub',"a/aa/Button_sub_letter.png", "<sub>",__temp, "</sub>",__temp);
addEditButton('btnShift',"8/8e/Button_shifting.png", ":", "", "", wgULS("縮進","縮進") );
addEditButton('btnEnum',"8/88/Btn_toolbar_enum.png", "#", "", "", wgULS("數字列表","數字列表") );
addEditButton('btnList',"1/11/Btn_toolbar_liste.png", "*", "", "", wgULS("符號列表","符號列表") );
addEditButton('btnDefine',"d/d3/Button_definition_list.png", "; ", wgULS("釋義","釋義") , " : ", wgULS("定義文本","定義文本") );
addEditButton('btnColor',"1/1e/Button_font_color.png", '<span style="color: ColorName;">', "彩色文本", "</span>", "彩色文本");
addEditButton('btnQuote',"f/fd/Button_blockquote.png", '{\{quote2|\n', "引文", "\n|\n}\}", wgULS("塊引用","塊引用"));
addEditButton('btnCode',"2/23/Button_code.png", "<code>", wgULS("代碼","代碼"), "</code>", wgULS("代碼文本","代碼文本"));
addEditButton('btnComment',"3/34/Button_hide_comment.png", "<!-- ", wgULS("隱藏文字","隱藏文字"), " -->", wgULS("注釋或隱藏文字","注釋或隱藏文字"));
__temp=wgULS("參考","參考");
addEditButton('btnRef2', "c/cf/Button_ref_adv.png", '<ref name="">', __temp, '</ref>', __temp  );
addEditButton('btnReferences', "f/fe/Button_refs.png", '\n==參考文獻==\n<div class="references-small">\n<references />\n</div>', '', '', wgULS("參考文獻區","參考文獻區")  );
delete __temp;

//設置寬度
mwCustomEditButtons['btnRef2'].width = 12;
//設置行編輯模式
mwCustomEditButtons['btnHeadline2'].doClick=
mwCustomEditButtons['btnAlignLeft'].doClick=
mwCustomEditButtons['btnAlignCenter'].doClick=
mwCustomEditButtons['btnAlignRight'].doClick=
mwCustomEditButtons['btnShift'].doClick=
mwCustomEditButtons['btnEnum'].doClick=
mwCustomEditButtons['btnList'].doClick=
mwCustomEditButtons['btnDefine'].doClick=
function(info){insertLine(info.tagOpen,info.sampleText, info.tagClose,true);}

//增加下拉選單
addOnloadHook(function(){
	if(JSConfig.edittoolsMode=='min'){mwCustomEditButtons=[];return;}
	mwEditButtons=[];//清除原系統按鈕

	var menu=createDropdownMenu('文章分類',"articleEdit","dropdownListEditTools");
	if(!menu) return;
	menu.add("伊朗","seealso",
		"\n[[category:伊朗]]\n");
	menu.add("Bolivia 玻利維亞","seealso",
		"\n[[category:玻利維亞]]\n");
	menu.add("韓國","seealso",
		"\n[[category:韓國]]\n");
	menu.add("印度","seealso",
		"\n[[category:印度]]\n");
	menu.add("阿富汗","seealso",
		"\n[[category:阿富汗]]\n");
	menu.add("Ecuador 厄瓜多","seealso",
		"\n[[category:厄瓜多]]\n");
	menu.add("亞洲","seealso",
		"\n[[category:亞洲]]\n");
	menu.add("美洲","stub",
		"\n[[category:美洲]]\n");
	menu.add("非洲","stub",
		"\n[[category:非洲]]\n");
	menu.add("歐洲","stub",
		"\n[[category:歐洲]]\n");
	menu.add("巴基斯坦","stub",
		"\n{{", "巴基斯坦", "}}\n");
	

	menu=createDropdownMenu('文章編輯進度',"langTags","dropdownListEditTools");
	if(!menu) return;
	menu.add("翻譯中","seealso",
		"\n[[category:GVO翻譯中清單]]\n");
	menu.add("待校對","seealso",
		"\n[[category:GVO待校對清單]]\n");
	menu.add("校對中","seealso",
		"\n[[category:GVO校對中清單]]\n");
	menu.add("待確認","seealso",
		"\n[[Category:GVO待確認清單]]\n");
	menu.add("待上稿","seealso",
		"\n[[Category:GVO待上稿清單]]\n");
	menu.add("已上稿","seealso",
		"\n[[category:GVO已上稿清單]]\n");
});

// 調整工具
hookEvent("load",function(){
	var wpEditToolbar=document.getElementById("toolbar");
	if(!wpEditToolbar){return;}
	var dropdownListEditTools=document.getElementById('dropdownListEditTools');
	//移動下拉選單
	if(dropdownListEditTools){wpEditToolbar.appendChild(dropdownListEditTools);}

	//移動符號表
	var editspecialchars=document.getElementById("editpage-specialchars");
	elementMoveto(editspecialchars , wpEditToolbar , 'after' );
});

/*

== 增加特殊符號的下拉選單 ==
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

== 段落編輯連結 ==
*/
//JSConfig.isEdit0 設置是否出現「編輯首段」按鈕
//對不需要編輯首段的頁面，還可在頁面中加 Template:NoEdit 模板來禁用。
//JSConfig.editSectionLink 設置「編輯」按鈕的位置
if (wgIsArticle && wgAction == "view") {
	//增加編輯首段按鈕
	addOnloadHook(function(){
		if(!JSConfig.isEdit0||(document.getElementById&&document.getElementById('no-edit-0'))){return;}
		var caEdit=document.getElementById&&document.getElementById('ca-edit');
		if (!caEdit){return;}
		var linkAttributes={
			'href':caEdit.firstChild.href + '&section=0',
			'title':wgULS('編輯正文所有標題之前的文字（通常稱為首段或導言）','編輯正文所有標題之前的文字（通常稱首段或導言）'),
			'accesskey':'0'
		}

		//增加0按鈕標簽
		var caEdit0 = createElement(
			'li',
			[createElement('A',['0'],linkAttributes)],
			{id:'ca-edit-0'}
		);
		caEdit.className = 'istalk';
		elementMoveto(caEdit0,caEdit,"after");

		//增加條目標題下的“編輯首段”按鈕
		var editsection0= createElement(
			'span',
			['[',createElement('A',[wgULS('編輯首段','編輯首段')],linkAttributes),']'],
			{'class':'editsection'}
		);
		var siteSub=document.getElementById&&document.getElementById('siteSub');
		elementMoveto( editsection0 , siteSub.firstChild );
	});
	
	//設置編輯按鈕位置是否浮動
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

== 增加折疊功能 ==
*/
/** 折疊 div table *****************************
 *  Description: 實現div.NavFrame和table.collapsible的可折?性。
 *  JSConfig的collapseText、expandText、autoCollapse屬性定義默認文字和默認最少自動折?塊
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
	
	// 折疊div 
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
	
	// 折疊表格
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

//修正折疊後定位變化
hookEvent("load",function(){if(location.hash){location.href=location.hash;}});

/*

== 首頁輸出修正 ==
*/
/** 首頁輸出修正 *******************************************************
  *
  *  描述:
  *  維護者: [[User:Fdcn]]
  */

var isMainPageFront = ("首頁" == wgTitle);// "首頁" == wgTitle　代表重定向頁
var isMainPage = ( isMainPageFront  && /(title=|\/wiki\/)([Tt]alk:|)/.test(document.location) );
var locationsearch=document.location.search;
var isDiff = ( locationsearch && (locationsearch.indexOf("diff=") != -1 || locationsearch.indexOf("oldid=") != -1));

if (isMainPage){
	//首頁的跨語言鏈接中加入Taipedia語言列表鏈接
	function appendOtherLanguageLink() {
		var mpInterwiki = document.getElementById("p-lang")
		var ul=mpInterwiki&&mpInterwiki.getElementsByTagName("ul")[0];
		if(ul) {
			var link=createElement('A',
				[ createElement('strong',[wgULS('Taipedia語言列表','Taipedia語言列表')]) ],
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
			document.getElementById('ca-nstab-main').firstChild.innerHTML = wgULS('首頁','首頁');
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

== 取消修訂編輯摘要修正 ==
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

==[[Special:Search]]其他搜尋引擎連結表單==
*/
var searchEngines=[];
var createSearchForm;//可在用?皮膚JS中自行增加引擎。
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
	 * 建立一個搜索引擎
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
			"input",null,{'type':"submit",'value':wgULS('搜索','搜尋')}
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

	//於此開始列示各引擎。
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
		"中文系維基跨計劃搜尋", "http://www.google.com/coop/",
		"http://www.google.com/coop/images/google_coop_sm.gif",
		"http://www.google.com/"+"cse","q","",
		{"cx":"009212467671870524522:mw9ug06rtl4","cof":"FORID:0","sa":"Search"},
		"150px","58px"
	);
	//zhsisterps
	createSearchForm(
		"中文維基媒體搜索", "http://www.google.com/coop/",
		"http://www.google.com/coop/images/google_coop_sm.gif",
		"http://www.google.com/"+"cse","q","",
		{"cx":"012948615710733534834:sce7kigca9g","cof":"FORID:0","sa":"Search"},
		"150px","58px"
	);

}

addOnloadHook(SpecialSearchEnhanced); //啟動Search Engine

/*
==Wikimedia媒體播放器==
*/

/** MediaWiki media player *******************************************************
  *
  *  Description: A Java player for in-browser playback of media files.
  *  Created by: [[:en:User:Gmaxwell]]
  */
 
importScript('Mediawiki:Wikimediaplayer.js');

/*

==WikiCharts頁面瀏覽計數器==
*/
/** pageview counter ***********************************************************
 *
 *  Description: Please talk to de:User:LeonWeber before changing anything or 
 *               if there are any issues with that.
 *  Maintainers: [[:de:User:LeonWeber]]?
 *  目前WikiCharts還沒有增加zh選項，故暫時不使用本段JS。 --[[User:笨笨的小B|笨笨的小B]] | [[User_talk:笨笨的小B|20巷]] 2007年8月21日 (二) 16:22 (UTC)
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

==WikiMiniAtlas世界地圖==
*/
/** WikiMiniAtlas *******************************************************
   *
   *  描述：WikiMiniAtlas是一個popup而可點選與拖曳的世界地圖。
   *               這個腳本將會讓所有的經緯度標示中顯示WikiMiniAtlas的popup開啟按鈕。
   *               由於被許多計畫使用，因此腳本放置在元維基中。
   *               更多資訊請詳見[[Meta:WikiMiniAtlas]]。
   *  創建者：[[:en:User:Dschwen]]
   */
 
importScript('http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&dontcountme=s');

/* </pre> */
