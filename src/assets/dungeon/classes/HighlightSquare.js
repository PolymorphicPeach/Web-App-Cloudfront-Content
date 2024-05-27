import * as THREE from 'three';

export default class HighlightSquare{
    constructor(
        width = 1,
        height = 1,
        color = 0x6ad189,
    ){
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            new THREE.MeshBasicMaterial({
                color: color,
                side: THREE.DoubleSide,
                transparent: true,
            }),
        )

        this.mesh.name = "highlightsquare";
        this.mesh.rotateX(-Math.PI / 2);
        this.mesh.position.set(0.5 * width, 0, 0.5 * height);
    }
}