<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<title>Online Videos suchen</title>
<style type="text/css" media="all">@import "ext/style.css";</style>
<!-- Import the AOL Video Search AJAX API. -->
<script type="text/javascript" src="http://beta.searchvideo.com/AOLVideoSearchAPIv3.js"></script>
<script type="text/javascript" src="ext/videos.js"></script>
</head>
<body onload="VSLoad();">

<div id="bodyDiv">
<form name="searchForm" onsubmit="javascript:getVideos(document.getElementById('searchBox').value); return(false);" style="margin:0;">
<div style="width:100%; text-align:center;">
<input type="text" name="searchBox" id="searchBox" size="45" value="" />
<input type="submit" name="searchButton" id="searchBox" value="Videos suchen" />
</div>
</form>
<div id="TitleBarDiv">&nbsp;</div>
<div id="wrapper">
<div id="Controls">
<h2>Sortieren</h2>
<ul>
<li><a href="javascript:sortBy('vrank'); void(0);">Rang</a></li>
<li><a href="javascript:sortBy('mostRecent'); void(0);">Neu</a></li> 
<li><a href="javascript:sortBy('mostRelevant'); void(0);">Relevanz</a></li>
<li><a href="javascript:sortBy('topFavorites'); void(0);">Bookmarks</a></li>
<li><a href="javascript:sortBy('highestRated'); void(0);">Bewertung</a></li>
<li><a href="javascript:sortBy('title'); void(0);">Title</a></li>
<li><a href="javascript:sortBy('random'); void(0);">Zufall</a></li>
</ul>
<h2>Meist angesehen</h2>
<ul> 
<li><a href="javascript:sortBy('mostPopularNow'); void(0);">Jetzt</a></li>
<li><a href="javascript:sortBy('mostPopularThisHour'); void(0);">Diese Stunde</a></li>
<li><a href="javascript:sortBy('mostPopularToday'); void(0);">Heute</a></li>
<li><a href="javascript:sortBy('mostPopularThisWeek'); void(0);">Diese Woche</a></li>
<li><a href="javascript:sortBy('mostPopularThisMonth'); void(0);">Dieser Monat</a></li>
<li><a href="javascript:sortBy('mostPopular'); void(0);">Immer</a></li>
</ul>
<h2>Filter</h2>
<ul>
<li>Jugendschutz: <a id="familyFilterOnBtn" href="javascript:setShowAdult(0); void(0);" style="text-decoration: underline;">An</a> |
<a id="familyFilterOffBtn" href="javascript:setShowAdult(1); void(0);">Aus</a>
</li>
</ul>
<h2>Info</h2>
<p>Mit unserer Videosuche werden verschiedene Anbieter von Online-Videos, wie Google, Youtube, MSN Video, Grouper, Yahoo! Music, BBC, AOL und andere durchsucht. Dieses Angebot befindet sich in der <span class="beta">BETA</span>-Phase.</p>
</div>
<div id="ResultsDiv">&nbsp;
</div>
<div id="Pager">&nbsp;</div>
<div id="Powered">powered by <strong>AOL Video Search</strong><sup>TM</sup></div>
</div><!--wrapper-->
</div><!--bodyDiv-->

</body>
</html>