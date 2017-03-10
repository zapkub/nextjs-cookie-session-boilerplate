


exports.log = function logger (msg) {
    if(process.env.NODE_ENV === 'development') {
        console.log(msg);
    }
}