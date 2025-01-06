const session = require('koa-session'); // 依赖于Cookie，使用它，Cookie值将不会再是明文，增加了安全性,实现session认证

const CONFIG = {
  key: 'sessionId', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000, // 毫秒
  // autoCommit: true, /** (boolean) automatically commit headers (default true) */
  // overwrite: true, /** (boolean) can overwrite or not (default true) */
  // httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) 是否使用加密签名，防止客户端修改伪造session */
  // rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  // renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  // secure: true, /** (boolean) secure cookie*/
  // sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

/**
 * 注册后，后续只需要这样使用 ctx.session.[属性] = 值， 既可以生效
 * @param app
 */
function setupSession(app){
  app.keys = ['some secret hurr']; // 在使用signed：true，到基础上给签名加盐
  // koa-session的中间件做了一个操作，在ctx中添加了一个session属性，使用方式，如ctx.session.user={id,name}，获取值时直接ctx.session.user
  app.use(session(CONFIG, app));
}

module.exports = {
  setupSession
}
