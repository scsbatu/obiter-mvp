export function formatFileSize(valueInMB) {
  if (valueInMB < 1) {
    const kb = valueInMB * 1024;
    return `${kb.toFixed(2)} KB`;
  } else {
    return `${valueInMB.toFixed(2)} MB`;
  }
}

export function formatFileSizeByte(bytes) {
  const sizeInMB = bytes / (1024 * 1024); 

  if (sizeInMB < 1) {
    const sizeInKB = bytes / 1024;
    return `${sizeInKB.toFixed(2)} KB`;
  } else {
    return `${sizeInMB.toFixed(2)} MB`;
  }
}
