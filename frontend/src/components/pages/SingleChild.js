import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import myTime from '../../helpers/myTime'
import Cookie from 'js-cookie'

const SingleChild = () => {
  const [toggleClass, settoggleClass] = useState('')
  const [temporaryTime, settemporaryTime] = useState('')
  const [childFetched, setchildFetch] = useState([])

  const params = useLocation()
  const childId = params.search.split('=')[1]
  console.log(childId)

  const fecthChild = async () => {
    const req = await fetch(`/getchild/${childId}`)
    const child = await req.json()
    setchildFetch(child)

    // fetch the toggle according to the checked in status
    child.checkedInOptions.checkedIn === false
      ? settoggleClass('checkedStatus_out')
      : child.checkedInOptions.checkedIn === true
      ? settoggleClass('checkedStatus_in')
      : null
  }

  useEffect(() => {
    fecthChild()
  }, [])

  // ====================  handle checkin ====================== //
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
  // ================= check that the user is logged in ===========
  const [login] = useState(Cookie.get('logedin'))
  return (
    <div className="child-main-wrapper">
      <div className="child_photo_wrapper">
        <div className="child_photo" style={{ backgroundImage: `url(${childFetched.photo})` }}></div>
      </div>
      <h1 className="std-title">First Name:</h1>
      <h2 className="std-title-white">{childFetched.childFirstName}</h2>
      <h1 className="std-title">Last Name:</h1>
      <h2 className="std-title-white">{childFetched.childLastName}</h2>
      <h2 className="std-title">Age:</h2>
      <h2 className="std-title-white">{childFetched.childAge}</h2>
      <h2 className="std-title">Guardian's Name:</h2>
      <h2 className="std-title-white">{childFetched.guardianName}</h2>
      <h2 className="std-title">Guardian's Phone #:</h2>
      <h2 className="std-title-white">{childFetched.guardianPhoneNumber}</h2>

      {login && (
        <section className="child-progile-row-wrapper">
          {toggleClass === 'checkedStatus_in' && (
            <div className={`child-profile-row_checkedStatusIn ${toggleClass}`}>
              <span className={`checkedStatus_ball`} onClick={() => handleCheckOut(childFetched._id)}></span>
            </div>
          )}
          {toggleClass === 'checkedStatus_out' && (
            <div className={`child-profile-row_checkedStatusOut ${toggleClass}`}>
              <span className={`checkedStatus_ball`} onClick={() => handleCheckIn(childFetched._id)}></span>
            </div>
          )}
          {toggleClass === 'checkedStatus_in' && (
            <p className="child-profile-row_status">
              Checked-in at: {childFetched.checkedInOptions.checkedInTime} {temporaryTime}
            </p>
          )}
          {toggleClass === 'checkedStatus_out' && (
            <p className="child-profile-row_status">
              Checked-out at: {childFetched.checkedInOptions.checkedOutTime}
              {temporaryTime}
            </p>
          )}
        </section>
      )}

      {toggleClass === 'checkedStatus_in' && (
        <div className="child-row_status_in">
          <p>Currently checked-in</p>
        </div>
      )}
      {toggleClass === 'checkedStatus_out' && (
        <div className="child-row_status_out">
          <p>Has been checked out since {childFetched.checkedInOptions.checkedOutTime} </p>
        </div>
      )}
    </div>
  )
}

export default SingleChild
