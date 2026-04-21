import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; 
import './App.css';

// SVG Icons
const CalendarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const ClockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const MapPinIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const BellIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const GraduationCapIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#a78bfa"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>;
const EditIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const DeleteIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

const TechGraphic = () => <div className="event-graphic tech-graphic"></div>;
const CulturalGraphic = () => <div className="event-graphic cultural-graphic"></div>;

function App() {
  const [events, setEvents] = useState([]); 
  // ADDED 'time' to the state
  const [formData, setFormData] = useState({ title: '', date: '', time: '', location: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const eventsCollectionRef = collection(db, "events");

  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(eventsCollectionRef);
      setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) return;

    if (editingId) {
      const eventDoc = doc(db, "events", editingId);
      await updateDoc(eventDoc, formData);
      
      setEvents(events.map(event => 
        event.id === editingId ? { ...event, ...formData } : event
      ));
      setEditingId(null); 
    } else {
      const newEventData = { ...formData, category: "New" };
      const docRef = await addDoc(eventsCollectionRef, newEventData);
      
      setEvents([...events, { ...newEventData, id: docRef.id }]);
    }
    
    setFormData({ title: '', date: '', time: '', location: '', description: '' });
  };

  const handleEdit = (eventToEdit) => {
    setFormData({
      title: eventToEdit.title,
      date: eventToEdit.date,
      time: eventToEdit.time || '', // Load time for editing
      location: eventToEdit.location,
      description: eventToEdit.description
    });
    setEditingId(eventToEdit.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setFormData({ title: '', date: '', time: '', location: '', description: '' });
    setEditingId(null);
  };

  const handleDelete = async (idToRemove) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const eventDoc = doc(db, "events", idToRemove);
      await deleteDoc(eventDoc);
      setEvents(events.filter(event => event.id !== idToRemove));
    }
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-left">
          <GraduationCapIcon />
          <h1 className="brand-title">CAMPUS EVENTS</h1>
        </div>
        <div className="header-right">
          <button className="icon-btn"><BellIcon /> Notifications</button>
          <div className="user-profile">
            <div className="avatar">SK</div>
            <span className="arrow-down">▼</span>
          </div>
        </div>
      </header>

      <main className="content-area">
        <section className="create-event-panel">
          <h2 className="panel-title">{editingId ? 'Edit Event' : 'Create New Event'}</h2>
          
          <form onSubmit={handleSubmit} className="modern-form">
            <div className="form-row">
              <div className="form-group">
                <label>Event Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Event Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              {/* NEW TIME INPUT FIELD */}
              <div className="form-group">
                <label>Event Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Location</label>
                <div className="input-with-icon">
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
                  <span className="icon-wrapper"><MapPinIcon /></span>
                </div>
              </div>
            </div>
            <div className="form-group textarea-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required />
              
              <div className="form-actions">
                {editingId && (
                  <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                )}
                <button type="submit" className="create-btn">
                  {editingId ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="upcoming-events-section">
          <h2 className="section-title">UPCOMING EVENTS</h2>
          <div className="event-grid">
            {events.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No events scheduled yet. Create one above!</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="card-top">
                      {event.category === "Tech" ? <TechGraphic /> : <CulturalGraphic />}
                      <span className={`category-tag ${(event.category || 'new').toLowerCase()}-tag`}>{event.category || 'New'}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-meta">
                      <span className="meta-item"><CalendarIcon /> {event.date}</span>
                      {/* DISPLAY TIME HERE */}
                      <span className="meta-item"><ClockIcon /> {event.time}</span>
                      <span className="meta-item"><MapPinIcon /> {event.location}</span>
                    </div>
                    <p className="event-description">{event.description}</p>
                  </div>
                  <div className="card-actions">
                    <button className="rsvp-btn" onClick={() => alert(`RSVP successful for ${event.title}!`)}>RSVP</button>
                    
                    <div className="action-icons-group">
                      <button className="edit-btn" onClick={() => handleEdit(event)} title="Edit Event">
                        <EditIcon /> Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(event.id)} title="Delete Event">
                        <DeleteIcon /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;