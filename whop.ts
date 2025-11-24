import { WhopUser } from '../types';

/**
 * ⚡ WHOP FAST INTEGRATION
 * 
 * Instructions:
 * 1. Run: npm install @whop-apps/sdk
 * 2. Uncomment the import below.
 * 3. Set your PRODUCT_PATH.
 */

// import { WhopSDK } from '@whop-apps/sdk';

// 👇 CONFIGURATION
const PRODUCT_PATH = 'checkout/your-product-link'; 

export const WhopService = {
  
  async validateLicense(): Promise<boolean> {
    // --- [PROD] UNCOMMENT THIS TO ENABLE ---
    /*
    try {
      if (window.self === window.top) return false; // Ensure iframe
      return await WhopSDK.app.hasAccess();
    } catch (e) {
      console.error("Whop SDK Error:", e);
      return false;
    }
    */
    
    // --- DEV MODE (DEFAULT) ---
    return localStorage.getItem('whop_mock_status') === 'true';
  },

  async getUser(): Promise<WhopUser | null> {
    // --- [PROD] UNCOMMENT THIS TO ENABLE ---
    /*
    try {
      const u = await WhopSDK.user.profile();
      return { id: u.id, username: u.username, profilePicUrl: u.profilePicUrl };
    } catch (e) { return null; }
    */

    // --- DEV MODE ---
    return { id: 'dev', username: 'Guest User', experience: 'casual' };
  },

  openCheckout() {
    const url = `https://whop.com/${PRODUCT_PATH}`;
    
    // --- [PROD] UNCOMMENT THIS ---
    // WhopSDK.app.openExternalUrl({ url });

    // --- DEV MODE ---
    window.open(url, '_blank');
  },

  // Helper to toggle state in sidebar
  toggleSimulation(isActive: boolean) {
    localStorage.setItem('whop_mock_status', String(isActive));
  }
};