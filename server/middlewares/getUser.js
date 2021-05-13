import jwt from "jsonwebtoken";

import { SECRET_OR_KEY, SECRET_OR_KEY2 } from '../config/config.js';

const getUser = async (req, res, next) => {
  const token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;
  const authType = req.cookies.authType;

  if(!token || !refreshToken || !authType){
    next();
    return;
  }

  try {

    // Decode token...
    let tokenData = jwt.decode(token);
    req.userId = tokenData.id;   
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
  next();
};

export default getUser;