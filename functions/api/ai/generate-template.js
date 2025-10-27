// AI Template Generation API
export async function onRequestPost(context) {
  const { request, env } = context

  try {
    // Get request body
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please provide a valid prompt describing your email template needs.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Generate template using TongYi AI
    const template = await generateTemplateWithAI(prompt)

    return new Response(
      JSON.stringify({
        success: true,
        template: template
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('AI template generation error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to generate template. Please try again.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

async function generateTemplateWithAI(prompt) {
  const API_KEY = 'sk-9bf19547ddbd4be1a87a7a43cf251097'
  const API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'

  try {
    // Construct the AI prompt
    const aiPrompt = `Create a professional email template based on: "${prompt}"

Return ONLY a JSON object with this exact format:
{
  "name": "Template Name",
  "subject": "Email Subject Line",
  "html": "<!DOCTYPE html><html><head><meta charset='utf-8'></head><body><table width='100%' style='max-width:600px;margin:0 auto'><tr><td style='padding:20px;background:#f0f4f8'><h1 style='color:#333;text-align:center'>Header</h1></td></tr><tr><td style='padding:40px;background:#fff'><p style='font-size:16px;line-height:1.6;color:#555'>Professional email content here</p></td></tr></table></body></html>"
}

Rules:
- Name should describe the template (max 40 chars)
- Subject should be engaging (max 80 chars)  
- HTML must be complete, single-line, with inline styles
- Use email-safe HTML (tables, inline CSS, no external stylesheets)
- Include colors, buttons, professional layout
- Keep HTML concise but complete`

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-DashScope-SSE': 'disable'
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        input: {
          messages: [
            {
              role: 'system',
              content: 'You are an expert email template designer. Always respond with valid JSON containing name, subject, and html fields.'
            },
            {
              role: 'user',
              content: aiPrompt
            }
          ]
        },
        parameters: {
          temperature: 0.7,
          max_tokens: 4000,
          result_format: 'message'
        }
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    
    // Extract the generated content
    if (data.output && data.output.choices && data.output.choices.length > 0) {
      const content = data.output.choices[0].message.content
      
      // Try to parse JSON from the response
      try {
        // First try direct JSON parse
        const parsedTemplate = JSON.parse(content)
        
        if (parsedTemplate.name && parsedTemplate.subject && parsedTemplate.html) {
          return parsedTemplate
        }
      } catch (e) {
        console.error('Failed to parse AI response as JSON:', e)
        
        // Try to extract JSON from markdown code blocks or other formats
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                         content.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/)
        
        if (jsonMatch) {
          try {
            const jsonStr = jsonMatch[1] || jsonMatch[0]
            const parsedTemplate = JSON.parse(jsonStr)
            
            if (parsedTemplate.name && parsedTemplate.subject && parsedTemplate.html) {
              return parsedTemplate
            }
          } catch (e2) {
            console.error('Failed to parse extracted JSON:', e2)
          }
        }
      }
    }
    
    // Fallback: if parsing fails, create a template with the AI response
    return {
      name: 'AI Generated Template',
      subject: 'Your Email Subject',
      html: generateTemplateFromPrompt(prompt)
    }
  } catch (error) {
    console.error('AI template generation error:', error)
    // Fallback to rule-based generation
    return generateTemplateFromPrompt(prompt)
  }
}

function generateTemplateFromPrompt(prompt) {
  const lowerPrompt = prompt.toLowerCase()

  // Determine template characteristics based on prompt
  let templateName = 'Custom Email Template'
  let subject = 'Your Email Subject Here'
  let isNewsletter = lowerPrompt.includes('newsletter') || lowerPrompt.includes('update')
  let isPromotional = lowerPrompt.includes('promo') || lowerPrompt.includes('sale') || lowerPrompt.includes('discount')
  let isTransactional = lowerPrompt.includes('order') || lowerPrompt.includes('confirmation') || lowerPrompt.includes('receipt')
  let isInvitation = lowerPrompt.includes('invite') || lowerPrompt.includes('event') || lowerPrompt.includes('webinar')
  let colorScheme = 'blue'
  
  // Extract industry/business type
  if (lowerPrompt.includes('tech') || lowerPrompt.includes('software') || lowerPrompt.includes('saas')) {
    templateName = 'Tech Company Newsletter'
    colorScheme = 'purple'
  } else if (lowerPrompt.includes('e-commerce') || lowerPrompt.includes('shop') || lowerPrompt.includes('retail')) {
    templateName = 'E-commerce Update'
    colorScheme = 'pink'
  } else if (lowerPrompt.includes('agency') || lowerPrompt.includes('marketing')) {
    templateName = 'Agency Newsletter'
    colorScheme = 'indigo'
  } else if (lowerPrompt.includes('non-profit') || lowerPrompt.includes('nonprofit') || lowerPrompt.includes('charity')) {
    templateName = 'Non-Profit Update'
    colorScheme = 'green'
  }

  // Generate HTML based on template type
  let html = ''
  
  if (isNewsletter) {
    html = generateNewsletterTemplate(templateName, subject, colorScheme)
  } else if (isPromotional) {
    html = generatePromotionalTemplate(templateName, subject, colorScheme)
  } else if (isTransactional) {
    html = generateTransactionalTemplate(templateName, subject)
  } else if (isInvitation) {
    html = generateInvitationTemplate(templateName, subject, colorScheme)
  } else {
    // Default professional template
    html = generateProfessionalTemplate(templateName, subject, colorScheme)
  }

  return {
    name: templateName,
    subject: subject,
    html: html
  }
}

function generateNewsletterTemplate(name, subject, color) {
  const colors = {
    blue: { primary: '#3b82f6', secondary: '#dbeafe' },
    purple: { primary: '#8b5cf6', secondary: '#ede9fe' },
    pink: { primary: '#ec4899', secondary: '#fce7f3' },
    indigo: { primary: '#6366f1', secondary: '#e0e7ff' },
    green: { primary: '#10b981', secondary: '#d1fae5' }
  }
  const c = colors[color] || colors.blue

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px 30px; background: linear-gradient(135deg, ${c.primary}, ${c.primary}dd); text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">${name}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="margin: 0 0 15px; font-size: 22px; color: #1f2937;">Featured Article</h2>
        <p style="margin: 0 0 20px; line-height: 1.6; color: #4b5563;">Welcome to our newsletter! We're excited to share the latest updates and insights with you.</p>
        <a href="#" style="display: inline-block; padding: 12px 24px; background-color: ${c.primary}; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">Read More</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 30px 30px;">
        <div style="background-color: ${c.secondary}; padding: 20px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px; font-size: 18px; color: #1f2937;">Quick Links</h3>
          <ul style="margin: 0; padding-left: 20px; line-height: 2; color: #4b5563;">
            <li>Latest Updates</li>
            <li>Product News</li>
            <li>Community Highlights</li>
          </ul>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 14px; color: #6b7280;">© 2024 Your Company. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function generatePromotionalTemplate(name, subject, color) {
  const colors = {
    blue: { primary: '#3b82f6', gradient: '#1e40af' },
    purple: { primary: '#8b5cf6', gradient: '#6d28d9' },
    pink: { primary: '#ec4899', gradient: '#be185d' },
    indigo: { primary: '#6366f1', gradient: '#4338ca' },
    green: { primary: '#10b981', gradient: '#059669' }
  }
  const c = colors[color] || colors.blue

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 40px 30px; background: linear-gradient(135deg, ${c.primary}, ${c.gradient}); text-align: center;">
        <h1 style="margin: 0 0 10px; font-size: 36px; font-weight: bold; color: #ffffff;">Special Offer</h1>
        <p style="margin: 0; font-size: 18px; color: #ffffff99;">Limited Time Only</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: center;">
        <h2 style="margin: 0 0 15px; font-size: 24px; color: #1f2937;">Get Amazing Deals!</h2>
        <p style="margin: 0 0 30px; line-height: 1.6; color: #4b5563;">Don't miss out on our exclusive offers. Act now before it's too late!</p>
        <a href="#" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, ${c.primary}, ${c.gradient}); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Shop Now</a>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function generateTransactionalTemplate(name, subject) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
    <tr>
      <td style="padding: 30px;">
        <h2 style="margin: 0 0 20px; font-size: 24px; color: #1f2937;">Order Confirmation</h2>
        <p style="margin: 0 0 15px; line-height: 1.6; color: #4b5563;">Thank you for your order! Here are your order details:</p>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 5px 0; color: #1f2937;"><strong>Order ID:</strong> #12345</p>
          <p style="margin: 5px 0; color: #1f2937;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p style="margin: 5px 0; color: #1f2937;"><strong>Total:</strong> $0.00</p>
        </div>
        <p style="margin: 20px 0 0; line-height: 1.6; color: #6b7280; font-size: 14px;">If you have any questions, please don't hesitate to contact us.</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function generateInvitationTemplate(name, subject, color) {
  const colors = {
    blue: { primary: '#3b82f6', secondary: '#dbeafe' },
    purple: { primary: '#8b5cf6', secondary: '#ede9fe' },
    pink: { primary: '#ec4899', secondary: '#fce7f3' },
    indigo: { primary: '#6366f1', secondary: '#e0e7ff' },
    green: { primary: '#10b981', secondary: '#d1fae5' }
  }
  const c = colors[color] || colors.blue

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
    <tr>
      <td style="padding: 50px 30px; background: linear-gradient(135deg, ${c.primary}, ${c.primary}dd); text-align: center;">
        <h1 style="margin: 0 0 15px; font-size: 32px; font-weight: bold; color: #ffffff;">You're Invited!</h1>
        <p style="margin: 0; font-size: 18px; color: #ffffff99;">We'd love to have you join us</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <p style="margin: 0 0 25px; line-height: 1.6; color: #4b5563;">We're excited to invite you to our upcoming event.</p>
        <div style="background-color: ${c.secondary}; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <p style="margin: 5px 0; color: #1f2937;"><strong>Event:</strong> Special Event</p>
          <p style="margin: 5px 0; color: #1f2937;"><strong>Date:</strong> TBD</p>
          <p style="margin: 5px 0; color: #1f2937;"><strong>Location:</strong> Virtual</p>
        </div>
        <a href="#" style="display: inline-block; padding: 14px 32px; background-color: ${c.primary}; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">RSVP Now</a>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function generateProfessionalTemplate(name, subject, color) {
  const colors = {
    blue: { primary: '#3b82f6', secondary: '#dbeafe' },
    purple: { primary: '#8b5cf6', secondary: '#ede9fe' },
    pink: { primary: '#ec4899', secondary: '#fce7f3' },
    indigo: { primary: '#6366f1', secondary: '#e0e7ff' },
    green: { primary: '#10b981', secondary: '#d1fae5' }
  }
  const c = colors[color] || colors.blue

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 30px; background-color: ${c.primary}; text-align: center;">
        <h1 style="margin: 0; font-size: 26px; font-weight: bold; color: #ffffff;">${name}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <p style="margin: 0 0 20px; line-height: 1.6; color: #1f2937; font-size: 16px;">Hello,</p>
        <p style="margin: 0 0 20px; line-height: 1.6; color: #4b5563;">This is a professional email template generated based on your needs.</p>
        <div style="background-color: ${c.secondary}; padding: 25px; border-left: 4px solid ${c.primary}; margin: 25px 0;">
          <p style="margin: 0; line-height: 1.8; color: #1f2937;">You can customize this template further to match your specific requirements.</p>
        </div>
        <a href="#" style="display: inline-block; padding: 12px 24px; background-color: ${c.primary}; color: #ffffff; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: 600;">Call to Action</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 14px; color: #6b7280;">Best regards,<br>Your Team</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

