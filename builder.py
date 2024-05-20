import segno
import sys

if len(sys.argv) > 1 :
	sys.stdin = open(sys.argv[1])

nodes = []

class Node :
	def __init__(self, name, links) :
		self.code = name
		self.link = links

		myqr = segno.make_qr(self.code)
		myqr.save(f"QR/Node_{self.code}.png")

temp = {}

nameless = 1

while True :
	name = input("Node name : ")

	if name == "!" :
		break

	actual = name or f"IND-{nameless}"

	if actual == f"IND-{nameless}" :
		nameless += 1

	temp[actual] = []

print("Nodes :", end = " ")
for i in temp :
	print(i, end = " ")
print("")

while True :
	link = input(f"Link : ")

	if link == "!" :
		break

	codes = link.rsplit(" ")

	if len(codes) < 3 :
		print("Not enough inputs")
		continue

	first, last, dist = codes[0], codes[1], int(codes[2])

	try :
		temp[first].append((last,dist))
		temp[last].append((first,dist))

		print(f"{first} and {last} are {dist}m away!")
	except KeyError :
		print("Unkown nodes!")

for i in temp :
	nodes.append(Node(i, temp.get(i)))

imp = [x for x in temp if not(x.startswith("IND"))]

class Creature :
	def __init__(self, pos, steps, cost) :
		self.pos = pos
		self.steps = steps
		self.cost = cost

def path(start, end) :
	creatures = [Creature(start, [], 0)]

	best = -1
	step = ""

	while len(creatures) > 0 :
		c = creatures[0]

		print(end)
		print(c.pos)
		print(temp[c.pos])

		for i in temp[c.pos] :
			if i[0] in c.steps :
				print("skipped")
				continue

			print(i)

			newCost = c.cost + i[1]
			newStep = c.steps.copy()
			newStep.append(c.pos)

			if i[0] == end :
				print("reached")
				print(newStep)
				if newCost < best or best < 0 :
					best = newCost
					if len(newStep) > 1 :
						step = newStep[1]
					else :
						step = i[0]
				continue

			creatures.append(Creature(i[0], newStep, newCost))

		creatures.pop(0)

	return step

json = open("nodi.json", "w")

json.write("{\n")

for i in nodes :
	json.write('	"'+i.code+'" : {\n')
	for k in imp :
		if i.code!=k :
			json.write(f'		"{k}" : "{path(i.code, k)}",\n')
	json.write('	},\n')

json.write("}")
