import * as THREE from 'three';

export default class Floor{
    constructor({
        width = 20,
        height = 20
    }){
        // Allows getting child objects
        // this.group is what should be manipulating when implementing animations
        this.group = new THREE.Group();
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                visible: false
            })
        );
        mesh.rotateX(-Math.PI / 2);
        mesh.name = "floorPlane"
        this.group.add(mesh);

        const grid = new THREE.GridHelper(width, height);
        this.group.add(grid);

    }
}