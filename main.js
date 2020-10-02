console.log('hello world')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width= 1000
canvas.height = 1000
let t = 0

// P = (1-t)P0 + tP1

ctx.fillStyle='green'
// let linePoints = []
// let lines = []

let P = [] // points
let b = [] // Bernstein polynomials
let C = []

let down = false
let selected = false

function getPc(p,t) {
    // console.log('x1:',Math.pow((1-t),3) )
    let x = Math.pow((1-t),3)* p[0].vertices[0].x + 3*t*Math.pow((1-t),2)* p[1].vertices[0].x + 3*Math.pow(t,2)*(1-t)*p[2].vertices[0].x + Math.pow(t,3)*p[3].vertices[0].x
    let y = Math.pow((1-t),3)* p[0].vertices[0].y + 3*t*Math.pow((1-t),2)* p[1].vertices[0].y + 3*Math.pow(t,2)*(1-t)*p[2].vertices[0].y + Math.pow(t,3)*p[3].vertices[0].y
    return new Point(ctx,[[x,y]])
}

function init () {
    ctx.font = "30px Arial";
    P.push(new Point(ctx, [[10,10]]))       
    P.push(new Point(ctx, [[10,100]]))
    P.push(new Point(ctx, [[100,100]]))
    P.push(new Point(ctx, [[100,10]]))
    P.push(new Point(ctx, [[150,10]]))

    canvas.addEventListener('mousedown', function (e) {
         down = true
         let found = false
         P.forEach( (p, i) => {
             let x = p.vertices[0].x
             let y = p.vertices[0].y
             if (e.pageX < (x + 15) && e.pageX > (x - 15) && e.pageY < (y + 15) && e.pageY > (y - 15) ) {
                 if(!found) {
                     found = true
                     selected = i
                 }
             }
         })
    })
    canvas.addEventListener('mouseup', function (e) {
         down = false
    })
    canvas.addEventListener('mousemove', function (e) {
        if ( down ) {
            
             window.requestAnimationFrame(update)
            P[selected].vertices[0].x = e.pageX
            P[selected].vertices[0].y = e.pageY
        }
    })   

}

function update() {
    
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    P.forEach(p => {
        p.dragable()
        p.fill() 
        p.draw()
    })
    for(let T = 0; T < 1; T=T+0.0025) {
        let x = 0
        let y = 0

        let n = P.length 
        b=[]
        for(let i = 0; i < n; i++) {
            b[i] = nCi(n - 1, i) * (Math.pow(T,i)) * (Math.pow((1-T), (n - 1 - i)) )
            x += P[i].vertices[0].x * b[i]
            // if(i === 0) console.log('xx1',b[i], n-i)
            y += P[i].vertices[0].y * b[i]
        }

        let c = new Point(ctx, [[x, y]])
        // c = getPc(P,T)
        // console.log(c.vertices[0].x,c.vertices[0].y, x,y )
        c.draw()
    }
    // console.log(C)
}



init()
update()
// window.requestAnimationFrame(update)

