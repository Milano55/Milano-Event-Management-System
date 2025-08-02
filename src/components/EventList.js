import React from 'react';
import EventCard from './EventCard';
import { Calendar } from 'lucide-react';

const EventList = ({ events, onEditEvent, onDeleteEvent }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  if (events.length === 0) {
    return (
      <div className="text-center py-5">
        <Calendar size={64} className="text-muted mb-3" />
        <h4 className="text-muted">No Events Yet</h4>
        <p className="text-muted">Start by adding your first event to get organized!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0">
          Events 
          <span className="badge bg-primary ms-2">{events.length}</span>
        </h2>
        <div className="text-muted small">
          Total events: {events.length}
        </div>
      </div>
      
      <div className="row">
        {sortedEvents.map(event => (
          <div key={event.id} className="col-md-6 col-lg-4 mb-4">
            <EventCard
              event={event}
              onEdit={onEditEvent}
              onDelete={onDeleteEvent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;