let gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  browserSync = require("browser-sync"),
  uglify = require("gulp-uglify-es").default,
  notify = require("gulp-notify"),
  imagemin = require("gulp-imagemin"),
  cache = require("gulp-cache"),
  del = require("del"),
  gcmq = require("gulp-group-css-media-queries"),
  cleanCSS = require("gulp-clean-css"),
  sourcemaps = require("gulp-sourcemaps"),
  pug = require("gulp-pug");

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "docs"
    },
    notify: true,
    open: true,
    browser: "google chrome"
    //port: 8080
  });
});

gulp.task("html", function () {
  return gulp
    .src(["src/pug/*.pug"])
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("docs"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("htmlru", function () {
  return gulp
    .src(["src/pug/ru/*.pug"])
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("docs/ru"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("css", function () {
  return gulp
    .src(["src/sass/*.css", "src/sass/*.sass"])
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded" //compressed, expanded, compact
      }).on("error", notify.onError())
    )
    .pipe(
      autoprefixer(["last 15 versions"], {
        cascade: true
      })
    )
    .pipe(gcmq("main.css"))
    .pipe(concat("main.css"))
    .pipe(
      cleanCSS({
        compatibility: "ie8"
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("docs/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("js", function () {
  return (
    gulp
      .src(["src/js/**/*.js"])
      //.pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat("scripts.js"))
      //.pipe(sourcemaps.write())
      .pipe(gulp.dest("docs/js"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

gulp.task("files", function () {
  return gulp
    .src(["src/document/**/*.*"])
    .pipe(gulp.dest("docs/document"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("fonts", function () {
  return gulp
    .src(["src/fonts/**/*.*"])
    .pipe(gulp.dest("docs/fonts"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("images", function () {
  return gulp
    .src(["src/img/**/*"])
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 7 }),
          imagemin.svgo({
            plugins: [
              { optimizationLevel: 3 },
              { progessive: true },
              { interlaced: true },
              { removeViewBox: false },
              { removeUselessStrokeAndFill: false },
              { cleanupIDs: false }
            ]
          })
        ])
      )
    )
    .pipe(gulp.dest("docs/img"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.sass", gulp.parallel("css"));
  gulp.watch("src/js/**/*.js", gulp.parallel("js"));
  gulp.watch("src/pug/**/*.pug", gulp.parallel("html"));
  gulp.watch("src/pug/ru/**/*.pug", gulp.parallel("htmlru"));
  gulp.watch("src/document/**/*.*", gulp.parallel("files"));
  gulp.watch("src/fonts/**/*.*", gulp.parallel("fonts"));
  gulp.watch("src/img/**/*.*", gulp.parallel("images"));
});

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "html",
    "htmlru",
    "css",
    "js",
    "files",
    "fonts",
    "images",
    "browser-sync"
  )
);

gulp.task("clear", function () {
  return cache.clearAll();
});

gulp.task("removedocs", function () {
  return del("docs");
});
