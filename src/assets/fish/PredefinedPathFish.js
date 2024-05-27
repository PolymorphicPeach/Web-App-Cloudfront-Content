import * as THREE from 'three';
import * as YUKA from 'yuka';
import Fish from "@/assets/fish/Fish.js";

export default class PredefinedPathFish extends Fish{
    constructor(
        model,
        scale = 1,
        path = [{x: 0, y: 0, z: 0}],
        maxSpeed = 1,
        onPathRadius = 0.5,
        directionChange = 0.5,
        name = "predefined path"
    ){
        super(model, scale, maxSpeed, onPathRadius, directionChange, name);

        // ---- YUKA Configuration -----
        this.path = new YUKA.Path();

        path.forEach(waypoint => {
            const {x, y, z} = waypoint;
            this.path.add(new YUKA.Vector3(x,y,z));
        });
        this.vehicle.position.copy(this.path.current());
        this.path.loop = true;

        const followPathBehavior =
            new YUKA.FollowPathBehavior(
                this.path, directionChange);

        this.vehicle.steering.add(followPathBehavior);

        const onPathBehavior = new YUKA.OnPathBehavior(this.path);
        onPathBehavior.radius = onPathRadius;
        this.vehicle.steering.add(onPathBehavior);

        this.pathlines = null;
    }

    // Optional; pathlines are never instantiated if they are never
    //  asked for.
    getPathlines(){
        if(!this.pathlines){
            const pathPositions = [];
            for(let i = 0; i < this.path._waypoints.length; ++i){
                const waypoint = this.path._waypoints[i];
                pathPositions.push(waypoint.x, waypoint.y, waypoint.z);
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(pathPositions, 3)
            );

            const material = new THREE.LineBasicMaterial({color: 0xfffff});

            this.pathlines = new THREE.LineLoop(geometry, material);
            return this.pathlines;
        }
        else{
            return this.pathlines;
        }
    }

}