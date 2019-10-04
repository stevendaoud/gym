module.exports = () => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/loginapp');
    var db = mongoose.connection;
    return db;
}
