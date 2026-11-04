import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (!orders || orders.length === 0) {
    return (
      <div className="card">
        <h2>My Orders</h2>
        <p className="muted">No orders placed yet.</p>
        <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Browse Menus
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {orders.map((order) => (
          <article key={order.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e7eb', paddingBottom: '0.5rem' }}>
              <div>
                <h3>Order for {order.name}</h3>
                <p className="muted">Pickup at {order.mahallah} &middot; {order.pickupTime}</p>
              </div>
              <p style={{ fontWeight: 700, fontSize: '1.2rem', color: '#006644' }}>
                RM {Number(order.total).toFixed(2)}
              </p>
            </div>

            <ul style={{ listStyle: 'none', padding: '0.75rem 0 0', margin: 0 }}>
              {order.items?.map((line) => (
                <li key={line.item.id} style={{ padding: '0.35rem 0' }}>
                  <span>{line.qty}x {line.item.name}</span>
                  {/* Feature 7: Showing note on orders page */}
                  {line.note && (
                    <p style={{ margin: '0.2rem 0 0 1rem', fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
                      Note: "{line.note}"
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default OrdersPage