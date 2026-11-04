import { useEffect, useState } from 'react'

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchVendors() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/vendors.json', { signal: controller.signal })
        if (!res.ok) throw new Error(`Failed to fetch vendors (${res.status})`)
        const data = await res.json()
        if (!Array.isArray(data)) throw new Error('Invalid vendors list')
        setVendors(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
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

  function reload() {
    setReloadKey((k) => k + 1)
  }

  return { vendors, loading, error, reload }
}