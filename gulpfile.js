import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import bs from 'browser-sync';
import imagemin from 'gulp-imagemin';
import { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import del from 'del';
import fs from 'fs';
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2';
import svgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';
import fileInclude from 'gulp-file-include';

const scss = gulpSass(dartSass);
const browserSync = bs.create();


// Server 

export const server = () => {
	browserSync.init({
		server: {
			baseDir: 'app/'
		}
	});
};

// Remove 

export const clearDist = () => {
	return del('dist');
}

// HTML

export const htmlInclude = () => {
	return gulp.src('app/html/**/*.html')
		.pipe(fileInclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.stream());
}

// Styles 
// css/swiper-bundle.min.css
export const styles = () => {
	return gulp.src('app/scss/style.scss')
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 versions'],
			grid: true
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());

				// .pipe(gulp.dest('app/css/style.min.css'))
		// .src('app/css', 'node_modules/nouislider/dist/nouislider.css')
		// .pipe(concat('style.min.css'))
};

// Scripts

export const scripts = () => {
	return gulp.src([
		'node_modules/swiper/swiper-bundle.min.js',
		'node_modules/nouislider/dist/nouislider.min.js',
		'node_modules/mixitup/dist/mixitup.min.js',
		'app/js/main.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.stream());
};

// Sprites

export const svg = () => {
	return gulp.src('app/images/favicons/**/*svg')
		.pipe(cheerio({
			run: ($) => {
				$("[fill]").removeAttr("fill"); // очищаем цвет у иконок по умолчанию, чтобы можно было задать свой
				$("[stroke]").removeAttr("stroke"); // очищаем, если есть лишние атрибуты строк
				$("[style]").removeAttr("style"); // убираем внутренние стили для иконок
			},
			parserOptions: { xmlMode: true },
		})
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: 'sprite.svg',
						example: true
					}
				}
			})

		)
		.pipe(gulp.dest('app/images/'));
}

export const catalogueSvg = () => {
	return gulp.src('app/images/favicons/catalogue/*svg')
		.pipe(cheerio({
			run: ($) => {
			},
			parserOptions: { xmlMode: true },
		})
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: 'catalogue.svg',
						example: true
					}
				}
			})

		)
		.pipe(gulp.dest('app/images/'));
}
// Images 

export const images = () => {
	return gulp.src('app/images/**/*.*')
		.pipe(imagemin([
			gifsicle({ interlaced: true }),
			mozjpeg({ quality: 75, progressive: true }),
			optipng({ optimizationLevel: 5 }),
			svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(gulp.dest('dist/images'));
}

// Fonts

export const convertFonts = () => {
	return gulp.src('app/fonts/*ttf')
		.pipe(fonter({
			formats: ['woff']
		}))
		.pipe(gulp.dest('app/fonts'))
		.pipe(gulp.src('app/fonts/*ttf'))
		.pipe(ttf2woff2())
		.pipe(gulp.dest('app/fonts'));
}

export const updateFontsStyle = () => {
	const fontsStyle = 'app/scss/_fonts.scss';

	fs.readdir('app/fonts', (err, fontsFiles) => {
		if (fontsFiles) {
			if (!fs.existsSync(fontsStyle)) {
				fs.writeFile(fontsStyle, '', cb);

				console.log(fontsFiles.length);

				fontsFiles.forEach((fontFile) => {
					if (fontFile.includes('ttf')) {
						const fontFileName = fontFile.split('.')[0];

						const fontName = fontFileName.split('-')[0];
						let fontWeight = fontFileName.split('-')[1].toLowerCase();

						switch (fontWeight) {
							case 'light':
								fontWeight = '300';
								break;
							case 'regular':
								fontWeight = '400';
								break;
							case 'medium':
								fontWeight = '500';
								break;
							case 'semibold':
								fontWeight = '600';
								break;
							case 'bold':
								fontWeight = '700';
								break;
							case 'extrabold':
								fontWeight = '800';
								break;
							case 'black':
								fontWeight = '900';
								break;

							default:
								fontWeight = '400';
						}

						fs.appendFile(fontsStyle,
							`@font-face {
  font-family: ${fontName};
  font-display: swap;
  font-style: normal;
  font-weight: ${fontWeight};
  src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
}\r\n`, cb);
					}
				})

			} else {
				console.log('_fonts.scss file already exists!');
			}
		} else {
			console.log('No fonts file availible!');
		}
	});

	return gulp.src('app/');
	function cb() { }
}

// Build

let copyToDist = () => {
	return gulp.src([
		'app/**/*.html',
		'app/js/**/*min.js',
		'app/css/**/*.css',
		'app/fonts/*.woff',
		'app/fonts/*.woff2'
	], { base: 'app' })
		.pipe(gulp.dest('dist/'))
}

export const build = gulp.series(clearDist, images, copyToDist);

// Watcher

export const watch = () => {
	gulp.watch(['app/html/**/*.html'], htmlInclude);
	gulp.watch(['app/scss/**/*.scss'], styles);
	gulp.watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	gulp.watch(['app/**/*html']).on('change', browserSync.reload);
};


export default gulp.series(
	gulp.parallel(htmlInclude, styles, scripts, server, watch)
)
