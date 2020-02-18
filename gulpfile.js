const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  concatCss = require("gulp-concat-css"),
  uglify = require("gulp-uglifyjs"),
  cssnano = require("gulp-cssnano"),
  rename = require("gulp-rename"),
  del = require("del"),
  imagemin = require("gulp-imagemin"),
  jpgmin = require("imagemin-jpegoptim"),
  pngmin = require("imagemin-pngquant"),
  cache = require("gulp-cache"),
  autoprefixer = require("gulp-autoprefixer"),
  gih = require("gulp-include-html");

gulp.task("sass", function() {
  return gulp
    .src("app/sass/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer(["last 15 versions", "> 1%"]))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false
  });
});

gulp.task("scripts", function() {
  return gulp
    .src([
      "app/libs/slick/slick.min.js",
      "app/libs/Inputmask-4.x/dist/jquery.inputmask.bundle.js",
      "app/libs/fancybox/dist/jquery.fancybox.min.js"
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});

gulp.task("css-libs", function() {
  return gulp
    .src([
      "app/libs/slick/slick.css",
      "app/libs/fancybox/dist/jquery.fancybox.min.css",
      "app/libs/css-circular-prog-bar.css"
    ])
    .pipe(concatCss("libs.min.css"))
    .pipe(cssnano())
    .pipe(gulp.dest("app/css"));
});

gulp.task("build-html", function() {
  return gulp
    .src("app/html/pages/*.html")
    .pipe(
      gih({
        baseDir: "app/html/"
      })
    )
    .pipe(gulp.dest("app"));
});

gulp.task(
  "watch",
  ["browser-sync", "css-libs", "scripts", "build-html"],
  function() {
    gulp.watch("app/sass/**/*.scss", ["sass"]);
    gulp.watch("app/html/**/*.html", ["build-html"]);
    gulp.watch("app/*.html", browserSync.reload);
    gulp.watch("app/js/**/*.js", browserSync.reload);
  }
);

gulp.task("clean", function() {
  return del.sync("dist");
});

gulp.task("img", function() {
  return gulp
    .src("app/images/**/*")
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          jpgmin({
            progressive: true,
            max: 100,
            stripAll: true
          }),
          pngmin({
            quality: "100"
          }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
          })
        ])
      )
    )

    .pipe(gulp.dest("dist/images"));
});

gulp.task("clear", function() {
  return cache.clearAll();
});

gulp.task(
  "build",
  ["clean", "clear", "img", "sass", "scripts", "css-libs"],
  function() {
    let buildCss = gulp.src("app/css/**/*").pipe(gulp.dest("dist/css"));

    let buildFonts = gulp.src("app/fonts/**/*").pipe(gulp.dest("dist/fonts"));

    let buildJs = gulp.src("app/js/**/*").pipe(gulp.dest("dist/js"));

    let buildHtml = gulp.src("app/*.html").pipe(gulp.dest("dist"));
  }
);

gulp.task("default", ["watch"]);
