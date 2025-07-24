import React, { useEffect } from "react"
import "./Toast.css"

const ToastContainer = ({ toasts, removeToast }) => {
  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), 3000)
    )
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [toasts, removeToast])

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export default ToastContainer