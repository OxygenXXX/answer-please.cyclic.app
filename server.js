const express = require("express");

const application = express();

application.all("/", (request, response) =>
{
    response.send("Yo!");
});

const server = application.listen(process.env.PORT || 3000, () =>
{
    console.log(`Server port: ${server.address().port}`);
})