var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify({
        entries: 'client/src/index.jsx',
        extensions: ['.js', '.jsx'],
        debug: true
    })
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('client/dist'))
})

gulp.task('sass', function () {
    return gulp.src('client/src/assets/stylesheets/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('client/dist/'));
});

gulp.task('watch', function () {
    // gulp.watch('client/assets/stylesheets/*.scss', ['sass']);
    gulp.watch(['client/src/**/*.js', 'client/src/**/*.jsx'], ['build']);
});

gulp.task('default', ['build', 'watch']);
