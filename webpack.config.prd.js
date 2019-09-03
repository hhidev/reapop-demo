const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return {
        mode: 'production',
        entry: './app/src/index.tsx', //このwebpackはcontainerの/app/webpack.config.jsにマウントされる
        output: {
            path: path.resolve(__dirname, './app/dist'),
            filename: "index.[chunkhash:10].js",
            chunkFilename: "[name].js",
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
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            new htmlWebpackPlugin({
                template: "./app/src/index.html"
            })
        ]
    };
}