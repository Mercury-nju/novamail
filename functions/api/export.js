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
    const { esp, name, html, subject, userEmail } = data;
    
    console.log('=== Export Request Received ===');
    console.log('ESP:', esp);
    console.log('Name:', name);
    console.log('User Email:', userEmail);
    console.log('HTML length:', html?.length);
    
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
      // Get user's Mailchimp token
      let accessToken = null;
      let dc = null;
      
      if (userEmail) {
        try {
          console.log('Checking for user token...');
          const userKey = `user_${userEmail.toLowerCase()}`;
          console.log('User key:', userKey);
          console.log('KV available:', !!env.USERS_KV);
          
          const userData = await env.USERS_KV?.get(userKey);
          console.log('User data from KV:', userData ? 'Found' : 'Not found');
          
          if (userData) {
            const user = JSON.parse(userData);
            accessToken = user.mailchimpAccessToken;
            dc = user.mailchimpDc;
            console.log('User token found:', { accessToken: accessToken ? 'Set' : 'Not set', dc });
          } else {
            console.log('No user data in KV - user needs to connect Mailchimp');
          }
        } catch (error) {
          console.error('Error getting user token:', error);
        }
      } else {
        console.error('No userEmail provided');
      }

      if (!accessToken || !dc) {
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
        
        const response = await fetch(`https://${dc}.api.mailchimp.com/3.0/templates`, {
          method: 'POST',
          headers: {
            'Authorization': `OAuth ${accessToken}`,
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
          edit_url: `https://${dc}.admin.mailchimp.com/templates/edit?id=${template.id}`,
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
