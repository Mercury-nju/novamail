'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  UserIcon,
  EnvelopeIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  GlobeAltIcon,
  CogIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'NovaMail Inc.',
    jobTitle: 'Marketing Manager',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    language: 'en'
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    campaignUpdates: true,
    weeklyReports: true,
    systemAlerts: true,
    marketingTips: false,
    productUpdates: true,
    securityAlerts: true,
    billingNotifications: true
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    apiAccess: false
  })

  // Billing settings
  const [billingData, setBillingData] = useState({
    plan: 'Pro',
    nextBilling: '2024-12-22',
    amount: '$29.99',
    paymentMethod: '**** **** **** 4242',
    billingEmail: 'billing@example.com'
  })

  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    fromName: 'NovaMail Team',
    fromEmail: 'noreply@novasend.com',
    replyTo: 'support@novasend.com',
    trackingPixels: true,
    unsubscribeLink: true,
    footerText: 'You received this email because you subscribed to our updates.',
    maxRecipients: 10000,
    dailyLimit: 5000
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon },
    { id: 'email', name: 'Email Settings', icon: EnvelopeIcon },
    { id: 'email-config', name: 'Email Configuration', icon: EnvelopeIcon },
    { id: 'integrations', name: 'Integrations', icon: CogIcon }
  ]

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!')
  }

  const handleSaveNotifications = () => {
    toast.success('Notification preferences updated!')
  }

  const handleSaveSecurity = () => {
    toast.success('Security settings updated!')
  }

  const handleChangePassword = () => {
    toast.success('Password changed successfully!')
  }

  const handleSaveEmailSettings = () => {
    toast.success('Email settings updated!')
  }

  const handleUpgradePlan = () => {
    toast.success('Redirecting to upgrade page...')
  }

  const handleCancelSubscription = () => {
    toast.error('Subscription cancellation is not available in demo mode')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={profileData.jobTitle}
                      onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                      className="input-field"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                      <option value="Asia/Shanghai">Shanghai (CST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      value={profileData.language}
                      onChange={(e) => setProfileData(prev => ({ ...prev, language: e.target.value }))}
                      className="input-field"
                    >
                      <option value="en">English</option>
                      <option value="zh">中文</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <button onClick={handleSaveProfile} className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h2>
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                          {key === 'campaignUpdates' && 'Get notified when campaigns are sent or completed'}
                          {key === 'weeklyReports' && 'Receive weekly performance reports'}
                          {key === 'systemAlerts' && 'Get alerts for system maintenance and updates'}
                          {key === 'marketingTips' && 'Receive marketing tips and best practices'}
                          {key === 'productUpdates' && 'Get notified about new features and updates'}
                          {key === 'securityAlerts' && 'Receive security alerts and login notifications'}
                          {key === 'billingNotifications' && 'Get billing and payment notifications'}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings(prev => ({ ...prev, [key]: !value }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button onClick={handleSaveNotifications} className="btn-primary">
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Change Password */}
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        className="input-field pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showCurrentPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        className="input-field pr-10"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showNewPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="input-field pr-10"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button onClick={handleChangePassword} className="btn-primary">
                    Change Password
                  </button>
                </div>
              </div>

              {/* Security Preferences */}
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Security Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={() => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.twoFactorAuth ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Login Alerts</h3>
                      <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                    </div>
                    <button
                      onClick={() => setSecuritySettings(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.loginAlerts ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Session Timeout</h3>
                      <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
                    </div>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
                      className="input-field w-24"
                    >
                      <option value={15}>15 min</option>
                      <option value={30}>30 min</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                      <option value={0}>Never</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">API Access</h3>
                      <p className="text-sm text-gray-600">Allow third-party applications to access your account</p>
                    </div>
                    <button
                      onClick={() => setSecuritySettings(prev => ({ ...prev, apiAccess: !prev.apiAccess }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.apiAccess ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.apiAccess ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <button onClick={handleSaveSecurity} className="btn-primary">
                    Save Security Settings
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Current Plan */}
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h2>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-primary-900">{billingData.plan} Plan</h3>
                      <p className="text-sm text-primary-700">
                        Next billing: {new Date(billingData.nextBilling).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-900">{billingData.amount}</p>
                      <p className="text-sm text-primary-700">per month</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button onClick={handleUpgradePlan} className="btn-primary">
                    Upgrade Plan
                  </button>
                  <button onClick={handleCancelSubscription} className="btn-secondary">
                    Cancel Subscription
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <CreditCardIcon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Billing History</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { date: '2024-11-22', description: 'Pro Plan - Monthly', amount: '$29.99', status: 'Paid' },
                        { date: '2024-10-22', description: 'Pro Plan - Monthly', amount: '$29.99', status: 'Paid' },
                        { date: '2024-09-22', description: 'Pro Plan - Monthly', amount: '$29.99', status: 'Paid' },
                        { date: '2024-08-22', description: 'Pro Plan - Monthly', amount: '$29.99', status: 'Paid' }
                      ].map((invoice, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(invoice.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              {invoice.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Email Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Name
                    </label>
                    <input
                      type="text"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Email
                    </label>
                    <input
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reply-To Email
                    </label>
                    <input
                      type="email"
                      value={emailSettings.replyTo}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, replyTo: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Recipients per Campaign
                    </label>
                    <input
                      type="number"
                      value={emailSettings.maxRecipients}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, maxRecipients: Number(e.target.value) }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Sending Limit
                    </label>
                    <input
                      type="number"
                      value={emailSettings.dailyLimit}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, dailyLimit: Number(e.target.value) }))}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Footer Text
                  </label>
                  <textarea
                    value={emailSettings.footerText}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, footerText: e.target.value }))}
                    className="input-field"
                    rows={3}
                  />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Tracking Pixels</h3>
                      <p className="text-sm text-gray-600">Enable open and click tracking</p>
                    </div>
                    <button
                      onClick={() => setEmailSettings(prev => ({ ...prev, trackingPixels: !prev.trackingPixels }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        emailSettings.trackingPixels ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          emailSettings.trackingPixels ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Unsubscribe Link</h3>
                      <p className="text-sm text-gray-600">Automatically add unsubscribe link to emails</p>
                    </div>
                    <button
                      onClick={() => setEmailSettings(prev => ({ ...prev, unsubscribeLink: !prev.unsubscribeLink }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        emailSettings.unsubscribeLink ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          emailSettings.unsubscribeLink ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <button onClick={handleSaveEmailSettings} className="btn-primary">
                    Save Email Settings
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Configuration */}
          {activeTab === 'email-config' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">邮箱账户配置</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">配置您的邮箱账户</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        配置后，您发送的邮件将显示为来自您的邮箱地址，而不是系统默认邮箱
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <EnvelopeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">配置邮箱账户</h3>
                  <p className="text-gray-600 mb-6">
                    设置您的SMTP配置，使用自己的邮箱发送邮件活动
                  </p>
                  <a
                    href="/dashboard/settings/email"
                    className="btn-primary"
                  >
                    前往邮箱配置
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Third-Party Integrations</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Google Analytics', description: 'Track email campaign performance', connected: false },
                    { name: 'Salesforce', description: 'Sync contacts and campaign data', connected: false },
                    { name: 'HubSpot', description: 'Integrate with your CRM', connected: false },
                    { name: 'Zapier', description: 'Automate workflows', connected: false },
                    { name: 'Slack', description: 'Get campaign notifications', connected: false },
                    { name: 'Webhook', description: 'Custom webhook integration', connected: false }
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          integration.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {integration.connected ? 'Connected' : 'Not Connected'}
                        </span>
                        <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                          {integration.connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Keys */}
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">API Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Key
                    </label>
                    <div className="flex">
                      <input
                        type="password"
                        value="sk_live_51H1234567890abcdef"
                        readOnly
                        className="input-field rounded-r-none"
                      />
                      <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        Copy
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Use this API key to integrate NovaMail with your applications
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://your-domain.com/webhook"
                      className="input-field"
                    />
                    <p className="mt-1 text-sm text-gray-600">
                      Receive real-time notifications about campaign events
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="btn-primary">
                    Save API Settings
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
