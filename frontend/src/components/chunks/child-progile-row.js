// core
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//helpers
import myTime from '../../helpers/myTime'

const ChildProfileRow = ({ child }) => {
  const [toggleClass, settoggleClass] = useState('')
  const [temporaryTime, settemporaryTime] = useState('')

  // fetch the toggle according to the checked in status
  useEffect(() => {
    child.checkedInOptions.checkedIn === false
      ? settoggleClass('checkedStatus_out')
      : child.checkedInOptions.checkedIn === true
      ? settoggleClass('checkedStatus_in')
      : null
  }, [])

  const handleCheckIn = async (id) => {
    settoggleClass('checkedStatus_in')
    settemporaryTime(myTime())
    const req = await fetch(`/checkin/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: true }),
    })
    console.log(req)
  }

  const handleCheckOut = async (id) => {
    settemporaryTime(myTime())
    settoggleClass('checkedStatus_out')
    const req = await fetch(`/checkout/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: false }),
    })
    console.log(req)
  }
  return (
    <section className="child-progile-row-wrapper">
      {child.gender === 'boy' && <div className="child-profile-row_gender-boy"></div>}
      {child.gender === 'girl' && <div className="child-profile-row_gender-girl"></div>}
      <h4 className="child-profile-row_fullName std-text">
        {child.childFirstName} {child.childLastName}
      </h4>
      {toggleClass === 'checkedStatus_in' && (
        <div className={`child-profile-row_checkedStatusIn ${toggleClass}`}>
          <span className={`checkedStatus_ball`} onClick={() => handleCheckOut(child._id)}></span>
        </div>
      )}
      {toggleClass === 'checkedStatus_out' && (
        <div className={`child-profile-row_checkedStatusOut ${toggleClass}`}>
          <span className={`checkedStatus_ball`} onClick={() => handleCheckIn(child._id)}></span>
        </div>
      )}
      {toggleClass === 'checkedStatus_in' && (
        <p className="child-profile-row_status">
          Checked-in at: {child.checkedInOptions.checkedInTime} {temporaryTime}
        </p>
      )}
      {toggleClass === 'checkedStatus_out' && (
        <p className="child-profile-row_status">
          Checked-out at: {child.checkedInOptions.checkedOutTime}
          {temporaryTime}
        </p>
      )}
      <p className="guardian-name">Guardian Name: {child.guardianName}</p>
      <p className="guardian-phone-number">
        Guardian Phone #:{' '}
        <b>
          <a href={`tel:${child.guardianPhoneNumber}`}>{child.guardianPhoneNumber}</a>
        </b>
      </p>
      <Link to={{ pathname: '/child', search: `?childId=${child.childId}` }} className="link-to-child ">
        See all info
      </Link>
    </section>
  )
}

export default ChildProfileRow
