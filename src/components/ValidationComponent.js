import '../Spinner.css'; // Import Spinner CSS
import '../Validation.css';

import React, { useState } from 'react';

import axios from 'axios';

const ValidationComponent = () => {
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationResults, setValidationResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleValidation = async () => {
    try {
      setIsLoading(true); // Set isLoading to true when validation starts
      const numbersArray = phoneNumbers.split('\n');
      const results = [];

      for (const number of numbersArray) {
        const response = await axios.get(
          `https://lookups.twilio.com/v2/PhoneNumbers/${number.trim()}`,
          {
            auth: {
              username,
              password
            }
          }
        );

        // Check if the response indicates a valid phone number
        const isValid = response.data.valid; // Assuming the response contains a 'valid' field

        results.push({
          number: number.trim(),
          isValid
        });
      }

      setValidationResults(results);
    } catch (error) {
      console.error('Error validating phone numbers:', error);
    } finally {
      setIsLoading(false); // Set isLoading to false when validation ends
    }
  };

  return (
    <div>
      <div className='acctxt'>
        <label>Twilio Account SID: </label>
        <input
        className='actxt'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='acctxt'>
        <label>Twilio Auth Token: </label>
        <input
        className='actxt'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <textarea
      className='numbers-txt'
        value={phoneNumbers}
        onChange={(e) => setPhoneNumbers(e.target.value)}
        rows={5}
        cols={50}
        placeholder="Enter phone numbers here (one per line)"
      />
      <br />
      {/* Add conditional rendering for the button */}
      <button className='validate-btn ' onClick={handleValidation} disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner" /> Validating...
          </>
        ) : (
          'Validate Numbers'
        )}
      </button>
      <br />
      <ul>
        {validationResults.map((result, index) => (
          <li key={index}>
            {result.number}: {result.isValid ? 'Valid' : 'Invalid'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValidationComponent;
