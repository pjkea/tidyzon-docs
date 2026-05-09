import Head from 'next/head'
import { CategoryHero } from '@/components/CategoryHero'
import { Shield, Users, FileText, CreditCard } from 'lucide-react'

export default function AdminOverview() {
  return (
    <>
      <Head>
        <title>Admin API — Tidyzon API Docs</title>
      </Head>
      <CategoryHero
        title="Admin API"
        subtitle="Admin Endpoints"
        description="Full control over the Tidyzon platform — manage users, providers, requests, payments, and configuration."
        features={[
          {
            icon: <Users size={16} />,
            title: 'User & Provider Management',
            description: 'List, view, and update customer and provider profiles. Manage onboarding and verification.',
          },
          {
            icon: <FileText size={16} />,
            title: 'Request Operations',
            description: 'Access full request history, status timelines, wash uploads, and receipts.',
          },
          {
            icon: <CreditCard size={16} />,
            title: 'Payments & Statements',
            description: 'View transactions, manage provider payout statements, and mark settlements.',
          },
          {
            icon: <Shield size={16} />,
            title: 'Platform Configuration',
            description: 'Manage service types, notifications, permissions, and document types.',
          },
        ]}
        quickLinks={[
          { label: 'Admin Login', href: '/admin/auth/login' },
          { label: 'List Requests', href: '/admin/requests/list' },
          { label: 'List Providers', href: '/admin/providers/list' },
          { label: 'List Users', href: '/admin/users/list' },
        ]}
      />
    </>
  )
}
