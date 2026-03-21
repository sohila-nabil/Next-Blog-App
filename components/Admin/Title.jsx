import React from 'react'

const Title = ({title, desc}) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  );
}

export default Title
