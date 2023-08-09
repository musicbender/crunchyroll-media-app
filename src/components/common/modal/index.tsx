import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { ModalInner, ModalOverlay, ModalWrapper } from './styles';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (!el) {
        const portalEl = document.createElement('div');
        portalEl.className = 'modal-portal';
        portalEl.id = 'modal-portal';
        document.body.appendChild(portalEl);
        setEl(portalEl);
      }

      document.body.classList.add('modal-open');
    }

    return () => {
      if (!!portalRef.current) {
        document.body.removeChild(portalRef.current);
      }

      setEl(null);

      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  useEffect(() => {
    portalRef.current = el;
  }, [el]);

  if (el) {
    return createPortal(
      <ModalWrapper>
        <ModalOverlay show={isOpen} onClick={onClose} />
        <ModalInner show={isOpen}>{children}</ModalInner>
      </ModalWrapper>,
      el,
    );
  }

  return null;
};

export default Modal;
