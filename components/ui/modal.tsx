import { ReactNode } from "react";
import { Button } from "./button";
import styles from './modal.module.css'; // Assuming you have a CSS module for styles

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <div>{children}</div>
        <Button variant="default" onClick={onClose} className={styles.closeButton}>
        Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
