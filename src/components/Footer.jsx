import Stack from 'react-bootstrap/Stack'
import tmdb from '../assets/tmdb-logo.svg'
import './Footer.css'

const Footer = () => {
  return (
    <Stack direction='horizontal'>
      <small>&copy; 2023 PAL Industries</small>
      <img src={tmdb} width='150px' id='tmdb-logo' alt='The Movie Database logo'/>
      <small id='tmdb-disclosure'>This product uses the TMDB API but is not endorsed or certified by TMDB.</small>
      <div id='responsive-voice-license'><a href="https://responsivevoice.org">ResponsiveVoice-NonCommercial</a> licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"><img title="ResponsiveVoice Text To Speech" src="https://responsivevoice.org/wp-content/uploads/2014/08/95x15.png" alt="95x15" width="95" height="15" /></a></div>
    </Stack>
  )
}

export default Footer;