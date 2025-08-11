import React, { useEffect, useState } from 'react';
import { initializeCleverTap, trackEvent, setUserProfile, onUserLogin, logout } from './clevertap';
import CleverTap from 'clevertap-web-sdk';
import './App.css';

const App = () => {
  const [profile, setProfile] = useState({
    Name: '',
    Identity: '',
    Email: ''
  });
  const [eventName, setEventName] = useState('');
  const [eventData, setEventData] = useState('');
  const [loginProfile, setLoginProfile] = useState({
    Name: '',
    Identity: '',
    Email: '',
    Phone: '',
    Gender: '',
    DOB: '',
  });
  // Get CleverTap ID from WZRK_G cookie immediately
const getWzrkGId = () => {
  const wzrkG = document.cookie
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith('WZRK_G='));
  return wzrkG ? wzrkG.split('=')[1] : '';
};

const [clevertapId, setCleverTapId] = useState(getWzrkGId());

  useEffect(() => {
    initializeCleverTap();
    // Example of tracking an event
    console.log('Services App is loading...');
    trackEvent('Services App Loaded', { timestamp: new Date() });
    console.log('CleverTap SDK initialized');
    // Get CleverTap ID from WZRK_G cookie (with delay)
    const wzrkGValue = getWzrkGId();
    setTimeout(() => {
      setCleverTapId(wzrkGValue);
    }, 1000);
  }, []);

  // Effect to watch for changes in the WZRK_G cookie and update clevertapId
  useEffect(() => {
    const interval = setInterval(() => {
      const wzrkGValue = getWzrkGId();
      setCleverTapId(prev => (prev !== wzrkGValue ? wzrkGValue : prev));
    }, 1000); // check every 1 second
    return () => clearInterval(interval);
  }, []);

  // Handler for CleverTap logout
  const handleLogout = () => {
    logout();
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Setting user profile:', profile);
    setUserProfile(profile);
    trackEvent('Profile Set', { ...profile, timestamp: new Date() });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    let parsedData = {};
    try {
      parsedData = eventData ? JSON.parse(eventData) : {};
    } catch (err) {
      alert('Event Data must be valid JSON');
      return;
    }
    console.log('Sending event:', eventName, parsedData); // Log event name and data
    trackEvent(eventName, parsedData);
    setEventName('');
    setEventData('');
  };

  const handleLoginChange = (e) => {
    setLoginProfile({ ...loginProfile, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Convert DOB to Date object if present
    const profileToSend = { ...loginProfile };
    if (profileToSend.DOB) {
      profileToSend.DOB = new Date(profileToSend.DOB);
    }
    console.log('Logging user profile:', profileToSend);
    onUserLogin(profileToSend);
    trackEvent('User Login', { ...profileToSend, timestamp: new Date() });
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      {/* Logout container styled like form-container */}
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      {/* Show CleverTap ID on screen */}
      <div className="clevertap-id-box">
        <svg width="24" height="24" fill="#1976d2" className="clevertap-id-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#eaf3ff" stroke="#1976d2" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#1976d2" fontWeight="bold">ID</text></svg>
        CleverTap ID: <span className="clevertap-id-value">{clevertapId || 'Loading...'}</span>
      </div>
      {/* Section 0: User Login */}
      <section style={{ marginBottom: 40 }}>
        <h2>CleverTap Services User Login</h2>
        <form onSubmit={handleLoginSubmit} className="form-container">
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="Name"
              value={loginProfile.Name}
              onChange={handleLoginChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">User ID:</label>
            <input
              type="text"
              name="Identity"
              value={loginProfile.Identity}
              onChange={handleLoginChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="Email"
              value={loginProfile.Email}
              onChange={handleLoginChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone:</label>
            <input
              type="tel"
              name="Phone"
              value={loginProfile.Phone}
              onChange={handleLoginChange}
              className="form-input"
              placeholder="e.g. +911234567890"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Gender:</label>
            <select
              name="Gender"
              value={loginProfile.Gender}
              onChange={handleLoginChange}
              className="form-input"
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth:</label>
            <input
              type="date"
              name="DOB"
              value={loginProfile.DOB}
              onChange={handleLoginChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">Login</button>
        </form>
      </section>
      {/* Section 1: User Profile */}
      <section style={{ marginBottom: 40 }}>
        <h2>CleverTap User Profile</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="Name"
              value={profile.Name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">User ID:</label>
            <input
              type="text"
              name="Identity"
              value={profile.Identity}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="Email"
              value={profile.Email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">Set Profile</button>
        </form>
      </section>
      {/* Section 2: Event Sender */}
      <section>
        <h2>Send CleverTap Event</h2>
        <form onSubmit={handleEventSubmit} className="form-container">
          <div className="form-group">
            <label className="form-label">Event Name:</label>
            <input
              type="text"
              value={eventName}
              onChange={e => setEventName(e.target.value)}
              required
              className="form-input"
              placeholder="e.g. Button Clicked"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Event Data (JSON):</label>
            <textarea
              value={eventData}
              onChange={e => setEventData(e.target.value)}
              className="form-input"
              rows={4}
              placeholder='{"key":"value"}'
              style={{ resize: 'vertical' }}
            />
          </div>
          <button type="submit" className="form-button">Send Event</button>
        </form>
      </section>

    </div>
  );
};

export default App;