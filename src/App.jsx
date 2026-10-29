import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import Loading from './components/Loading.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
 
function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchVendors() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch vendors (${response.status})`)
        }

        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('The vendors response is not a valid list.')
        }

        setVendors(data)
        setSelectedVendorId(data[0]?.id ?? null)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchVendors()
    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
  
  function handleAddToCart(item) {
    setCart((prevCart) => [...prevCart, item])   // a NEW array, never cart.push()
  }

  return (
    <>
      <Header cartCount={cart.length} />
      <main className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage
            message={error}
            onRetry={() => setReloadKey((key) => key + 1)}
          />
        ) : vendors.length === 0 ? (
          <p className="muted">No vendors are available right now.</p>
        ) : (
          <>
            <section>
              <h2 className="section-title">Choose a vendor</h2>
              <div className="vendor-grid">
                {vendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    isSelected={vendor.id === selectedVendorId}
                    onSelect={setSelectedVendorId}
                  />
                ))}
              </div>
            </section>
            {selectedVendor && (
              <section>
                <h2 className="section-title">Menu: {selectedVendor.name}</h2>
                <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
 
export default App