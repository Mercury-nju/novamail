'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import AITemplateChat from '@/components/AITemplateChat'

export default function TemplatesPage() {
  return (
    <div className="h-screen bg-gray-50">
      <AITemplateChat />
    </div>
  )
}
