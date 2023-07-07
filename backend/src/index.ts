import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User";
import { DatabaseUserInterface } from "./Interfaces/UserInterface";
import createServer from "./config/server";

dotenv.config();

const app = createServer();

// Passport
const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          return done(null, false, { message: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            message:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        bcrypt.compare(password, user.password, (err, result: boolean) => {
          if (err) return done(err);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { message: "Invalid email or password." });
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.serializeUser((user: DatabaseUserInterface, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
