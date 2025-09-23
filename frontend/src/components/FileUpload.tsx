// import { useState } from "react";

// interface FileUploadProps {
//   multiple?: boolean;
// }

// export default function FileUpload({ multiple = false }: FileUploadProps) {
//   const [files, setFiles] = useState<File[]>([]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setFiles(multiple ? Array.from(e.target.files) : [e.target.files[0]]);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 w-full max-w-md mx-auto">
//       <label
//         htmlFor="file-upload"
//         className="cursor-pointer flex flex-col items-center gap-2"
//       >
//         <svg
//           className="w-12 h-12 text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth={2}
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//           />
//         </svg>
//         <span className="text-gray-600">
//           {multiple
//             ? "Click to upload or drag & drop files"
//             : "Click to upload or drag & drop a file"}
//         </span>
//       </label>

//       <input
//         id="file-upload"
//         type="file"
//         multiple={multiple}
//         onChange={handleChange}
//         className="hidden"
//       />

//       {files.length > 0 && (
//         <ul className="mt-4 w-full text-sm text-gray-700">
//           {files.map((file, index) => (
//             <li
//               key={index}
//               className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded mb-2"
//             >
//               <span>{file.name}</span>
//               <span className="text-gray-500 text-xs">
//                 {(file.size / 1024).toFixed(1)} KB
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import { useState } from "react";

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 w-full max-w-xl mx-auto">
      {/* Upload Area */}
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center gap-2"
      >
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <span className="text-gray-600">
          Click to upload or drag & drop files
        </span>
      </label>

      <input
        id="file-upload"
        type="file"
        multiple
        onChange={handleChange}
        className="hidden"
      />

      {/* File Preview Row */}
      {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 w-full">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center border rounded-lg p-3 bg-gray-50 shadow-sm w-28"
            >
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ✕
              </button>

              {/* Preview */}
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-md text-gray-500 text-sm">
                  File
                </div>
              )}
              <span className="mt-2 text-xs text-center truncate w-full">
                {file.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
