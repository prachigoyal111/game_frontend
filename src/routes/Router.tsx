import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import MembersList from '../pages/Members/MembersList';
import MemberForm from '../pages/Members/MemberForm';
import MemberDetail from '../pages/Members/MemberDetail';
import GamesList from '../pages/Games/GamesList';
import GameForm from '../pages/Games/GameForm';
import RechargesList from '../pages/Recharges/RechargesList';
import RechargeForm from '../pages/Recharges/RechargeForm';
import TransactionsList from '../pages/Transactions/TransactionsList';
import TransactionForm from '../pages/Transactions/TransactionForm';
import CollectionsDaily from '../pages/Collections/CollectionsDaily';
import CollectionsList from '../pages/Collections/CollectionsList';
import CollectionForm from '../pages/Collections/CollectionForm';
import AdminUsersList from '../pages/AdminUsers/AdminUsersList';
import AdminUserForm from '../pages/AdminUsers/AdminUserForm';
import Layout from '../shared/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'members', element: <MembersList /> },
      { path: 'members/new', element: <MemberForm /> },
      { path: 'members/:id', element: <MemberDetail /> },
      { path: 'members/:id/edit', element: <MemberForm /> },

      { path: 'games', element: <GamesList /> },
      { path: 'games/new', element: <GameForm /> },
      { path: 'games/:id/edit', element: <GameForm /> },

      { path: 'recharges', element: <RechargesList /> },
      { path: 'recharges/new', element: <RechargeForm /> },

      { path: 'transactions', element: <TransactionsList /> },
      { path: 'transactions/new', element: <TransactionForm /> },

      { path: 'collections', element: <CollectionsList /> },
      { path: 'collections/daily', element: <CollectionsDaily /> },
      { path: 'collections/new', element: <CollectionForm /> },
      { path: 'collections/:id/edit', element: <CollectionForm /> },

      { path: 'admin-users', element: <AdminUsersList /> },
      { path: 'admin-users/new', element: <AdminUserForm /> },
      { path: 'admin-users/:id/edit', element: <AdminUserForm /> },
    ],
  },
]);

export default router;
