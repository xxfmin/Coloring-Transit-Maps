function generateBoxes() {
  const boxCount = document.getElementById("lineCount").value;

  let colorset = reOptimize(boxCount);

  document.getElementById("boxContainer").innerHTML = "";

  for (let i = 0; i < boxCount; i++) {
    var red = colorset[i][0];
    var green = colorset[i][1];
    var blue = colorset[i][2];
    var color = `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
    var colorPrint = `rgb(${red}, ${green}, ${blue})`;

    const box = document.createElement("div");
    box.classList.add("box");
    box.style.backgroundColor = color;
    box.innerHTML = color;
    document.getElementById("boxContainer").appendChild(box);
  }

}
