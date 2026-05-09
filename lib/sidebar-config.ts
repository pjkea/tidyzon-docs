export type SidebarItem =
  | { type: 'link'; label: string; href: string; method?: string }
  | { type: 'group'; label: string; items: SidebarItem[]; defaultOpen?: boolean }
  | { type: 'divider' }

export const sidebarConfig: SidebarItem[] = [
  {
    type: 'link',
    label: 'Quickstart',
    href: '/',
  },
  { type: 'divider' },
  {
    type: 'group',
    label: 'Admin',
    defaultOpen: true,
    items: [
      { type: 'link', label: 'Overview', href: '/admin' },
      {
        type: 'group',
        label: 'Authentication',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'Login', href: '/admin/auth/login', method: 'POST' },
          { type: 'link', label: 'Logout', href: '/admin/auth/logout', method: 'POST' },
          { type: 'link', label: 'Refresh Token', href: '/admin/auth/refresh', method: 'POST' },
          { type: 'link', label: 'Forgot Password', href: '/admin/auth/forgot-password', method: 'POST' },
        ],
      },
      {
        type: 'group',
        label: 'Users',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'List Users', href: '/admin/users/list', method: 'GET' },
          { type: 'link', label: 'Get User', href: '/admin/users/get', method: 'GET' },
          { type: 'link', label: 'Update User', href: '/admin/users/update', method: 'PUT' },
          { type: 'link', label: 'User Activities', href: '/admin/users/activities', method: 'GET' },
        ],
      },
      {
        type: 'group',
        label: 'Admin Users',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'List Admin Users', href: '/admin/admin-users/list', method: 'GET' },
          { type: 'link', label: 'Create Admin User', href: '/admin/admin-users/create', method: 'POST' },
          { type: 'link', label: 'Update Admin User', href: '/admin/admin-users/update', method: 'PUT' },
          { type: 'link', label: 'Disable Admin User', href: '/admin/admin-users/disable', method: 'PUT' },
        ],
      },
      {
        type: 'group',
        label: 'Providers',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'List Providers', href: '/admin/providers/list', method: 'GET' },
          { type: 'link', label: 'Get Provider', href: '/admin/providers/get', method: 'GET' },
          { type: 'link', label: 'Provider Activities', href: '/admin/providers/activities', method: 'GET' },
          { type: 'link', label: 'Provider Extras', href: '/admin/providers/extras', method: 'GET' },
        ],
      },
      {
        type: 'group',
        label: 'Provider Onboarding',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'Documents', href: '/admin/provider-onboarding/documents', method: 'GET' },
          { type: 'link', label: 'Requirements', href: '/admin/provider-onboarding/requirements', method: 'GET' },
          { type: 'link', label: 'Review', href: '/admin/provider-onboarding/review', method: 'POST' },
        ],
      },
      {
        type: 'group',
        label: 'Requests',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'List Requests', href: '/admin/requests/list', method: 'GET' },
          { type: 'link', label: 'Get Request', href: '/admin/requests/get', method: 'GET' },
          { type: 'link', label: 'Overview & Receipt', href: '/admin/requests/overview', method: 'GET' },
          { type: 'link', label: 'Wash Uploads', href: '/admin/requests/uploads', method: 'GET' },
          { type: 'link', label: 'Status Timeline', href: '/admin/requests/timeline', method: 'GET' },
        ],
      },
      {
        type: 'group',
        label: 'Payments',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'List Payments', href: '/admin/payments/list', method: 'GET' },
          { type: 'link', label: 'Get Payment', href: '/admin/payments/get', method: 'GET' },
        ],
      },
      {
        type: 'group',
        label: 'Transactions',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'List Transactions', href: '/admin/transactions/list', method: 'GET' },
          { type: 'link', label: 'Get Transaction', href: '/admin/transactions/get', method: 'GET' },
          { type: 'link', label: 'Create Transaction', href: '/admin/transactions/create', method: 'POST' },
        ],
      },
      {
        type: 'group',
        label: 'Statements',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'List Statements', href: '/admin/statements/list', method: 'GET' },
          { type: 'link', label: 'Get Statement', href: '/admin/statements/get', method: 'GET' },
          { type: 'link', label: 'Create Statement', href: '/admin/statements/create', method: 'POST' },
          { type: 'link', label: 'Mark Paid / Pending', href: '/admin/statements/mark', method: 'PUT' },
        ],
      },
      {
        type: 'group',
        label: 'Notifications',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'List Notifications', href: '/admin/notifications/list', method: 'GET' },
          { type: 'link', label: 'Send Notification', href: '/admin/notifications/send', method: 'POST' },
          { type: 'link', label: 'Schedule Notification', href: '/admin/notifications/schedule', method: 'POST' },
          { type: 'link', label: 'Delete Notification', href: '/admin/notifications/delete', method: 'DELETE' },
        ],
      },
      {
        type: 'group',
        label: 'Service Types',
        defaultOpen: false,
        items: [
          { type: 'link', label: 'List Service Types', href: '/admin/service-types/list', method: 'GET' },
          { type: 'link', label: 'Get Service Type', href: '/admin/service-types/get', method: 'GET' },
          { type: 'link', label: 'Create Service Type', href: '/admin/service-types/create', method: 'POST' },
          { type: 'link', label: 'Update Service Type', href: '/admin/service-types/update', method: 'PUT' },
          { type: 'link', label: 'Delete Service Type', href: '/admin/service-types/delete', method: 'DELETE' },
        ],
      },
      { type: 'link', label: 'Locations', href: '/admin/locations', method: 'GET' },
      { type: 'link', label: 'Document Types', href: '/admin/document-types', method: 'GET' },
      { type: 'link', label: 'Profile', href: '/admin/profile', method: 'GET' },
    ],
  },
]
