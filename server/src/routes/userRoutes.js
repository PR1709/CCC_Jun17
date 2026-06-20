import { Router } from 'express'
import User from '../models/User.js'

const router = Router()

router.post('/', async (request, response) => {
  try {
    const user = await User.create(request.body)
    response.status(201).json(user)
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
})

router.get('/', async (_request, response) => {
  response.json(await User.find().sort({ createdAt: -1 }))
})

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (!user) return response.status(404).json({ message: 'User not found' })
  response.json(user)
})

router.put('/:id', async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
    if (!user) return response.status(404).json({ message: 'User not found' })
    response.json(user)
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id)
  if (!user) return response.status(404).json({ message: 'User not found' })
  response.json({ message: 'User deleted successfully' })
})

export default router