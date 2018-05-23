module.exports = {
    port: process.env.PORT || 7171,
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/TakeNote',
    SECRET_TOKEN: 'cf9b9beee0352210885a4cfc473c034d'
  }