'use strict';

var gulp = require('gulp');

var pkg = require('./package.json');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename    = require('gulp-rename');
var styledocco = require('gulp-styledocco');





// CLEAN OUTPUT DIRECTORY
gulp.task('clean', del.bind(null, ['dist']));


// WATCH FILES FOR CHANGES & RELOAD
gulp.task('serve', ['dist'], function () {
   
   browserSync({
        notify: false,
		// https: true,
		server: 'dist'
    });

	  gulp.watch(['sources/**/*.html'], ['html' , reload]); 
	  gulp.watch(['sources/css/**/*.{css,scss}'], ['styles', reload]);
	  gulp.watch(['sources/js/**/*.js'], ['scripts', reload]);
	  gulp.watch(['sources/images/**/*'], ['images', reload]);
});


//HTML
gulp.task('html', function () {
	return gulp.src([
			'sources/**/*.{html, htm}',
			'!sources/vendors/**/*'
		])
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist'));
});


//STYLES
gulp.task('styles', ['styles_min', 'styles_components'],  function () {
	return gulp.src([
			'sources/css/*.{css,scss}',
			'!sources/css/**/*.min.*'
		])
		.pipe(changed('dist'))
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(gulp.dest('dist/css/'));
	
	
});

gulp.task('styles_min', function () {
	return gulp.src([
			'sources/css/*.min.*'
		])
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist/css/'));
});

//STYLES: COMPONENTS
gulp.task('styles_components', ['styledocco'], function () {
	return gulp.src(['sources/css/components/*.{css,scss}'])
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(concat('components.css'))
		.pipe(gulp.dest('dist/css/'));
});



//SCRIPTS
gulp.task('scripts', ['vendors_scripts', 'vendors_styles'], function () {
	return gulp.src('sources/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'));
});



gulp.task('vendors_scripts', function () {
	return gulp.src(['sources/vendors/**/.js'])
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('vendors_styles', function () {	
	return gulp.src(['sources/vendors/**/css/*.css'])
		.pipe(concat('vendors.css'))
		.pipe(gulp.dest('dist/css/'));
});


gulp.task('fonts', function () {
	return gulp.src('sources/**/fonts/**')
		.pipe(gulp.dest('dist/fonts'));
});


//IMAGES
gulp.task('images', function () {
	return gulp.src('sources/images/**')
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist/images'));
});




// CSS COMPONENTS DOCUMENTATION
gulp.task('styledocco', function () {
  /*
	gulp.src('sources/css/components/*.css')
    .pipe(styledocco({
      out: 'docs/style_guide',
      name: pkg.name
    }));
*/	
});



//DEFAULT TASK
gulp.task('dist', ['clean', 'html', 'styles', 'scripts', 'fonts', 'images']);





function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}