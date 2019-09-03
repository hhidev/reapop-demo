const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = () => {

    return {
        mode: 'development',
        entry: './app/src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "index.js",
            chunkFilename: "[name].js",
        },
        devServer: {
            historyApiFallback: true,
            contentBase: 'dist',
            port: 9090,
            inline: true,
            hot: true
        },
        module: {
            rules: [
                {
                    loader: 'ts-loader',
                    test: /\.tsx?$/,
                    exclude: [
                        /node_modules/
                    ],
                    options: {
                        configFile: 'tsconfig.json'
                    }
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                },
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    exclude: [
                        /node_modules/
                    ],
                    use: [
                        {
                            loader: 'tslint-loader',
                            // trueにするとhotloadが遅くなるのでfalse
                            options: {
                                typeCheck: false,
                                fix: false
                            },
                        },
                    ]
                },
                {
                    test: /\.css/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        }
                    ]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                    type: 'javascript/auto'
                }
            ]
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        },
        plugins: [
            new htmlWebpackPlugin({
                template: "./app/src/index.html"
            }),
            new HardSourceWebpackPlugin()
        ]
    };

};
