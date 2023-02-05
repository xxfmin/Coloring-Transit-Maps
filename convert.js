
function rgb255ToRgb1(a)
{
	return [a[0]/255, a[1]/255, a[2]/255];
}
function rgbToLin(C_srgb)
{
	let out = [];
	a = 0.055;
	for(let i = 0; i < 3; i++)
	{
		if(C_srgb[i] < 0.0405)
			out[i] = C_srgb[i] / 12.92;
		else
			out[i] = ((C_srgb[i] + a) / (a + 1)) ** 2.4;
	}
    return out

}
function linToCvd(mat2)
{
	let mat1 = [ [ 0.367322, 0.860646, -0.227968 ], [ 0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881] ];

	console.log(mat1[0][0] + "*" + mat2[0] + " + " + mat1[0][1] + "*" + mat2[0]);
	r = mat1[0][0]*mat2[0] + mat1[0][1]*mat2[1] + mat1[0][2]*mat2[2];
	g = mat1[1][0]*mat2[0] + mat1[1][1]*mat2[1] + mat1[1][2]*mat2[2];
	b = mat1[2][0]*mat2[0] + mat1[2][1]*mat2[1] + mat1[2][2]*mat2[2];

	return [r,g,b];
}

function linToOk(c)
{
	l = 0.4122214708 * c[0] + 0.5363325363 * c[1] + 0.0514459929 * c[2];
	m = 0.2119034982 * c[0] + 0.6806995451 * c[1] + 0.1073969566 * c[2];
	s = 0.0883024619 * c[0] + 0.2817188376 * c[1] + 0.6299787005 * c[2];

    l_ = Math.cbrt(l);
    m_ = Math.cbrt(m);
    s_ = Math.cbrt(s);

    return [
		0.2104542553*l_ + 0.7936177850*m_ - 0.0040720468*s_,
        1.9779984951*l_ - 2.4285922050*m_ + 0.4505937099*s_,
        0.0259040371*l_ + 0.7827717662*m_ - 0.8086757660*s_,
	]
       
}

	color1 = [23,55, 211]; // color1 = rgb255
	color2 = rgb255ToRgb1(color1); // color2 = rgb1
	console.log(color2);
	color3 = rgbToLin(color2); // color3 = rgb1-linear
	console.log(color3);
	color4 = linToCvd(color3); // color4 = cvd
	console.log(color4);
	color5 = linToOk(color3); // color5 = oklab
	console.log(color5);
