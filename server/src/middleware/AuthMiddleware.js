const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
   }

   const token = authHeader.split(' ')[1];

   try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decode;
      next();
   } catch (e) {
      res.status(403).json('Forbidden');
   }
};

module.exports = authMiddleware;
