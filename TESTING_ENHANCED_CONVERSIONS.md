# Testing Enhanced Conversions Implementation

## Quick Test in Browser Console

### 1. Check if dataLayer exists
Open your website and run in console:
```javascript
console.log(window.dataLayer);
```

### 2. Monitor dataLayer updates
Run this before submitting the form:
```javascript
// Monitor all dataLayer pushes
const originalPush = window.dataLayer.push;
window.dataLayer.push = function() {
  console.log('🔵 DataLayer Push:', arguments[0]);
  return originalPush.apply(this, arguments);
};
```

### 3. Check Enhanced Conversion Data after form submission
After submitting the contact form, check:
```javascript
// Get the last few dataLayer entries
console.log(window.dataLayer.slice(-5));

// Filter for enhanced conversion events
window.dataLayer.filter(item => item.event === 'enhanced_conversion_data');
```

### 4. Verify user data structure
```javascript
// Should show something like:
{
  event: "enhanced_conversion_data",
  user_data: {
    email: "test@example.com",
    sha256_email_address: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    phone_number: "",
    sha256_phone_number: "",
    address: {
      first_name: "John",
      last_name: "Doe",
      street: "",
      city: "",
      region: "",
      postal_code: "",
      country: ""
    }
  }
}
```

## GTM Preview Mode Testing

### 1. Enable GTM Preview
- Go to your GTM container
- Click "Preview" button
- Enter your website URL
- Tag Assistant will connect

### 2. Submit Contact Form
- Fill out and submit the contact form
- Watch for these events in GTM Debug Panel:
  - ✅ `enhanced_conversion_data` - Should fire
  - ✅ `conversion` - Should fire immediately after
  - ✅ GA4 Config Tag - Should fire with enhanced data
  - ✅ GA4 Event Tag - Should capture the conversion

### 3. Verify Variables
In GTM Debug Panel → Variables:
- Check `DL - User Email` = actual email
- Check `DL - User Email Hashed` = SHA-256 hash
- Check `DL - User First Name` = first name
- Check `DL - User Last Name` = last name

## Sample Test Form Data

Use this test data for submissions:
```
Name: John Doe
Email: john.doe@example.com
Subject: Test Enhanced Conversions
Message: Testing the enhanced conversion tracking implementation.
```

Expected dataLayer output:
```javascript
{
  event: "enhanced_conversion_data",
  user_data: {
    email: "john.doe@example.com",
    sha256_email_address: "a8cfcd74832004951b4408cdb0a5dbcd8c7e52d43f7fe244bf720582e05241da",
    phone_number: "",
    sha256_phone_number: "",
    address: {
      first_name: "John",
      last_name: "Doe"
    }
  }
}
```

## Verifying in GA4

### Real-time Reports
1. Go to GA4 → Reports → Realtime
2. Submit a test form
3. Within 1-2 minutes, you should see:
   - Event name: `contact_form_submission`
   - User properties populated

### DebugView
1. Enable GTM Preview mode
2. Go to GA4 → Configure → DebugView
3. Submit form
4. Check event parameters include:
   - `user_email` (hashed)
   - `user_phone` (hashed, if provided)
   - `conversion_label`

### Events Report (24 hours later)
1. Go to Reports → Engagement → Events
2. Find `contact_form_submission`
3. Check:
   - Event count
   - User engagement
   - Conversions marked

## Common Issues & Solutions

### Issue: dataLayer is undefined
**Solution:** Ensure GTM container is loaded before form submission
```javascript
// Check in console
if (typeof window.dataLayer === 'undefined') {
  console.error('❌ DataLayer not initialized - GTM may not be loaded');
} else {
  console.log('✅ DataLayer ready');
}
```

### Issue: Hash values are empty
**Solution:** Check if crypto.subtle is available (requires HTTPS)
```javascript
if (window.crypto && window.crypto.subtle) {
  console.log('✅ Crypto API available');
} else {
  console.error('❌ Crypto API not available - are you on HTTPS?');
}
```

### Issue: Enhanced conversion data not in dataLayer
**Solution:** Check if form submission was successful
```javascript
// The data is only pushed on successful email send
// Check browser console for:
// "Enhanced Conversion Data Pushed: ..."
```

### Issue: Variables empty in GTM
**Solution:** Check timing - variables should populate AFTER the event fires
- Event: `enhanced_conversion_data` fires FIRST
- Then variables populate
- Then your tags fire

## Production Checklist

Before going live:
- [ ] Test with real form submission
- [ ] Verify dataLayer push in console
- [ ] Confirm GTM tags firing correctly
- [ ] Check GA4 DebugView shows data
- [ ] Verify hashing works (SHA-256)
- [ ] Update privacy policy
- [ ] Implement consent mode (GDPR)
- [ ] Test with ad blockers (expect some data loss)
- [ ] Wait 48 hours and check GA4 conversions report

## Resources

- Test SHA-256 hashing: https://emn178.github.io/online-tools/sha256.html
- GTM Preview Guide: https://support.google.com/tagmanager/answer/6107056
- GA4 DebugView: https://support.google.com/analytics/answer/7201382

---

**Tip:** Use an incognito window for testing to avoid cached data and get fresh dataLayer state.
