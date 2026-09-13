// src/components/AcademicCalendarWidget.jsx — Interactive Academic Calendar with .ics Export
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Download, Clock, MapPin, Tag, Sparkles } from 'lucide-react';
import { COLORS } from '../styles/colors';
import toast from 'react-hot-toast';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function AcademicCalendarWidget({ events = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calculate calendar grid days
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        dayNumber: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, daysInPrevMonth - i)
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        dayNumber: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      });
    }

    // Next month padding to fill 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        dayNumber: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }

    return days;
  }, [year, month]);

  // Map events to date strings YYYY-MM-DD
  const eventsByDate = useMemo(() => {
    const map = {};
    (events || []).forEach(e => {
      let dateKey = null;
      if (e.date) {
        const d = new Date(e.date);
        if (!isNaN(d)) dateKey = d.toISOString().slice(0, 10);
      } else if (e.createdAt?.toDate) {
        dateKey = e.createdAt.toDate().toISOString().slice(0, 10);
      }
      if (dateKey) {
        if (!map[dateKey]) map[dateKey] = [];
        map[dateKey].push(e);
      }
    });
    return map;
  }, [events]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  // Generate .ics calendar download
  const downloadIcs = (event) => {
    try {
      const eventDate = event.date ? new Date(event.date) : new Date();
      const dtStart = eventDate.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';
      const dtEnd = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';

      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Guru Nanak College//Academic Calendar//EN',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@gncollege.org`,
        `DTSTAMP:${dtStart}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${event.title || 'College Event'}`,
        `DESCRIPTION:${(event.desc || '').replace(/\n/g, ' ')}`,
        'LOCATION:Guru Nanak College, Dhanbad',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `${(event.title || 'event').replace(/\s+/g, '_')}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Calendar event (.ics) downloaded!');
    } catch {
      toast.error('Could not download calendar file');
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 20,
      border: '1px solid #e2e8f0',
      boxShadow: '0 20px 40px rgba(15,35,71,0.06)',
      overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Calendar Header */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #17356d 100%)`,
        color: '#ffffff',
        padding: '24px 28px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CalIcon size={22} color={GOLD} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>
              {MONTHS[month]} {year}
            </h3>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
              Academic Schedule, Seminars & Examination Dates
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={goToday}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              padding: '7px 14px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Today
          </button>
          <button
            type="button"
            onClick={prevMonth}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              width: 34,
              height: 34,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              width: 34,
              height: 34,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Days of Week */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '10px 0',
        textAlign: 'center',
        fontWeight: 800,
        fontSize: 12,
        color: '#64748b'
      }}>
        {DAYS.map(d => <div key={d}>{d}</div>)}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
        background: '#f1f5f9',
        padding: '1px'
      }}>
        {calendarDays.map((cell, idx) => {
          const dateStr = cell.date.toISOString().slice(0, 10);
          const dayEvents = eventsByDate[dateStr] || [];
          const currentDay = isToday(cell.date);

          return (
            <div
              key={idx}
              style={{
                minHeight: '85px',
                background: cell.isCurrentMonth ? '#ffffff' : '#fbfcfd',
                padding: '8px',
                opacity: cell.isCurrentMonth ? 1 : 0.45,
                transition: 'background 0.2s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: currentDay ? 900 : 700,
                  color: currentDay ? '#ffffff' : cell.isCurrentMonth ? NAVY : '#94a3b8',
                  background: currentDay ? GOLD : 'transparent',
                  width: currentDay ? 24 : 'auto',
                  height: currentDay ? 24 : 'auto',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cell.dayNumber}
                </span>
                {dayEvents.length > 0 && (
                  <span style={{
                    fontSize: 9,
                    fontWeight: 800,
                    background: `${NAVY}10`,
                    color: NAVY,
                    padding: '2px 5px',
                    borderRadius: 4
                  }}>
                    {dayEvents.length}
                  </span>
                )}
              </div>

              {/* Event indicators */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                {dayEvents.slice(0, 2).map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      background: `${NAVY}08`,
                      color: NAVY,
                      borderLeft: `3px solid ${GOLD}`,
                      padding: '2px 4px',
                      borderRadius: 3,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={ev.title}
                  >
                    {ev.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div
                    style={{ fontSize: 9.5, color: '#64748b', fontWeight: 700, cursor: 'pointer' }}
                    onClick={() => setSelectedEvent(dayEvents[0])}
                  >
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details Modal/Drawer if clicked */}
      {selectedEvent && (
        <div style={{
          background: '#f8fafc',
          borderTop: '2px solid #e2e8f0',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          animation: 'fadeIn 0.2s ease'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{
                background: GOLD,
                color: '#fff',
                fontSize: 11,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 4
              }}>
                {selectedEvent.type || 'EVENT'}
              </span>
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                {selectedEvent.date || 'College Schedule'}
              </span>
            </div>
            <h4 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: NAVY }}>
              {selectedEvent.title}
            </h4>
            <p style={{ margin: 0, fontSize: 13, color: '#475569', maxWidth: 650 }}>
              {selectedEvent.desc || 'No additional details provided.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              onClick={() => downloadIcs(selectedEvent)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: NAVY,
                color: '#ffffff',
                border: 'none',
                padding: '9px 16px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Download size={14} /> Add to Calendar (.ics)
            </button>
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              style={{
                background: '#e2e8f0',
                border: 'none',
                color: '#475569',
                padding: '9px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
