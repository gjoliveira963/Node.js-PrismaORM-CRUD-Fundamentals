CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  NAME       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  age        INT,
  balance    FLOAT DEFAULT 0.0,
  is_active  BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
