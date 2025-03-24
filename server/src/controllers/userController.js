const prisma = require('../models/postModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
   const { name, email, password } = req.body;
   try {
      const existUser = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      if (existUser) {
         return res.status(400).json({
            message: 'User already exist',
         });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
         data: {
            name,
            email,
            password: hashPassword,
         },
      });

      res.status(201).json({
         message: 'User created!',
         user: {
            id: user.id,
            email: user.email,
         },
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const User = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      if (!User) {
         return res.status(500).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, User.password);

      if (!isPasswordValid) {
         return res.status(500).json({ message: 'Password not valid' });
      }

      const token = jwt.sign(
         {
            id: User.id,
            email: User.email,
         },
         process.env.SECRET_KEY,
         { expiresIn: '1h' }
      );

      res.status(200).json({
         message: 'User logged in',
         token,
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const getProtectedData = async (req, res) => {
   try {
      res.status(200).json({ message: 'Доступ дозволено', user: req.user });
   } catch (error) {
      res.status(500).json({ message: 'Помилка сервера', error: error.message });
   }
};

module.exports = { register, login, getProtectedData };
