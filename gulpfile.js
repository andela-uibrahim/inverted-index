const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('browser', () => {
  browserSync.init({
    server: {
      baseDir: 'public',
    },
  });
});

gulp.task('watch', ['browser'], () => {
  gulp.watch('public/index.html', browserSync.reload);
  gulp.watch('public/css/*.css', browserSync.reload);
  gulp.watch('public/js/*.js', browserSync.reload);
});
