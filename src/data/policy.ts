// ============================================================
// BUNCH & CO. — Returns and Refund Policy Configuration
// Clearly editable policy fields for the store owner.
// Set to null / undefined until exact terms are confirmed.
// ============================================================

export interface PolicyTerms {
  /** Return window period, e.g. "7 days from delivery" (null until configured) */
  returnWindowDays: string | null;

  /** Refund processing timeline, e.g. "5 to 7 business days" (null until configured) */
  refundProcessingDays: string | null;

  /** Return shipping responsibility, e.g. "Free pickup" or "Self-ship" (null until configured) */
  returnShippingFee: string | null;

  /** Product condition requirements, e.g. "Original tags and packaging" (null until configured) */
  conditionRequirements: string | null;

  /** Official WhatsApp contact number */
  supportWhatsAppNumber: string;

  /** Pre-filled WhatsApp return/refund assistance message */
  defaultWhatsAppMessage: string;
}

export const CURRENT_POLICY_TERMS: PolicyTerms = {
  returnWindowDays: null, // Editable: e.g. '7 days'
  refundProcessingDays: null, // Editable: e.g. '5-7 business days'
  returnShippingFee: null, // Editable: e.g. 'Free pickup where serviceable'
  conditionRequirements: null, // Editable: e.g. 'Unused with original packaging'
  supportWhatsAppNumber: '918921267174',
  defaultWhatsAppMessage: 'Hi BUNCH & CO.! I need assistance with a return or refund request.',
};

export const COD_TERMS = {
  isAvailable: true,
  description: 'Cash on Delivery (COD) is available. Pay cash when your order arrives at your address.',
};
