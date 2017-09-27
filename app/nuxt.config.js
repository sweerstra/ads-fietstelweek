module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'bicycle-storage',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Bicycle storage data visualisation app.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
    ** Customize the progress-bar color
    */
    loading: { color: '#ff7f28' }, 
    /*
    ** Build configuration
    */
    build: {
      vendor: ['vuetify']
    },
    plugins: ['~plugins/vuetify.js'],
    css: [
      { src: '~assets/app.styl', lang: 'styl' },
      { src: '~assets/style.css', lang: 'css' }
    ]
}


