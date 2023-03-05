// Output: one random rgb255 color
function randomColor()
{
    let c = [];
    c[0] = Math.floor(Math.random() * 255);
    c[1] = Math.floor(Math.random() * 255);
    c[2] = Math.floor(Math.random() * 255);
    return c;
}

// Check if the RGB255 color is within the given lightness bounds inside Oklab
function checkBrightness(color) 
{
    color = rgb255toOk(color);
    if(color[0] > 0.2 && color[0] < 0.85)
    {
        return true;
    }
    return false;
}

// Input: positive integer n
// Output: n random colors in RGB255 that account for brightness
function randColors(n)
{
    let colors = [];
    for (let i = 0; i < n; i++) {
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
    for (let i = 0; i < colors.length - 1; i++) {
        for (let j = i + 1; j < colors.length; j++) {
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

    for (let i = 0; i < 300; i++) {
        let colors = randColors(n)

        for (let j = 0; j < n; j++) {
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

    for (let i = 0; i < 300; i++) {
        let colors = randColors(n)

        for (let j = 0; j < n; j++) {
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

// Reoptimize for normal vision after colorblind
function reOptimize(n) { 
    let colorSets = [genColorblindColors(n), genColorblindColors(n), genColorblindColors(n), genColorblindColors(n), genColorblindColors(n)]
    let bestSet = [[]];
    let maxDist = 0;

    for (let i = 0; i < 5; i++) {
        let newColors = [[]];
        for (let j = 0; j < n; j++) {
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

// Inputs: a vector x in [0,1]^3 and a nonzero vector v in R^3
// Output: the pair [a,b] with a <= b
function intersectBox(x, v)
{
    let a = Number.NEGATIVE_INFINITY;
    let b = Number.POSITIVE_INFINITY;
    for (let i=0; i < 3; i++) {
        if (v[i] > 0) {
            a = Math.max(a,-x[i]/v[i]);
            b = Math.min(b,(1-x[i])/v[i]);
        } else if (v[i] < 0) {
            a = Math.max(a,1-x[i]/v[i]);
            b = Math.min(b,-x[i]/v[i]);
        } else {
            // do nothing
        }
        return [a,b]
    }

}

// Input: pair of numbers a, b with a <= b
// Output: random floating point number between a and b, inclusive
function getRandomArbitrary(a,b)
{
    return Math.random() * (b - a) + a;
}


function reOptimize2(n){
    v = [0.92205465, -0.38601957, 0.02835689];
    let colorSet = genColorblindColors(n); // generate rgb255 colorset
    let newColorSet = []; 
    // converting all colorset colors to linear
    for (let i = 0; i < n; i++)
    {
        newColorSet.push(rgb255toLin(colorSet[i]));
        for(let j = 0; j < 3; j++)
        {
            if(newColorSet[i][j] < 0)
            {
                newColorSet[i][j] = 0
            }
        }
    }
    console.log(newColorSet.join(" "));

    
    for (let i = 0; i < n; i++)
    {
        dev = intersectBox(newColorSet[i], v);
        console.log(dev.join(" "));
        //newColorSet[i] = newColorSet[i] + getRandomArbitrary(a,b) * v;
        rand = getRandomArbitrary(dev[0],dev[1]);
        console.log(rand);
        for (let j = 0; j < 3; j++)
        {
            newColorSet[i][j] = newColorSet[i][j] + (rand * v[j]);
            // if(newColorSet[i][j] < 0)
            // {
            //     newColorSet[i][j] = 0
            // }
        }
    }
    for(let i = 0; i < n; i++)
    {
        newColorSet[i] = linToRgb(newColorSet[i]);
        newColorSet[i] = rgb1ToRgb255(newColorSet[i]);
    }
    return newColorSet; // linear color space
}

console.log(reOptimize2(7));