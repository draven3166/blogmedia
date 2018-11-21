var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function(){
  gulp.src('./scss/estilos.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true
      }))
      .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
  gulp.src([
      './scriptsdev/open.js',
      './scriptsdev/layout.js',
      './scriptsdev/home.js',
      './scriptsdev/posts.js',
      './scriptsdev/login.js',
      './scriptsdev/users.js',
      './scriptsdev/admin.js',
      './scriptsdev/votacion.js',
      './scriptsdev/menus.js',
      './scriptsdev/sociales.js',
      './scriptsdev/videos.js',
      './scriptsdev/modules.js',
      './scriptsdev/close.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js'))
});

gulp.task('default', function(){
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./scriptsdev/*.js', ['scripts']);
});
