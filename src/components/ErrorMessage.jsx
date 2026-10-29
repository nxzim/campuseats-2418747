function ErrorMessage({ message, onRetry }) {
  return (
    <div className="card error" role="alert">
      <p>{message}</p>
      <button className="btn" type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}

export default ErrorMessage
