export function formatFileSize(bytes: number) {
  if (bytes >= 1048576) {
    return (bytes / 1048576).toFixed(2) + " MB";
  }
  if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  }

  return bytes + " bytes";
}
