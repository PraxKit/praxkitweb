var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minify = require('gulp-clean-css');


gulp.task('sass', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('_www/assets/css'))
        .pipe(rename('app.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('_www/assets/css'));
});

gulp.task('combine', function() {
    return gulp.src([
            'src/styles/**/*.scss'
        ])
        .pipe(concat('app.scss'))
        .pipe(gulp.dest('_www/assets/css'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('_www/assets/js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('_www/assets/js'));
});

gulp.task('watch', function() {

    gulp.watch('src/js', ['scripts']);
    gulp.watch('src/styles/**/*.scss', ['sass', 'combine']);

});

gulp.task('default', ['sass', 'combine', 'scripts', 'watch']);