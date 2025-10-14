import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Hero from "./components/Hero";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import SecurityAndPrivacyPolicy from "./components/SecurityAndPrivacyPolicy";
import ContactUs from "./components/ContactUs";
import JoinOurWaitlist from "./components/JoinOurWaitlist";
import NotFound from "./components/NotFound";
import ServerError from "./components/ServerError";
import Maintenance from "./components/Maintenance";
import Cookies from "./components/Cookies";
import CookieBanner from "./components/CookieBanner";
import SEOHead from "./components/SEOHead";
import { useSEO } from "./hooks/useSEO";
import { useCookieConsent } from "./hooks/useCookieConsent";
import { ThemeProvider } from "./contexts/ThemeContext";

// Component to handle SEO for each route
function RouteWithSEO({ children }: { children: React.ReactNode }) {
  const seoConfig = useSEO();
  return (
    <>
      <SEOHead config={seoConfig} />
      {children}
    </>
  );
}

export default function App() {
  const { hasConsentFor } = useCookieConsent()

  // Example of how to conditionally load analytics based on consent
  // You can use hasConsentFor('analytics') to conditionally load tracking scripts
  const handleConsentChange = (preferences: any) => {
    // This is where you can initialize analytics or other services
    // based on the user's consent preferences
    console.log('Cookie consent updated:', preferences)
    
    // Example: Load Google Analytics only if analytics consent is given
    if (preferences.analytics && !hasConsentFor('analytics')) {
      // Initialize analytics here
      console.log('Analytics consent given - initialize tracking')
    }
  }

  return (
    <ThemeProvider>
      <HelmetProvider>
        <Router>
          <Routes>
          <Route path="/" element={
            <RouteWithSEO>
              <div className="min-h-screen flex flex-col">
                <Header showTagline={true} />

                <main className="flex-1">
                  <Hero />
                </main>

                <Footer />
              </div>
            </RouteWithSEO>
          } />
          <Route path="/about-us" element={
            <RouteWithSEO>
              <AboutUs />
            </RouteWithSEO>
          } />
          <Route path="/sap-policy" element={
            <RouteWithSEO>
              <SecurityAndPrivacyPolicy />
            </RouteWithSEO>
          } />
          <Route path="/contact-us" element={
            <RouteWithSEO>
              <ContactUs />
            </RouteWithSEO>
          } />
          <Route path="/join-our-waitlist" element={
            <RouteWithSEO>
              <JoinOurWaitlist />
            </RouteWithSEO>
          } />
          <Route path="/maintenance" element={
            <RouteWithSEO>
              <Maintenance />
            </RouteWithSEO>
          } />
          <Route path="/cookies" element={
            <RouteWithSEO>
              <Cookies />
            </RouteWithSEO>
          } />
          <Route path="/500" element={
            <RouteWithSEO>
              <ServerError />
            </RouteWithSEO>
          } />
          <Route path="*" element={
            <RouteWithSEO>
              <NotFound />
            </RouteWithSEO>
          } />
        </Routes>
        
          {/* Cookie Banner - appears on all routes */}
          <CookieBanner onConsentChange={handleConsentChange} />
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}
