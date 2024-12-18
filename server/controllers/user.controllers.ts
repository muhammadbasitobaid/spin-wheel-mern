import { Request, Response } from "express";
import sanitize from "mongo-sanitize";
import {
  validateEmail,
  validateRegisterInput,
} from "@validations/user.validation";

import UserService from "@services/user.service";
import TokenService from "@services/token.service";
import LoggerService from "@services/logger.service";
import EmailService from "@services/email.service";
import User, { UserDocument } from "@models/user.model"; // Assuming User model is defined
import { Wheel } from "@models/wheel.model"; // Assuming Wheel model is defined
import mongoose from "mongoose";

const getUser = (req: Request, res: Response): void => {
  const user = req.user as UserDocument;
  res.status(200).send({ message: "User info successfully retrieved", user });
};

const postUser = async (req: Request, res: Response): Promise<void> => {
  // Validate Register input
  console.log(req.body);
  const { error } = validateRegisterInput(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }

  const sanitizedInput = sanitize<{
    username: string;
    password: string;
    email: string;
  }>(req.body);

  try {
    let user = await UserService.findUserBy(
      "username",
      sanitizedInput.username.toLowerCase()
    );

    if (user) {
      res
        .status(400)
        .send({ message: "Username already taken. Take another Username" });
      return;
    }

    user = await UserService.findUserBy(
      "email",
      sanitizedInput.email.toLowerCase()
    );

    if (user) {
      res
        .status(400)
        .send({ message: "Email already registered. Take another email" });
      return;
    }

    const newUser = UserService.createUser(sanitizedInput);
    await UserService.setUserPassword(newUser, newUser.password!);
    try {
      await UserService.saveUser(newUser);
      const verificationToken = TokenService.createToken();
      TokenService.setUserId(verificationToken, newUser._id);
      await TokenService.saveToken(verificationToken);
      const verificationEmail = EmailService.createVerificationEmail(
        newUser.email,
        verificationToken.token
      );
      try {
        await EmailService.sendEmail(verificationEmail);
        res.status(200).send({ message: "A verification mail has been sent." });
      } catch (emailError) {
        console.log('emailError', emailError);
        await UserService.deleteUserById(newUser._id);
        res.status(503).send({
          message: `Impossible to send an email to ${newUser.email}, try again. Our service may be down.`,
        });
      }
    } catch (saveError) {
      LoggerService.log.error(saveError);
      res.status(500).send({ message: "Creation of user failed, try again." });
    }
  } catch (generalError) {
    LoggerService.log.error(generalError);
    res.status(500).send("An unexpected error occurred");
  }
};

const postUserCancel = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = validateEmail(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }

  const sanitizedInputs = sanitize<{ email: string }>(req.body);

  try {
    await UserService.deleteUnverifiedUserByEmail(sanitizedInputs.email);
    res.status(200).send({ message: "User reset success" });
  } catch (error) {
    res.status(500).send("An unexpected error occurred");
  }
};


const getUserWheels = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;

    // Validate user ID
    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    // Populate user wheels and select specific fields (_id, wheelType, customWheelName)
    const user = await User.findById(userId)
      .populate({
        path: "wheels",
        select: "_id wheelType customWheelName",  // Select only these fields
      })
      .exec();

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Wheels retrieved successfully", wheels: user.wheels });
  } catch (error: any) {
    LoggerService.log.error(`Error fetching wheels for user ${req.params.userId}: ${error.message}`);
    res.status(500).json({ message: "Error fetching wheels", error: error.message });
  }
};

const saveUserWheel = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const wheelData = sanitize(req.body);

    // Validate user ID
    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update existing wheel
    if (wheelData._id) {
      if (!mongoose.isValidObjectId(wheelData._id)) {
        res.status(400).json({ message: "Invalid wheel ID" });
        return;
      }

      const existingWheel = await Wheel.findByIdAndUpdate(wheelData._id, wheelData, { new: true });
      if (!existingWheel) {
        res.status(404).json({ message: "Wheel not found" });
        return;
      }

      res.status(200).json({ message: "Wheel updated successfully", wheel: existingWheel });
      return;
    }

    // Create new wheel
    delete wheelData._id;
    const newWheel = new Wheel(wheelData);
    user.wheels.push(newWheel._id); // Add wheel reference to user
    await newWheel.save();
    await user.save();

    res.status(200).json({ message: "Wheel created and saved successfully", wheel: newWheel });
  } catch (error: any) {
    LoggerService.log.error(`Error saving wheel for user ${req.params.userId}: ${error.message}`);
    res.status(500).json({ message: "Error saving wheel", error: error.message });
  }
};

export default {
  getUser,
  postUser,
  postUserCancel,
  getUserWheels,
  saveUserWheel,
};
