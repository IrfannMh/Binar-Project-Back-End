//Dependencies 
const { getAuth } = require("firebase-admin/auth");
const admin = require("./firebase-config");

// Remove bearer from authorization header
function getToken(authorizationHeader = "") {
  const splittedHeader = authorizationHeader.split("Bearer ");
  console.log(splittedHeader);
  return splittedHeader[1];
}

async function authorize(req, res, next) {
  try {
    console.log(req.headers.authorization);
    const token = getToken(req.headers.authorization);

    // Take uid from decoded token, this is the user id
    const { uid } = await getAuth(admin).verifyIdToken(token);

    // Just follow the old way of providing user id
    // on the next stack
    req.user = { id: uid };

    next();
  } catch (err) {
    console.log(err);

    res.status(401).json({
      status: "FAIL",
      data: {
        name: "UnauthorizedError",
        message: "Token is not valid!",
      },
    });
  }
}

module.exports = authorize;

