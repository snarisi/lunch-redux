module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './client/src/index.js'
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: 'node_modules',
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/client/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './client/dist'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
