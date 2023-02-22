function randomColor() // generates one random rgb255 color
{
    let c = [];
    c[0] = Math.floor(Math.random() * 256);
    c[1] = Math.floor(Math.random() * 256);
    c[2] = Math.floor(Math.random() * 256);
    return c;
}

// checks if the rgb255 color is within the lightness bounds of oklab
function checkBrightness(color) 
{
    color = rgb255toOk(color);
    if(color[0] > 0.2 && color[0] < 0.85)
    {
        return true;
    }
    return false;
}

//generates n randomcolors that account for brightness
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

//calculates distance between 2 colors in oklab
function calcDist(color1, color2) {
    L = (color1[0] - color2[0]) ** 2;
    a = (color1[1] - color2[1]) ** 2;
    b = (color1[2] - color2[2]) ** 2;
    return Math.sqrt(L + a + b);
}

// calculates the minimum distance between any 2 points of a colorset
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
    //console.log(maxDist);
    return colorSet;
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

// reoptimizes for normal vision after colorblind
function reOptimize(n) { 
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

function intersectBox(x, v)
{
    let a1 = (1-x[0])/v[0];
    let a2 = -x[1]/v[1];
    let a3 = (1-x[2])/v[2];
    let a = Math.max(a1, a2, a3);

    let b1 = -x[0]/v[0];
    let b2 = (1-x[1])/v[1];
    let b3 = -x[2]/v[2];
    let b = Math.min(b1,b2,b3);

    ans = [a,b];
    return ans
}

//gets a random number between a and b
function getRandomArbitrary(a,b)
{
    return Math.random() * (a - b) + b;
}

function reOptimize2(n){
    v = [0.92205465, -0.38601957, 0.02835689];
    let colorSet = genColorblindColors(n); // generate rgb255 colorset
    let newColorSet = [[]]; 

    // converting all colorset colors to linear
    for(let i = 0; i < n; i++)
    {
        newColorSet[i] = rgb255toLin(colorSet[i]);
    }
    
    for(let i = 0; i < n; i++)
    {
        dev = intersectBox(newColorSet[i], v);
        console.log(dev);
        //newColorSet[i] = newColorSet[i] + getRandomArbitrary(a,b) * v;
        rand = getRandomArbitrary(dev[0],dev[1]);
        console.log(rand);
        for(let j = 0; j < 3; j++)
        {
            newColorSet[i][j] = newColorSet[i][j] + (rand * v[j]);
        }
    }
    return newColorSet; // linear color space
}

console.log(reOptimize2(7));