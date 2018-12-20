let timer

window.onload = function () {
    var context = document.getElementById("myCanvas");
    var ctx = context.getContext("2d");
    //Game Variables
    context.width = 1000;
    context.height = 800;
    let balls = []
    let raioBig = 100
    let raioMedium = 40
    let raioSmall = 10
    let level1 = document.getElementById("level1")
    let level2 = document.getElementById("level2")
    let level3 = document.getElementById("level3")
    let playerWidth = 40
    let playerHeight = 40
    let groundY = 15
    let playerX = context.width/2 - playerWidth
    let playerY = context.height - playerHeight - groundY
    let velocityPlayer = 10
    let arrowX = context.width/2
    let arrowY = playerY
    //Balls Drawing Function
    function Balls(x,y,radius,color){
        this.x = x
        this.y = y 
        this.radius = radius
        this.color = color

        this.draw = function() {
            ctx.fillStyle = this.color
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius , 0, 2 * Math.PI)
            ctx.fill();
        }
    //Nivel 1
    }
    function Level1() {
        Background()
        Player()
        balls = []
        let ball1 = new Balls(context.width/2,context.height/2-context.height/3,raioBig,"red")
        let ball2 = new Balls()
        balls.push(ball1)
        ball1.draw()
    }
    //Nivel 2
    function Level2() {
        Background()
        Player()
        balls = []
        let ball1 = new Balls(context.width/2-context.width/4,context.height/2-context.height/3,raioBig,"blue")
        balls.push(ball1)
        let ball2 = new Balls(context.width/2+context.width/4,context.height/2-context.height/3,raioBig,"blue")
        balls.push(ball2)
        balls.forEach(ball => {
            ball.draw()
        });
    }
    //Nivel 3
    function Level3() {
        Background()
        Player()
        balls = []
        let ball1 = new Balls(context.width/2,context.height/2-context.height/3,raioBig,"green")
        balls.push(ball1)
        let ball2 = new Balls(context.width/2-context.width/4,context.height/2-context.height/3,raioBig,"green")
        balls.push(ball2)
        let ball3 = new Balls(context.width/2+context.width/4,context.height/2-context.height/3,raioBig,"green")
        balls.push(ball3)
        balls.forEach(ball => {
            ball.draw()
        });
    }
    //Player drawing function
    function Player() {
        window.addEventListener('keydown', KeyPress);
        ctx.fillStyle = "gold"
        ctx.fillRect(playerX,playerY,playerWidth,playerHeight)
    }
    //backG
    function Background() {
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,context.width,context.height)
        ctx.fillStyle = "lightgreen"
        ctx.fillRect(0,context.height-groundY,context.width,groundY)
    }
    //Obter Eventos do teclado
    function KeyPress(evt) {
        switch (evt.keyCode) {
        case 37:
            playerX-=velocityPlayer; 
            break;
        case 39:
            playerX+=velocityPlayer; 
            break;
    }}

    level1.addEventListener("click",Level1)
    level2.addEventListener("click",Level2)
    level3.addEventListener("click",Level3)
    timer = window.setInterval(Level1,10)
    level1.addEventListener("click",function() {
        window.clearInterval(timer)
        timer = window.setInterval(Level1,1000/60)
    })
    level2.addEventListener("click",function() {
        window.clearInterval(timer)
        timer = window.setInterval(Level2,1000/60)
    })
    level3.addEventListener("click",function() {
        window.clearInterval(timer)
        timer = window.setInterval(Level3,1000/60)
    })

}