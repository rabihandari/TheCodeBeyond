import jwt from "jsonwebtoken";

import { SECRET_OR_KEY } from '../config/config.js';

const getUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, SECRET_OR_KEY);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub + 'abc';
    }    

    next();
  } catch (error) {
      next();
  }
};

export default getUser;