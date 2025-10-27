/**
 * Export to ESP Handler
 * Handles exporting templates to various ESP platforms
 */

export async function onRequestPost({ request, env }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

    try {
    const data = await request.json();
    const { esp, name, html, subject, userEmail, accessToken, dc } = data;
    
    console.log('=== Export Request Received ===');
    console.log('ESP:', esp);
    console.log('Name:', name);
    console.log('User Email:', userEmail);
    console.log('HTML length:', html?.length);
    console.log('Access Token provided:', !!accessToken);
    console.log('DC provided:', dc);
    
    if (!esp || !name || !html) {
      console.error('Missing required fields');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields: esp, name, html' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Handle Mailchimp export
    if (esp.toLowerCase() === 'mailchimp') {
      // Get user's Mailchimp token - use token from request if available
      let mailchimpAccessToken = accessToken;
      let mailchimpDc = dc;
      
      console.log('Initial token check:', { hasToken: !!mailchimpAccessToken, hasDc: !!mailchimpDc });
      
      // If not in request, try to get from KV
      if (!mailchimpAccessToken || !mailchimpDc) {
        console.log('No token in request, checking KV...');
        if (userEmail) {
          try {
            const userKey = `user_${userEmail.toLowerCase()}`;
            console.log('Looking for user in KV, key:', userKey);
            const userData = await env.USERS_KV.get(userKey);
            console.log('User data from KV:', userData ? 'Found' : 'Not found');
            
            if (userData) {
              const user = JSON.parse(userData);
              mailchimpAccessToken = user.mailchimpAccessToken;
              mailchimpDc = user.mailchimpDc;
              console.log('User token found in KV');
            }
          } catch (error) {
            console.error('Error getting user token from KV:', error);
          }
        }
      } else {
        console.log('Using token from request');
      }

      if (!mailchimpAccessToken || !mailchimpDc) {
        console.error('Missing access token or DC - user needs to connect first');
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Please connect your Mailchimp account first. Click "Connect Mailchimp" to authorize.' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Create template in Mailchimp
      try {
        const templateData = {
          name: name,
          html: html,
          folder_id: '',
          type: 'user'
        };

        if (subject) {
          templateData.subject_line = subject;
        }

        console.log('Creating Mailchimp template...');
        console.log('Using DC:', mailchimpDc);
        
        const response = await fetch(`https://${mailchimpDc}.api.mailchimp.com/3.0/templates`, {
          method: 'POST',
          headers: {
            'Authorization': `OAuth ${mailchimpAccessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(templateData)
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Mailchimp API error:', errorText);
          throw new Error(`Mailchimp API error: ${errorText}`);
        }

        const template = await response.json();
        
        console.log('Template created successfully:', template.id);

        return new Response(JSON.stringify({ 
          success: true,
          id: template.id,
          edit_url: `https://${mailchimpDc}.admin.mailchimp.com/templates/edit?id=${template.id}`,
          template_name: template.name,
          esp: 'mailchimp'
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Mailchimp export error:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: `Failed to export to Mailchimp: ${error.message}` 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Handle other ESPs
    return new Response(JSON.stringify({ 
      success: false, 
      error: `ESP ${esp} not yet implemented in Functions` 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Export error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to export template' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
