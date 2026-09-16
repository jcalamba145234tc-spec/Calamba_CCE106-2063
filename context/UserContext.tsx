import React, { createContext, useContext, useState } from 'react';
import { EventItem, INITIAL_EVENTS } from '../data/events';

type UserContextType = {
  fullName: string;
  email: string;
  events: EventItem[];
  updateProfile: (name: string, email: string) => void;
  toggleJoinEvent: (id: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [fullName, setFullName] = useState('Alex Student');
  const [email, setEmail] = useState('alex@example.com');
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);

  const toggleJoinEvent = (id: string) => {
    setEvents((currentEvents) => currentEvents.map((event) =>
      event.id === id ? { ...event, joined: !event.joined } : event
    ));
  };

  return <UserContext.Provider value={{ fullName, email, events, toggleJoinEvent, updateProfile: (name, newEmail) => { setFullName(name); setEmail(newEmail); } }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
