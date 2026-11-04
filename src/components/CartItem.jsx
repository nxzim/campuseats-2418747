// One row in the cart. It shows data and reports clicks upward; it owns no state.
function CartItem({ line, onChangeQty, onRemove, onUpdateNote }) {
  const { item, qty, note ='' } = line
  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
        
        {/*Controlled textarea for note */}
        <div style={{ marginTop: '0.4rem' }}>
          <textarea
            placeholder="Special instructions (e.g. no spicy, less ice)..."
            value={note}
            rows={2}
            style={{
              width: '100%',
              fontSize: '0.85rem',
              padding: '0.35rem',
              borderRadius: '6px',
              border: '1px solid #c5cbd3',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            onChange={(e) => onUpdateNote(item.id, e.target.value)}
          />
        </div>
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