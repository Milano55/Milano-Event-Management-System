import React from 'react';
import { Calendar, MapPin, Edit, Trash2, Users } from 'lucide-react';
import { formatDate, isPastEvent } from '../utils/dateUtils';

const EventCard = ({ event, onEdit, onDelete }) => {
  const pastEvent = isPastEvent(event.date);

  return (
    <div className={`card h-100 shadow-sm card-hover ${pastEvent ? 'past-event' : 'upcoming-event'}`}>
      <div className={`card-header ${pastEvent ? 'bg-secondary text-white' : 'bg-dark text-white'}`}>
        <div className="d-flex justify-content-between align-items-start">
          <h6 className="card-title mb-0 fw-bold">{event.title}</h6>
          <span className="badge bg-light text-dark">{event.category}</span>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text text-muted small mb-3" style={{lineHeight: '1.4'}}>
          {event.description}
        </p>
        
        <div className="mb-3">
          <div className="d-flex align-items-center mb-2 text-muted small">
            <Calendar size={14} className="me-2 text-primary" />
            <span className="fw-medium">{formatDate(event.date)}</span>
          </div>
          
          <div className="d-flex align-items-center mb-2 text-muted small">
            <MapPin size={14} className="me-2 text-primary" />
            <span>{event.venue}</span>
          </div>
          
          {event.maxAttendees && (
            <div className="d-flex align-items-center text-muted small">
              <Users size={14} className="me-2 text-primary" />
              <span>Max: {event.maxAttendees} attendees</span>
            </div>
          )}
        </div>
        
        {pastEvent && (
          <div className="mb-2">
            <span className="badge bg-secondary">Past Event</span>
          </div>
        )}
      </div>
      
      <div className="card-footer bg-transparent border-top-0">
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm flex-fill"
            onClick={() => onEdit(event)}
          >
            <Edit size={14} className="me-1" />
            Edit
          </button>
          <button
            className="btn btn-outline-danger btn-sm flex-fill"
            onClick={() => onDelete(event.id)}
          >
            <Trash2 size={14} className="me-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;