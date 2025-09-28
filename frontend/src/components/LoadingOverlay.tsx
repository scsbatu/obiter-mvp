import { Portal } from "@radix-ui/react-portal";
import CommonModal from "./CommonModal";

interface LoadingOverlayProps {
  open: boolean;
}

const LoadingOverlay = ({ open }: any) => {
  if (!open) return null;

  return (
    <CommonModal open={open}>
      <div
        className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
        style={{ borderTopColor: "#3e662b" }}
      />
    </CommonModal>
  );
};

export default LoadingOverlay;
