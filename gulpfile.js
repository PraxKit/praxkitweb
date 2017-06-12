var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minify = require('gulp-clean-css');

//paths variables
var v = {
    app: 'app',
    scssp: 'src/styles/**/*.scss',
    scss: 'src/scss/**/*.scss',

    dest: '_www/assets/css',
    appmin: 'app.min.css',
    srcjs: 'src/js',
    destjs: '_www/assets/js',
    apptarget: 'src/css'
};

gulp.task('sass', function() {
    return gulp.src(v.scssp)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(v.dest))
        .pipe(rename(v.app + '.min.css'))
        .pipe(minify())
        .pipe(gulp.dest(v.dest))
        .pipe(gulp.dest(v.apptarget));
});

gulp.task('combine', function() {
    return gulp.src([
            v.scssp
        ])
        .pipe(concat(v.app + '.scss'))
        .pipe(gulp.dest(v.dest));
});

gulp.task('scripts', function() {
    return gulp.src(v.srcjs + '/**/*.js')
        .pipe(concat(v.app + '.js'))
        .pipe(gulp.dest(v.destjs))
        .pipe(rename(v.app + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(v.destjs));
});

gulp.task('watch', function() {

    gulp.watch(v.srcjs, ['scripts']);
    gulp.watch(v.scssp, ['sass', 'combine']);

});

gulp.task('default', ['sass', 'combine', 'scripts', 'watch']);