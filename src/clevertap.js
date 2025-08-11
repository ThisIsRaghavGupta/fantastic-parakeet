import CleverTap from 'clevertap-web-sdk';

const cleverTapAccountId = 'TEST-9WW-764-9K6Z';
const cleverTapRegion = 'in1'; // e.g., 'us1', 'in1', etc.

export const initializeCleverTap = () => {
    CleverTap.init(cleverTapAccountId, cleverTapRegion);
};

export const trackEvent = (eventName, eventData) => {
    CleverTap.event.push(eventName, eventData);
};

export const setUserProfile = (profileData) => {
    CleverTap.profile.push(profileData);
};

export const onUserLogin = (profileData) => {
    CleverTap.onUserLogin.push( {Site: profileData});
};

export const logout = () => {
    CleverTap.logout();

    // Clear localStorage
    if (typeof localStorage !== 'undefined') {
        localStorage.clear();
    }
};

