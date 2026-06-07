import React from 'react'

interface ModalProps {
  open: boolean
  title?: string
  onClose: () => void
  children?: React.ReactNode
}

const Modal = ({ open, title, onClose, children }: ModalProps) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-200 opacity-0 animate-fadeIn"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative bg-[var(--color-bg2)] border border-purple-900/30 rounded-2xl p-6 w-full max-w-2xl z-10 transform transition-all duration-200 scale-95 opacity-0 animate-popIn">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">{title}</h3>
          <button onClick={onClose} className="px-2 py-1 text-sm" aria-label="Close">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal

