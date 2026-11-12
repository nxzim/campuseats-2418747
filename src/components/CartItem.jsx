import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'


// One row in the cart. It shows data and reports clicks upward; it owns no state.
function CartItem({ line, onChangeQty, onRemove, onUpdateNote }) {
  const { item, qty, note ='' } = line
  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>

        {/* Week 5 Feature 7: Notes require a signed-in account */}
        {user ? (
          <textarea
            value={line.note ?? ''}
            onChange={(e) => onUpdateNote(item.id, e.target.value)}
            placeholder="Special instruction (eg: less ice, more spicy)"
            rows="2"
            style={{ width: '100%', marginTop: '0.25rem' }}
          />
        ) : (
          <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>
            <Link to="/login">Log in to add notes</Link>
          </p>
        )}
      </div>

      <div className="qty">
        <button type="button" onClick={() => onChangeQty(item.id, -1)}>−</button>
        <span>{qty}</span>
        <button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>
      </div>
      <p className="line-total">RM { (item.price * qty).toFixed(2)}</p>
      <button type="button" className="link danger" onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  )
}
 
export default CartItem