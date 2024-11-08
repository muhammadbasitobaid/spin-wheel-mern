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
import Wheel from "@models/wheel.model"; // Assuming Wheel model is defined

export const getUser = (req: Request, res: Response): void => {
  const user = req.user as UserDocument;
  res.status(200).send({ message: "User info successfully retrieved", user });
};

export const postUser = async (req: Request, res: Response): Promise<void> => {
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

export const postUserCancel = async (
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

export const getUserWheels = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("wheels").exec();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user.wheels);
  } catch (error: any) {
    LoggerService.log.error(error);
    res
      .status(500)
      .json({ message: "Error fetching wheels", error: error.message });
  }
};

export const saveUserWheel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const wheelData = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const newWheel = new Wheel(wheelData);
    user.wheels.push(newWheel._id); // Push only the wheel ID to the user's wheels array
    await newWheel.save();
    await user.save();
    res
      .status(200)
      .json({ message: "Wheel saved successfully", wheel: newWheel });
  } catch (error: any) {
    LoggerService.log.error(error);
    res
      .status(500)
      .json({ message: "Error saving wheel", error: error.message });
  }
};

export default {
  getUser,
  postUser,
  postUserCancel,
  getUserWheels,
  saveUserWheel,
};
