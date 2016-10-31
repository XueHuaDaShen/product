function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider){
	$urlRouterProvider.otherwise("login");
	$stateProvider
		.state("login",{
			url: "/login",
			templateUrl: "../qmgy/login.html",
			controller: "iscroll",
			data: {
				title: "login页面",
				cssSrc : "qmgy/css/login.css"
			}
		})
		.state("grzx",{
			url: "/grzx",
			templateUrl: "../qmgy/grzx.html",
			controller: "iscroll",
			data: {
				title: "grzx页面",
				cssSrc : "qmgy/css/grzx.css"
			}
		})
		.state("yue",{
			url: "/yue",
			templateUrl: "../qmgy/yue.html",
			controller: "iscroll",
			data: {
				title: "yue页面",
				cssSrc : "qmgy/css/yue.css"
			}
		})
		.state("xqhd",{
			url: "/xqhd",
			templateUrl: "../qmgy/xqhd.html",
			controller: "iscroll",
			data: {
				title: "xqhd页面",
				cssSrc : "qmgy/css/xqhd.css"
			}
		})
		.state("tsfw",{
			url: "/tsfw",
			templateUrl: "../qmgy/tsfw.html",
			controller: "iscroll",
			data: {
				title: "tsfw页面",
				cssSrc : "qmgy/css/tsfw.css"
			}
		})
		.state("grzy",{
			url: "/grzy",
			templateUrl: "../qmgy/grzy.html",
			controller: "iscroll",
			data: {
				title: "grzy页面",
				cssSrc : "qmgy/css/grzy.css",
				jsSrc : "qmgy/js/grzy.js"
			}
		})
		.state("wdfq",{
			url: "/wdfq",
			templateUrl: "../qmgy/wdfq.html",
			controller: "iscroll",
			data: {
				title: "wdfq页面",
				cssSrc : "qmgy/css/wdfq.css"
			}
		})
		.state("tzxx",{
			url: "/tzxx",
			templateUrl: "../qmgy/tzxx.html",
			controller: "iscroll",
			data: {
				title: "tzxx页面",
				cssSrc : "qmgy/css/tzxx.css"
			}
		})
		.state("xgzl",{
			url: "/xgzl",
			templateUrl: "../qmgy/xgzl.html",
			controller: "iscroll",
			data: {
				title: "xgzl页面",
				cssSrc : "qmgy/css/xgzl.css"
			}
		})
		.state("faactive",{
			url: "/faactive",
			templateUrl: "../qmgy/faactive.html",
			controller: "iscroll",
			data: {
				title: "faactive页面",
				cssSrc : "qmgy/css/faactive.css",
				jsSrc : "qmgy/js/faactive.js"
			}
		})
		.state("hd-info",{
			url: "/hd-info",
			templateUrl: "../qmgy/hd-info.html",
			controller: "iscroll",
			data: {
				title: "hd-info页面",
				cssSrc : "qmgy/css/hd-info.css"
			}
		})
		.state("server",{
			url: "/server",
			templateUrl: "../qmgy/server.html",
			controller: "iscroll",
			data: {
				title: "server页面",
				cssSrc : "qmgy/css/server.css"
			}
		})
		.state("shar",{
			url: "/shar",
			templateUrl: "../qmgy/shar.html",
			controller: "iscroll",
			data: {
				title: "shar页面",
				cssSrc : "qmgy/css/shar.css"
			}
		})
		.state("xy-hdxq",{
			url: "/xy-hdxq",
			templateUrl: "../qmgy/xy-hdxq.html",
			controller: "iscroll",
			data: {
				title: "xy-hdxq页面",
				cssSrc : "qmgy/css/xy-hdxq.css"
			}
		})
		.state("pj",{
			url: "/pj",
			templateUrl: "../qmgy/pj.html",
			controller: "iscroll",
			data: {
				title: "pj页面",
				cssSrc : "qmgy/css/pj.css"
			}
		})
		.state("yyfw",{
			url: "/yyfw",
			templateUrl: "../qmgy/yyfw.html",
			controller: "iscroll",
			data: {
				title: "yyfw页面",
				cssSrc : "qmgy/css/yyfw.css"
			}
		})
		.state("fw-config",{
			url: "/fw-config",
			templateUrl: "../qmgy/fw-config.html",
			controller: "iscroll",
			data: {
				title: "fw-config页面",
				cssSrc : "qmgy/css/fw-config.css"
			}
		})
		.state("fq-hdxq",{
			url: "/fq-hdxq",
			templateUrl: "../qmgy/fq-hdxq.html",
			controller: "iscroll",
			data: {
				title: "fq-hdxq页面",
				cssSrc : "qmgy/css/fq-hdxq.css",
				jsSrc : "qmgy/js/fq-hdxq.js"
			}
		})
}
angular.module("myapp")
	.config(config)