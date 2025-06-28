






import dotenv from 'dotenv';
dotenv.config();

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({
      message: 'Admin logged in successfully',
      user: { email, role: 'admin' },
    });
  }

  return res.status(401).json({ message: 'Invalid admin credentials' });
};
