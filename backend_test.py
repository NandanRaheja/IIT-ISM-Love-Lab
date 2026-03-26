import requests
import sys
import json
from datetime import datetime

class DeployrAITester:
    def __init__(self, base_url="https://workflow-results.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:300]}")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:300]
                })

            return success, response.json() if success and response.text else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after {timeout}s")
            self.failed_tests.append({'name': name, 'error': 'Timeout'})
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({'name': name, 'error': str(e)})
            return False, {}

    def test_health_endpoints(self):
        """Test health check endpoints"""
        print("\n=== HEALTH CHECK TESTS ===")
        
        # Test root endpoint
        self.run_test("Root Endpoint", "GET", "", 200)
        
        # Test health endpoint
        self.run_test("Health Check", "GET", "health", 200)

    def test_agents_endpoint(self):
        """Test the AI agents generation endpoint"""
        print("\n=== AGENTS ENDPOINT TESTS ===")
        
        # Test with valid data
        test_data = {
            "niche": "AI automation",
            "platform": "YouTube",
            "goal": "grow",
            "content_type": "short-form video"
        }
        
        success, response = self.run_test(
            "Generate AI Content", 
            "POST", 
            "agents/generate", 
            200, 
            data=test_data,
            timeout=60  # AI calls can take longer
        )
        
        if success:
            # Validate response structure
            required_fields = ['id', 'trends', 'content_ideas', 'hooks', 'script', 'strategy', 'timestamp']
            missing_fields = [field for field in required_fields if field not in response]
            
            if missing_fields:
                print(f"⚠️  Warning: Missing fields in response: {missing_fields}")
            else:
                print("✅ Response structure is valid")
                
            # Check if arrays have content
            if response.get('trends') and len(response['trends']) > 0:
                print(f"✅ Trends generated: {len(response['trends'])} items")
            else:
                print("⚠️  Warning: No trends generated")
                
            if response.get('content_ideas') and len(response['content_ideas']) > 0:
                print(f"✅ Content ideas generated: {len(response['content_ideas'])} items")
            else:
                print("⚠️  Warning: No content ideas generated")

    def test_waitlist_endpoints(self):
        """Test waitlist functionality"""
        print("\n=== WAITLIST ENDPOINT TESTS ===")
        
        # Test waitlist count
        self.run_test("Get Waitlist Count", "GET", "waitlist/count", 200)
        
        # Test joining waitlist
        test_entry = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "content_type": "AI videos",
            "platform": "YouTube",
            "goal": "grow"
        }
        
        success, response = self.run_test(
            "Join Waitlist", 
            "POST", 
            "waitlist", 
            200, 
            data=test_entry
        )
        
        if success:
            # Validate response structure
            required_fields = ['id', 'name', 'email', 'content_type', 'goal', 'timestamp']
            missing_fields = [field for field in required_fields if field not in response]
            
            if missing_fields:
                print(f"⚠️  Warning: Missing fields in waitlist response: {missing_fields}")
            else:
                print("✅ Waitlist response structure is valid")

def main():
    print("🚀 Starting DeployrAI Backend API Tests")
    print("=" * 50)
    
    # Setup
    tester = DeployrAITester()
    
    # Run all tests
    tester.test_health_endpoints()
    tester.test_agents_endpoint()
    tester.test_waitlist_endpoints()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 FINAL RESULTS")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests:")
        for test in tester.failed_tests:
            error_msg = test.get('error', f"Expected {test.get('expected')}, got {test.get('actual')}")
            print(f"  - {test['name']}: {error_msg}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())