import { useLocalStorage } from '../hooks/UseLocalStorage.js'
import { CartContext } from './cart-context.js'
import { useAuth } from '../hooks/useAuth.js'

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function addToCart(item) {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((line) => line.item.id === item.id)
      if (idx > -1) {
        return prevCart.map((line, i) =>
          i === idx ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1, note: '' }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function updateNote(itemId, note) {
    setCart((prevCart) =>
      prevCart.map((line) =>
        line.item.id === itemId ? { ...line, note } : line
      )
    )
  }

  function removeFromCart(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function placeOrder(details) {
    const newOrder = {
      id: Date.now().toString(),
      ...details,
      items: cart, // saves cart lines with their notes (Feature 7)
      total,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setOrders((prev) => [newOrder, ...prev])
    setCart([])
  }

  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    updateNote,
    removeFromCart,
    placeOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function CartProvider({ children }) {
  const { user } = useAuth()
  const storageSuffix = user ? user.uid : 'guest'

  // Passing key={storageSuffix} resets state cleanly when switching accounts or logging out
  return (
    <InnerCartProvider key={storageSuffix} storageSuffix={storageSuffix}>
      {children}
    </InnerCartProvider>
  )
}