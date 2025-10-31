const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

// REGISTER USER
exports.register = async function (req, res) {
  try {
    const { name, email, age, password, role } = req.body;
    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, age, password: hashedPassword, role });

    // ✅ إنشاء التوكن بعد التسجيل
    const token = jwt.sign(
      { email: newUser.email, id: newUser.id, role: newUser.role },
      'secretKey',
      { expiresIn: '1h' }
    );

    // ✅ إرسال التوكن في الرد
    return res.json({
      message: 'User Registered Successfully',
      user: {
        email: newUser.email,
        name: newUser.name,
        jwt: token,
      },
    });
  } catch (err) {
    console.log('register error:', err);
    res.status(400).send({ message: err.message });
  }
};

// LOGIN USER
exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).send({ message: 'Invalid Email or Password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: 'Invalid Email or Password' });

    const token = jwt.sign(
      { email: user.email, id: user.id, role: user.role },
      'secretKey',
      { expiresIn: '1h' }
    );

    return res.json({
      message: 'User Logged Successfully',
      user: { email: user.email, name: user.name, jwt: token },
    user: {jwt: token},
    });
  } catch (err) {
    console.log('login error:', err);
    res.status(400).send({ message: err.message});
}
};