import CleverTap from 'clevertap-web-sdk';

const cleverTapAccountId = '884-5ZW-8Z7Z';
const cleverTapRegion = 'sk1-staging-4'; // e.g., 'us1', 'in1', etc.

export const initializeCleverTap = () => {
    CleverTap.init(cleverTapAccountId, cleverTapRegion, '', '', { isolateSubdomain: false });
    // (accountId, region, targetDomain, token, config = { antiFlicker: {}, customId: null, isolateSubdomain: false })
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

