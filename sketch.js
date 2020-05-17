var rball,database,position;

function setup(){
    createCanvas(500,500);
    rball = createSprite(250,250,10,10);
    rball.shapeColor = "red";
    database = firebase.database();
    var ballpos = database.ref('ball/position');
    ballpos.on("value",readpos,error)
}
function readpos(data){
position = data.val();
rball.x = position.x;
rball.y = position.y;
}
function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
   database.ref('ball/position').set({
       'x':position.x + x,
       'y':position.y + y
   })
}
function error(){
    console.log("Sorry, the position is not readable.")
}
