const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js');
mix.sass('resources/sass/app.scss', 'public/css');
mix.styles('resources/assets/font-awesome-4.7.0/css/font-awesome.css', 'public/css/font-awesome.css');
mix.copy('resources/assets/font-awesome-4.7.0/fonts', 'public/fonts');
