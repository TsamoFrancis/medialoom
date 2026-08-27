import { Search } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <Search size={18} />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
