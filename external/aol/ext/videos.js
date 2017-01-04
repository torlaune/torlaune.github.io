var AOLVS = null;
// Function getVideos() submits the given query to the AOL video search engine.
function getVideos(query) { 
	document.getElementById("TitleBarDiv").innerHTML = 'Videos werden geladen...';
	AOLVS.getVideos(query);
}

// Function playVideo() opens a new browser window to load the specified videoUrl.
function playVideo(videoUrl, id) {
	window.open(videoUrl, '', 'width=800,height=800,location=no,menubar=no,resizable=yes,scrollbars=yes');
}
// Function handleUpdate() handles all response messages from the AOLVideoSearchAPI.  Whenever the AOLVideoSearchAPI
// receives a response to an AJAX request, it fires the onupdate event.  This method handles each onupdate event.
function handleUpdate(methodName) {
	refreshResults(AOLVS);
}
// Function handleLoad() handles the onload event, which is fired when the initialization of the AOLVideoSearch object is complete.
function handleLoad(reloadStateFlag) {
	getVideos('');
}
// Function handleError() handles all errors thrown by the AOLVideoSearch API.  It displays an alert box with the
// error code and error message.
function handleError(errorCode, errorMessage) {
	alert("Fehler: " + errorCode + "; " + errorMessage);
}
// Function refreshResults() takes a the AOL Video Search object as an argument and use the data sets in this object
// to display a clickable thumbnail and title for each video search result.  This function also displays the provided
// title above the search results and the submitted query in the search box.
function refreshResults(aolvs) {
	var theHTML = '';
	if (aolvs.VideoSet && aolvs.VideoSet.Video) {
		var VideoSet = aolvs.VideoSet;
		var cellsPerRow = 3;
		var rows = 5;
		theHTML += '<table style="width: 100%; margin: 0 0 0 0; border: 0px; border-style: none; border-collapse: collapse; vertical-align: top;">';
		for (var j=0; j < rows; j++) {
			theHTML += '<tr>';
			for (var k=0; k < cellsPerRow; k++) {
				var i = (j * cellsPerRow) + k; 
				theHTML += '<td align="center" valign="top" style="padding:4px;">';
				if (i >= VideoSet.Video.length) { theHTML += '&nbsp;'; }
				else {
					var theVideo = VideoSet.Video[i];
					if (theVideo) {
						theHTML += '<div style="width: 130px;">';
						theHTML += '<a href="javascript:playVideo(\''+theVideo.videoUrl+'\','+theVideo.id+'); void(0);"><img src="'+theVideo.thumbnailUrl+'" class="thumbnail" alt="click to play video"/></a>';
						theHTML += '<div><a href="javascript:playVideo(\''+theVideo.videoUrl+'\','+theVideo.id+'); void(0);">'+theVideo.title+'</a></div>';
						theHTML += '</div>';
					}
				}
				theHTML += '</td>';
			}
			theHTML += '</tr>';
		}
		theHTML += '</table>';
		document.getElementById("ResultsDiv").innerHTML = theHTML;
    document.getElementById("TitleBarDiv").innerHTML = 'Aufs Bild klicken und Video ansehen (neues Fenster).';
	}
	else {
		document.getElementById("ResultsDiv").innerHTML = '&nbsp;';
		document.getElementById("TitleBarDiv").innerHTML = 'Keine Videos gefunden.';
	}
	document.getElementById('searchBox').value = aolvs.query;
}
// Function VSLoad() is called when the containing web page has completed loading.  This function instantiates a single AOLVideoSearch
// object, sets the state of the object, attaches the appropriate event handlers to this object, and then initializes the object. 
function VSLoad() {
	AOLVS = new AOLVideoSearch('3y2cek8aocey8i8u0');
	AOLVS.results = 15;
	AOLVS.attachEvent('onerror', 'handleError(errorCode, errorMessage);');
	AOLVS.attachEvent('onupdate', 'handleUpdate(methodName);');
	AOLVS.attachEvent('onload', 'handleLoad(reloadStateFlag);');
	AOLVS.initialize();
}
function sortBy(sortOption) { getVideos(AOLVS.query.replace(/\s?sort:\S*/gi, "") + " sort:" + sortOption); }
// Function filterType() modifies the query string to include the provided type filter and retrieves a new set of videos.
function filterType(type) { 
	var query = AOLVS.query.replace(/\s?type:\S*/gi, "");
	if (type == 'all') { getVideos(query); }
	else { getVideos(query + " type:" + type); }
}
// Function setShowAdult() turns on or off the family filter and retrieves a new set of videos.
function setShowAdult(value) { 
	AOLVS.showAdult = value;
	setShowAdultBtn();
	getVideos(AOLVS.query);
}
// Function setShowAdultBtn() sets the state of the family filter toggle button.
function setShowAdultBtn() {
	if (AOLVS.showAdult == 1) {
		document.getElementById('familyFilterOffBtn').style.textDecoration = "underline";
		document.getElementById('familyFilterOnBtn').style.textDecoration = "none";
	}
	else {
		document.getElementById('familyFilterOffBtn').style.textDecoration = "none";
		document.getElementById('familyFilterOnBtn').style.textDecoration = "underline";
	}
}