import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>404 - Page Not Found</h2>
      <p className="muted">The address you are looking for does not exist.</p>
      <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Return to Home
      </Link>
    </div>
  )
}

export default NotFoundPage