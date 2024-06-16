import dotenv from 'dotenv'

dotenv.config()

export default {
  API_URL: process.env.VITE_CLIENT_URL_PROD,
  // API_URL: process.env.VITE_CLIENT_URL_DEV,
  LOGOUT_STORAGE_KEY: 'logout',
}
