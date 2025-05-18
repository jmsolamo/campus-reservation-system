import React, { useState } from 'react';
import './adminRequests.css';

function AdminRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState(null);

  // Mock data for requests
  const [mockRequests] = useState([
    {
      id: 1,
      name: "Faculty Meeting",
      date: "2023-06-15",
      time: "10:00 AM - 11:30 AM",
      venue: "Conference Room A",
      organizer: "Dr. Smith",
      status: "pending"
    },
    {
      id: 2,
      name: "Student Workshop",
      date: "2023-06-18",
      time: "2:00 PM - 4:00 PM",
      venue: "Main Auditorium",
      organizer: "Prof. Johnson",
      status: "pending"
    }
  ]);

  const [filteredRequests, setFilteredRequests] = useState(mockRequests.filter(req => req.status === 'pending'));

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setFilteredRequests(mockRequests.filter(req => req.status === 'pending'));
      return;
    }
    
    const filtered = mockRequests.filter(request => {
      const title = request.name || '';
      const requestedBy = request.organizer || '';
      
      return (request.status === 'pending') && (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    
    setFilteredRequests(filtered);
  };

  // Reset search
  const handleResetSearch = () => {
    setSearchTerm('');
    setFilteredRequests(mockRequests.filter(req => req.status === 'pending'));
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date TBD';
    
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateStr;
    }
  };

  // Handle approve request (mock version)
  const handleApprove = (id) => {
    console.log("Would approve request with ID:", id);
    setProcessingId(id);
    
    // Simulate processing delay
    setTimeout(() => {
      setFilteredRequests(prev => prev.filter(request => request.id !== id));
      setProcessingId(null);
      console.log("Request approved (mock)");
    }, 1000);
  };

  // Handle decline request (mock version)
  const handleDecline = (id) => {
    console.log("Would decline request with ID:", id);
    setProcessingId(id);
    
    // Simulate processing delay
    setTimeout(() => {
      setFilteredRequests(prev => prev.filter(request => request.id !== id));
      setProcessingId(null);
      console.log("Request declined (mock)");
    }, 1000);
  };

  return (
    <div className="admin-requests-container">
      <h2 className="page-title">RESERVATION REQUESTS</h2>
      
      <div className="controls">
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search requests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
            {searchTerm && (
              <button 
                type="button" 
                className="reset-button"
                onClick={handleResetSearch}
              >
                Reset
              </button>
            )}
          </form>
        </div>
        
        <div className="refresh-container">
          <button 
            className="refresh-button"
            onClick={() => console.log("Refresh clicked")}
          >
            Refresh
          </button>
        </div>
      </div>
      
      {filteredRequests.length === 0 ? (
        <div className="no-requests">No pending requests found.</div>
      ) : (
        <div className="requests-table-container">
          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Requested By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <tr key={request.id} className="status-pending">
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{formatDate(request.date)}</td>
                  <td>{request.time}</td>
                  <td>{request.venue}</td>
                  <td>{request.organizer}</td>
                  <td>
                    <span className="status-badge pending">
                      PENDING
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="approve-btn"
                        onClick={() => handleApprove(request.id)}
                        disabled={processingId === request.id}
                      >
                        {processingId === request.id ? 'Processing...' : 'Approve'}
                      </button>
                      <button 
                        className="decline-btn"
                        onClick={() => handleDecline(request.id)}
                        disabled={processingId === request.id}
                      >
                        {processingId === request.id ? 'Processing...' : 'Decline'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminRequests;