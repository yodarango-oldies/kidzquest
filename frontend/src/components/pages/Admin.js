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

  // ============== look up child
  const LookUpChild = async (e) => {
    const req = await fetch(`/findAdmin/${e.target.value}`)
    const allChildren = await req.json()
    console.log(allChildren)
    setchildren(allChildren)
    console.log(e.target.value)
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
        <p className={'std-input std-input_admin-page'}>
          <input type={'text'} onChange={LookUpChild} />
          {/*<button className="pink-button re-register-buttons" onClick={findChild}>
            Find Child
      </button>*/}
        </p>
        {children.map((child) => (
          <ChildProfileRow child={child} key={child._id} />
        ))}
        <div className="std-spacer"></div>
      </div>
    </Fragment>
  )
}

export default Admin
