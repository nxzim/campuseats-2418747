import { Link } from 'react-router'
import { useMyOrders } from '../hooks/useMyOrders.js'
import OrderStatus from '../components/OrderStatus.jsx'
import OrderActions from '../components/OrderActions.jsx'

function OrdersPage() {
  const { orders, loading, error } = useMyOrders()
  if (loading) return <p>Loading...</p>
  if (error) return <p className="field-error" role="alert">{error}</p>

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
      <h2 className="section-title">My orders</h2>
      <p className="muted">Status updates appear here live.</p>
      <ul className="order-list" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {orders.map((order) => (
          <li key={order.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e7eb', paddingBottom: '0.5rem' }}>
              <div>
                <p className="cart-name">{order.vendorName} · pickup {order.pickupTime}</p>
                <p className="muted">
                  Placed {order.createdAt ? order.createdAt.toDate().toLocaleString('en-MY') : 'just now'}
                </p>
              </div>
              <p className="price">RM {Number(order.total).toFixed(2)}</p>
            </div>

            <ul style={{ listStyle: 'none', padding: '0.75rem 0', margin: 0 }}>
              {order.items?.map((i) => (
                <li key={i.itemId} style={{ padding: '0.25rem 0' }}>
                  <span>{i.qty}x {i.name}</span>
                  {/* Feature 7: Showing note on orders page */}
                  {i.note && (
                    <p style={{ margin: '0.2rem 0 0 1rem', fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
                      Note: "{i.note}"
                    </p>
                  )}
                </li>
              ))}
            </ul>

            <OrderStatus status={order.status} />
            {order.status === 'Received' && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
    </section>
  )
}
export default OrdersPage