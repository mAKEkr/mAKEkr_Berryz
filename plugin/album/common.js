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
	var zoomAttribute = '';
	if( zoomRatio != 'real' ) zoomAttribute = " style='width:"+zoomRatio+"'";

	//cachedImage.src = linkArray[nextIdx];

	var imagePane = document.getElementById('imagePane');
	imagePane.innerHTML = '<a href="#'+nextIdx+'" onClick="onClickNext()"><img class="main" src="'+linkArray[currentImage]+'" '+zoomAttribute+' /></a>';

	var filenamePane = document.getElementById('filenamePane');
	filenamePane.innerHTML = nameArray[currentImage] + " &nbsp; (" + (currentImage) + "/" + Number(imageCount-1) + ")";

	///////////////////////////
	// �¿� �̵� ��ư
	if(currentImage > 0) { // ���� �������� �̵� ����
		document.getElementById('button_left_on').style.display = 'block';
		document.getElementById('control_prev').href = "#" + (prevIdx + 1);
	}
	else { // ���� �������� �̵� �Ұ���
		document.getElementById('button_left_on').style.display = 'none';
	}
	if(currentImage < imageCount-1) { // ���� �������� �̵� ����
		document.getElementById('button_right_on').style.display = 'block';
		document.getElementById('control_next').href = "#" + (nextIdx - 1);
	}
	else { // ���� �������� �̵� �Ұ���
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
/*
function onToggleList(){
	listIsShown = !listIsShown;

	var fileList = document.getElementById('fileList');
	var wrap = document.getElementById("wrap");
	if(listIsShown){
		RedrawList();
		fileList.style.display = 'block';
		wrap.style.margin = "0 0 0 220px";
	}
	else{
		fileList.style.display = 'none';
		wrap.style.margin = "0";
	}
}
*/

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