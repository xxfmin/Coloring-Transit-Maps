function rgb255torgb1(a)
{
	return [a[0]/255, a[1]/255, a[2]/255];
}
function rgbtolin(C_srgb)
{
	//return [a[0]**2.2, a[1]**2.2, a[2]**2.2];
	let out = [];
	a = 0.055;
	if(C_srgb < 0.04045)
	{
		/*
		linear_portion = 1;
		out[linear_portion] = C_srgb[linear_portion] / 12.92;
		out[0] = ((C_srgb[0] + a) / (a + 1)) ** 2.4
		out[2] = ((C_srgb[2] + a) / (a + 1)) ** 2.4
		*/
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

	color1 = [100,23,210];
	color2 = rgb255torgb1(color1);
	console.log(color2);
	color3 = rgbtolin(color2);
	console.log(color3);
	color4 = lintocvd(color3);
	console.log(color4);
