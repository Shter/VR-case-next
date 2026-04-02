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

type RetroParallaxBackgroundProps = {
    onReadyAction?: () => void;
};

export function RetroParallaxBackground({ onReadyAction }: RetroParallaxBackgroundProps) {
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
        const floorOffsetY = -18;
        const ceilingOffsetY = 88;
        const walkwayCenterY = (floorOffsetY + ceilingOffsetY) / 2;
        camera.position.set(0, walkwayCenterY, 70);
        camera.lookAt(new THREE.Vector3(0, walkwayCenterY, -200));
        const baseCameraRotation = camera.rotation.clone();

        const gridColor = 0xff76ff;

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
            color: gridColor,
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

        const floorGrid = buildGrid(floorOffsetY, floorHorizontalLines);
        const ceilingGrid = buildGrid(ceilingOffsetY, ceilingHorizontalLines);
        const gridGroups = [floorGrid, ceilingGrid];

        const parallaxTarget = new THREE.Vector2();
        let animationFrameId = 0;
        let hasSignaledReady = false;
        let lastFrameTime = performance.now();

        const notifyReady = () => {
            if (!hasSignaledReady) {
                hasSignaledReady = true;
                onReadyAction?.();
            }
        };

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

        const animate = (timestamp: number) => {
            const delta = (timestamp - lastFrameTime) / 1000;
            lastFrameTime = timestamp;

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

            const targetRotationY = baseCameraRotation.y + parallaxTarget.x;
            const targetRotationX = baseCameraRotation.x + parallaxTarget.y;
            camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.04;
            camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.04;

            renderer.render(scene, camera);
            notifyReady();
            animationFrameId = window.requestAnimationFrame(animate);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('resize', handleResize);
        animationFrameId = window.requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('resize', handleResize);
            window.cancelAnimationFrame(animationFrameId);
            gridGroups.forEach((group) => disposeObject3D(group));
            renderer.dispose();

            if (renderer.domElement.parentNode === mountNode) {
                mountNode.removeChild(renderer.domElement);
            }
        };
    }, [onReadyAction]);

    return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
