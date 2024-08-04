import { ReactNode, useState } from "react";
import { Button } from "./button";
import styles from './modal.module.css'; // Assuming you have a CSS module for styles

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: (message: string) => void; // Make onSend optional
  title: string;
  showInput?: boolean; // Add a prop to conditionally show the input field
  children?: ReactNode;
}

const Modal = ({ isOpen, onClose, onSend, title, showInput = false, children }: ModalProps) => {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSend = () => {
    if (onSend) {
      onSend(message);
      setMessage(""); // Clear the input field after sending
    }
    onClose(); // Close the modal
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className="font-serif text-3xl">{title}</h3>
        {showInput ? (
          <>
            <p className="font-mono mb-2">Please type your message below.</p>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="font-mono p-2 border border-gray-300 rounded"
              placeholder="Type your message..."
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={onClose} className={"font-mono"}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleSend} className={"font-mono"}>
                Send
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="font-mono">{children}</div>
            <Button variant="default" onClick={onClose} className={"font-mono"}>
              Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
