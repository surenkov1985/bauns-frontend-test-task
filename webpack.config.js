const path = require("path");
const fs = require("fs");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || "development";

const SRC = path.resolve(__dirname, "src");
const PAGES_DIR = path.resolve(SRC, "pages");
const COMPONENTS_DIR = path.resolve(SRC, "components");
const SECTIONS_DIR = path.resolve(SRC, "sections");

/* ---------------------------------------
   HTML pages
---------------------------------------- */

const pages = fs.readdirSync(PAGES_DIR);

const htmlPlugins = pages.map((page) => {
	return new HtmlWebpackPlugin({
		filename: page === "home" ? "index.html" : `${page}/index.html`,
		template: `pages/${page}/index.html`,
		inject: false,
	});
});

/* ---------------------------------------
   Entries
---------------------------------------- */

function collectEntries(baseDir, prefix) {
	if (!fs.existsSync(baseDir)) return {};

	const entries = {};
	const items = fs.readdirSync(baseDir);

	items.forEach((name) => {
		const full = path.join(baseDir, name);
		const jsFile = path.join(full, `${name}.js`);

		if (fs.statSync(full).isDirectory() && fs.existsSync(jsFile)) {
			entries[`${prefix}/${name}`] = jsFile;
		}
	});

	return entries;
}

const entries = {
	index: "./index.js",
	...collectEntries(COMPONENTS_DIR, "components"),
	...collectEntries(SECTIONS_DIR, "sections"),
	...collectEntries(PAGES_DIR, "pages"),
};

/* ---------------------------------------
   Config
---------------------------------------- */

const config = {
	context: SRC,
	mode,

	entry: entries,

	output: {
		path: path.resolve(__dirname, "build"),
		filename: "assets/[name].js",
		publicPath: "/", // 🔴 важно
		clean: true,
	},

	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: "assets/img",
					to: "assets/img",
				},
			],
		}),

		new MiniCssExtractPlugin({
			filename: "assets/[name].css",
		}),

		...htmlPlugins,
	],

	optimization: {
		minimize: false,
	},

	resolve: {
		extensions: [".js"],
		alias: {
			"@": SRC,
			"@components": COMPONENTS_DIR,
			"@sections": SECTIONS_DIR,
		},
	},

	module: {
		rules: [
			/* -------- HTML -------- */

			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: {
							sources: false,
						},
					},
					{
						loader: "posthtml-loader",
						options: {
							plugins: [
								require("posthtml-extend")(), // ❗ без root
								require("posthtml-include")({
									root: SRC,
								}),
								require("posthtml-expressions")({
									locals: {
										ENV: mode,
									},
								}),
							],
						},
					},
				],
			},

			/* -------- SCSS -------- */

			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "/",
						},
					},
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},

			/* -------- Fonts -------- */

			{
				test: /\.(woff2?|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[name][ext]",
				},
			},

			/* -------- JS -------- */

			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						presets: [
							[
								"@babel/preset-env",
								{
									targets: "ie 11",
									modules: false,
								},
							],
						],
					},
				},
			},
		],
	},

	devtool: "source-map",

	devServer: {
		static: {
			directory: path.join(__dirname, "build"),
		},
		devMiddleware: {
			writeToDisk: true,
		},
		historyApiFallback: false,
		open: true,
		port: 3101,
		host: "local-ip",
		hot: false,
		liveReload: true,
	},
};

module.exports = config;
