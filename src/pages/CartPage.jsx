import { useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { placeOrders } from '../services/orders.js'

function CartPage() {
  const navigate = useNavigate()
  const { cart, total, changeQty, removeFromCart, clearCart, updateNote } = useCart()
  const { user } = useAuth()
  const [error, setError] = useState('')

  async function handlePlaceOrder(details) {
    setError('')
    try {
      // TODO 4: await placeOrders(user, cart, details), then clearCart(), then navigate('/orders')
      await placeOrders(user, cart, details)
      clearCart()
      navigate('/orders')
    } catch (err) {
      setError(`Could not place the order: ${err.message}`)
    }
  }

  if (cart.length === 0) {
    return <p className="muted">Your cart is empty. Pick something from a menu first.</p>
  }
  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
              onUpdateNote={updateNote}
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
        {error && <p className="field-error" role="alert">{error}</p>}
      </div>
      <CheckoutForm defaultName={user?.displayName ?? ''} onPlaceOrder={handlePlaceOrder}/>
    </div>
  )
}

export default CartPage