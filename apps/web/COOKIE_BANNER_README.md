# Cookie Banner / CMP Implementation

This implementation provides a minimal, clear cookie consent management platform (CMP) that respects user privacy by only setting non-essential cookies after explicit opt-in.

## Features

- ✅ **Privacy-first design**: Only essential cookies are set by default
- ✅ **Clear consent options**: Users can choose between "Essential only", "Customize", or "Accept all"
- ✅ **Granular control**: Separate toggles for functional and analytics cookies
- ✅ **Persistent preferences**: User choices are saved and respected across sessions
- ✅ **Easy management**: Cookie preferences can be updated anytime via footer link
- ✅ **GDPR compliant**: Follows privacy-by-design principles

## Components

### CookieBanner.tsx
The main cookie banner component that appears on first visit. Features:
- Simple, non-intrusive design
- Two-step interface (simple → detailed preferences)
- Clear descriptions of each cookie type
- Respectful of user choice

### CookieManager.tsx
Modal component for managing cookie preferences. Accessible via:
- Footer "Cookie Preferences" link
- Can be triggered programmatically from anywhere in the app

### useCookieConsent.ts
Custom React hook for managing cookie consent state:
```typescript
const { consentData, updateConsent, clearConsent, hasConsentFor } = useCookieConsent()

// Check if user has consented to analytics
if (hasConsentFor('analytics')) {
  // Initialize Google Analytics
}
```

### cookieUtils.ts
Utility functions for cookie management:
- `hasConsentForCookieType()` - Check consent for specific cookie types
- `initializeAnalytics()` - Conditionally load analytics
- `clearNonEssentialCookies()` - Clean up when consent is withdrawn
- `withConsentCheck()` - Higher-order function for conditional feature loading

## Cookie Types

### Essential Cookies (Always enabled)
- Authentication and security
- Session management
- Load balancing
- Cannot be disabled (required for site functionality)

### Functional Cookies (Opt-in)
- User preferences (theme, language)
- Accessibility settings
- UI customizations
- Duration: Up to 12 months

### Analytics Cookies (Opt-in)
- Page views and navigation tracking
- Feature usage statistics
- Performance metrics
- Duration: Up to 24 months

## Usage Examples

### Basic Implementation
The cookie banner is automatically included in the main App component and will appear on first visit.

### Checking Consent in Components
```typescript
import { useCookieConsent } from '../hooks/useCookieConsent'

function MyComponent() {
  const { hasConsentFor } = useCookieConsent()
  
  useEffect(() => {
    if (hasConsentFor('analytics')) {
      // Load analytics tracking
    }
    
    if (hasConsentFor('functional')) {
      // Load user preferences
    }
  }, [hasConsentFor])
}
```

### Using Utility Functions
```typescript
import { withConsentCheck, hasConsentForCookieType } from '../utils/cookieUtils'

// Conditional feature loading
const analytics = withConsentCheck(
  'analytics',
  'Google Analytics',
  () => initializeGoogleAnalytics()
)

// Simple consent check
if (hasConsentForCookieType('functional')) {
  loadUserPreferences()
}
```

### Programmatically Opening Cookie Manager
```typescript
import { useState } from 'react'
import CookieManager from '../components/CookieManager'

function MyComponent() {
  const [showCookieManager, setShowCookieManager] = useState(false)
  
  return (
    <>
      <button onClick={() => setShowCookieManager(true)}>
        Manage Cookies
      </button>
      
      <CookieManager 
        isOpen={showCookieManager}
        onClose={() => setShowCookieManager(false)}
      />
    </>
  )
}
```

## Privacy Features

1. **No tracking by default**: Only essential cookies are set initially
2. **Explicit consent**: Users must actively choose to enable non-essential cookies
3. **Granular control**: Separate consent for different cookie categories
4. **Easy withdrawal**: Users can change preferences anytime
5. **Secure storage**: Cookie preferences stored locally with proper security flags
6. **Automatic cleanup**: Non-essential cookies removed when consent is withdrawn

## Technical Details

- **Storage**: Preferences stored in localStorage with consent date
- **Cookie flags**: All cookies use `SameSite=Strict` and `Secure` flags
- **Expiration**: Consent valid for 1 year (configurable)
- **Validation**: Built-in consent validation and error handling
- **Accessibility**: Full keyboard navigation and screen reader support

## Integration Notes

- The banner automatically appears on first visit
- Existing cookie policy page at `/cookies` provides detailed information
- Footer includes "Cookie Preferences" link for easy access
- All components are responsive and work on mobile devices
- No external dependencies required (uses existing Lucide React icons)

## Testing

To test the cookie banner:
1. Clear localStorage: `localStorage.clear()`
2. Refresh the page - banner should appear
3. Test all consent options
4. Verify cookies are set/removed based on choices
5. Test the cookie manager modal from footer link

## Future Enhancements

- Integration with Google Analytics 4
- Support for additional cookie categories
- Consent analytics (track consent rates)
- A/B testing for banner designs
- Integration with privacy management platforms
