import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ message: 'Token missing!' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Unauthorized!' });
    req.userId = decoded.id;
    next();
  });
};

export default authenticate;
