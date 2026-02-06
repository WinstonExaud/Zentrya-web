import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LandingPage from './components/LandingPage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import About from './components/About'
import Licensing from './components/Licensing'
import TermsOfUse from './components/Terms'
import RefundPolicy from './components/Refund'
import CopyrightPolicy from './components/Rights'
import PrivacyPolicy from './components/Privacy'
import Contact from './components/Contact'
import Pricing from './components/Pricing'
import Waitlist from './components/waitlist'
import Comingsoon from './components/Comingsoon'
import Help from './components/Help'
import Press from './components/Press'
import Careers from './components/Careers'
import Devices from './components/Devices'
import Home from './screens/Home'
import Profiles from './screens/Profiles'
import ManageProfiles from './screens/ManageProfiles'
import VideoPlayer from './screens/Videoplayer'
import Search from './screens/search'
import AccountSettings from './screens/AccountSettings'
import Application from './components/Application'
import NotFound from './components/NotFound'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

// Function to format page titles nicely
const getPageTitle = (pathname) => {
  const path = pathname.split('/').pop() || 'home'
  const cleanPath = path.split('?')[0]
  
  switch (cleanPath) {
    case '':
      return 'Home'
    case 'home':
      return 'Home'
    case 'profiles':
      return 'Profiles'
    case 'manage':
      return 'Manage Profiles'
    case 'search':
      return 'Search'
    case 'account':
      return 'Account Settings'
    case 'watch':
      return 'Watch'
    case 'login':
      return 'Login'
    case 'signup':
      return 'Sign Up'
    case 'about':
      return 'About'
    case 'contact':
      return 'Contact'
    case 'careers':
      return 'Careers'
    case 'devices':
      return 'Devices'
    case 'privacy':
      return 'Privacy Policy'
    case 'copyright':
      return 'Copyright Policy'
    case 'refund':
      return 'Refund Policy'
    case 'terms':
      return 'Terms of Use'
    case 'help':
      return 'Help Center'  
    case 'press':
      return 'Press'
    case 'licensing':
      return 'Licensing'
    case 'coming-soon':
      return 'Coming Soon'
    case 'waitlist':
      return 'Waitlist'
    case '404':
      return '404 Not Found'
    case 'pricing':
      return 'Pricing'    
    default:
      return cleanPath
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
  }
}

// Scroll to top smoothly on route change
function ScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
  
  return null
}

// Component to handle title changes
function TitleUpdater() {
  const location = useLocation()
  
  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname)
    const baseTitle = 'Zentrya'
    
    if (location.pathname === '/') {
      document.title = 'Zentrya | Stream the best African movies, series, and originals'
    } else if (location.pathname === '/coming-soon') {
      document.title = 'Zentrya | Coming Soon'
    } else {
      document.title = `${baseTitle} | ${pageTitle}`
    }
  }, [location.pathname])
  
  return null
}

// Page transition wrapper component
function PageTransition({ children }) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('fadeIn')

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut')
    }
  }, [location, displayLocation])

  return (
    <div
      className={`page-transition ${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransitionStage('fadeIn')
          setDisplayLocation(location)
        }
      }}
    >
      <Routes location={displayLocation}>
        {/* About Page - ONLY ACTIVE PAGE */}
        <Route path="/about" element={<About />} />
        
        {/* All Other Pages - Show Coming Soon */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Comingsoon/>} />
        <Route path="/careers" element={<Comingsoon/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/licensing" element={<Licensing />} />
        <Route path="/devices" element={<Comingsoon />} />
        <Route path="/privacy" element={<PrivacyPolicy/>} />
        <Route path="/application" element={<Application/>} />
        <Route path="/copyright" element={<CopyrightPolicy/>} />
        <Route path="/refund" element={<Comingsoon/>} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/press" element={<Comingsoon/>} />
        <Route path="/coming-soon" element={<Comingsoon />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Comingsoon/>} />
        <Route path="/signup" element={<Comingsoon/>} />
        <Route path="/profiles" element={<Comingsoon />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/profiles/manage" element={<ManageProfiles />} />
        <Route path="/account" element={<Comingsoon/>} />
        <Route path="/watch/:type/:id" element={<VideoPlayer />} />
        
        {/* 404 Not Found - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <TitleUpdater />
        <PageTransition />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App