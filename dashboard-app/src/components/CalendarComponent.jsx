import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Ensure this is imported for basic styles
import '../styles/CalendarComponent.css'; // Custom styles

function CalendarComponent() {
  return (
    <div className="calendar">
        <br></br>
      <div className="calendar__picture">
        
        <h2>Today's Date</h2>
        <h3>{new Date().toLocaleDateString()}</h3>
        <p>{new Date().toLocaleTimeString()}</p>
      </div>
      <div className="calendar__date">
        <Calendar
          // Add any additional props or styles for customization here
        />
      </div>
    </div>
  );
}

export default CalendarComponent;
