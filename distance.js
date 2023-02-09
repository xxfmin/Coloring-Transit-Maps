function calcDist(L1, a1, b1, L2, a2, b2)
{
    L = (L1-L2)**2;
    a = (a1-a2)**2;
    b = (b1-b2)**2;
    return Math.sqrt(L+a+b);
}



//console.log(calcDist(1,2,3,8,9,10));