/* eslint-disable no-sync */

import './src/internals/cssModules';

import ash from 'ash';
import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import cache from 'gulp-memory-cache';
import webpack from 'webpack-stream';
import fs from 'fs';
import ExtractText from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssVariables from 'postcss-css-variables';
import postcssVerticalRhythm from 'postcss-vertical-rhythm';
import postcssNested from 'postcss-nested';
import postcssPxToRem from 'postcss-pxtorem';
import postcssCalc from 'postcss-calc';
import postcssConditionals from 'postcss-conditionals';
import postcssCustomMedia from 'postcss-custom-media';
import util from 'gulp-util';
import uglify from 'gulp-uglify';
import cssnano from 'gulp-cssnano';

import stylesConfig from './src/config/styles';


if (util.env.production) {
	process.env.NODE_ENV = 'production';
} else {
	process.env.NODE_ENV = 'development';
}

const APP_CLEANUP = 'app:cleanup';
const APP_BABEL_COMPAT = 'app:babel-compat';
const APP_BABEL_NEXT = 'app:babel-next';
const APP_WEBPACK = 'app:webpack';
const APP_CSS = 'app:css';
const APP_ASSETS_FONTS = 'app:assets-fonts';
const APP_ASSETS_IMAGES = 'app:assets-images';
const APP_ASSETS_MODELS = 'app:assets-models';
const APP_MINIFY_JS = 'app:minify-js';
const APP_MINIFY_CSS = 'app:minify-css';
const WATCH = 'watch';
const DEFAULT = 'default';
const BUILD = 'build';

let babelCompatConfig = JSON.parse(fs.readFileSync('.babelrc-compat', {encoding: 'utf8'}));

ash.config = stylesConfig;

let variables = ash.flattenTree(ash.config, {valuesToString: true});

variables['breakpoints.tinyMenu.start'] = '1px';
variables['breakpoints.tinyMenu.end'] = '640px';
variables['breakpoints.compactMenu.start'] = '641px';
variables['breakpoints.compactMenu.end'] = '1024px';
variables['breakpoints.compactPage.start'] = '1px';
variables['breakpoints.compactPage.end'] = '480px';
variables['breakpoints.singleColumnPage.start'] = '481px';
variables['breakpoints.singleColumnPage.middle'] = '800px';
variables['breakpoints.singleColumnPage.end'] = '1024px';

let mediaQueries = {
	'--tinyMenu-start-min': `(min-width: ${variables['breakpoints.tinyMenu.start']})`,
	'--tinyMenu-start-max': `(max-width: ${variables['breakpoints.tinyMenu.start']})`,
	'--tinyMenu-end-min': `(min-width: ${variables['breakpoints.tinyMenu.end']})`,
	'--tinyMenu-end-max': `(max-width: ${variables['breakpoints.tinyMenu.end']})`,
	'--compactMenu-start-min': `(min-width: ${variables['breakpoints.compactMenu.start']})`,
	'--compactMenu-start-max': `(max-width: ${variables['breakpoints.compactMenu.start']})`,
	'--compactMenu-end-min': `(min-width: ${variables['breakpoints.compactMenu.end']})`,
	'--compactMenu-end-max': `(max-width: ${variables['breakpoints.compactMenu.end']})`,
	'--compactPage-start-min': `(min-width: ${variables['breakpoints.compactPage.start']})`,
	'--compactPage-start-max': `(max-width: ${variables['breakpoints.compactPage.start']})`,
	'--compactPage-end-min': `(min-width: ${variables['breakpoints.compactPage.end']})`,
	'--compactPage-end-max': `(max-width: ${variables['breakpoints.compactPage.end']})`,
	'--singleColumnPage-start-min': `(min-width: ${variables['breakpoints.singleColumnPage.start']})`,
	'--singleColumnPage-start-max': `(max-width: ${variables['breakpoints.singleColumnPage.start']})`,
	'--singleColumnPage-middle-min': `(min-width: ${variables['breakpoints.singleColumnPage.middle']})`,
	'--singleColumnPage-middle-max': `(max-width: ${variables['breakpoints.singleColumnPage.middle']})`,
	'--singleColumnPage-end-min': `(min-width: ${variables['breakpoints.singleColumnPage.end']})`,
	'--singleColumnPage-end-max': `(max-width: ${variables['breakpoints.singleColumnPage.end']})`
};

gulp.task(APP_CLEANUP, () => del(['./dist-compat/**/*', './dist-next/**/*', './public/**/*']));

gulp.task(APP_BABEL_COMPAT, () => gulp.src('./src/**/*.js', {since: cache.lastMtime(APP_BABEL_COMPAT)})
	.pipe(cache(APP_BABEL_COMPAT))
	.pipe(babel(babelCompatConfig))
	.pipe(gulp.dest('./dist-compat')));

gulp.task(APP_BABEL_NEXT, () => gulp.src('./src/**/*.js', {since: cache.lastMtime(APP_BABEL_NEXT)})
	.pipe(cache(APP_BABEL_NEXT))
	.pipe(babel())
	.pipe(gulp.dest('./dist-next')));

gulp.task(APP_WEBPACK, () => gulp.src('./dist-compat/client/index.js')
	.pipe(webpack({
		output: {
			filename: 'client.js'
		},
		module: {
			loaders: [{
				test: /\.css$/,
				// loader: ExtractText.extract('style-loader', 'css-loader?module&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:4]!postcss-loader')
				loader: ExtractText.extract('style-loader', 'css-loader?module&importLoaders=1&localIdentName=[name]__[local]!postcss-loader')
			}]
		},
		plugins: [
			new ExtractText('client.css', {allChunks: true})
		],
		postcss: [
			postcssNested(),
			postcssVariables({
				variables
			}),
			postcssCustomMedia({
				extensions: mediaQueries
			}),
			postcssConditionals(),
			postcssCalc({
				precision: 8
			}),
			postcssVerticalRhythm({
				unit: 'bh',
				baselineHeight: ash.config.grid.baselineHeight
			}),
			postcssPxToRem({
				rootValue: ash.config.typographicScale.base,
				unitPrecision: 8,
				propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing', 'width', 'height', 'left', 'right', 'top', 'bottom', 'background-size', 'margin', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'border', 'border-left', 'border-right', 'border-top', 'border-bottom', 'background'],
				replace: true,
				mediaQuery: false,
				selectorBlackList: ['html']
			}),
			autoprefixer({
				browsers: ['> 1%', 'last 2 versions'],
				remove: false
			})
		],
	}))
	.pipe(gulp.dest('./public/build')));

gulp.task(APP_CSS, () => gulp.src('./src/**/*.css', {since: cache.lastMtime(APP_CSS)})
	.pipe(cache(APP_CSS))
	.pipe(gulp.dest('./dist-compat'))
	.pipe(gulp.dest('./dist-next')));

gulp.task(APP_ASSETS_FONTS, () => gulp.src('./assets/fonts/**/*.woff')
	.pipe(gulp.dest('./public/assets')));

gulp.task(APP_ASSETS_IMAGES, () => gulp.src('./assets/images/**/*')
	.pipe(gulp.dest('./public/assets')));

gulp.task(APP_ASSETS_MODELS, () => gulp.src('./assets/models/**/*')
	.pipe(gulp.dest('./public/assets')));

gulp.task(APP_MINIFY_JS, () => gulp.src('./public/build/client.js')
	.pipe(uglify())
	.pipe(gulp.dest('./public/build')));

gulp.task(APP_MINIFY_CSS, () => gulp.src('./public/build/client.css')
	.pipe(cssnano({
		mergeLonghand: false,
		autoprefixer: false,
		safe: true
	}))
	.pipe(gulp.dest('./public/build')));

gulp.task(WATCH, () => {
	gulp.watch(['./src/**/*.js'], gulp.series(gulp.parallel(APP_BABEL_COMPAT, APP_BABEL_NEXT), APP_WEBPACK));
	gulp.watch(['./src/**/*.css'], gulp.series(APP_CSS, APP_WEBPACK));
});

gulp.task(DEFAULT, gulp.series(
	APP_CLEANUP,
	gulp.parallel(APP_CSS, APP_ASSETS_FONTS, APP_ASSETS_IMAGES, APP_ASSETS_MODELS),
	gulp.parallel(APP_BABEL_COMPAT,	APP_BABEL_NEXT),
	APP_WEBPACK,
	WATCH
));

gulp.task(BUILD, process.env.NODE_ENV === 'production' ? gulp.series(
	APP_CLEANUP,
	gulp.parallel(APP_CSS, APP_ASSETS_FONTS, APP_ASSETS_IMAGES, APP_ASSETS_MODELS),
	gulp.parallel(APP_BABEL_COMPAT,	APP_BABEL_NEXT),
	APP_WEBPACK,
	gulp.parallel(APP_MINIFY_JS, APP_MINIFY_CSS)
) : gulp.series(
	APP_CLEANUP,
	gulp.parallel(APP_CSS, APP_ASSETS_FONTS, APP_ASSETS_IMAGES, APP_ASSETS_MODELS),
	gulp.parallel(APP_BABEL_COMPAT,	APP_BABEL_NEXT),
	APP_WEBPACK
));
