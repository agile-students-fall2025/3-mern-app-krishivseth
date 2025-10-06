import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'

const About = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
        setAboutData(response.data.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load about information')
        setLoading(false)
        console.error('Error fetching about data:', err)
      }
    }

    fetchAboutData()
  }, [])

  if (loading) {
    return (
      <div className="about-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="about-container">
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <div className="about-container">
      <h1>{aboutData.title}</h1>
      <div className="about-content">
        <div className="about-image">
          <img 
            src={aboutData.imageUrl} 
            alt="Profile" 
            className="profile-image"
          />
        </div>
        <div className="about-text">
          {aboutData.paragraphs.map((paragraph, index) => (
            <p key={index} className="about-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
