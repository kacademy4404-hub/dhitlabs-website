import http.server
import socketserver
import json
import os
import datetime
from urllib.parse import urlparse

PORT = 3000
DATA_DIR = "data"
ENROLLMENTS_FILE = os.path.join(DATA_DIR, "enrollments.json")
CONTACTS_FILE = os.path.join(DATA_DIR, "contacts.json")
SERVICES_FILE = os.path.join(DATA_DIR, "services.json")

os.makedirs(DATA_DIR, exist_ok=True)
for file_path in [ENROLLMENTS_FILE, CONTACTS_FILE, SERVICES_FILE]:
    if not os.path.exists(file_path):
        with open(file_path, 'w') as f:
            json.dump([], f)

def read_json(path):
    try:
        with open(path, 'r') as f:
            return json.load(f)
    except:
        return []

def write_json(path, data):
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        parsed_path = urlparse(self.path)
        
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            body = json.loads(post_data.decode('utf-8'))
        except json.JSONDecodeError:
            self.send_error(400, "Bad Request")
            return
            
        if parsed_path.path == '/api/contact':
            name = body.get('name')
            email = body.get('email')
            message = body.get('message')
            
            if not name or not email or not message:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'success': False, 'message': 'Please fill in all required fields.'}).encode('utf-8'))
                return
                
            contact = {
                'id': str(datetime.datetime.now().timestamp()),
                'name': name,
                'email': email,
                'phone': body.get('phone', 'N/A'),
                'subject': body.get('subject', 'General Inquiry'),
                'message': message,
                'receivedAt': datetime.datetime.now().isoformat(),
                'status': 'unread'
            }
            
            contacts = read_json(CONTACTS_FILE)
            contacts.append(contact)
            write_json(CONTACTS_FILE, contacts)
            
            print(f"New Contact: {name} - {contact['subject']}")
            
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True, 
                'message': f"Thank you, {name}! Your message has been received."
            }).encode('utf-8'))
            
        elif parsed_path.path == '/api/services':
            name = body.get('name')
            email = body.get('email')
            message = body.get('message')
            
            if not name or not email or not message:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'success': False, 'message': 'Please fill in all required fields.'}).encode('utf-8'))
                return
                
            service_inquiry = {
                'id': str(datetime.datetime.now().timestamp()),
                'name': name,
                'email': email,
                'phone': body.get('phone', 'N/A'),
                'service_requested': body.get('subject', 'General Service Inquiry'),
                'message': message,
                'receivedAt': datetime.datetime.now().isoformat(),
                'status': 'pending'
            }
            
            services = read_json(SERVICES_FILE)
            services.append(service_inquiry)
            write_json(SERVICES_FILE, services)
            
            print(f"New Service Inquiry: {name} - {service_inquiry['service_requested']}")
            
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True, 
                'message': f"Thank you, {name}! We have received your service request and will contact you shortly."
            }).encode('utf-8'))

        elif parsed_path.path == '/api/enroll':
            name = body.get('name')
            email = body.get('email')
            phone = body.get('phone')
            course = body.get('course')
            
            if not name or not email or not phone or not course:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'success': False, 'message': 'Please fill in all required fields.'}).encode('utf-8'))
                return
                
            enrollment = {
                'id': str(datetime.datetime.now().timestamp()),
                'name': name,
                'email': email,
                'phone': phone,
                'city': body.get('city', 'N/A'),
                'education': body.get('education', 'N/A'),
                'course': course,
                'message': body.get('message', ''),
                'enrolledAt': datetime.datetime.now().isoformat(),
                'status': 'pending'
            }
            
            enrollments = read_json(ENROLLMENTS_FILE)
            enrollments.append(enrollment)
            write_json(ENROLLMENTS_FILE, enrollments)
            
            print(f"New Enrollment: {name} - {course}")
            
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True, 
                'message': f"Enrollment successful! Welcome to {course}, {name}. We'll contact you shortly."
            }).encode('utf-8'))
            
        else:
            self.send_error(404, "Not Found")

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()
