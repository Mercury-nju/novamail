function generateAIResponse(userRequest, businessName, productService, targetAudience) {
  const request = userRequest.toLowerCase()
  const business = businessName || 'Your Business'
  
  if (request.includes('subject line') || request.includes('subject lines')) {
    return { response: 'Great question about email subject lines! Here are proven strategies: Keep under 50 characters, use power words like "Exclusive" and "Free", personalize with "You", and A/B test different approaches. Would you like specific examples for your business?' }
  } else if (request.includes('marketing strateg') || request.includes('strategies')) {
    return { response: 'Excellent question! Key email marketing strategies include: 1) Segmentation by demographics and behavior, 2) Automation workflows for welcome series and re-engagement, 3) 80/20 content rule (valuable vs promotional), 4) Mobile optimization, and 5) Testing send times. What specific area interests you most?' }
  } else if (request.includes('open rate') || request.includes('open rates')) {
    return { response: 'Great question! To boost open rates: Clean your list regularly, use double opt-in, segment your audience, test send times (Tuesday-Thursday work best), keep subject lines under 50 characters, personalize content, and maintain good sender reputation. What is your current open rate?' }
  } else if (request.includes('content idea') || request.includes('content ideas')) {
    return { response: 'Here are engaging email content ideas: Educational how-to guides, behind-the-scenes content, interactive polls and quizzes, seasonal content, customer testimonials, industry insights, and exclusive offers. Mix content types to keep subscribers engaged. What type of content resonates with your audience?' }
  } else {
    return { response: 'Thanks for reaching out! I can help with email marketing strategies, subject line optimization, content creation, automation workflows, and performance optimization. What specific aspect of email marketing would you like to explore?' }
  }
}
