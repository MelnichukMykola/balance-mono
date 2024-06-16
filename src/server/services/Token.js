import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Forbidden, Unauthorized } from '../utils/Errors.js'

dotenv.config()

class TokenService {
  static async generateAccessToken(payload) {
    return await jwt.sign(payload, process.env.VITE_ACCESS_TOKEN_SECRET, {
      expiresIn: '30m'
    })
  }


  static async generateRefreshToken(payload) {
    return await jwt.sign(payload, process.env.VITE_REFRESH_TOKEN_SECRET, {
      expiresIn: '15d',
    })
  }

  static async checkAccess(req, _, next) {
    const authHeader = req.headers.authorization
    console.log('authHeader', authHeader)
    
    const token = authHeader?.split(' ')?.[1] 

    if(!token) {
      return next(new Unauthorized())
    }

    jwt.verify(token, process.env.VITE_ACCESS_TOKEN_SECRET, (error, user) => {
      console.log(error, user)

      if(error) {
        return next(new Forbidden(error))
      }

      req.user = user;
      next()
    })    
  }

  static async verifyAccessToken(accessToken) {
    return await jwt.verify(accessToken, process.env.VITE_ACCESS_TOKEN_SECRET)
  }

  static async verifyRefreshToken(refreshToken) {
    return await jwt.verify(refreshToken, process.env.VITE_REFRESH_TOKEN_SECRET)
  }
}

export default TokenService;






