import { useEffect } from "react";

function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, removeToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`flex items-center gap-3 border px-4 py-3 text-sm shadow-lg ${
        isSuccess
          ? "border-green-700 bg-black text-green-400"
          : "border-red-700 bg-black text-red-400"
      }`}
      style={{ minWidth: "240px", maxWidth: "340px" }}
    >
      <span className="shrink-0 text-base">
        {isSuccess ? "✓" : "✕"}
      </span>
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 text-gray-500 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
