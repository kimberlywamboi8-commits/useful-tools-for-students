// A reusable component for both Loading and Error states
export function Loading() {
  return (
    <div className="status-container">
      <div className="spinner"></div>
      <p className="vogue-text">Fetching global trends...</p>
    </div>
  );
}

export function Error({ message }) {
  return (
    <div className="status-container error-box">
      <span>⚠️</span>
      <p>{message || "Something went wrong. Please refresh."}</p>
    </div>
  );
}