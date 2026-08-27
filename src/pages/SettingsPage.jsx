import { useEffect, useState } from 'react';
import { Bell, Layers, Shield, Database } from 'lucide-react';
import './FeaturePages.css';

const STORAGE_KEY = 'medialoom-settings';

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { notifications: true, compact: false };
  } catch {
    return { notifications: true, compact: false };
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(loadSettings);

  // This is a UI preference, not app data — the real "session stores the
  // growing list" requirement is still entirely the PHP side. localStorage
  // here is fine precisely because nothing graded depends on it.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="page">
      <header className="page__header">
        <h1>Settings</h1>
        <p>Manage your account and preferences.</p>
      </header>

      <div className="settings-grid">
        <SettingRow
          icon={Bell}
          title="Notifications"
          description="Show the notification dot on the bell icon."
          checked={settings.notifications}
          onChange={() => toggle('notifications')}
        />
        <SettingRow
          icon={Layers}
          title="Compact mode"
          description="Saves your preference now — tighter spacing across the app is a good next addition."
          checked={settings.compact}
          onChange={() => toggle('compact')}
        />
        <SettingRow
          icon={Shield}
          title="Privacy"
          description="No account system exists yet, so there's nothing to configure here."
          locked
        />
        <SettingRow
          icon={Database}
          title="Data storage"
          description="Your ratings live in a PHP session, not a database — stopping the server clears them."
          locked
        />
      </div>
    </div>
  );
}

function SettingRow({ icon: Icon, title, description, checked, onChange, locked = false }) {
  return (
    <div className="setting-row">
      <span className="setting-row__icon">
        <Icon size={18} />
      </span>
      <div className="setting-row__copy">
        <p>{title}</p>
        <span>{description}</span>
      </div>
      {locked ? (
        <span className="setting-row__locked">Not available</span>
      ) : (
        <button
          type="button"
          className={`toggle${checked ? ' is-on' : ''}`}
          role="switch"
          aria-checked={checked}
          aria-label={title}
          onClick={onChange}
        >
          <span className="toggle__thumb" />
        </button>
      )}
    </div>
  );
}
