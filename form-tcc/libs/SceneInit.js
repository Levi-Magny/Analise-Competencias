import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
    constructor(canvasId, canvasContainer) {
        this.canvasId = canvasId;
        this.canvasContainer = canvasContainer;
    }

    initialize() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
        50,
        360 / 360,
        1,
        1000
        );
        this.camera.position.z = 96;

        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        });

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        this.scene.background = null;
        this.renderer.setSize(360, 360);
        document.getElementById(this.canvasContainer).appendChild(this.renderer.domElement);

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.ambientLight.castShadow = true;
        this.scene.add(this.ambientLight);

        this.spotLight = new THREE.SpotLight(0xffffff,1);
        this.spotLight.castShadow = true;
        this.spotLight.position.set(0,64,32);
        this.scene.add(this.spotLight);
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
        this.renderer.render(this.scene, this.camera);
    }
    onWindowResize() {
        this.camera.aspect = 360/ 360;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(360, 360);
    }
}