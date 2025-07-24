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