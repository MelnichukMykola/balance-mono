import { COOKIE_SETTINGS } from '../constants.js'
import AuthService from '../services/Auth.js'
import ErrorsUtils from '../utils/Errors.js'

class AuthController {
  static async handleAppData(req, res) {
    const data = req.body
    try {
      await AuthService.handleAppData(data)
    } catch (err) {
      return ErrorsUtils.catchError(res, err)
    }
  }

  static async signIn(req, res) {
    const { userName, password } = req.body
    const { fingerprint } = req
    try {
      const { accessToken, refreshToken, accessTokenExpiration } =
        await AuthService.signIn({
          userName,
          password,
          fingerprint,
        })

      res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

      return res.status(200).json({
        accessToken,
        accessTokenExpiration,
      })
    } catch (err) {
      return ErrorsUtils.catchError(res, err)
    }
  }

  static async signUp(req, res) {
    const { userName, password, token } = req.body
    const { fingerprint } = req
    try {
      const { accessToken, refreshToken, accessTokenExpiration } =
        await AuthService.signUp({
          userName,
          password,
          token,
          fingerprint,
        })

      res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

      return res.status(200).json({
        accessToken,
        accessTokenExpiration,
      })
    } catch (err) {
      return ErrorsUtils.catchError(res, err)
    }
  }

  static async logOut(req, res) {
    const refreshToken = req.cookies.refreshToken
    try {
      await AuthService.logOut(refreshToken)

      res.clearCookie('refreshToken')
      return res.sendStatus(200)
    } catch (err) {
      return ErrorsUtils.catchError(res, err)
    }
  }

  static async refresh(req, res) {
    const { fingerprint } = req
    const currentRefreshToken = req.cookies.refreshToken
    try {
      const { accessToken, refreshToken, accessTokenExpiration } =
        await AuthService.refresh({
          currentRefreshToken,
          fingerprint,
        })

      res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

      return res.status(200).json({ accessToken, accessTokenExpiration })
    } catch (error) {
      return ErrorsUtils.catchError(res, error)
    }
  }
}

export default AuthController
