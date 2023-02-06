
const consola = require("consola");

let request_handler = (request, response, handler) =>
{
    consola.info(`Requested address: ${request.path}`);

    handler();
};

module.exports.middleware = request_handler;