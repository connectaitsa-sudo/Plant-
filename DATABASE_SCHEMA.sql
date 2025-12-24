-- PlantCure Database Schema
-- For Professional & Enterprise Users with NVIDIA Jetson Integration

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active', -- active, suspended, deleted
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE
);

-- Subscriptions Table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL, -- starter, professional, enterprise
  status VARCHAR(20) NOT NULL, -- active, cancelled, expired, trial
  billing_cycle VARCHAR(20) NOT NULL, -- monthly, yearly
  price_paid DECIMAL(10,2) NOT NULL,
  setup_fee_paid DECIMAL(10,2) DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  auto_renew BOOLEAN DEFAULT TRUE,
  features JSONB, -- Store plan-specific features
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Devices Table (NVIDIA Jetson Nano/Xavier)
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_name VARCHAR(255) NOT NULL,
  device_type VARCHAR(50) NOT NULL, -- jetson_nano, jetson_xavier, jetson_orin, camera, drone
  hardware_id VARCHAR(255) UNIQUE NOT NULL, -- MAC address or serial number
  status VARCHAR(20) DEFAULT 'offline', -- online, offline, maintenance, error
  location_name VARCHAR(255),
  gps_latitude DECIMAL(10,8),
  gps_longitude DECIMAL(11,8),
  firmware_version VARCHAR(50),
  last_seen TIMESTAMP,
  total_uptime_hours DECIMAL(10,2) DEFAULT 0,
  config JSONB, -- Device-specific configuration
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Camera Streams Table
CREATE TABLE camera_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  stream_url VARCHAR(500),
  stream_type VARCHAR(20), -- rtsp, rtmp, hls, webrtc
  resolution VARCHAR(20), -- 1080p, 4K, etc.
  fps INTEGER DEFAULT 30,
  is_recording BOOLEAN DEFAULT FALSE,
  storage_path VARCHAR(500),
  bandwidth_mbps DECIMAL(6,2),
  status VARCHAR(20) DEFAULT 'inactive', -- active, inactive, error
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Disease Detections Table
CREATE TABLE disease_detections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_id UUID REFERENCES devices(id) ON DELETE SET NULL,
  image_url VARCHAR(500),
  plant_name VARCHAR(255),
  disease_name VARCHAR(255) NOT NULL,
  confidence_score DECIMAL(5,2) NOT NULL, -- 0.00 to 100.00
  severity VARCHAR(20), -- low, medium, high
  gps_latitude DECIMAL(10,8),
  gps_longitude DECIMAL(11,8),
  location_name VARCHAR(255),
  analysis_data JSONB, -- Full AI response (symptoms, treatment, etc.)
  detection_source VARCHAR(50), -- manual_upload, live_camera, drone_scan
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alerts Table
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  detection_id UUID REFERENCES disease_detections(id) ON DELETE CASCADE,
  device_id UUID REFERENCES devices(id) ON DELETE SET NULL,
  alert_type VARCHAR(50) NOT NULL, -- disease_detected, device_offline, threshold_exceeded
  severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new', -- new, acknowledged, treated, resolved, ignored
  notification_sent BOOLEAN DEFAULT FALSE,
  notification_channels JSONB, -- {email: true, sms: false, push: true}
  acknowledged_at TIMESTAMP,
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Treatments Table
CREATE TABLE treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  detection_id UUID REFERENCES disease_detections(id) ON DELETE CASCADE,
  treatment_type VARCHAR(50), -- organic, chemical, integrated
  treatment_steps JSONB, -- Array of treatment steps taken
  products_used JSONB, -- Array of products/chemicals used
  cost DECIMAL(10,2),
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'ongoing', -- planned, ongoing, completed, abandoned
  notes TEXT,
  effectiveness_rating INTEGER, -- 1-5 stars
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics/Stats Table
CREATE TABLE analytics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_images_analyzed INTEGER DEFAULT 0,
  diseases_detected INTEGER DEFAULT 0,
  healthy_plants INTEGER DEFAULT 0,
  alerts_generated INTEGER DEFAULT 0,
  devices_active INTEGER DEFAULT 0,
  uptime_percentage DECIMAL(5,2),
  area_monitored_acres DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, date)
);

-- API Keys Table
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_name VARCHAR(255) NOT NULL,
  api_key VARCHAR(255) UNIQUE NOT NULL,
  permissions JSONB, -- {read: true, write: false, delete: false}
  usage_count INTEGER DEFAULT 0,
  usage_limit INTEGER, -- NULL for unlimited
  rate_limit_per_hour INTEGER DEFAULT 100,
  last_used_at TIMESTAMP,
  expires_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active', -- active, revoked, expired
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Device Logs Table (for debugging)
CREATE TABLE device_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  log_level VARCHAR(20), -- info, warning, error, critical
  message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50), -- alert, info, success, warning, error
  channel VARCHAR(20), -- email, sms, push, in_app
  status VARCHAR(20) DEFAULT 'pending', -- pending, sent, delivered, failed
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Billing/Invoices Table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_method VARCHAR(50),
  payment_date TIMESTAMP,
  due_date DATE NOT NULL,
  invoice_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_subscriptions_user_status ON subscriptions(user_id, status);
CREATE INDEX idx_devices_user_status ON devices(user_id, status);
CREATE INDEX idx_detections_user_date ON disease_detections(user_id, detected_at);
CREATE INDEX idx_alerts_user_status ON alerts(user_id, status, created_at);
CREATE INDEX idx_treatments_user ON treatments(user_id);
CREATE INDEX idx_analytics_user_date ON analytics_daily(user_id, date);
CREATE INDEX idx_api_keys_user ON api_keys(user_id, status);
CREATE INDEX idx_device_logs_device ON device_logs(device_id, created_at);
CREATE INDEX idx_notifications_user ON notifications(user_id, status);
CREATE INDEX idx_invoices_user ON invoices(user_id, status);

-- Create Views for Common Queries

-- Active Devices View
CREATE VIEW active_devices AS
SELECT 
  d.*,
  u.email as user_email,
  u.full_name as user_name,
  s.plan_type
FROM devices d
JOIN users u ON d.user_id = u.id
LEFT JOIN subscriptions s ON u.id = s.user_id AND s.status = 'active'
WHERE d.status = 'online';

-- Recent Alerts View
CREATE VIEW recent_alerts AS
SELECT 
  a.*,
  d.disease_name,
  d.plant_name,
  d.gps_latitude,
  d.gps_longitude,
  d.location_name,
  dev.device_name
FROM alerts a
JOIN disease_detections d ON a.detection_id = d.id
LEFT JOIN devices dev ON a.device_id = dev.id
WHERE a.status IN ('new', 'acknowledged')
ORDER BY a.created_at DESC;

-- User Dashboard Stats View
CREATE VIEW user_dashboard_stats AS
SELECT 
  u.id as user_id,
  COUNT(DISTINCT d.id) as total_devices,
  COUNT(DISTINCT CASE WHEN d.status = 'online' THEN d.id END) as active_devices,
  COUNT(DISTINCT dd.id) FILTER (WHERE dd.detected_at >= CURRENT_DATE) as todays_detections,
  COUNT(DISTINCT a.id) FILTER (WHERE a.created_at >= CURRENT_DATE AND a.status = 'new') as todays_alerts
FROM users u
LEFT JOIN devices d ON u.id = d.user_id
LEFT JOIN disease_detections dd ON u.id = dd.user_id
LEFT JOIN alerts a ON u.id = a.user_id
GROUP BY u.id;
