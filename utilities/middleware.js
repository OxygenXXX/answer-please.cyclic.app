
const consola = require("consola");
const fs_extra = require("fs-extra");

let require_middleware = (middleware_path, application) =>
{
    fs_extra.readdir(middleware_path, (error, files) =>
    {
        if (error) throw error;
       
        files.forEach(element => 
        {
            consola.info(`Loading middleware: ${element}`);
    
            application.use(require(middleware_path + element).middleware);
    
            consola.info(`Loaded middleware: ${element}`);
        });
    });
};

module.exports = require_middleware;