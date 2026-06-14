/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  detailedDescription: string;
  benefits: string[];
  targetAge: string;
  sessionsPerWeek: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  category: string;
  thumbnailUrl: string;
  videoUrl?: string;
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  phone: string;
  district: string;
  serviceId?: string; // Optional interested service
  notes?: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'scheduled';
}

export interface FAQItem {
  question: string;
  answer: string;
}
