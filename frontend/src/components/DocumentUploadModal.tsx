import DocumentUploader from './FileUpload';
import CommonModal from './CommonModal';

const DocumentUploadModal = ({ open,uploadedFiles,setUploadedFiles,title,onClose,uploadFiles }:any) => {
  if (!open) return null;

  return (
   <CommonModal open={open} title={title} onClose={onClose}>
       <DocumentUploader uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} uploadFiles={uploadFiles}/>
    </CommonModal>
  );
};

export default DocumentUploadModal;
;
