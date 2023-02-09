const input = document.getElementById("image-input");
const colorPalette = document.getElementById("color-palette");

input.addEventListener("change", () => {
  const reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  reader.onload = (event) => {
    const image = new Image();
    image.src = event.target.result;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      const imageData = context.getImageData(0, 0, image.width, image.height);
      const pixels = imageData.data;
      const colorCounts = {};
      for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];
        const color = `rgb(${red}, ${green}, ${blue})`;
        if (!colorCounts[color]) {
          colorCounts[color] = 0;
        }
        colorCounts[color]++;
      }
      const sortedColors = Object.keys(colorCounts).sort(
        (a, b) => colorCounts[b] - colorCounts[a]
      );
      colorPalette.innerHTML = "";
      //change the "i < n" to the amount of colors you want to find
      for (let i = 0; i < 9; i++) {
        const color = sortedColors[i];
        const colorBlock = document.createElement("div");
        colorBlock.classList.add("color-block");
        colorBlock.style.backgroundColor = color;
        colorPalette.appendChild(colorBlock);
      }
    };
  };
});
