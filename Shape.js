class Shape{
    constructor(shapeConfig){
        this.particles=[];
        this.row=-4;
        this.rotationIndex=0;
        this.shapeConfig=shapeConfig;
        this.noOfParticles=4;
        this.speed=1;
        for(let i=0;i<this.noOfParticles;i++){
            this.particles.push(new Particle());
        }
        for(let i in this.particles){
            this.particles[i].rowOff=this.shapeConfig[this.rotationIndex][i][0];
            this.particles[i].colOff=this.shapeConfig[this.rotationIndex][i][1];
        }
        this.col=floor(random(0,cols-4));
        this.done=false;
        this.color=[floor(random(255)),floor(random(255)),floor(random(255))];
    }
    setParticles(){
        for(let i in this.particles){
            this.particles[i].rowOff=this.shapeConfig[this.rotationIndex][i][0];
            this.particles[i].colOff=this.shapeConfig[this.rotationIndex][i][1]
        }
        if(this.col+this.getMaxColOffset()>=cols){
            this.col=this.col-(this.col+this.getMaxColOffset()-cols+1);
        }
        if(this.col+this.getMinColOffset()<0){
            this.col=this.col+(0-this.col);
        }
    }
    getMaxColOffset(){
        let max=0;
        for(let i in this.particles){
            if(this.particles[i].colOff>max){
                max=this.particles[i].colOff;
            }
        }
        return max;
    }
    getMinColOffset(){
        let min=3;
        for(let i in this.particles){
            if(this.particles[i].colOff<min){
                min=this.particles[i].colOff;
            }
        }
        return min;
    }
    getMaxRowOffset(){
        let max=0;
        for(let i in this.particles){
            if(this.particles[i].rowOff>max){
                max=this.particles[i].rowOff;
            }
        }
        return max;
    }
    getLowestParticles(){
        let lowestParticles=[];
        for(let i=0;i<this.particles.length;i++){
            let lowest=true;
            for(let j=0;j<this.particles.length;j++){
                if(this.particles[j]!=this.particles[i]){
                    if(this.particles[j].rowOff==this.particles[i].rowOff+1 && this.particles[i].colOff==this.particles[j].colOff){
                        lowest=false;
                        break;
                    }
                }
            }
            if(lowest){
                lowestParticles.push(this.particles[i]);
            }
        }
        return lowestParticles;
    }
    isSettled(shapes){
        for(let i in this.particles){
            let r=this.particles[i].rowOff+this.row+1;
            let c=this.particles[i].colOff+this.col;
            for(let j in shapes){
                if(shapes[j]!=this){        
                    for(let x in shapes[j].particles){
                        if(shapes[j].particles[x].rowOff+shapes[j].row==r && shapes[j].particles[x].colOff+shapes[j].col==c){
                            return true;
                        }
                    }
                }
            }
        }
        for(let i in this.particles){
            if(this.particles[i].rowOff+this.row==rows-1){
                return true;
            }
        }
        return false
    }
    update(){
        this.row+=this.speed;
    }
    moveLeft(){
        if(!this.collumOverlapCheck(-1) && (this.col-1+this.getMinColOffset())>=0)
            this.col-=1;   
    } 
    collumOverlapCheck(dir){
        for(let i in this.particles){
            let r=this.particles[i].rowOff+this.row;
            let c=this.particles[i].colOff+this.col+dir;
            for(let j in shapes){
                if(shapes[j]!=this){        
                    for(let x in shapes[j].particles){
                        if(shapes[j].particles[x].rowOff+shapes[j].row==r && shapes[j].particles[x].colOff+shapes[j].col==c){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    moveRight(){
        if(!this.collumOverlapCheck(1) && (this.getMaxColOffset()+this.col+1)<cols)
            this.col+=1;   
    }
    moveDown(shapes){
        let lowestParticles=this.getLowestParticles();
        let par=null;
        let targetRow=rows-1;
        let dist=targetRow-(this.row+this.getMaxRowOffset());
        for(let i in lowestParticles){
            let c=this.col+lowestParticles[i].colOff;  
            for(let x in shapes){
                for(let y in shapes[x].particles){
                    if(shapes[x].particles[y].colOff+shapes[x].col==c && shapes[x].done){
                        if((shapes[x].particles[y].rowOff+shapes[x].row)-(lowestParticles[i].rowOff+this.row+1)<dist){
                            targetRow=shapes[x].particles[y].rowOff+shapes[x].row-1;
                            dist=(shapes[x].particles[y].rowOff+shapes[x].row)-(lowestParticles[i].rowOff+this.row+1);
                            par=lowestParticles[i];
                        }    
                    }
                }
            }
        }
        if(par==null)
            this.row=targetRow-this.getMaxRowOffset();
        else
            this.row=targetRow-par.rowOff;
        this.done=true;
    }
    show(){
        for(let i in this.particles){
            this.particles[i].show(this.row,this.col,this.color);
        }
    }
    rotate(){
        this.rotationIndex=(this.rotationIndex+1)%4;
        this.setParticles();
    }
}