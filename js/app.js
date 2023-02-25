  function filter() {
    var select = document.getElementById("dropDown");
    var selectedValue = select.options[select.selectedIndex].value;
    if (selectedValue === "Red/Green") {
      console.log("woah");
      generateLines();
    }
    if (selectedValue === "Blue/Yellow") {

    }
    else {
      console.log("hey");
      generateNormalLines();
    }
  }
function generateNormLines() {
    var lineCount = document.getElementById("lineCount").value;
    var lines = "";
    colorset = genColors(lineCount);
    for (var i = 0; i < lineCount; i++) {
      var red = colorset[i][0];
      var green = colorset[i][1];
      var blue = colorset[i][2];
      var color = "rgb(" + red + "," + green + "," + blue + ")";
      lines += "<p style='color: " + color + ";'>-------------------------------</p>";
    }
    document.getElementById("lines").innerHTML = lines;
  }
  function generateLines() {
    var lineCount = document.getElementById("lineCount").value;
    var lines = "";
    colorset = reOptimize(lineCount);
    for (var i = 0; i < lineCount; i++) {
      var red = colorset[i][0];
      var green = colorset[i][1];
      var blue = colorset[i][2];
      var color = "rgb(" + red + "," + green + "," + blue + ")";
      lines += "<p style='color: " + color + ";'>-------------------------------</p>";
    }
    document.getElementById("lines").innerHTML = lines;
  }
  
  function generateBoxes() {
  const boxCount = document.getElementById("boxCount").value;
  document.getElementById("boxContainer").innerHTML = "";

  for (let i = 0; i < boxCount; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    document.getElementById("boxContainer").appendChild(box);
  }
}
