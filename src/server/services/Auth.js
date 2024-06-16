import bcrypt from 'bcryptjs'
import { ACCESS_TOKEN_EXPIRATION } from '../constants.js'
import AppDataRepository from '../repositories/AppData.js'
import RefreshSessionRepository from '../repositories/RefreshSessions.js'
import UserRepository from '../repositories/User.js'
import { Conflict, Forbidden, NotFound, Unauthorized } from '../utils/Errors.js'
import TokenService from './Token.js'

class AuthService {
  static async signUp({ userName, password, token, fingerprint }) {
    const userData = await UserRepository.getUserData(userName)

    if (userData) {
      throw new Conflict("Користувач з таким ім'ям вже існує")
    }

    const hashedPassword = bcrypt.hashSync(password, 8)

    const { id } = await UserRepository.createUser({
      userName,
      hashedPassword,
      token,
    })

    const payload = { id, userName }

    const accessToken = await TokenService.generateAccessToken(payload)
    const refreshToken = await TokenService.generateRefreshToken(payload)

    await RefreshSessionRepository.createRefreshSession({
      id,
      refreshToken,
      fingerprint,
    })

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    }
  }
  static async handleAppData(data) {
    await AppDataRepository.addAppData(data)
  }


  static async signIn({ userName, password, fingerprint }) {
    const userData = await UserRepository.getUserData(userName)

    if (!userData) {
      throw new NotFound('Користувача не існує')
    }

    const isPasswordValid = bcrypt.compareSync(password, userData.password)

    if (!isPasswordValid) {
      throw new Unauthorized('Не правильний логін чи пароль')
    }

    const payload = { id: userData.id, userName }

    const accessToken = await TokenService.generateAccessToken(payload)
    const refreshToken = await TokenService.generateRefreshToken(payload)

    await RefreshSessionRepository.createRefreshSession({
      id: userData.id,
      refreshToken,
      fingerprint,
    })

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    }
  }

  static async logOut(refreshToken) {
    await RefreshSessionRepository.deleteRefreshSession(refreshToken)
  }

  static async refresh({ fingerprint, currentRefreshToken }) {
    if (!currentRefreshToken) {
      throw new Unauthorized()
    }

    const refreshSession = await RefreshSessionRepository.getRefreshSession(
      currentRefreshToken
    )

    if (!refreshSession) {
      throw new Unauthorized()
    }

    if (refreshSession.finger_print !== fingerprint.hash) {
      console.log('Попытка несанкционированного обновления токенов')
      throw new Forbidden()
    }

    await RefreshSessionRepository.deleteRefreshSession(currentRefreshToken)

    let payload
    try {
      payload = await TokenService.verifyRefreshToken(currentRefreshToken)
    } catch (error) {
      throw new Forbidden(error)
    }

    const { id, name: userName } = await UserRepository.getUserData(
      payload.userName
    )

    const actualPayload = { id, userName }

    const accessToken = await TokenService.generateAccessToken(actualPayload)
    const refreshToken = await TokenService.generateRefreshToken(actualPayload)

    await RefreshSessionRepository.createRefreshSession({
      id,
      refreshToken,
      fingerprint,
    })

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    }
  }
}

export default AuthService
