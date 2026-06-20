import dotenv from 'dotenv'
import app from './src/app.js'
import connectDb from './src/db.js'

dotenv.config()

const port = process.env.PORT || 5000

await connectDb()

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}/api`)
})