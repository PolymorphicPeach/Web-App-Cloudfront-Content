import * as THREE from 'three';
import * as YUKA from 'yuka';
import Fish from "@/assets/fish/Fish.js";

export default class SeekingFish extends Fish{
    constructor(
        model,
        scale = 1,
        maxSpeed = 1,
        onPathRadius = 0.5,
        directionChange = 0.5,
        name = "seeking",
        target = null,
    ){
        super(model, scale, maxSpeed, onPathRadius, directionChange, name);
        this.vehicle.position.set(0, 1, 20);

        this.seekBehavior = null;
        if(target){
            const seekBehavior = new YUKA.ArriveBehavior(target.position, 3, 1);
            this.vehicle.steering.add(seekBehavior);
        }


    }


    setTarget(target){

    }

}