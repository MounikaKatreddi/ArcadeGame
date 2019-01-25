// Enemies our player must avoid
let Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
     this.x=x;
     this.y=y;
     this.speed=speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
let scoreBoard=0;
let lifes=3;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=this.speed*dt;
    if(this.x>510)
    {
        this.x=-50;
        this.speed=100+Math.floor(Math.random()*220);
    }//below logic is for if player touch the enemy in game 
    //the player return back to Grass and he loss one life 
    //every time he loss his lifes when  touch the enemy
    //lifes=0 the Game is Over and lifes are reset to 3
    //and reset the score also and then we restart the Game
    if(player.x <= this.x+70 && 
        player.x+70 >= this.x &&   
        player.y < this.y+80&&
        30+player.y > this.y)
    {
        player.x=220;
        player.y=410;
        if(lifes<=3&& lifes>=0)
        {
          if(lifes===0)
          {
            lifes=4;
          }
        }
         lifes--;
         if(lifes==2)
         {
            alert("you have  two more lifes");
         }
         if(lifes==1)
         {
            alert("you have only one more lifes");
         }
        if(lifes===0)
        {  
          alert("Game Over");
          
          lifes=3;
          scoreBoard=0;
          if(lifes==3){
            alert("Game Re-start");
           }     
        }
    }
    document.getElementById('life').innerText=lifes;
    document.getElementById('score').innerText=scoreBoard;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player=function(x,y,speed){
    //player image
    this.x=x;
    this.y=y;
    this.speed;
    this.sprite='images/char-boy.png';

};

Player.prototype.update=function(){//player update function we imagine that arcade is x&y cordinates then
    //player goes less than 0 in both axis we set into 
    //if x-cordinate lessthan 0  then set x=0
    //if y-cordinate lessthan 0 then set x=120 & y=380 in that time
    //player can reach the water then we increse the score
    //y-cordinate greater than 380 we set into 380
    //likewise x-cordinate greater than 400 we set into 400
    if(this.x<0)
    {
        this.x=0;
    }
    if(this.y<0)
    {
       this.x=120;
       this.y=380;
       scoreBoard+=10;
       document.getElementById('score').innerText=scoreBoard;
    }
    if(this.y>380)
    {
     this.y=380;
    }
     if(this.x>400)
    {
      this.x=400;
    }
}

player = new Player(200,380,50);//this is the player x-cordinate,y-cordinate and speed
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput=function(eventKeys){
    switch(eventKeys){
        case 'left':
        this.x-=50;
        break;
        case 'right':
        this.x+=50;
        break;
        case 'up':
        this.y-=50;
        break;
        case 'down':
        this.y+=50;
        break;
    }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[];
var enemyPosition=[40,120,230];
     enemyPosition.forEach(function(position){
        enemy=new Enemy(0,position,150*Math.floor(Math.random()*230));
    allEnemies.push(enemy);
    

});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
