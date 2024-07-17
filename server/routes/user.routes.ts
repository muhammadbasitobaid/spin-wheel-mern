import { Router } from "express";
import UserController from "@controllers/user.controllers";

const router = Router();

// User routes
router.get("/", UserController.getUser);

// Input: username, email, password via body;
// HTTP Success: 200 and message.
// HTTP Errors: 400, 500.
router.post("/register", UserController.postUser);

// Delete user with the email if is unverified
// Input: email via body;
// HTTP Success: 200 and message.
// HTTP Errors: 400, 404, 500.
router.post("/register/cancel", UserController.postUserCancel);

// Get all wheels for a user
router.get("/users/:userId/wheels", UserController.getUserWheels);

// Save a new wheel for a user
router.post("/users/:userId/wheels", UserController.saveUserWheel);

export default router;
