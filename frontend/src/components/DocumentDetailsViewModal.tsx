import CommonModal from "./CommonModal";

const DocumentDetailsViewModal = ({ open, onClose, documentDetails }: any) => {
  if (!open) return null;

  return (
    <CommonModal
      open={open}
      title={`${documentDetails?.title}`}
      onClose={onClose}
    >
      <div className="p-1 rounded-md">
        <p className="text-sm text-white">{documentDetails?.summary}</p>
      </div>
    </CommonModal>
  );
};

export default DocumentDetailsViewModal;
