var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssmin = require("gulp-cssmin");
var imagemin = require("gulp-imagemin");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("css", function () {
    return gulp.src("source/sass/style.scss")
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      // .pipe(cssmin())
      // .pipe(rename("style.min.css"))
      .pipe(sourcemap.write("."))
      .pipe(gulp.dest("build/css"))
      .pipe(server.stream());
  });
  
  gulp.task("images", function() {
    return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
  ]))
    .pipe(gulp.dest("build/img"));
  });
  
  gulp.task("clean", function() {
    return del("build");
  });
  
  gulp.task("html", function() {
    return gulp.src("source/*.html")
      .pipe(gulp.dest("build"));
  });
  
  gulp.task("copy", function() {
    return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**",
      "source/slick/**"
    ], {
      base:"source"
    })
    .pipe(gulp.dest("build"));
  });
  
  gulp.task("build", gulp.series (
    "clean",
    "copy",
    "css",
    "images",
    "html"
  ));
  
  gulp.task("server", function () {
    server.init({
      server: "build/",
      notify: false,
      open: true,
      cors: true,
      ui: false
    });
  
    gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
    gulp.watch("source/*.html", gulp.series("html", "refresh"));
  });
  
  gulp.task("refresh", function(done) {
    server.reload();
    done();
  })
  
  gulp.task("start", gulp.series("build", "server"));