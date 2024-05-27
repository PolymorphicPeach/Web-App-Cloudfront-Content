import * as YUKA from "yuka";

export default class Fish {
    constructor(
        model,
        scale = 1,
        maxSpeed = 1,
        onPathRadius = 0.5,
        directionChange = 0.5,
        name = "fish"
    ){
        // ---- Model Configuration -----
        this.name = name;
        this.model = model;
        // YUKA will be responsible for making updates
        this.model.matrixAutoUpdate = false;

        // ---- YUKA Configuration -----
        this.vehicle = new YUKA.Vehicle();
        this.vehicle.maxSpeed = maxSpeed;
        // scale with YUKA instead
        this.vehicle.scale = new YUKA.Vector3(scale, scale, scale);

        // ---- Combine Model and YUKA -----
        this.vehicle.setRenderComponent(this.model, sync);
        function sync(entity, renderComponent){
            renderComponent.matrix.copy(entity.worldMatrix);
        }

    }
}