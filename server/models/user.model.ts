import { model, Schema, Document } from "mongoose";
import { omit } from "ramda";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";

export interface UserDocument extends Document {
  id?: typeof Schema.Types.ObjectId;
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  thumbnail?: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  isVerified: boolean;
  isAdmin: boolean;
  wheels: Schema.Types.ObjectId[];

  comparePassword(password: string): boolean;
  hidePassword(): void;
  hashPassword(): Promise<string>;
}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows for multiple null values
  },
  thumbnail: {
    type: String,
  },
  passwordResetToken: { type: String, default: "" },
  passwordResetExpires: { type: Date, default: dayjs().toDate() },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  wheels: [{ type: Schema.Types.ObjectId, ref: "Wheel" }],
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        reject(err1);
        return;
      }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) {
          reject(err2);
          return;
        }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

userSchema.methods.hidePassword = function () {
  return omit(["password", "__v", "_id"], this.toObject({ virtuals: true }));
};

export const User = model<UserDocument>("User", userSchema);

export default User;
