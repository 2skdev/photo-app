export function getFileType(base64: string): {
  contentType?: string;
  ext?: string;
} {
  const match = base64.match(/^data:(\w+\/(\w+))/);

  if (match) {
    return {
      contentType: match[1],
      ext: `.${match[2]}`,
    };
  }

  return {
    contentType: undefined,
    ext: undefined,
  };
}
