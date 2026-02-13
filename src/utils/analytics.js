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
    if (import.meta.env.DEV) {
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
    if (import.meta.env.DEV) {
      console.log(`Page view tracked: ${pageName}`);
    }
  }
};

// Format phone number to E.164 format (+[country code][number])
const formatPhoneToE164 = (phone, defaultCountryCode = '91') => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, '');
  
  // If it's a 10-digit number (no country code), add default country code (India = 91)
  if (digits.length === 10) {
    digits = defaultCountryCode + digits;
  }
  
  // Add + prefix for E.164 format
  return '+' + digits;
};

// Track form submission with enhanced conversion data
export const trackFormSubmissionWithEnhancedConversion = (formData) => {
  if (window.dataLayer) {
    // Log what we're receiving
    if (import.meta.env.DEV) {
      console.log('📝 Form data received:', formData);
    }

    // Format phone to E.164 if provided
    const formattedPhone = formData.phone ? formatPhoneToE164(formData.phone) : '';
    
    // Prepare the data object
    const userData = {
      email: formData.email || '',
      phone: formData.phone || '',
      firstName: formData.firstName || formData.name?.split(' ')[0] || '',
      lastName: formData.lastName || formData.name?.split(' ').slice(1).join(' ') || ''
    };

    if (import.meta.env.DEV) {
      console.log('👤 User data prepared:', userData);
    }

    // Push directly - don't call another function
    const enhancedConversionData = {
      event: 'form_success',
      event_category: 'engagement',
      event_label: 'contact_form',
      email: userData.email,
      phone_number: formattedPhone,
      first_name: userData.firstName,
      last_name: userData.lastName
    };

    window.dataLayer.push(enhancedConversionData);

    // Log in development
    if (import.meta.env.DEV) {
      console.log('✅ Form submission tracked with enhanced conversion data');
      console.log('📊 DataLayer push:', enhancedConversionData);
    }
  }
};