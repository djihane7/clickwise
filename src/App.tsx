import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import Missions from './pages/Missions';
import Games from './pages/Games';
import Learn from './pages/Learn';
import Emergency from './pages/Emergency';
import Profile from './pages/Profile';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="register" element={<Register />} />
            <Route path="assessment" element={<Assessment />} />
            <Route path="results" element={<Results />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="missions" element={<Missions />} />
            <Route path="games" element={<Games />} />
            <Route path="learn" element={<Learn />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
