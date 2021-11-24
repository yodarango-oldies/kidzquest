// core
import React, { useState, useRef } from 'react'

// images
import boyIcon from '../../images/boy_icon.png'
import girlIcon from '../../images/girl-icon.png'

const Form = ({ showQRcode, handleCloseForm }) => {
  // hooks
  const childFirstName = useRef()
  const childLastName = useRef()
  const childAge = useRef()
  const parentName = useRef()
  const parentPhone = useRef()
  const childPhoto = useRef()
  const canvas = useRef()
  const [gendericonState, setgendericonState] = useState({ boy: '', girl: '' })
  const [genderState, setgenderState] = useState('')

  // *********************** submit hte form  ************************
  const regex = new RegExp('^[0-9]+$', 'g')
  // const checkRegex = () => {
  //   let x = regex.test(parentPhone.current.innerHTML)
  //   console.log(x)
  // }

  // ============== run validation on all inputs
  const runInputValidation = () => {
    if (childFirstName.current.innerHTML === '' || childFirstName.current.innerHTML === ' ') {
      alert('First Name is required')
      return false
    } else if (childLastName.current.innerHTML === '' || childLastName.current.innerHTML === ' ') {
      alert('Last Name is required')
      return false
    } else if (childAge.current.innerHTML === '' || childAge.current.innerHTML === ' ') {
      alert('Age is required')
      return false
    } else if (parentName.current.innerHTML === '' || parentName.current.innerHTML === ' ') {
      alert('Guardian Name is required')
      return false
    } else if (parentPhone.current.innerHTML === '' || parentPhone.current.innerHTML === ' ') {
      alert('Phone Number is required')
      return false
    } else if (regex.test(parentPhone.current.innerHTML === false)) {
      alert('Only numbers are accepted on the phone # fields. Please make sure there are no spaces nor special characters.')
      return false
    } else if (!childPhoto.current.value) {
      alert('Photo is required')
      return false
    } else if (genderState === '') {
      alert('Gender is required')
      return false
    } else {
      return true
    }
  }

  // ================ handle image submission ==============
  const [compressedImage, setcompressedImage] = useState('')
  const [thumbnailState, setthumbnailState] = useState('')
  const [originalSize, setOriginalSize] = useState('')
  const handleThumbnail = async (e) => {
    /* convert the orignal image to blob to set set it as preview */
    const blob = URL.createObjectURL(e.target.files[0])
    /* load file reader */
    const reader = new FileReader()
    /* read the loaded image to get the original size */
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      setOriginalSize(reader.result)
    }

    /* load the preview */
    setthumbnailState(
      <div className="phot-preview-wrapper ">
        <img
          src={blob}
          alt="child photo"
          className="photo-preview"
          onLoad={(e) => {
            /* when the image loads get tjhe src data and paint it on canvas */
            const scaleSize = 400 / e.target.width
            canvas.current.width = 400
            canvas.current.height = e.target.height * scaleSize

            const ctx = canvas.current.getContext('2d')
            ctx.drawImage(e.target, 0, 0, canvas.current.width, canvas.current.height)

            /* convert the compressed canvas to base64 */
            const srcEncoded = ctx.canvas.toDataURL(e.target, 'image/jpg')
            const before = (originalSize.length * 0.75) / 1024 /*get the original size of the image in KB*/
            const after = (srcEncoded.length * 0.75) / 1024 /*get the compressed size of the image in KB*/

            /* save the compressed size to mongodb */
            setcompressedImage(srcEncoded)
            console.log(`original= ${before} vs compressed${after}`)
          }}
        />
      </div>,
    )
  }

  // =========== handle the form submission =========
  const handleFormSubmission = async () => {
    if (runInputValidation() === true) {
      const firstInitials = childFirstName.current.innerHTML.slice(0, 2)
      const secondInitals = childLastName.current.innerHTML.slice(0, 2)
      const randomDigit = Math.floor(Math.random() * 100)
      const childId = `${firstInitials}${secondInitals}${randomDigit}`
      const registrationData = {
        childFirstName: childFirstName.current.innerHTML,
        childLastName: childLastName.current.innerHTML,
        childAge: childAge.current.innerHTML,
        guardianName: parentName.current.innerHTML,
        guardianPhoneNumber: parentPhone.current.innerHTML,
        gender: genderState,
        childId: childId,
        photo: compressedImage,
      }

      const req = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      })
      console.log(req)
      req.status === 200 ? showQRcode(childId) : alert('sorry, something went wrong, please try again!')
    }
  }

  return (
    <div className="register-form">
      <h2 className="std-title">Child's Gender</h2>
      <section className="register-form_boys-girls-wrapper">
        <div
          htmlFor="form_boy"
          className={`label-boy ${gendericonState.boy}`}
          onClick={() => {
            setgendericonState({ boy: 'selected-gender', girl: '' }), setgenderState('boy')
          }}>
          <img src={boyIcon} alt="avatar of a boy" className="form_boy" />
        </div>
        <div
          htmlFor="form_girl"
          className={`label-girl ${gendericonState.girl}`}
          onClick={() => {
            setgendericonState({ boy: '', girl: 'selected-gender' }), setgenderState('girl')
          }}>
          <img src={girlIcon} alt="avatar of a girl" className="form_girl" />
        </div>
      </section>
      <section className="register-form_input-wrapper">
        <label>Child's First Name</label>
        <p contentEditable id="childs-name" ref={childFirstName} className="std-input"></p>
        <label>Child's Last Name</label>
        <p contentEditable id="childs-name" ref={childLastName} className="std-input"></p>
        <label>Child's Age</label>
        <p contentEditable id="childs-age" ref={childAge} className="std-input"></p>
        <label>Guardian's Name</label>
        <p contentEditable id="parents-name" ref={parentName} className="std-input"></p>
        <label>Guardian's Phone #</label>
        <p contentEditable id="parents-phone" ref={parentPhone} className="std-input"></p>
        <label>Submit Photo</label>
        <label htmlFor="photo" id="photo-label"></label>
        <input type="file" id="photo" accept="image/*" onChange={handleThumbnail} ref={childPhoto} />
        {thumbnailState}
        <canvas ref={canvas} className="photo-canvas-place-holder"></canvas>
      </section>
      <button className="pink-button" onClick={handleFormSubmission}>
        Go! 🏃‍♂️
      </button>
      <button className="white-button" onClick={handleCloseForm}>
        Close
      </button>
    </div>
  )
}

export default Form
