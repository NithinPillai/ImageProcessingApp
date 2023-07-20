import express from 'express';
import path from 'path';
import sharp from 'sharp';
import fileExists from '../utilities/fileExists';
import validURL from '../utilities/validUrl';
const routes = express.Router();

routes.get('/images/', fileExists, validURL, async (req, res) => {
    let url = req.url;
    url = url.substring(url.indexOf('?') + 1);
    const queries = url.split('&');
    const filename = queries[0].substring(9);
    const width = parseInt(queries[1].substring(6));
    const height = parseInt(queries[2].substring(7));

    makeImage(filename, width, height);

    setTimeout(() => {
        res.sendFile(
            path.resolve(
                __dirname + `/../../assets/thumb/${filename}_thumb.jpg`
            )
        );
    }, 250);
});

function makeImage(filename: string, width: number, height: number): void {
    sharp(`assets/full/${filename}.jpg`)
        .resize(width, height)
        .toFile(`assets/thumb/${filename}_thumb.jpg`, function (err: Error) {
            if (err != null) console.log(err);
        });
}

export default routes;
