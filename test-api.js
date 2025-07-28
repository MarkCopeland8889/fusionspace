// Simple test script to verify API endpoints
const fetch = require('node-fetch');

async function testAPI() {
  console.log('🧪 Testing AI Website Builder API...\n');

  try {
    // Test the API endpoint
    const response = await fetch('http://localhost:3000/api/generate', {
      method: 'GET'
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API is running successfully!');
      console.log('📊 API Info:', data);
    } else {
      console.log('❌ API returned error:', response.status);
    }
  } catch (error) {
    console.log('❌ Could not connect to API:', error.message);
    console.log('💡 Make sure the development server is running: npm run dev');
  }

  console.log('\n🎯 Next steps:');
  console.log('1. Visit http://localhost:3000');
  console.log('2. Add your Gemini API key to .env.local');
  console.log('3. Test website generation!');
}

testAPI(); 