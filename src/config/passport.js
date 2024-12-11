const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username', 
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) return done(null, false, { message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta' });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serializar usuario en sesión
passport.serializeUser((user, done) => done(null, user.id));

// Deserializar usuario de sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
