import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, Copy, Check, Clock, CheckCircle, ArrowUpRight, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';
import { analytics } from '../utils/analytics';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'Engineering Opportunity'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string>('');

  const serviceOptions = [
    'Engineering Opportunity',
    'Distributed Systems Consulting',
    'Web Performance & SEO Audit',
    'Open Source Collaboration',
    'General Inquiry'
  ];

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message details.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const receipt = `REQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
    setSubmissionId(receipt);
    setSubmitted(true);

    analytics.trackEvent('contact_action', `Submitted Contact Form: ${formData.subject || formData.serviceType}`, {
      receipt,
      name: formData.name,
      email: formData.email,
      service: formData.serviceType
    });
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    analytics.trackEvent('copy_contact', `Copied contact detail: ${label}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}: ${formData.serviceType}`
    );
    const body = encodeURIComponent(
      `Hello Aditya,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nTopic: ${formData.serviceType}\n\nMessage:\n${formData.message}\n\n---\nSent via personal website portfolio`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" aria-label="Contact Information and Form" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-10 border-b border-neutral-200/70 dark:border-neutral-800/70 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
            Initiate Direct Dialogue
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
            Contact & Correspondence
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
            Direct communication channels for engineering collaborations, advisory roles, and technical inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Credentials & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 space-y-6">
              <h3 className="text-sm font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase font-mono">
                Direct Contact Details
              </h3>

              {/* Direct Email */}
              <div className="flex items-start justify-between gap-3 group">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 font-mono uppercase">Primary Email</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline break-all"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
                  aria-label="Copy email"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start justify-between gap-3 group">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 font-mono uppercase">Direct Phone</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-sm font-medium font-mono text-neutral-900 dark:text-neutral-100 hover:underline"
                    >
                      {PERSONAL_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
                  aria-label="Copy phone"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location & Timezone */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-mono uppercase">Geographic Hub</div>
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {PERSONAL_INFO.address}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                    Timezone: {PERSONAL_INFO.timezoneOffset} (India Standard Time)
                  </div>
                </div>
              </div>

              {/* LinkedIn Network */}
              <div className="flex items-start justify-between gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 font-mono uppercase">LinkedIn Profile</div>
                    <a
                      href={PERSONAL_INFO.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{PERSONAL_INFO.linkedinHandle}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response SLA Guarantee Card */}
            <div className="p-5 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/50 border border-neutral-200/70 dark:border-neutral-800/70 text-xs text-neutral-600 dark:text-neutral-400 space-y-2 font-mono">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-200 font-medium">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>Response Time SLA</span>
              </div>
              <p className="leading-relaxed">
                I actively review and respond to engineering inquiries within 24 hours. Messages submitted via this form or direct email trigger instant inbox routing.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Minimalist Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-8">
              {submitted ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-neutral-50">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                    Thank you, {formData.name}. Your inquiry has been logged with receipt code{' '}
                    <span className="font-mono text-neutral-900 dark:text-neutral-100 font-semibold">{submissionId}</span>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleOpenMailClient}
                      className="w-full sm:w-auto px-4 py-2 text-xs font-mono bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Pre-filled Mail Client</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: '',
                          message: '',
                          serviceType: 'Engineering Opportunity'
                        });
                      }}
                      className="w-full sm:w-auto px-4 py-2 text-xs font-mono border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 hover:border-neutral-400"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maya Sharma"
                        className={`w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. maya@company.com"
                        className={`w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone (Optional) */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91..."
                        className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-400"
                      />
                    </div>

                    {/* Topic / Service Option */}
                    <div>
                      <label htmlFor="contact-topic" className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                        Subject Classification
                      </label>
                      <select
                        id="contact-topic"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-400 font-sans"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white dark:bg-neutral-900">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                      Message Content *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline project requirements, timeline, or engineering topics..."
                      className={`w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none transition-colors ${
                        errors.message
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Send Direct Transmission</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenMailClient}
                      className="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-1"
                    >
                      <span>Launch Native Mail Client</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
