/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  School, 
  User, 
  Brain, 
  MessageSquare, 
  Accessibility, 
  Hand, 
  Sparkles, 
  Activity, 
  HeartHandshake, 
  UserCheck, 
  Monitor, 
  Wrench, 
  Users, 
  HeartPulse, 
  Trophy,
  Award,
  Building2,
  Bus,
  MapPin,
  Phone,
  Send,
  X,
  CheckCircle2,
  Camera,
  Play
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  School,
  User,
  Brain,
  MessageSquare,
  Accessibility,
  Hand,
  Sparkles,
  Activity,
  HeartHandshake,
  UserCheck,
  Monitor,
  Wrench,
  Users,
  HeartPulse,
  Trophy,
  Award,
  Building2,
  Bus,
  MapPin,
  Phone,
  Send,
  X,
  CheckCircle2,
  Camera,
  Play
};

interface LucideIconProps {
  name: string;
  className?: string;
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, className }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    // Fallback icon
    return <Award className={className} />;
  }
  return <IconComponent className={className} />;
};
