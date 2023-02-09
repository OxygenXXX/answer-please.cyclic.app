const express = require("express");

const consola = require("consola");
const fs_extra = require("fs-extra");

const dotenv = require("dotenv").config();

const config = require("./config.json");
const { response } = require("express");

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

});

const server = application.listen(process.env.PORT || 3000, () =>
{
    console.log(`Server port: ${server.address().port}`);
})