import Boundary from "@/assets/game/classes/Boundary.js";

export default class Sprite{
    constructor({
        image,
        direction,
        dialogue,
        position = {x: 0, y: 0},
        scale = 1,
        framesHorizontal = {max: 1},
        framesVertical = {max: 1},
        fullWidth = 128,
        fullHeight = 192,
        }){
            this.image = image;
            this.position = position;
            this.scale = scale;
            this.framesHorizontal = {...framesHorizontal, val: 0, elapsed: 0};
            this.framesVertical = {...framesVertical, val: 0, elapsed: 0};

            this.dialogue = dialogue;

            this.direction = direction;

        this.image.onload = () =>{
            this.width = this.image.width / this.framesHorizontal.max * this.scale;
            this.height = this.image.height / this.framesVertical.max * this.scale;
        }
            
        }

    draw(context){
        context.drawImage(
            this.image,
            this.image.width / this.framesHorizontal.max * this.framesHorizontal.val,
            this.image.height / this.framesVertical.max * this.direction,
            this.image.width / this.framesHorizontal.max,
            this.image.height / this.framesVertical.max,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        
        ++this.framesHorizontal.elapsed;

        if(this.framesHorizontal.elapsed % 10 === 0){
            if(this.framesHorizontal.val < this.framesHorizontal.max - 1){
                ++this.framesHorizontal.val;
            }
            else{
                this.framesHorizontal.val = 0;
            }
        }
    }

    getCollisionBox(){

        return new Boundary({
            position: {
                x: this.position.x + 5,
                y: this.position.y + 48
            },
            width: 45,
            height: 50
        })

    }
}