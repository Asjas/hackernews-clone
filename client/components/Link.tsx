import React from 'react';

function Link({ link }) {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
}

export default Link;
