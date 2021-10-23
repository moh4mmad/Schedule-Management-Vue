module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    configureWebpack: {
        entry: ["@babel/polyfill", "./src/main.js"],
        //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
        resolve: {
            symlinks: false,
        },
    },
    transpileDependencies: ["@coreui/utils", "@coreui/vue"],
};