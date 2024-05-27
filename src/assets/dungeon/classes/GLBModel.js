import * as THREE from 'three';
import DungeonItemBase from "@/assets/dungeon/classes/DungeonItemBase.js";

export default class GLBModel extends DungeonItemBase{
    constructor(
        model,
        animations,
        position = {x: 0, y: 0, z: 0},
        name = "default"
    ){
        super(name);
        this.model = model;
        this.animations = animations;
        this.model.position.copy(position);
        this.mixer = new THREE.AnimationMixer(this.model);
        this.name = name;
        this.currentAnimation = null;
    }

    setAnimation(animationName){
        if(this.animations){
            const targetAnimation = THREE.AnimationClip.findByName(this.animations, animationName);
            this.currentAnimation = this.mixer.clipAction(targetAnimation);
            this.currentAnimation.play();
        }
    }

    // @Override
    getMesh(){
        return this.model;
    }

    // @Override
    getPosition(){
        return this.model.position;
    }

    // @Override
    setPosition(newPosition){
        this.model.position.copy(newPosition);
    }
}