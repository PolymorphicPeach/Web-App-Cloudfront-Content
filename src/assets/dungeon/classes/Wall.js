import * as THREE from 'three';
import DungeonItemBase from "@/assets/dungeon/classes/DungeonItemBase.js";

export default class Wall extends DungeonItemBase{
    constructor(
            geometry = new THREE.BoxGeometry(1,1,1),
            material = new THREE.MeshBasicMaterial({
                color: 0x13DFE2,
                side: THREE.DoubleSide,
            }),
            name = "wall",
    ){
        super(name);

        this.mesh = new THREE.Mesh(
            geometry,
            material,
        )
    }

    // @Override
    getMesh(){
        return this.mesh;
    }

    // @Override
    getPosition(){
        return this.mesh.position;
    }

    // @Override
    setPosition(newPosition){
        this.mesh.position.copy(newPosition);
    }
}