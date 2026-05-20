import jwt from "jsonwebtoken";
import { createError } from "./errors.js";

// ✅ VERIFY TOKEN
export const tokenVerify = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "You are not authenticated..."));
  }

  jwt.verify(
    token,
    process.env.JWT_KEY || "secretkey",
    (err, user) => {
      if (err) {
        return next(createError(403, "Token invalid..."));
      }

      req.user = user;
      next();
    }
  );
};

// ✅ CHECK USER
export const checkUser = (req, res, next) => {
  tokenVerify(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Not authorized..."));
    }
  });
};

// ✅ CHECK ADMIN
export const checkAdmin = (req, res, next) => {
  tokenVerify(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Not authorized..."));
    }
  });
};