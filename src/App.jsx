import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RatingsProvider } from './context/RatingsProvider';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import AddRatingPage from './pages/AddRatingPage';
import EditRatingPage from './pages/EditRatingPage';
import AllRatingsPage from './pages/AllRatingsPage';
import StatisticsPage from './pages/StatisticsPage';
import TypeLibraryPage from './pages/TypeLibraryPage';
import FavouritesPage from './pages/FavouritesPage';
import HistoryPage from './pages/HistoryPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';

// Movies/Books/TV/Anime share one component — same data, filtered by type.
const TYPE_LIBRARY_ROUTES = [
  { path: '/movies', typeId: 'movie', typeLabel: 'Movie', title: 'Movies', description: 'All your movies.' },
  { path: '/books', typeId: 'book', typeLabel: 'Book', title: 'Books', description: 'All your rated books.' },
  { path: '/tv', typeId: 'tv', typeLabel: 'TV Series', title: 'TV Series', description: 'All your series.' },
  { path: '/anime', typeId: 'anime', typeLabel: 'Anime', title: 'Anime', description: 'All your animes.' },
];

export default function App() {
  return (
    <RatingsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/add-rating" element={<AddRatingPage />} />
            <Route path="/edit-rating/:id" element={<EditRatingPage />} />
            <Route path="/ratings" element={<AllRatingsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />

            {TYPE_LIBRARY_ROUTES.map(({ path, typeId, typeLabel, title, description }) => (
              <Route
                key={path}
                path={path}
                element={<TypeLibraryPage typeId={typeId} typeLabel={typeLabel} title={title} description={description} />}
              />
            ))}

            <Route path="/favourites" element={<FavouritesPage />} />

            <Route
              path="/watchlist"
              element={(
                <HistoryPage
                  typeIds={['movie', 'tv', 'anime']}
                  title="Watchlist"
                  description="A history of everything you've watched, most recent first."
                  searchPlaceholder="Search your watchlist..."
                  emptyTitle="Nothing watched yet."
                  emptyHint="Movies, TV series, and anime you rate will show up here automatically, most recent first."
                />
              )}
            />

            <Route
              path="/reading-list"
              element={(
                <HistoryPage
                  typeIds={['book']}
                  title="Reading List"
                  description="A history of everything you've read, most recent first."
                  searchPlaceholder="Search your reading list..."
                  emptyTitle="Nothing read yet."
                  emptyHint="Books you rate will show up here automatically, most recent first."
                />
              )}
            />

            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RatingsProvider>
  );
}
