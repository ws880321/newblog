// 载入外挂
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    // imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver');


// 样式
gulp.task('styles', function() {
    return sass('src/css/style.scss', {
            precision: 6,
            stopOnError: true,
            compass: true,
            style:'compact',
            // lineNumbers:true
        })
        .pipe(autoprefixer({
            // browsers: ['last 2 versions'],
            cascade: false,
            remove:false
        }))
        .on('error', sass.logError)
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});
// 清理
gulp.task('clean', function() {
    return gulp.src(['dist/css'], {
            read: false
        })
        .pipe(clean());
});


// 预设任务
gulp.task('default', ['clean'], function() {
    gulp.start(['webserver','styles','watch']);
});

// 看手
gulp.task('watch', function() {
        livereload.listen();
        // 看守所有.scss档
        gulp.watch('src/css/**/*.scss', ['styles']);



    })
    // 注册任务
gulp.task('webserver', function() {
    gulp.src('./') // 服务器目录（./代表根目录）
        .pipe(webserver({ // 运行gulp-webserver
            livereload: true, // 启用LiveReload
            open: true // 服务器启动时自动打开网页
        }));
});
