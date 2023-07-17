import Stack from 'react-bootstrap/Stack'
import tmdb from '../assets/tmdb-logo.svg'
import './Footer.css'

const Footer = () => {
  return (
    <Stack direction='horizontal'>
      <small>&copy; 2023 PAL Industries</small>
      <img src={tmdb} width='150px' id='tmdb-logo'/>
      <small id='tmdb-disclosure'>This product uses the TMDB API but is not endorsed or certified by TMDB.</small>
    </Stack>
  )
}

export default Footer;