import React from 'react';

const Link = ({ link }) => {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
};

export default Link;
