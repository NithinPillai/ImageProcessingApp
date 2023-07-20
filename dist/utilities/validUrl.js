"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validURL = (req, res, next) => {
    let url = req.url;
    url = url.substring(url.indexOf('?') + 1);
    const queries = url.split('&');
    const filename = queries[0].substring(9);
    let width = 0;
    let height = 0;
    let valid = true;
    if (filename.length == 0) {
        res.send("You haven't entered a filename.");
        valid = false;
    }
    if (queries[1].substring(6).length == 0) {
        res.send("You haven't entered a width.");
        valid = false;
    }
    if (queries[2].substring(7).length == 0) {
        res.send("You haven't entered a width.");
        valid = false;
    }
    try {
        width = parseInt(queries[1].substring(6));
    }
    catch (err) {
        res.send('Width must be a number.');
        valid = false;
    }
    try {
        height = parseInt(queries[2].substring(7));
    }
    catch (err) {
        res.send('Height must be a number.');
        valid = false;
    }
    if (valid) {
        next();
    }
    else {
        console.log(filename, width, height);
        res.statusCode = 400;
    }
};
exports.default = validURL;
