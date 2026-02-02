import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════════════
   DEV ARCHITECTURE — Apartment Community SaaS
   "Slack for non-tech apartment residents"
   KISS · Every Choice Justified · Developer Reference
   ════════════════════════════════════════════════════════════════ */

const W = "#FFFFFF", W9 = "#E8E8E8", W7 = "#B0B0B0", W5 = "#808080";
const W4 = "#666", W3 = "#4A4A4A", W2 = "#333", BG = "#0A0A0A";
const BD = "rgba(255,255,255,0.09)", BDL = "rgba(255,255,255,0.05)";
const mono = "'IBM Plex Mono', monospace";

// ─── Icons ───────────────────────────────────────────────────
const Ic = {
  phone: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>,
  monitor: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  lock: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  door: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3M13 20h9M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561z"/></svg>,
  wrench: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  card: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  chat: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  mega: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  pkg: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  users: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  bld: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>,
  bell: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  zap: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  clip: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
  db: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  radio: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49"/></svg>,
  folder: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  flame: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  dollar: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  bug: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 10h2M3 10h2M19 14h2M3 14h2"/></svg>,
  dot: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill={c} opacity="0.5"/></svg>,
  server: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill={c}/><circle cx="6" cy="18" r="1" fill={c}/></svg>,
  git: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><line x1="12" y1="13" x2="12" y2="15"/></svg>,
  search: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  shield: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  hash: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  thread: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/></svg>,
  smile: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  pin: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 2-2H6a2 2 0 0 0 2 2 1 1 0 0 1 1 1z"/></svg>,
  cal: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  cart: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  help: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  upload: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  link: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  settings: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  env: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>,
  api: c=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>,
};

// ═══════════════════════════════════════════════════════════════
//  ARCHITECTURE DATA
// ═══════════════════════════════════════════════════════════════

const LAYERS = [
  {
    id: "clients", zone: "CLIENTS",
    desc: "Single Flutter codebase → iOS + Android + Web. Non-tech residents see WhatsApp-level simplicity, not Slack complexity.",
    modules: [
      { n: "Mobile App (iOS + Android)", i: "phone", tech: "Flutter 3.x · Riverpod · Dio · GoRouter",
        why: "One codebase for both platforms. Riverpod over BLoC — less boilerplate, faster shipping. Dio auto-injects tenant_id + JWT via interceptors. GoRouter handles deep links (tap gate notification → opens approval screen).",
        decides: "State: Riverpod AsyncNotifier. Navigation: GoRouter with deep links. HTTP: Dio interceptor chain (auth → tenant → retry). Offline: drift (SQLite) for message drafts + cached directory." },
      { n: "Admin Dashboard", i: "monitor", tech: "Appsmith (MVP) → Flutter Web (V2)",
        why: "Appsmith → working admin panel in a day. Community managers need: resident CRUD, payment tracking, announcements, gate logs, ticket resolution. Migrate to Flutter Web when you need custom UX and code sharing with mobile.",
        decides: "MVP: Appsmith connected to Supabase. V2: Flutter Web (shared models + API layer). Roles: super_admin (you), community_admin, gate_staff." },
    ],
  },
  {
    id: "backend", zone: "BACKEND — NestJS Modular Monolith",
    desc: "One deploy. One repo. NestJS module system enforces boundaries. Extract to microservices only when team hits 15+ devs.",
    modules: [
      { n: "Auth Module", i: "lock", tech: "Firebase Auth · JWT Custom Claims · RBAC",
        why: "Firebase handles phone OTP — cheapest in India. JWT custom claims carry community_id + role so every request is tenant-aware. RBAC: 4 roles (resident, committee_member, gate_staff, community_admin). Don't build your own auth.",
        decides: "JWT claims = {community_id, role, unit_id, user_id}. NestJS AuthGuard validates via Firebase Admin SDK. @Roles() decorator on endpoints. Refresh tokens: Firebase SDK client-side." },
      { n: "Channels & Chat", i: "hash", tech: "Supabase Realtime · Postgres · Channel model",
        why: "The Slack-like core. Default channels per community: #general, #maintenance-updates, #gate-log, #committee. Residents create interest channels: #pets, #fitness, #parents, #buy-sell. Non-tech users see 'groups' not 'channels'. No Stream/Sendbird needed at this scale.",
        decides: "channels(community_id, name, type: default|custom|dm). channel_members for join/leave. messages with channel_id + community_id RLS. System auto-posts gate alerts → #gate-log, payment receipts → DM." },
      { n: "Threads & Replies", i: "thread", tech: "parent_message_id self-reference",
        why: "Without threads, busy channels become WhatsApp group chaos. Any message can start a thread. Replies don't clutter the main feed. Simple self-referencing FK on messages table.",
        decides: "messages.parent_message_id (NULL = top-level). Main feed: WHERE parent_message_id IS NULL. reply_count cached on parent (trigger-incremented). Realtime pushes to thread subscribers." },
      { n: "Reactions & Emoji", i: "smile", tech: "reactions table · Unicode emoji",
        why: "Thumbs-up instead of 50 'okay' messages. Lightweight engagement. Unicode emoji only — no custom packs. Unique constraint prevents double-reacting.",
        decides: "reactions(message_id, user_id, emoji) with UNIQUE constraint. Display: GROUP BY emoji, COUNT(*). Preset: 👍 ❤️ 😂 🎉 👀 🙏 (any Unicode allowed)." },
      { n: "Pinned Messages", i: "pin", tech: "is_pinned + pinned_by + pinned_at",
        why: "WiFi password, emergency contacts, committee meeting notes — important info that should stay visible. Committee/admin can pin. Limit 50 per channel.",
        decides: "messages.is_pinned, pinned_by, pinned_at. Dedicated 'pinned' panel per channel. Permission: admin + committee_member only. 50-pin limit in app layer." },
      { n: "Gate Management", i: "door", tech: "QR codes · FCM push · Approval flow",
        why: "The #1 adoption driver. Pre-approved visitors get QR. Guard scans → resident gets push → approve/deny in one tap. Gate events auto-post to #gate-log for community visibility.",
        decides: "visitor_passes(community_id, resident_id, visitor_name, qr_token, status). QR encodes pass ID (not PII). FCM high-priority. Auto-post to #gate-log. Guard UI: large scan button, simplified flow." },
      { n: "Maintenance Requests", i: "wrench", tech: "CRUD + images + status machine",
        why: "Residents report issues → admin assigns to vendor → tracked to resolution. State machine: open → assigned → in_progress → resolved → closed. Updates auto-post to #maintenance-updates.",
        decides: "Status enum in DB. Supabase Storage for photos (max 5). FCM on every status change. Auto-post to #maintenance-updates. Categories: plumbing, electrical, civil, elevator, common_area, other." },
      { n: "Payments & Billing", i: "card", tech: "Razorpay · UPI Autopay · pg_cron billing",
        why: "Monthly maintenance collection. Razorpay UPI Autopay: authorize once, auto-debit monthly (₹0 UPI MDR). Webhooks for async confirmation. pg_cron generates bills on 1st, sends reminders on 5th/10th/15th. Receipts auto-sent to DM.",
        decides: "Razorpay Subscriptions API. Webhooks → verify signature → atomic DB update. Invoice: HTML→PDF, cached in Storage. pg_cron: bill gen (1st), reminders (5th, 10th, 15th). No separate job queue." },
      { n: "Announcements & Polls", i: "mega", tech: "Notices + Polls + Pinning",
        why: "Community bulletin board replacing WhatsApp group. Admin posts → instant in-app (Realtime) + FCM push for offline users. Polls for community decisions. Also auto-posts to #general.",
        decides: "announcements(community_id, title, body, poll_options JSONB). poll_votes table. FCM topic per community. Pin support. Auto-mirror to #general channel." },
      { n: "Community Events & RSVP", i: "cal", tech: "Events + RSVP tracking + Reminders",
        why: "Diwali party, AGM meeting, kids' play date. RSVP so organizers know headcount. Reminders 24h + 1h before. Auto-post to #general with RSVP button.",
        decides: "events(community_id, title, start_at, end_at, max_attendees). event_rsvps(event_id, user_id, status: going|maybe|not_going). pg_cron for reminder notifications." },
      { n: "Marketplace (Buy/Sell/Give)", i: "cart", tech: "Listings + images + DM link",
        why: "Moving-out furniture sales, kids' stuff, extra event tickets. Simple classified board within community. No payment processing — connect via DM. Auto-expire after 30 days.",
        decides: "marketplace_listings(community_id, user_id, title, price, images[], status: active|sold|expired, expires_at). pg_cron for auto-expiry. 'Message Seller' opens DM. Max 4 images." },
      { n: "Help Desk / Complaints", i: "help", tech: "Ticketing + priority + round-robin",
        why: "Beyond maintenance: noise complaints, parking violations, suggestions. Formal tracking with priority and assignment. More structured than a chat message.",
        decides: "tickets(community_id, created_by, category, priority: low|med|high|urgent, assigned_to, status). Auto-assign round-robin to committee. SLA: urgent=24h, high=48h, medium=7d." },
      { n: "Service Bookings", i: "pkg", tech: "Subscriptions + vendor delivery list",
        why: "Newspaper, milk, laundry — residents subscribe, vendors see daily delivery list. Subscription model, not marketplace. Pause/resume when traveling.",
        decides: "service_subs(community_id, user_id, service_type, days_of_week[], active, paused_until). Vendor view: filter by service + date. Delivery confirmation toggle." },
      { n: "Resident Directory", i: "users", tech: "Profiles + Units + Privacy controls",
        why: "Foundational module. Maps users → units → buildings → community. Privacy toggles for contact info. Most modules reference this. Search by name/unit/building.",
        decides: "users → unit_residents → units → buildings → communities. visibility_settings JSONB. Search within same community (RLS). Emergency contacts visible to admin only." },
    ],
  },
  {
    id: "shared", zone: "SHARED SERVICES (NestJS modules, not separate deploys)",
    desc: "Cross-cutting concerns. These are injectable services shared by all feature modules above — NOT separate microservices.",
    modules: [
      { n: "Tenant Context", i: "bld", tech: "NestJS Middleware · PostgreSQL RLS",
        why: "Every request → extract community_id from JWT → SET LOCAL on DB session → RLS ensures total data isolation. Even buggy code can't leak across communities. The one thing you MUST get right.",
        decides: "Global middleware: SET LOCAL app.current_community_id = ?. Every table has community_id + RLS. Test: query without SET LOCAL → 0 rows. Zero trust — DB enforces isolation." },
      { n: "Notification Preferences", i: "settings", tech: "Per-channel mute · DND · Daily digest",
        why: "Non-tech users WILL uninstall if it buzzes every 2 minutes. Mute channels, set DND hours (10pm-7am), or opt into daily digest. This is what makes your app livable.",
        decides: "notification_prefs(user_id, channel_id, muted, dnd_start, dnd_end, digest_only). Check BEFORE every notification dispatch. Digest: pg_cron at 8am, aggregate unreads, one FCM summary." },
      { n: "Notification Service", i: "bell", tech: "FCM · Resend (email) · Centralized",
        why: "Single send(userId, event, payload) method. Checks preferences → respects mute/DND → routes to FCM or email. No BullMQ — FCM is async and fire-and-forget.",
        decides: "FCM topics for broadcast, tokens for direct. Resend for email (free 3K/mo). SMS: only OTP via Firebase. Always check notification_prefs first. Log to notifications_log." },
      { n: "@Mentions & Tagging", i: "link", tech: "Regex parse + notification routing",
        why: "@person = direct notification (ignores channel mute). @channel = notify all members. @committee = notify committee. Same mental model as WhatsApp/Slack — residents already understand this.",
        decides: "Parse on message save: regex @username, @channel, @committee. @person → targeted notification (bypasses mute). @channel → respects DND. Store in message_mentions table for search." },
      { n: "Search Engine", i: "search", tech: "PostgreSQL tsvector · GIN index",
        why: "Find old announcements, WiFi password from 3 months ago, that plumber's contact. Postgres full-text search is good enough for <100K messages. No Elasticsearch needed — add Meilisearch only when this gets slow.",
        decides: "tsvector column on messages, announcements, marketplace. GIN index. Scoped to community_id (RLS). Weighted: title > body. Auto-update trigger on INSERT/UPDATE." },
      { n: "File Upload Pipeline", i: "upload", tech: "Supabase Storage · Signed URLs · Client compress",
        why: "Chat photos, maintenance images, marketplace listings. Client compresses → gets signed URL from backend → uploads directly to Storage. Never through your NestJS server — keeps it lightweight.",
        decides: "Client: flutter_image_compress (<1MB). Backend: POST /upload/signed-url → signed URL. Direct upload to Supabase. Allowed: jpg, png, pdf, mp4 (<50MB). file_attachments table links to entities." },
      { n: "Integration Bus", i: "zap", tech: "NestJS EventEmitter2 · Auto-posts",
        why: "Gate check-in → #gate-log. Payment → user DM. Maintenance update → #maintenance-updates. New resident → #general welcome. Makes channels feel alive without manual effort.",
        decides: "EventEmitter2 events: gate.checkin, payment.received, maintenance.updated, resident.joined, event.created. Listeners create system messages (is_system: true, styled differently in UI)." },
      { n: "Audit Logger", i: "clip", tech: "NestJS interceptor · audit_logs table",
        why: "Committee accountability: who approved what, who changed the bill, who deleted a post. Auto-logged on all mutations. Essential for trust.",
        decides: "Interceptor on POST/PUT/DELETE. audit_logs(user_id, action, entity_type, entity_id, diff JSONB, timestamp). No Elasticsearch — just a queryable table. 1 year retention." },
    ],
  },
  {
    id: "data", zone: "DATA LAYER",
    desc: "Supabase = Postgres + Realtime + Storage + Edge Functions. One platform, one bill. Don't self-host as a small team.",
    modules: [
      { n: "PostgreSQL (Supabase)", i: "db", tech: "RLS · pg_cron · tsvector · PgBouncer",
        why: "Relational data fits this domain perfectly. RLS = multi-tenancy at DB level. pg_cron = scheduled jobs. tsvector = search. Supabase manages backups, scaling, connection pooling, point-in-time recovery.",
        decides: "All tables: community_id + RLS. pg_cron: bill gen, reminders, listing expiry, digest. PgBouncer: connection pooling. Migrations: Prisma or raw SQL." },
      { n: "Redis (Upstash)", i: "dot", tech: "Serverless Redis · Free tier · Cache + presence",
        why: "Cache community settings, online presence, rate limits. Upstash is serverless — free tier (10K cmds/day), zero ops. Don't self-host Redis.",
        decides: "Cache: settings (TTL 5min), profiles (TTL 1min), channel members (TTL 30s). Rate limit: INCR + EXPIRE. Presence: SETEX per user (TTL 60s, heartbeat 30s)." },
      { n: "Supabase Realtime", i: "radio", tech: "Postgres Changes · Presence · Broadcast",
        why: "This IS your WebSocket layer. No Socket.io, no Pusher. Supabase pushes row changes filtered by RLS. Covers: chat, announcements, gate alerts, typing indicators, presence.",
        decides: "Channels: chat:{channel_id}, community:{community_id}. Presence: online users. Broadcast: typing indicators. All RLS-filtered — tenant-safe." },
      { n: "Supabase Storage", i: "folder", tech: "S3-compatible · Bucket RLS · Image transforms",
        why: "All files: chat attachments, maintenance photos, marketplace, invoices. RLS on buckets — community A can't see community B's files. Built-in image transforms replace Cloudinary.",
        decides: "Buckets: chat-attachments, maintenance, marketplace, documents, invoices. Signed URLs (5min). Transforms: ?width=200 for thumbnails. Max: images 5MB, docs 10MB, video 50MB." },
    ],
  },
  {
    id: "external", zone: "THIRD-PARTY SERVICES",
    desc: "Pay for these because building them is insane. Chosen for: cost, Flutter SDK quality, Indian market fit.",
    modules: [
      { n: "Firebase", i: "flame", tech: "Auth (Phone OTP) · FCM (Push) · Crashlytics",
        why: "Three critical services, one SDK, free to 50K MAU. Cheapest OTP, only reliable cross-platform push, crash reporting before users complain.",
        decides: "Auth: Phone OTP + Google Sign-in. FCM: topics (broadcast) + tokens (direct). Crashlytics: auto-enabled. Custom claims for tenant context." },
      { n: "Razorpay", i: "dollar", tech: "UPI Autopay · Subscriptions · Webhooks",
        why: "Best Indian gateway for recurring. UPI Autopay: authorize once, auto-debit monthly (₹0 MDR). Webhooks for async. Dashboard gives society admin free analytics.",
        decides: "Subscriptions API. Webhooks → verify signature → atomic update. UPI: 0% MDR. Test mode for dev." },
      { n: "Sentry", i: "bug", tech: "Error tracking · Performance · Alerts",
        why: "Crashlytics = mobile. Sentry = backend errors + slow APIs. Stack traces with context instead of 'it's not working.' Free: 5K errors/month.",
        decides: "SDK in NestJS + Flutter. Source maps in CI. Alert on new error types. Performance: track slow endpoints." },
    ],
  },
  {
    id: "infra", zone: "HOSTING & DEVOPS",
    desc: "Managed platforms only. You're building a product, not operating servers.",
    modules: [
      { n: "Backend Hosting", i: "server", tech: "Railway ($5/mo) or Render (free)",
        why: "Push to GitHub → deployed. Railway Hobby: $5/mo, always-on. Render free: auto-sleeps (30s cold start — fine for early stage). No AWS/GCP/K8s.",
        decides: "Railway Hobby. Dockerfile in repo. Auto-deploy on push to main. GET /health endpoint. Env vars via Railway dashboard." },
      { n: "CI/CD", i: "git", tech: "GitHub Actions + Codemagic",
        why: "GitHub Actions: lint → test → deploy backend. Codemagic: Flutter builds + iOS signing. Both have free tiers.",
        decides: "GH Actions: push to main → lint → test → deploy Railway. Codemagic: tag → build → sign → publish stores. Branch protection on main. Staging: push to develop." },
    ],
  },
];

// ── Dev reference data ───────────────────────────────────────
const DB_SCHEMA = `── CORE ──────────────────────────────────────
communities        id, name, address, settings JSONB, created_at
buildings          id, community_id, name, floor_count
units              id, building_id, unit_number, type (1bhk|2bhk|3bhk)
users              id, firebase_uid, name, phone, email, avatar_url, visibility JSONB
unit_residents     user_id, unit_id, role (owner|tenant), is_primary, moved_in_at

── COMMUNICATION ────────────────────────────
channels           id, community_id, name, type (default|custom|dm), description, created_by
channel_members    channel_id, user_id, joined_at, role (member|admin)
messages           id, channel_id, community_id, user_id, body, parent_message_id,
                   is_pinned, pinned_by, is_system, reply_count,
                   attachments JSONB, search_vector tsvector, created_at, edited_at
reactions          message_id, user_id, emoji  →  UNIQUE(msg, user, emoji)
message_mentions   message_id, mentioned_user_id, type (user|channel|role)

── FEATURES ─────────────────────────────────
announcements      id, community_id, title, body, is_pinned, poll_options JSONB, tsvector
poll_votes         announcement_id, user_id, option_index
visitor_passes     id, community_id, resident_id, visitor_name, qr_token, status, checked_in_at
maintenance_reqs   id, community_id, unit_id, category, description, images[],
                   status (open→assigned→in_progress→resolved→closed), assigned_to
payments           id, community_id, unit_id, amount, razorpay_id, status, due_date, paid_at
events             id, community_id, title, location, start_at, end_at, max_attendees
event_rsvps        event_id, user_id, status (going|maybe|not_going)
marketplace        id, community_id, user_id, title, price, images[], status, expires_at
tickets            id, community_id, created_by, category, priority, assigned_to, status
service_subs       id, community_id, user_id, service_type, days_of_week[], active

── SYSTEM ───────────────────────────────────
notification_prefs user_id, channel_id, muted, dnd_start, dnd_end, digest_only
file_attachments   id, entity_type, entity_id, storage_path, file_name, mime_type, size
audit_logs         id, community_id, user_id, action, entity_type, entity_id, diff JSONB
notifications_log  id, user_id, event_type, channel, payload JSONB, delivered, created_at`;

const SECURITY = `── JWT FLOW ──────────────────────────────────
Client → Firebase Auth (Phone OTP) → JWT with claims {community_id, role, unit_id}
Client → Authorization: Bearer <token>
NestJS AuthGuard → Firebase Admin SDK validates
NestJS RoleGuard → @Roles() decorator checks claims.role

── TENANT ISOLATION ─────────────────────────
1. JWT → extract community_id       3. Every table → RLS policy:
2. Middleware → SET LOCAL               community_id = current_setting(...)
   app.current_community_id = ?     4. Even raw SQL can't bypass → DB enforces
                                    5. Test: no SET LOCAL → 0 rows ✓

── ROLES ────────────────────────────────────
resident         read + own CRUD + chat + react + RSVP + marketplace
committee_member +pin, +announcements, +assign tickets, +moderate
gate_staff       gate module only (check-in, visitor logs, guard view)
community_admin  full access (billing, residents, settings, audit logs)

── CHECKLIST ────────────────────────────────
✓ JWT on every request     ✓ RLS on every table     ✓ Role-based endpoints
✓ Rate limit (Redis)       ✓ Input validation DTOs  ✓ Signed upload URLs
✓ Razorpay sig verify      ✓ CORS whitelist         ✓ Helmet headers`;

const API = `── REST CONVENTIONS ──────────────────────────
GET    /api/v1/channels                  list (community scoped via RLS)
GET    /api/v1/channels/:id/messages     paginated (cursor-based)
POST   /api/v1/channels/:id/messages     send message
POST   /api/v1/messages/:id/reactions    add reaction
DELETE /api/v1/messages/:id/reactions/:e  remove reaction
POST   /api/v1/messages/:id/pin          pin (admin/committee only)
GET    /api/v1/search?q=wifi+password    full-text across entities

── CURSOR PAGINATION (not offset) ──────────
GET /messages?channel_id=X&before=<cursor>&limit=30
→ { data: [...], cursor: { before: "msg_abc" }, has_more: true }
Why: consistent during real-time inserts. Offset skips/dupes on new data.

── ERROR FORMAT ─────────────────────────────
{ "error": { "code": "NOT_FOUND", "message": "...", "status": 404 } }
Codes: SCREAMING_SNAKE for easy client matching.

── WEBHOOKS (Razorpay) ─────────────────────
POST /api/v1/webhooks/razorpay
1. Verify X-Razorpay-Signature   2. Idempotency check (payment_id)
3. Atomic transaction             4. Respond 200 immediately`;

const ENV = `── ENVIRONMENTS ─────────────────────────────
local       Supabase local (Docker), NestJS dev, Flutter emulator
staging     Supabase free cloud, Railway (develop branch), TestFlight
production  Supabase Pro, Railway Hobby ($5), App Store / Play Store

── .env VARIABLES ───────────────────────────
SUPABASE_URL          SUPABASE_ANON_KEY        SUPABASE_SERVICE_KEY
FIREBASE_PROJECT_ID   FIREBASE_SERVICE_ACCOUNT  (JSON, backend only)
RAZORPAY_KEY_ID       RAZORPAY_KEY_SECRET       RAZORPAY_WEBHOOK_SECRET
SENTRY_DSN            UPSTASH_REDIS_URL         UPSTASH_REDIS_TOKEN
PORT=3000             NODE_ENV=production

── LOCAL SETUP (5 min) ──────────────────────
1. git clone && npm install        5. npm run seed (2 communities, 10 users)
2. cp .env.example .env            6. npm run start:dev → :3000
3. npx supabase start              7. Flutter: update env.dart → localhost
4. npm run migration:run`;

const FLUTTER_DIR = `lib/
├── core/
│   ├── config/          env, supabase, dio
│   ├── auth/            auth provider, guards
│   ├── tenant/          tenant context provider
│   ├── notifications/   FCM, preference helpers
│   ├── realtime/        supabase subscriptions
│   └── theme/           colors, typography
├── features/
│   ├── channels/        list, chat, threads, reactions
│   ├── gate/            guard view, passes, QR
│   ├── maintenance/     requests, status tracking
│   ├── payments/        billing, razorpay, receipts
│   ├── announcements/   notices, polls
│   ├── events/          calendar, RSVP
│   ├── marketplace/     listings, buy/sell
│   ├── helpdesk/        tickets, complaints
│   ├── services/        bookings, subscriptions
│   ├── directory/       profiles, search
│   └── search/          unified search
├── shared/
│   ├── widgets/         message bubble, tile, etc
│   ├── models/          freezed data models
│   └── utils/           formatters, validators
└── main.dart`;

const NESTJS_DIR = `src/
├── modules/
│   ├── auth/            JWT guard, role decorator
│   ├── channels/        CRUD, members, defaults
│   ├── messages/        threads, reactions, pins, mentions
│   ├── gate/            passes, QR, check-in
│   ├── maintenance/     requests, assignment, status
│   ├── payments/        razorpay, webhooks, billing
│   ├── announcements/   notices, polls, votes
│   ├── events/          CRUD, RSVP, reminders
│   ├── marketplace/     listings, expiry
│   ├── helpdesk/        tickets, priority, SLA
│   ├── services/        subscriptions, vendor
│   ├── directory/       profiles, units, search
│   └── search/          unified FTS endpoint
├── shared/
│   ├── tenant/          middleware, RLS
│   ├── notifications/   FCM, email, prefs
│   ├── integrations/    event bus, auto-post
│   ├── upload/          signed URLs, validation
│   └── audit/           interceptor, logs
├── database/
│   ├── migrations/
│   └── seeds/
├── app.module.ts
└── main.ts`;

const STACK = [
  ["Mobile","Flutter 3.x · Riverpod · GoRouter · Dio"],["Backend","NestJS · TypeScript · Prisma"],
  ["Database","Supabase PostgreSQL · RLS · pg_cron"],["Cache","Upstash Redis (serverless)"],
  ["Search","PostgreSQL tsvector (built-in)"],["Auth","Firebase Auth (Phone OTP)"],
  ["Push","Firebase Cloud Messaging"],["Payments","Razorpay (UPI Autopay)"],
  ["Storage","Supabase Storage (S3)"],["Realtime","Supabase Realtime"],
  ["Hosting","Railway ($5/mo)"],["CI/CD","GitHub Actions + Codemagic"],
  ["Errors","Sentry + Crashlytics"],
];

// ═══════════════════════════════════════════════════════════════
//  UI COMPONENTS
// ═══════════════════════════════════════════════════════════════

function useW(){const[w,sW]=useState(1200);useEffect(()=>{sW(window.innerWidth);const h=()=>sW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h)},[]);return w}

function Exp({open,children}){const r=useRef(null);const[h,sH]=useState(0);useEffect(()=>{if(r.current)sH(open?r.current.scrollHeight:0)},[open,children]);return<div style={{overflow:"hidden",maxHeight:h,opacity:open?1:0,transition:"max-height 0.3s ease, opacity 0.2s ease"}}><div ref={r}>{children}</div></div>}

function Mod({m,c}){
  const[o,sO]=useState(false);const ic=Ic[m.i]||Ic.dot;
  return(
    <div style={{borderRadius:6,border:`1px solid ${o?"rgba(255,255,255,0.18)":BDL}`,background:o?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.012)",transition:"all 0.2s",overflow:"hidden"}}>
      <div onClick={()=>sO(!o)} style={{display:"flex",alignItems:"center",gap:c?7:9,padding:c?"8px 9px":"9px 12px",cursor:"pointer",userSelect:"none"}}>
        <div style={{width:c?26:30,height:c?26:30,borderRadius:5,background:o?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.025)",border:`1px solid ${o?"rgba(255,255,255,0.15)":BDL}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>{ic(o?W9:W5)}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:c?11:12,fontWeight:600,color:o?W:W9,transition:"color 0.15s"}}>{m.n}</div>
          <div style={{fontSize:c?8.5:9.5,color:W4,marginTop:1,fontFamily:mono,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.tech}</div>
        </div>
        <svg width="10" height="10" viewBox="0 0 10 10" style={{flexShrink:0,transition:"transform 0.25s",transform:o?"rotate(180deg)":"none",opacity:0.35}}><polygon points="1,3 9,3 5,7" fill={W}/></svg>
      </div>
      <Exp open={o}>
        <div style={{padding:c?"0 9px 10px":"0 12px 12px",borderTop:`1px solid ${BDL}`}}>
          <div style={{marginTop:10}}><div style={{fontSize:8,fontWeight:700,color:W5,letterSpacing:"0.1em",fontFamily:mono,marginBottom:4}}>WHY THIS EXISTS</div><div style={{fontSize:11.5,color:W7,lineHeight:1.6}}>{m.why}</div></div>
          <div style={{marginTop:10}}><div style={{fontSize:8,fontWeight:700,color:W5,letterSpacing:"0.1em",fontFamily:mono,marginBottom:4}}>KEY DECISIONS</div><div style={{fontSize:11,color:W7,lineHeight:1.6,padding:"8px 10px",borderRadius:4,background:"rgba(255,255,255,0.025)",border:`1px solid ${BDL}`,fontFamily:mono}}>{m.decides}</div></div>
        </div>
      </Exp>
    </div>
  );
}

function Arr(){return<div style={{display:"flex",justifyContent:"center",padding:"3px 0"}}><svg width="44" height="22" viewBox="0 0 44 22"><line x1="22" y1="0" x2="22" y2="15" stroke={W3} strokeWidth="1.2" strokeDasharray="3 2.5"/><polygon points="18,13 22,21 26,13" fill={W3}/><circle r="2" fill={W7}><animateMotion dur="2s" repeatCount="indefinite" path="M22,0 L22,18"/><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite"/></circle></svg></div>}

function Code({title,code,icon}){
  const[o,sO]=useState(false);const ic=icon?Ic[icon]:null;
  return(
    <div style={{border:`1px solid ${o?"rgba(255,255,255,0.15)":BD}`,borderRadius:7,background:"rgba(255,255,255,0.012)",overflow:"hidden",transition:"border-color 0.2s"}}>
      <div onClick={()=>sO(!o)} style={{padding:"10px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:7,userSelect:"none"}}>
        {ic&&<div style={{flexShrink:0}}>{ic(o?W7:W4)}</div>}
        <span style={{fontSize:10,fontWeight:700,color:o?W7:W5,letterSpacing:"0.08em",fontFamily:mono,transition:"color 0.15s"}}>{title}</span>
        <svg width="8" height="8" viewBox="0 0 8 8" style={{marginLeft:"auto",transition:"transform 0.25s",transform:o?"rotate(180deg)":"none",opacity:0.35}}><polygon points="0.5,2 7.5,2 4,6" fill={W}/></svg>
      </div>
      <Exp open={o}><pre style={{margin:0,padding:"0 12px 14px",fontSize:10.5,color:W7,fontFamily:mono,lineHeight:1.6,whiteSpace:"pre",overflowX:"auto"}}>{code}</pre></Exp>
    </div>
  );
}

function Sec({children}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"28px 0 12px"}}><div style={{fontSize:11,fontWeight:700,color:W5,letterSpacing:"0.1em",fontFamily:mono,textTransform:"uppercase",whiteSpace:"nowrap"}}>{children}</div><div style={{flex:1,height:1,background:BD}}/></div>}

// ═══════════════════════════════════════════════════════════════
//  APP
// ═══════════════════════════════════════════════════════════════

export default function App(){
  const[ld,sL]=useState(false);const vw=useW();
  useEffect(()=>{requestAnimationFrame(()=>sL(true))},[]);
  const mob=vw<768;

  return(
    <div style={{minHeight:"100vh",background:BG,color:W9,fontFamily:"'DM Sans',-apple-system,sans-serif",position:"relative",overflow:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <div style={{position:"absolute",inset:0,zIndex:0,opacity:0.12,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",backgroundSize:"18px 18px"}}/>

      <div style={{position:"relative",zIndex:1,padding:mob?"16px 10px 32px":"28px 24px 40px",maxWidth:1040,margin:"0 auto"}}>

        {/* HEADER */}
        <div style={{marginBottom:mob?14:22,opacity:ld?1:0,transform:ld?"none":"translateY(5px)",transition:"all 0.4s"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <div style={{width:mob?32:38,height:mob?32:38,borderRadius:7,background:W,display:"flex",alignItems:"center",justifyContent:"center",fontSize:mob?15:18,fontWeight:800,color:BG}}>A</div>
            <div>
              <h1 style={{fontSize:mob?17:22,fontWeight:800,margin:0,letterSpacing:"-0.03em",color:W}}>Apartment Community SaaS</h1>
              <p style={{fontSize:mob?9:11,color:W4,margin:"2px 0 0",fontFamily:mono}}>Developer Architecture · "Slack for apartment residents"</p>
            </div>
          </div>
          <div style={{height:1,background:BD,margin:"14px 0"}}/>
          <p style={{fontSize:12.5,color:W5,lineHeight:1.65,maxWidth:780}}>
            Every module is <strong style={{color:W7}}>expandable</strong> — click to see <strong style={{color:W7}}>why it exists</strong> and <strong style={{color:W7}}>key decisions</strong>. Architecture sections below (schema, security, API, folders) are the reference you'd actually use while coding. If it's here, it's justified.
          </p>
        </div>

        {/* ARCHITECTURE */}
        <Sec>System Architecture</Sec>
        <div style={{display:"flex",flexDirection:"column",gap:0,opacity:ld?1:0,transition:"all 0.4s ease 0.08s"}}>
          {LAYERS.map((l,li)=>(
            <div key={l.id}>
              {li>0&&<Arr/>}
              <div style={{border:`1px solid ${BD}`,borderRadius:8,background:"rgba(255,255,255,0.01)",padding:mob?"10px 10px 12px":"14px 16px 16px"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"3px 9px 3px 7px",borderRadius:3,background:"rgba(255,255,255,0.04)",border:`1px solid ${BD}`,marginBottom:4}}>
                  <div style={{width:5,height:5,borderRadius:1.5,background:W5}}/>
                  <span style={{fontSize:mob?8.5:9.5,fontWeight:700,color:W7,letterSpacing:"0.07em",textTransform:"uppercase",fontFamily:mono}}>{l.zone}</span>
                </div>
                <p style={{fontSize:11,color:W4,margin:"4px 0 10px",lineHeight:1.5,fontStyle:"italic"}}>{l.desc}</p>
                <div style={{display:"grid",gridTemplateColumns:mob?"1fr":l.modules.length<=3?"1fr":"1fr 1fr",gap:mob?4:5}}>
                  {l.modules.map((m,mi)=><Mod key={mi} m={m} c={mob}/>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DB SCHEMA */}
        <Sec>Database Schema</Sec>
        <Code title="ALL TABLES (every table has community_id + RLS)" code={DB_SCHEMA} icon="db"/>

        {/* SECURITY */}
        <Sec>Security Model</Sec>
        <Code title="JWT · TENANT ISOLATION · ROLES · CHECKLIST" code={SECURITY} icon="shield"/>

        {/* API */}
        <Sec>API Design Patterns</Sec>
        <Code title="REST · CURSOR PAGINATION · ERRORS · WEBHOOKS" code={API} icon="api"/>

        {/* FOLDERS */}
        <Sec>Project Structure</Sec>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?8:10}}>
          <Code title="FLUTTER (lib/)" code={FLUTTER_DIR} icon="phone"/>
          <Code title="NESTJS (src/)" code={NESTJS_DIR} icon="server"/>
        </div>

        {/* ENV */}
        <Sec>Environment & Local Setup</Sec>
        <Code title="ENVIRONMENTS · .env VARS · LOCAL SETUP (5 min)" code={ENV} icon="env"/>

        {/* STACK */}
        <Sec>Full Stack at a Glance</Sec>
        <div style={{border:`1px solid ${BD}`,borderRadius:7,background:"rgba(255,255,255,0.012)",padding:mob?"10px":"14px 16px"}}>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:0}}>
            {STACK.map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4.5px 2px",borderBottom:`1px solid ${BDL}`,gap:12}}>
                <span style={{fontSize:10.5,color:W4,fontWeight:500,flexShrink:0}}>{k}</span>
                <span style={{fontSize:10,color:W7,fontWeight:600,fontFamily:mono,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",minWidth:0}}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRINCIPLES */}
        <Sec>Design Principles</Sec>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:mob?5:7}}>
          {[["KISS","One NestJS deploy. One Flutter codebase. Supabase handles DB + Realtime + Storage. Railway handles hosting. No microservices until pain."],
            ["MULTI-TENANT","community_id on every table. RLS on every row. JWT carries tenant context. DB enforces isolation — not app code."],
            ["SCALE LATER","When you feel pain, not before. Supabase scales DB. Add Meilisearch when PG FTS lags. Split services when team > 15."]
          ].map(([l,v])=>(
            <div key={l} style={{padding:mob?"8px 10px":"10px 12px",borderRadius:6,background:"rgba(255,255,255,0.02)",border:`1px solid ${BD}`}}>
              <div style={{fontSize:8,fontWeight:700,color:W5,letterSpacing:"0.08em",fontFamily:mono}}>{l}</div>
              <div style={{fontSize:11,color:W7,marginTop:4,lineHeight:1.45}}>{v}</div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{marginTop:24,paddingTop:12,borderTop:`1px solid ${BDL}`,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
          <span style={{fontSize:9,color:W2,fontFamily:mono}}>Apartment Community SaaS · Dev Architecture v3.0</span>
          <span style={{fontSize:9,color:W2,fontFamily:mono}}>KISS · Ship Fast · Scale Later</span>
        </div>
      </div>
    </div>
  );
}
