const crypto = require("crypto");

const secretKey = "secret_key"

/**
 *S 对内容进行加密, 转成16进制
 * @param content
 * @param algorithm md5 | sha1 | sha256
 * @returns {*}
 */
function encryptContentToHex(content, algorithm = "md5") {
    const md5 = algorithm === 'sha256' ? crypto.createHmac("sha256", secretKey) : crypto.createHash(algorithm)
    return md5.update(content).digest("hex")
}

module.exports = {
    encryptContentToHex
}