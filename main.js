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

function init () {
    P.push(new Point(ctx, [[10,10]]))
    P.push(new Point(ctx, [[10,300]]))
    P.push(new Point(ctx, [[300,300]]))
    P.push(new Point(ctx, [[300,10]]))

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
    for(let T = 0; T < 10; T=T+0.002) {
        let x = 0
        let y = 0

        let n = P.length 
        b=[]
        for(let i = 0; i < n; i++) {
            b[i] = nCi(n, i) * (Math.pow(T,i)) * (Math.pow((1-T), (n-i)) )
        }

        for(let j = 0; j < P.length; j++) {
            x += P[j].vertices[0].x * b[j]
            y += P[j].vertices[0].y * b[j]
        }

        C[t] = new Point(ctx, [[x, y]])
        C[t].draw()
    }
}



init()
window.requestAnimationFrame(update)

