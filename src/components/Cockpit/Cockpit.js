import React, { useEffect, useRef, useContext } from 'react';
import './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
  const toggleButtonRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    //http request...
    setTimeout(() => {
      alert('Saved data to cloud');
    }, 1000);
    toggleButtonRef.current.click();
    return () => {
      //clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect')
    }
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect')
    };
  })

  //useEffect(); can be used multiple times in the fc


  return (
    <div>
      <h1>{props.title}</h1>
      <p>This is really working!</p>
      <button
        ref={toggleButtonRef}
        className="styleBtn"
        onClick={props.clicked}>Toggle Persons</button>

      {<button onClick={authContext.login} className="styleBtn">Log in</button>}


    </div>

  );
};

export default React.memo(cockpit);

