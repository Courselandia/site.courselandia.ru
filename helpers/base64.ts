const base64 = (
  file: File,
): Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export default base64;
