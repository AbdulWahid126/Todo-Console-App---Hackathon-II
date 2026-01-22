#!/usr/bin/env python3
"""
Test script for dashboard API endpoints
Task: P2-T-XXX
"""

import requests
import sys

BASE_URL = "http://localhost:8000/api/v1"

def test_dashboard_stats():
    """Test the dashboard stats endpoint"""
    print("Testing dashboard stats endpoint...")
    response = requests.get(f"{BASE_URL}/dashboard/stats")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {data}")
        print("✓ Stats endpoint working correctly")
    else:
        print(f"✗ Stats endpoint failed with status {response.status_code}")

def test_dashboard_analytics():
    """Test the dashboard analytics endpoint"""
    print("\nTesting dashboard analytics endpoint...")
    response = requests.get(f"{BASE_URL}/dashboard/analytics")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {len(data)} keys received")
        print("✓ Analytics endpoint working correctly")
    else:
        print(f"✗ Analytics endpoint failed with status {response.status_code}")

def test_dashboard_recent_tasks():
    """Test the dashboard recent tasks endpoint"""
    print("\nTesting dashboard recent tasks endpoint...")
    response = requests.get(f"{BASE_URL}/dashboard/recent-tasks")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {len(data)} tasks received")
        print("✓ Recent tasks endpoint working correctly")
    else:
        print(f"✗ Recent tasks endpoint failed with status {response.status_code}")

if __name__ == "__main__":
    print("Testing Dashboard API Endpoints\n")

    # Check if the server is running first
    try:
        health_response = requests.get("http://localhost:8000/health")
        if health_response.status_code != 200:
            print("✗ Server is not running. Please start the backend server first.")
            sys.exit(1)
        else:
            print("✓ Server is running\n")
    except requests.exceptions.ConnectionError:
        print("✗ Server is not running. Please start the backend server first.")
        sys.exit(1)

    test_dashboard_stats()
    test_dashboard_analytics()
    test_dashboard_recent_tasks()

    print("\nDashboard API tests completed!")