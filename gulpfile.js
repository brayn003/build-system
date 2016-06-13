var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();

gulp.task('vendor',function(){
	var vendorjs = [
		];
	gulp.src(vendorjs)
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./app/js/'));
});

gulp.task('html',function(){
	gulp.src('./templates/**/*.html')
	.pipe(gulp.dest('./app/templates/'));
	// .pipe(browserSync.reload());
	browserSync.reload();
	// .pipe(browserSync.reload());
});

gulp.task('sass',function(){
	gulp.src('./sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./app/css/'))
	.pipe(browserSync.stream());
});

gulp.task('js',function(){
	gulp.src('./templates/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./app/templates/'));
	browserSync.reload();
	// .pipe(browserSync.stream());
});

gulp.task('serve',function(){
	browserSync.init({
		'server': {
			'baseDir': './app/'
		}
	});
	gulp.watch('./templates/**/*.html', ['html']);
	gulp.watch('./sass/*.scss', ['sass']);
	gulp.watch('./templates/**/*.js', ['js']);
});


gulp.task('default',['vendor']);