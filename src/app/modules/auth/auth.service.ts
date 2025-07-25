import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createNewAccessTokenWithRefreshToken, createUserToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

const credentialsLogin = async (payload: Partial<IUser>) => {
  if (!payload || !payload.email || !payload.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email and password are required.");
  }
  const { email, password } = payload;
  // console.log(email);

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does not exist");
  }

  const isUserPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);

  if (!isUserPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "invalid password");
  }

  //CREATE A UTILS-USERTOKEN AND JUST CALL IT HERE
  const userToken = createUserToken(isUserExist);

  // DELETE PASSWORD FROM THE USER DATA AND RETURN IT TO THE CLIENT
  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

  return {
    accessToken: newAccessToken,
  };
};

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {
  const user = await User.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string);
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
  }
  console.log(user?.password);

  user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));

  user!.save();
};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
