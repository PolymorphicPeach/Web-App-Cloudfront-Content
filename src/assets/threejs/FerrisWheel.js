import * as THREE from 'three';

export default class FerrisWheel{
    constructor({
                    radius = 30,
                    num_carts = 20,
                    innerWheelColor = 0x000fff,
                    outerWheelColor = 0x000fff,
                    riggingColor = 0x000fff,
                    cartColor = 0x000fff,
                }){
        // Allows getting child objects
        // this.group is what should be manipulating when implementing animations
        this.group = new THREE.Group();

        // ======== Inner Wheel ===========
        const innerWheelGeometry = new THREE.RingGeometry(radius/5, (radius/5) - 0.5, 30, 14);
        const innerWheelMaterial = new THREE.MeshBasicMaterial({color: innerWheelColor, side: THREE.DoubleSide});
        const innerWheel = new THREE.Mesh(innerWheelGeometry, innerWheelMaterial);
        this.group.add(innerWheel);

        // ======== Outer Wheel ===========
        const outerWheelGeometry = new THREE.RingGeometry(radius, radius - 1, 30, 14);
        const outerWheelMaterial = new THREE.MeshBasicMaterial({color: outerWheelColor, side: THREE.DoubleSide});
        const outerWheel = new THREE.Mesh(outerWheelGeometry, outerWheelMaterial);
        this.group.add(outerWheel);

        // ======== Carts =================
        const cartGeometry = new THREE.CylinderGeometry(2,1,5,20,4);
        const cartMaterial = new THREE.MeshBasicMaterial({color: cartColor, side: THREE.DoubleSide});

        // ======= Rigging ================
        const lineMaterial = new THREE.LineBasicMaterial({color: riggingColor});
        let cart = null;
        let rigging = null;
        const radian_interval = (2 * Math.PI) / num_carts;

        // ====== Loop populating rigging and carts =======
        for(let i = 0; i < num_carts; ++i){
            cart = new THREE.Mesh(cartGeometry, cartMaterial);
            const points = [];

            // ... How did I ever figure this out.....
            points.push(new THREE.Vector3(
                Math.cos(radian_interval * i) * radius / 5,
                Math.sin(radian_interval * i) * radius / 5,
                0
            ));

            points.push(new THREE.Vector3(
                Math.cos(radian_interval * i) * radius,
                Math.sin(radian_interval * i) * radius,
                0
            ));
            points.push(new THREE.Vector3(
                Math.cos(radian_interval * i + 3) * radius,
                Math.sin(radian_interval * i + 3) * radius,
                0
            ));

            // Create rigging
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            rigging = new THREE.Line(lineGeometry, lineMaterial);
            this.group.add(rigging);

            // Centered on 0, 0: Place cart
            cart.position.set(
                Math.cos(radian_interval * i) * radius,
                Math.sin(radian_interval * i) * radius,
                0
            );
            // Name needed later for animation, since they must NOT rotate with the wheel
            cart.name = "cart";
            this.group.add(cart);
        }
    }

    setPosition(x, y, z){
        this.group.position.x = x;
        this.group.position.y = y;
        this.group.position.z = z;
    }

    rotate(rate){
        this.group.rotateZ(rate);

        for(let i = 0; i < this.group.children.length; ++i){
            if(this.group.children[i].name == "cart"){
                // "Undo" the rotation on z axis
                this.group.children[i].rotation.z -= rate;
            }
        }
    }
}