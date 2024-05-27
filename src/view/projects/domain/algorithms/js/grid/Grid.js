import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
export default class Grid{
    constructor(
        size = 20,
        sleepTime = 500
    )
    {
        this.size = size;
        this.sleepTime = sleepTime;
        this.busy = false;
        this.gridGroup = new THREE.Group();
        this.permGroup = new THREE.Group();
        this.tempGroup = new THREE.Group();
        this.startPlacement = null;
        this.goalPlacement = null;
        this.cells = new Map();
        this.font = null;

        const fontLoader = new FontLoader();
        fontLoader.load("/fonts/droid_serif_regular.typeface.json",
            (font) => {
                this.font = font;
            }, undefined, (error) => {
            console.error("Grid could not load font");
        });

        const gridMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(size, size),
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                visible: false
            })
        );
        gridMesh.name = "gridMesh";
        gridMesh.rotateX(-Math.PI / 2);
        this.gridGroup.add(gridMesh);

        this.gridHelper = new THREE.GridHelper(size, size);

        for(let i = 0; i < this.size; ++i){
            for(let j = 0; j < this.size; ++j){
                this.cells.set(`${j},${i}`, 0);
            }
        }

        this.gridGroup.add(this.gridHelper);
    }
    // ======================================================================================================
    //                          Information
    // ======================================================================================================
    spaceOccupied(cellCoordinates){
        return this.cells.get(cellCoordinates) !== 0;
    }

    // ======================================================================================================
    //                          Conversions
    // ======================================================================================================
    worldToPlacement_coordinateConversion(intersectionPoint){
        const coords = new THREE.Vector3()
            .copy(intersectionPoint)
            .floor()
            .addScalar(0.5);
        coords.y = 0.5
        return coords;
    }

    worldToCell_coordinateConversion(intersectionPoint){
        const coords = this.worldToPlacement_coordinateConversion(intersectionPoint);
        coords.x = Math.round(coords.x + this.size / 2 - 1);
        coords.z = Math.round(coords.z + this.size / 2 - 1);
        return `${coords.x},${coords.z}`;
    }

    // ======================================================================================================
    //                                Deleting
    // ======================================================================================================
    deleteTempPlacements(){
        this.busy = false;

        this.tempGroup.children.forEach(child => {
            if(child.geometry){
                child.geometry.dispose();
            }
            if(child.material){
                if(Array.isArray(child.material)){
                    child.material.forEach(material => material.dispose());
                }
                else{
                    child.material.dispose();
                }
            }
            if(child.material && child.material.map){
                child.material.map.dispose();
            }
        });

        this.tempGroup.clear();
    }

    deletePermPlacements(){
        // ==== Return if busy =====
        if(this.busy){
            return;
        }

        this.permGroup.children.forEach(child => {
            if(child.geometry){
                child.geometry.dispose();
            }
            if(child.material){
                if(Array.isArray(child.material)){
                    child.material.forEach(material => material.dispose());
                }
                else{
                    child.material.dispose();
                }
            }
            if(child.material && child.material.map){
                child.material.map.dispose();
            }
        });

        this.startPlacement = null;
        this.goalPlacement = null;
        this.permGroup.clear();

        for(const key of this.cells.keys()){
            this.cells.set(key, 0);
        }
    }

    // ======================================================================================================
    //                          "Permanent" Placements
    // ======================================================================================================
    addPermPlacement(type, intersectionPoint){
        // ===== Return if busy searching =====================
        if(this.busy){
            return;
        }
        // ====================================================

        const cellCoords = this.worldToCell_coordinateConversion(intersectionPoint);

        // ==== Return if the space is already occupied =======
        if(this.spaceOccupied(cellCoords)){
            return;
        }
        // ====================================================

        const separatedCoords = cellCoords.split(',');
        const x = parseInt(separatedCoords[0], 10);
        const z = parseInt(separatedCoords[1], 10);

        switch(type){
            case "Start":
                this.setStartPlacement(cellCoords, intersectionPoint);
                break;

            case "Goal":
                this.setGoalPlacement(cellCoords, intersectionPoint);
                break;

            case "Obstacle":
                this.setObstaclePlacement(cellCoords, intersectionPoint);
                break;
        }
    }

    setStartPlacement(cellCoords, intersectionPoint){
        if(this.startPlacement){
            this.cells.set(this.worldToCell_coordinateConversion(this.startPlacement.position), 0);
            this.permGroup.remove(this.startPlacement);

            if(this.startPlacement.geometry){
                this.startPlacement.geometry.dispose();
            }
            if(this.startPlacement.material){
                this.startPlacement.material.dispose();
            }
        }

        this.startPlacement = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshBasicMaterial({
                color: "blue",
                side: THREE.DoubleSide
            })
        );

        const worldCoords = this.worldToPlacement_coordinateConversion(intersectionPoint);
        this.startPlacement.position.set(worldCoords.x, worldCoords.y, worldCoords.z);
        this.permGroup.add(this.startPlacement);
        this.cells.set(cellCoords, 1);

        // force update
        this.startPlacement.needsUpdate = true;
    }

    setGoalPlacement(cellCoords, intersectionPoint){
        if(this.goalPlacement){
            this.cells.set(this.worldToCell_coordinateConversion(this.goalPlacement.position), 0);
            this.permGroup.remove(this.goalPlacement);

            if(this.goalPlacement.geometry){
                this.goalPlacement.geometry.dispose();
            }
            if(this.goalPlacement.material){
                this.goalPlacement.material.dispose();
            }
        }

        // StandardMaterial instead of BasicMaterial for emissiveness
        // * Can ignore IDE warning *
        this.goalPlacement = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshStandardMaterial({
                color: "green",
                side: THREE.DoubleSide,
                emissive: "green",
                emissiveIntensity: 0.5
            })
        );

        const worldCoords = this.worldToPlacement_coordinateConversion(intersectionPoint);
        this.goalPlacement.position.set(worldCoords.x, worldCoords.y, worldCoords.z);
        this.permGroup.add(this.goalPlacement);
        this.cells.set(cellCoords, 2);

        // force update
        this.goalPlacement.needsUpdate = true;
    }

    setObstaclePlacement(cellCoords, intersectionPoint){
        const obstacle = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshBasicMaterial({
                color: "red",
                side: THREE.DoubleSide
            })
        );

        const worldCoords = this.worldToPlacement_coordinateConversion(intersectionPoint);
        obstacle.position.set(worldCoords.x, worldCoords.y, worldCoords.z);
        this.permGroup.add(obstacle);
        this.cells.set(cellCoords, -1);

        // force update
        obstacle.needsUpdate = true;
    }

    // ======================================================================================================
    //                          Temporary Placements
    // ======================================================================================================
    setVisitedMarker(x, z, step){
        const worldX = x + 0.5 - this.size / 2;
        const worldZ = z + 0.5 - this.size / 2;

        const visitedMarker = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.25, 1),
            new THREE.MeshBasicMaterial({
                color: 0x415257,
                side: THREE.DoubleSide
            })
        );
        visitedMarker.position.set(worldX, 0, worldZ);

        const textGeometry = new TextGeometry(step.toString(), {
            font: this.font,
            size: 0.25,
            height: 0.1,
            depth: 0.1,
            curveSegments: 6,
        });

        const textMaterial = new THREE.MeshBasicMaterial({
            color: 0x57bcf5,
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(worldX, 0.1, worldZ);
        textMesh.rotateX( -0.5 * Math.PI);

        this.tempGroup.add(visitedMarker);
        this.tempGroup.add(textMesh);
    }



    // ======================================================================================================
    //                              Algorithms
    // ======================================================================================================
    beginDepthFirstSearch(){
        // Just delete all temporary placements and start over
        if(this.busy){
            this.deleteTempPlacements();
        }

        this.resetGoalIndicator();

        // set busy
        this.busy = true;

        const visited = new Map();

        if(this.startPlacement){
            const startX = Math.round(this.startPlacement.position.x + this.size / 2 - 1);
            const startZ = Math.round(this.startPlacement.position.z + this.size / 2 - 1);

            // No longer busy when done
            this.depthFirstSearch(startX, startZ, visited, 0)
                .then(r => this.busy = false);
        }
        else{
            this.depthFirstSearch(0, 0, visited, 0).then(r => this.busy = false);
        }
    }

    async depthFirstSearch(x, z, visited, step){
        // External factors can change the busy flag
        if(this.busy){
            const key = `${x},${z}`
            // ===== Early Returns ========
            // Goal found
            if(this.cells.get(key) == 2){
                this.goalFound();
                return;
            }
            // Obstacle hit or already visited
            if(this.cells.get(key) < 0 || visited.get(key)){
                return;
            }
            // ===========================

            visited.set(key, true);
            this.setVisitedMarker(x,z,step);

            // Slow down
            await this.sleep();

            // update step
            step += 1;

            if(x < this.size - 1){
                await this.depthFirstSearch(x + 1, z, visited, step);
            }
            if(x > 0){
                await this.depthFirstSearch(x - 1, z, visited, step);
            }
            if(z < this.size - 1){
                await this.depthFirstSearch(x, z + 1, visited, step);
            }
            if(z > 0){
                await this.depthFirstSearch(x, z - 1, visited, step);
            }
        }
    }

    beginBreadthFirstSearch(){
        // Just delete all temporary placements and start over
        if(this.busy){
            this.deleteTempPlacements();
        }

        this.resetGoalIndicator();

        // set busy
        this.busy = true;

        if(this.startPlacement){
            const startX = Math.round(this.startPlacement.position.x + this.size / 2 - 1);
            const startZ = Math.round(this.startPlacement.position.z + this.size / 2 - 1);

            // No longer busy when done
            this.breadthFirstSearch(startX, startZ)
                .then(r => this.busy = false);
        }
        else{
            this.breadthFirstSearch(0, 0).then(r => this.busy = false);
        }
    }

    async breadthFirstSearch(startX, startZ) {
        if (this.busy) {
            let queue = [];
            let visited = new Map();
            let step = 0;
            const startKey = `${startX},${startZ}`;

            queue.push({ x: startX, z: startZ, step });
            visited.set(startKey, true);

            while (queue.length > 0) {
                let { x, z, step } = queue.shift();
                const key = `${x},${z}`;

                // ===== Early Returns ========
                // Goal found
                if (this.cells.get(key) == 2) {
                    this.goalFound();
                    return;
                }
                // Obstacle hit
                if (this.cells.get(key) < 0) {
                    continue;
                }
                // ===========================

                this.setVisitedMarker(x, z, step);

                // Slow down
                await this.sleep();

                // Prepare next steps
                step += 1;
                const directions = [
                    { x: x + 1, z: z },    // Right
                    { x: x - 1, z: z },    // Left
                    { x: x, z: z + 1 },    // Down
                    { x: x, z: z - 1 }     // Up
                ];

                directions.forEach(({ x, z }) => {
                    const adjKey = `${x},${z}`;
                    if (x >= 0 && x < this.size && z >= 0 && z < this.size && !visited.get(adjKey) && this.cells.get(adjKey) >= 0) {
                        queue.push({ x, z, step });
                        visited.set(adjKey, true);
                    }
                });
            }
        }
    }

    // ======================================================================================================
    //                                  Events
    // ======================================================================================================
    goalFound(){
        if(this.goalPlacement){
            this.busy = false;
            this.goalPlacement.material.emissiveIntensity = 10;
            this.goalPlacement.material.needsUpdate = true;
        }
    }

    resetGoalIndicator(){
        if(this.goalPlacement){
            this.goalPlacement.material.emissiveIntensity = 0.5;
            this.goalPlacement.material.needsUpdate = true;
        }
    }


    // ======================================================================================================
    //                               Speed Control
    // ======================================================================================================
    sleep(){
        return new Promise(resolve => setTimeout(resolve, this.sleepTime));
    }
}