import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AmbientLight } from "three";

function WeirdlyMonolithicThreeApp() {
  const canvas = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const el = canvas.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      el.clientWidth / el.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ canvas: el });
    renderer.setSize(el.clientWidth, el.clientHeight);

    scene.add(new THREE.AmbientLight());

    const cube = new THREE.Mesh();
    cube.geometry = new THREE.DodecahedronGeometry();
    cube.material = new THREE.MeshStandardMaterial({ color: "hotpink" });
    scene.add(cube);

    const tick = () => {
      cube.rotation.x = cube.rotation.y += 0.01;

      /* Render */
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return <canvas ref={canvas}></canvas>;
}

function App() {
  return <WeirdlyMonolithicThreeApp />;
}

export default App;
