'use client';

import { useState, useEffect } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/api-keys');
      if (response.ok) {
        const data = await response.json();
        setApiKeys(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async () => {
    try {
      const response = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newKeyName,
          permissions: selectedPermissions
        })
      });

      if (response.ok) {
        const data = await response.json();
        setApiKeys([...apiKeys, data.data]);
        setShowCreateModal(false);
        setNewKeyName('');
        setSelectedPermissions([]);
      }
    } catch (error) {
      console.error('Failed to create API key:', error);
    }
  };

  const revokeApiKey = async (keyId: string) => {
    try {
      const response = await fetch(`/api/user/api-keys/${keyId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setApiKeys(apiKeys.filter(key => key.id !== keyId));
      }
    } catch (error) {
      console.error('Failed to revoke API key:', error);
    }
  };

  const permissions = [
    { id: 'read_contacts', name: 'Read Contacts', description: 'View and list contacts' },
    { id: 'write_contacts', name: 'Write Contacts', description: 'Create, update, and delete contacts' },
    { id: 'read_campaigns', name: 'Read Campaigns', description: 'View and list campaigns' },
    { id: 'write_campaigns', name: 'Write Campaigns', description: 'Create, update, and delete campaigns' },
    { id: 'send_emails', name: 'Send Emails', description: 'Send emails and campaigns' },
    { id: 'read_analytics', name: 'Read Analytics', description: 'View analytics and reports' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading API keys...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
          <p className="text-gray-600">Manage your API keys for integrations</p>
        </div>

        {/* Create API Key Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create API Key
          </button>
        </div>

        {/* API Keys List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your API Keys</h2>
          </div>
          <div className="p-6">
            {apiKeys.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No API keys created yet</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create Your First API Key
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{key.name}</h3>
                        <p className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded mt-2">
                          {key.key}
                        </p>
                        <div className="mt-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            key.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {key.status}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <p>Created: {new Date(key.createdAt).toLocaleDateString()}</p>
                          <p>Last used: {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Permissions:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {key.permissions.map((permission) => (
                              <span key={permission} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                {permission}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigator.clipboard.writeText(key.key)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => revokeApiKey(key.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* API Documentation */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Base URL</h3>
              <p className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                https://api.novamail.pages.dev/v1
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Authentication</h3>
              <p className="text-sm text-gray-600">
                Include your API key in the Authorization header:
              </p>
              <p className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                Authorization: Bearer YOUR_API_KEY
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Available Endpoints</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• GET /contacts - List contacts</li>
                <li>• POST /contacts - Create contact</li>
                <li>• GET /campaigns - List campaigns</li>
                <li>• POST /campaigns - Create campaign</li>
                <li>• POST /campaigns/&#123;id&#125;/send - Send campaign</li>
                <li>• GET /analytics - Get analytics data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create API Key</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter key name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permissions
              </label>
              <div className="space-y-2">
                {permissions.map((permission) => (
                  <label key={permission.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPermissions([...selectedPermissions, permission.id]);
                        } else {
                          setSelectedPermissions(selectedPermissions.filter(p => p !== permission.id));
                        }
                      }}
                      className="mr-2"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                      <div className="text-xs text-gray-500">{permission.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={createApiKey}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Create Key
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
