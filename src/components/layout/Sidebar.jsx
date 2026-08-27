import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, CirclePlus, ListChecks, Film, BookOpen, Tv, Ghost,
  Heart, Bookmark, FolderOpen, LineChart, FileText, Settings, Info, Menu, X,
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      {/* Only visible on small screens, via the media query in Sidebar.css */}
      <button type="button" className="mobile-menu-button" onClick={() => setIsOpen(true)} aria-label="Open menu">
        <Menu size={20} />
      </button>

      {isOpen && (
        <button type="button" className="sidebar-backdrop" onClick={close} aria-label="Close menu" />
      )}

      <aside className={`sidebar${isOpen ? ' is-open' : ''}`}>
        <div className="sidebar__mobile-close">
          <button type="button" onClick={close} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="sidebar__brand">
          <span className="sidebar__logo">
            <LayoutDashboard size={18} />
          </span>
          <div>
            <p className="sidebar__brand-name">MediaLoom</p>
            <p className="sidebar__brand-tag">DASHBOARD</p>
          </div>
        </div>

        <nav className="sidebar__nav">
          <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" end onClick={close} />
          <SidebarLink to="/add-rating" icon={CirclePlus} label="Add New Rating" accent onClick={close} />
          <SidebarLink to="/ratings" icon={ListChecks} label="All Rating" onClick={close} />

          <p className="sidebar__section">Your Library</p>
          <SidebarLink to="/movies" icon={Film} label="Movies" onClick={close} />
          <SidebarLink to="/books" icon={BookOpen} label="Books" onClick={close} />
          <SidebarLink to="/tv" icon={Tv} label="TV Series" onClick={close} />
          <SidebarLink to="/anime" icon={Ghost} label="Anime" onClick={close} />

          <p className="sidebar__section">Quick Lists</p>
          <SidebarLink to="/favourites" icon={Heart} label="Favourites" onClick={close} />
          <SidebarLink to="/watchlist" icon={Bookmark} label="Watchlist" onClick={close} />
          <SidebarLink to="/reading-list" icon={FolderOpen} label="Reading List" onClick={close} />

          <p className="sidebar__section">Analytics</p>
          <SidebarLink to="/statistics" icon={LineChart} label="Statistics" onClick={close} />
          <SidebarLink to="/reports" icon={FileText} label="Reports" onClick={close} />

          <p className="sidebar__section">Others</p>
          <SidebarLink to="/settings" icon={Settings} label="Settings" onClick={close} />
          <SidebarLink to="/about" icon={Info} label="About Project" onClick={close} />
        </nav>

        <div className="sidebar__profile">
          <div className="sidebar__avatar" aria-hidden="true" />
          <div>
            <p className="sidebar__profile-name">You</p>
            <p className="sidebar__profile-tag">No login yet</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ to, icon: Icon, label, end = false, accent = false, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => `sidebar__link${isActive ? ' is-active' : ''}${accent ? ' sidebar__link--accent' : ''}`}
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}
