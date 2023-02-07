const express = require("express");

const consola = require("consola");
const fs_extra = require("fs-extra");

const middleware_path = __dirname + "/middleware/";

const config = require("./config.json");

const application = express();

application.set("view engine", config.application.view_engine);

require("./utilities/middleware")(middleware_path, application);

application.all("/", (request, response) =>
{
    response.render("index.hbs", {greeting: "Yo!"});
});

const server = application.listen(process.env.PORT || 3000, () =>
{
    console.log(`Server port: ${server.address().port}`);
})