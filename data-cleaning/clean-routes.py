import geopandas as gpd
import pandas as pd
from collections import defaultdict

class Route:

    def __init__(self, route_id, link_id):
        self.route_id = route_id
        self.links = []

        self.links.append(link_id)


    def __str__(self):
        return "%s - %s" % (self.route_id, self.links)


def get_link_numbers(file):
    df = gpd.read_file(file)

    return df['LINKNUMMER'].tolist()

f = open("routes2015.csv")

routes = []
lastRoute = Route(-1, -1)

for line in f:
    splitLine = line.split(',')

    route_id = splitLine[0]
    link_id = splitLine[1]

    if lastRoute.route_id == route_id:
        lastRoute.links.append(link_id)

    else:
        routes.append(lastRoute)
        lastRoute = Route(route_id, link_id)

routes = routes[2:]

# Get linknummers from GeoJSON files
# Tilburg
snelfietsroute2015 = get_link_numbers('routes/oss-denbosch/Oss - Den Bosch 2015.geojson')
snelfietsroute2016 = get_link_numbers('routes/oss-denbosch/Oss - Den Bosch 2016.geojson')
snelfietsroute2017 = get_link_numbers('routes/oss-denbosch/Oss - Den Bosch 2017.geojson')

correctRoutes = []

for route in routes:
    if len(set(snelfietsroute2015).intersection(route.links)) == 0:
        continue

    correctRoutes.append(route)

d = {}

for route in correctRoutes:
    for l in route.links:
        if l in d:
            d[l] += 1

        else:
            d[l] = 1

ldf = gpd.read_file("tilburg_links.geojson")
filtered_ldf = ldf[ldf["LINKNUMMER"].isin(d.keys())]

print(ldf.head(10))

print(type(ldf))

