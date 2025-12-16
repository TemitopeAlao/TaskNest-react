import "../css/toast.css"; // reuse your modal styles if needed
import { useEffect } from "react";

function Modal({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="success-modal">
      <div className="modal-box">
        <ion-icon name="checkmark-circle"></ion-icon>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Modal;
