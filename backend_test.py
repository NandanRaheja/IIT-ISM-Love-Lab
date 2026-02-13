#!/usr/bin/env python3

import requests
import sys
import json
import uuid
from datetime import datetime
from typing import Dict, Any

# Configuration
BACKEND_URL = "https://valentine-identity.preview.emergentagent.com/api"

class LovLabAPITester:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = str(uuid.uuid4())
        
        # Test data for campus identity
        self.campus_identity = {
            "batch": "3rd",
            "hostel": "A", 
            "department": "CSE"
        }
        
    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        status = "✅ PASSED" if success else "❌ FAILED"
        print(f"\n{status} - {test_name}")
        if details:
            print(f"   Details: {details}")
        if success:
            self.tests_passed += 1
            
    def test_api_root(self):
        """Test root API endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            success = response.status_code == 200 and "Love Lab" in response.text
            self.log_test("API Root Endpoint", success, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("API Root Endpoint", False, str(e))
            return False
            
    def test_couple_response_submission(self):
        """Test couple response submission"""
        try:
            payload = {
                "session_id": self.session_id,
                "campus_identity": self.campus_identity,
                "mode": "couple",
                "survived": "Mess paneer",
                "story_began": "Library",
                "texts_first": "Me",
                "real_memory": "Late night study sessions together in the library",
                "partner_stress": "Exam pressure and placement anxiety",
                "partner_appreciated": "When I bring them food during long study sessions",
                "partner_needs": "Reassurance",
                "take_for_granted": "Always being there for me",
                "hidden_admiration": "Their determination to succeed despite challenges"
            }
            
            response = requests.post(f"{BACKEND_URL}/responses/couple", 
                                   json=payload, timeout=10)
            success = response.status_code == 200
            if success:
                data = response.json()
                success = data.get("success") == True and data.get("session_id") == self.session_id
                
            self.log_test("Couple Response Submission", success, 
                         f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("Couple Response Submission", False, str(e))
            return False
            
    def test_single_response_submission(self):
        """Test single response submission"""
        try:
            single_session_id = str(uuid.uuid4())
            payload = {
                "session_id": single_session_id,
                "campus_identity": self.campus_identity,
                "mode": "single",
                "stress_most": "Upcoming placements and academic pressure",
                "feel_appreciated": "When friends acknowledge my efforts",
                "need_more": "Understanding",
                "relationship_goal": "Finding someone who supports my ambitions",
                "ideal_partner_trait": "Emotional intelligence and kindness"
            }
            
            response = requests.post(f"{BACKEND_URL}/responses/single", 
                                   json=payload, timeout=10)
            success = response.status_code == 200
            if success:
                data = response.json()
                success = data.get("success") == True and data.get("session_id") == single_session_id
                
            self.log_test("Single Response Submission", success, 
                         f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("Single Response Submission", False, str(e))
            return False
            
    def test_couple_insights_generation(self):
        """Test AI insight generation for couple mode"""
        try:
            payload = {
                "session_id": self.session_id,
                "mode": "couple"
            }
            
            response = requests.post(f"{BACKEND_URL}/generate-insights", 
                                   json=payload, timeout=30)  # Increased timeout for AI generation
            success = response.status_code == 200
            
            if success:
                data = response.json()
                required_fields = ["perception_score", "relationship_type", "got_right", 
                                 "misread", "insights", "semester_needs", 
                                 "hidden_admiration_reveal", "alumni_letter_2035", "sentence_to_say"]
                
                missing_fields = [field for field in required_fields if field not in data]
                success = len(missing_fields) == 0
                
                if not success:
                    self.log_test("Couple Insights Generation", False, 
                                f"Missing fields: {missing_fields}")
                else:
                    self.log_test("Couple Insights Generation", True, 
                                f"Generated with score: {data.get('perception_score')}%")
            else:
                self.log_test("Couple Insights Generation", False, 
                            f"Status: {response.status_code}, Response: {response.text[:200]}")
            return success
        except Exception as e:
            self.log_test("Couple Insights Generation", False, str(e))
            return False
            
    def test_leaderboards(self):
        """Test leaderboards endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/leaderboards", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                required_fields = ["batch_stats", "hostel_stats", "department_stats", "total_participants"]
                missing_fields = [field for field in required_fields if field not in data]
                success = len(missing_fields) == 0
                
                self.log_test("Leaderboards", success, 
                            f"Total participants: {data.get('total_participants', 0)}")
            else:
                self.log_test("Leaderboards", False, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("Leaderboards", False, str(e))
            return False
            
    def test_confession_submission(self):
        """Test confession submission"""
        try:
            payload = {
                "text": "I have a secret crush on someone in my batch but never got the courage to say it.",
                "campus_identity": self.campus_identity
            }
            
            response = requests.post(f"{BACKEND_URL}/confessions", 
                                   json=payload, timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = data.get("success") == True and "id" in data
                
            self.log_test("Confession Submission", success, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("Confession Submission", False, str(e))
            return False
            
    def test_confession_profanity_filter(self):
        """Test confession profanity filter"""
        try:
            payload = {
                "text": "This is a fucking test confession with bad words.",
                "campus_identity": self.campus_identity
            }
            
            response = requests.post(f"{BACKEND_URL}/confessions", 
                                   json=payload, timeout=10)
            # Should return 400 for inappropriate content
            success = response.status_code == 400
            
            self.log_test("Confession Profanity Filter", success, 
                        f"Status: {response.status_code} (should be 400)")
            return success
        except Exception as e:
            self.log_test("Confession Profanity Filter", False, str(e))
            return False
            
    def test_get_confessions(self):
        """Test getting confessions list"""
        try:
            response = requests.get(f"{BACKEND_URL}/confessions", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = "confessions" in data and isinstance(data["confessions"], list)
                
            self.log_test("Get Confessions", success, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("Get Confessions", False, str(e))
            return False
            
    def test_wordcloud(self):
        """Test wordcloud endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/wordcloud", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = "words" in data and isinstance(data["words"], list)
                
            self.log_test("Wordcloud", success, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("Wordcloud", False, str(e))
            return False
            
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting IIT(ISM) Love Lab API Tests...")
        print(f"🎯 Backend URL: {BACKEND_URL}")
        print(f"🆔 Session ID: {self.session_id}")
        print("="*60)
        
        # Test basic connectivity first
        if not self.test_api_root():
            print("\n❌ API connectivity failed. Stopping tests.")
            return False
            
        # Run core functionality tests
        self.test_couple_response_submission()
        self.test_single_response_submission()
        self.test_couple_insights_generation()
        self.test_leaderboards()
        self.test_confession_submission()
        self.test_confession_profanity_filter()
        self.test_get_confessions()
        self.test_wordcloud()
        
        # Final summary
        print("\n" + "="*60)
        print(f"📊 TEST SUMMARY")
        print(f"   Total Tests: {self.tests_run}")
        print(f"   Passed: {self.tests_passed}")
        print(f"   Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("\n🎉 All tests passed! Backend is ready for frontend integration.")
            return True
        else:
            print(f"\n⚠️  {self.tests_run - self.tests_passed} tests failed. Check backend issues.")
            return False

def main():
    tester = LovLabAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())