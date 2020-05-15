import React from 'react'

const Home = () => {
  const backgroundImageUrl = 'https://cdn.stocksnap.io/img-thumbs/960w/minimal-white_EAVNVUIK49.jpg'

  const homeStyles = {
    /* Center the heading inside the container */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${backgroundImageUrl})`,
    opacity: '.9',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    textAlign: 'center'
  }
  const headText = {
    fontSize: '240px',
    color: 'black'
  }

  return (
    <div style={homeStyles}>
      <div>
        <h1 style={headText}>Todooli</h1>
        <h3>Take Notice!</h3>
      </div>
    </div>
  )
}
export default Home
