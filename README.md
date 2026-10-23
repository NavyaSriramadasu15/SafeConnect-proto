# SafeConnect — Home Safety Dashboard Prototype

A responsive front-end prototype for an Amazon Hackathon concept. It demonstrates a home-safety dashboard with a recent activity timeline, delivery watch, trusted contacts, accessibility controls, and a connected-devices page.

## Run the project

**No installation is needed.**

1. Download and extract `SafeConnect.zip`.
2. Open the `SafeConnect` folder.
3. Double-click `index.html` to open it in a modern browser.

For a local development server in VS Code, install the **Live Server** extension, right-click `index.html`, and select **Open with Live Server**.

## Features included

- Responsive dashboard with sample activity and status cards
- Search and filter the activity timeline
- Add simulated doorbell, motion, delivery, and system events
- Add demo delivery entries
- Add trusted contacts (local browser session only)
- Accessibility settings: larger text, high contrast, reduced motion
- Connected-device information page
- Mobile navigation, modal dialogs, and toast notifications
- Clearly marked prototype/simulated data

## Important prototype limitations

This is a **front-end demonstration**, not a live home security service. All events and deliveries are sample data held in JavaScript memory and reset when the page is refreshed. Adding a contact does not send an SMS, call, or notification. This prototype does not contact emergency services.

Real Ring event integration requires a supported Ring developer integration, authorization, and secure server-side handling. Do not put API credentials or secrets in front-end JavaScript. Before real deployment, add a backend, authentication, secure storage, permission controls, consent, audit logging, and tests.

## Files

- `index.html` — page structure and dialog markup
- `styles.css` — responsive visual design and accessibility states
- `app.js` — demo data and interactive behaviors

## Suggested 2-minute demo

1. Open Overview and point out the home status and dashboard cards.
2. Click **Simulate an event**, select **Motion detected**, then add it.
3. Open **Activity history**, use search or filters.
4. Open **Trusted contacts**, add a sample contact.
5. Open **Accessibility** and enable Larger text or High contrast.
6. Explain that Ring/carrier integration is the next engineering phase and the displayed events are simulated.

## Project summary

**SafeConnect** is designed to make home activity easier to understand, particularly for families, elderly people, and people living alone. Its focus is a calm, accessible interface that brings supported device events, package updates, and trusted-contact information together.


## Updated interactive dashboard behavior
- The date, live clock, and greeting update automatically using your computer's local date and time. The greeting changes between morning, afternoon, evening, and night.
- Clicking a dashboard summary card opens its related section. The alerts card opens the home-alert activity list.
- Click or keyboard-select an activity row to view its details.
- Demo events, deliveries, and trusted contacts are saved in this browser using local storage, so changes usually remain when you reopen the project in the same browser.
- All device events and delivery information are still simulated; this does not connect to real Ring devices, delivery carriers, or messaging services.
