import React, { Fragment, useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 20,
  },
})

const QRCode = ({ childId, handleCloseForm, childName }) => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const [url] = useState(`https://kidz-quest.herokuapp.com/child?childId=${childId}`)
  const [color] = useState(dayOfWeek === 3 ? '#023e8a' : dayOfWeek === 4 ? '#9d0208' : dayOfWeek === 5 ? '#007200' : '')
  const ref = useRef(null)

  useEffect(() => {
    qrCode.append(ref.current)
  }, [])

  useEffect(() => {
    qrCode.update({
      data: url,
      dotsOptions: {
        color: color,
        type: 'rounded',
      },
    })
  }, [url])

  const onDownloadClick = () => {
    qrCode.download({
      extension: 'png',
    })
  }

  return (
    <Fragment>
      {dayOfWeek === 3 && (
        <div className="QR-code-wrapper">
          <div className="subwrapper">
            <h1 className="std-title">
              <span style={{ color: 'white' }}>{childName.replace('&nbsp;', '')} </span> Has Been Successfully Registered! 😀
            </h1>
            <p className="std-text-info">Please download or take a screenshot of the QR Code below and present it at the entrance. </p>
            <div ref={ref} className="canvas-wrapper" />
            <button onClick={onDownloadClick} className="pink-button">
              Download
            </button>
            <button className="white-button" onClick={handleCloseForm}>
              Close
            </button>
          </div>
        </div>
      )}
      {dayOfWeek !== 3 && (
        <div className="QR-code-wrapper">
          <div className="subwrapper">
            <h1 className="std-title">
              <h1 style={{ color: 'white', fontFamily: 'inherit' }}>{childName.replace('&nbsp;', '')}</h1> is ready to be checked in{' '}
            </h1>
            <p className="std-text-info">Please download or take a screenshot of the QR Code below and present it at the entrance. </p>
            <div ref={ref} className="canvas-wrapper" />
            <button onClick={onDownloadClick} className="pink-button">
              Download
            </button>
            <button className="white-button" onClick={handleCloseForm}>
              Close
            </button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default QRCode
