
function rgb255torgb1(a)
{
	return [a[0]/255, a[1]/255, a[2]/255];
}
function rgbtolin(C_srgb)
{
	let out = [];
	a = 0.055;
	if(C_srgb < 0.04045)
	{
		out[0] =  C_srgb[0] / 12.92;
		out[1] = C_srgb[1] / 12.92;
		out[2] = C_srgb[2] / 12.92;
	}
	else{
		linear_portion = 0;
		out[0] = ((C_srgb[0] + a) / (a + 1)) ** 2.4
		out[1] = ((C_srgb[1] + a) / (a + 1)) ** 2.4
		out[2] = ((C_srgb[2] + a) / (a + 1)) ** 2.4
	}

    return out

}
function lintocvd(mat2)
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

    l_ = l**(1/3);
    m_ = m**(1/3);
    s_ = s**(1/3);

    return [
		0.2104542553*l_ + 0.7936177850*m_ - 0.0040720468*s_,
        1.9779984951*l_ - 2.4285922050*m_ + 0.4505937099*s_,
        0.0259040371*l_ + 0.7827717662*m_ - 0.8086757660*s_,
	]
       
}

	color1 = [100,23,210];
	color2 = rgb255torgb1(color1);
	console.log(color2);
	color3 = rgbtolin(color2);
	console.log(color3);
	color4 = lintocvd(color3);
	console.log(color4);
	color5 = linToOk(color3);
	console.log(color5);
