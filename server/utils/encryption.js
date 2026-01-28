const crypto = require('crypto');

// In production, this should be stored securely and rotated regularly
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const ALGORITHM = 'aes-256-gcm';

/**
 * Encrypt a message
 */
function encryptMessage(text) {
  try {
    if (!text || typeof text !== 'string') {
      return '';
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY);
    cipher.setAAD(Buffer.from('aura-chatbot', 'utf8'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    // Combine iv, authTag, and encrypted data
    const combined = iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
    
    return combined;
  } catch (error) {
    console.error('Encryption error:', error);
    return text; // Return original text if encryption fails
  }
}

/**
 * Decrypt a message
 */
function decryptMessage(encryptedText) {
  try {
    if (!encryptedText || typeof encryptedText !== 'string') {
      return '';
    }

    const parts = encryptedText.split(':');
    if (parts.length !== 3) {
      return encryptedText; // Return as-is if not properly formatted
    }

    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];

    const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY);
    decipher.setAAD(Buffer.from('aura-chatbot', 'utf8'));
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedText; // Return encrypted text if decryption fails
  }
}

/**
 * Generate a secure session ID
 */
function generateSecureSessionId() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hash sensitive data (one-way)
 */
function hashData(data) {
  if (!data || typeof data !== 'string') {
    return '';
  }
  
  return crypto
    .createHash('sha256')
    .update(data + ENCRYPTION_KEY)
    .digest('hex');
}

/**
 * Generate a secure random token
 */
function generateSecureToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Verify data integrity
 */
function verifyIntegrity(data, hash) {
  if (!data || !hash) {
    return false;
  }
  
  const computedHash = hashData(data);
  return crypto.timingSafeEqual(
    Buffer.from(computedHash, 'hex'),
    Buffer.from(hash, 'hex')
  );
}

module.exports = {
  encryptMessage,
  decryptMessage,
  generateSecureSessionId,
  hashData,
  generateSecureToken,
  verifyIntegrity,
};