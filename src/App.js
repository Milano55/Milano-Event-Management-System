import React, { useState } from 'react';
import Header from './components/Header';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  const [events, setEvents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now()
    };
    setEvents(prev => [...prev, newEvent]);
    setShowAddForm(false);
  };

  const handleUpdateEvent = (eventData) => {
    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id 
        ? { ...eventData, id: editingEvent.id }
        : event
    ));
    setEditingEvent(null);
    setShowAddForm(false);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowAddForm(true);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== id));
    }
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingEvent(null);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
    setEditingEvent(null);
  };

  // Helper functions that previously used eventStorage can now work directly with events state
  const getEventsByDateRange = (startDate, endDate) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
    });
  };

  const getEventsByVenue = (venue) => {
    return events.filter(event => 
      event.venue.toLowerCase().includes(venue.toLowerCase())
    );
  };

  const isVenueAvailable = (venue, date, excludeEventId = null) => {
    return !events.some(event => 
      event.venue.toLowerCase() === venue.toLowerCase() && 
      event.date === date && 
      event.id !== excludeEventId
    );
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onShowAddForm={handleShowAddForm}
      />
      
      <div className="container mt-4">
        {showAddForm && (
          <EventForm
            editingEvent={editingEvent}
            events={events}
            onAddEvent={handleAddEvent}
            onUpdateEvent={handleUpdateEvent}
            onCancel={handleCancelForm}
            isVenueAvailable={isVenueAvailable}
          />
        )}

        <EventList
          events={events}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          getEventsByDateRange={getEventsByDateRange}
          getEventsByVenue={getEventsByVenue}
        />
      </div>
    </div>
  );
}

export default App;