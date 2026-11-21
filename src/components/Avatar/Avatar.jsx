import { useState } from 'react';
import PropTypes from 'prop-types';

// Initials from the display name ("Mahfuz Hasan" -> "MH"), or the first letter of the email.
const getInitials = (user) => {
    const name = user?.displayName?.trim();
    if (name) {
        return name.split(/\s+/).slice(0, 2).map((part) => part[0].toUpperCase()).join('');
    }
    return (user?.email?.[0] || 'U').toUpperCase();
};

// Profile picture with a fallback: shows the user's initials when there is no photo
// or the photo fails to load (e.g. accounts created with email/password).
const Avatar = ({ user, size = 40, className = '' }) => {
    const [failedUrl, setFailedUrl] = useState(null);
    const photo = user?.photoURL;
    const label = user?.displayName || user?.email || 'User';
    const style = { width: size, height: size };

    if (photo && photo !== failedUrl) {
        return (
            <img
                src={photo}
                alt={label}
                style={style}
                referrerPolicy="no-referrer"
                onError={() => setFailedUrl(photo)}
                className={`rounded-full object-cover shrink-0 ${className}`}
            />
        );
    }

    return (
        <span
            role="img"
            aria-label={label}
            style={{ ...style, fontSize: size * 0.4 }}
            className={`inline-flex items-center justify-center rounded-full bg-yellow-300 text-fuchsia-900 font-bold shrink-0 select-none ${className}`}
        >
            {getInitials(user)}
        </span>
    );
};

Avatar.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string,
        photoURL: PropTypes.string,
    }),
    size: PropTypes.number,
    className: PropTypes.string,
};

export default Avatar;
