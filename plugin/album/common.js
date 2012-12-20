var imageCount = nameArray.length-1;

linkArray[-1] = '/?action=PluginResource&type=album&type=album_no_left.png';
nameArray[-1] = 'no image';

if(imageCount == 0){
	imageCount = 1;
	linkArray[0] = '/?action=PluginResource&type=album&type=album_no_image.png';
	nameArray[0] = 'NO IMAGE';
}

linkArray[imageCount] = '/?action=PluginResource&type=album&type=album_no_right.png';
nameArray[imageCount] = 'no image';

function onClickListItem(i){
	currentImage = i;
	Redraw();
}

hashpage = Number(window.location.hash.substr(1));
if(hashpage != currentImage) {
	currentImage = hashpage;
}

function onClickNext(){
	currentImage++;
	if(currentImage >= imageCount) currentImage = imageCount - 1;
	Redraw();
}

function onClickPrev(){
	currentImage--;
	if(currentImage < 0) currentImage = 0;
	Redraw();
}

//var cachedImage = new Image();

function Redraw(){
	var prevIdx = currentImage - 1;
	var nextIdx = currentImage + 1;
	var imgClass = '';
	if (zoomRatio != 'real') { imgClass = ' '+zoomRatio; }
	//cachedImage.src = linkArray[nextIdx];

	var imagePane = document.getElementById('imagePane');
	imagePane.innerHTML = '<a href="#'+nextIdx+'" onClick="onClickNext()"><img id="albumimg" class="main'+imgClass+'" src="'+linkArray[currentImage]+'" /></a>';

	var filenamePane = document.getElementById('filenamePane');
	filenamePane.innerHTML = nameArray[currentImage] + " &nbsp; (" + (currentImage) + "/" + Number(imageCount-1) + ")";

	// 좌우 이동 버튼
	if(currentImage > 0) { // 이전 페이지로 이동 가능
		document.getElementById('button_left_on').style.display = 'block';
		document.getElementById('control_prev').href = "#" + (prevIdx + 1);
	}
	else { // 이전 페이지로 이동 불가능
		document.getElementById('button_left_on').style.display = 'none';
	}
	if(currentImage < imageCount-1) { // 다음 페이지로 이동 가능
		document.getElementById('button_right_on').style.display = 'block';
		document.getElementById('control_next').href = "#" + (nextIdx - 1);
	}
	else { // 다음 페이지로 이동 불가능
		document.getElementById('button_right_on').style.display = 'none';
	}
	
	RedrawList();
	scroll(0, 0);
}

function onZoomChange(sel){
	var ratio = sel.options[sel.selectedIndex].value;
	if(ratio != '') {
		zoomRatio = ratio;
		Redraw();
	}
}

var listIsShown = false;

function RedrawList()
{
	var stringBuf = '';
	for( var i=0; i<imageCount; i++ ){
		var listactive = '';
		if(i == currentImage) listactive = ' class="active"';
		stringBuf += '<li'+listactive+'><a href="#'+i+'" onClick="onClickListItem('+i+')">' + nameArray[i] + '</a></li>\n';
	}

	var fileList = document.getElementById('fileList');
	fileList.innerHTML = '<ul class="list-vertical">'+stringBuf+'</ul>';
}

//key control enable
window.document.onkeydown = function(e) {
	if(!e){ e = event; }
	//before page
	if(e.keyCode == 37 && currentImage>0) {
		onClickPrev();
		location.href="#"+Number(window.location.hash.substr(1));
	}
	if(e.keyCode == 39 && currentImage<imageCount-1) {
		onClickNext();
	}
}