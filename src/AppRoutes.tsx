import { Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import AppLayout from './AppLayout';

const appRoutes = () => {
  return [
    <Route path="/" element={<AppLayout />} key="layout">
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="income" element={<Income />} />
      <Route path="categories" element={<Categories />} />
      <Route path="reports" element={<Reports />} />
    </Route>
  ];
};

export default appRoutes;
