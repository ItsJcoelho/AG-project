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
    let lifes = 5
    let hooks = []
    let balls = []
    let raioBig = 100
    let raioMedium = 50
    let raioSmall = 25
    let level1 = document.getElementById("level1")
    let level2 = document.getElementById("level2")
    let level3 = document.getElementById("level3")
    let lifesHtml = document.getElementById("vidas")
    let playerWidth = 50
    let playerHeight = 20
    let groundY = 15
    let playerX = canvas.width / 2 - playerWidth
    let playerY = canvas.height - playerHeight - groundY
    let velocityPlayer = 10
    let arrowX = canvas.width / 2
    let arrowY = playerY
    let arrowCorfirm = true
    
    //Balls Drawing Function

    function Balls(x, y, r, vX, vY, color, type) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vX = vX;
        this.vY = vY;
        this.color = color;
        this.active = true;
        this.type = type;

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

        };

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
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.distance);
            ctx.stroke()
        }
        this.update = function () {
            this.distance-=10
            if(this.y + this.distance <= 0){
                this.active = false
            }
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
        lifes = 5
        Background()
        Player()

        balls = []
        let ball1 = new Balls(canvas.width / 2, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "red","big")
        
        balls.push(ball1)
        timer = window.setInterval(LevelAnimate, 1000 / 60)
        

            
        
    }
    function LevelAnimate() {
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
        eliminateHarpoon()
        for (let i = 0; i < balls.length; i++) {
            if(!balls[i].active){
                balls.splice(i,1)
            }
        }
        for (let i = 0; i < hooks.length; i++) {
            for (let j = 0; j < balls.length; j++) {
                let calc = Math.sqrt(Math.pow(hooks[i].x - balls[j].x,2)+Math.pow((hooks[i].y+hooks[i].distance) - balls[j].y,2))
                if(calc <= raioBig && balls[j].type == "big"){
                    
                    //let newBall2 = new Balls(balls[j].x, balls[j].y, raioMedium, balls[j].vX, balls[j].vY, balls[j.color])
                    balls.push(new Balls(balls[j].x, balls[j].y, raioMedium, - balls[j].vX, balls[j].vY, balls[j].color,"medium"))
                    //balls.push(newBall2)
                    //balls[j].active = false
                    balls[j].r = raioMedium
                    balls[j].type = "medium"
                    hooks[i].active = false
                    eliminateHarpoon()
                 }
                if(calc <= raioMedium && balls[j].type == "medium"){
                    balls.push(new Balls(balls[j].x, balls[j].y, raioSmall, - balls[j].vX, balls[j].vY, balls[j].color,"small"))
                    balls[j].r = raioSmall
                    balls[j].type = "small"
                    hooks[i].active = false
                    eliminateHarpoon()
                }
                if(calc <= raioSmall && balls[j].type == "small"){
                    console.log("colidiu3")
                    hooks[i].active = false
                    balls[j].active = false
                    
                }
                
            }
            
        }
        for (let i = 0; i < balls.length; i++) {
            if (balls[i].x >= playerX && balls[i].x <= playerX + playerWidth) {
                console.log(lifes)
                if (balls[i].y + balls[i].r >= playerY) {
                    balls[i].vY = - balls[i].vY
                    lifes--
                }
            }
            
        }
        
        if(lifes == 0){
            GameOver()
        }
        lifesHtml.innerHTML = `Vidas: ${lifes}`

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
        lifes = 5
        Background()
        Player()
        balls = []
        let ball1 = new Balls(canvas.width / 2 - canvas.width / 4, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "blue","big")
        balls.push(ball1)
        let ball2 = new Balls(canvas.width / 2 + canvas.width / 4, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "blue","big")
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
        lifes = 5

        balls = []
        let ball1 = new Balls(canvas.width / 2, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "green","big")
        balls.push(ball1)
        let ball2 = new Balls(canvas.width / 2 - canvas.width / 4, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "green","big")
        balls.push(ball2)
        let ball3 = new Balls(canvas.width / 2 + canvas.width / 4, canvas.height / 2 - canvas.height / 3, raioBig, deltaX, deltaY, "green","big")
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
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "lightgreen"
        ctx.fillRect(0, canvas.height - groundY, canvas.width, groundY)
    }
    //disparar
    function shoot() {
        if(arrowCorfirm){
            let hook = new Hook(playerX + playerWidth/2,playerY)
            hooks.push(hook)
            arrowCorfirm = false
        }
    }
    function eliminateHarpoon() {
        for (let i = 0; i < hooks.length; i++) {
            if(!hooks[i].active){
                hooks.splice(i,1)
                arrowCorfirm = true
            }
            
        }
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
    function GameOver() {
        window.clearInterval(timer)
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
        ctx.fillText("Click on the level to restart", canvas.width/2, canvas.height/2+40);
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