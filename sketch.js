let rows;
let cols;
let size=20;
let lineConfig=[[[0,1],[1,1],[2,1],[3,1]]   , [[1,0],[1,1],[1,2],[1,3]],  [[0,2],[1,2],[2,2],[3,2]],  [[2,0],[2,1],[2,2],[2,3]]];
let TeeConfig=[[[0,1],[1,0],[1,1],[1,2]]   , [[0,1],[1,1],[1,2],[2,1]],  [[1,0],[1,1],[1,2],[2,1]],  [[0,1],[1,0],[1,1],[2,1]]];
let SquareConfig=[[[1,1],[1,2],[2,1],[2,2]]   , [[1,1],[1,2],[2,1],[2,2]],  [[1,1],[1,2],[2,1],[2,2]],  [[1,1],[1,2],[2,1],[2,2]]];
let LConfig=[[[0,0],[0,1],[1,1],[2,1]]   , [[0,2],[1,0],[1,1],[1,2]],  [[0,1],[1,1],[2,1],[2,2]],  [[1,0],[1,1],[1,2],[2,0]]];
let JConfig=[[[0,1],[0,2],[1,1],[2,1]]   , [[1,0],[1,1],[1,2],[2,2]],  [[0,1],[1,1],[2,0],[2,1]],  [[0,0],[1,0],[1,1],[1,2]]];
let ZConfig=[[[0,1],[1,0],[1,1],[2,0]]   , [[0,0],[0,1],[1,1],[1,2]],  [[0,2],[1,1],[1,2],[2,1]],  [[1,0],[1,1],[2,1],[2,2]]];
let SConfig=[[[0,0],[1,0],[1,1],[2,1]]   , [[0,1],[0,2],[1,0],[1,1]],  [[0,1],[1,1],[1,2],[2,2]],  [[1,1],[1,2],[2,0],[2,1]]];
let configs=[lineConfig,TeeConfig,SquareConfig,LConfig,JConfig,ZConfig,SConfig];
let shapes=[];
let cells=[];
function setup(){
    createCanvas(500,600);
    rows=height/size;
    cols=width/size;
    shapes.push(new Shape(configs[floor(random(configs.length))]));
    for(let i=0;i<rows;i++){
        let row=[];
        for(let j=0;j<cols;j++){
            row.push(0);
        }
        cells.push(row);
    }
}
function draw(){
    background(0);
    if(shapes[shapes.length-1].done){
        floorClear();
        shapes.push(new Shape(configs[floor(random(configs.length))]));
    }
    for(let i in shapes){
        if(!shapes[i].done && frameCount%13==0)
            shapes[i].update();
        if(shapes[i].isSettled(shapes)){
            shapes[i].done=true;
        }
        else{
            shapes[i].done=false;
        }
        shapes[i].show();
    }
    if(isGameOver()){
        alert("Game Over!!!");
        noLoop();
    }
}
function keyPressed(){
    if(keyCode==32){
        shapes[shapes.length-1].rotate();
    }
    if(keyCode==37){
        shapes[shapes.length-1].moveLeft();
    }
    if(keyCode==39){
        shapes[shapes.length-1].moveRight();
    }
    if(keyCode==40){
        shapes[shapes.length-1].moveDown(shapes);
    }
}
function floorClear(){
    for(let i=0;i<rows;i++){
        let count=0;
        for(let j=0;j<cols;j++){
            for(let x in shapes){
                for(y in shapes[x].particles){
                    if(shapes[x].particles[y].rowOff+shapes[x].row==i && shapes[x].particles[y].colOff+shapes[x].col==j){
                        count++;
                    }
                } 
            }            
        }
        if(count==cols){
            for(let x in shapes){
                for(y=shapes[x].particles.length-1;y>=0;y--){
                    if(shapes[x].particles[y].rowOff+shapes[x].row==i){
                        shapes[x].particles.splice(y,1);
                    }
                }
            }
        } 
    }
    for(let x=shapes.length-1;x>=0;x--){
        if(shapes[x].particles.length==0){
            shapes.splice(x,1);
        }
    }
}
function isGameOver(){
    for(let i in shapes){
        for(j in shapes[i].particles){
            if(shapes[i].particles[j].rowOff+shapes[i].row<0 && shapes[i].done){
                return true;
            }
        }
    }
    return false;
}