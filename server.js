const express = require("express");
const busboy = require("busboy");

const consola = require("consola");
const fs_extra = require("fs-extra");

const path = require("path");

const dotenv = require("dotenv").config();

const config = require("./config.json");

//const aws_sdk = require("aws-sdk");
//const amazon_s3 = new aws_sdk.S3();

const middleware_path = __dirname + "/middleware/";

const application = express();

application.set("view engine", config.application.view_engine);

require("./utilities/middleware")(middleware_path, application);

application.all("/", (request, response) =>
{
    response.render("index.hbs", {greeting: "Yo!"});
});

application.get("/upload-solution", (request, response) =>
{
    response.render("upload_solution.hbs", {});
});

application.post("/post-solution", (request, response) =>
{
    let filepipe = busboy({ headers: request.headers });

    filepipe.on("file", (name, file, info) =>
    {
        const {filename, encoding, mimetype} = info;

        let save_path = path.join(__dirname, "uploads/" + filename);

        file.pipe(fs_extra.createWriteStream(save_path));
    });

    filepipe.on("finish", () =>
    {
        response.writeHead(200, {"Connection": "close"});
        response.end("That's all folks!");
    });

    return request.pipe(filepipe);
});

const server = application.listen(process.env.PORT || 3000, () =>
{
    console.log(`Server port: ${server.address().port}`);
})