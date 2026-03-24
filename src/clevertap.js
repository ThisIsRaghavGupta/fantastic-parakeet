import CleverTap from 'clevertap-web-sdk';

// CleverTap.domainSpecification = 3;

const cleverTapAccountId = '75W-7Z9-7W7Z';
const cleverTapRegion = 'sk1'; // e.g., 'us1', 'in1', etc.

export const initializeCleverTap = () => {
    CleverTap.onUserLogin.push({
        Site: {
            Identity: 898986435,
        }
    })
    CleverTap.init(cleverTapAccountId, cleverTapRegion, '', '', {domainSpecification: 3});
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

