'use client'

import { useState } from 'react'
import AIAssistant from '@/components/AIAssistant'

export default function TemplatesPage() {
  const [showAIAssistant, setShowAIAssistant] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <AIAssistant
        isOpen={showAIAssistant}
        setIsOpen={setShowAIAssistant}
      />
    </div>
  )
}
