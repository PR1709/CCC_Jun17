import mongoose from 'mongoose'

export default async function connectDb() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ccc_jun17'

  if (mongoose.connection.readyState === 1) return

  await mongoose.connect(uri)
  console.log('MongoDB connected')
}