import jwt from "jsonwebtoken";

import { SECRET_OR_KEY, SECRET_OR_KEY2} from '../config/config.js';

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;
  const authType = req.cookies.authType;

  try {
  
    // Check if tokens are set...
    if (!token || !refreshToken) return res.status(405).json({ message: 'Tokens not set' });

    // Check for normal token
    let tokenData = jwt.verify(token, SECRET_OR_KEY);
    req.userId = tokenData.id;   
    
  } catch (error) {

    try {

       // Check for refresh token
      jwt.verify(refreshToken, SECRET_OR_KEY2);

      // Refresh the tokens
      let decodedData = jwt.decode(token);
      const [newToken, newRefreshToken] = await createTokens(token, refreshToken, decodedData.id);

      // Set headers
      res.cookie('token', newToken, { httpOnly: true, secure: true, expires: new Date(2147483647000) });
      res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, expires: new Date(2147483647000) });
      res.cookie('authType', authType, { expires: new Date(2147483647000) });
      req.userId = decodedData.id;

    } catch (error) {
      console.log(error.message);
      return res.status(403).json({ message: 'Unauthorized' });
    }
  }
  
  next();
};

export default auth;


export const createTokens = async (token, refreshToken, id) => {


  const createToken = jwt.sign(
    { id: id },
    SECRET_OR_KEY,
    {
      expiresIn: '1m',
    },
  );

  const createRefreshToken = jwt.sign(
    {},
    SECRET_OR_KEY2,
    {
      expiresIn: '1y',
    },
  );

  return Promise.all([createToken, createRefreshToken]);
};


