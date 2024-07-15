export async function file2base64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject();
      }
    };
    reader.readAsDataURL(file);
  });
}

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
