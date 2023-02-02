
function multiply(m1, m2, mat1, n2, mat2)
{
	let x, i, j;
	let res = new Array(m1);
	for (i = 0; i < m1; i++)
		res[i] = new Array(n2);
		
	for (i = 0; i < m1; i++)
	{
		for (j = 0; j < n2; j++)
		{
			res[i][j] = 0;
			for (x = 0; x < m2; x++)
			{
				res[i][j] += mat1[i][x] * mat2[x][j];
			}
		}
	}
    
	for (i = 0; i < m1; i++)
	{
		for (j = 0; j < n2; j++)
		{
			//document.write(res[i][j] + " ");
            console.log(res[i][j]);
		}
		//document.write("<br>");
	}
    
}

    let R = 22;
    let G = 50;
    let B = 79;
	let mat1 = [ [ 0.367322, 0.860646, -0.227968 ], [ 0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881] ];
	let mat2 = [[R], [G], [B]];
	let m1 = 3, m2 = 3, n1 = 3, n2 = 1;
	
	multiply(m1, m2, mat1, n2, mat2);
