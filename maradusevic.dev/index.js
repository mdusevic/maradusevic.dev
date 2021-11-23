import '/resources/css/stylesheet.css';
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 1;
camera.rotation.x = 1.16;
camera.rotation.y = -0.12;
camera.rotation.z = 0.27;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

scene.fog = new THREE.FogExp2(0x11111f, 0.002)
renderer.setClearColor(scene.fog.color);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild((renderer.domElement));

window.addEventListener('resize', () =>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    
    camera.updateProjectionMatrix();
})

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(0, 0, 1);

const ambientLight = new THREE.AmbientLight(0x555555);

const flash = new THREE.PointLight(0x062d89, 30, 500 ,1.7);
flash.position.set(200,300,100);

scene.add(directionalLight, ambientLight, flash);

// Rain Drops 

// const rainCount = 15000;
// const points = [];
//
// for(let i = 0; i < rainCount; i++) {
//     const rainDrop = new THREE.Vector3(
//         Math.random() * 400 -200,
//         Math.random() * 500 - 250,
//         Math.random() * 400 - 200
//     );
//
//     rainDrop.velocity = {};
//     rainDrop.velocity = 0;
//     points.push(rainDrop);
// }
//
// const rainGeo = new THREE.BufferGeometry().setFromPoints(points);
// const rainMaterial = new THREE.PointsMaterial({
//     color: 0xaaaaaa,
//     size: 0.2,
//     transparent: true
// });
// const rain = new THREE.Points(rainGeo, rainMaterial);
// scene.add(rain);

// Clouds

const cloudParticles = [];
const loader = new THREE.TextureLoader().load('/resources/images/Cloud.png', 
    function(texture){
        const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        const cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        })

        for(let p=0; p<25; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random()*800 -400,
                500,
                Math.random()*500 - 450
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*360;
            cloud.material.opacity = 0.6;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
        animate();
    });

function animate() {
    cloudParticles.forEach(p => {
        p.rotation.z -=0.002;
    });

    // points.forEach(p => {
    //     p.velocity -= 0.1 + Math.random() * 0.1;
    //     p.velocity += p;
    //     if (p.y < -200) {
    //         p.y = 200;
    //         p.velocity = 0;
    //     }
    // });
    //
    // rain.verticesNeedUpdate = true;
    // rain.rotation.x -=0.002;
    
    if(Math.random() > 0.93 || flash.power > 100) {
        if(flash.power < 100)
            flash.position.set(
                Math.random()*400,
                300 + Math.random() *200,
                100
            );
        flash.power = 50 + Math.random() * 500;
    }
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}