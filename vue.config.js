module.exports = {
	outputDir: './build',
	// publicPath: './',
	devServer: {
		open: true
	},
	configureWebpack: {
		resolve: {
			alias: {
				components: '@/components',
				views: '@/views',
				assets: '@/assets',
				api: '@/apis'
			}
		}
	},
	lintOnSave: false
}
