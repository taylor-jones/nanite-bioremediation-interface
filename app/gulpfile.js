const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

/**
 * NOTE: in order for this to function properly, you'll
 * need to have gulp-cli installed globally, using npm install -g gulp-cli.
 * Then, you can just run 'gulp' from the terminal to allow live reloading
 * with browser-sync. Otherwise, if you don't want to use this feature, you
 * can just run 'npm start' or 'yarn start'.
 */


gulp.task('nodemon', cb => {
  let started = false;

  return nodemon({
    script: './bin/www',
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task(
  'browser-sync',
  gulp.series('nodemon', () => {
    browserSync.init(null, {
      proxy: 'http://localhost:5000',
      files: ['public/**/*.*', 'views/**/*.*'],
      port: 7000,
      notify: {
        styles: [
          'display: none; ',
          'padding: 6px 15px 3px;',
          'position: fixed;',
          'font-size: 0.8em;',
          'z-index: 9999;',
          'left: 0px;',
          'bottom: 0px;',
          'color: rgb(74, 74, 74);',
          'background-color: rgb(17, 17, 17);',
          'color: rgb(229, 229, 229);',
        ],
      },
    });
  }),
);

gulp.task('default', gulp.series('browser-sync', () => {}));
