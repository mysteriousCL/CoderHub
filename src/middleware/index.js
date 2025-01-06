const bodyParser = require("koa-bodyparser");

function setupMiddleware(app){
    app.use(bodyParser())
}

module.exports = {
    setupMiddleware
}