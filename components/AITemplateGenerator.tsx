'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, SparklesIcon, ArrowRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface AITemplateGeneratorProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function AITemplateGenerator({ isOpen, setIsOpen }: AITemplateGeneratorProps) {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTemplate, setGeneratedTemplate] = useState<{
    html: string
    subject: string
    name: string
  } | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for your template')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/ai/generate-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate template')
      }

      const data = await response.json()

      if (data.success && data.template) {
        setGeneratedTemplate(data.template)
        toast.success('Template generated successfully!')
      } else {
        throw new Error(data.error || 'Failed to generate template')
      }
    } catch (error) {
      console.error('Template generation error:', error)
      toast.error('Failed to generate template. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleUseTemplate = () => {
    if (!generatedTemplate) return

    // Navigate to campaign editor with the generated template
    const templateData = {
      name: generatedTemplate.name,
      subject: generatedTemplate.subject,
      html: generatedTemplate.html,
    }

    // Save template temporarily and navigate to editor
    sessionStorage.setItem('ai-generated-template', JSON.stringify(templateData))
    router.push('/dashboard/campaigns/edit?ai-generated=true')
    setIsOpen(false)
  }

  const handleReset = () => {
    setPrompt('')
    setGeneratedTemplate(null)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 sm:mx-0 sm:h-10 sm:w-10">
                    <SparklesIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      AI Template Generator
                    </Dialog.Title>
                    <div className="mt-4 space-y-4">
                      {!generatedTemplate ? (
                        <>
                          <div>
                            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                              Describe your email template needs
                            </label>
                            <textarea
                              id="prompt"
                              rows={6}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                              placeholder="Example: I need a professional newsletter template for my tech company with sections for latest product updates, team news, and upcoming events..."
                              value={prompt}
                              onChange={(e) => setPrompt(e.target.value)}
                            />
                            <p className="mt-2 text-sm text-gray-500">
                              Be as specific as possible. Include details about your industry, tone, content sections, and any specific requirements.
                            </p>
                          </div>

                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              onClick={() => setIsOpen(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleGenerate}
                              disabled={isGenerating || !prompt.trim()}
                              className="inline-flex items-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isGenerating ? (
                                <>
                                  <span className="animate-spin mr-2">⏳</span>
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <SparklesIcon className="h-4 w-4 mr-2" />
                                  Generate Template
                                </>
                              )}
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center mb-3">
                              <SparklesIcon className="h-5 w-5 text-green-600 mr-2" />
                              <h4 className="text-sm font-semibold text-green-900">Template Generated!</h4>
                            </div>
                            <div className="space-y-2 text-sm text-green-800">
                              <p><strong>Name:</strong> {generatedTemplate.name}</p>
                              <p><strong>Subject:</strong> {generatedTemplate.subject}</p>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              onClick={handleReset}
                            >
                              Generate Another
                            </button>
                            <button
                              type="button"
                              onClick={handleUseTemplate}
                              className="inline-flex items-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-purple-700 hover:to-pink-700"
                            >
                              Use This Template
                              <ArrowRightIcon className="h-4 w-4 ml-2" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

