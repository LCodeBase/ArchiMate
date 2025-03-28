import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import calculationsRoutes from './routes/calculations'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas
app.use('/api/calculate', calculationsRoutes)

// Rota principal
app.get('/', (req, res) => {
  res.json({ message: 'API da Calculadora de Materiais para Construção' })
})

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
