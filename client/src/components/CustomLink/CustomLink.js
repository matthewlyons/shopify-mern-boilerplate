import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomLink({ children, url, ...rest }) {
  return (
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
}
