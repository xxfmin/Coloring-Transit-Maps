const imageInput = document.getElementById('image-input');
const colorContainer = document.getElementById('color-container');
const threshold = 100;

imageInput.addEventListener('change', handleImage);

function handleImage(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const colors = new Set();
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const rgb = `rgb(${r}, ${g}, ${b})`;
        let addColor = true;
        for (const color of colors) {
          if (colorDistance(rgb, color) < threshold) {
            addColor = false;
            break;
          }
        }
        if (addColor) {
          colors.add(rgb);
        }
      }
      const colorBoxes = [...colors].map(color => {
        const box = document.createElement('div');
        box.className = 'color-box';
        box.style.backgroundColor = color;
        return box;
      });
      colorContainer.innerHTML = '';
      colorBoxes.forEach(box => colorContainer.appendChild(box));
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(file);
}

function colorDistance(color1, color2) {
  const [r1, g1, b1] = color1.match(/\d+/g);
  const [r2, g2, b2] = color2.match(/\d+/g);
  const deltaR = r1 - r2;
  const deltaG = g1 - g2;
  const deltaB = b1 - b2;
  return Math.sqrt(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB);
}
