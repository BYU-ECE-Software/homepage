import type { FacStaffMember } from '@/components/general/FacStaff/FacStaffCard';

export interface PhDStudent extends FacStaffMember {
  graduationYear: number;
  advisor?: string;
}

export const phdStudents: PhDStudent[] = [];
