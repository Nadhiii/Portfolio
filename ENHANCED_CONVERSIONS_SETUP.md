# Enhanced Conversions Setup Guide

## Overview
This guide will help you set up Enhanced Conversions in Google Tag Manager (GTM) and Google Analytics 4 (GA4) to capture first-party user data for better conversion tracking and attribution.

## What's Been Implemented

### 1. DataLayer Push on Form Submission
When a user successfully submits the contact form, the following data is pushed to `window.dataLayer`:

```javascript
{
  event: 'enhanced_conversion_data',
  user_data: {
    email: 'user@example.com',                    // Raw email
    sha256_email_address: 'hashed_email',         // SHA-256 hashed email
    phone_number: '+919876543210',                // Raw phone (if available)
    sha256_phone_number: 'hashed_phone',          // SHA-256 hashed phone
    address: {
      first_name: 'John',
      last_name: 'Doe',
      street: '',                                 // Not captured in current form
      city: '',                                   // Not captured in current form
      region: '',                                 // Not captured in current form
      postal_code: '',                            // Not captured in current form
      country: ''                                 // Not captured in current form
    }
  }
}

// Followed by conversion event
{
  event: 'conversion',
  conversion_label: 'contact_form_submission',
  conversion_value: 1,
  conversion_currency: 'USD'
}
```

## GTM Setup Instructions

### Step 1: Create Data Layer Variables

1. Go to **Variables** → **New** → **User-Defined Variables**
2. Create the following variables:

#### Variable 1: DL - User Email
- **Type:** Data Layer Variable
- **Data Layer Variable Name:** `user_data.email`
- **Name:** `DL - User Email`

#### Variable 2: DL - User Email (Hashed)
- **Type:** Data Layer Variable
- **Data Layer Variable Name:** `user_data.sha256_email_address`
- **Name:** `DL - User Email Hashed`

#### Variable 3: DL - User Phone
- **Type:** Data Layer Variable
- **Data Layer Variable Name:** `user_data.phone_number`
- **Name:** `DL - User Phone`

#### Variable 4: DL - User Phone (Hashed)
- **Type:** Data Layer Variable
- **Data Layer Variable Name:** `user_data.sha256_phone_number`
- **Name:** `DL - User Phone Hashed`

#### Variable 5: DL - User First Name
- **Type:** Data Layer Variable
- **Data Layer Variable Name:** `user_data.address.first_name`
- **Name:** `DL - User First Name`

#### Variable 6: DL - User Last Name
- **Type:** Data Layer Variable
- **Data Layer Variable Name:** `user_data.address.last_name`
- **Name:** `DL - User Last Name`

### Step 2: Create Trigger for Enhanced Conversion

1. Go to **Triggers** → **New**
2. **Trigger Type:** Custom Event
3. **Event name:** `enhanced_conversion_data`
4. **Name:** `CE - Enhanced Conversion Data`

### Step 3: Update Your GA4 Configuration Tag

1. Go to **Tags** → Find your **GA4 Configuration** tag
2. Enable **Include user-provided data from the website**
3. Check the following options:
   - ☑️ Email
   - ☑️ Phone number
   - ☑️ Address (if you add more fields later)

4. In **User-Provided Data** section, map the variables:
   - **Email:** `{{DL - User Email Hashed}}`
   - **Phone:** `{{DL - User Phone Hashed}}`
   - **First Name:** `{{DL - User First Name}}`
   - **Last Name:** `{{DL - User Last Name}}`

### Step 4: Create Enhanced Conversion Event Tag

1. Go to **Tags** → **New**
2. **Tag Type:** GA4 Event
3. **Configuration Tag:** Select your GA4 Configuration tag
4. **Event Name:** `contact_form_submission`
5. **Event Parameters:**
   - `user_email`: `{{DL - User Email Hashed}}`
   - `user_phone`: `{{DL - User Phone Hashed}}`
   - `conversion_label`: `contact_form_submission`
6. **Triggering:** `CE - Enhanced Conversion Data`
7. **Name:** `GA4 - Enhanced Conversion - Contact Form`

### Step 5: (Optional) Google Ads Conversion Tag

If you're running Google Ads:

1. Go to **Tags** → **New**
2. **Tag Type:** Google Ads Conversion Tracking
3. **Conversion ID:** Your Google Ads Conversion ID
4. **Conversion Label:** Your conversion label
5. **Enhanced Conversions:**
   - Enable "Manual Enhanced Conversions"
   - **Email:** `{{DL - User Email}}`
   - **Phone:** `{{DL - User Phone}}`
   - **First Name:** `{{DL - User First Name}}`
   - **Last Name:** `{{DL - User Last Name}}`
6. **Triggering:** `CE - Enhanced Conversion Data`

## GA4 Setup Instructions

### Step 1: Enable Enhanced Conversions in GA4

1. Go to **Admin** → **Data Streams** → Select your web stream
2. Click **Configure tag settings**
3. Under **Show advanced settings**, enable:
   - ☑️ **Include user-provided data from the website**

### Step 2: Mark Event as Conversion

1. Go to **Configure** → **Events**
2. Find `contact_form_submission` event (it will appear after first submission)
3. Toggle **Mark as conversion** to ON

### Step 3: Verify Enhanced Conversions

1. Go to **Admin** → **Data Display** → **Reporting Identity**
2. Check **Observed**:
   - Should show "User-ID and device"
   - Should show "Google signals" enabled
   - Should show "User-provided data" enabled

## Testing

### 1. Preview Mode in GTM
1. In GTM, click **Preview**
2. Enter your website URL
3. Submit a test contact form
4. In GTM Debug Panel, check:
   - `enhanced_conversion_data` event fired
   - All user data variables populated correctly
   - GA4 tags fired with enhanced data

### 2. Check DataLayer in Browser Console
Open DevTools Console and type:
```javascript
console.log(window.dataLayer);
```

You should see the enhanced conversion data objects after form submission.

### 3. GA4 DebugView
1. In GA4, go to **Configure** → **DebugView**
2. Enable debug mode in GTM Preview
3. Submit form and verify `contact_form_submission` event with user properties

## Privacy & GDPR Compliance

### Important Notes:
1. **Hashing is done client-side** using SHA-256 for basic privacy
2. **Consider server-side hashing** for production via GTM Server-Side Container
3. **Update Privacy Policy** to mention enhanced conversions
4. **Obtain user consent** before collecting this data (implement consent mode)
5. **Raw data is hashed** before being sent to Google servers

### Recommended: Implement Consent Mode v2
```javascript
// In your GTM container, configure Consent Mode
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});

// Update after user consent
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'analytics_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted'
});
```

## Troubleshooting

### Issue: Variables are undefined
- Check that dataLayer event name matches exactly: `enhanced_conversion_data`
- Verify variable names in GTM match the dataLayer keys

### Issue: Enhanced conversions not showing in GA4
- Wait 24-48 hours for data to populate
- Check GA4 Admin → Data Display → Attribution Settings
- Verify user-provided data is enabled

### Issue: Hashing not working
- Ensure browser supports `crypto.subtle` (HTTPS required)
- Check browser console for errors

## Support
For issues or questions, check:
- [GA4 Enhanced Conversions Documentation](https://support.google.com/analytics/answer/9744165)
- [GTM Enhanced Conversions Guide](https://support.google.com/tagmanager/answer/11317891)
- [Google Ads Enhanced Conversions](https://support.google.com/google-ads/answer/11062876)

---

**Last Updated:** October 26, 2025
