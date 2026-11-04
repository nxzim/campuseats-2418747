import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import Loading from './components/Loading.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedVendorId, setSelectedVendorId] = useState(null)

  // B3 State
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [cart, setCart] = useState([])     // [{ item, qty }]
  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchVendors() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch vendors (${response.status})`)
        }

        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('The vendors response is not a valid list.')
        }

        setVendors(data)
        setSelectedVendorId(data[0]?.id ?? null)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchVendors()
    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  // Derive total badge count from quantities
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  // B3 Cart Actions
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((line) => line.item.id === item.id)
      if (existingIndex > -1) {
        return prevCart.map((line, index) =>
          index === existingIndex ? { ...line, qty: line.qty + 1 } : line
        )
      }
      //set default note
      return [...prevCart, { item, qty: 1 , note : ''}]
    })
  }
  
  function handleUpdateNote(itemId, nextNote) {
  setCart((prevCart) =>
    prevCart.map((line) =>
      line.item.id === itemId ? { ...line, note: nextNote } : line
      )
    )
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }
  
  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // Determine what to show in main
  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
        onUpdateNote={handleUpdateNote}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed!</h2>
        <p>Thank you, <strong>{lastOrder?.name}</strong>.</p>
        <p>Pickup at <strong>{lastOrder?.mahallah}</strong> at <strong>{lastOrder?.pickupTime}</strong>.</p>
        <p>Total: <strong>RM {lastOrder?.total.toFixed(2)}</strong></p>
        <button className="btn" onClick={() => setView('menu')}>Back to Menus</button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((key) => key + 1)}
      />
    )
  } else if (vendors.length === 0) {
    content = <p className="muted">No vendors are available right now.</p>
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App