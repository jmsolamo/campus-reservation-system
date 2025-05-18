import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import './adminCreateEvent.css';

// Sample venues
const venues = [
  { id: 1, name: "Main Auditorium" },
  { id: 2, name: "Conference Room A" },
  { id: 3, name: "Conference Room B" },
  { id: 4, name: "Sports Hall" },
  { id: 5, name: "Outdoor Field" },
  { id: 6, name: "Classroom 101" },
  { id: 7, name: "Classroom 102" },
  { id: 8, name: "Library Meeting Room" }
];

const AdminCreateEvent = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    eventName: '',
    dateFrom: '',
    dateTo: '',
    timeStart: '',
    timeEnd: '',
    venue: '',
    purpose: '',
    pax: ''
  });

  const [referenceNumber, setReferenceNumber] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Generate reference number and set current date on component mount
  useEffect(() => {
    // Generate reference number: 1 letter followed by 6 digits
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
    const digits = Math.floor(100000 + Math.random() * 900000); // 6 digits
    setReferenceNumber(`${letter}${digits}`);

    // Set current date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setCurrentDate(`${year}-${month}-${day}`);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine form data with reference number and current date
    const eventData = {
      referenceNumber,
      creationDate: currentDate,
      ...formData
    };
    
    console.log("Form data would be submitted:", eventData);
    alert('Event created successfully (demo)');
    
    // Reset form (except reference number and date)
    setFormData({
      eventName: '',
      dateFrom: '',
      dateTo: '',
      timeStart: '',
      timeEnd: '',
      venue: '',
      purpose: '',
      pax: ''
    });
    
    // Generate new reference number for next event
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const digits = Math.floor(100000 + Math.random() * 900000);
    setReferenceNumber(`${letter}${digits}`);
  };

  return (
    <div className="create-event-container">
      <h2>CREATE EVENT</h2>

      <form onSubmit={handleSubmit}>
        <div className="top-fields">
          <div>
            <label>REFERENCE NO.</label>
            <input 
              type="text" 
              value={referenceNumber} 
              readOnly 
              className="reference-number"
            />
          </div>
          <div>
            <label>DATE:</label>
            <input 
              type="date" 
              value={currentDate} 
              readOnly 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>NAME OF EVENT:</label>
            <input 
              type="text" 
              name="eventName" 
              value={formData.eventName} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>PURPOSE:</label>
            <input 
              type="text" 
              name="purpose" 
              value={formData.purpose} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>DATE:</label>
            <div className="range-group">
              <label>FROM: 
                <input 
                  type="date" 
                  name="dateFrom" 
                  value={formData.dateFrom} 
                  onChange={handleChange} 
                  required 
                />
              </label>
              <label>TO: 
                <input 
                  type="date" 
                  name="dateTo" 
                  value={formData.dateTo} 
                  onChange={handleChange} 
                  required 
                />
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>TIME:</label>
            <div className="range-group">
              <label>START: 
                <input 
                  type="time" 
                  name="timeStart" 
                  value={formData.timeStart} 
                  onChange={handleChange} 
                  required 
                />
              </label>
              <label>END: 
                <input 
                  type="time" 
                  name="timeEnd" 
                  value={formData.timeEnd} 
                  onChange={handleChange} 
                  required 
                />
              </label>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>VENUE:</label>
            <select 
              name="venue" 
              value={formData.venue} 
              onChange={handleChange} 
              required
            >
              <option value="">SELECT</option>
              {venues.map(venue => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>NUMBER OF PAX:</label>
            <input 
              type="number" 
              name="pax" 
              value={formData.pax} 
              onChange={handleChange} 
              required 
              min="1"
            />
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="create-button">
            CREATE EVENT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateEvent;