    // HandCraftedIcon.jsx
    import React from 'react';

    const HandCraftedIcon = (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size || 24} // Default size or prop-based
        height={props.size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={props.color || "currentColor"} // Default color or prop-based
        strokeWidth={props.strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props} // Pass through any other props
      >
        {/* Your SVG path data goes here */}
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        {/* Replace with your actual SVG paths */}
      </svg>
    );

    export default HandCraftedIcon;