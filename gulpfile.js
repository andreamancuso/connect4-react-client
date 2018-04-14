var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tsProject = ts.createProject('tsconfig.json', {
    target: 'es5'
});

// Standalone task used for diagnostics only
gulp.task('compile-ts', function() {
    var tsResult = gulp.src('src/**/*.ts*')
        .pipe(tsProject(ts.reporter.fullReporter()));

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
        tsResult.dts.pipe(gulp.dest('build/ts-output/definitions')),
        tsResult.js.pipe(gulp.dest('build/ts-output/js'))
    ]);
});

gulp.task('default', ['compile-ts']);