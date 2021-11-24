// core
import React from 'react'

// coms\ps
import ThreeDButton from '../buttons/ThreeDButton'
import KidzQuest from '../chunks/KidzQuest'
import MovemeAround from '../chunks/MovemeAround'
import Portal3D from '../Portal3D'

const Home = () => {
  return (
    <div>
      <KidzQuest />
      <Portal3D />
      <MovemeAround />
      <ThreeDButton />
      <div className="footer">
        <i>
          <a href="https://danielrangel.net">Desgined By D.R.</a>
        </i>
      </div>
    </div>
  )
}

export default Home
