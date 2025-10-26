// src/utils/analytics.js

// Basic event tracking for GA4/GTM
export const trackEvent = (eventName, eventCategory, eventLabel, value = null) => {
  if (window.dataLayer) {
    const eventData = {
      event: eventName,
      event_category: eventCategory,
      event_label: eventLabel,
    };
    
    // Add value if provided (useful for tracking download counts, etc.)
    if (value !== null) {
      eventData.value = value;
    }
    
    window.dataLayer.push(eventData);
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Event tracked: ${eventName} | ${eventCategory} | ${eventLabel}`);
    }
  }
};

// Track page/section views
export const trackPageView = (pageName, section = null) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_title: pageName,
      page_section: section,
    });
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Page view tracked: ${pageName}`);
    }
  }
};

// Track user engagement time
export const trackEngagement = (section, timeSpent) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'user_engagement',
      engagement_time_msec: timeSpent,
      section: section,
    });
  }
};

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'scroll',
      scroll_depth: percentage,
    });
  }
};

// Push user data for Enhanced Conversions (GDPR compliant - hash on server side in GTM)
export const pushEnhancedConversionData = (userData) => {
  if (window.dataLayer) {
    // SHA-256 hashing function for client-side (basic implementation)
    // Note: For production, consider server-side hashing via GTM Server-Side or your backend
    const hashString = async (str) => {
      if (!str) return '';
      const normalized = str.toLowerCase().trim();
      const encoder = new TextEncoder();
      const data = encoder.encode(normalized);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    };

    // Push user data to dataLayer for Enhanced Conversions
    const pushData = async () => {
      const enhancedConversionData = {
        event: 'enhanced_conversion_data',
        user_data: {
          // Raw data for GTM to hash (recommended approach)
          email: userData.email || '',
          phone_number: userData.phone || '',
          
          // Address data (if available)
          address: {
            first_name: userData.firstName || '',
            last_name: userData.lastName || '',
            street: userData.street || '',
            city: userData.city || '',
            region: userData.region || '',
            postal_code: userData.postalCode || '',
            country: userData.country || ''
          }
        }
      };

      // Also push hashed versions (optional, but recommended for privacy)
      if (userData.email) {
        enhancedConversionData.user_data.sha256_email_address = await hashString(userData.email);
      }
      if (userData.phone) {
        enhancedConversionData.user_data.sha256_phone_number = await hashString(userData.phone.replace(/\D/g, ''));
      }

      window.dataLayer.push(enhancedConversionData);

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Enhanced Conversion Data Pushed:', {
          email: userData.email ? '***' + userData.email.slice(-10) : 'N/A',
          phone: userData.phone ? '***' + userData.phone.slice(-4) : 'N/A',
          dataLayer: enhancedConversionData
        });
      }
    };

    pushData();
  }
};

// Track form submission with enhanced conversion data
export const trackFormSubmissionWithEnhancedConversion = (formData, conversionLabel = 'contact_form_submission') => {
  if (window.dataLayer) {
    // First push the enhanced conversion data
    pushEnhancedConversionData({
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName || formData.name?.split(' ')[0],
      lastName: formData.lastName || formData.name?.split(' ').slice(1).join(' ')
    });

    // Then push the conversion event
    window.dataLayer.push({
      event: 'conversion',
      conversion_label: conversionLabel,
      conversion_value: 1,
      conversion_currency: 'USD'
    });

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Enhanced Conversion tracked: ${conversionLabel}`);
    }
  }
};