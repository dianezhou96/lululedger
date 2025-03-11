from pprint import pprint
import re

with open("luludocs.txt") as f:
	lines = f.readlines()

# print(lines)

colors_sorted = [
	'Black', 
	'Black/Black', 
	'True Navy', 
	'White', 
	'Heathered Core Ultra Light Grey', 
	'Slate/White', 
	'Bone', 
	'Passionate', 
	'Passionate/Passionate', 
	'Crater Blue/Crater Blue', 
	'Twilight Rose', 
	'Twilight Rose/Twilight Rose', 
	'Sea Mist', 
	'Sea Mist/Sea Mist',
	'Rainforest Green',  
	'Beaming Blue', 
	'Cerulean Blue', 
	'College Cobalt', 
	'Storm Teal', 
	'Blue Willow',
	"Heathered Nightfall",
]

products_grouped = []
current_group = []
for line in lines:
	if len(line.rstrip()) == 0 and len(current_group) > 0:
		products_grouped.append(current_group[:])
		current_group = []
	else:
		current_group.append(line.rstrip())

# pprint(products_grouped)

pattern = r"(.+?)\s(?:([0-9XSML/, -]+)\s)?(https://\S+)"

def parse_size(sizeStr):
	sizeStrs = sizeStr.split(", ")
	sizes = []
	for size in sizeStrs:
		if "-" in size:
			sizeMin, sizeMax = size.split("-")
			sizeMin = int(sizeMin)
			sizeMax = int(sizeMax)
			for s in range(sizeMin, sizeMax+1, 2):
				sizes.append(s)
		else:
			sizes.append(size)
	return sizes


colors = []
products = []
for product_grouped in products_grouped:
	name = ""
	price = 0
	items = []
	product_link = ""
	color_idx = None
	for i in range(len(product_grouped)):
		line = product_grouped[i]
		if i == 0:
			name = line
			continue
		if i == 1:
			price = int(line)
			continue
		if i == 2:
			product_link = line
			continue
		match = re.match(pattern, product_grouped[i])
		if match:
			color = match.group(1)
			sizes = parse_size(match.group(2)) if match.group(2) else [""]
			link = match.group(3)
			items.append({
				"color": color,
				"img": link,
				"sizes": sizes
			})
			if color not in colors:
				colors.append(color)
			else:
				this_color_idx = color.index(color)
				if color_idx is not None and this_color_idx < color_idx:
					print("ERRRORRRRR")
					print(product_link, color)
				color_idx = this_color_idx
			# print(f"Color: {color}, Size: {size}, Link: {link}")
		else:
			print("No match found")
			print(line)
	items.sort(key=lambda x: colors_sorted.index(x["color"]))
	products.append({
		"product": name,
		"category": 2,
		"link": product_link,
		"price_retail": price,
		"items": items
	})

# print(len(colors) == len(colors_sorted))

# pprint products with double quotes
import json
print(json.dumps(products))

# print(len(products))