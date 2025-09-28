import { Portal } from "@radix-ui/react-portal";
import { ReactNode } from "react";

interface CommonModalProps {
  open: boolean;
  title?: string;
  onClose?: () => void;
  children: ReactNode;
}

const CommonModal = ({ open, title, onClose, children }: CommonModalProps) => {
  if (!open) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
        <div className="w-full max-w-lg rounded-2xl bg-card_grey p-4 shadow-lg">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-primary font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default CommonModal;
