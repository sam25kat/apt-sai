import { useState, useEffect, useRef } from "react";

const W = "#FFF";
const W9 = "#E8E8E8";
const W7 = "#B0B0B0";
const W5 = "#808080";
const W4 = "#666";
const W3 = "#4A4A4A";
const W2 = "#333";
const BG = "#0A0A0A";
const BD = "rgba(0,0,0,0.4)";
const BDL = "rgba(0,0,0,0.2)";
const mono = "IBM Plex Mono, monospace";

function Icon({ name, color }) {
  const c = color || W5;
  const p = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    phone: <svg {...p}><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" /></svg>,
    monitor: <svg {...p}><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    lock: <svg {...p}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    door: <svg {...p}><path d="M13 4h3a2 2 0 0 1 2 2v14" /><path d="M2 20h3" /><path d="M13 20h9" /><path d="M10 12v.01" /><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561z" /></svg>,
    wrench: <svg {...p}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
    card: <svg {...p}><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    chat: <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
    mega: <svg {...p}><path d="M3 11l18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>,
    pkg: <svg {...p}><path d="M16.5 9.4l-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    users: <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    bld: <svg {...p}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></svg>,
    bell: <svg {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    zap: <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    clip: <svg {...p}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>,
    db: <svg {...p}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
    radio: <svg {...p}><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49" /><path d="M7.76 16.24a6 6 0 0 1 0-8.49" /></svg>,
    folder: <svg {...p}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
    flame: <svg {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>,
    dollar: <svg {...p}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    bug: <svg {...p}><rect x="8" y="6" width="8" height="14" rx="4" /><path d="M19 10h2M3 10h2M19 14h2M3 14h2" /></svg>,
    dot: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill={c} opacity="0.5" /></svg>,
    server: <svg {...p}><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="6" cy="6" r="1" fill={c} /><circle cx="6" cy="18" r="1" fill={c} /></svg>,
    git: <svg {...p}><circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" /><line x1="12" y1="13" x2="12" y2="15" /></svg>,
    search: <svg {...p}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    shield: <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    hash: <svg {...p}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></svg>,
    thread: <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><line x1="9" y1="10" x2="15" y2="10" /><line x1="9" y1="14" x2="13" y2="14" /></svg>,
    smile: <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
    pin: <svg {...p}><line x1="12" y1="17" x2="12" y2="22" /><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h-6v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17z" /></svg>,
    cal: <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    cart: <svg {...p}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>,
    help: <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    upload: <svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    settings: <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    code: <svg {...p}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    file: <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" /></svg>,
    mail: <svg {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>,
    at: <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" /></svg>,
  };
  return icons[name] || icons.dot;
}

const LAYERS = [
  {
    id: "clients", zone: "CLIENTS",
    desc: "Single Flutter codebase. Non-tech residents see WhatsApp-meets-Slack: channels, threads, reactions.",
    modules: [
      { n: "Mobile App (iOS + Android)", i: "phone", tech: "Flutter 3.x, Riverpod, GoRouter, Dio",
        why: "One codebase, both platforms. Riverpod over BLoC = less boilerplate. GoRouter for deep links (tap gate notification opens approval screen). Dio interceptors auto-inject tenant_id + JWT.",
        decides: "State: Riverpod async providers. Navigation: GoRouter with auth redirect guards. HTTP: Dio + interceptors. Local: shared_preferences for tokens, Hive for offline cache." },
      { n: "Admin Dashboard", i: "monitor", tech: "Flutter Web or Appsmith (MVP shortcut)",
        why: "MVP: Appsmith connected to Supabase = working admin panel in 1 day. V2: Flutter Web sharing models with mobile app.",
        decides: "MVP: Appsmith + Supabase direct. V2: Flutter Web sharing 80% code with mobile. Role-based views: admin sees billing, guard sees gate only." },
    ],
  },
  {
    id: "features", zone: "BACKEND - FEATURE MODULES",
    desc: "One NestJS app. Each feature = one module with controllers, services, DTOs. Extract to microservice only when team hits 15+ devs.",
    modules: [
      { n: "Auth Module", i: "lock", tech: "Firebase Auth, JWT Custom Claims, NestJS Guards",
        why: "Firebase handles phone OTP at Rs 0.75/SMS (cheapest in India). Don't build auth. Store community_id + role + unit_id in Firebase custom claims so every JWT carries tenant context.",
        decides: "Phone OTP via Firebase. Claims: {community_id, role, unit_id, building_id}. Roles: resident, admin, guard, vendor. NestJS AuthGuard on every request." },
      { n: "Channels and Chat", i: "hash", tech: "Supabase Realtime, Postgres, DMs",
        why: "The Slack experience. Default channels: #general, #maintenance-updates, #gate-log per community. Custom: #pets, #fitness. Group DMs for smaller conversations.",
        decides: "Tables: channels, messages, channel_members. Channel types: public, private, dm, system. System channels auto-post from other modules. Supabase Realtime per channel." },
      { n: "Threads and Replies", i: "thread", tech: "parent_message_id self-reference",
        why: "Without threads, busy channels become WhatsApp group chaos. Replies stay in thread, not main feed. Thread summary shows reply count + last participants.",
        decides: "messages.parent_message_id (NULL = top-level). Main feed: WHERE parent_message_id IS NULL. reply_count cached on parent via trigger." },
      { n: "Reactions and Emoji", i: "smile", tech: "reactions table, Unicode emoji, toggle",
        why: "Thumbs-up instead of 50 'okay' messages. Reduces message volume 40%+. Tap again to remove.",
        decides: "reactions(message_id, user_id, emoji) UNIQUE constraint. Toggle: INSERT ON CONFLICT DELETE. Display: GROUP BY emoji, COUNT(*)." },
      { n: "Pinned Messages", i: "pin", tech: "is_pinned + pinned_by + pinned_at",
        why: "WiFi password, emergency contacts, committee notes -- important info that stays visible. Max 50 per channel.",
        decides: "messages.is_pinned, pinned_by, pinned_at. Dedicated pinned panel per channel. Permission: admin + committee only." },
      { n: "Gate Management", i: "door", tech: "QR codes, FCM push, approval workflow",
        why: "The #1 selling feature. Pre-approved visitors get QR. Guard scans, resident gets push, approve/deny in one tap. Auto-posts to #gate-log.",
        decides: "QR encodes visitor_pass_id (not PII). FCM high-priority. Status: pending, approved/denied, checked_in, checked_out. Auto-post to #gate-log." },
      { n: "Maintenance Requests", i: "wrench", tech: "CRUD, image upload, status machine",
        why: "Resident photographs leak, uploads, admin assigns plumber, status updates push in real-time. Auto-posts to #maintenance-updates.",
        decides: "Status: open, assigned, in_progress, resolved, closed. Images: Supabase Storage signed URLs. Assignment: admin picks vendor." },
      { n: "Payments and Billing", i: "card", tech: "Razorpay, UPI Autopay, invoices, reminders",
        why: "Monthly maintenance collection is WHY societies adopt this. UPI Autopay: authorize once, auto-debited (Rs 0 MDR, RBI compliant).",
        decides: "Razorpay Subscriptions API. Webhooks verify signature then update DB atomically. Invoice PDF via pdfkit, cached. Reminders: pg_cron 3 days before due." },
      { n: "Announcements and Polls", i: "mega", tech: "CRUD, pin, polls (JSONB), read receipts",
        why: "Community bulletin board. Admin posts, instant push to all. Polls for community decisions. Read receipts so admin knows who saw the AGM notice.",
        decides: "announcements table with is_pinned, poll_options JSONB. Read receipts: announcement_reads. Push via FCM topic." },
      { n: "Community Events", i: "cal", tech: "Event CRUD, RSVP, calendar, reminders",
        why: "Diwali party, AGM, yoga class. RSVP for headcount. Reminder 1hr before via pg_cron. Auto-post to #events.",
        decides: "events table: title, datetime, location, max_capacity. event_rsvps. pg_cron for reminders. Flutter table_calendar package." },
      { n: "Marketplace (Buy/Sell/Give)", i: "cart", tech: "Listings CRUD, images, interest DMs",
        why: "Residents sell furniture, exchange clothes. Keeps engagement high. No payment processing -- offline transactions. 'Interested' opens DM.",
        decides: "listings table: title, price (nullable for give-away), images[], status, expires_at. Auto-expire 30 days via pg_cron. Max 4 images." },
      { n: "Help Desk / Ticketing", i: "help", tech: "Ticket CRUD, priority, assignment, SLA",
        why: "Beyond maintenance: noise complaints, parking violations, rule-breaking. Priority levels. pg_cron: open > 48hrs escalates to committee head.",
        decides: "tickets table: category, priority (low/med/high), status, assigned_to. SLA: pg_cron hourly check. Categories configurable per community." },
      { n: "Service Bookings", i: "pkg", tech: "Subscription model, vendor delivery list",
        why: "Newspaper, milk, laundry -- residents subscribe, vendors see daily list. Pause/resume when traveling.",
        decides: "service_subscriptions: user_id, service_id, days_of_week[], active. Vendor view: filter today by service. No per-delivery payment." },
      { n: "Resident Directory", i: "users", tech: "Profiles, unit mapping, privacy, search",
        why: "Foundation: users, units, buildings, community. Privacy controls (phone, email visibility). Searchable within community.",
        decides: "users then unit_residents then units then buildings then communities. Privacy: visibility_settings JSONB. Full-text search on name." },
    ],
  },
  {
    id: "shared", zone: "SHARED PLATFORM SERVICES",
    desc: "Cross-cutting NestJS modules used by all feature modules. NOT separate microservices.",
    modules: [
      { n: "Tenant Context Middleware", i: "bld", tech: "NestJS Middleware, PostgreSQL RLS, JWT Claims",
        why: "Backbone of multi-tenancy. Every request: extract community_id from JWT, SET LOCAL on DB session, RLS ensures you ONLY see your community data. Even buggy app code cannot leak data.",
        decides: "NestJS global middleware: SET LOCAL app.current_community_id. Every table has community_id + RLS policy. Zero trust at DB level." },
      { n: "Notification Hub", i: "bell", tech: "FCM, Resend email, in-app, preferences",
        why: "Centralized notify(userId, event, data) that respects preferences. Per-channel mute, DND 10pm-7am, daily digest for muted channels.",
        decides: "notification_prefs table: user_id, channel_id, muted, dnd_start, dnd_end, digest_only. Check BEFORE every dispatch. Digest: pg_cron 8am." },
      { n: "@Mentions and Targeting", i: "at", tech: "@person, @channel, @admins, notification routing",
        why: "@person sends direct notification (bypasses mute). @channel notifies everyone (admin only, prevents spam). @admins reaches committee.",
        decides: "Parse @mentions before saving. message_mentions table. @channel triggers FCM topic. Rate limit: max 3 @channel/user/day." },
      { n: "File Upload Pipeline", i: "upload", tech: "Supabase Storage, signed URLs, compression",
        why: "Client compresses then gets signed URL from backend then uploads directly to Storage. Never through your NestJS server.",
        decides: "Client: flutter_image_compress. Backend: POST /upload/signed-url with type/size validation. Allowed: jpg/png/pdf/mp4. file_attachments table." },
      { n: "Search Service", i: "search", tech: "PostgreSQL tsvector + pg_trgm (no Elasticsearch)",
        why: "Postgres FTS is good enough for under 100K messages. GIN indexes. No Elasticsearch, no Meilisearch at this scale.",
        decides: "tsvector column on messages, announcements, listings, users. pg_trgm for fuzzy matching. /search?q=plumber&scope=messages,announcements." },
      { n: "Integration Bus", i: "zap", tech: "NestJS EventEmitter2, auto-posts to channels",
        why: "Gate check-in posts to #gate-log. Payment posts to DM. Maintenance update posts to #maintenance-updates. Makes channels feel alive.",
        decides: "EventEmitter2 events: gate.checkin, payment.received, etc. Listeners create system messages (is_system: true, different UI)." },
      { n: "Daily Digest Engine", i: "mail", tech: "pg_cron, aggregate unread, Resend email",
        why: "Most residents mute non-essential channels. Digest at 8am: 'You missed: 3 msgs in #general, 1 announcement'. Opt-in per user.",
        decides: "pg_cron 8am IST. Query unread per channel since last digest. Template email via Resend. Skip if zero unread." },
      { n: "Audit Logger", i: "clip", tech: "NestJS interceptor, audit_logs table",
        why: "Committee accountability: who changed the bill, who approved that visitor at 2am. Auto-logged on all mutations.",
        decides: "Interceptor on POST/PUT/DELETE. audit_logs: user_id, action, entity_type, entity_id, diff JSONB. 1yr retention." },
    ],
  },
  {
    id: "data", zone: "DATA LAYER",
    desc: "Supabase = Postgres + Realtime + Storage + Edge Functions. One platform, one bill. Don't self-host as a small team.",
    modules: [
      { n: "PostgreSQL (Supabase)", i: "db", tech: "RLS, pg_cron, tsvector, PgBouncer",
        why: "Relational data fits perfectly. RLS = multi-tenancy at DB level. pg_cron = scheduled jobs (bills, reminders, digest, cleanup). tsvector = search. All in one.",
        decides: "All tables: community_id + RLS. pg_cron: bill gen, reminders, listing expiry, digest, SLA. PgBouncer built-in. Daily backups automatic." },
      { n: "Redis (Upstash) - Deep Dive", i: "dot", tech: "Serverless Redis, cache, presence, rate limit, unread",
        why: "Speed layer. Without Redis every page hits Postgres -- fine at 100 users, painful at 10K. Session cache (15min TTL, saves JWT decode per request). Community settings cache (5min TTL). Online presence (SADD with 5min TTL, heartbeat refresh). Unread counts (HINCRBY per channel per user, instant badges without querying messages). Rate limiting (INCR + EXPIRE, 60 req/min). Channel last message preview (powers channel list without JOINs). Typing indicators (3s TTL, no DB writes ever).",
        decides: "Upstash free: 10K cmds/day. Keys: session:{hash}, community:{id}:settings, community:{id}:online, user:{id}:unread, channel:{id}:last, ratelimit:{uid}:{ep}. ALL keys have TTL. Redis is cache, not source of truth. If Redis dies: app slower, never broken." },
      { n: "Supabase Realtime", i: "radio", tech: "Postgres Changes, Presence, Broadcast",
        why: "Your WebSocket layer. No Socket.io, no Pusher. Supabase pushes row changes with RLS filters. Covers: chat, announcements, gate alerts, typing.",
        decides: "Channels: chat:{channel_id}, community:{id}. Presence: online users. Broadcast: typing indicators. All RLS-filtered." },
      { n: "Supabase Storage", i: "folder", tech: "S3-compatible, bucket RLS, image transforms",
        why: "All files: chat attachments, maintenance photos, marketplace, invoices. RLS on buckets. Built-in image transforms replace Cloudinary.",
        decides: "Buckets: chat-attachments, maintenance, marketplace, documents, invoices. Signed URLs (5min). Transforms: ?width=200 for thumbnails." },
    ],
  },
  {
    id: "external", zone: "THIRD-PARTY SERVICES",
    desc: "Services you pay for because building them is insane. Chosen for: cost, Flutter SDK quality, Indian market fit.",
    modules: [
      { n: "Firebase", i: "flame", tech: "Auth (Phone OTP), FCM (Push), Crashlytics",
        why: "Three critical services, one SDK, free to 50K MAU. Cheapest OTP. Only reliable cross-platform push. Crash reports before users complain.",
        decides: "Auth: Phone OTP + Google. FCM: topics (broadcast) + tokens (direct). Crashlytics: auto-enabled. Custom claims for tenant context." },
      { n: "Razorpay", i: "dollar", tech: "UPI Autopay, Subscriptions, Webhooks",
        why: "Best Indian gateway for recurring. UPI Autopay: authorize once, auto-debit monthly (Rs 0 MDR). Webhooks for async.",
        decides: "Subscriptions API. Webhooks verify signature then atomic update. UPI: 0% MDR. Test mode for dev." },
      { n: "Sentry", i: "bug", tech: "Error tracking, Performance, Alerts",
        why: "Crashlytics = mobile. Sentry = backend errors + slow APIs. Stack traces with context. Free: 5K errors/month.",
        decides: "SDK in NestJS + Flutter. Source maps in CI. Alert on new error types." },
      { n: "Resend", i: "mail", tech: "Transactional email, free 3K/month",
        why: "Digest emails, payment receipts, welcome emails. One POST call. Free 3K/month covers 100 communities.",
        decides: "Resend SDK in notification service. Templates: digest, receipt, welcome." },
    ],
  },
  {
    id: "infra", zone: "HOSTING AND DEVOPS",
    desc: "Managed platforms only. You are building a product, not operating servers.",
    modules: [
      { n: "Backend Hosting", i: "server", tech: "Railway ($5/mo) or Render free tier",
        why: "Push to GitHub, deployed in 60s. Railway Hobby: always-on, no cold starts. Render free: auto-sleeps (OK for early stage). No AWS/GCP/K8s.",
        decides: "Railway Hobby $5/mo for prod. Dockerfile in repo. Auto-deploy on push to main. Render free tier for staging." },
      { n: "CI/CD Pipeline", i: "git", tech: "GitHub Actions + Codemagic",
        why: "GitHub Actions: lint, test, deploy backend. Codemagic: Flutter builds + iOS signing. Both free tiers.",
        decides: "GH Actions: push main then lint then test then Railway deploy. Codemagic: tag then build then sign then publish stores." },
    ],
  },
];

const DB_SCHEMA = [
  "-- CORE",
  "communities        id, name, address, settings JSONB, created_at",
  "buildings          id, community_id, name, floor_count",
  "units              id, building_id, unit_number, type (1bhk|2bhk|3bhk)",
  "users              id, firebase_uid, name, phone, email, avatar_url, visibility JSONB",
  "unit_residents     user_id, unit_id, role (owner|tenant), is_primary",
  "",
  "-- COMMUNICATION (the Slack core)",
  "channels           id, community_id, name, type (default|custom|dm|system), created_by",
  "channel_members    channel_id, user_id, joined_at, role (member|admin), muted",
  "messages           id, channel_id, community_id, user_id, body, parent_message_id,",
  "                   is_pinned, pinned_by, is_system, reply_count, attachments JSONB,",
  "                   search_vector tsvector, created_at, edited_at",
  "reactions          message_id, user_id, emoji  UNIQUE(msg, user, emoji)",
  "message_mentions   message_id, mentioned_user_id, type (user|channel|role)",
  "channel_reads      user_id, channel_id, last_read_at",
  "",
  "-- FEATURES",
  "announcements      id, community_id, title, body, is_pinned, poll_options JSONB",
  "poll_votes         announcement_id, user_id, option_index",
  "visitor_passes     id, community_id, resident_id, visitor_name, qr_token, status",
  "maintenance_reqs   id, community_id, unit_id, category, description, images[],",
  "                   status (open|assigned|in_progress|resolved|closed), assigned_to",
  "payments           id, community_id, unit_id, amount, razorpay_id, status, due_date",
  "events             id, community_id, title, location, start_at, end_at, max_attendees",
  "event_rsvps        event_id, user_id, status (going|maybe|not_going)",
  "marketplace        id, community_id, user_id, title, price, images[], expires_at",
  "tickets            id, community_id, created_by, category, priority, assigned_to, status",
  "service_subs       id, community_id, user_id, service_type, days_of_week[], active",
  "",
  "-- SYSTEM",
  "notification_prefs user_id, channel_id, muted, dnd_start, dnd_end, digest_only",
  "file_attachments   id, entity_type, entity_id, storage_path, file_name, mime_type",
  "audit_logs         id, community_id, user_id, action, entity_type, entity_id, diff JSONB",
].join("\n");

const REDIS_PATTERNS = [
  "# -- Session and Auth --",
  "SET   session:{jwt_hash}       {uid, community_id, role}   EX 900    # 15min",
  "# Saves JWT decode + claims lookup on every request",
  "",
  "# -- Community Settings Cache --",
  "HSET  community:{id}:settings  features  '[gate,chat,payments]'",
  "EXPIRE community:{id}:settings 300                                    # 5min",
  "# Read on every app open. Invalidate on admin change.",
  "",
  "# -- Online Presence --",
  "SADD   community:{id}:online   user_123     # heartbeat every 30s",
  "EXPIRE community:{id}:online   300          # auto-cleanup 5min",
  "SCARD  community:{id}:online                # '12 residents online'",
  "",
  "# -- Unread Counts (fastest possible) --",
  "HINCRBY user:{id}:unread  channel_456  1    # new message: increment",
  "HDEL    user:{id}:unread  channel_456       # user reads: reset",
  "HGETALL user:{id}:unread                    # all badge counts instantly",
  "# Why? SELECT COUNT WHERE created_at > last_read per channel = slow",
  "",
  "# -- Channel Preview (channel list screen) --",
  "HSET  channel:{id}:last  preview  'Amit: Has anyone seen...'",
  "HSET  channel:{id}:last  ts       '2026-02-02T10:30:00Z'",
  "EXPIRE channel:{id}:last 3600               # 1hr, refresh on new msg",
  "# Powers channel list without JOIN messages + users",
  "",
  "# -- Rate Limiting --",
  "INCR   ratelimit:{uid}:api       # per-minute counter",
  "EXPIRE ratelimit:{uid}:api  60   # resets every 60s, reject if > 60",
  "INCR   ratelimit:{uid}:at_channel       # @channel per day",
  "EXPIRE ratelimit:{uid}:at_channel 86400 # 24hr, max 3",
  "",
  "# -- Typing Indicators --",
  "SET   typing:{channel}:{uid}  1  EX 3   # 3s TTL, auto-expires",
  "# Ephemeral. No DB writes. No cleanup.",
  "",
  "# PRINCIPLE: Redis = cache, not truth.",
  "# All keys have TTL. If Redis dies: slower, never broken.",
].join("\n");

const SECURITY = [
  "-- JWT FLOW --",
  "Client: Firebase Auth (Phone OTP) gives JWT {community_id, role, unit_id}",
  "Client: Authorization: Bearer token on every request",
  "NestJS AuthGuard: Firebase Admin SDK validates token",
  "NestJS RoleGuard: @Roles() decorator checks claims.role",
  "",
  "-- TENANT ISOLATION (3 layers) --",
  "1. JWT has community_id (Firebase-signed, cannot be spoofed)",
  "2. NestJS Middleware: SET LOCAL app.current_community_id",
  "3. PostgreSQL RLS: USING (community_id = current_setting(...))",
  "   Even raw SQL cannot bypass. DB enforces, not app code.",
  "",
  "-- ROLES --",
  "resident         read + own CRUD + chat + react + RSVP + marketplace",
  "committee_member +pin, +announcements, +assign tickets, +moderate",
  "gate_staff       gate module only (check-in, visitor logs)",
  "community_admin  full access (billing, residents, settings, audit)",
  "",
  "-- CHECKLIST --",
  "[x] JWT every request   [x] RLS every table   [x] Role-based endpoints",
  "[x] Rate limit (Redis)  [x] Input validation  [x] Signed upload URLs",
  "[x] Razorpay sig verify [x] CORS whitelist    [x] Helmet headers",
].join("\n");

const API_PATTERNS = [
  "-- REST CONVENTIONS --",
  "GET    /api/v1/channels                  list (community via RLS)",
  "GET    /api/v1/channels/:id/messages     paginated (cursor-based)",
  "POST   /api/v1/channels/:id/messages     send message",
  "POST   /api/v1/messages/:id/reactions    toggle reaction",
  "POST   /api/v1/messages/:id/pin          pin (admin/committee)",
  "GET    /api/v1/search?q=wifi&scope=messages,announcements",
  "",
  "-- CURSOR PAGINATION (not offset) --",
  "GET /messages?channel_id=X&before=cursor_val&limit=30",
  "Returns: { data: [...], cursor: { before: 'msg_abc' }, has_more: true }",
  "Why: consistent during real-time inserts. Offset skips on new data.",
  "",
  "-- ERROR FORMAT --",
  "{ error: { code: 'NOT_FOUND', message: '...', status: 404 } }",
  "Codes: SCREAMING_SNAKE for easy client matching.",
  "",
  "-- WEBHOOKS (Razorpay) --",
  "POST /api/v1/webhooks/razorpay",
  "1. Verify X-Razorpay-Signature  2. Idempotency check (payment_id)",
  "3. Atomic transaction            4. Respond 200 immediately",
].join("\n");

const ENV_SETUP = [
  "-- ENVIRONMENTS --",
  "local       Supabase local (Docker), NestJS dev, Flutter emulator",
  "staging     Supabase free cloud, Railway (dev branch), TestFlight",
  "production  Supabase Pro, Railway Hobby ($5), App Store / Play Store",
  "",
  "-- .env VARIABLES --",
  "SUPABASE_URL            SUPABASE_ANON_KEY       SUPABASE_SERVICE_KEY",
  "FIREBASE_PROJECT_ID     FIREBASE_SERVICE_ACCOUNT (JSON, backend only)",
  "RAZORPAY_KEY_ID         RAZORPAY_KEY_SECRET     RAZORPAY_WEBHOOK_SECRET",
  "SENTRY_DSN              UPSTASH_REDIS_URL       UPSTASH_REDIS_TOKEN",
  "PORT=3000               NODE_ENV=production",
  "",
  "-- LOCAL SETUP (5 min) --",
  "1. git clone and npm install",
  "2. cp .env.example .env",
  "3. npx supabase start",
  "4. npm run migration:run",
  "5. npm run seed (2 communities, 10 users, sample data)",
  "6. npm run start:dev on localhost:3000",
  "7. Flutter: update env.dart then flutter run",
].join("\n");

const FLUTTER_DIR = [
  "lib/",
  "  core/",
  "    config/          env, supabase, dio",
  "    auth/            auth provider, guards",
  "    tenant/          tenant context provider",
  "    notifications/   FCM, preference helpers",
  "    realtime/        supabase subscriptions",
  "    theme/           colors, typography",
  "  features/",
  "    channels/        list, chat, threads, reactions",
  "    gate/            guard view, passes, QR",
  "    maintenance/     requests, status tracking",
  "    payments/        billing, razorpay, receipts",
  "    announcements/   notices, polls",
  "    events/          calendar, RSVP",
  "    marketplace/     listings, buy/sell",
  "    helpdesk/        tickets, complaints",
  "    services/        bookings, subscriptions",
  "    directory/       profiles, search",
  "    settings/        notification prefs, DND",
  "    search/          unified search",
  "  shared/",
  "    widgets/         message bubble, tile, badge",
  "    models/          freezed data models",
  "    utils/           formatters, validators",
  "  main.dart",
].join("\n");

const NESTJS_DIR = [
  "src/",
  "  modules/",
  "    auth/            JWT guard, role decorator",
  "    channels/        CRUD, members, defaults",
  "    messages/        threads, reactions, pins, mentions",
  "    gate/            passes, QR, check-in",
  "    maintenance/     requests, assignment, status",
  "    payments/        razorpay, webhooks, billing",
  "    announcements/   notices, polls, votes",
  "    events/          CRUD, RSVP, reminders",
  "    marketplace/     listings, expiry",
  "    helpdesk/        tickets, priority, SLA",
  "    services/        subscriptions, vendor",
  "    directory/       profiles, units, search",
  "    search/          unified FTS endpoint",
  "  shared/",
  "    tenant/          middleware, RLS",
  "    notifications/   FCM, email, prefs, digest",
  "    integrations/    event bus, auto-post",
  "    upload/          signed URLs, validation",
  "    redis/           Upstash client, cache, presence",
  "    audit/           interceptor, logs",
  "  database/",
  "    migrations/",
  "    seeds/",
  "  app.module.ts",
  "  main.ts",
].join("\n");

const STACK = [
  ["Mobile", "Flutter 3.x + Riverpod + GoRouter + Dio"],
  ["Backend", "NestJS + TypeScript + Prisma"],
  ["Database", "Supabase PostgreSQL + RLS + pg_cron"],
  ["Cache", "Upstash Redis (serverless)"],
  ["Search", "PostgreSQL tsvector (built-in)"],
  ["Auth", "Firebase Auth (Phone OTP)"],
  ["Push", "Firebase Cloud Messaging"],
  ["Payments", "Razorpay (UPI Autopay)"],
  ["Storage", "Supabase Storage (S3)"],
  ["Realtime", "Supabase Realtime"],
  ["Email", "Resend (free 3K/month)"],
  ["Hosting", "Railway ($5/mo)"],
  ["CI/CD", "GitHub Actions + Codemagic"],
  ["Errors", "Sentry + Crashlytics"],
];

const REDIS_CODE = [
  "// -- Upstash Setup (REST-based, no persistent connection) --",
  "// npm install @upstash/redis",
  "// shared/redis/redis.service.ts",
  "",
  "import { Redis } from '@upstash/redis'",
  "",
  "const redis = new Redis({",
  "  url: process.env.UPSTASH_REDIS_URL,",
  "  token: process.env.UPSTASH_REDIS_TOKEN,",
  "})",
  "",
  "// -- Session Cache --",
  "async cacheSession(jwtHash: string, claims: Claims) {",
  "  await redis.set('session:' + jwtHash, JSON.stringify(claims), { ex: 900 })",
  "}",
  "async getSession(jwtHash: string): Promise<Claims | null> {",
  "  const data = await redis.get('session:' + jwtHash)",
  "  return data ? JSON.parse(data as string) : null",
  "}",
  "",
  "// -- Unread Counts --",
  "async incrUnread(userId: string, channelId: string) {",
  "  await redis.hincrby('user:' + userId + ':unread', channelId, 1)",
  "}",
  "async clearUnread(userId: string, channelId: string) {",
  "  await redis.hdel('user:' + userId + ':unread', channelId)",
  "}",
  "async getAllUnread(userId: string): Promise<Record<string, number>> {",
  "  return await redis.hgetall('user:' + userId + ':unread') || {}",
  "}",
  "",
  "// -- Presence --",
  "async heartbeat(communityId: string, userId: string) {",
  "  await redis.sadd('community:' + communityId + ':online', userId)",
  "  await redis.expire('community:' + communityId + ':online', 300)",
  "}",
  "async getOnlineCount(communityId: string): Promise<number> {",
  "  return await redis.scard('community:' + communityId + ':online')",
  "}",
  "",
  "// -- Rate Limit Middleware --",
  "async checkRateLimit(userId: string, limit = 60): Promise<boolean> {",
  "  const key = 'ratelimit:' + userId + ':api'",
  "  const count = await redis.incr(key)",
  "  if (count === 1) await redis.expire(key, 60)",
  "  return count <= limit  // true = allowed, false = reject 429",
  "}",
  "",
  "// -- Channel Preview --",
  "async setChannelPreview(channelId: string, msg: { author: string, preview: string }) {",
  "  const key = 'channel:' + channelId + ':last'",
  "  await redis.hset(key, { preview: msg.preview, author: msg.author, ts: new Date().toISOString() })",
  "  await redis.expire(key, 3600)",
  "}",
  "",
  "// -- Cache Invalidation Rules --",
  "// community settings: bust on admin PUT /settings",
  "//   await redis.del('community:' + communityId + ':settings')",
  "// channel preview:   auto-overwrite on every new message",
  "// session:           auto-expires 15min, no manual bust needed",
  "// unread:            reset on channel read, increment on new message",
  "// presence:          auto-expires 5min if heartbeat stops",
  "// typing:            auto-expires 3s, never manually deleted",
].join("\n");

const RLS_POLICIES = [
  "-- Every table gets this base policy",
  "ALTER TABLE messages ENABLE ROW LEVEL SECURITY;",
  "",
  "CREATE POLICY tenant_isolation ON messages",
  "  USING (community_id = current_setting('app.current_community_id')::uuid);",
  "",
  "-- NestJS middleware sets this per-request:",
  "-- SET LOCAL app.current_community_id = 'uuid-from-jwt';",
  "-- SET LOCAL resets automatically at end of transaction",
  "",
  "-- Channel members: only see channels you belong to",
  "CREATE POLICY channel_member_access ON messages",
  "  USING (",
  "    community_id = current_setting('app.current_community_id')::uuid",
  "    AND channel_id IN (",
  "      SELECT channel_id FROM channel_members",
  "      WHERE user_id = current_setting('app.current_user_id')::uuid",
  "    )",
  "  );",
  "",
  "-- Admin-only write on announcements",
  "CREATE POLICY admin_write_announcements ON announcements",
  "  FOR INSERT",
  "  WITH CHECK (",
  "    community_id = current_setting('app.current_community_id')::uuid",
  "    AND current_setting('app.current_role') IN ('admin', 'committee_member')",
  "  );",
  "",
  "-- Storage bucket policy (Supabase dashboard)",
  "-- Bucket: chat-attachments",
  "-- SELECT: community_id matches JWT claim",
  "-- INSERT: authenticated + community_id matches + file_size < 5MB",
].join("\n");

const INDEXES = [
  "-- Performance-critical indexes",
  "",
  "-- Messages: main query is 'latest messages in channel'",
  "CREATE INDEX idx_messages_channel_created",
  "  ON messages(channel_id, created_at DESC)",
  "  WHERE parent_message_id IS NULL;  -- only top-level",
  "",
  "-- Messages: thread replies",
  "CREATE INDEX idx_messages_parent",
  "  ON messages(parent_message_id, created_at ASC)",
  "  WHERE parent_message_id IS NOT NULL;",
  "",
  "-- Full-text search (GIN index on tsvector)",
  "CREATE INDEX idx_messages_search ON messages USING GIN(search_vector);",
  "CREATE INDEX idx_announcements_search ON announcements USING GIN(search_vector);",
  "",
  "-- Fuzzy search (pg_trgm)",
  "CREATE EXTENSION IF NOT EXISTS pg_trgm;",
  "CREATE INDEX idx_users_name_trgm ON users USING GIN(name gin_trgm_ops);",
  "",
  "-- Unread tracking",
  "CREATE INDEX idx_channel_reads ON channel_reads(user_id, channel_id);",
  "",
  "-- Visitor passes: guard scans QR frequently",
  "CREATE UNIQUE INDEX idx_visitor_qr ON visitor_passes(qr_token);",
  "",
  "-- Payments: due date lookups for reminders",
  "CREATE INDEX idx_payments_due ON payments(due_date, status)",
  "  WHERE status = 'pending';",
  "",
  "-- Marketplace: active listings per community",
  "CREATE INDEX idx_marketplace_active",
  "  ON marketplace(community_id, created_at DESC)",
  "  WHERE status = 'active';",
  "",
  "-- Audit log: lookup by entity",
  "CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);",
  "",
  "-- Community scoping (every major table)",
  "-- btree on community_id -- Postgres adds automatically for FK",
  "-- but verify with EXPLAIN ANALYZE on your slowest queries",
].join("\n");

const ALL_API_ENDPOINTS = [
  "-- AUTH --",
  "POST   /api/v1/auth/verify-token         validate Firebase JWT, return user",
  "POST   /api/v1/auth/register             create user + assign to community",
  "",
  "-- CHANNELS --",
  "GET    /api/v1/channels                   list my channels (RLS scoped)",
  "POST   /api/v1/channels                   create channel (admin)",
  "GET    /api/v1/channels/:id               channel detail + member count",
  "PUT    /api/v1/channels/:id               update name/description (admin)",
  "POST   /api/v1/channels/:id/join          join public channel",
  "POST   /api/v1/channels/:id/leave         leave channel",
  "GET    /api/v1/channels/:id/members       list members",
  "GET    /api/v1/channels/:id/pinned        list pinned messages",
  "",
  "-- MESSAGES --",
  "GET    /api/v1/channels/:id/messages      paginated (cursor: ?before=ts&limit=30)",
  "POST   /api/v1/channels/:id/messages      send message { body, parent_message_id? }",
  "PUT    /api/v1/messages/:id               edit message { body }",
  "DELETE /api/v1/messages/:id               delete own message",
  "POST   /api/v1/messages/:id/pin           pin message (admin/committee)",
  "DELETE /api/v1/messages/:id/pin           unpin message",
  "POST   /api/v1/messages/:id/reactions     toggle { emoji } -- upsert/delete",
  "GET    /api/v1/messages/:id/thread        get thread replies (cursor paginated)",
  "",
  "-- GATE --",
  "POST   /api/v1/gate/visitors              create pass { name, phone, expected_at }",
  "GET    /api/v1/gate/visitors              list my passes",
  "POST   /api/v1/gate/visitors/:id/approve  resident approves",
  "POST   /api/v1/gate/visitors/:id/deny     resident denies",
  "POST   /api/v1/gate/scan                  guard scans QR { qr_token }",
  "POST   /api/v1/gate/checkout/:id          guard checks out visitor",
  "GET    /api/v1/gate/log                   today's gate log (guard view)",
  "",
  "-- MAINTENANCE --",
  "POST   /api/v1/maintenance                create request { category, desc, images[] }",
  "GET    /api/v1/maintenance                list my requests / all (admin)",
  "PUT    /api/v1/maintenance/:id/assign     assign vendor (admin)",
  "PUT    /api/v1/maintenance/:id/status     update status (admin/vendor)",
  "",
  "-- PAYMENTS --",
  "GET    /api/v1/payments/invoices          list my invoices",
  "POST   /api/v1/payments/create-order      razorpay order { invoice_id }",
  "POST   /api/v1/webhooks/razorpay          razorpay callback (verify sig)",
  "GET    /api/v1/payments/receipts/:id      download receipt PDF",
  "",
  "-- ANNOUNCEMENTS --",
  "POST   /api/v1/announcements              create (admin) { title, body, poll? }",
  "GET    /api/v1/announcements              list (paginated)",
  "POST   /api/v1/announcements/:id/read     mark read",
  "POST   /api/v1/announcements/:id/vote     cast poll vote { option_index }",
  "",
  "-- EVENTS --",
  "POST   /api/v1/events                     create event (admin)",
  "GET    /api/v1/events                     list upcoming",
  "POST   /api/v1/events/:id/rsvp            RSVP { status: going|maybe|not_going }",
  "",
  "-- MARKETPLACE --",
  "POST   /api/v1/marketplace                create listing { title, price?, images[] }",
  "GET    /api/v1/marketplace                browse active listings",
  "POST   /api/v1/marketplace/:id/interest   express interest (opens DM)",
  "PUT    /api/v1/marketplace/:id/sold       mark as sold",
  "",
  "-- HELPDESK --",
  "POST   /api/v1/tickets                    create ticket { category, description }",
  "GET    /api/v1/tickets                    list my tickets / all (admin)",
  "PUT    /api/v1/tickets/:id/assign         assign to committee member (admin)",
  "PUT    /api/v1/tickets/:id/status         update status",
  "",
  "-- UPLOAD --",
  "POST   /api/v1/upload/signed-url          get signed URL { type, size, entity }",
  "  Response: { url, key, expires_in: 60 }",
  "",
  "-- SEARCH --",
  "GET    /api/v1/search?q=plumber&scope=messages,announcements,listings",
  "  Response: { messages: [...], announcements: [...], listings: [...] }",
  "",
  "-- USER --",
  "GET    /api/v1/users/me                   my profile + unit + community",
  "PUT    /api/v1/users/me                   update profile / visibility",
  "GET    /api/v1/users/me/unread            all unread counts (from Redis)",
  "PUT    /api/v1/users/me/notifications     update notification prefs",
  "GET    /api/v1/directory                  community directory (RLS scoped)",
].join("\n");

const REALTIME_PATTERNS = [
  "// -- Supabase Realtime (Flutter client) --",
  "",
  "// Listen to new messages in a channel",
  "final channel = supabase.channel('chat:channel_456');",
  "channel.onPostgresChanges(",
  "  event: PostgresChangeEvent.insert,",
  "  schema: 'public',",
  "  table: 'messages',",
  "  filter: PostgresChangeFilter(",
  "    type: PostgresChangeFilterType.eq,",
  "    column: 'channel_id',",
  "    value: 'channel_456',",
  "  ),",
  "  callback: (payload) {",
  "    final newMsg = Message.fromJson(payload.newRecord);",
  "    ref.read(messagesProvider.notifier).addMessage(newMsg);",
  "  },",
  ").subscribe();",
  "",
  "// -- Typing Indicators (Broadcast, not DB) --",
  "channel.sendBroadcastMessage(",
  "  event: 'typing',",
  "  payload: { 'user_id': currentUser.id, 'name': currentUser.name },",
  ");",
  "channel.onBroadcast(",
  "  event: 'typing',",
  "  callback: (payload) => showTypingIndicator(payload),",
  ");",
  "",
  "// -- Presence (online users) --",
  "channel.onPresenceSync((state) {",
  "  final online = state.values.map((p) => p.first).toList();",
  "  ref.read(onlineUsersProvider.notifier).update(online);",
  "});",
  "channel.track({ 'user_id': currentUser.id });",
  "",
  "// -- Gate Alert (community-wide, filtered by RLS) --",
  "supabase.channel('gate:community_123')",
  "  .onPostgresChanges(",
  "    event: PostgresChangeEvent.insert,",
  "    table: 'visitor_passes',",
  "    filter: PostgresChangeFilter.eq('resident_id', currentUser.id),",
  "    callback: (p) => showGateApprovalDialog(p.newRecord),",
  "  ).subscribe();",
].join("\n");

const FCM_PATTERNS = [
  "// -- FCM Topic Naming Convention --",
  "// community:{community_id}:all           all members (announcements)",
  "// community:{community_id}:admins        admin-only alerts",
  "// community:{community_id}:guards        guard shift alerts",
  "// channel:{channel_id}                   per-channel messages",
  "",
  "// -- Subscribe on login (Flutter) --",
  "FirebaseMessaging.instance.subscribeToTopic('community:uuid:all');",
  "// Subscribe to each non-muted channel",
  "for (final ch in myChannels.where((c) => !c.muted)) {",
  "  FirebaseMessaging.instance.subscribeToTopic('channel:' + ch.id);",
  "}",
  "",
  "// -- Send from NestJS --",
  "// Direct push (gate approval, DM, @mention)",
  "await admin.messaging().send({",
  "  token: userDeviceToken,",
  "  notification: { title: 'Gate: Visitor arrived', body: 'Amit Kumar at Main Gate' },",
  "  data: { type: 'gate_approval', visitor_id: '123' },",
  "  android: { priority: 'high' },",
  "  apns: { payload: { aps: { sound: 'default', badge: 1 } } },",
  "});",
  "",
  "// Topic push (announcement, @channel)",
  "await admin.messaging().send({",
  "  topic: 'community:uuid:all',",
  "  notification: { title: 'New Announcement', body: title },",
  "  data: { type: 'announcement', id: announcementId },",
  "});",
  "",
  "// -- Notification Payload Structure --",
  "// data.type determines Flutter navigation:",
  "//   gate_approval  -> GateApprovalScreen(visitor_id)",
  "//   message        -> ChatScreen(channel_id)",
  "//   announcement   -> AnnouncementDetail(id)",
  "//   maintenance    -> MaintenanceDetail(id)",
  "//   payment        -> PaymentScreen(invoice_id)",
  "//   event          -> EventDetail(id)",
].join("\n");

const PGCRON_JOBS = [
  "-- All pg_cron jobs (Supabase dashboard or migration)",
  "",
  "-- Monthly bill generation (1st of month, midnight IST)",
  "SELECT cron.schedule('generate-bills', '30 18 28 * *',  -- 28th ~midnight IST",
  "  'SELECT generate_monthly_bills()');",
  "",
  "-- Payment reminders (daily 10am IST for dues in 3 days)",
  "SELECT cron.schedule('payment-reminders', '30 4 * * *',",
  "  'SELECT send_payment_reminders()');",
  "",
  "-- Overdue marking (daily midnight, mark unpaid past due_date)",
  "SELECT cron.schedule('mark-overdue', '30 18 * * *',",
  "  'UPDATE payments SET status = ''overdue''",
  "   WHERE status = ''pending'' AND due_date < CURRENT_DATE');",
  "",
  "-- Daily digest email (8am IST)",
  "SELECT cron.schedule('daily-digest', '30 2 * * *',",
  "  'SELECT send_daily_digest()');",
  "",
  "-- Marketplace listing expiry (daily midnight)",
  "SELECT cron.schedule('expire-listings', '30 18 * * *',",
  "  'UPDATE marketplace SET status = ''expired''",
  "   WHERE status = ''active'' AND expires_at < NOW()');",
  "",
  "-- Help desk SLA escalation (hourly)",
  "SELECT cron.schedule('sla-escalation', '0 * * * *',",
  "  'SELECT escalate_overdue_tickets()');",
  "",
  "-- Event reminders (every 30 min, events starting within 1hr)",
  "SELECT cron.schedule('event-reminders', '*/30 * * * *',",
  "  'SELECT send_event_reminders()');",
  "",
  "-- Cleanup expired visitor passes (daily 2am IST)",
  "SELECT cron.schedule('cleanup-passes', '30 20 * * *',",
  "  'DELETE FROM visitor_passes",
  "   WHERE status = ''expired'' AND created_at < NOW() - interval ''30 days''');",
].join("\n");

const TESTING_STRATEGY = [
  "-- Testing Pyramid --",
  "",
  "Unit Tests (jest, 70% of tests):",
  "  services/*.spec.ts   - business logic, no DB",
  "  Mock: PrismaService, RedisService, FirebaseAdmin",
  "  Example: MessageService.parseMentions('@amit @channel hello')",
  "    -> [{ type: 'user', name: 'amit' }, { type: 'channel' }]",
  "",
  "Integration Tests (jest + testcontainers, 25%):",
  "  *.e2e-spec.ts  - real DB, real Redis, mocked Firebase",
  "  Setup: testcontainers/postgres + testcontainers/redis",
  "  Test: POST /channels/:id/messages -> DB has row + Redis unread +1",
  "  Test: RLS isolation: user A cannot read community B messages",
  "",
  "E2E / Smoke Tests (5%):",
  "  Flutter integration_test/ - critical happy paths only:",
  "    1. Login with OTP -> see channel list",
  "    2. Send message -> appears in channel",
  "    3. Create visitor pass -> QR generated",
  "    4. Pay invoice -> Razorpay test mode -> status updated",
  "",
  "-- Test Commands --",
  "npm run test              # unit tests",
  "npm run test:e2e          # integration tests (needs Docker)",
  "npm run test:cov          # coverage report",
  "flutter test              # widget + unit tests",
  "flutter test integration_test/  # device tests",
  "",
  "-- CI Pipeline --",
  "Every PR: lint -> unit tests -> integration tests",
  "Main branch: + deploy staging -> smoke test -> deploy prod",
].join("\n");

const DEPLOY_DOCKERFILE = [
  "# -- Dockerfile (NestJS backend) --",
  "FROM node:20-alpine AS builder",
  "WORKDIR /app",
  "COPY package*.json ./",
  "RUN npm ci --only=production",
  "COPY . .",
  "RUN npm run build",
  "",
  "FROM node:20-alpine",
  "WORKDIR /app",
  "COPY --from=builder /app/dist ./dist",
  "COPY --from=builder /app/node_modules ./node_modules",
  "COPY --from=builder /app/package.json ./",
  "EXPOSE 3000",
  "ENV NODE_ENV=production",
  "HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1",
  "CMD [\"node\", \"dist/main.js\"]",
].join("\n");

const GITHUB_ACTIONS = [
  "# -- .github/workflows/deploy.yml --",
  "name: CI/CD",
  "on:",
  "  push:",
  "    branches: [main, develop]",
  "  pull_request:",
  "    branches: [main]",
  "",
  "jobs:",
  "  test:",
  "    runs-on: ubuntu-latest",
  "    services:",
  "      postgres:",
  "        image: postgres:15",
  "        env:",
  "          POSTGRES_DB: test",
  "          POSTGRES_PASSWORD: test",
  "        ports: ['5432:5432']",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - uses: actions/setup-node@v4",
  "        with: { node-version: 20 }",
  "      - run: npm ci",
  "      - run: npm run lint",
  "      - run: npm run test",
  "      - run: npm run test:e2e",
  "",
  "  deploy-staging:",
  "    needs: test",
  "    if: github.ref == 'refs/heads/develop'",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - uses: railwayapp/cli-action@v1",
  "        with:",
  "          service: backend-staging",
  "        env:",
  "          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN_STAGING }}",
  "",
  "  deploy-prod:",
  "    needs: test",
  "    if: github.ref == 'refs/heads/main'",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - uses: railwayapp/cli-action@v1",
  "        with:",
  "          service: backend-prod",
  "        env:",
  "          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN_PROD }}",
].join("\n");

const ERROR_HANDLING = [
  "// -- Global Error Filter (NestJS) --",
  "// src/shared/filters/http-exception.filter.ts",
  "",
  "@Catch()",
  "export class GlobalExceptionFilter implements ExceptionFilter {",
  "  catch(exception: unknown, host: ArgumentsHost) {",
  "    const ctx = host.switchToHttp();",
  "    const res = ctx.getResponse();",
  "",
  "    let status = 500;",
  "    let code = 'INTERNAL_ERROR';",
  "    let message = 'Something went wrong';",
  "",
  "    if (exception instanceof HttpException) {",
  "      status = exception.getStatus();",
  "      code = exception.getResponse()['code'] || 'HTTP_ERROR';",
  "      message = exception.message;",
  "    }",
  "",
  "    // Log to Sentry for 5xx",
  "    if (status >= 500) Sentry.captureException(exception);",
  "",
  "    res.status(status).json({",
  "      error: { code, message, status },",
  "    });",
  "  }",
  "}",
  "",
  "// -- Custom Exceptions --",
  "throw new NotFoundException({ code: 'CHANNEL_NOT_FOUND', message: '...' })",
  "throw new ForbiddenException({ code: 'NOT_CHANNEL_MEMBER', message: '...' })",
  "throw new BadRequestException({ code: 'INVALID_EMOJI', message: '...' })",
  "throw new TooManyRequestsException({ code: 'RATE_LIMITED', message: '...' })",
  "",
  "// -- Consistent Error Codes --",
  "// AUTH_INVALID_TOKEN    401   JWT expired or malformed",
  "// AUTH_NO_COMMUNITY     403   user not assigned to any community",
  "// NOT_FOUND             404   entity does not exist (or RLS hides it)",
  "// FORBIDDEN             403   role insufficient",
  "// RATE_LIMITED           429   Redis counter exceeded",
  "// VALIDATION_ERROR      400   DTO validation failed (class-validator)",
  "// RAZORPAY_SIG_INVALID  400   webhook signature mismatch",
  "// FILE_TOO_LARGE        413   upload exceeds limit",
  "// INTERNAL_ERROR        500   unexpected (logged to Sentry)",
].join("\n");

const RAZORPAY_WEBHOOK = [
  "// -- Razorpay Webhook Handler --",
  "// POST /api/v1/webhooks/razorpay",
  "",
  "@Post('webhooks/razorpay')",
  "async handleRazorpay(@Req() req, @Res() res) {",
  "  // 1. Verify signature",
  "  const signature = req.headers['x-razorpay-signature'];",
  "  const expected = crypto",
  "    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)",
  "    .update(JSON.stringify(req.body))",
  "    .digest('hex');",
  "  if (signature !== expected) return res.status(400).send('Invalid sig');",
  "",
  "  // 2. Idempotency check",
  "  const paymentId = req.body.payload.payment.entity.id;",
  "  const existing = await this.prisma.payment.findFirst({",
  "    where: { razorpay_id: paymentId },",
  "  });",
  "  if (existing) return res.status(200).send('Already processed');",
  "",
  "  // 3. Atomic update",
  "  await this.prisma.$transaction(async (tx) => {",
  "    await tx.payment.update({",
  "      where: { invoice_id: req.body.payload.payment.entity.notes.invoice_id },",
  "      data: { status: 'paid', razorpay_id: paymentId, paid_at: new Date() },",
  "    });",
  "    // Post system message to user DM",
  "    await this.integrations.postPaymentConfirmation(invoiceId);",
  "  });",
  "",
  "  // 4. Respond immediately",
  "  return res.status(200).send('OK');",
  "}",
].join("\n");

const HEALTH_MONITORING = [
  "// -- Health Check Endpoint --",
  "// GET /health (no auth required)",
  "",
  "@Get('health')",
  "async healthCheck() {",
  "  const db = await this.prisma.$queryRaw('SELECT 1');",
  "  const redis = await this.redis.ping();",
  "  return {",
  "    status: 'ok',",
  "    timestamp: new Date().toISOString(),",
  "    services: {",
  "      database: db ? 'healthy' : 'down',",
  "      redis: redis === 'PONG' ? 'healthy' : 'down',",
  "    },",
  "  };",
  "}",
  "",
  "// -- Structured Logging (NestJS Pino) --",
  "// npm install nestjs-pino pino-pretty",
  "// Automatically logs: request_id, method, url, status, duration_ms",
  "// In production: JSON logs -> Railway log drain -> Datadog/Grafana (future)",
  "",
  "// -- Uptime Monitoring --",
  "// Free: UptimeRobot (5min intervals, 50 monitors free)",
  "// Monitors: GET /health every 5min",
  "// Alert: Slack webhook or email on 2 consecutive failures",
  "",
  "// -- Key Metrics to Track --",
  "// Sentry: error rate, P95 response time, slow transactions",
  "// Railway: CPU%, memory%, request count",
  "// Supabase dashboard: active connections, DB size, realtime connections",
  "// Upstash dashboard: commands/day, hit rate, latency",
].join("\n");

function Expand({ open, children }) {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    if (ref.current) setH(open ? ref.current.scrollHeight : 0);
  }, [open, children]);
  return (
    <div style={{ overflow: "hidden", maxHeight: h, opacity: open ? 1 : 0, transition: "max-height 0.3s ease, opacity 0.2s ease" }}>
      <div ref={ref}>{children}</div>
    </div>
  );
}

function ModuleCard({ mod, compact }) {
  const [open, setOpen] = useState(false);
  const c = compact;
  return (
    <div style={{ borderRadius: 6, border: "1px solid " + (open ? "rgba(0,0,0,0.5)" : BDL), background: open ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.012)", transition: "all 0.2s", overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: c ? 7 : 9, padding: c ? "8px 9px" : "9px 12px", cursor: "pointer", userSelect: "none" }}>
        <div style={{ width: c ? 26 : 30, height: c ? 26 : 30, borderRadius: 5, background: open ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.025)", border: "1px solid " + (open ? "rgba(0,0,0,0.5)" : BDL), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name={mod.i} color={open ? W9 : W5} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: c ? 11 : 12, fontWeight: 600, color: open ? W : W9 }}>{mod.n}</div>
          <div style={{ fontSize: c ? 8.5 : 9.5, color: W4, marginTop: 1, fontFamily: mono, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mod.tech}</div>
        </div>
        <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0, transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "none", opacity: 0.35 }}><polygon points="1,3 9,3 5,7" fill={W} /></svg>
      </div>
      <Expand open={open}>
        <div style={{ padding: c ? "0 9px 10px" : "0 12px 12px", borderTop: "1px solid " + BDL }}>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: W5, letterSpacing: "0.1em", fontFamily: mono, marginBottom: 4 }}>WHY THIS EXISTS</div>
            <div style={{ fontSize: 11.5, color: W7, lineHeight: 1.6 }}>{mod.why}</div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: W5, letterSpacing: "0.1em", fontFamily: mono, marginBottom: 4 }}>KEY DECISIONS</div>
            <div style={{ fontSize: 11, color: W7, lineHeight: 1.6, padding: "8px 10px", borderRadius: 4, background: "rgba(0,0,0,0.15)", border: "1px solid " + BDL, fontFamily: mono }}>{mod.decides}</div>
          </div>
        </div>
      </Expand>
    </div>
  );
}

function Arrow() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "3px 0" }}>
      <svg width="44" height="22" viewBox="0 0 44 22">
        <line x1="22" y1="0" x2="22" y2="15" stroke={W3} strokeWidth="1.2" strokeDasharray="3 2.5" />
        <polygon points="18,13 22,21 26,13" fill={W3} />
        <circle cx="22" cy="10" r="2" fill={W7} opacity="0.4" />
      </svg>
    </div>
  );
}

function CodeBlock({ title, code, iconName }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid " + (open ? "rgba(255,255,255,0.15)" : BD), borderRadius: 7, background: "rgba(255,255,255,0.012)", overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "10px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 7, userSelect: "none" }}>
        {iconName && <Icon name={iconName} color={open ? W7 : W4} />}
        <span style={{ fontSize: 10, fontWeight: 700, color: open ? W7 : W5, letterSpacing: "0.08em", fontFamily: mono }}>{title}</span>
        <svg width="8" height="8" viewBox="0 0 8 8" style={{ marginLeft: "auto", transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "none", opacity: 0.35 }}><polygon points="0.5,2 7.5,2 4,6" fill={W} /></svg>
      </div>
      <Expand open={open}>
        <pre style={{ margin: 0, padding: "0 12px 14px", fontSize: 10.5, color: W7, fontFamily: mono, lineHeight: 1.6, whiteSpace: "pre", overflowX: "auto" }}>{code}</pre>
      </Expand>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "28px 0 12px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: W5, letterSpacing: "0.1em", fontFamily: mono, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</div>
      <div style={{ flex: 1, height: 1, background: BD }} />
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    requestAnimationFrame(() => setLoaded(true));
    return () => window.removeEventListener("resize", handle);
  }, []);

  const mob = width < 768;

  return (
    <div style={{ minHeight: "100vh", background: BG, color: W9, fontFamily: "DM Sans, -apple-system, sans-serif", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.12, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

      <div style={{ position: "relative", zIndex: 1, padding: mob ? "16px 10px 32px" : "28px 24px 40px", maxWidth: 1040, margin: "0 auto" }}>

        <div style={{ marginBottom: mob ? 14 : 22, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(5px)", transition: "all 0.4s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: mob ? 32 : 38, height: mob ? 32 : 38, borderRadius: 7, background: W, display: "flex", alignItems: "center", justifyContent: "center", fontSize: mob ? 15 : 18, fontWeight: 800, color: BG }}>A</div>
            <div>
              <h1 style={{ fontSize: mob ? 17 : 22, fontWeight: 800, margin: 0, letterSpacing: "-0.03em", color: W }}>Apartment Community SaaS</h1>
              <p style={{ fontSize: mob ? 9 : 11, color: W4, margin: "2px 0 0", fontFamily: mono }}>Developer Architecture - Slack for apartment residents</p>
            </div>
          </div>
          <div style={{ height: 1, background: BD, margin: "14px 0" }} />
          <p style={{ fontSize: 12.5, color: W5, lineHeight: 1.65, maxWidth: 780 }}>
            Every module is <strong style={{ color: W7 }}>expandable</strong> -- click to see <strong style={{ color: W7 }}>why it exists</strong> and <strong style={{ color: W7 }}>key decisions</strong>. Scroll down for schema, Redis patterns, security model, API design, and project structure.
          </p>
        </div>

        <SectionLabel>System Architecture</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, opacity: loaded ? 1 : 0, transition: "all 0.4s ease 0.08s" }}>
          {LAYERS.map((layer, li) => (
            <div key={layer.id}>
              {li > 0 && <Arrow />}
              <div style={{ border: "1px solid " + BD, borderRadius: 8, background: "rgba(255,255,255,0.01)", padding: mob ? "10px 10px 12px" : "14px 16px 16px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 9px 3px 7px", borderRadius: 3, background: "rgba(0,0,0,0.2)", border: "1px solid " + BD, marginBottom: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 1.5, background: W5 }} />
                  <span style={{ fontSize: mob ? 8.5 : 9.5, fontWeight: 700, color: W7, letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: mono }}>{layer.zone}</span>
                </div>
                <p style={{ fontSize: 11, color: W4, margin: "4px 0 10px", lineHeight: 1.5, fontStyle: "italic" }}>{layer.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : (layer.modules.length <= 3 ? "1fr" : "1fr 1fr"), gap: mob ? 4 : 5 }}>
                  {layer.modules.map((mod, mi) => (
                    <ModuleCard key={mi} mod={mod} compact={mob} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <SectionLabel>Database Schema</SectionLabel>
        <CodeBlock title="ALL TABLES (every table has community_id + RLS)" code={DB_SCHEMA} iconName="db" />

        <SectionLabel>Redis Patterns (Upstash)</SectionLabel>
        <CodeBlock title="ALL REDIS KEY PATTERNS - COMPLETE REFERENCE" code={REDIS_PATTERNS} iconName="dot" />
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr", gap: 6 }}>
          {[
            ["SESSION CACHE", "Decoded JWT claims. 15min TTL. Saves crypto on every request."],
            ["PRESENCE", "SADD/SCARD for online count. 5min TTL with 30s heartbeat."],
            ["UNREAD COUNTS", "HINCRBY per channel. Instant badge without querying messages."],
            ["CHANNEL PREVIEW", "Last message per channel. Powers list without JOINs."],
            ["RATE LIMITING", "INCR + EXPIRE. 60 req/min API, 3 @channel/day."],
            ["TYPING", "3s TTL key. Ephemeral -- no DB, no cleanup."],
          ].map(function(item) {
            return (
              <div key={item[0]} style={{ padding: "9px 11px", borderRadius: 5, background: "rgba(255,255,255,0.02)", border: "1px solid " + BD }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: W5, letterSpacing: "0.08em", fontFamily: mono }}>{item[0]}</div>
                <div style={{ fontSize: 10.5, color: W7, marginTop: 4, lineHeight: 1.4 }}>{item[1]}</div>
              </div>
            );
          })}
        </div>

        <SectionLabel>Security Model</SectionLabel>
        <CodeBlock title="JWT + TENANT ISOLATION + ROLES + CHECKLIST" code={SECURITY} iconName="shield" />

        <SectionLabel>API Design Patterns</SectionLabel>
        <CodeBlock title="REST + CURSOR PAGINATION + ERRORS + WEBHOOKS" code={API_PATTERNS} iconName="file" />

        <SectionLabel>Project Structure</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 8 : 10 }}>
          <CodeBlock title="FLUTTER (lib/)" code={FLUTTER_DIR} iconName="phone" />
          <CodeBlock title="NESTJS (src/)" code={NESTJS_DIR} iconName="server" />
        </div>

        <SectionLabel>Redis NestJS Code Patterns</SectionLabel>
        <CodeBlock title="UPSTASH SETUP + ALL SERVICE METHODS + CACHE INVALIDATION RULES" code={REDIS_CODE} iconName="dot" />

        <SectionLabel>RLS Policies (SQL)</SectionLabel>
        <CodeBlock title="TENANT ISOLATION + CHANNEL ACCESS + ADMIN WRITE + STORAGE" code={RLS_POLICIES} iconName="shield" />

        <SectionLabel>Database Indexes</SectionLabel>
        <CodeBlock title="ALL PERFORMANCE-CRITICAL INDEXES (messages, search, payments, marketplace)" code={INDEXES} iconName="db" />

        <SectionLabel>Complete API Endpoints</SectionLabel>
        <CodeBlock title="EVERY ENDPOINT - AUTH, CHANNELS, MESSAGES, GATE, PAYMENTS, EVENTS, MARKETPLACE, HELPDESK, UPLOAD, SEARCH, USER" code={ALL_API_ENDPOINTS} iconName="file" />

        <SectionLabel>Realtime Patterns (Flutter)</SectionLabel>
        <CodeBlock title="SUPABASE REALTIME - MESSAGES, TYPING, PRESENCE, GATE ALERTS" code={REALTIME_PATTERNS} iconName="radio" />

        <SectionLabel>FCM Push Notifications</SectionLabel>
        <CodeBlock title="TOPIC NAMING + SUBSCRIBE + SEND + PAYLOAD STRUCTURE + NAVIGATION" code={FCM_PATTERNS} iconName="bell" />

        <SectionLabel>pg_cron Scheduled Jobs</SectionLabel>
        <CodeBlock title="ALL CRON JOBS - BILLING, REMINDERS, DIGEST, EXPIRY, SLA, CLEANUP" code={PGCRON_JOBS} iconName="db" />

        <SectionLabel>Razorpay Webhook Handler</SectionLabel>
        <CodeBlock title="SIGNATURE VERIFY + IDEMPOTENCY + ATOMIC UPDATE + RESPONSE" code={RAZORPAY_WEBHOOK} iconName="dollar" />

        <SectionLabel>Error Handling</SectionLabel>
        <CodeBlock title="GLOBAL FILTER + CUSTOM EXCEPTIONS + ERROR CODE REFERENCE" code={ERROR_HANDLING} iconName="bug" />

        <SectionLabel>Testing Strategy</SectionLabel>
        <CodeBlock title="UNIT + INTEGRATION + E2E + COMMANDS + CI PIPELINE" code={TESTING_STRATEGY} iconName="shield" />

        <SectionLabel>Deployment</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 8 : 10 }}>
          <CodeBlock title="DOCKERFILE (NestJS)" code={DEPLOY_DOCKERFILE} iconName="server" />
          <CodeBlock title="GITHUB ACTIONS CI/CD" code={GITHUB_ACTIONS} iconName="git" />
        </div>

        <SectionLabel>Health and Monitoring</SectionLabel>
        <CodeBlock title="HEALTH CHECK + LOGGING + UPTIME + KEY METRICS" code={HEALTH_MONITORING} iconName="bug" />

        <SectionLabel>Environment Setup</SectionLabel>
        <CodeBlock title="ENVIRONMENTS + .env VARS + LOCAL SETUP (5 min)" code={ENV_SETUP} iconName="code" />

        <SectionLabel>Full Stack at a Glance</SectionLabel>
        <div style={{ border: "1px solid " + BD, borderRadius: 7, background: "rgba(255,255,255,0.012)", padding: mob ? "10px" : "14px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 0 }}>
            {STACK.map(function(row) {
              return (
                <div key={row[0]} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4.5px 2px", borderBottom: "1px solid " + BDL, gap: 12 }}>
                  <span style={{ fontSize: 10.5, color: W4, fontWeight: 500, flexShrink: 0 }}>{row[0]}</span>
                  <span style={{ fontSize: 10, color: W7, fontWeight: 600, fontFamily: mono, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{row[1]}</span>
                </div>
              );
            })}
          </div>
        </div>

        <SectionLabel>Design Principles</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr", gap: mob ? 5 : 7 }}>
          {[
            ["KISS", "One NestJS deploy. One Flutter codebase. Supabase handles DB + Realtime + Storage. Railway handles hosting. No microservices until pain."],
            ["MULTI-TENANT", "community_id on every table. RLS on every row. JWT carries tenant context. DB enforces isolation, not app code."],
            ["SCALE LATER", "When you feel pain, not before. Supabase scales DB. Add Meilisearch when PG FTS lags. Split services when team > 15."],
          ].map(function(item) {
            return (
              <div key={item[0]} style={{ padding: mob ? "8px 10px" : "10px 12px", borderRadius: 6, background: "rgba(255,255,255,0.02)", border: "1px solid " + BD }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: W5, letterSpacing: "0.08em", fontFamily: mono }}>{item[0]}</div>
                <div style={{ fontSize: 11, color: W7, marginTop: 4, lineHeight: 1.45 }}>{item[1]}</div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 24, paddingTop: 12, borderTop: "1px solid " + BDL, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
          <span style={{ fontSize: 9, color: W2, fontFamily: mono }}>Apartment Community SaaS - Dev Architecture v3.0</span>
          <span style={{ fontSize: 9, color: W2, fontFamily: mono }}>KISS - Ship Fast - Scale Later</span>
        </div>
      </div>
    </div>
  );
}