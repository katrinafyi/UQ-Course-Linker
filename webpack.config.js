let UserscriptHeaderPlugin = require('./UserscriptHeaderPlugin/UserscriptHeaderPlugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
    let prod = argv.mode === 'production';
    return {
        entry: "./src/uq_course_linker.user.tsx",
        mode: (prod?"production":"development"),
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: true,
                    uglifyOptions: {
                        output: {
                            comments: /^ @|==/,
                        }
                    }
                })
            ]
        },
        devtool: prod?'source-map':'cheap-eval-source-map',
        output: {
            filename: "uq_course_linker" + (prod?".user.js":".dev.user.js")
        },
        resolve: {
            // Add '.ts' and '.tsx' as a resolvable extension.
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", '.json']
        },
        module: {
            rules: [
                // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
                { test: /\.tsx?$/, loader: "ts-loader" }
            ]
        },
        plugins: [
            new UserscriptHeaderPlugin({inputFile: './src/uq_course_linker.user.tsx'})
        ]
    }
};