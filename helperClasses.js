class Drawable {
    constructor (ctx, vertices) {
       this.ctx = ctx
       this.vertices = []
       if(Array.isArray(vertices)) {
           vertices.forEach(v => {
               let vertex = (v instanceof Victor) ? v : new Victor(v[0], v[1])
               this.vertices.push(vertex)
           })
       }
    }

    draw () { console.log('draw is called from parent')}
}

class Point extends Drawable {
    constructor(ctx, vertices = null) {
        super(ctx, vertices)
    }

    fill () {
        this.isFill = true
    }

    draw () {
        this.ctx.beginPath()
            this.ctx.arc(this.vertices[0].x,this.vertices[0].y, 5, 0, Math.PI * 2, true)
        this.ctx.closePath()
        if (this.isFill) this.ctx.fill() 
        else this.ctx.stroke();        
    }
}

class Line extends Drawable {
    constructor(ctx, points) {
        let _vertices = []
        if(Array.isArray(points)) {
            points.forEach(point => {
                _vertices.push(point.vertices[0])
            })
        }
        super (ctx, _vertices)
    }

    draw () {
        this.ctx.beginPath()
            this.ctx.moveTo(this.vertices[0].x,this.vertices[0].y)
            this.ctx.lineTo(this.vertices[1].x,this.vertices[1].y)
        this.ctx.closePath()
        ctx.stroke();
    }
}