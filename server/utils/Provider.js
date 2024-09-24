const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const User = require('../models/User');

exports.connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        let user = await User.findOne({
          googleId: profile.id,
        });

        const userWithEmailExists = await User.findOne({
          email: profile.email,
        })

        //No user with this googleId id
        if (!user && !userWithEmailExists) {
          const newUser = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.email
          });

          return done(null, newUser);
        }

        if(!user && userWithEmailExists){

          user = await User.findOneAndUpdate(
            { email: profile.email },
            { $set: { googleId: profile.id } },
            { new: true }
          );
        }

        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};