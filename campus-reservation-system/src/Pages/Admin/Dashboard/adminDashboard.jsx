import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import './adminDashboard.css';

// Helper function to render icons with fallback
const Icon = ({ iconClass }) => {
  const [iconsLoaded, setIconsLoaded] = useState(true);
  
  useEffect(() => {
    // Check if Boxicons is loaded
    const testIcon = document.createElement('i');
    testIcon.className = 'bx bx-menu';
    document.body.appendChild(testIcon);
    
    const computedStyle = window.getComputedStyle(testIcon);
    const isLoaded = computedStyle.fontFamily.includes('boxicons') || 
                    computedStyle.fontFamily.includes('BoxIcons');
    
    document.body.removeChild(testIcon);
    setIconsLoaded(isLoaded);
  }, []);
  
  if (iconsLoaded) {
    return <i className={`bx ${iconClass}`}></i>;
  } else {
    // Map to Font Awesome icons as fallback
    const iconMap = {
      'bx-refresh': 'fa-solid fa-arrows-rotate',
      'bx-filter': 'fa-solid fa-filter'
    };
    return <i className={iconMap[iconClass] || 'fa-solid fa-circle'}></i>;
  }
};

function AdminDashboard({ isCollapsed }) {
  const [filter, setFilter] = useState('all');
  const [mockStats] = useState({
    total: 12,
    pending: 3,
    approved: 7,
    declined: 2
  });

  // Sample mock data
  const [mockEvents] = useState([
    {
      id: 1,
      name: "Team Meeting",
      date: "2023-06-15",
      time: "10:00 AM",
      venue: "Conference Room A",
      status: "approved",
      organizer: "John Doe"
    },
    {
      id: 2,
      name: "Project Presentation",
      date: "2023-06-18",
      time: "2:00 PM",
      venue: "Main Auditorium",
      status: "pending",
      organizer: "Jane Smith"
    },
    {
      id: 3,
      name: "Workshop",
      date: "2023-06-20",
      time: "9:00 AM",
      venue: "Classroom 101",
      status: "declined",
      organizer: "Mike Johnson"
    }
  ]);

  // Get events based on filter
  const getFilteredEvents = () => {
    if (filter === 'all') {
      return mockEvents;
    } else {
      return mockEvents.filter(event => event.status === filter);
    }
  };

  const filteredEvents = getFilteredEvents();

  // Format date to be more readable
  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return dateString;
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Mock refresh function
  const mockRefresh = () => {
    console.log("Data would be refreshed in a real application");
  };

  return (
    <div className={`dashboard-container ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Main Content */}
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="page-title">ADMIN DASHBOARD</h1>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="card yellow" onClick={() => handleFilterChange('all')}>
            <h2>{mockStats.total}</h2>
            <p>RESERVATIONS</p>
          </div>
          <div className="card blue" onClick={() => handleFilterChange('pending')}>
            <h2>{mockStats.pending}</h2>
            <p>PENDING</p>
          </div>
          <div className="card red" onClick={() => handleFilterChange('declined')}>
            <h2>{mockStats.declined}</h2>
            <p>DECLINED</p>
          </div>
          <div className="card green" onClick={() => handleFilterChange('approved')}>
            <h2>{mockStats.approved}</h2>
            <p>APPROVED</p>
          </div>
        </div>

        {/* All Reservations */}
        <div className="upcoming-events">
          <div className="events-header">
            <h2>
              {filter === 'all' ? 'ALL RESERVATIONS' : 
               filter === 'pending' ? 'PENDING RESERVATIONS' :
               filter === 'declined' ? 'DECLINED RESERVATIONS' : 'APPROVED RESERVATIONS'}
            </h2>
            <div className="filter-controls">
              <div className="filter-buttons">
                <button 
                  className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('pending')}
                >
                  Pending
                </button>
                <button 
                  className={`filter-button ${filter === 'approved' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('approved')}
                >
                  Approved
                </button>
                <button 
                  className={`filter-button ${filter === 'declined' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('declined')}
                >
                  Declined
                </button>
              </div>
              <button 
                className="refresh-button" 
                onClick={mockRefresh}
              >
                <Icon iconClass="bx-refresh" /> Refresh
              </button>
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>RESERVATION</th>
                    <th>DATE</th>
                    <th>TIME</th>
                    <th>LOCATION</th>
                    <th>STATUS</th>
                    <th>RESERVED BY</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map(event => (
                    <tr key={event.id} className={`status-${event.status}`}>
                      <td>{event.id}</td>
                      <td>{event.name}</td>
                      <td>{formatDate(event.date)}</td>
                      <td>{event.time}</td>
                      <td>{event.venue}</td>
                      <td>
                        <span className={`status-badge ${event.status}`}>
                          {event.status.toUpperCase()}
                        </span>
                      </td>
                      <td>{event.organizer}</td>
                      <td>
                        {event.status === 'pending' ? (
                          <div className="action-buttons">
                            <button className="approve-btn">Approve</button>
                            <button className="decline-btn">Decline</button>
                          </div>
                        ) : (
                          <span className={`action-taken ${event.status}`}>
                            {event.status === 'approved' ? 'Approved' : 'Declined'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-events">No {filter !== 'all' ? filter : ''} reservations found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;