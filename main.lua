function love.load()

	screen = love.graphics

	immagine = screen.newImage("ospedale.jpeg")

	width, height = immagine:getWidth(), immagine:getHeight()
	width, height = math.min(600, width), math.min(600, height)

	print = screen.print
	circ  = screen.circle
	rect  = screen.rectangle

	font  = screen.newFont(20)
	screen.setFont(font)

	print = screen.print

	spr   = screen.draw

	love.window.setMode(width,height)
	love.window.setTitle("DaVinci4.0 GUI")

	tint = screen.setColor

	line = screen.line

	nodes = {}
	cons = {}

	startNode = 0
	selectNode = 0

	nodeSize = 10

	offset = {x = 0, y = 0}
	last = {x = 0, y = 0}

	input = ""

	nameless = 1
end

function love.mousepressed(x,y,button,istouch,presses)

	if x < font:getWidth("Solve") and y < font:getHeight("Solve") then
		return
	end

	minDist = -1
	minIdx = 0
	for i = 1, #nodes do
		n = nodes[i]
		dx, dy = x - (n.x + offset.x), y - (n.y + offset.y)
		dist = math.sqrt(dx ^ 2 + dy ^ 2)
		if (dist < minDist or minDist < 0) and dist < nodeSize + 20 then
			minDist = dist
			minIdx = i
		end
	end
	if button == 1 then
		if presses > 1 and minIdx > 0 then
			n = nodes[minIdx]

			for i = 1, #n.cn do
				l = nodes[n.cn[i]]
				for k = #l.cn, 1, -1 do
					if l.cn[k] == minIdx then
						table.remove(l.cn, k)
					end
				end
			end
			n.isActive = false
		elseif minIdx > 0 then
			if selectNode == 0 then
				selectNode = minIdx
			else
				selectNode = 0
			end
		else
			input = ""
			nodes[#nodes+1] = {
				x = (x - offset.x),
				y = (y - offset.y),
				cn = {},
				isActive = true,
				name = "",
			}
			cons[#cons + 1] = {}
		end
	elseif button == 2 then
		selectNode = 0
		if minIdx > 0 then
			if startNode == 0 then
				startNode = minIdx
			else
				first = nodes[startNode].cn
				second = nodes[minIdx].cn

				remove = false

				for i = 1, #first do
					if first[i] == minIdx then
						table.remove(first, i)
						remove = true
						break
					end
				end

				if remove then
					for i = 1, #cons[startNode] do
						if cons[startNode][i] == minIdx then
							table.remove(cons[startNode], i)
							break
						end
					end

					for i = 1, #second do
						if second[i] == startNode then
							table.remove(second, i)
							break
						end
					end
				else
					first[#first+1] = minIdx
					second[#second+1] = startNode
					cons[startNode][#cons[startNode] + 1] = minIdx
				end

				startNode = 0
			end
		end
	end
end

function love.textinput(letter)
	input = input .. letter
end

function love.draw()

	mx, my = love.mouse.getPosition()

	if love.mouse.isDown(3) then
		dx = mx - last.x
		dy = my - last.y
		offset.x = offset.x + dx
		offset.y = offset.y + dy
	end

	last = {x = mx, y = my}

	spr(immagine, offset.x, offset.y)

	for i = 1, #nodes do
		n = nodes[i]

		if i < #nodes and n.name == "" then
			n.name = "IND-" .. nameless
			nameless = nameless + 1
		end

		if n.isActive then
			for k = 1, #n.cn do
				l = nodes[n.cn[k]]
				line(n.x + offset.x, n.y + offset.y, l.x + offset.x, l.y + offset.y)
				dx, dy = n.x - l.x, n.y - l.y
				dist = math.floor(math.sqrt(dx ^ 2 + dy ^ 2) + .5)

				midx, midy = (n.x + l.x - font:getWidth(dist)/2) / 2, (n.y + l.y - font:getHeight(dist)/2) / 2

				tint(0, 0, 0)
				print(dist, midx + offset.x, midy + offset.y, 0, .5)
				tint(1, 1, 1)
			end

			if i == selectNode then
				if love.mouse.isDown(1) then
					tint(1, .5, 0)
					n.x, n.y = love.mouse.getPosition()
					n.x = n.x - offset.x
					n.y = n.y - offset.y
				else
					selectNode = 0
				end
			end

			if i == startNode then
				tint(1, 0, 0)
			end

			circ("fill", n.x + offset.x, n.y + offset.y, nodeSize)
			tint(0, 0, 0)
			print(n.name, n.x - font:getWidth(n.name)/2 + offset.x, n.y + nodeSize + offset.y)
			tint(1, 1, 1)
		end
	end

	if #nodes > 0 then
		nodes[#nodes].name = input
	end

	if love.keyboard.isDown("backspace") then
		input = ""
	end

	if mx < font:getWidth("Solve") and my < font:getHeight("Solve") then
		tint(1, 1, 0)
		if love.mouse.isDown(1) then
			Solve()
		end
	end

	rect("fill", 0, 0, font:getWidth("Solve"), font:getHeight("Solve"))
	tint(0, 0, 0)
	print("Solve", 0, 0)
	tint(1, 1, 1)
end

function Solve()

	file = io.open("input.txt","w")

	io.output(file)

	for i = 1, #nodes do
		n = nodes[i]

		if n.isActive then
			io.write(n.name .. "\n")
		end
	end

	io.write("!\n")

	for i = 1, #cons do
		n = nodes[i]

		if n.isActive then
			for k = 1, #cons[i] do
				l = nodes[cons[i][k]]

				if l.isActive then
					dx, dy = n.x - l.x, n.y - l.y
					dist = math.floor(math.sqrt(dx ^ 2 + dy ^ 2) + .5)

					io.write(n.name .. " " .. l.name .. " " .. dist .. "\n")
				end
			end
		end
	end

	io.write("!\n")
	io.write("hello, you'll never see me :)")

	io.close(file)

	os.execute("python builder.py input.txt")
end

