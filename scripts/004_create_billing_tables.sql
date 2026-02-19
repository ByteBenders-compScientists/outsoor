-- Create billing and credits tracking tables
CREATE TABLE IF NOT EXISTS user_credits (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_spent DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_topped_up DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS credit_transactions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('topup', 'usage', 'refund')),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    reference_id VARCHAR(255), -- For payment processor reference
    status VARCHAR(20) NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usage_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_type VARCHAR(50) NOT NULL, -- 'chat', 'api_call', etc.
    tokens_used INTEGER,
    cost DECIMAL(8,4) NOT NULL,
    model_used VARCHAR(100),
    request_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON credit_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON usage_logs(created_at);

-- Function to update user credits balance
CREATE OR REPLACE FUNCTION update_user_credits_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.type = 'topup' THEN
        UPDATE user_credits 
        SET balance = balance + NEW.amount,
            total_topped_up = total_topped_up + NEW.amount,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = NEW.user_id;
    ELSIF NEW.type = 'usage' THEN
        UPDATE user_credits 
        SET balance = balance - NEW.amount,
            total_spent = total_spent + NEW.amount,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update balance
DROP TRIGGER IF EXISTS trigger_update_credits_balance ON credit_transactions;
CREATE TRIGGER trigger_update_credits_balance
    AFTER INSERT ON credit_transactions
    FOR EACH ROW
    WHEN (NEW.status = 'completed')
    EXECUTE FUNCTION update_user_credits_balance();
