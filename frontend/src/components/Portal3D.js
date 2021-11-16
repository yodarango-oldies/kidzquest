import React, { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Model from './Model'
import Fireflies from './Fireflies'

export default function Portal3D() {
  return (
    <Suspense fallback={<span>loading...</span>}>
      <Canvas dpr={[1, 2]} camera={{ fov: 45, position: [-4, 2, -4] }} className="canvas">
        <color attach="background" args={['#1e2243']} />
        <Fireflies count={50} />
        <Model />
        <OrbitControls />
      </Canvas>
    </Suspense>
  )
}
