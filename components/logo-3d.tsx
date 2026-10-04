'use client'

import { useEffect, useRef } from 'react'
import { animate, createTimeline } from 'animejs'
import 'animejs/adapters/three'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import helvetikerBold from 'three/examples/fonts/helvetiker_bold.typeface.json'

const PINK = 0xff6b9d
const BLUE = 0x5b8def
const WHITE = 0xf0f4ff

export default function Logo3D({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = Math.max(mount.clientWidth, 160)
    const height = Math.max(mount.clientHeight, 90)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0.35, 5.2)
    camera.lookAt(0, -0.1, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(1.5, 2.6, 3)
    scene.add(key)
    const pinkLight = new THREE.PointLight(PINK, 60, 25)
    pinkLight.position.set(-2.4, 1.2, 2.4)
    scene.add(pinkLight)
    const blueLight = new THREE.PointLight(BLUE, 45, 25)
    blueLight.position.set(2.4, -1, 2.4)
    scene.add(blueLight)

    const font = new FontLoader().parse(helvetikerBold)
    const textOpts = {
      font,
      size: 0.34,
      height: 0.12,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.014,
      bevelSegments: 3,
    }
    const gymGeo = new TextGeometry('Gym', textOpts)
    const coachGeo = new TextGeometry('Coach', textOpts)
    gymGeo.computeBoundingBox()
    coachGeo.computeBoundingBox()
    gymGeo.center()
    coachGeo.center()
    const gymSize = new THREE.Vector3()
    const coachSize = new THREE.Vector3()
    gymGeo.boundingBox!.getSize(gymSize)
    coachGeo.boundingBox!.getSize(coachSize)
    const gap = 0.09
    const total = gymSize.x + gap + coachSize.x

    const gym = new THREE.Mesh(
      gymGeo,
      new THREE.MeshStandardMaterial({ color: WHITE, metalness: 0.35, roughness: 0.22 })
    )
    gym.position.x = -total / 2 + gymSize.x / 2
    const coach = new THREE.Mesh(
      coachGeo,
      new THREE.MeshStandardMaterial({ color: PINK, metalness: 0.2, roughness: 0.28 })
    )
    coach.position.x = total / 2 - coachSize.x / 2

    const group = new THREE.Group()
    group.add(gym, coach)
    scene.add(group)

    renderer.setAnimationLoop(() => renderer.render(scene, camera))
    const resize = () => {
      const w = Math.max(mount.clientWidth, 160)
      const h = Math.max(mount.clientHeight, 90)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let idle: ReturnType<typeof createTimeline> | null = null
    let burst: ReturnType<typeof createTimeline> | null = null
    let entrance: ReturnType<typeof animate> | null = null

    if (reduced) {
      group.scale.setScalar(1)
    } else {
      group.scale.setScalar(0)
      entrance = animate(group, {
        scale: { from: 0, to: 1 },
        rotateY: { from: -120, to: 0 },
        duration: 1500,
        ease: 'outExpo',
        onComplete: () => {
          idle = createTimeline({ loop: true, alternate: true, defaults: { ease: 'inOutSine' } })
            .add(group, { rotateY: [-18, 18], duration: 7000 }, 0)
            .add(group, { y: [0, 0.09], duration: 2800 }, 0)
          idle.play()
        },
      })

      burst = createTimeline({
        onComplete: () => idle?.play(),
      })
        .add(group, { rotateY: '+=180', duration: 1500, ease: 'out(3)' }, 0)
        .add(group, { scale: 1.18, duration: 600, ease: 'outBack(2)' }, 0)
        .add(group, { scale: 1, duration: 700, ease: 'out(3)' }, 600)
      const fireBurst = () => {
        idle?.cancel()
        burst?.play()
      }
      mount.addEventListener('pointerenter', fireBurst)
      mount.addEventListener('pointerdown', fireBurst)
      mount.dataset.burst = 'true'
    }

    return () => {
      entrance?.cancel()
      burst?.cancel()
      idle?.cancel()
      renderer.setAnimationLoop(null)
      ro.disconnect()
      gymGeo.dispose()
      coachGeo.dispose()
      ;(gym.material as THREE.Material).dispose()
      ;(coach.material as THREE.Material).dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} aria-label="Gym Coach logo 3D" />
}