// Get path
const path = require('path');

// Get webpack
const webpack = require('webpack');

// Webpack globs
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

// Css plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Plugin to delete empty js entries
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin');

// Config
module.exports = (env) => {

    if (typeof env !== 'object' || !'env' in env) {
        env = {
            env: 'dev'
        };
    }

    return {

        // Devtool
        devtool: 'cheap-source-map',

        // Entries
        entry: WebpackWatchedGlobEntries.getEntries(path.resolve(__dirname, 'Assets', 'Entry', '**', '*.{js,scss}')),

        // Output
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'webroot'),
            chunkFilename: '[name].js',
            publicPath: '/debug_kit/'
        },

        // Mode
        mode: env.env === 'dev' ? 'development' : 'production',

        // Resolve
        resolve: {
            modules: [path.resolve(__dirname, 'Vendor', 'node_modules'), path.resolve(__dirname, 'app', 'Assets'), 'node_modules']
        },

        // Module
        module: {
            rules: [

                // SCSS rule
                {
                    test: /\.scss$|.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {loader: 'css-loader', options: {minimize: true}},
                        'sass-loader'
                    ]
                },

                // Babel rule
                {
                    test: /\.js$/,
                    use: [
                        'babel-loader'
                    ]

                },

                // Font and img rules
                {
                    test: /\.(eot|svg|ttf|woff|woff2|jpg|jpeg|png|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '/debug_kit/'
                        }
                    }
                }

            ]
        },

        // Optimization
        optimization: {
            splitChunks: {
                chunks: 'all',
                minChunks: Infinity,
                cacheGroups: {
                    vendors: false,
                    default: false
                }
            }
        },

        // Performance
        performance: {
            hints: false
        },

        // Stats
        stats: {
            // chunkModules: false,
            assets: false
        },

        // Plugins
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name].css'
            }),
            new WebpackWatchedGlobEntries(),
            new ExtraneousFileCleanupPlugin(
                {
                    extensions: ['.js', '.js.map']
                }
            ),
        ]
    };
};
