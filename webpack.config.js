const isDev = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    }, plugins: [
        new MiniCssExtractPlugin({
            filename: isDev ? "[name].css" : "[name].[hash].css",
            chunkFilename: isDev ? "[id].css" : "[id].[hash].css",
        })]
};

module.exports = config;