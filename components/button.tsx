import React from 'react';
const Button = ({ onClick , children } :{  onClick: () => void; children: any; } ) => (
  <button onClick={onClick}>{children}</button>
)

export default Button
