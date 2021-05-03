'use strict';

app.controller('controller', ['$scope', '$timeout', '$document', 'FocusUtil', 'FocusConstant', 'focusController', 'CONSTANT', function ($scope, $timeout, $document, FocusUtil, FocusConstant, focusController, CONSTANT) {
//console.log(angular)
    $scope.CATEGORY = CONSTANT.CATEGORY;
    $scope.DEPTH = {
        INDEX: 1,
        HOMEVIDLIST: 2,
        SELECTEDHOMEVIDFILE: 3,
        DETAIL: 4,
        PLAYER: 5,
        SETTING5: 6
    };
    var pid = 0
    $scope.vidItem = {}
    $scope.subtitles = ["1"]
    
    $scope.isSubs = false
    var arg = 0
    var screen = {
    	width: window.screen.width,
    	height: window.screen.height
    }
    
    $scope.isSearching = false
    var pid = 0
    var subtitle = 0
    var showSubSetting = true
    var showSub = true
    var subSelect = document.createElement('div')
    var audioSelect = document.createElement('div')
    var audio = 0
    var objElem = document.createElement('object');
    var percentage = 0
    var statusBar = angular.element($('#spans'))
    $scope.timer = 0
    $scope.buffering = false
    $scope.isInitCompleted = false
    console.log($scope.isInitCompleted)
    var time = 0
    var homeVideos = false
    console.log($scope)
	
    $scope.currentCategory = $scope.CATEGORY.COLORS;
    $scope.currentDepth = $scope.DEPTH.INDEX;
//    $scope.isOverviewDark = true;
    $scope.showMediaController = false;
    
    var lastDepth = $scope.currentDepth;
    var items = CONSTANT.ITEMS;
    $scope.dataCategory = [items, items, items, items, items];

    $scope.selectedFolder = $scope.dataCategory[2]
//    $scope.subs = []
//    console.log($scope.subs)
//    console.log($scope.dataCategory, items)
    
    $document.on('ready', function(){
    	console.log("hi")
        $timeout(function(){
        	var request = $.ajax({
        	    url: "http://192.168.1.86:4012/api/mov/movies",
        	    type: 'POST',
        	    contentType: "application/json; charset=utf-8",
        	    dataType: "json",
        	    data: JSON.stringify({'pid': pid}),
        	    async: false,
        	    success: function (result) {
        	       return result
        	    },
        	    error: function (error) {
        	    	return error
        	    }
        	});
        	var parsedData = JSON.parse(request.responseText)
        	console.log(parsedData, CONSTANT)
        	var newArr = []
        	
        	var requestHomeVids = $.ajax({
        	    url: "http://192.168.1.86:4012/api/mov/homevideos",
        	    type: 'POST',
        	    contentType: "application/json; charset=utf-8",
        	    dataType: "json",
        	    data: JSON.stringify({'pid': pid}),
        	    async: false,
        	    success: function (result) {
        	       return result
        	    },
        	    error: function (error) {
        	    	return error
        	    }
        	});
        	var parsedDataHomeVids = JSON.parse(requestHomeVids.responseText)
        	console.log(parsedDataHomeVids, CONSTANT)
        	var newArrHV = []
        	
        	for(var i = 0; i < parsedDataHomeVids.length; i++) {
        		CONSTANT['PREPARED_DATA']['HOMEVIDLIST'].push({
            		title: parsedDataHomeVids[i]['title'],
                    browser: 'Safari',
//                    screenRes: parsedDataHomeVids[i]['screenRes'],
//                    location: parsedDataHomeVids[i]['location'],
//                    fileformat: '.m3u8',
//                    duration: parsedDataHomeVids[i]['duration'],
//                    adult: parsedDataHomeVids[i]['adult'],
                    backdrop_path: parsedDataHomeVids[i]['backdropPhotoUrl'],
//                    original_language: parsedDataHomeVids[i]['original_language'],
//                    original_title: parsedDataHomeVids[i]['original_title'],
//                    overview: parsedDataHomeVids[i]['overview'],
//                    popularity: parsedDataHomeVids[i]['popularity'],
//                    poster_path: parsedDataHomeVids[i]['poster_path'],
//                    release_date: parsedDataHomeVids[i]['release_date'],
//                    vote_average: parsedDataHomeVids[i]['vote_average'],
//                    vote_count: parsedDataHomeVids[i]['vote_count'],
//                    filePath: parsedDataHomeVids[i]['filePath'],
//                    fileName: parsedDataHomeVids[i]['fileName'],
                    folders: parsedDataHomeVids[i]['folders'],
                    photoUrl: parsedDataHomeVids[i]['photoUrl'],
//                    channels: parsedDataHomeVids[i]['channels'],
//                    resolution: parsedDataHomeVids[i]['resolution'],
//                    videoFormat: parsedDataHomeVids[i]['videoFormat'],
//                    screenRes: parsedDataHomeVids[i]['screenRes'],
//                    pixFmt: parsedDataHomeVids[i]['pixFmt'],
//                    color_range: parsedDataHomeVids[i]['color_range'],
//                    color_space: parsedDataHomeVids[i]['color_space'],
//                    color_transfer: parsedDataHomeVids[i]['color_transfer'],
//                    seekTime: parsedDataHomeVids[i]['seekTime'],
//                    audio: parsedDataHomeVids[i]['audio'],
//                    audioSelect: parsedDataHomeVids[i]['audioSelect'],
//                    subtitleSelect: parsedDataHomeVids[i]['subtitleSelect'],
//                    subtitles: parsedDataHomeVids[i]['subtitles'],
                    pid: "0",
//                    hdrEnabled: parsedDataHomeVids[i]['seekTime'],
                    
                    id: "color_" + i,
        		        
//                        photo_urls: [
//                            {
//                                size: '240x180',
//                                title: parsedDataHomeVids[i]['title'],
//                                url: parsedDataHomeVids[i]['backdropPhotoUrl']
//                            }
//                        ]            
                    })
            }
        	
        	for(var i = 0; i < parsedData.length; i++) {
        		CONSTANT['PREPARED_DATA']['COLORS'].push({
            		title: parsedData[i]['title'],
                    browser: 'Safari',
                    screenRes: parsedData[i]['screenRes'],
                    location: parsedData[i]['location'],
                    fileformat: '.m3u8',
                    duration: parsedData[i]['duration'],
                    adult: parsedData[i]['adult'],
                    backdrop_path: parsedData[i]['backdropPhotoUrl'],
                    original_language: parsedData[i]['original_language'],
                    original_title: parsedData[i]['original_title'],
                    overview: parsedData[i]['overview'],
                    popularity: parsedData[i]['popularity'],
                    poster_path: parsedData[i]['poster_path'],
                    release_date: parsedData[i]['release_date'],
                    vote_average: parsedData[i]['vote_average'],
                    vote_count: parsedData[i]['vote_count'],
                    filePath: parsedData[i]['filePath'],
                    fileName: parsedData[i]['fileName'],
                    photoUrl: parsedData[i]['photoUrl'],
                    channels: parsedData[i]['channels'],
                    resolution: parsedData[i]['resolution'],
                    videoFormat: parsedData[i]['videoFormat'],
                    screenRes: parsedData[i]['screenRes'],
                    pixFmt: parsedData[i]['pixFmt'],
                    color_range: parsedData[i]['color_range'],
                    color_space: parsedData[i]['color_space'],
                    color_transfer: parsedData[i]['color_transfer'],
                    seekTime: parsedData[i]['seekTime'],
                    audio: parsedData[i]['audio'],
                    audioSelect:parsedData[i]['audioSelect'],
                    subtitleSelect: parsedData[i]['subtitleSelect'],
                    subtitles: parsedData[i]['subtitles'],
                    pid: parsedData[i]['pid'],
                    hdrEnabled: parsedData[i]['seekTime'],
           
                    id: 'color_' + i,
        		        
                        photo_urls: [
                            {
                                size: '240x180',
                                title: parsedData[i]['title'],
                                url: parsedData[i]['backdropPhotoUrl']
                            }
                        ]            
                    })
            }
            /* Fill up the array for each list component. */
            updateCategoryListData(CONSTANT.PREPARED_DATA.COLORS, $scope.CATEGORY.COLORS, true);
            
            updateCategoryListData(CONSTANT.PREPARED_DATA.HOMEVIDLIST, $scope.CATEGORY.HOMEVIDLIST, true);
//            CONSTANT.PREPARED_DATA.SUBTITLES = []
            updateCategoryListData(CONSTANT.PREPARED_DATA.SUBTITLES, $scope.CATEGORY.SUBTITLES, true);
//            CONSTANT.PREPARED_DATA.AUDIO = []
            updateCategoryListData(CONSTANT.PREPARED_DATA.AUDIO, $scope.CATEGORY.AUDIO, true);
            
//            console.log(CONSTANT)
            console.log($scope.dataCategory[1])
            $scope.isInitCompleted = true;  // 'Welcome' page will be disappear by this line.
//            console.log(CONSTANT)
            $timeout(function () { // Set 'focus' to specific element by 'focus' controller.
                focusController.focus($('#' + $scope.CATEGORY.COLORS + '-' + CONSTANT.PREPARED_DATA.COLORS[0].id));
            }, CONSTANT.EFFECT_DELAY_TIME); 
        }, 3000);
    });

    var lastFocusedGroup;
    var currentItemData;

    var isScrolling = false;
    $scope.onScrollStart = function () {
//        isScrolling = true;
    };
    $scope.onScrollFinish = function () {
//        isScrolling = false;
        updateOverview();
    };

    $scope.toggleIsPlaying = function(isPlayingbool){ 
//    	console.log(isPlayingbool)
        $scope.$applyAsync(function(){
            $scope.isPlaying = isPlayingbool;
        });
    };
    $scope.onTimeUpdate = function() {
    	
    }
    $scope.homeVidsDepth = function() {
    	homeVideos = true
    	console.log('#' + $scope.CATEGORY.HOMEVIDLIST + '-' + CONSTANT.PREPARED_DATA.HOMEVIDLIST[0].id ,$scope)
    	$timeout(function () { // Set 'focus' to specific element by 'focus' controller.
            focusController.focus($('#' + $scope.CATEGORY.HOMEVIDLIST + '-' + CONSTANT.PREPARED_DATA.HOMEVIDLIST[0].id));
        }, CONSTANT.EFFECT_DELAY_TIME); 
    	changeDepth($scope.DEPTH.HOMEVIDLIST)
    	updateOverview();
//    	console.log($scope.currentDepth)
//    	console.log($scope)
    };
    $scope.moviesDepth = function() {
    	homeVideos = false
    	$timeout(function () { // Set 'focus' to specific element by 'focus' controller.
            focusController.focus($('#' + $scope.CATEGORY.COLORS + '-' + CONSTANT.PREPARED_DATA.COLORS[0].id));
        }, CONSTANT.EFFECT_DELAY_TIME); 
    	changeDepth($scope.DEPTH.INDEX)
    	updateOverview();
//    	console.log($scope.currentDepth)
//    	console.log(CONSTANT.PREPARED_DATA.COLORS, $scope.CATEGORY.COLORS)
    };
    $scope.toSelectedFolder = function($event, listCategory, item, $index) {
    	console.log($event, listCategory, item, $index)
    	CONSTANT['PREPARED_DATA']['SELECTEDHOMEVIDFILE'] = CONSTANT['PREPARED_DATA']['HOMEVIDLIST'][$index]['folders'][0]['files']
        $scope.selectedFolder = CONSTANT['PREPARED_DATA']['SELECTEDHOMEVIDFILE']
    	updateCategoryListData(CONSTANT.PREPARED_DATA.SELECTEDHOMEVIDFILE, $scope.CATEGORY.SELECTEDHOMEVIDFILE, true);
    	
    	console.log(CONSTANT['PREPARED_DATA']['SELECTEDHOMEVIDFILE'], $scope.selectedFolder)
    	changeDepth($scope.DEPTH.SELECTEDHOMEVIDFILE)
    	console.log($scope.currentDepth)
    	
    	$timeout(function () {
    		focusController.focus($('#' + $scope.CATEGORY.SELECTEDHOMEVIDFILE + '-' + CONSTANT.PREPARED_DATA.SELECTEDHOMEVIDFILE[0].id));
        }, CONSTANT.EFFECT_DELAY_TIME);
    };
    function killPid() {
    	var request = $.ajax({
    	    url: "http://192.168.1.86:4012/api/mov/pidkill",
    	    type: 'POST',
    	    contentType: "application/json; charset=utf-8",
    	    dataType: "json",
    	    data: JSON.stringify({'pid': pid}),
    	    async: false,
    	    success: function (result) {
    	       return result
    	    },
    	    error: function (error) {
    	    	return error
    	    }
    	});
//    	var parsedData = JSON.parse(request.responseText)
//    	console.log(parsedData, CONSTANT)
    }
    
    $scope.selectedSubs = function(item) {
    	console.log(item)
    	$scope.vidItem['seekTime'] = time
    	$scope.vidItem['subtitleSelect'] = item['indexInt']
    	console.log($scope.vidItem)
    	$scope.isSearching = true
    	$scope.getVideo("play")
    }
    $scope.selectedAudio = function(item) {
    	console.log(item)
    	$scope.vidItem['seekTime'] = time
    	$scope.vidItem['audioSelect'] = item['indexInt']
    	console.log($scope.vidItem)
    	$scope.isSearching = true
    	$scope.getVideo("play")
    }
    function timeBarUpdater(currentTime) {
    	  var n = currentTime;
    	  var l = n.toString().length-3;
    	  var v = n/Math.pow(10, 3); 
    	  time = v + $scope.vidItem['seekTime']
//    	  $scope.vidItem['seekTime'] = time 
    	  percentage = Math.abs((time / $scope.vidItem['duration']) * 100)
//    	  console.log(percentage, time, $scope.vidItem['seekTime'])
    	  $scope.timer = percentage
//    	  $scope.$apply();
    }
    
    $scope.getVideo = function(mechanic) {
    	delete $scope.vidItem['id']
    	delete $scope.vidItem['photo_urls']
    	
    	$scope.vidItem['screenRes'] = `${screen['width']}x${screen['height']}`
    	console.log(mechanic)
    	
    	switch(mechanic) {
    		case "forward": 
    			$scope.vidItem['seekTime'] = time + 30
    			$scope.isSearching = true
    			console.log($scope.isSearching, $scope.vidItem)
    			timeBarUpdater($scope.vidItem['seekTime'])
    			break;
    		case "rewind": 
    			$scope.vidItem['seekTime'] = time - 30
	    		$scope.isSearching = true
				console.log($scope.isSearching, $scope.vidItem)
    			timeBarUpdater($scope.vidItem['seekTime'])
    			break;
    		case "next": 
    			$scope.vidItem['seekTime'] = time + 200
	    		$scope.isSearching = true
				console.log($scope.isSearching, $scope.vidItem)
    			timeBarUpdater($scope.vidItem['seekTime'])
    			break;
    		case "previous": 
    			$scope.vidItem['seekTime'] = time - 200
	    		$scope.isSearching = true
				console.log($scope.isSearching, $scope.vidItem)
    			timeBarUpdater($scope.vidItem['seekTime'])
    			break;
    		case "play": 
//    			$scope.vidItem['seekTime'] = time
    			console.log($scope.isSearching, $scope.vidItem['seekTime'])
    			
    			if($scope.isSearching == false) {
    				console.log("searching")
    			} 
    			if($scope.vidItem['seekTime'] < 0) {
    				$scope.vidItem['seekTime'] = 0
    				console.log($scope.isSearching, $scope.vidItem['seekTime'])
    			}
    			
    			if($scope.isSearching == true) {
    				$scope.isSearching = false
    			$scope.vidItem['hdrEnabled'] = "false"
   			$scope.vidItem['subtitleSelect'] = subtitle
//    			$scope.vidItem['audioSelect'] = audio
    			$scope.vidItem['pid'] = pid
    			$scope.buffering = true
    			console.log($scope.vidItem)
    			
//    			$scope.subs = []
//    			$scope.subs = $scope.vidItem['subtitles']
//    			console.log($scope.subs)
    			
    			fetch('http://192.168.1.86:4012/api/mov/pullVideo', {
    			    method: 'POST',
    			    headers: {
    			      'Accept': 'application/javascript',
    			      'Content-Type': 'application/json'
    			    },
    			    body: JSON.stringify($scope.vidItem)
    			  }).then(function(res){ 
    				  return res.json() 
    			  }).then((data) => {
//    			console.log(data)
    			
    			pid = data['err']['pid']
    			
    			objElem.type = 'application/avplayer';

    			objElem.style.left = 0 + 'px';
    			objElem.style.top = 0 + 'px';
    			objElem.style.width = screen['width'] + 'px'
    			objElem.style.height = screen['height'] + 'px';
    			
    			var videoElem = document.getElementById("player")
    			console.log(videoElem, objElem)
    			videoElem.appendChild(objElem);
    			
    			webapis.avplay.close()
    			webapis.avplay.open(data['err']['location']);
    			
//    			if (webapis.productinfo.isUdPanelSupported()){
//    				  console.log("4K UHD is supported");
//    		  	  } else {
//    		  	    console.log("4K UHD is not supported");
//    		  	}
    			
    			var listener = {
    					  onbufferingstart: function() {
    					    console.log("Buffering start.");
    					    $scope.buffering = true
    					  },

    					  onbufferingprogress: function(percent) {
    					    console.log("Buffering progress data : " + percent);
    					  },

    					  onbufferingcomplete: function() {
    					    console.log("Buffering complete.");
    					    $scope.buffering = false
    					  },
    					  onstreamcompleted: function() {
    					    console.log("Stream Completed");
    					    webapis.avplay.stop();
    					  },

    					  oncurrentplaytime: function(currentTime) {
    					      timeBarUpdater(currentTime)
    					  },

    					  onerror: function(eventType) {
    					    console.log("event type error : " + eventType);
    					  },

    					  onevent: function(eventType, eventData) {
    					    console.log("event type: " + eventType + ", data: " + eventData);
    					  },

    					  onsubtitlechange: function(duration, text, data3, data4) {
    					    console.log("subtitleText: " + text);
    					  },
    					  ondrmevent: function(drmEvent, drmData) {
    					    console.log("DRM callback: " + drmEvent + ", data: " + drmData);
    					  }
    					};
    					
    					webapis.avplay.setListener(listener);
    					
    					var avplayBaseWidth = 1920;

    					var ratio = avplayBaseWidth / window.document.documentElement.clientWidth;

    					var newLeft = 0
    					var newTop = 0;
    					var newWidth = screen['width'] * ratio;
    					var newHeight = screen['height'] * ratio;
    	
    					webapis.avplay.setDisplayRect(newLeft,newTop,newWidth,newHeight);
    					
    					webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX')

    					webapis.avplay.prepare();
    					
    					var successCallback = function() {
    						$scope.setMediaControllerTimer();
    					  console.log('The media has finished preparing');
    					  
    					}

    					var errorCallback = function() {
    					  console.log('The media has failed to prepare');
    					}
    					
//    					$scope.CATEGORY.SUBTITLES = $scope.vidItem['subtitles']
    					
    					$scope.subs = $scope.vidItem['subtitles']
    					
    					webapis.avplay.prepareAsync(successCallback,errorCallback);
    					$scope.isSubs = true
    					webapis.avplay.play();
    					$scope.isSearching = false
    			  })
    		break;
    				$scope.buffering = false
    		}
    	}
    }
    
    // The callback function which is called when each list component get the 'focus'.
    $scope.focus = function ($event, category, data, $index) {
    	console.log($event, category, data, $index)
    	if ($scope.currentDepth === $scope.DEPTH.HOMEVIDLIST) {
            var scrollCount = category;
            // Translate each list component to up or down.
            moveContainer(category, 'list-category', -CONSTANT.SCROLL_HEIGHT_OF_INDEX * scrollCount);
            if (!data || !data.item || data.item.loaded === false) {
                return;
            }
            currentItemData = data.item;
            isScrolling === false && updateOverview();
            lastFocusedGroup = FocusUtil.getData($event.currentTarget).group;
        }
        if ($scope.currentDepth === $scope.DEPTH.INDEX) {
            var scrollCount = category;
            // Translate each list component to up or down.
            moveContainer(category, 'list-category', -CONSTANT.SCROLL_HEIGHT_OF_INDEX * scrollCount);
            if (!data || !data.item || data.item.loaded === false) {
                return;
            }
            currentItemData = data.item;
            isScrolling === false && updateOverview();
            lastFocusedGroup = FocusUtil.getData($event.currentTarget).group;
        }
        if ($scope.currentDepth === $scope.DEPTH.SELECTEDHOMEVIDFILE) {
            var scrollCount = category;
            // Translate each list component to up or down.
            moveContainer(category, 'list-category', -CONSTANT.SCROLL_HEIGHT_OF_INDEX * scrollCount);
            if (!data || !data.item || data.item.loaded === false) {
                return;
            }
            currentItemData = data.item;
            isScrolling === false && updateOverview();
            lastFocusedGroup = FocusUtil.getData($event.currentTarget).group;
        }
    };

    // The callback function which is called when each list component lose the 'focus'.
//    $scope.blur = function ($event, category, data) {
//        $scope.isOverviewDark = true;
//    };

    // The callback function which is called when user select one item of the list component.
    $scope.selected = function ($event, category, item, $index) {
        var depth;
        console.log(category)
        
//        console.log($scope.subtitles)
//        $scope.subtitles = item['subtitles']
//        CONSTANT.PREPARED_DATA.SUBTITLES = $scope.subs
//        updateCategoryListData(CONSTANT.PREPARED_DATA.SUBTITLES, $scope.CATEGORY.SUBTITLES, true);
//        console.log($scope.subtitles)
        
        if(item.loaded === false) {
            return;
        }
        if(category === $scope.CATEGORY.RELATED_PLAY_LIST){
            depth = $scope.DEPTH.PLAYER;
            launchPlayer($scope.relatedPlaylist[$index].talk);
        } else {
            depth = $scope.DEPTH.DETAIL;
//            $scope.relatedPlaylist = $scope.dataCategory[category];
            $timeout(function(){
                $('#list-related-talks').trigger('reload');
            }, 0);
            updateOverview();
        }
        depth && changeDepth(depth);
    };

//    $scope.buttonFocusInDetail = function ($event, $originalEvent) {
//        $scope.isOverviewDark = false;
//    };

    $scope.selectPlayButton = function(){
    	$scope.vidItem['seekTime'] = 0
    	$scope.isSearching = true
        changeDepth($scope.DEPTH.PLAYER);
    	
    	CONSTANT.PREPARED_DATA.SUBTITLES = $scope.vidItem['subtitles']
		updateCategoryListData(CONSTANT.PREPARED_DATA.SUBTITLES, $scope.CATEGORY.SUBTITLES, true);
    	
    	CONSTANT.PREPARED_DATA.AUDIO = $scope.vidItem['audio']
		updateCategoryListData(CONSTANT.PREPARED_DATA.AUDIO, $scope.CATEGORY.AUDIO, true);
//    	$scope.subtitles = $scope.vidItem['subtitles']
//    	console.log($scope.subtitles)
//    	$scope.subtitles.shift(1)
//    	console.log($scope.subtitles)
//		console.log(CONSTANT.PREPARED_DATA.SUBTITLES, $scope.CATEGORY.SUBTITLES, $scope.dataCategory)
//		console.log(CONSTANT.PREPARED_DATA.AUDIO, $scope.CATEGORY.AUDIO)
		
        $scope.getVideo("play")
    };

    focusController.addBeforeKeydownHandler(function(context){
    	console.log("yello")
        if($scope.currentDepth === $scope.DEPTH.PLAYER){
            if($scope.showMediaController === false){
                $scope.setMediaControllerTimer();
                return false;
            } else {
                $scope.setMediaControllerTimer();
            }
        }
        switch (context.event.keyCode) {
            case CONSTANT.KEY_CODE.RETURN:
            case CONSTANT.KEY_CODE.ESC:
                $scope.back();
                break;
        }
    });

    var getPlayerControls = function(){
        return {
            play: function(){
                $timeout(function(){
                    $('#player .icon-caph-play').parent().trigger('selected');
                }, 500);
            },
            pause: function(){
                $('#player .icon-caph-pause').parent().trigger('selected');
            },
            restart: function(){
                $('#player .icon-caph-prev').parent().trigger('selected');
            },
            rewind: function(){
                $('#player .icon-caph-rewind').parent().trigger('selected');
            },
            forward: function(){
                $('#player .icon-caph-forward').parent().trigger('selected');
            },
            next: function(){
                $('#player .icon-caph-next').parent().trigger('selected');
            }
        };
    };

    var launchPlayer = function() {
        $scope.setMediaControllerTimer();
        if($scope.setting.autoPlay){
            getPlayerControls().play();
        }
        focusController.focus('btnPlayerPlay');
    };

    var mediaControllerTimer;
    $scope.setMediaControllerTimer = function(){
        $scope.showMediaController = true;
        if(mediaControllerTimer){
            $timeout.cancel(mediaControllerTimer);
        }
        mediaControllerTimer = $timeout(function(){
            $scope.showMediaController = false;
            mediaControllerTimer = null;
        }, CONSTANT.MEDIA_CONTROLLER_TIMEOUT);
    };

    // 'Changing depth' means the scene is changed.
    var changeDepth = function(depth, callback) {
        lastDepth = $scope.currentDepth;
        $scope.currentDepth = depth;
        $timeout(function () {
        	console.log("VAATT", depth)
            focusController.setDepth(depth);
            if(depth === $scope.DEPTH.DETAIL){
                focusController.focus('btnPlay');
            }
            callback && callback();
        }, CONSTANT.EFFECT_DELAY_TIME);
    };

    // Update and reload data for each list component.
    function updateCategoryListData(response, category, reload) {
    	console.log(response, category, reload)
        $scope.dataCategory[category] = response;
    	console.log(response, category, reload, $scope.dataCategory[category])
        $timeout(function(){
            reload && $('#list-' + category).trigger('reload');
        });
    };

    // Change data on overview.
    function updateOverview() {
        $scope.overview = currentItemData;
        $scope.vidItem = $scope.overview
    }

    // Translate specific element using css property 'transform'.
    var moveContainer = function(category, regionId, targetTop) {
        if (category === $scope.currentCategory) {
            return;
        }
        $('#' + regionId).css({
            transform: 'translate3d(0, ' + targetTop + 'px, 0)'
        });
        $scope.currentCategory = category;
    };

    $scope.back = function(){
    	console.log($scope.vidItem)
    	console.log($scope.currentDepth)
//        if ($scope.currentDepth === $scope.DEPTH.INDEX) {
//            return;
//        }
        var focusClass;
        var targetDepth;
        switch ($scope.currentDepth) {
//        	case $scope.DEPTH.HOMEVIDLIST:
//        		console.log("why")
//        		targetDepth = lastDepth
            case $scope.DEPTH.DETAIL:
//            	$scope.relatedPlaylist = [CONSTANT.ITEM];
//                moveContainer(null, 'move-container', 0);
                changeDepth(lastDepth)
                break;
//            case ($scope.DEPTH.PLAYER && homeVideos == true):
//                getPlayerControls().pause();
//                console.log('pidkill')
//                targetDepth = $scope.DEPTH.HOMEVIDLIST
//                killPid()
//                webapis.avplay.stop()
//                focusClass = '.btn-resume';
//                break;
            case $scope.DEPTH.PLAYER:
                getPlayerControls().pause();
//                console.log($scope.currentDepth, lastDepth, homeVideos)
                
                killPid()
                webapis.avplay.stop()
                focusClass = '.btn-resume';
                
                if(homeVideos == true) {
                	changeDepth($scope.DEPTH.SELECTEDHOMEVIDFILE)
                	$timeout(function () { // Set 'focus' to specific element by 'focus' controller.
                        focusController.focus($('#' + $scope.CATEGORY.SELECTEDHOMEVIDFILE + '-' + CONSTANT.PREPARED_DATA.SELECTEDHOMEVIDFILE[0].id));
                    }, CONSTANT.EFFECT_DELAY_TIME); 
                } else {
                	changeDepth($scope.DEPTH.INDEX)
//                	console.log("hiiiii")
                }
                break;
            case $scope.DEPTH.SELECTEDHOMEVIDFILE:
            	console.log("hoi")
            	changeDepth($scope.DEPTH.HOMEVIDLIST)
            	$timeout(function () { // Set 'focus' to specific element by 'focus' controller.
		            focusController.focus($('#' + $scope.CATEGORY.HOMEVIDLIST + '-' + CONSTANT.PREPARED_DATA.HOMEVIDLIST[0].id));
		        }, CONSTANT.EFFECT_DELAY_TIME); 
            	
                break;
            case $scope.DEPTH.HOMEVIDLIST:
            	homeVideos = false
//            	console.log("hoio", homeVideos)
            	changeDepth(1)
            	$timeout(function () { // Set 'focus' to specific element by 'focus' controller.
//            		console.log("grrrrr", CONSTANT.PREPARED_DATA.COLORS[0].id)
		            focusController.focus($('#' + $scope.CATEGORY.COLORS + '-' + CONSTANT.PREPARED_DATA.COLORS[0].id));
		        }, CONSTANT.EFFECT_DELAY_TIME)
            	break;
        }
    };
}

//    $scope.setting = {
//        show: false,
//        center: true,
//        focusOption: {
//            depth: $scope.DEPTH.SETTING
//        },
//        onSelectButton: function(buttonIndex, $event){
//            $scope.setting.show = false;
//        },
//        setSubTitle: function($event, $checked){
//            $scope.setting.subTitle = $checked;
//        },
//        setAutoPlay: function($event, $checked){
//            $scope.setting.autoPlay = $checked;
//        },
//        subTitle: false,
//        autoPlay: true
//    };


]);