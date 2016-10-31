angular.module('myapp')
	.directive('pageTitle',pageTitle)
	.directive('cssLink',cssLink)
	.directive('jsLink',jsLink)
function pageTitle($rootScope){
	return {
		link : function(scope, element){
			$rootScope.$on('$stateChangeStart',function(event, tostate){
				var tit = '管理页面--'
				tit += tostate.data.title;
				element.text(tit)
			})
		}
	}
}
function cssLink($rootScope){
	return {
		link : function(scope, element){
			$rootScope.$on('$stateChangeStart',function(event, tostate){
				var src = '';
				src = tostate.data.cssSrc;
				element.attr('href',src)
			})
		}
	}
}
function jsLink($rootScope){
	return {
		link : function(scope, element){
			$rootScope.$on('$stateChangeStart',function(event, tostate){
				var src = '';
				if(tostate.data.jsSrc){
					src = tostate.data.jsSrc;
					console.log(src)
					element.attr('src',src)
				}
				
			})
		}
	}
}