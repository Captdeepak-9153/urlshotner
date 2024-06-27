const { getUser } = require("../service/auth");
//AUTHENTICATION

// function checkForAuthentication (req ,res , next) {
//   const authorizationHeaderValue = req.header["authorization"];
//   req.user = null;
//   if (!authorizationHeaderValue || authorizationHeaderValue.startsWith('Bearer'))
//   return next();
  
//   const token = authorizationHeaderValue.split("Bearer") [1];
//   getUser();
// }


async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid; // this will check whether there is a cookie in the url which send by browser

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};