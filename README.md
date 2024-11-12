# Coloring-Transit-Maps
Hosted at: https://fsu-urop-2023.github.io/Coloring-Transit-Maps/

## Abstract
Transit maps are a useful tool in navigating transportation. Despite its necessity, many maps, including the FSU bus system, are difficult to read and especially inaccessible to those with color vision deficiencies. As a result, we produce a program that can dynamically generate a set of colors. Our program generates n colors that are different from each other; these colors are different for both the average population as well as for colorblind individuals. To produce an optimal set of colors, we used a perceptually uniform color space, Oklab, to accurately maximize the minimum Euclidean distance between any two colors from the set of colors for those with deuteranopia. After accounting for a common color vision deficiency, we further optimize our color set for normal vision and then integrate our color generating program into a functional website, giving users the opportunity to interact with our code. When we compare our program’s generated colors to FSU’s transit map, we perceive a noticeable improvement in color contrasts. 

## Methods
### Converting Color Spaces
Oklab is a perceptually uniform color space that allows us to accurately calculate the Euclidean distance between two colors so that we can determine how “different” the colors are from each other. In order to utilize this color space, we must first convert the colors from the most commonly used color space: sRGB. We do this through implementing conversions from sRGB to sRGB1 to linear RGB [1], and finally to Oklab [2] using JavaScript:

<img width="524" alt="Color space conversion equations" src="https://github.com/user-attachments/assets/f38f4c6e-62ed-4298-92c3-9fd8161d62cf">

### Color Vision Deficiency (CVD)

Because we also want to better accommodate people with color vision deficiency (CVD), we need to be able to represent what a colorblind person might see when viewing our set of colors. A simulation was performed [3] where they constructed matrices that translate colors from a linear RGB color space to an interpretation of how those with varying degrees of color vision deficiency see color. The matrix found for representing colors for deuteranomaly, the most common form of CVD, at 100% severity is:

<img width="359" alt="CVD Deuteranomaly Matrix" src="https://github.com/user-attachments/assets/af576843-d91a-4c96-a477-65adc326a005">

Using this matrix, we can determine the color that people with deuteranomaly see by multiplying the matrix with the original color. When the colors are in the right color space, we can generate and calculate the optimal set of colors.

### GRASP Algorithm and Optimization for CVD

To generate `n` colors that are as perceptually apart as possible from each other, we utilize a greedy randomized adaptive search procedure (GRASP) to heuristically choose colors that have a large Euclidean distance from one another for those with deuteranomaly CVD [4]. Once optimized for CVD, we search along the null space of the color CVD matrix to further optimize the set of colors for standard vision, allowing us to accommodate those with vision deficiencies while still improving how the average population sees our color sets. The null space is given by:

<img width="327" alt="CVD Null Space" src="https://github.com/user-attachments/assets/cfee13ae-a4f8-416f-99b8-716516a302d6"> <br>

### FSU Bus Lines vs Generated Colors
<img width="426" alt="Screenshot 2024-09-21 at 8 46 03 AM" src="https://github.com/user-attachments/assets/7148d4ed-20b0-4889-930c-37232763e05e">
<img width="424" alt="Screenshot 2024-09-21 at 8 46 32 AM" src="https://github.com/user-attachments/assets/3e31553b-ccae-47a5-bc0f-487815fadac6">

## Results
By using our program to generate the same number of colors that the FSU bus system has, we have observed improvements in the minimum Euclidean distance between any two colors, the average Euclidean distance between all colors, and the minimum Euclidean distance between any two colors from a deuteranopia colorblind perspective. In Figure 1, the set of colors on the left represents FSU’s current bus map colors from the perspective of average vision compared to deuteranopia while the right side represents one set of colors our website generated. It’s visibly evident that it is easier to differentiate between colors using our generated set both for average and deuteranopia vision.

We quantified these results in Figure 2, by calculating the Euclidean distances between all colors in the set using the Python library Colorspacious [5], where the larger the distance, the more different the colors are. When comparing our set’s distances to not only FSU’s bus map but to other widely used transit maps from major cities, we observe a noticeable improvement in the measurements, especially for color vision deficiency.

Additionally, we created a website that showcases our research findings. The website is hosted on GitHub, which allows us to easily collaborate and share our work with others. Through the website, visitors can learn about our methodology and generate colors themselves.

## Conclusion
Altering transit map line colors can make a significant improvement in the legibility of the map, especially for people with color vision deficiency. Our research has shown that by verifying the Euclidean distances of all colors in a color set within a perceptually uniform color space, we can optimize the colors to have greater contrast and visibility for a more diverse population of people.

Moving forward, we aim to improve our program by increasing the accuracy of our CVD calculations and enhance the methods we use to calculate distances between colors. 
An issue with our current CVD matrix is that it contains negative numbers, meaning that it is possible for us to calculate a negative value in a color, which lies outside the color space. Because of this issue, there have been other, more complicated, methods developed to convert colors to a CVD simulated color space that we could adopt. 
In addition, we can improve our calculations by choosing to use a color space that more accurately replicates human vision. Although Oklab is both perceptually uniform and easy to use, further research on colors have led people to develop more accurate and uniform systems. 
We also aspire to enhance our website's user experience by incorporating more features that can better accommodate their needs. Some examples of features to add are allowing the user to choose some of their own colors instead of our program generating the whole set of colors from scratch and extracting the line colors from a user uploaded image of a subway map.

Overall, improving transit map line colors requires careful consideration of user needs and preferences, as well as a thorough understanding of color theory and accessibility guidelines. By adhering to best practices for color selection and design, transit systems can create maps that are more user-friendly and accessible to all passengers.

### References
1. J.Y. Hardeberg, “Acquisition and Reproduction of Colour Images: Colorimetric and Multispectral Approaches,” doctoral dissertation, École Nationale Supérieure de Télécommunications de Paris, 2001.
2.	B. Ottosson, “A perceptual color space for Image Processing,” Björn Ottosson, 23-Dec-2020. [Online]. Available: https://bottosson.github.io/posts/oklab/. [Accessed: 20-Feb-2023].
3.	G. M. Machado, M. M. Oliveira and L. A. F. Fernandes, "A Physiologically-based Model for Simulation of Color Vision Deficiency," in IEEE Transactions on Visualization and Computer Graphics, vol. 15, no. 6, pp. 1291-1298, Nov.-Dec. 2009, doi: 10.1109/TVCG.2009.113.
4.	J. B. Ghosh, “Computational aspects of the maximum diversity problem,” Operations Research Letters, vol. 19, no. 4, pp. 175–181, 1996.
5.	N. Smith. 2017. Colorspacious documentation 2017. Retrieved from https://colorspacious.readthedocs.org/en/latest


