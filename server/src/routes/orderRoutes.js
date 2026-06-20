import { Router } from 'express'
import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'

const router = Router()

const parseProducts = (products) => {
  if (Array.isArray(products)) return products
  if (typeof products === 'string') {
    return products
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const [productId = '', quantity = '1', price = '0'] = entry.split('|')
        return { productId: productId.trim(), quantity: Number(quantity), price: Number(price) }
      })
  }
  return []
}

const validateOrder = async (body) => {
  const user = await User.findById(body.userId)
  if (!user) return 'User not found'

  const products = parseProducts(body.products)
  if (!products.length) return 'Order must include at least one product'

  for (const item of products) {
    const product = await Product.findById(item.productId)
    if (!product) return `Product not found: ${item.productId}`
  }

  return null
}

router.post('/', async (request, response) => {
  try {
    const validationError = await validateOrder(request.body)
    if (validationError) return response.status(400).json({ message: validationError })

    const order = await Order.create({ ...request.body, products: parseProducts(request.body.products) })
    const populated = await order.populate(['userId', 'products.productId'])
    response.status(201).json(populated)
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
})

router.get('/', async (_request, response) => {
  const orders = await Order.find().populate('userId').populate('products.productId').sort({ createdAt: -1 })
  response.json(orders)
})

router.get('/:id', async (request, response) => {
  const order = await Order.findById(request.params.id).populate('userId').populate('products.productId')
  if (!order) return response.status(404).json({ message: 'Order not found' })
  response.json(order)
})

router.put('/:id', async (request, response) => {
  try {
    const existing = await Order.findById(request.params.id)
    if (!existing) return response.status(404).json({ message: 'Order not found' })

    if (request.body.userId || request.body.products) {
      const validationError = await validateOrder({
        userId: request.body.userId || existing.userId,
        products: request.body.products || existing.products,
      })
      if (validationError) return response.status(400).json({ message: validationError })
    }

    const update = { ...request.body }
    if (request.body.products) update.products = parseProducts(request.body.products)

    const order = await Order.findByIdAndUpdate(request.params.id, update, { new: true, runValidators: true })
    response.json(await order.populate(['userId', 'products.productId']))
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (request, response) => {
  const order = await Order.findByIdAndDelete(request.params.id)
  if (!order) return response.status(404).json({ message: 'Order not found' })
  response.json({ message: 'Order deleted successfully' })
})

export default router