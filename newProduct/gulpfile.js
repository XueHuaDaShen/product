var gulp = require("gulp"),
	fs = require('fs'),
	connect = require('gulp-connect'),
	respond = require('gulp-respond'),
	minifyCss = require('gulp-minify-css'),
	minifyHtml = require('gulp-minify-html'),
	rename = require('gulp-rename');

/*var gulp=require("gulp");
var fs=require("fs");
var connect=require("gulp-connect");	//本地服务器模块	
var respond=require("gulp-respond");	//本地服务器编译响应


var uglify=require("gulp-uglify");		//普通js压缩
var concat=require("gulp-concat");		//合并

var ngAnnotate = require("gulp-ng-annotate");	//整理
var ngmin = require("gulp-ngmin");			//压缩angular

var clean = require("gulp-clean");		//清除

var minifyCss = require("gulp-minify-css");
var minifyHtml = require("gulp-minify-html");
var rename = require("gulp-rename");

var rev = require("gulp-rev");	//加密
var collector = require("gulp-rev-collector");	//替换

gulp.task("clean" , function () {
	return gulp.src(["./src/jsild/","./src/cssild/","./srcild/"])
				.pipe(clean())
})

gulp.task("miniJs",["clean"],function(){
	//console.log(1)
	return gulp.src(["src/js/app.js","src/js/config.js","src/js/controller.js","src/js/directive.js","src/js/ocLazyLoad.min.js"])
		.pipe(ngAnnotate())
		.pipe(ngmin())
		.pipe(uglify())
		.pipe(concat("all.min.js"))
		.pipe(rev())
		.pipe(gulp.dest("src/js/build/"))
		.pipe(rev.manifest("miniJs.json"))
		.pipe(gulp.dest("./src/"))
})*/

gulp.task('connect', function(){

	connect.server({
		root : ['qmgy', 'bower_components'],
		port : 8007,
		livereload : true,
		middleware : function() {
			return [function(req, res, next) {
				console.log('开始操作')
				next();
			},function(req, res) {
				var path = req.url.split('?').shift()
				path = path == '/' ? '/index.html' : path;
				url = '.' + path;
				console.log(url)
				if(!fs.existsSync(url)) {
					url = './qmgy' + path;
					console.log(url)
				}
				gulp.src(url)
					.pipe(respond(res));
			}]
		}
	})
})
gulp.task('minifyHtml',function(){
	gulp.src('index.html')
		.pipe(minifyHtml())
		.pipe(rename(function(path){
			path.basename = 'rn'
		}))
		.pipe(gulp.dest('src/'))
})
gulp.task('serve',['connect'])