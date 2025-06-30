import { supabaseAdmin } from "@/lib/supabase-server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Create tables if they don't exist
    const createTablesSQL = `
      -- Create users table
      CREATE TABLE IF NOT EXISTS users (
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

      -- Create properties table
      CREATE TABLE IF NOT EXISTS properties (
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
        profit_sharing_ratio DECIMAL(5,2),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create investments table
      CREATE TABLE IF NOT EXISTS investments (
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

      -- Create rental_payments table
      CREATE TABLE IF NOT EXISTS rental_payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        investment_id UUID REFERENCES investments(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
        amount DECIMAL(10,2) NOT NULL,
        payment_date DATE NOT NULL,
        payment_month DATE NOT NULL,
        payment_type VARCHAR(50) DEFAULT 'rental',
        status VARCHAR(50) DEFAULT 'paid',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create shariah_board table
      CREATE TABLE IF NOT EXISTS shariah_board (
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

      -- Create shariah_compliance table
      CREATE TABLE IF NOT EXISTS shariah_compliance (
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

      -- Create notifications table
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        title_ur VARCHAR(255),
        message TEXT NOT NULL,
        message_ur TEXT,
        type VARCHAR(50) NOT NULL,
        data JSONB,
        read BOOLEAN DEFAULT false,
        sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create push_subscriptions table
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        endpoint TEXT NOT NULL,
        p256dh TEXT NOT NULL,
        auth TEXT NOT NULL,
        user_agent TEXT,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    const { error: createError } = await supabaseAdmin.rpc("exec_sql", { sql: createTablesSQL })

    if (createError) {
      console.error("Error creating tables:", createError)
      return NextResponse.json({ error: "Failed to create tables" }, { status: 500 })
    }

    // Insert sample data
    const sampleDataSQL = `
      -- Insert sample Shariah board members
      INSERT INTO shariah_board (name, name_ur, title, title_ur, qualifications, qualifications_ur, bio, bio_ur) 
      VALUES
      ('Dr. Muhammad Imran Ashraf Usmani', 'ڈاکٹر محمد عمران اشرف عثمانی', 'Chairman Shariah Board', 'چیئرمین شریعہ بورڈ', 'PhD Islamic Finance, Jamia Darul Uloom Karachi', 'پی ایچ ڈی اسلامی فنانس، جامعہ دارالعلوم کراچی', 'Leading Islamic finance scholar with 20+ years experience', 'اسلامی فنانس کے معروف عالم، 20+ سال کا تجربہ'),
      ('Mufti Taqi Usmani', 'مفتی تقی عثمانی', 'Senior Shariah Advisor', 'سینئر شریعہ مشیر', 'Grand Mufti, Islamic Finance Expert', 'گرینڈ مفتی، اسلامی فنانس کے ماہر', 'Renowned Islamic scholar and finance expert', 'مشہور اسلامی عالم اور فنانس کے ماہر'),
      ('Dr. Mabid Ali Al-Jarhi', 'ڈاکٹر عابد علی الجارحی', 'Shariah Advisor', 'شریعہ مشیر', 'PhD Economics, Islamic Banking Expert', 'پی ایچ ڈی اکنامکس، اسلامی بینکنگ کے ماہر', 'International expert in Islamic economics', 'اسلامی اکنامکس کے بین الاقوامی ماہر')
      ON CONFLICT DO NOTHING;

      -- Insert sample properties
      INSERT INTO properties (
        title, title_ur, location, location_ur, description, description_ur,
        developer, property_type, completion_date, total_value, minimum_investment,
        expected_rental_yield, investment_duration_years, total_units,
        status, shariah_compliant, profit_sharing_ratio,
        images, features, location_details, market_data, legal_approvals
      ) VALUES
      (
        'Centaurus Mall Residency', 'سینٹورس مال ریزیڈنسی',
        'F-8 Islamabad', 'ایف-8 اسلام آباد',
        'Premium commercial and residential complex in the heart of Islamabad', 'اسلام آباد کے دل میں پریمیم کمرشل اور رہائشی کمپلیکس',
        'Centaurus Group', 'Mixed-Use Commercial', '2024-06-01',
        45000000, 150000, 14.5, 5, 300,
        'funding', true, 60.0,
        '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"]',
        '["Shopping Mall", "Food Court", "Cinema", "Gym", "24/7 Security", "Parking", "Generator Backup"]',
        '{"address": "F-8 Markaz, Islamabad", "nearby": ["Centaurus Mall", "Jinnah Super Market"], "transport": ["Metro Bus - 300m", "Airport - 15km"]}',
        '{"appreciation": "8.5% annually", "occupancy": "92%", "rental_demand": "High"}',
        '["CDA Approved", "NOC from Environment", "Fire Safety Certificate"]'
      ),
      (
        'DHA Valley Villas', 'ڈی ایچ اے ویلی ولاز',
        'DHA Valley Islamabad', 'ڈی ایچ اے ویلی اسلام آباد',
        'Luxury residential villas in DHA Valley with modern amenities', 'جدید سہولات کے ساتھ ڈی ایچ اے ویلی میں لگژری رہائشی ولاز',
        'DHA Islamabad', 'Residential', '2024-03-01',
        35000000, 200000, 16.2, 7, 200,
        'almost_full', true, 65.0,
        '["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400"]',
        '["Private Garden", "Swimming Pool", "Gym", "Community Center", "24/7 Security", "Parking"]',
        '{"address": "DHA Valley, Islamabad", "nearby": ["DHA Club", "Valley School"], "transport": ["Motorway - 2km", "Airport - 20km"]}',
        '{"appreciation": "12% annually", "occupancy": "95%", "rental_demand": "Very High"}',
        '["DHA Approved", "CDA NOC", "Environmental Clearance"]'
      ),
      (
        'Bahria Town Heights', 'بحریہ ٹاؤن ہائٹس',
        'Bahria Town Karachi', 'بحریہ ٹاؤن کراچی',
        'Modern residential towers with sea view in Bahria Town', 'بحریہ ٹاؤن میں سمندری منظر کے ساتھ جدید رہائشی ٹاورز',
        'Bahria Town', 'Residential', '2024-09-01',
        52000000, 125000, 13.9, 5, 400,
        'funding', false, 0,
        '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"]',
        '["Sea View", "Swimming Pool", "Gym", "Shopping Mall", "24/7 Security", "Parking", "Generator Backup"]',
        '{"address": "Bahria Town, Karachi", "nearby": ["Bahria Icon Tower", "Bahria Golf Club"], "transport": ["Jinnah Airport - 25km", "Sea View - 5km"]}',
        '{"appreciation": "10% annually", "occupancy": "88%", "rental_demand": "High"}',
        '["Sindh Building Control Authority Approved", "Environmental NOC"]'
      )
      ON CONFLICT DO NOTHING;
    `

    const { error: dataError } = await supabaseAdmin.rpc("exec_sql", { sql: sampleDataSQL })

    if (dataError) {
      console.error("Error inserting sample data:", dataError)
      return NextResponse.json({ error: "Failed to insert sample data" }, { status: 500 })
    }

    return NextResponse.json({ message: "Database setup completed successfully" })
  } catch (error) {
    console.error("Database setup error:", error)
    return NextResponse.json({ error: "Database setup failed" }, { status: 500 })
  }
}
