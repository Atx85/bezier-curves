console.log('hello world')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width= 1000
canvas.height = 1000
let t = 0

// P = (1-t)P0 + tP1

ctx.fillStyle='green'
let linePoints = []
let lines = []

function init () {
    linePoints[0] = []
    linePoints[1] = []
    linePoints[0].push( new Point(ctx, [[10,300]]))
    linePoints[0].push( new Point(ctx, [[300,300]]))
    linePoints[1].push( new Point(ctx, [[300,300]]))
    linePoints[1].push( new Point(ctx, [[300,10]]))

    lines.push(new Line(ctx, linePoints[0]))
    lines.push(new Line(ctx, linePoints[1]))
}

function update(T) {
    let newLines = [];
    for(let i = T; i >= 0; i--) {
        t = (T - i) / T
        console.log(t)
   
        lines.forEach( (line, index) => {
            if(lines.length > index + 1) {
                let points = []
                let x = lines[index].vertices[0].x * (1-t) + lines[index].vertices[1].x * (t)
                let y = lines[index].vertices[0].y * (1-t) + lines[index].vertices[1].y * (t)
                let p1 = new Point(ctx,[[x,y]])   
                p1.fill()
                p1.draw() 
                x = lines[index + 1].vertices[0].x * (1-t) +lines[index + 1].vertices[1].x * (t)
                y = lines[index + 1].vertices[0].y * (1-t) +lines[index + 1].vertices[1].y * (t)
                let p2 = new Point(ctx,[[x,y]]) 
                p2.fill()
                p2.draw()
                let l = new Line(ctx, [p1, p2])
                newLines.push(new Line(ctx, [p1, p2])) 
            }
        })

        lines.forEach(l => l.draw())
        linePoints.forEach(line => line.forEach(p => p.draw()))
    }

    newLines.forEach((line, index) => {
        line.draw()
        if(lines.length > index + 1) {            

            console.log([[line.vertices[1].x - line.vertices[0].x, line.vertices[1].y - line.vertices[0].y]])
            let vx = line.vertices[1].x - line.vertices[0].x
            let vy = line.vertices[1].y - line.vertices[0].y

            let v = new Point(ctx, [[vx, vy]])
            // v2x - v1y = v2x1 - v1y1
            // y = (v2x1 - v1y1 - v2x) / v1 => ((v2x1 - v1y1) / v1) - ((v2/v1)x)
            // ax + c = bx + d
            let a = v.vertices[0].y / v.vertices[0].x
            let c = (v.vertices[0].y * line.vertices[0].x - v.vertices[0].x * line.vertices[0].y) / v.vertices[0].x
            
            line = newLines[index+1]
            v = new Point(ctx, [[line.vertices[1].x - line.vertices[0].x, line.vertices[1].y - line.vertices[0].y]])
            let b = v.vertices[0].y / v.vertices[0].x
            let d = (v.vertices[0].y * line.vertices[0].x - v.vertices[0].x * line.vertices[0].y) / v.vertices[0].x
            
            let x = (b - c) / (a - b)
            let y = a * ((d - c)/(a - b)) + c
            console.log(x,y)
            let p = new Point(ctx, [[x,y]])
            p.fill()
            p.draw()
        }
    })
    console.log(newLines.length)
}


init()
update(10)

