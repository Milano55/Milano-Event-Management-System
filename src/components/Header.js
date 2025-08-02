import React from 'react';
import { Calendar, Eye, CalendarDays, Plus } from 'lucide-react';

const Header = ({ viewMode, onViewModeChange, onShowAddForm }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <span className="navbar-brand mb-0 h1">
          <Calendar className="me-2" size={24} />
          Milano's Event Management System
        </span>
        <div className="d-flex gap-2">
          <button
            className="btn btn-danger"
            onClick={onShowAddForm}
          >
            <Plus size={16} className="me-1" />
            Add Event
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;