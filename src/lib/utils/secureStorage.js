/**
 * Secure Storage Utility
 * Provides secure storage for sensitive data with encryption and validation
 */

import { SECURITY_CONFIG, VALIDATION_RULES } from '@/lib/config/environment';

class SecureStorage {
    constructor() {
        this.storageKey = 'trektoo_secure_data';
        this.encryptionKey = this.getEncryptionKey();
    }

    /**
     * Get encryption key from environment or generate one
     */
    getEncryptionKey() {
        // In production, this should come from environment variables
        const envKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
        if (envKey) return envKey;

        // Fallback to a generated key (less secure but better than plain text)
        const fallbackKey = 'trektoo_fallback_key_2024';
        console.warn('Using fallback encryption key. Set NEXT_PUBLIC_ENCRYPTION_KEY for production.');
        return fallbackKey;
    }

    /**
     * Simple encryption (for development - use proper encryption in production)
     */
    encrypt(data) {
        try {
            if (typeof data !== 'string') {
                data = JSON.stringify(data);
            }

            // Simple XOR encryption (replace with proper encryption in production)
            let encrypted = '';
            for (let i = 0; i < data.length; i++) {
                encrypted += String.fromCharCode(
                    data.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length)
                );
            }

            return btoa(encrypted); // Base64 encode
        } catch (error) {
            console.error('Encryption failed:', error);
            return null;
        }
    }

    /**
     * Simple decryption (for development - use proper decryption in production)
     */
    decrypt(encryptedData) {
        try {
            if (!encryptedData) return null;

            // Base64 decode
            const decoded = atob(encryptedData);

            // Simple XOR decryption
            let decrypted = '';
            for (let i = 0; i < decoded.length; i++) {
                decrypted += String.fromCharCode(
                    decoded.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length)
                );
            }

            // Try to parse as JSON, fallback to string
            try {
                return JSON.parse(decrypted);
            } catch {
                return decrypted;
            }
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    }

    /**
     * Store data securely
     */
    setItem(key, value, options = {}) {
        try {
            if (typeof window === 'undefined') return false;

            const dataToStore = {
                value: this.encrypt(value),
                timestamp: Date.now(),
                expiresAt: options.expiresAt || null,
                version: '1.0',
            };

            // Validate data before storing
            if (!this.validateData(key, value)) {
                throw new Error(`Invalid data for key: ${key}`);
            }

            localStorage.setItem(key, JSON.stringify(dataToStore));
            return true;
        } catch (error) {
            console.error(`Failed to store item ${key}:`, error);
            return false;
        }
    }

    /**
     * Retrieve data securely
     */
    getItem(key, defaultValue = null) {
        try {
            if (typeof window === 'undefined') return defaultValue;

            const stored = localStorage.getItem(key);
            if (!stored) return defaultValue;

            const parsed = JSON.parse(stored);

            // Check if data has expired
            if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
                this.removeItem(key);
                return defaultValue;
            }

            // Check version compatibility
            if (parsed.version !== '1.0') {
                console.warn(`Data version mismatch for ${key}. Clearing old data.`);
                this.removeItem(key);
                return defaultValue;
            }

            const decrypted = this.decrypt(parsed.value);
            return decrypted !== null ? decrypted : defaultValue;
        } catch (error) {
            console.error(`Failed to retrieve item ${key}:`, error);
            this.removeItem(key); // Clear corrupted data
            return defaultValue;
        }
    }

    /**
     * Remove item securely
     */
    removeItem(key) {
        try {
            if (typeof window === 'undefined') return false;
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Failed to remove item ${key}:`, error);
            return false;
        }
    }

    /**
     * Clear all secure data
     */
    clear() {
        try {
            if (typeof window === 'undefined') return false;

            // Only clear our secure data, not all localStorage
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('trektoo_') || key === 'authToken' || key === 'authUser') {
                    localStorage.removeItem(key);
                }
            });

            return true;
        } catch (error) {
            console.error('Failed to clear secure storage:', error);
            return false;
        }
    }

    /**
     * Validate data before storing
     */
    validateData(key, value) {
        try {
            // Validate email
            if (key === 'userEmail' && value) {
                return VALIDATION_RULES.EMAIL_REGEX.test(value);
            }

            // Validate phone
            if (key === 'userPhone' && value) {
                return VALIDATION_RULES.PHONE_REGEX.test(value);
            }

            // Validate name
            if (key === 'userName' && value) {
                return VALIDATION_RULES.NAME_REGEX.test(value);
            }

            // Validate token (should be a string and not empty)
            if (key === 'authToken' && value) {
                return typeof value === 'string' && value.length > 0;
            }

            // Validate user object
            if (key === 'authUser' && value) {
                return typeof value === 'object' && value !== null;
            }

            // Default validation - allow most data types
            return value !== undefined && value !== null;
        } catch (error) {
            console.error('Data validation failed:', error);
            return false;
        }
    }

    /**
     * Check if item exists and is valid
     */
    hasItem(key) {
        try {
            if (typeof window === 'undefined') return false;

            const stored = localStorage.getItem(key);
            if (!stored) return false;

            const parsed = JSON.parse(stored);

            // Check if expired
            if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
                this.removeItem(key);
                return false;
            }

            return true;
        } catch (error) {
            console.error(`Failed to check item ${key}:`, error);
            return false;
        }
    }

    /**
     * Get item with TTL (Time To Live)
     */
    setItemWithTTL(key, value, ttlMs) {
        const expiresAt = Date.now() + ttlMs;
        return this.setItem(key, value, { expiresAt });
    }

    /**
     * Get remaining TTL for an item
     */
    getTTL(key) {
        try {
            if (typeof window === 'undefined') return 0;

            const stored = localStorage.getItem(key);
            if (!stored) return 0;

            const parsed = JSON.parse(stored);
            if (!parsed.expiresAt) return Infinity;

            const remaining = parsed.expiresAt - Date.now();
            return Math.max(0, remaining);
        } catch (error) {
            console.error(`Failed to get TTL for ${key}:`, error);
            return 0;
        }
    }

    /**
     * Refresh TTL for an item
     */
    refreshTTL(key, ttlMs) {
        try {
            const value = this.getItem(key);
            if (value !== null) {
                return this.setItemWithTTL(key, value, ttlMs);
            }
            return false;
        } catch (error) {
            console.error(`Failed to refresh TTL for ${key}:`, error);
            return false;
        }
    }

    /**
     * Get storage statistics
     */
    getStats() {
        try {
            if (typeof window === 'undefined') return null;

            const keys = Object.keys(localStorage);
            const secureKeys = keys.filter(key =>
                key.startsWith('trektoo_') || key === 'authToken' || key === 'authUser'
            );

            let totalSize = 0;
            let expiredItems = 0;
            let validItems = 0;

            secureKeys.forEach(key => {
                try {
                    const stored = localStorage.getItem(key);
                    if (stored) {
                        totalSize += stored.length;
                        const parsed = JSON.parse(stored);

                        if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
                            expiredItems++;
                        } else {
                            validItems++;
                        }
                    }
                } catch (error) {
                    console.error(`Error processing key ${key}:`, error);
                }
            });

            return {
                totalKeys: secureKeys.length,
                validItems,
                expiredItems,
                totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
                storageLimit: '5MB', // localStorage limit
            };
        } catch (error) {
            console.error('Failed to get storage stats:', error);
            return null;
        }
    }

    /**
     * Clean up expired items
     */
    cleanup() {
        try {
            if (typeof window === 'undefined') return 0;

            const keys = Object.keys(localStorage);
            const secureKeys = keys.filter(key =>
                key.startsWith('trektoo_') || key === 'authToken' || key === 'authUser'
            );

            let cleanedCount = 0;

            secureKeys.forEach(key => {
                try {
                    const stored = localStorage.getItem(key);
                    if (stored) {
                        const parsed = JSON.parse(stored);

                        if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
                            localStorage.removeItem(key);
                            cleanedCount++;
                        }
                    }
                } catch (error) {
                    // Remove corrupted data
                    localStorage.removeItem(key);
                    cleanedCount++;
                }
            });

            if (cleanedCount > 0) {
                console.log(`Cleaned up ${cleanedCount} expired/corrupted items`);
            }

            return cleanedCount;
        } catch (error) {
            console.error('Failed to cleanup storage:', error);
            return 0;
        }
    }
}

// Create singleton instance
const secureStorage = new SecureStorage();

// Auto-cleanup on page load
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        secureStorage.cleanup();
    });
}

export default secureStorage;
