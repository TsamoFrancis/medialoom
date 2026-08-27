import { Star } from 'lucide-react';

export default function RatingsToolbar({ count, average }) {
  return (
    <div className="ratings-toolbar">
      <span className="ratings-toolbar__count">{count} {count === 1 ? 'entry' : 'entries'}</span>

      <div className="ratings-toolbar__average">
        <Star size={15} fill="currentColor" />
        <span>{count ? average.toFixed(1) : '—'} / 5 average</span>
      </div>
    </div>
  );
}
