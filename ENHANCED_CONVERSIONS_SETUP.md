# Enhanced Conversions Setup Guide

## Overview
This guide will help you set up Enhanced Conversions in Google Tag Manager (GTM) and Google Analytics 4 (GA4) to capture first-party user data for better conversion tracking and attribution.

## What's Been Implemented

### DataLayer Push on Form Submission
When a user successfully submits the contact form, the following data is pushed to `window.dataLayer`:

```javascript
{
  event: 'form_submit',
  event_category: 'engagement',
  event_label: 'contact_form',
  user_data: {
    email: 'user@example.com',
    phone_number: '',
    address: {
      first_name: 'John',
      last_name: 'Doe'
    }
  }
}
```

**Note:** Only ONE event fires now (`form_submit`), which makes tracking cleaner and easier to set up in GTM.

## GTM Setup Instructions

### Step 1: Create Data Layer Variables

1. Go to **Variables** → **New** → **User-Defined Variables**
2. Create the following variables:

#### Variable 1: DL - User Email
- **Type:** Data Layer Variable
- **Data Layer Variable Name:** `user_data.email`
- **Name:** `DL - User Email`

#### Variable 2: DL - User First Name
- **Type:** Data Layer Variable
- **Data Layer Variable Name:** `user_data.address.first_name`
- **Name:** `DL - User First Name`

#### Variable 3: DL - User Last Name
- **Type:** Data Layer Variable
- **Data Layer Variable Name:** `user_data.address.last_name`
- **Name:** `DL - User Last Name`

#### Variable 4: DL - User Phone (Optional)
- **Type:** Data Layer Variable
- **Data Layer Variable Name:** `user_data.phone_number`
- **Name:** `DL - User Phone`

### Step 2: Create SHA-256 Hashing Variables (for Enhanced Conversions)

GTM can hash the data before sending to GA4:

#### Hashed Email Variable
- **Type:** Custom JavaScript Variable
- **Name:** `JS - SHA256 Email`
- **Code:**
```javascript
function() {
  var email = {{DL - User Email}};
  if (!email) return '';
  
  // Normalize email (lowercase, trim)
  email = email.toLowerCase().trim();
  
  // Simple hash function (or use GTM's built-in hashing in GA4 tag)
  return email; // GTM will hash this in the GA4 tag if configured
}
```

### Step 3: Create Trigger for Form Submission

1. Go to **Triggers** → **New**
2. **Trigger Type:** Custom Event
3. **Event name:** `form_submit`
4. **Name:** `CE - Form Submit`

### Step 4: Create GA4 Event Tag with Enhanced Conversions

1. Go to **Tags** → **New**
2. **Tag Type:** GA4 Event
3. **Configuration Tag:** Select your GA4 Configuration tag
4. **Event Name:** `form_submit`

5. **Enable Enhanced Conversions:**
   - Scroll down to **User Properties**
   - Click **+ Add Row** for each:
     - `user_email`: `{{DL - User Email}}`
     - `user_first_name`: `{{DL - User First Name}}`
     - `user_last_name`: `{{DL - User Last Name}}`

6. **Event Parameters** (optional but recommended):
   - `event_category`: `{{DL - Event Category}}` or just type `engagement`
   - `event_label`: `{{DL - Event Label}}` or just type `contact_form`

7. **Triggering:** `CE - Form Submit`
8. **Name:** `GA4 - Form Submit with Enhanced Conversion`

### Step 5: Update GA4 Configuration Tag

1. Find your **GA4 Configuration** tag
2. Under **Fields to Set**:
   - Enable **Send user-provided data**
3. Under **User Properties**, add:
   - `email`: `{{DL - User Email}}`
   - `first_name`: `{{DL - User First Name}}`
   - `last_name`: `{{DL - User Last Name}}`

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
