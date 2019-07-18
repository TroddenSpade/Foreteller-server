const config = {
    PORT:4000,
    DATABASE : "mongodb://localhost:27017/forteller",
    SECRET : "0000",
    SERVER : "http://localhost:4000"
}

exports.get = function get(){
    return config;
};