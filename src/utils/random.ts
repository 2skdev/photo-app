const crypto = require("crypto");

export default function random(len: number) {
  return crypto
    .randomBytes(len + 2)
    .toString("base64")
    .replace(/\W/g, "")
    .substring(0, len);
}
