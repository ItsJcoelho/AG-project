var ctx = null;
var canvas = null;

var timer = null;
window.onload = function () {
    //clear previous timers
    if (timer) window.clearInterval(timer)
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    //Game Variables
    const width = 1000;
    const height = 800;

    canvas.width = width;
    canvas.height = height;
    let hooks = []
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
    let playerX = canvas.width / 2 - playerWidth
    let playerY = canvas.height - playerHeight - groundY
    let velocityPlayer = 10
    let arrowX = canvas.width / 2
    let arrowY = playerY
    //Balls Drawing Function
    function Balls(x, y, r, vX, vY, color) {
        this.x = x
        this.y = y
        this.r = r
        this.vX = vX;
        this.vY = vY;
        this.color = color

        //update 

        this.update = function () {


            //check collisions
            if (this.x - this.r < 0 || this.x + this.r > canvas.width) {
                this.vX = -this.vX;

            }

            if (this.y - this.r < 0 || this.y + this.r > canvas.height - groundY) {
                this.vY = -this.vY;
            }


            //update
            this.x += this.vX;
            this.y += this.vY;

        }

        //draw
        this.draw = function () {
            ctx.fillStyle = this.color
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
            ctx.fill();
        }
        
    }
    function Hook(x,y) {
        this.x = x
        this.y = y
        this.distance = 0
        this.active = true
        this.draw = function () {
            ctx.beginPath()
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.distance);
            ctx.stroke()
        }
        this.update = function () {
            this.distance-=10
        }
    }
    function Level1() {
        //random angle between 0 and 360
        let grad = Math.random() * 360
        let theta = grad * Math.PI / 180;

        let vel = 7;
        //horizontal and vertical velocities
        let deltaX = vel * Math.cos(theta);
        let deltaY = vel * Math.sin(theta);

        Background()
        Player()

        balls = []
        let ball1 = new Balls(canvas.width / 2, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "red")
        
        balls.push(ball1)
        timer = window.setInterval(LevelAnimate, 1000 / 60)
        

            
        
    }
    function LevelAnimate() {
        console.log("ola")
        Background()
        Player()

        balls.forEach(ball => {
            ball.draw()
        });
        balls.forEach(ball => {
            ball.update()
        });
        hooks.forEach(hook => {
            hook.draw()
        });
        hooks.forEach(hook => {
            hook.update()
        });

    }
    //Nivel 2
    function Level2() {
        //random angle between 0 and 360
        let grad = Math.random() * 360
        let theta = grad * Math.PI / 180;

        let vel = 7;
        //horizontal and vertical velocities
        let deltaX = vel * Math.cos(theta);
        let deltaY = vel * Math.sin(theta);
        
        Background()
        Player()
        balls = []
        let ball1 = new Balls(canvas.width / 2 - canvas.width / 4, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "blue")
        balls.push(ball1)
        let ball2 = new Balls(canvas.width / 2 + canvas.width / 4, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "blue")
        balls.push(ball2)
        timer = window.setInterval(LevelAnimate, 1000 / 60)
    }
    //Nivel 3
    function Level3() {
        Background()
        Player()

        let grad = Math.random() * 360
        let theta = grad * Math.PI / 180;

        let vel = 7;
        //horizontal and vertical velocities
        let deltaX = vel * Math.cos(theta);
        let deltaY = vel * Math.sin(theta);


        balls = []
        let ball1 = new Balls(canvas.width / 2, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "green")
        balls.push(ball1)
        let ball2 = new Balls(canvas.width / 2 - canvas.width / 4, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "green")
        balls.push(ball2)
        let ball3 = new Balls(canvas.width / 2 + canvas.width / 4, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "green")
        balls.push(ball3)
        timer = window.setInterval(LevelAnimate, 1000 / 60)
    }
    //Player drawing function
    function Player() {
        window.addEventListener('keydown', KeyPress);
        ctx.fillStyle = "gold"
        ctx.fillRect(playerX, playerY, playerWidth, playerHeight)
    }
    //backG
    function Background() {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "lightgreen"
        ctx.fillRect(0, canvas.height - groundY, canvas.width, groundY)
    }
    //disparar
    function shoot() {
        console.log("sapce")
        let hook = new Hook(playerX + playerWidth/2,playerY)
        hooks.push(hook)
        console.log(hooks)
    }
    //Obter Eventos do teclado
    function KeyPress(evt) {
        switch (evt.keyCode) {
            case 37:
                playerX -= velocityPlayer;
                break;
            case 39:
                playerX += velocityPlayer;
                break;

            case 32:
                shoot();
        }
    }


    
    //timer = window.setInterval(Level1, 10)
    level1.addEventListener("click", function () {
        window.clearInterval(timer)
        
    })
    level2.addEventListener("click", function () {
        window.clearInterval(timer)
        
    })
    level3.addEventListener("click", function () {
        window.clearInterval(timer)
        
    })
    level1.addEventListener("click", Level1)
    level2.addEventListener("click", Level2)
    level3.addEventListener("click", Level3)

}