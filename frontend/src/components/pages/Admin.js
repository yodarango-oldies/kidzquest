// core
import { useState, useEffect, Fragment, useRef } from 'react'
import Cookie from 'js-cookie'

//comps
import ChildProfileRow from '../chunks/child-progile-row'

const Admin = () => {
  // fetch all the children
  const [children, setchildren] = useState([])
  const getChildren = async () => {
    const req = await fetch('/all-children')
    const allChildren = await req.json()
    setchildren(allChildren)
    console.log(allChildren)
  }

  useEffect(() => {
    getChildren()
  }, [])

  // ==============  Handle Login ================
  const [login, setLogin] = useState(Cookie.get('logedin'))
  const username = useRef()
  const password = useRef()

  const handleLogin = () => {
    if (username.current && password.current) {
      if (username.current.innerHTML === 'KidzQuest' && password.current.innerHTML === 'K1dzQu35t!') {
        setLogin(Cookie.set('logedin', true, { expires: 0.2 }))
      } else {
        alert('Incorrect credentails.Try Again!')
      }
    }
  }

  return (
    <Fragment>
      {!login && (
        <div className="login-screen">
          <section>
            <label className="std-title">Username</label>
            <p className="std-input" contentEditable ref={username}></p>
            <label className="std-title">Password</label>
            <p className="std-input" contentEditable ref={password}></p>
            <div>
              <button className="pink-button" onClick={handleLogin}>
                Enter 🚪 🚶‍♂️
              </button>
            </div>
          </section>
        </div>
      )}
      <div className="admin-page-main-rapper">
        <h1></h1>
        {children.map((child) => (
          <ChildProfileRow child={child} key={child._id} />
        ))}
        <div className="std-spacer"></div>
      </div>
    </Fragment>
  )
}

export default Admin
