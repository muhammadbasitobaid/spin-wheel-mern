import passport from "passport";
import { UserDocument, User } from "@models/user.model";
import Local from "passport-local";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Error } from "mongoose";

// Define user object type for serialization
interface SerializedUser {
  id: string;
}

export function initPassportJS() {
  // Local Strategy
  passport.use(
    new Local.Strategy(
      (
        username: string,
        password: string,
        done: (error: any, user?: any, options?: { message: string }) => void
      ) => {
        User.findOne({ username }, (err: Error, user: UserDocument) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(undefined, false, {
              message: `Username ${username} not found`,
            });
          }
          if (!user.comparePassword(password)) {
            return done(undefined, false, {
              message: "Incorrect username or password",
            });
          }
          return done(undefined, user);
        });
      }
    )
  );

  // Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.PUBLIC_API_URL}/api/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any, options?: { message: string }) => void
    ) => {
      try {
        // Check if a user exists with the given Google ID
        let existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Check if a user exists with the given email
        const email = profile?.emails?.[0]?.value || "";
        existingUser = await User.findOne({ email });

        if (existingUser) {
          // Update the existing user with the Google ID if it doesn't already have one
          if (!existingUser.googleId) {
            existingUser.googleId = profile.id;
            await existingUser.save();
          }
          return done(null, existingUser);
        }

        // Create a new user if none exists
        const newUser = new User({
          googleId: profile.id,
          username: profile.displayName,
          email,
          thumbnail: "",
          isVerified: true, // Google verified the email
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        console.log("Error during Google authentication:", err);
        done(undefined, false, { message: "Google login failed" });
      }
    }
  )
);

  // Serialize user to session
  passport.serializeUser<SerializedUser>(
    (user: any, done: (err: any, id?: SerializedUser) => void) => {
      done(null, { id: user.id });
    }
  );

  // Deserialize user from session
  passport.deserializeUser(
    (
      id: SerializedUser,
      done: (err: any, user?: UserDocument | null) => void
    ) => {
      User.findById(id.id, (err: Error, user: UserDocument) => done(err, user));
    }
  );
}
