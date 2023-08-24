import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// images import
// floor
import grassAlbedoImgSrc from './images/grass/wispy-grass-meadow_albedo.png';
import grassAmbientOcclusionImgSrc from './images/grass/wispy-grass-meadow_ao.png';
import grassHeightImgSrc from './images/grass/wispy-grass-meadow_height.png';
import grassNormalImgSrc from './images/grass/wispy-grass-meadow_normal-ogl.png';
// walls
import wallsAlbedoImgSrc from './images/walls/stucco1_albedo.png';
import wallsAmbientOcclusionImgSrc from './images/walls/stucco1_ao.png';
import wallsHeightImgSrc from './images/walls/stucco1_Height.png';
import wallsNormalImgSrc from './images/walls/stucco1_Normal-ogl.png';
// roof
import roofAlbedoImgSrc from './images/roof/slipperystonework-albedo.png';
import roofAmbientOcclusionImgSrc from './images/roof/slipperystonework-ao.png';
import roofHeightImgSrc from './images/roof/slipperystonework-height.png';
import roofNormalImgSrc from './images/roof/slipperystonework-height.png';

export default function animation() {
    // BASIC
    const canvas = document.querySelector('.webgl');
    const sizes = {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
    }

    //SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 1, 1000);
    camera.position.y = 5;
    camera.position.z = 14;
    scene.add(camera);

    // CONTROLS
    const orbitControls = new OrbitControls(camera, canvas);
    orbitControls.enableDamping = true;

    // TEXTURES
    const textureLoader = new THREE.TextureLoader();
    const grassAlbedoTexture = textureLoader.load(grassAlbedoImgSrc);
    const grassAmbientOcclusionTexture = textureLoader.load(grassAmbientOcclusionImgSrc);
    const grassNormalTexture = textureLoader.load(grassNormalImgSrc);
    const grassHeightTexture = textureLoader.load(grassHeightImgSrc);

    const wallsAlbedoTexture = textureLoader.load(wallsAlbedoImgSrc);
    const wallsAmbientOcclusionTexture = textureLoader.load(wallsAmbientOcclusionImgSrc);
    const wallsNormalTexture = textureLoader.load(wallsNormalImgSrc);
    const wallsHeightTexture = textureLoader.load(wallsHeightImgSrc);

    const roofAlbedoTexture = textureLoader.load(roofAlbedoImgSrc);
    const roofAmbientOcclusionTexture = textureLoader.load(roofAmbientOcclusionImgSrc);
    const roofNormalTexture = textureLoader.load(roofNormalImgSrc);
    const roofHeightTexture = textureLoader.load(roofHeightImgSrc);

    // MESHES
    // floor
    const floorGeometry = new THREE.PlaneGeometry(30, 20, 300, 300);
    const floorMaterial = new THREE.MeshStandardMaterial({
        map: grassAlbedoTexture,
        aoMap: grassAmbientOcclusionTexture,
        displacementMap: grassHeightTexture,
        displacementScale: 2,
        normalMap: grassNormalTexture,
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI * -0.5;
    floor.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2));
    floor.receiveShadow = true;
    // walls
    const wallsGeometry = new THREE.BoxGeometry(4, 3, 5);
    const wallsMaterial = new THREE.MeshStandardMaterial({
        map: wallsAlbedoTexture,
        aoMap: wallsAmbientOcclusionTexture,
        normalMap: wallsNormalTexture,
    })
    const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
    walls.position.y = 1.5;
    walls.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2));
    walls.castShadow = true;

    // roof
    const roofGeometry = new THREE.ConeGeometry(4, 2, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({
        map: roofAlbedoTexture,
        aoMap: roofAmbientOcclusionTexture,
        // displacementMap: roofHeightTexture,
        // displacementScale: 2,
        normalMap: roofNormalTexture,
    })
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 4;
    roof.rotation.y = Math.PI * 0.25;
    roof.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2));
    roof.castShadow = true;

    const house = new THREE.Group();
    house.add(floor);
    house.add(walls);
    house.add(roof);
    scene.add(house);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xFFEC8B, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xFFEC8B, 0.8);
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = 0.5;
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = -20;
    directionalLight.shadow.camera.far = 5;
    scene.add(directionalLight);

    // const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
    // scene.add( helper );

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
        canvas,
        // alpha: true,
    })
    renderer.setSize(sizes.width, sizes.height);
    renderer.setClearColor(0xd5f4ff);
    renderer.shadowMap.enabled = true;
    renderer.render(scene, camera);

    // ANIMATION
    const tick= () => {
        orbitControls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
    tick();
}