import React, { Fragment, useState } from 'react'

// comps
import Form from './../layers&wrappers/form'
import QRcode from '../layers&wrappers/QRcode'

//images
import hand from '../../images/hand.png'
import ReRegistration from '../layers&wrappers/Re-registration-form'

const ThreeDButton = () => {
  const [formState, setformState] = useState(false)
  const handleOpenForm = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    dayOfWeek === 3
      ? setformState(<Form showQRcode={showQRcode} handleCloseForm={() => setformState(false)} />)
      : setformState(
          <ReRegistration
            showQRcode={showQRcode}
            showRegistrationForm={() => setformState(<Form showQRcode={showQRcode} handleCloseForm={() => setformState(false)} />)}
          />,
        )
  }

  const showQRcode = (childId, childName) => {
    setformState(<QRcode childId={childId} childName={childName} handleCloseForm={() => setformState(false)} />)
  }
  return (
    <Fragment>
      {formState}
      <div className="register-child-wrapper">
        <img src={hand} alt="3 D hand clicking a button" className="threeDhand" />
        <span className="button" onClick={handleOpenForm}></span>
      </div>
    </Fragment>
  )
}

export default ThreeDButton
