const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../app/config");
const { TOKEN_EXPIRED, TOKEN_INVALID, TOKEN_NOT_BEFORE } = require("../app/constant");

function createToken(payload) {
  return jwt.sign(payload, PRIVATE_KEY, { algorithm: "RS256", expiresIn: "1h" });
}

function verifyToken(token) {
  const info = { data: null, error: "" };
  try {
    info.data = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
  } catch (err) {
    switch (true) {
      // token 已过期
      case err instanceof jwt.TokenExpiredError:
        info.error = TOKEN_EXPIRED;
        break;
      // token 无效
      case err instanceof jwt.JsonWebTokenError:
        info.error = TOKEN_INVALID;
        break;
      // token 尚未生效
      case err instanceof jwt.NotBeforeError:
        info.error = TOKEN_NOT_BEFORE;
        break;
    }
  }
  return info;
}

module.exports = {
  createToken,
  verifyToken,
};
