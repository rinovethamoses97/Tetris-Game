class Particle{
    constructor(){
        this.rowOff=null;
        this.colOff=null;
    }
    show(r,c,color){
        stroke(0);
        fill(color[0],color[1],color[2]);
        rect((c+this.colOff)*size,(r+this.rowOff)*size,size,size);
    }
}