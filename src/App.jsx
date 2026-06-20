/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from 'react'
import './App.css'

const apiBase = import.meta.env.VITE_API_BASE_URL || '/api'

const resourceMeta = {
    users: {
        title: 'Users',
        color: 'linear-gradient(135deg, #1f3c88, #4e54c8)',
        fields: ['name', 'email', 'phone', 'address'],
        empty: { name: '', email: '', phone: '', address: '' },
    },
    products: {
        title: 'Products',
        color: 'linear-gradient(135deg, #0f766e, #14b8a6)',
        fields: ['name', 'description', 'price', 'quantity', 'category'],
        empty: { name: '', description: '', price: '', quantity: '', category: '' },
    },
    orders: {
        title: 'Orders',
        color: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        fields: ['userId', 'products', 'totalAmount', 'status'],
        empty: { userId: '', products: '', totalAmount: '', status: 'pending' },
    },
}

const pretty = (value) => {
    if (value === null || value === undefined) return '—'
    if (typeof value === 'string') return value
    return JSON.stringify(value, null, 2)
}

function App() {
    const [resource, setResource] = useState('users')
    const [items, setItems] = useState([])
    const [form, setForm] = useState(resourceMeta.users.empty)
    const [selectedId, setSelectedId] = useState('')
    const [status, setStatus] = useState('Connecting to API...')
    const [loading, setLoading] = useState(false)

    const active = resourceMeta[resource]

useEffect(() => {
    // Reset form when resource changes - this is safe for initialization
    const empty = resourceMeta[resource].empty
    setForm(empty)
    setSelectedId('')
  }, [resource]) // Dependency on resource is intentional
const loadItems = async (nextResource = resource) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiBase}/${nextResource}`)
      const data = await response.json()
      setItems(Array.isArray(data) ? data : [])
      setStatus(response.ok ? `Loaded ${nextResource}` : data?.message || 'Request failed')
    } catch {
      setStatus('API unavailable. Start the server and MongoDB.')
      setItems([])
    } finally {
      setLoading(false)
    }
  }

    useEffect(() => {
    // Fetch on resource change
    const fetchData = async () => {
      await loadItems(resource)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource])
    const totals = useMemo(
        () => ({
            users: items.length,
            products: items.length,
            orders: items.length,
        }),
        [items],
    )

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((current) => ({ ...current, [name]: value }))
    }

    const submit = async (event) => {
        event.preventDefault()
        const payload = { ...form }

        if (resource === 'products') {
            payload.price = Number(payload.price)
            payload.quantity = Number(payload.quantity)
        }

        if (resource === 'orders') {
            payload.totalAmount = Number(payload.totalAmount)
            payload.products = payload.products
                .split(',')
                .map((entry) => entry.trim())
                .filter(Boolean)
                .map((entry) => {
                    const [productId = '', quantity = '1', price = '0'] = entry.split('|')
                    return { productId: productId.trim(), quantity: Number(quantity), price: Number(price) }
                })
        }

        const method = selectedId ? 'PUT' : 'POST'
        const path = selectedId ? `${apiBase}/${resource}/${selectedId}` : `${apiBase}/${resource}`

        try {
            const response = await fetch(path, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            const data = await response.json()
            setStatus(data?.message || `${method} ${resource} complete`)
            if (response.ok) {
                setForm(resourceMeta[resource].empty)
                setSelectedId('')
                loadItems()
            }
        } catch {
            setStatus('Could not reach the API')
        }
    }

    const remove = async (id) => {
        try {
            await fetch(`${apiBase}/${resource}/${id}`, { method: 'DELETE' })
            setStatus(`${resourceMeta[resource].title} deleted`)
            loadItems()
        } catch {
            setStatus('Delete failed')
        }
    }

    return (
        <main className="app-shell">
            <section className="hero">
                <div className="hero-copy">
                    <p className="eyebrow">MERN CRUD dashboard</p>
                    <h1>Manage users, products, and orders from one clean interface.</h1>
                    <p className="subcopy">
                        The backend uses Express, Mongoose, and MongoDB at {apiBase}. Create, edit, and delete
                        records with live API calls.
                    </p>
                    <div className="hero-badges">
                        <span>{status}</span>
                        <span>{totals[resource]} loaded</span>
                    </div>
                </div>
                <div className="hero-card" style={{ background: active.color }}>
                    <span>{active.title}</span>
                    <strong>{loading ? 'Refreshing...' : `${items.length} records`}</strong>
                    <small>Connected to the API layer</small>
                </div>
            </section>

            <section className="resource-switcher">
                {Object.entries(resourceMeta).map(([key, meta]) => (
                    <button
                        key={key}
                        className={key === resource ? 'switch active' : 'switch'}
                        onClick={() => setResource(key)}
                        type="button"
                    >
                        {meta.title}
                    </button>
                ))}
            </section>

            <section className="layout-grid">
                <form className="panel form-panel" onSubmit={submit}>
                    <div className="panel-head">
                        <h2>{selectedId ? `Update ${active.title.slice(0, -1)}` : `Create ${active.title.slice(0, -1)}`}</h2>
                        <button
                            type="button"
                            className="ghost"
                            onClick={() => {
                                setForm(active.empty)
                                setSelectedId('')
                            }}
                        >
                            Reset
                        </button>
                    </div>
                    {active.fields.map((field) => (
                        <label key={field}>
                            <span>{field}</span>
                            {field === 'products' ? (
                                <textarea
                                    name={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                    placeholder="productId|quantity|price, productId|quantity|price"
                                    rows="4"
                                />
                            ) : (
                                <input
                                    name={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                    placeholder={field}
                                />
                            )}
                        </label>
                    ))}
                    <button className="primary" type="submit">
                        {selectedId ? 'Update record' : 'Create record'}
                    </button>
                </form>

                <div className="panel list-panel">
                    <div className="panel-head">
                        <h2>{active.title} records</h2>
                        <button type="button" className="ghost" onClick={() => loadItems()}>
                            Refresh
                        </button>
                    </div>
                    <div className="cards">
                        {items.map((item) => (
                            <article key={item._id} className="record-card">
                                <div className="record-top">
                                    <strong>{item.name || item.status || item._id}</strong>
                                    <span>{item._id}</span>
                                </div>
                                <pre>{pretty(item)}</pre>
                                <div className="record-actions">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedId(item._id)
                                            setForm({ ...active.empty, ...item })
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button type="button" className="danger" onClick={() => remove(item._id)}>
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                        {!items.length && <p className="empty">No records yet. Create one to test the API.</p>}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default App