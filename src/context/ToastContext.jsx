import React, { createContext, useContext, useState } from "react"
// import { ToastContainer } from "../Components/Toast/Toast"
import ToastContainer from "../Components/Toast/Toast"
const ToastContext = createContext()

export const useToasts = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToasts must be used within a ToastProvider")
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}