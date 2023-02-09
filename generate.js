function randColors(n) // input n colors
{
    let colors = [];
    for(var i = 0; i < n; i++)
    {
        colors[i] = [];
        colors[i][0] = Math.floor(Math.random() * 256); // generate rand num between 0-255
        colors[i][1] = Math.floor(Math.random() * 256);
        colors[i][2] = Math.floor(Math.random() * 256);
    }
    //console.log(colors);
    return colors;
}
function calcDist(color1, color2)
{
    L = (color1[0]-color2[0])**2;
    a = (color1[1]-color2[1])**2;
    b = (color1[2]-color2[2])**2;
    return Math.sqrt(L+a+b);
}

function minDist(colors)
{
    let min = [];
    let mindist = calcDist([0,0,0], [1,1,1]); // distance between black and white
    for(var i = 0; i < colors.length-1; i++)
    {
        for(var j = i+1; j < colors.length; j++)
        {
            let dist = calcDist(colors[i], colors[j]);
            if(dist < mindist)
            {
                mindist = dist;
            }
        }
    }
    return mindist;

}

function genColors(n)
{
    let maxDist = 0;
    let colorSet = [[]];
    for(var i = 0; i < 100; i++)
    {
        let colors = randColors(n)
        for(var j = 0; j < n; j++)
        {
            colors[j] = rgb255ToRgb1(colors[j]);
        }
        let dist = minDist(colors);
        if(dist > maxDist)
        {
            maxDist = dist;
            colorSet = colors;
        }
    }
    return colorSet;
}

console.log(genColors(5));
//rgb255toOk(randColors(5));
//console.log(colors);
//colors = ()
//console.log(minDist(colors));