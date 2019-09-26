module.exports = () => {
    mongoose.connect('mongodb://localhost/loginapp');
    var db = mongoose.connection;
    return db;
}
