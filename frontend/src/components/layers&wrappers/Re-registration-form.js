// core
import React, { useState, useRef } from 'react'

const ReRegistration = ({ showQRcode, showRegistrationForm }) => {
  // hooks
  const codeInput = useRef()
  const [childState, setChildState] = useState({ children: [], message: '' })
  // *********************** Find the child  ************************
  const findChild = async () => {
    setChildState({ message: 'Looking...🔎' })
    try {
      if (codeInput.current.value !== '' || codeInput.current.value !== ' ') {
        const childName = codeInput.current.value.toLowerCase().trim() //.replace('&nbsp;', '')
        const req = await fetch(`/child/${childName}`)
        const children = await req.json()
        console.log(childName)
        children.length === 0
          ? setChildState({ message: 'No children found with that name, please check your spelling' })
          : setChildState({ children: children })
      }
    } catch (error) {
      console.log(error)
    }
  }
  // *********************** Find the child  ************************
  const handleChild_Re_registration = async (childObj) => {
    //delete childObj.date
    // delete childObj.checkedIn
    //delete childObj._id
    console.log(childObj)
    try {
      const req = await fetch('/re-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(childObj),
      })
      req.status === 200 ? showQRcode(childObj.childId, childObj.childFirstName) : alert('Something went wrong. Please try again!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="register-form">
      <section className="register-form_subwrapper">
        <h2 className="std-title">Enter Your Child's First Name</h2>
        <p className="std-text-info">
          <i>(If already registered)</i>
        </p>
        <p id="childs-name" className="std-input register-form_std-input">
          {' '}
          <input type="text" ref={codeInput} />
        </p>
        <button className="pink-button re-register-buttons" onClick={findChild}>
          Find My Child
        </button>
        {childState.message && <p className="std-text-info">{childState.message}</p>}
        {childState.children &&
          childState.children.map((child) => (
            <section className="find-child-wrapper" key={child.id}>
              <p className="std-title">
                Name:{' '}
                <span className="std-title">
                  {child.childFirstName.replace('&nbsp;', '')} {child.childLastName.replace('&nbsp;', '')}
                </span>
              </p>
              <p className="std-title">
                Age: <span className="std-title">{child.childAge}</span>
              </p>

              <button className="purple-button re-register-buttons" onClick={() => handleChild_Re_registration(child)}>
                This is my child
              </button>
            </section>
          ))}
        <h3 className="std-title">OR</h3>
        <button className="white-button re-register-buttons" onClick={showRegistrationForm}>
          Register My Child
        </button>
      </section>
    </div>
  )
}

export default ReRegistration
