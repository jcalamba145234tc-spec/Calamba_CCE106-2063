export type EventCategory = 'Technology' | 'Sports' | 'Academic' | 'Social';

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  description: string;
  available: boolean;
  joined: boolean;
}

// This local array keeps EventMate fully offline and easy to discuss in class.
export const INITIAL_EVENTS: EventItem[] = [
  { id: '1', title: 'Campus Tech Talk', category: 'Technology', date: 'September 20, 2026', time: '2:00 PM', venue: 'IT Building Room 204', description: 'A friendly campus discussion about modern technology and software development.', available: true, joined: false },
  { id: '2', title: 'Basketball Tournament', category: 'Sports', date: 'September 22, 2026', time: '3:30 PM', venue: 'University Gymnasium', description: 'Cheer for department teams competing in the annual campus tournament.', available: true, joined: true },
  { id: '3', title: 'Student Leadership Seminar', category: 'Academic', date: 'September 24, 2026', time: '9:00 AM', venue: 'Main Auditorium', description: 'Build communication, teamwork, and leadership skills with fellow students.', available: true, joined: false },
  { id: '4', title: 'Music Night', category: 'Social', date: 'September 26, 2026', time: '6:00 PM', venue: 'Campus Open Grounds', description: 'An evening of student performances, music, and food booths.', available: true, joined: false },
  { id: '5', title: 'Coding Workshop', category: 'Technology', date: 'September 29, 2026', time: '10:00 AM', venue: 'Computer Laboratory A', description: 'A hands-on beginner workshop for building your first mobile app.', available: true, joined: true },
  { id: '6', title: 'Career Fair', category: 'Academic', date: 'October 2, 2026', time: '1:00 PM', venue: 'Student Center Hall', description: 'Meet local employers and explore internship opportunities.', available: false, joined: false },
];
