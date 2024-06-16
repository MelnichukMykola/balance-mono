import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import Fingerprint from 'express-fingerprint'
import ViteExpress from 'vite-express'
import AppDataRepository from './repositories/AppData.js'
import UserRepository from './repositories/User.js'
import AuthRootRouter from './routers/Auth.js'
import ClientRootRouter from './routers/Client.js'

dotenv.config()

const PORT = process.env.VITE_PORT || 3000
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({ credentials: true, origin: process.env.VITE_CLIENT_URL }));

app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
)

app.use('/auth', AuthRootRouter)
app.use('/resource', ClientRootRouter)

app.get('/hello', (req, res) => {
  res.send('Hello Vite + React!')
})

app.get('/resource/protected', async (req, res) => {
  const userName = req.query.userName
  const token = await UserRepository.getUserToken(userName)
  return res.status(200).json(token)
})

app.get('/resource/protected_app-data', async (req, res) => {
  const userName = req.query.userName
  const appData = await AppDataRepository.getAppData(userName)
  return res.status(200).json(appData)
})

ViteExpress.listen(app, PORT, () =>
  console.log('Server is listening on port 3000...')
)
