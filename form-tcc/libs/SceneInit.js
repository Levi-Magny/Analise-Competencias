import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import MouseMeshInteraction from './three_mmi';

export default class SceneInit {
    constructor(canvasId, canvasContainer, dimentions) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(this.canvasId);
        this.canvasContainer = canvasContainer;
        this.dimentions = dimentions;

        this.boxes = [];
        this.current_index = [0, 0];

        this.highLightColor = new THREE.Color(0xfdfeff);
        this.colors = [
            new THREE.Color(0xa8b5fa),
            new THREE.Color(0xa8fab5),
            new THREE.Color(0xd3ffa0),
            new THREE.Color(0xf4f381),
            new THREE.Color(0xfad199),
            new THREE.Color(0xef87a1),
        ];
    }

    initialize() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
        55,
        this.dimentions[0] / this.dimentions[1],
        1,
        1000
        );
        this.camera.position.setZ(50)
        this.camera.position.setX(-45)
        this.camera.position.setY(50)
        this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        });

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        this.scene.background = null;
        this.renderer.setSize(this.dimentions[0], this.dimentions[1]);
        document.getElementById(this.canvasContainer).appendChild(this.renderer.domElement);

        this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.ambientLight.castShadow = true;
        this.scene.add(this.ambientLight);

        this.spotLight = new THREE.SpotLight(0xffffff,10);
        this.spotLight.castShadow = true;
        this.spotLight.position.set(0,64,32);
        this.scene.add(this.spotLight);

        this.mmi = new MouseMeshInteraction(this.scene, this.camera);

        window.addEventListener('ended', () => {
            this.mmi.destructor()
        })

        // Position textbox

        this.descriptionBox = document.getElementById('description');
        this.boxPosition = new THREE.Vector3();
    }

    animate() {
        // stats.update();
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        // NOTE: Update uniform data on each render.
        // this.uniforms.u_time.value += this.clock.getDelta();
        if(this.boxes.length > 0){
            let model = this.boxes[this.current_index[0]][this.current_index[1]];
            this.boxPosition.setFromMatrixPosition(model.matrixWorld);
            this.boxPosition.project(this.camera);
            let widthHalf = window.innerWidth / 2, heightHalf = (this.canvas.height + this.canvas.getBoundingClientRect().top) / 2;
            
            this.boxPosition.x = (this.boxPosition.x * widthHalf) + widthHalf;
            this.boxPosition.y = -(this.boxPosition.y * heightHalf) + heightHalf;
            
            this.descriptionBox.style.top = `${this.boxPosition.y}px`;
            this.descriptionBox.style.left = `${this.boxPosition.x}px`;
        }
        this.renderer.render(this.scene, this.camera);

        this.mmi.update();
    }

    createMesh() {
        const gap = 10;
        let x = -30;
        let z = 20
        for(let i = 0; i < 4; i++){
            this.boxes.push([]);
            for(let j = 0; j < 6; j++){    
                const boxGeometry = new THREE.BoxGeometry(10,5 + 2*j + 2*i,10);
                const boxMaterial = new THREE.MeshMatcapMaterial({ color: this.colors[j] });
                let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
                boxMesh.name = 'box';
                boxMesh.position.set(x, j + i, z);

                boxMesh.userData.color = this.colors[j];
                boxMesh.userData.index = [i,j];
                
                this.boxes[i].push(boxMesh);

                this.scene.add(boxMesh);
                x += gap;
            }
            x = -30;
            z -= gap;
        }
        
        // Add mouse handlers

        this.mmi.addHandler('box', 'click', (mesh) => {
            console.log("cliquei na caixa!");
        })

        this.mmi.addHandler('box', 'mouseenter', (mesh) => {
            mesh.material.color = this.highLightColor;
            this.current_index = mesh.userData.index;
            this.descriptionBox.classList.remove('disabled');
            // console.log();
        })

        this.mmi.addHandler('box', 'mouseleave', (mesh) => {
            mesh.material.color = mesh.userData.color;
            this.descriptionBox.classList.add('disabled');
        })
    }

    onWindowResize() {
        this.camera.aspect = this.dimentions[0] / this.dimentions[1];
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.dimentions[0], this.dimentions[1]);
    }
}