import { useState } from 'react'
import { changePickupTime, cancelOrder } from '../services/orders.js'

function OrderActions({ order }) {
  const [pickupTime, setPickupTime] = useState(order.pickupTime)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSave(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await changePickupTime(order.id, pickupTime)
    } catch (err) {
      setError(`Could not update pickup time: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function handleCancel() {
    if (!window.confirm('Cancel this order?')) return
    setBusy(true)
    setError('')
    try {
      await cancelOrder(order.id)
    } catch (err) {
      setError(`Could not cancel the order: ${err.message}`)
      setBusy(false)
    }
  }

  return (
    <div className="order-actions">
      <form onSubmit={handleSave}>
        <label>
          Pickup time{' '}
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            disabled={busy}
          />
        </label>
        <button type="submit" className="btn-small" disabled={busy || pickupTime === order.pickupTime}>
          Update time
        </button>
      </form>
      <button type="button" className="btn-small" onClick={handleCancel} disabled={busy}>
        Cancel order
      </button>
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  )
}

export default OrderActions