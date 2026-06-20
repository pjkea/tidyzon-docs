export interface SearchEntry {
  title: string
  method?: string
  path?: string
  description?: string
  href: string
}

export const searchIndex: SearchEntry[] = [
  { title: 'Quickstart', href: '/', description: 'Base URL, authentication, response format' },
  { title: 'Admin Overview', href: '/admin', description: 'Admin API introduction and quick links' },

  // Auth
  { title: 'Admin Login', method: 'POST', path: '/v1/admin/auth/login', href: '/admin/auth/login', description: 'Authenticate as admin, get JWT tokens' },
  { title: 'Admin Logout', method: 'POST', path: '/v1/admin/auth/logout', href: '/admin/auth/logout', description: 'Invalidate admin session' },
  { title: 'Refresh Token', method: 'POST', path: '/v1/admin/auth/refresh', href: '/admin/auth/refresh', description: 'Exchange refresh_token for new id_token' },
  { title: 'Forgot Password', method: 'POST', path: '/v1/admin/auth/forgot-password', href: '/admin/auth/forgot-password', description: 'Send password reset code to email' },
  { title: 'Reset Password', method: 'POST', path: '/v1/admin/auth/reset-password', href: '/admin/auth/reset-password', description: 'Complete password reset with verification code' },

  // Users
  { title: 'List Users', method: 'GET', path: '/v1/admin/users', href: '/admin/users/list', description: 'Paginated list of all customer accounts' },
  { title: 'Get User Profile', method: 'GET', path: '/v1/admin/users/{userid}', href: '/admin/users/get', description: 'Full profile of a single customer' },
  { title: 'Update User', method: 'PUT', path: '/v1/admin/users/{userid}', href: '/admin/users/update', description: 'Update customer profile fields' },
  { title: 'User Summary Cards', method: 'GET', path: '/v1/admin/users/summary', href: '/admin/users/activities', description: 'Aggregate user statistics for dashboard' },
  { title: 'List User Activities', method: 'GET', path: '/v1/admin/users/activities', href: '/admin/users/activities', description: 'Paginated user request activity log' },

  // Admin Users
  { title: 'List Admin Users', method: 'GET', path: '/v1/admin/admin-users', href: '/admin/admin-users/list', description: 'Paginated list of all admin users' },
  { title: 'Get Admin User', method: 'GET', path: '/v1/admin/admin-users/{adminid}', href: '/admin/admin-users/get', description: 'Single admin user profile' },
  { title: 'Create Admin User', method: 'POST', path: '/v1/admin/admin-users', href: '/admin/admin-users/create', description: 'Upgrade existing user to admin role' },
  { title: 'Update Admin User', method: 'POST', path: '/v1/admin/admin-users/{adminid}/update', href: '/admin/admin-users/update', description: 'Update admin user profile fields' },
  { title: 'Disable / Enable / Delete Admin User', method: 'POST', path: '/v1/admin/admin-users/{adminid}/disable', href: '/admin/admin-users/manage', description: 'Disable, enable, or delete an admin user' },

  // Providers
  { title: 'List Providers', method: 'GET', path: '/v1/admin/providers', href: '/admin/providers/list', description: 'Paginated list of all providers' },
  { title: 'Get Provider Detail', method: 'GET', path: '/v1/admin/providers/{tidyspid}', href: '/admin/providers/get', description: 'Full profile including vehicle, onboarding, ratings' },
  { title: 'Provider Summary Cards', method: 'GET', path: '/v1/admin/providers/summary', href: '/admin/providers/activities', description: 'Aggregate provider statistics for dashboard' },
  { title: 'List Provider Activities', method: 'GET', path: '/v1/admin/providers/activities', href: '/admin/providers/activities', description: 'Paginated provider order activity log' },
  { title: 'Provider Status History', method: 'GET', path: '/v1/admin/providers/status/history', href: '/admin/providers/status-history', description: 'Provider onboarding review history log' },
  { title: 'Provider Location History', method: 'GET', path: '/v1/admin/providers/{tidyspid}/locations', href: '/admin/providers/extras', description: 'Saved locations for a provider' },
  { title: 'Update Washkit Status', method: 'POST', path: '/v1/admin/providers/washkit/{washkitid}/status', href: '/admin/providers/extras', description: 'Assign or change washkit status' },

  // Provider Onboarding
  { title: 'Get Provider Documents', method: 'GET', path: '/v1/admin/providers/onboarding/{tidyspid}/documents', href: '/admin/provider-onboarding/documents', description: 'Documents submitted during onboarding' },
  { title: 'Get Required Document Types', method: 'GET', path: '/v1/admin/providers/required-documents', href: '/admin/provider-onboarding/documents', description: 'Document types providers must submit' },
  { title: 'Get Onboarding Requirements', method: 'GET', path: '/v1/admin/providers/onboarding/{tidyspid}/requirements', href: '/admin/provider-onboarding/requirements', description: 'Summary of onboarding completion status' },
  { title: 'Background Check Status', method: 'GET', path: '/v1/admin/providers/onboarding/{tidyspid}/background-check', href: '/admin/provider-onboarding/requirements', description: 'Certn background check status and report' },
  { title: 'Quiz Results', method: 'GET', path: '/v1/admin/providers/onboarding/{tidyspid}/quiz', href: '/admin/provider-onboarding/requirements', description: 'Provider quiz pass/fail status' },
  { title: 'Mode of Operation', method: 'GET', path: '/v1/admin/providers/onboarding/{tidyspid}/mode-of-operation', href: '/admin/provider-onboarding/requirements', description: 'Provider service mode selection' },
  { title: 'Review Onboarding Submission', method: 'POST', path: '/v1/admin/providers/onboarding/review', href: '/admin/provider-onboarding/review', description: 'Approve or reject provider documents' },

  // Requests
  { title: 'List Requests', method: 'GET', path: '/v1/admin/requests', href: '/admin/requests/list', description: 'Paginated list of service requests' },
  { title: 'Get Request Detail', method: 'GET', path: '/v1/admin/requests/{requestid}', href: '/admin/requests/get', description: 'Full detail including assets, provider, pricing' },
  { title: 'Request Overview & Receipt', method: 'GET', path: '/v1/admin/requests/{requestid}', href: '/admin/requests/overview', description: 'Itemised receipt and pricing breakdown' },
  { title: 'Request Status Timeline', method: 'GET', path: '/v1/admin/requests/{requestid}/timeline', href: '/admin/requests/timeline', description: 'Chronological status transition log' },
  { title: 'Wash Uploads', method: 'GET', path: '/v1/admin/requests/{requestid}/uploads', href: '/admin/requests/uploads', description: 'Before and after wash photos' },

  // Payments
  { title: 'List Payments', method: 'GET', path: '/v1/admin/payments', href: '/admin/payments/list', description: 'All payment records' },
  { title: 'Get Payment', method: 'GET', path: '/v1/admin/payments/{paymentid}', href: '/admin/payments/get', description: 'Single payment record detail' },

  // Transactions
  { title: 'List Transactions', method: 'GET', path: '/v1/admin/transactions', href: '/admin/transactions/list', description: 'Provider financial transactions' },
  { title: 'Get Transaction', method: 'GET', path: '/v1/admin/transactions/{transactionid}', href: '/admin/transactions/get', description: 'Single transaction detail' },
  { title: 'Create Transaction', method: 'POST', path: '/v1/admin/transactions', href: '/admin/transactions/create', description: 'Manual payout, credit, or deduction' },

  // Statements
  { title: 'List Statements', method: 'GET', path: '/v1/admin/statements', href: '/admin/statements/list', description: 'Provider payout statements' },
  { title: 'Get Statement', method: 'GET', path: '/v1/admin/statements/{statementid}', href: '/admin/statements/get', description: 'Statement with all transaction detail' },
  { title: 'Create Statement', method: 'POST', path: '/v1/admin/statements', href: '/admin/statements/create', description: 'Create payout statement for a provider' },
  { title: 'Mark Statement Paid / Pending', method: 'PUT', path: '/v1/admin/statements/{statementid}/mark-paid', href: '/admin/statements/mark', description: 'Update statement payment status' },

  // Notifications
  { title: 'List Notifications', method: 'GET', path: '/v1/admin/notifications', href: '/admin/notifications/list', description: 'All push notification records' },
  { title: 'Get Notification', method: 'GET', path: '/v1/admin/notifications/{notificationid}', href: '/admin/notifications/list', description: 'Single notification by ID' },
  { title: 'Create Notification', method: 'POST', path: '/v1/admin/notifications', href: '/admin/notifications/send', description: 'Create a notification draft' },
  { title: 'Send Notification', method: 'POST', path: '/v1/admin/notifications/{notificationid}/send', href: '/admin/notifications/send', description: 'Immediately dispatch a notification' },
  { title: 'Schedule Notification', method: 'POST', path: '/v1/admin/notifications/{notificationid}/schedule', href: '/admin/notifications/send', description: 'Schedule a notification for future delivery' },
  { title: 'Delete Notification', method: 'DELETE', path: '/v1/admin/notifications/{notificationid}', href: '/admin/notifications/delete', description: 'Delete a draft or cancelled notification' },

  // Service Types
  { title: 'List Service Types', method: 'GET', path: '/v1/admin/service-types', href: '/admin/service-types/list', description: 'All service packages' },
  { title: 'Get Service Type', method: 'GET', path: '/v1/admin/service-types/{servicetypeid}', href: '/admin/service-types/get', description: 'Single service type detail' },
  { title: 'Create / Update Service Type', method: 'POST', path: '/v1/admin/service-types', href: '/admin/service-types/create', description: 'Create or update service packages' },
  { title: 'Delete Service Type', method: 'DELETE', path: '/v1/admin/service-types/{servicetypeid}', href: '/admin/service-types/delete', description: 'Remove a service type' },

  // Promo Codes
  { title: 'List Promo Codes', method: 'GET', path: '/v1/admin/promo-codes', href: '/admin/promo-codes/list', description: 'Minted Stripe promo codes with status flags' },
  { title: 'Check Promo Code', method: 'GET', path: '/v1/admin/promo-codes/{code}', href: '/admin/promo-codes/check', description: 'Look up a code: expired / used / active' },
  { title: 'Mint Promo Code', method: 'POST', path: '/v1/admin/promo-codes', href: '/admin/promo-codes/mint', description: 'Create promotion codes against a Stripe coupon' },
  { title: 'Toggle Promo Code', method: 'POST', path: '/v1/admin/promo-codes/{id}/toggle', href: '/admin/promo-codes/toggle', description: 'Enable or disable a promo code' },

  // Permissions
  { title: 'Permissions', method: 'GET', path: '/v1/admin/permissions', href: '/admin/permissions', description: 'View and update role permission matrix' },

  // Other
  { title: 'Locations', method: 'GET', path: '/v1/admin/locations', href: '/admin/locations', description: 'All provider and user location records' },
  { title: 'Document Types', method: 'GET', path: '/v1/admin/providers/required-documents', href: '/admin/document-types', description: 'Provider onboarding document type definitions' },
  { title: 'Admin Profile', method: 'GET', path: '/v1/admin/profile', href: '/admin/profile', description: 'Profile of the authenticated admin user' },

  // App (MOTD + AppVariables)
  { title: 'App Bootstrap', method: 'GET', path: '/v1/app/bootstrap', href: '/app/bootstrap', description: 'Startup AppVariables + audience-filtered MOTD messages' },
  { title: 'Accept MOTD', method: 'POST', path: '/v1/app/motd/{id}/accept', href: '/app/motd/accept', description: 'Record acceptance of a message (e.g. updated Terms & Conditions)' },
  { title: 'Dismiss MOTD', method: 'POST', path: '/v1/app/motd/{id}/dismiss', href: '/app/motd/dismiss', description: "Record \"Don't show this again\" for a message" },

  // User App — Payments (Stripe Checkout)
  { title: 'Payment & Matching Lifecycle', href: '/user/payments/lifecycle', description: 'End-to-end: summary → pay (hold) → matching → provider assigned → completion (capture/charge)' },
  { title: 'Setup Payment Sheet', method: 'POST', path: '/payment-sheet', href: '/user/payments/setup', description: 'Ensure a Stripe customer + SetupIntent + CustomerSession before checkout' },
  { title: 'List Saved Cards', method: 'POST', path: '/customer-payment-methods', href: '/user/payments/methods', description: 'List a user’s saved cards live from Stripe (brand, last4, default)' },
  { title: 'Create Checkout Session', method: 'POST', path: '/checkout-session', href: '/user/payments/checkout-session', description: 'Open a Stripe Checkout manual-capture hold for a request (promo + tax)' },
  { title: 'Rate Provider & Tip', method: 'POST', path: '/v1/user/requests/ratings', href: '/user/payments/rate-tip', description: 'Rate a completed order and charge an off-session tip' },
]
