# Quick Test - Enhanced Conversions

## Check DataLayer in Browser Console

1. Open your website
2. Open DevTools Console (F12)
3. Type this to monitor dataLayer pushes:

```javascript
// Monitor dataLayer
window.dataLayer = window.dataLayer || [];
const original = window.dataLayer.push;
window.dataLayer.push = function() {
  console.log('%c📊 DataLayer Push:', 'color: #4CAF50; font-weight: bold', arguments[0]);
  return original.apply(this, arguments);
};
```

4. Submit the contact form
5. You should see:

```javascript
📊 DataLayer Push: {
  event: "form_submit",
  event_category: "engagement",
  event_label: "contact_form",
  user_data: {
    email: "test@example.com",
    phone_number: "",
    address: {
      first_name: "John",
      last_name: "Doe"
    }
  }
}
```

## GTM Variables to Create

| Variable Name | Type | Data Layer Variable Name |
|--------------|------|-------------------------|
| `DL - User Email` | Data Layer Variable | `user_data.email` |
| `DL - User First Name` | Data Layer Variable | `user_data.address.first_name` |
| `DL - User Last Name` | Data Layer Variable | `user_data.address.last_name` |

## GTM Trigger to Create

- **Name:** `CE - Form Submit`
- **Type:** Custom Event
- **Event name:** `form_submit`

## GTM Tag to Create

- **Name:** `GA4 - Form Submit`
- **Type:** GA4 Event
- **Event Name:** `form_submit`
- **User Properties:**
  - `email`: `{{DL - User Email}}`
  - `first_name`: `{{DL - User First Name}}`
  - `last_name`: `{{DL - User Last Name}}`
- **Trigger:** `CE - Form Submit`

## Expected Result in GA4

After 24-48 hours, you should see:
- Event: `form_submit`
- Event count: Number of form submissions
- User properties populated with email, first_name, last_name

## What Changed

✅ **FIXED:** Only ONE event fires now (`form_submit`) instead of two
✅ **FIXED:** Enhanced conversion data is now pushed synchronously
✅ **SIMPLIFIED:** No complex async hashing - GTM handles it
✅ **CLEANER:** Single clear event structure

## Before vs After

### Before ❌
- `contact_form_submit` (on form start)
- `contact_form_success` (on success)
- `enhanced_conversion_data` (didn't fire)
- `conversion` (didn't fire)

### After ✅
- `form_submit` (single event on success only)
- User data included in the same event
- Clean, simple structure for GTM
