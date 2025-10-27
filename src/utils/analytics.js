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

// Format phone number to E.164 format (+[country code][number])
const formatPhoneToE164 = (phone, defaultCountryCode = '91') => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, '');
  
  // If no country code, add default (India = 91)
  if (!digits.startsWith(defaultCountryCode) && digits.length === 10) {
    digits = defaultCountryCode + digits;
  }
  
  // Add + prefix for E.164 format
  return '+' + digits;
};

// Push user data for Enhanced Conversions (GDPR compliant - hash on server side in GTM)
export const pushEnhancedConversionData = (userData) => {
  if (window.dataLayer) {
    // Format phone to E.164 if provided
    const formattedPhone = userData.phone ? formatPhoneToE164(userData.phone) : '';
    
    // Simple synchronous push - GTM will handle hashing via built-in variable or custom JavaScript
    const enhancedConversionData = {
      event: 'form_submit', // Single clear event name for GTM
      event_category: 'engagement',
      event_label: 'contact_form',
      // User data for enhanced conversions
      user_data: {
        email: userData.email || '',
        phone_number: formattedPhone, // E.164 format: +[country code][number]
        address: {
          first_name: userData.firstName || '',
          last_name: userData.lastName || ''
        }
      }
    };

    window.dataLayer.push(enhancedConversionData);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Enhanced Conversion Data Pushed to dataLayer:', {
        event: 'form_submit',
        email: userData.email || 'N/A',
        phone: formattedPhone || 'N/A',
        first_name: userData.firstName || 'N/A',
        last_name: userData.lastName || 'N/A'
      });
      console.log('📊 Full dataLayer object:', enhancedConversionData);
    }
  } else {
    console.warn('⚠️ dataLayer not found - is GTM installed?');
  }
};

// Track form submission with enhanced conversion data
export const trackFormSubmissionWithEnhancedConversion = (formData) => {
  if (window.dataLayer) {
    // Push the enhanced conversion data with all user info in one event
    pushEnhancedConversionData({
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName || formData.name?.split(' ')[0],
      lastName: formData.lastName || formData.name?.split(' ').slice(1).join(' ')
    });

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Form submission tracked with enhanced conversion data');
    }
  }
};