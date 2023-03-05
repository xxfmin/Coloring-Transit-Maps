# Poster comments

## Abstract

Transit maps are a useful tool in navigating transportation. Despite its necessity, many
maps, including the FSU bus system, are difficult to read and especially inaccessible to
those with color vision deficiencies. As a result, we produce a program that can
dynamically generate a set of colors <mark>for what purpose?</mark>. Our program generates $n$ colors that are different
from each other; these colors are different for both the average population as well as for
colorblind individuals. To produce an optimal set of colors, we used a perceptually
uniform color space–Oklab–<mark>commas</mark>to accurately maximize the minimum Euclidean distance
between any two colors from the set of colors based on a deuteranopia perspective <mark>idk I find this awkward</mark>.
After accounting for a common color vision deficiency <mark>Simplify clause to "Next"</mark>, we further optimize our color set
for normal vision and then integrate our color generating program into a functional
website, giving users the opportunity to interact with our code. When we compare our
program’s generated colors to FSU’s transit map, we perceive <mark>find/observe</mark> a noticeable improvement
in color contrasts.

## Methods

- The conversion to XYZ seems irrelevant to us.
- Instead use https://bottosson.github.io/posts/oklab/#converting-from-linear-srgb-to-oklab
- Your matrix multiplication is wrong (order matters when multiplying matrices).
- Fix $C_{linear}$ second case parenthesis.
- A previous study was performed where they <mark>it was not a study, but a derivation from first principles; "they" refers to "a study" (singular)?</mark>
- Once optimized for CVD, we search along the null space of
the color CVD matrix to further optimize the set of colors for standard vision,
allowing us to accommodate those with vision deficiencies while still improving how
the average population sees out color sets. The nullspace is given by:


# Conclusion
- ~~In conclusion~~, altering transit map line colors ~~can~~ make a significant improvement
in the legibility of the map
- Separate conclusion from future work?

# generate.js

- Instead of writing `genColors(n)` and `genColorblindColors(n)` separately, it's more efficient to write one `genColors(n)` function and have `CVDDistance` and `Distance`.

- Check variable scope in JS:
```
function checkBrightness(color) 
{
    color = rgb255toOk(color); // would this accidentally change a variable outside this function?
    if(color[0] > 0.2 && color[0] < 0.85)
    {
        return true;
    }
    return false;
}
```

# convert.js

- You don't need `rgb255ToRgb1`: start measuring distances of colors in RGB-linear instead. Only at the end do you convert to RGB255.
- Some conversion functions can use multiple returns to write less code?

# Other
- Website needs url; I mean a new Github account and url that can be linked to