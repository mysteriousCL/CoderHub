const app = require("./app")
const {APP_PORT} = require("./app/config")

//36
app.listen(APP_PORT, () => {
    console.log("服务器启动！")
})