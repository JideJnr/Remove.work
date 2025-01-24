import { Dialog } from "@headlessui/react";
import { ReactNode, useState } from "react";

interface ConfirmationModalProps {
  modalText: string;
  text2?: string;
  onConfirm: () => Promise<void> | void; // Ensure the onConfirm is a function
  children: ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  modalText,
  onConfirm,
  children,
  text2,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // For handling async loading

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleConfirm = async () => {
    setLoading(true); // Start loading before the async action
    try {
      await onConfirm(); // Wait for the confirmation action to complete
    } catch (error) {
      console.error("Error during confirmation:", error); // Handle errors
    } finally {
      setLoading(false); // Stop loading
      close(); // Close the modal after the action completes
    }
  };

  return (
    <>
      <div onClick={open}>{children}</div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm bg-black/30">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-md flex flex-col gap-4 bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="ti-modal-header">
                <h6 className="modal-title text-[1rem] font-semibold">
                  Confirmation
                </h6>
              </div>
              <div className="ti-modal-body flex flex-1 flex-grow">
                <p>{modalText}</p>
              </div>
              {text2 && (
                <div className="ti-modal-body flex flex-1 flex-grow">
                  <p>{text2}</p>
                </div>
              )}
              <div className="ti-modal-footer flex gap-4 w-full mt-auto">
                <div className="flex gap-4 w-fit mx-auto">
                  <button
                    type="button"
                    className="ti-btn ti-btn-secondary-full ml-auto"
                    onClick={close}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ti-btn ti-btn-primary-full"
                    onClick={handleConfirm}
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Processing..." : "Confirm"}
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
