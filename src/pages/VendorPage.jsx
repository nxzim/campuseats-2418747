import { useParams, Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor not found</h2>
        <p className="muted">We couldn't find a vendor with ID: {id}</p>
        <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Back to vendors
        </Link>
      </div>
    )
  }

  return (
    <section>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="link" style={{ color: 'var(--primary, #006644)' }}>
          &larr; All vendors
        </Link>
        <h2 className="section-title" style={{ marginTop: '0.5rem' }}>{vendor.name}</h2>
        <p className="muted">{vendor.location} &middot; Open: {vendor.openHours}</p>
      </div>
      <MenuList items={vendor.menu} />
    </section>
  )
}

export default VendorPage