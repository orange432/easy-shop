import React from 'react'

const UnauthorizedScreen = () => {
  return (
    <div>
      <h1>You are not authorized to view this screen</h1>
      <p>Please <a href="/login">Log in</a></p>
    </div>
  )
}

export default UnauthorizedScreen
