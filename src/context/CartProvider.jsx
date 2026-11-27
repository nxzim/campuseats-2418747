import { useMemo } from 'react'
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useAuth } from '../hooks/useAuth.js'

function InnerCartProvider({ storageSuffix, children }) {
  const [cart, setCart] = useLocalStorage(`ce-cart-${storageSuffix}`, [])

  function addToCart(item) {
    setCart((prev) => {
      const found = prev.find((line) => line.item.id === item.id)
      if (found) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1, note: '' }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function updateNote(itemId, note) {
    setCart((prev) =>
      prev.map((line) =>
        line.item.id === itemId ? { ...line, note } : line
      )
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function clearCart() {
    setCart([])
  }

  const count = useMemo(
    () => cart.reduce((sum, line) => sum + line.qty, 0),
    [cart]
  )
  const total = useMemo(
    () => cart.reduce((sum, line) => sum + line.item.price * line.qty, 0),
    [cart]
  )

  const value = {
    cart,
    count,
    total,
    addToCart,
    changeQty,
    updateNote,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const storageSuffix = user ? user.uid : 'guest'

  return (
    <InnerCartProvider key={storageSuffix} storageSuffix={storageSuffix}>
      {children}
    </InnerCartProvider>
  )
}