import { Portal } from '@radix-ui/react-portal';

interface LoadingOverlayProps {
  open: boolean;
}

const LoadingOverlay = ({ open }:any) => {
  if (!open) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div
          className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
          style={{ borderTopColor: '#3e662b' }}
        >

        </div>
      </div>
    </Portal>
  );
};

export default LoadingOverlay;
