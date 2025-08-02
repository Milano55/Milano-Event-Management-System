import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography, } from '@mui/material';

const EventForm = ({ editingEvent, events, onAddEvent, onUpdateEvent, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    date: '',
    time: '',
    category: 'Conference',
    maxAttendees: ''
  });
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent);
    } else {
      setFormData({
        title: '',
        description: '',
        venue: '',
        date: '',
        time: '',
        category: 'Conference',
        maxAttendees: ''
      });
    }
    setValidationError('');
  }, [editingEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateVenueAndDate = (venue, date, excludeId = null) => {
    return events.some(event => 
      event.venue.toLowerCase() === venue.toLowerCase() && 
      event.date === date && 
      event.id !== excludeId
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.venue || !formData.date) {
      setValidationError('Please fill in all required fields');
      return;
    }

    const isConflict = validateVenueAndDate(
      formData.venue, 
      formData.date, 
      editingEvent?.id
    );

    if (isConflict) {
      setValidationError('This venue is already booked for the selected date!');
      return;
    }

    if (editingEvent) {
      onUpdateEvent(formData);
    } else {
      onAddEvent(formData);
    }
  };

  return (
    <div className="card mb-2 shadow">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">
          {editingEvent ? 'Edit Event' : 'Add New Event'}
        </h5>
      </div>
      <div className="card-body">
        {validationError && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {validationError}
          </div>
        )}
        
        <div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <TextField
                type="text"
                label="Event Title"
                InputLabelProps={{ shrink: true }}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                required
                fullWidth
                variant="outlined"
              />
            </div>
            <div className="col-md-6 mb-3">
              <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={formData.category}
              label="Category"
              onChange={handleInputChange}
            >
              <MenuItem value="Conference">Conference</MenuItem>
              <MenuItem value="Workshop">Workshop</MenuItem>
              <MenuItem value="Seminar">Seminar</MenuItem>
              <MenuItem value="Meeting">Meeting</MenuItem>
              <MenuItem value="Social">Social Event</MenuItem>
              <MenuItem value="Training">Training</MenuItem>
              <MenuItem value="Webinar">Webinar</MenuItem>
            </Select>
          </FormControl>
            </div>
          </div>
          
          <div className="mb-3">
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter event description"
              multiline
              required
              rows={3}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ fontWeight: 'bold' }} // optional if you want to bold text
            />
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <TextField
                type="text"
                label="Venue"
                className="form-control"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="Enter event venue"
                InputLabelProps={{ shrink: true }}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <TextField
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </div>
          </div>
          
          <div className="mb-3">
            <TextField
              type="number"
              label="Max Attendees"
              InputLabelProps={{ shrink: true }}
              className="form-control"
              name="maxAttendees"
              value={formData.maxAttendees}
              onChange={handleInputChange}
              placeholder="Maximum number of attendees (optional)"
              min="1"
            />
          </div>
          
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>
            <Button
              type="button"
              variant="outlined"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;