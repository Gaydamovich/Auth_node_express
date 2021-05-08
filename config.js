module.exports = {
  jwt_key: `SECRET_KEY_API`,
  mongoose_uri: `mongodb://admin:${process.env.CREDENTIALS}@cluster0-shard-00-00.24duk.mongodb.net:27017,cluster0-shard-00-01.24duk.mongodb.net:27017,cluster0-shard-00-02.24duk.mongodb.net:27017/auth_express?ssl=true&replicaSet=atlas-c8v5te-shard-0&authSource=admin&retryWrites=true&w=majority`,
  old_mongoose_uri: `mongodb+srv://admin:${process.env.CREDENTIALS}@cluster0.24duk.mongodb.net/auth_express?retryWrites=true&w=majority`,
  mongoose_config: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
}