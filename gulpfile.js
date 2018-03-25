var gulp = require("gulp");
var stylus = require("gulp-stylus");
var autoprefixer = require("gulp-autoprefixer");
var watch = require("gulp-watch");
var bc = require("browser-sync");

gulp.task("html", function() {
	return gulp.src("src/index.html")
		.pipe(gulp.dest("dist"));
});

gulp.task("img", function() {
	return gulp.src("src/img/**/*.png")
		.pipe(gulp.dest("dist/img"));
});

gulp.task("stylus", function() {
	return gulp.src("src/stylus/style.styl")
		.pipe(stylus())
		.pipe(autoprefixer({
			browsers: ["last 3 version", ">1%", "ie 8", "ie 7"]
		}))
		.pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
    gulp.watch("src/index.html", ["html", bc.reload]);
    gulp.watch("src/stylus/**/*.styl", ["stylus", bc.reload]);
});

gulp.task("serve", () => {
	bc({
		server: {
			baseDir: "dist"
		},
        port: 3000,
		browser: "chrome",
		notify: false,
        open: false
	});
});

gulp.task("build", [
    "watch",
    "html",
	"img",
	"stylus"
]);

gulp.task("default", ["build", "serve"]);
