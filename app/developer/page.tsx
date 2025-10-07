'use client';

import { useState, useEffect } from 'react';

interface UserData {
  id: string;
  email: string;
  name: string;
  company: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  emailsSentThisMonth: number;
  contactsCount: number;
  campaignsCount: number;
  createdAt: string;
  lastLogin: string;
  totalEmailsSent: number;
  totalRevenue: number;
}

interface UserActivity {
  userId: string;
  userEmail: string;
  action: string;
  details: string;
  timestamp: string;
}

export default function DeveloperDashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    proUsers: 0,
    totalRevenue: 0,
    totalEmailsSent: 0,
    totalContacts: 0
  });

  useEffect(() => {
    fetchDeveloperData();
  }, []);

  const fetchDeveloperData = async () => {
    try {
      setLoading(true);
      
      // 获取用户数据
      const usersResponse = await fetch('/api/developer/users');
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData.data || []);
        
        // 计算统计数据
        const userList = usersData.data || [];
        setStats({
          totalUsers: userList.length,
          activeUsers: userList.filter((u: UserData) => u.subscriptionStatus === 'active').length,
          proUsers: userList.filter((u: UserData) => u.subscriptionPlan === 'pro').length,
          totalRevenue: userList.reduce((sum: number, u: UserData) => sum + (u.totalRevenue || 0), 0),
          totalEmailsSent: userList.reduce((sum: number, u: UserData) => sum + (u.totalEmailsSent || 0), 0),
          totalContacts: userList.reduce((sum: number, u: UserData) => sum + (u.contactsCount || 0), 0)
        });
      }

      // 获取用户活动数据
      const activitiesResponse = await fetch('/api/developer/activities');
      if (activitiesResponse.ok) {
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData.data || []);
      }

    } catch (error) {
      console.error('Failed to fetch developer data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading developer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
          <p className="text-gray-600">Real user data and behavior analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
            <p className="text-sm text-gray-500">Registered users</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
            <p className="text-sm text-gray-500">Users with active subscriptions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Pro Users</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.proUsers}</p>
            <p className="text-sm text-gray-500">Paid subscribers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">${stats.totalRevenue}</p>
            <p className="text-sm text-gray-500">Monthly recurring revenue</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Emails Sent</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.totalEmailsSent.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total emails sent by users</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Contacts</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.totalContacts.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Contacts imported by users</p>
          </div>
        </div>

        {/* User List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
            <p className="text-sm text-gray-600">All registered users and their activity</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || 'No name'}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        {user.company && (
                          <div className="text-sm text-gray-400">{user.company}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.subscriptionPlan === 'pro' 
                          ? 'bg-green-100 text-green-800'
                          : user.subscriptionPlan === 'enterprise'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.subscriptionPlan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        <div>Emails: {user.emailsSentThisMonth}</div>
                        <div>Contacts: {user.contactsCount}</div>
                        <div>Campaigns: {user.campaignsCount}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${user.totalRevenue || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent User Activities</h2>
            <p className="text-sm text-gray-600">Latest user actions and behaviors</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activities.slice(0, 10).map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {activity.userEmail.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.userEmail}
                    </div>
                    <div className="text-sm text-gray-600">
                      {activity.action}: {activity.details}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export Data */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => exportUsers()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Export Users CSV
            </button>
            <button 
              onClick={() => exportActivities()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Export Activities CSV
            </button>
            <button 
              onClick={fetchDeveloperData}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function exportUsers() {
    const csvContent = [
      ['Email', 'Name', 'Company', 'Plan', 'Status', 'Emails Sent', 'Contacts', 'Campaigns', 'Revenue', 'Joined'],
      ...users.map(user => [
        user.email,
        user.name || '',
        user.company || '',
        user.subscriptionPlan,
        user.subscriptionStatus,
        user.emailsSentThisMonth,
        user.contactsCount,
        user.campaignsCount,
        user.totalRevenue || 0,
        new Date(user.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `novamail-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function exportActivities() {
    const csvContent = [
      ['User Email', 'Action', 'Details', 'Timestamp'],
      ...activities.map(activity => [
        activity.userEmail,
        activity.action,
        activity.details,
        new Date(activity.timestamp).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `novamail-activities-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
