var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var path = require("path");

var extractCustomCss = new ExtractTextPlugin({
    filename: 'css/custom.css',
    disable: false,
    allChunks: true
});

var extractPreprocCss = new ExtractTextPlugin({
    filename: 'css/preproc.css',
    disable: false,
    allChunks: true
});

module.exports = {
    entry:{
       app:['./src/js/app.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                use: [{
                    loader:'babel-loader',
                    options:{
                        presets:['es2015']
                    }
                }],
            
            },
            {
                test: /\.css$/,
                use: extractCustomCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: extractPreprocCss.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            },
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                test:/\.(jpg|png)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'img_[name].[ext]',
                        outputPath:'img/', // this parameter is for copying
                    }
                }]
            },
            // {
            //     test:/\.html$/,
            //     use:[{
            //         loader:'file-loader',
            //         options:{
            //             name:'[name].[ext]',
            //         }
            //     }],
            //     exclude:path.resolve(__dirname, "src/index.html")
            // }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Basic',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: false,
            filename:'index.html',
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
            chunks:['app']
        }),
        new HtmlWebpackPlugin({
            title: 'Users Page',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: false,
            filename:'users.html',
            template: './src/users.html', // Load a custom template (ejs by default see the FAQ for details)
            chunks:['app']
        }),
        new HtmlWebpackPlugin({
            title: 'Products Page',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: false,
            filename:'products.html',
            template: './src/products.html', // Load a custom template (ejs by default see the FAQ for details)
            chunks:['app']
        }),
        extractPreprocCss,
        extractCustomCss,
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery'
        })
    ]
};