let Encore = require('@symfony/webpack-encore');
let path   = require('path');

const isProduction      = Encore.isProduction();
const assets_path       = path.resolve('./src/Resources/private');
const output_path       = (isProduction) ? path.resolve('./public/build') : path.resolve('./src/Resources/public');
const public_path       = (isProduction) ? '/build' : '/build';
const manifestKeyPrefix = (isProduction) ? 'build' : 'public';
const sass_path         = path.join(assets_path, './sass');
const js_path           = path.join(assets_path, './js');

const basePath = path.resolve(__dirname, './');

Encore
// empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()

    // directory where all compiled assets will be stored
    .setOutputPath(output_path)

    // what's the public path to this directory (relative to your project's document root dir)
    .setPublicPath(public_path)
    .setManifestKeyPrefix(manifestKeyPrefix)
    // .disableSingleRuntimeChunk()
    // will output as web/build/app.js
    .enableReactPreset()
    .enableTypeScriptLoader()
    // .enableForkedTypeScriptTypesChecking()
    .addEntry('search', [path.join(js_path, '/App.tsx'), path.join(sass_path, '/search.scss')])
    // allow sass/scss files to be processed
    .enableSassLoader()
    .enablePostCssLoader()

    // allow legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()
    .enableSourceMaps(!isProduction)
    // // create hashed filenames (e.g. app.abc123.css)
    .enableVersioning(isProduction)
    .enableSingleRuntimeChunk()
    .autoProvideVariables({
        'bazinga-translator': 'Translator'
    })
    .configureFilenames({
        js: (isProduction) ? '[name].min.js' : '[name].js',
        css: (isProduction) ? '[name].min.css' : '[name].css',
        images: 'images/[name].[ext]',
        fonts: 'fonts/[name].[ext]'
    })
;

let config = Encore.getWebpackConfig();

const useHRM = (undefined !== config.devServer && config.devServer.hot);

if (isProduction || !useHRM) {
    Encore
        .setPublicPath('/js')
        .setManifestKeyPrefix('js')
    ;
}


// config = Encore.getWebpackConfig();
config.watchOptions = {poll: true, ignored: /node_modules/};
// export the final configuration
module.exports      = config;