'use strict';

var linkFn = function ($scope, $element, $attr) {
	console.log($scope, $element, $attr)
    $scope.title = $attr.title;
    $scope.listCategory = $attr.id * 1;
    
    $attr.focusOption ? ($scope.focusable = $scope.$eval($attr.focusOption)) : ($scope.focusable = {
        depth: 1,
        group: $attr.id
    });
};

app.directive('playList', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/templates/playlist.html',
        scope: true,
        link: linkFn
    };
}).directive('relatedPlayList', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/templates/homeVidsList.html',
        scope: true,
        link: linkFn
    };
}).directive('selectedHomeVideoFolder', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/templates/selectedHomeVidFolder.html',
        scope: true,
        link: linkFn
    };
}).directive('timeBar', function(){
	return {
        restrict: 'E',
        templateUrl: 'views/templates/timeBar.html',
        scope: true,
        link: function($scope, iElm, iAttrs, controller) {
	        	$scope.$watch($scope.timer, function(newValue, oldValue, scope) {
	                console.log("hi", newValue, oldValue, scope)
	            }, true);
    	}
    };
}).directive('settings', function() {
	return {
        restrict: 'E',
        templateUrl: 'views/templates/settings.html',
        scope: true,
        link: linkFn
    };
})