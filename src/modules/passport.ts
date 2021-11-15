import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { UserModel, IUserSchema } from "../models";
import bcrypt from "./bcrypt";

declare global {
  namespace Express {
    export interface User extends IUserSchema {}
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const foundUser = await UserModel.findOne({ email });

      console.log(foundUser);

      if (!foundUser)
        return done(null, false, {
          message: "Email or password is incorrect!",
        });

      const isSamePassword = bcrypt.comparePassword(
        password,
        foundUser.password
      );

      if (!isSamePassword)
        return done(null, false, {
          message: "Email or password is incorrect!",
        });

      return done(null, foundUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const foundUser = await UserModel.findById(_id);
    done(null, foundUser);
  } catch (err) {
    done(err);
  }
});

export default passport;
