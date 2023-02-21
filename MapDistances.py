# ! pip install colorspacious
from colorspacious import deltaE
from colorspacious import cspace_convert
import numpy as np
import matplotlib.pyplot as plt

cvd_space = {"name": "sRGB1+CVD",
             "cvd_type": "deuteranomaly",
             "severity": 100}

def calcMinDist(colors):
  min = []
  mindist = deltaE([0,0,0], [255,255,255], input_space="sRGB255") #approx distance between [0,0,0] and [255,255,255]
  row, col = colors.shape
  for i in range(row):
    for j in range(i+1, row):
      color1 = colors[i]
      color2 = colors[j]
      dist = deltaE(color1, color2, input_space="sRGB255")
      if dist < mindist:
        mindist = dist
      #print(color1, color2, dist)
  return mindist


def calcAvgDist(colors):
  totaldist = 0
  count = 0
  row, col = colors.shape
  for i in range(row):
    for j in range(i+1, row):
      color1 = colors[i]
      color2 = colors[j]
      dist = deltaE(color1, color2, input_space="sRGB255")
      totaldist+=dist
      count = count+1
  
  return totaldist/count


def calcCvdDist(colors):
  min = []
  mindist = 100 #approx distance between [0,0,0] and [255,255,255]
  row, col = colors.shape
  for i in range(row):
    for j in range(i+1, row):
      color1 = cspace_convert(colors[i], cvd_space, "sRGB255")
      color2 = cspace_convert(colors[j], cvd_space, "sRGB255")
      dist = deltaE(color1, color2, input_space="sRGB255")
      if dist < mindist:
        mindist = dist
  return mindist

def calcDist(colors):
    print("Minimum distance between 2 points: ", calcMinDist(colors))

    print("Average distance between points: ", calcAvgDist(colors))

    print("Minimum CVD distance: ", calcCvdDist(colors))




# Washington DC Metro: interactive map https://www.wmata.com/schedules/maps/index.cfm?t=maps-rail-wrapper
# 6 lines
# red, orange, blue, green, yellow, silver
# background-land: [236, 226, 217]
dc = np.array([
[191, 17, 56],
[224, 140, 41],
[46, 142, 193],
[19, 184, 64],
[229, 204, 15],
[164, 164, 164]
])


# Washington DC Metro: PDF https://www.wmata.com/schedules/maps/upload/2022-System-Map.pdf
# 6 lines
# red, orange, blue, green, yellow, silver
# background-color: white
dc2 = np.array([
[229, 24, 54],
[247, 147, 29],
[0, 119, 192],
[0, 169, 78],
[254, 209, 5],
[160, 163, 161]
])

# Madrid: PDF https://www.esmadrid.com/sites/default/files/plano_metro_madrid_septiembre_2022.pdf
# 12 lines
# light-blue, red, yellow, brown, light-green, silver, orange, pink, purple, blue, green, duck-poop
# Note: some line colors differ slightly from legend colors like purple, green, duck-poop.
mad = np.array([
[43, 182, 230],
[235, 47, 41],
[254, 203, 24],
[161, 92, 47],
[122, 193, 66],
[115, 127, 134],
[245, 132, 42],
[219, 116, 174],
[145, 68, 153],
[1, 83, 150],
[0, 163, 77],
[153, 142, 46]
])

# Lisbon metro map, Homepage button colors https://www.metrolisboa.pt/en/
# 4 lines
# blue, yellow, green, red
# background-color: white
lis = np.array([
[47, 125, 225],
[247, 168, 0],
[0, 161, 155],
[234, 29, 118]
])
# PDF: https://www.metrolisboa.pt/en/wp-content/uploads/sites/3/2022/06/Metro-Lisboa-Network-Diagram_Vmay.22.pdf
lis2 = np.array([
[78, 132, 196],
[253, 185, 19],
[0, 170, 166],
[238, 43, 116]
])

# Philadelphia SEPTA puts their lines into one map and also different maps: https://www5.septa.org/travel/maps/.
# On the unified map, the three local subway lines are colored differently, the trolley lines are all green, and regional rails are all navy.

# San Francisco Bay Area BART PNG https://www.bart.gov/sites/default/files/images/basic_page/system-map-everyday-until-9pm.png as displayed on their webpage https://www.bart.gov/schedules
# 6 lines
# yellow, blue, orange, green, red, beige (beige has two stops: Coliseum to Oakland International Airport)
san = np.array([
[255, 232, 0],
[0, 174, 239],
[250, 166, 26],
[77, 184, 72],
[237, 28, 36],
[171, 166, 130]
])
# PDF map colors are slightly different: https://www.bart.gov/sites/default/files/docs/BARTDetailedMapWeb.pdf
san2 = np.array([
[255, 230, 1],
[0, 156, 219],
[249, 165, 27],
[76, 184, 72],
[238, 29, 35],
[160, 154, 115]
])

# Chicago transit authority via their brochure: https://www.transitchicago.com/assets/1/6/ctamap_SystemMap.pdf
# 8 lines
# red, blue, brown, green, orange, pink, purple, yellow
chi = np.array([
[225, 23, 61],
[0, 163, 230],
[117, 66, 0],
[0, 161, 76],
[247, 148, 30],
[243, 139, 185],
[73, 47, 146],
[255, 242, 0]
])
# Via their L system PDF https://www.transitchicago.com/assets/1/6/ctamap_Lsystem.pdf
chi2 = np.array([
[211, 13, 43],
[0, 162, 223],
[101, 60, 32],
[0, 148, 61],
[255, 70, 15],
[238, 129, 168],
[59, 44, 130],
[255, 213, 0]
])
# Their png has different colors too: https://www.transitchicago.com/assets/1/6/ctamap_Lsystem.png

# Atlanta MARTA printable PDF: https://itsmarta.com/uploadedFiles/Interior-Rail-Map-33-33_2019_v2.pdf
# red, gold, blue, green,
atl =np.array([
[206, 33, 44],
[212, 167, 42],
[2, 117, 178],
[0, 157, 73]
])

# Los Angeles Metro: https://www.dropbox.com/s/8gjcfmsifv3l7gg/23-1002_map_GM_KLine_Master_Oct22_final.pdf?dl=0 from https://www.metro.net/riding/guide/system-maps/
# Metro rail only
# 7 lines
# blue, red, green, purple, blue/expo, pink, gold
la = np.array([
[0, 114, 188],
[238, 29, 35],
[107, 192, 103],
[160, 94, 166],
[46, 193, 234],
[230, 112, 171],
[252, 184, 20]
])

# Including metro busway (orange, silver)
# 9 lines
la2 = np.array([
[0, 114, 188],
[238, 29, 35],
[107, 192, 103],
[160, 94, 166],
[46, 193, 234],
[230, 112, 171],
[252, 184, 20],
[244, 121, 33],
[174, 184, 190]
])

fsu = np.array([[78,157,2],[205,49,48],[212,186,134],[80,1,162],[70,123,38], [92,47,2],[77,170,192]])
print("==================FSU=================")
calcDist(fsu)

print("\n=============Washington DC============")
calcDist(dc)

print("===========Washington DC 2============")
calcDist(dc2)

print("\n=================Madrid================")
calcDist(mad)

print("\n=================Lisbon================")
calcDist(lis)

print("================Lisbon 2================")
calcDist(lis2)

print("\n==============San Fransisco=============")
calcDist(san)

print("=============San Fransisco 2=============")
calcDist(san2)

print("\n=============Chicago Brochure============")
calcDist(chi)

print("===============Chicago Pdf===============")
calcDist(chi2)

print("\n=================Atlanta=================")
calcDist(atl)

print("\n===============Los Angeles===============")
calcDist(la)

print("==============Los Angeles 2==============")
calcDist(la2)

# newfsu = np.array([[118,175,86],[92,215,232],[108,37,105],[41,1,3],[110,247,96], [196,61,228],[37,45,216]])
# print("==================FSU=================")
# calcDist(newfsu)
newfsu2 = np.array([[67,4,19],[35,149,166],[12,38,113],[112,209,13],[223,154,180], [194,37,70],[81,95,250]])
print("==================FSU=================")
calcDist(newfsu2)