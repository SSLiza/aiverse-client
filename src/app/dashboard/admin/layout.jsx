import { requireRole } from '@/lib/core/session';
import React from 'react';

const AdminDashboardLayout = async ({children}) => {
    await requireRole('admin'); // Ensure the user has the 'admin' role
    return children;
};

export default AdminDashboardLayout;