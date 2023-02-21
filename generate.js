function randomColor()
{
    let c = [];
    c[0] = Math.floor(Math.random() * 256);
    c[1] = Math.floor(Math.random() * 256);
    c[2] = Math.floor(Math.random() * 256);
    return c;
}
function checkBrightness(color)
{
    color = rgb255toOk(color);
    if(color[0] > 0.2 && color[0] < 0.85)
    {
        return true;
    }
    return false;
}
function randColors(n) // input n colors
{
    let colors = [];
    for (var i = 0; i < n; i++) {
        let color = randomColor();
        while(!checkBrightness(color))
        {
            color = randomColor();
        }
        colors[i] = color;
    }
    //console.log(colors);
    return colors;
}
function calcDist(color1, color2) {
    L = (color1[0] - color2[0]) ** 2;
    a = (color1[1] - color2[1]) ** 2;
    b = (color1[2] - color2[2]) ** 2;
    return Math.sqrt(L + a + b);
}

function minDist(colors) {
    let min = [];
    let mindist = calcDist([1, 0, 0], [0, 0, 0]); // distance between black and white
    for (var i = 0; i < colors.length - 1; i++) {
        for (var j = i + 1; j < colors.length; j++) {
            let dist = calcDist(colors[i], colors[j]);
            if (dist < mindist) {
                mindist = dist;
            }
        }
    }
    return mindist;

}

function genColors(n) { // generates colorset of n colors (normal vision)
    let maxDist = 0;
    let colorSet = [[]];
    let newColors = [[]];

    for (var i = 0; i < 250; i++) {
        let colors = randColors(n)

        for (var j = 0; j < n; j++) {
            newColors[j] = rgb255toOk(colors[j]);
        }
        let dist = minDist(newColors);
        if (dist > maxDist) {
            maxDist = dist;
            colorSet = colors;
        }
    }
    //console.log(maxDist);
    return colorSet;
}

function genColors2(n) {
    let colors = randColors(n)
    var i = 0
    while(i < n){
        
    }
    for (var i = 0; i < 300; i++) {
        let colors = randColors(n)

        for (var j = 0; j < n; j++) {
            newColors[j] = rgb255toOk(colors[j]);
        }
        let dist = minDist(newColors);
        if (dist > maxDist) {
            maxDist = dist;
            colorSet = colors;
        }
    }
}

function genColorblindColors(n) { // generates n colors (cvd)
    let maxDist = 0;
    let colorSet = [[]];
    let newColors = [[]];

    for (var i = 0; i < 300; i++) {
        let colors = randColors(n)

        for (var j = 0; j < n; j++) {
            newColors[j] = rgbToOkCvd(colors[j])

        }
        let dist = minDist(newColors);
        if (dist > maxDist) {
            maxDist = dist;
            colorSet = colors;
        }
    }
    //console.log(maxDist);

    return colorSet;
}

function reOptimize(n) { // optimizes for noraml vision after colorblind
    let colorSets = [genColorblindColors(n), genColorblindColors(n), genColorblindColors(n), genColorblindColors(n), genColorblindColors(n)]
    let bestSet = [[]];
    let maxDist = 0;

    for (var i = 0; i < 5; i++) {
        let newColors = [[]];
        for (var j = 0; j < n; j++) {
            newColors[j] = rgb255toOk(colorSets[i][j]);
        }
        var dist = minDist(newColors);
        if (dist > maxDist) {
            maxDist = dist;
            bestSet = colorSets[i];
        }
    }
    // console.log(colorSets);
    // console.log(bestSet);
    console.log(maxDist);
    console.log(bestSet);
    return bestSet;

}
//reOptimize(6);
