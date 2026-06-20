import { Router } from 'express'
import Product from '../models/Product.js'

const router = Router()

router.post('/', async (request, response) => {
  try {
    const product = await Product.create(request.body)
    response.status(201).json(product)
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
})

router.get('/', async (_request, response) => {
  response.json(await Product.find().sort({ createdAt: -1 }))
})

router.get('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id)
  if (!product) return response.status(404).json({ message: 'Product not found' })
  response.json(product)
})

router.put('/:id', async (request, response) => {
  try {
    const product = await Product.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
    if (!product) return response.status(404).json({ message: 'Product not found' })
    response.json(product)
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (request, response) => {
  const product = await Product.findByIdAndDelete(request.params.id)
  if (!product) return response.status(404).json({ message: 'Product not found' })
  response.json({ message: 'Product deleted successfully' })
})

export default router