import express from 'express';
import fs from 'fs';

const fileExists = (
    req: express.Request,
    res: express.Response,
    next: () => void
): void => {
    let url = req.url;
    url = url.substring(url.indexOf('?') + 1);
    const queries = url.split('&');
    const filename = queries[0].substring(9);

    if (fs.existsSync(`assets/full/${filename}.jpg`)) {
        // console.log('middleware success');
        res.statusCode = 200;
        next();
    } else {
        // console.log('middleware fail');
        res.send('File does not exist.');
        res.statusCode = 400;
    }
};

export default fileExists;
