import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import MouseMeshInteraction from './three_mmi';
import blooms from '../data/blooms.json';

export default class SceneInit {
    constructor(canvasId, canvasContainer, dimensions, setCurrentIndex, setSelectedIndex) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(this.canvasId);
        this.canvasContainer = canvasContainer;
        this.dimensions = dimensions;
        this.setReactIndex = setCurrentIndex;
        this.setReactSelectedIndex = setSelectedIndex;

        this.boxes = [];
        this.current_index = [0, 0];
        this.selected_item = null

        this.highLightColor = new THREE.Color(0xfdfeff);
        this.selectedColor = new THREE.Color(0xEF476F);
        this.colors = [
            new THREE.Color(0xa8b5fa),
            new THREE.Color(0xa8fab5),
            new THREE.Color(0xd3ffa0),
            new THREE.Color(0xf4f381),
            new THREE.Color(0xfad199),
            new THREE.Color(0xef87a1),
        ];
        this.clear_selection()
    }

    initialize() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
        60,
        this.dimensions[0] / this.dimensions[1],
        1,
        1000
        );
        this.camera.position.setZ(60)
        this.camera.position.setX(-60)
        this.camera.position.setY(40)
        this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        });

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        this.scene.background = null;
        this.renderer.setSize(this.dimensions[0], this.dimensions[1]);
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
        // this.renderer.setSize(window.innerWidth, this.dimensions[1]);
        // this.camera.aspect = window.innerWidth / this.dimensions[1];
        this.renderer.render(this.scene, this.camera);
        this.mmi.update();
    }

    createMesh() {
        const gap = 10;
        let x = -30;
        let z = 20;
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

        this.createText('Lembrar', -33);
        this.createText('Entender', -23);
        this.createText('Aplicar', -13);
        this.createText('Analisar', -3);
        this.createText('Avaliar', 7);
        this.createText('Criar', 17);

        this.createText('Factual', -52, 23, [-3.14/2, 0]);
        this.createText('Conceitual', -59, 13, [-3.14/2, 0]);
        this.createText('Procedural', -60, 3, [-3.14/2, 0]);
        this.createText('Metacognitivo', -66, -7, [-3.14/2, 0]);
        
        // Add mouse handlers

        this.mmi.addHandler('box', 'click', (mesh) => {
            if(this.selected_item == mesh){
                mesh.material.color = mesh.userData.color;
                this.selected_item = null;
            } else {
                this.clear_selection()
                this.selected_item = mesh;
                mesh.material.color = this.selectedColor;
            }
            this.setReactSelectedIndex(this.selected_item ? this.selected_item.userData.index : null);
        })

        this.mmi.addHandler('box', 'mouseenter', (mesh) => {
            if (mesh!=this.selected_item){
                mesh.material.color = this.highLightColor;
            }
                this.current_index = mesh.userData.index;
                // this.descriptionBox.innerText = blooms["matrix"][this.current_index[1]][this.current_index[0]]['title'];
                this.setReactIndex([this.current_index[1],this.current_index[0]]);
                this.descriptionBox.classList.remove('disabled');
                // console.log();
        })

        this.mmi.addHandler('box', 'mouseleave', (mesh) => {
            if(this.selected_item != mesh)
            {mesh.material.color = mesh.userData.color;
            this.descriptionBox.classList.add('disabled');
        }
        })
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / this.dimensions[1];
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, this.dimensions[1]);
    }

    createText(text, xPos, zPos=28, Rotate=[-3.14/2,-3.14/2]){
        const fontLoader = new FontLoader();
        fontLoader.load(
          'fonts/droid_serif_regular.typeface.json',
          (droidFont) => {
            const textGeometry = new TextGeometry(text, {
              size: 3,
              height: .5,
              font: droidFont,
            });
            const textMaterial = new THREE.MeshMatcapMaterial({ color: this.highLightColor});
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.x = xPos;
            textMesh.position.y = 0;
            textMesh.position.z = zPos;
            textMesh.rotateX(Rotate[0])
            textMesh.rotateZ(Rotate[1])
            this.scene.add(textMesh);
          }
        );
    }

    clear_selection(){
        if (this.selected_item != null){
            this.selected_item.material.color = this.selected_item.userData.color;
        }
        this.selected_item = null;
    }

    set_selected_item(index){
        let box = this.find_item_by_index(index);
        this.clear_selection()
        box.material.color = this.selectedColor;
        this.setReactSelectedIndex(box.userData.index);
        this.selected_item = box;
    }

    find_item_by_index(index){
        return this.boxes[index[0]][index[1]];
    }
}