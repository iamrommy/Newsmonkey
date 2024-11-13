import React from 'react';

const countries = [
    { name: 'Australia', code: 'au' },
    { name: 'Brazil', code: 'br' },
    { name: 'Canada', code: 'ca' },
    { name: 'China', code: 'cn' },
    { name: 'Egypt', code: 'eg' },
    { name: 'France', code: 'fr' },
    { name: 'Germany', code: 'de' },
    { name: 'Greece', code: 'gr' },
    { name: 'Hong Kong', code: 'hk' },
    { name: 'India', code: 'in' },
    { name: 'Ireland', code: 'ie' },
    { name: 'Israel', code: 'il' },
    { name: 'Italy', code: 'it' },
    { name: 'Japan', code: 'jp' },
    { name: 'Netherlands', code: 'nl' },
    { name: 'Norway', code: 'no' },
    { name: 'Pakistan', code: 'pk' },
    { name: 'Peru', code: 'pe' },
    { name: 'Philippines', code: 'ph' },
    { name: 'Portugal', code: 'pt' },
    { name: 'Romania', code: 'ro' },
    { name: 'Russia', code: 'ru' },
    { name: 'Singapore', code: 'sg' },
    { name: 'Spain', code: 'es' },
    { name: 'Sweden', code: 'se' },
    { name: 'Switzerland', code: 'ch' },
    { name: 'Taiwan', code: 'tw' },
    { name: 'Ukraine', code: 'ua' },
    { name: 'United Kingdom', code: 'gb' },
    { name: 'United States', code: 'us' }
  ];
  

const Dropdown = ({setCountry, country}) => {
  const handleChange = (e) => {
    setCountry(e.target.value);
  };
  return (
    <div className='text-black pr-3 '>
      {/* <label htmlFor="country" className='text-white'>Country:</label> */}
      <select id="country" className='w-36 border-[3px] border-black rounded-md' value={country} onChange={handleChange}>
        {/* <option value="">Select</option> */}
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
