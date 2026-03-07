'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function disposeObject3D(object: THREE.Object3D) {
    object.traverse((child: THREE.Object3D) => {
        const meshLike = child as THREE.Mesh;
        if (meshLike.geometry) {
            meshLike.geometry.dispose();
        }

        const material = meshLike.material as THREE.Material | THREE.Material[] | undefined;
        if (!material) {
            return;
        }

        if (Array.isArray(material)) {
            material.forEach((entry) => entry.dispose());
            return;
        }

        material.dispose();
    });
}

export function RetroParallaxBackground() {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const mountNode = mountRef.current;

        if (!mountNode) {
            return undefined;
        }

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.pointerEvents = 'none';

        mountNode.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x040014, 70, 320);

        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 22, 70);
        camera.lookAt(new THREE.Vector3(0, 0, -200));
        const baseCameraRotation = camera.rotation.clone();

        const neonPalette = {
            sky: 0x040014,
            horizon: 0xff2d95,
            grid: 0xff76ff,
            teal: 0x00fff0,
        } as const;

        const ambient = new THREE.AmbientLight(0x402050, 0.6);
        const rimLight = new THREE.PointLight(0xff61d2, 2.2, 600, 2);
        rimLight.position.set(0, 40, -30);
        scene.add(ambient, rimLight);

        const gridSizeX = 900;
        const gridDepthSpan = 2400;
        const forwardPadding = 240;
        const gridDivisions = 16;
        const gridThickness = 1.4;
        const gridScrollSpeed = 45;
        const horizontalSpacing = 38;
        const horizontalLineCount = Math.ceil((gridDepthSpan + forwardPadding) / horizontalSpacing) + 8;
        const horizontalLoopDistance = horizontalSpacing * horizontalLineCount;

        const createGridLineMaterial = () => new THREE.MeshBasicMaterial({
            color: neonPalette.grid,
            side: THREE.DoubleSide,
        });

        const createGridPlane = (width: number, height: number) => {
            const geometry = new THREE.PlaneGeometry(width, height);
            geometry.rotateX(-Math.PI / 2);
            return geometry;
        };

        const floorHorizontalLines: THREE.Mesh[] = [];
        const ceilingHorizontalLines: THREE.Mesh[] = [];

        const buildGrid = (offsetY: number, horizontalLinesStore: THREE.Mesh[]) => {
            const container = new THREE.Group();
            container.position.y = offsetY;

            const verticalLength = gridDepthSpan + forwardPadding;
            const verticalOffset = forwardPadding / 2 - gridDepthSpan / 2;

            for (let i = 0; i <= gridDivisions; i += 1) {
                const x = -gridSizeX / 2 + (i / gridDivisions) * gridSizeX;
                const verticalGeometry = createGridPlane(gridThickness, verticalLength);
                const verticalLine = new THREE.Mesh(verticalGeometry, createGridLineMaterial());
                verticalLine.position.set(x, 0, verticalOffset);
                container.add(verticalLine);
            }

            for (let i = 0; i <= horizontalLineCount; i += 1) {
                const horizontalGeometry = createGridPlane(gridSizeX, gridThickness);
                const horizontalLine = new THREE.Mesh(horizontalGeometry, createGridLineMaterial());
                horizontalLine.position.set(0, 0, forwardPadding - i * horizontalSpacing);
                container.add(horizontalLine);
                horizontalLinesStore.push(horizontalLine);
            }

            scene.add(container);
            return container;
        };

        const floorGrid = buildGrid(-18, floorHorizontalLines);
        const ceilingGrid = buildGrid(88, ceilingHorizontalLines);
        const gridGroups = [floorGrid, ceilingGrid];

        const createMountainLayer = (offset: number, color: number) => {
            const points: THREE.Vector3[] = [];

            for (let i = -50; i <= 50; i += 1) {
                const x = i * 2.5;
                const y = Math.sin(i * 0.23 + offset) * 3 + offset * 0.5 + 6;
                const z = -120 - offset * 12;
                points.push(new THREE.Vector3(x, y, z));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color,
                transparent: true,
                opacity: 0.4 + offset * 0.05,
            });

            const line = new THREE.Line(geometry, material);
            scene.add(line);

            return line;
        };

        const mountainLayers = [
            createMountainLayer(0, neonPalette.teal),
            createMountainLayer(1, neonPalette.horizon),
            createMountainLayer(2, neonPalette.grid),
        ];

        const sunMaterial = new THREE.MeshBasicMaterial({
            color: neonPalette.horizon,
            transparent: true,
            opacity: 0.45,
            side: THREE.DoubleSide,
        });
        const sun = new THREE.Mesh(new THREE.CircleGeometry(18, 80), sunMaterial);
        sun.position.set(0, 40, -200);
        scene.add(sun);

        const hazeMaterial = new THREE.MeshBasicMaterial({
            color: neonPalette.sky,
            transparent: true,
            opacity: 0.35,
            side: THREE.DoubleSide,
        });
        const haze = new THREE.Mesh(new THREE.PlaneGeometry(600, 400), hazeMaterial);
        haze.position.set(0, 20, -180);
        haze.lookAt(camera.position);
        scene.add(haze);

        const parallaxTarget = new THREE.Vector2();
        const clock = new THREE.Clock();
        let animationFrameId = 0;

        const handlePointerMove = (event: PointerEvent) => {
            const x = event.clientX / window.innerWidth;
            const y = event.clientY / window.innerHeight;
            parallaxTarget.x = (x - 0.5) * 0.4;
            parallaxTarget.y = (y - 0.5) * 0.25;
        };

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        const animate = () => {
            const delta = clock.getDelta();

            const advanceLines = (lines: THREE.Mesh[]) => {
                lines.forEach((line) => {
                    line.position.z += delta * gridScrollSpeed;

                    if (line.position.z > forwardPadding) {
                        line.position.z -= horizontalLoopDistance;
                    }
                });
            };

            advanceLines(floorHorizontalLines);
            advanceLines(ceilingHorizontalLines);

            mountainLayers.forEach((line, index) => {
                line.position.z += delta * (8 + index * 2.5);

                if (line.position.z > -20) {
                    line.position.z = -160 - index * 15;
                }
            });

            const targetRotationY = baseCameraRotation.y + parallaxTarget.x;
            const targetRotationX = baseCameraRotation.x + parallaxTarget.y;
            camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.04;
            camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.04;

            renderer.render(scene, camera);
            animationFrameId = window.requestAnimationFrame(animate);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('resize', handleResize);
            window.cancelAnimationFrame(animationFrameId);
            gridGroups.forEach((group) => disposeObject3D(group));
            mountainLayers.forEach((layer) => disposeObject3D(layer));
            disposeObject3D(sun);
            disposeObject3D(haze);
            renderer.dispose();

            if (renderer.domElement.parentNode === mountNode) {
                mountNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
