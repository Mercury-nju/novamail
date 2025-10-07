'use client';

import { useState, useEffect } from 'react';

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  lastTriggered: string;
  secret: string;
}

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWebhookName, setNewWebhookName] = useState('');
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const fetchWebhooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/webhooks');
      if (response.ok) {
        const data = await response.json();
        setWebhooks(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch webhooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createWebhook = async () => {
    try {
      const response = await fetch('/api/user/webhooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newWebhookName,
          url: newWebhookUrl,
          events: selectedEvents
        })
      });

      if (response.ok) {
        const data = await response.json();
        setWebhooks([...webhooks, data.data]);
        setShowCreateModal(false);
        setNewWebhookName('');
        setNewWebhookUrl('');
        setSelectedEvents([]);
      }
    } catch (error) {
      console.error('Failed to create webhook:', error);
    }
  };

  const deleteWebhook = async (webhookId: string) => {
    try {
      const response = await fetch(`/api/user/webhooks/${webhookId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setWebhooks(webhooks.filter(webhook => webhook.id !== webhookId));
      }
    } catch (error) {
      console.error('Failed to delete webhook:', error);
    }
  };

  const testWebhook = async (webhookId: string) => {
    try {
      const response = await fetch(`/api/user/webhooks/${webhookId}/test`, {
        method: 'POST'
      });

      if (response.ok) {
        alert('Webhook test sent successfully!');
      }
    } catch (error) {
      console.error('Failed to test webhook:', error);
    }
  };

  const events = [
    { id: 'campaign.sent', name: 'Campaign Sent', description: 'Triggered when a campaign is sent' },
    { id: 'campaign.opened', name: 'Campaign Opened', description: 'Triggered when a campaign is opened' },
    { id: 'campaign.clicked', name: 'Campaign Clicked', description: 'Triggered when a campaign link is clicked' },
    { id: 'contact.created', name: 'Contact Created', description: 'Triggered when a contact is created' },
    { id: 'contact.updated', name: 'Contact Updated', description: 'Triggered when a contact is updated' },
    { id: 'subscription.created', name: 'Subscription Created', description: 'Triggered when a subscription is created' },
    { id: 'subscription.updated', name: 'Subscription Updated', description: 'Triggered when a subscription is updated' },
    { id: 'subscription.canceled', name: 'Subscription Canceled', description: 'Triggered when a subscription is canceled' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading webhooks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Webhooks</h1>
          <p className="text-gray-600">Configure webhook endpoints for real-time notifications</p>
        </div>

        {/* Create Webhook Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Webhook
          </button>
        </div>

        {/* Webhooks List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Webhooks</h2>
          </div>
          <div className="p-6">
            {webhooks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No webhooks configured yet</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create Your First Webhook
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{webhook.name}</h3>
                        <p className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded mt-2">
                          {webhook.url}
                        </p>
                        <div className="mt-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            webhook.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {webhook.status}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <p>Created: {new Date(webhook.createdAt).toLocaleDateString()}</p>
                          <p>Last triggered: {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleDateString() : 'Never'}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Events:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {webhook.events.map((event) => (
                              <span key={event} className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                {event}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Secret:</p>
                          <p className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                            {webhook.secret}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => testWebhook(webhook.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Test
                        </button>
                        <button
                          onClick={() => deleteWebhook(webhook.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Webhook Documentation */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Webhook Documentation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Webhook Payload</h3>
              <p className="text-sm text-gray-600">
                Webhooks send POST requests to your endpoint with the following payload:
              </p>
              <pre className="text-sm text-gray-600 bg-gray-100 p-4 rounded mt-2 overflow-x-auto">
{`{
  "event": "campaign.sent",
  "data": {
    "campaignId": "camp_123",
    "userId": "user_456",
    "recipients": 1000,
    "timestamp": "2024-10-07T10:00:00Z"
  },
  "signature": "sha256=..."
}`}
              </pre>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Signature Verification</h3>
              <p className="text-sm text-gray-600">
                Verify webhook signatures using the secret key to ensure authenticity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Webhook Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Webhook</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook Name
              </label>
              <input
                type="text"
                value={newWebhookName}
                onChange={(e) => setNewWebhookName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter webhook name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                value={newWebhookUrl}
                onChange={(e) => setNewWebhookUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://your-domain.com/webhook"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Events
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {events.map((event) => (
                  <label key={event.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEvents([...selectedEvents, event.id]);
                        } else {
                          setSelectedEvents(selectedEvents.filter(e => e !== event.id));
                        }
                      }}
                      className="mr-2"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{event.name}</div>
                      <div className="text-xs text-gray-500">{event.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={createWebhook}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Create Webhook
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
