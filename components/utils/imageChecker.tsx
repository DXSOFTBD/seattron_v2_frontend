const validateImageDimensions = (file: any) => {
  const maxWidth = 1000;
  const maxHeight = 1000;

  if (!file) {
    return 'No file selected';
  }

  if (!file.type.match('image.*')) {
    return 'File is not an image';
  }

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    if (img.width <= maxWidth && img.height <= maxHeight) {
      return true;
    } else {
      return false;
    }
  };
};
export default validateImageDimensions;
