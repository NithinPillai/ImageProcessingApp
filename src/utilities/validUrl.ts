import express from 'express';

const validURL = (
    req: express.Request,
    res: express.Response,
    next: () => void
): void => {
    let url = req.url;
    url = url.substring(url.indexOf('?') + 1);
    const queries = url.split('&');

    const filename: string = queries[0].substring(9);
    let width: number = 0;
    let height: number = 0;
    let valid: boolean = true;

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
    } catch (err: unknown) {
        res.send('Width must be a number.');
        valid = false;
    }

    try {
        height = parseInt(queries[2].substring(7));
    } catch (err: unknown) {
        res.send('Height must be a number.');
        valid = false;
    }

    if (valid) {
        next();
    } else {
        console.log(filename, width, height);
        res.statusCode = 400;
    }
};

export default validURL;
