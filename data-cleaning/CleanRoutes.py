import sys
import csv
import geopandas as gpd


class Link:
    def __init__(self, link_id, city_id):
        self.link_id = link_id
        self.city_id = city_id


class Route:
    def __init__(self, route_id, link):
        self.route_id = route_id
        self.links = []

        self.links.append(link)

    def __str__(self):
        return "%s - %s" % (self.route_id, self.links)

def main(argv):
    route_links_path = argv[0]
    all_links_path = argv[1]
    routes_path = argv[2]

    print(route_links_path, all_links_path, routes_path)

    rdf = gpd.read_file(route_links_path)
    adf = gpd.read_file(all_links_path)

    print(rdf.head(5))
    print(adf.head(5))

    found_routes = {}
    correct_routes = {}
    last_route = -1
    contains_route_link = False

    with open(routes_path) as routes:
        reader = csv.DictReader(routes)

        for row in reader:
            route_id = row['routeid']

            if route_id != last_route:
                if contains_route_link:
                    correct_routes[last_route] = found_routes[last_route]
                    contains_route_link = False

            last_route = route_id

            if route_id not in found_routes:
                found_routes[route_id] = []

            found_routes[route_id].append(row['linknummer'])

            if rdf['LINKNUMMER'].str.contains(row['linknummer']).any():
                contains_route_link = True

    print(len(correct_routes.keys()))


if __name__ == "__main__":
    main(sys.argv[1:])