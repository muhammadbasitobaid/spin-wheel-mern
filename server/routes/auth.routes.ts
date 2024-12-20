import express from "express";
// import UserService from "@services/user.service";

import AuthControllers from "@controllers/auth.controllers";

const router = express.Router();

//  Input : username/password via body
//  HTTP Success : 200, message and user infos.
//  HTTP Errors : 400, 401.
router.post("/login", AuthControllers.postLogin);

//  Input : email via body.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500, 503.
router.post("/login/forgot", AuthControllers.postLoginForgot);

//  Input : reset token via params, new password via body.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500, 503.
router.post("/login/reset/:token", AuthControllers.postLoginReset);

//  Input : void, identified by session cookie.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 500, 503.
router.post("/logout", AuthControllers.postLogout);

//  Input : email via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500, 503.
router.post("/send-confirmation", AuthControllers.postVerify);

router.get("/confirmation/:token", AuthControllers.getConfirmation);

//  Initiates Google OAuth login
router.get("/google", AuthControllers.googleLogin);

//  Handles Google OAuth callback
router.get("/google/callback", AuthControllers.googleCallback, (req, res) => {
  res.redirect(process.env.HOST || "https://thespinnerwheel.com/");
});

//  Retrieves the authenticated user's profile
router.get("/profile", AuthControllers.getProfile);

export default router;
