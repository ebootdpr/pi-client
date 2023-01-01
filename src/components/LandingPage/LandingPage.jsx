import React from 'react'
import { Link } from 'react-router-dom'
import stylo from "./LandingPage.module.css"
function LandingPage() {
  return (
    <div className={stylo.LandingPageContainer}>
        <Link to="/countries">
        <h1 className={stylo.mainTitle}>DEPLOY</h1>
        </Link>
        <Link to="/countries">
        <video autoPlay loop muted>
             <source src="/LandingBackground.mp4" type="video/mp4" />
        </video>
        </Link>
    </div>
  )
}

export default LandingPage