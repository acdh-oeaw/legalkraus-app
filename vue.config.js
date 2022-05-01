module.exports = {
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === 'production' ? '/legalkraus-app/' : '/',
    pages: {
      index: {
        // entry for the page
        entry: 'src/main.js',
        title: 'Rechtsakten Karl Kraus',
      },
    }  
  }