import { Dialog } from "@headlessui/react";
import React ,{ ReactNode, useState } from "react";

interface ModalProps {
  onConfirm?: () => void;
  children?: ReactNode;
  button: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onConfirm, children, button }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div onClick={open}>{button}</div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50" 
        onClose={close}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-md bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-medium">
              Confirmation
            </Dialog.Title>
            <div className="mt-4">{children}</div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={close}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => {
                  if (onConfirm) {
                    onConfirm();
                  }
                  close();
                }}
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
