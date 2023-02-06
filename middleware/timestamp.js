
const datetime = require("node-datetime");
const consola = require("consola");

let timestamp_handler = (request, resonse, handler) =>
{
    const timestamp = datetime.create();
    
    consola.info(`Time: ${timestamp.format("H:M:S Y.m.d")}`);
    
    handler();
};

module.exports.middleware = timestamp_handler;