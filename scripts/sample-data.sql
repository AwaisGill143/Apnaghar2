-- Insert sample properties data
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
    '["https://example.com/image1.jpg", "https://example.com/image2.jpg"]',
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
    '["https://example.com/villa1.jpg", "https://example.com/villa2.jpg"]',
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
    '["https://example.com/bahria1.jpg", "https://example.com/bahria2.jpg"]',
    '["Sea View", "Swimming Pool", "Gym", "Shopping Mall", "24/7 Security", "Parking", "Generator Backup"]',
    '{"address": "Bahria Town, Karachi", "nearby": ["Bahria Icon Tower", "Bahria Golf Club"], "transport": ["Jinnah Airport - 25km", "Sea View - 5km"]}',
    '{"appreciation": "10% annually", "occupancy": "88%", "rental_demand": "High"}',
    '["Sindh Building Control Authority Approved", "Environmental NOC"]'
);

-- Insert sample users
INSERT INTO users (
    email, phone, full_name, cnic, father_name, city, 
    kyc_status, shariah_compliant_only, language_preference
) VALUES
('ahmed.khan@email.com', '03001234567', 'Ahmed Khan', '42101-1234567-1', 'Muhammad Khan', 'Karachi', 'approved', true, 'ur'),
('fatima.ali@email.com', '03009876543', 'Fatima Ali', '42201-9876543-2', 'Ali Ahmad', 'Lahore', 'approved', false, 'en'),
('hassan.shah@email.com', '03007654321', 'Hassan Shah', '61101-7654321-3', 'Shah Muhammad', 'Islamabad', 'pending', true, 'ur');

-- Insert sample investments
INSERT INTO investments (user_id, property_id, investment_amount, units_purchased, payment_method, shariah_compliant)
SELECT 
    u.id, p.id, 300000, 2, 'jazzcash', true
FROM users u, properties p 
WHERE u.email = 'ahmed.khan@email.com' AND p.title = 'Centaurus Mall Residency';

-- Insert sample rental payments
INSERT INTO rental_payments (investment_id, user_id, property_id, amount, payment_date, payment_month, payment_type)
SELECT 
    i.id, i.user_id, i.property_id, 18000, '2024-01-15', '2024-01-01', 'profit_share'
FROM investments i
JOIN users u ON i.user_id = u.id
WHERE u.email = 'ahmed.khan@email.com';
