<template>
  <div ref="threeContainer" style="width: 100%; height: 100%;"></div>
</template>
  
<script setup>
import { onMounted, onUnmounted, ref, defineProps } from 'vue';
import { useMemoryStore } from '../../stores/useMemoryStore.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const { isGameRunning } = useMemoryStore();

// FOR THE 3D MODELS

const props = defineProps({
  modelSrc: String,
});

const threeContainer = ref(null);
let scene, camera, renderer, model, lineSegments;
let handleMouseMove;

onMounted(() => {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(75, threeContainer.value.offsetWidth / threeContainer.value.offsetHeight, 0.1, 1000);
  camera.position.z = 2;

  // Create a renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(threeContainer.value.offsetWidth, threeContainer.value.offsetHeight);
  renderer.setClearColor(0xfbf9f2, 0);

  // Append renderer to the container
  threeContainer.value.appendChild(renderer.domElement);

  // Load the Blender model
  const loader = new GLTFLoader();
  loader.load(props.modelSrc, (gltf) => {
    model = gltf.scene;

    // Make the model transparent
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = 0; // invisible faces
      }
    });

    // Create edge geometry
    const edges = new THREE.EdgesGeometry(model.children[0].geometry);

    // Create a material for the edges (lines)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2f2f2f }); // Black color

    // Create line segments to represent the edges of the model
    lineSegments = new THREE.LineSegments(edges, lineMaterial);

    // Add the line segments to the scene
    scene.add(lineSegments);
  });

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  // Render the scene
  const render = () => {
    renderer.render(scene, camera);
  };

  handleMouseMove = function (event) {

    if (!threeContainer.value) {
      return; // Do nothing if threeContainer.value is null
    }
    
    const { clientX, clientY } = event;

    // Normalizing mouse position between -1 and 1
    const mouseX = (clientX / threeContainer.value.offsetWidth) * 2 - 1;
    const mouseY = -(clientY / threeContainer.value.offsetHeight) * 2 + 1;

    // Factors to control the speed and direction of rotation
    const rotationSpeed = 0.2;
    const directionX = -1;
    const directionY = 1;

    // Setting rotation of model based on mouse position
    if (lineSegments) {
      lineSegments.rotation.x = directionX * mouseY * Math.PI * rotationSpeed;
      lineSegments.rotation.y = directionY * mouseX * Math.PI * rotationSpeed;
    }

    // Re-render the scene
    render();
  }

  window.addEventListener("mousemove", handleMouseMove);



  // Initial render
  render();
});

onUnmounted(() => {
  // Clean up resources
  renderer.dispose();
  window.removeEventListener("mousemove", handleMouseMove); // Remove the event listener

  // scene.dispose();
  // camera.dispose();
});


</script>