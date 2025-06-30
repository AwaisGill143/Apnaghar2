-- Create database schema for Apna Ghar Real Estate Platform

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    cnic VARCHAR(15) UNIQUE,
    father_name VARCHAR(255),
    date_of_birth DATE,
    address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(10),
    occupation VARCHAR(255),
    monthly_income_range VARCHAR(50),
    kyc_status VARCHAR(20) DEFAULT 'pending',
    kyc_documents JSONB,
    shariah_compliant_only BOOLEAN DEFAULT false,
    notification_preferences JSONB DEFAULT '{"email": true, "sms": true, "push": true}',
    language_preference VARCHAR(5) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Properties table
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    title_ur VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    location_ur VARCHAR(255),
    description TEXT,
    description_ur TEXT,
    developer VARCHAR(255),
    property_type VARCHAR(100),
    completion_date DATE,
    total_value DECIMAL(15,2) NOT NULL,
    minimum_investment DECIMAL(12,2) NOT NULL,
    expected_rental_yield DECIMAL(5,2) NOT NULL,
    investment_duration_years INTEGER NOT NULL,
    total_units INTEGER NOT NULL,
    units_sold INTEGER DEFAULT 0,
    funding_percentage DECIMAL(5,2) GENERATED ALWAYS AS ((units_sold::DECIMAL / total_units) * 100) STORED,
    status VARCHAR(50) DEFAULT 'funding',
    images JSONB,
    features JSONB,
    location_details JSONB,
    market_data JSONB,
    legal_approvals JSONB,
    shariah_compliant BOOLEAN DEFAULT false,
    shariah_certificate_url VARCHAR(500),
    profit_sharing_ratio DECIMAL(5,2), -- For Shariah compliance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Investments table
CREATE TABLE investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    investment_amount DECIMAL(12,2) NOT NULL,
    units_purchased INTEGER NOT NULL,
    investment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    payment_method VARCHAR(50),
    payment_details JSONB,
    status VARCHAR(50) DEFAULT 'active',
    shariah_compliant BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rental payments table
CREATE TABLE rental_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investment_id UUID REFERENCES investments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_month DATE NOT NULL,
    payment_type VARCHAR(50) DEFAULT 'rental', -- 'rental' or 'profit_share' for Shariah
    status VARCHAR(50) DEFAULT 'paid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shariah board table
CREATE TABLE shariah_board (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    name_ur VARCHAR(255),
    title VARCHAR(255),
    title_ur VARCHAR(255),
    qualifications TEXT,
    qualifications_ur TEXT,
    photo_url VARCHAR(500),
    bio TEXT,
    bio_ur TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shariah compliance table
CREATE TABLE shariah_compliance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    compliance_certificate_url VARCHAR(500),
    board_approval_date DATE,
    compliance_details JSONB,
    profit_sharing_mechanism TEXT,
    risk_sharing_details TEXT,
    renewal_date DATE,
    status VARCHAR(50) DEFAULT 'approved',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    title_ur VARCHAR(255),
    message TEXT NOT NULL,
    message_ur TEXT,
    type VARCHAR(50) NOT NULL, -- 'investment', 'payment', 'kyc', 'general'
    data JSONB,
    read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Push notification subscriptions
CREATE TABLE push_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    user_agent TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_cnic ON users(cnic);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_shariah ON properties(shariah_compliant);
CREATE INDEX idx_investments_user ON investments(user_id);
CREATE INDEX idx_investments_property ON investments(property_id);
CREATE INDEX idx_rental_payments_user ON rental_payments(user_id);
CREATE INDEX idx_rental_payments_date ON rental_payments(payment_date);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- Insert sample Shariah board members
INSERT INTO shariah_board (name, name_ur, title, title_ur, qualifications, qualifications_ur, bio, bio_ur) VALUES
('Dr. Muhammad Imran Ashraf Usmani', 'ڈاکٹر محمد عمران اشرف عثمانی', 'Chairman Shariah Board', 'چیئرمین شریعہ بورڈ', 'PhD Islamic Finance, Jamia Darul Uloom Karachi', 'پی ایچ ڈی اسلامی فنانس، جامعہ دارالعلوم کراچی', 'Leading Islamic finance scholar with 20+ years experience', 'اسلامی فنانس کے معروف عالم، 20+ سال کا تجربہ'),
('Mufti Taqi Usmani', 'مفتی تقی عثمانی', 'Senior Shariah Advisor', 'سینئر شریعہ مشیر', 'Grand Mufti, Islamic Finance Expert', 'گرینڈ مفتی، اسلامی فنانس کے ماہر', 'Renowned Islamic scholar and finance expert', 'مشہور اسلامی عالم اور فنانس کے ماہر'),
('Dr. Mabid Ali Al-Jarhi', 'ڈاکٹر عابد علی الجارحی', 'Shariah Advisor', 'شریعہ مشیر', 'PhD Economics, Islamic Banking Expert', 'پی ایچ ڈی اکنامکس، اسلامی بینکنگ کے ماہر', 'International expert in Islamic economics', 'اسلامی اکنامکس کے بین الاقوامی ماہر');
