import FacStaffGrid from '@/components/general/FacStaff/FacStaffGrid';
import PageBanner from '@/components/layout/PageBanner';
import { phdStudents } from '@/data/people/phdStudents';

const graduationYears = [...new Set(phdStudents.map((student) => student.graduationYear))].sort(
  (a, b) => a - b,
);

export default function FacultyAndStaff() {
  return (
    <>
      <PageBanner title="PhD Students" />
      <div className="min-h-screen bg-white">
        {graduationYears.length === 0 ? (
          <p className="mx-auto max-w-5xl px-6 py-16 text-center text-gray-600">
            The PhD student roster is being updated. Please check back soon.
          </p>
        ) : (
          graduationYears.map((year) => (
            <FacStaffGrid
              key={year}
              title={`Class of ${year}`}
              members={phdStudents.filter((student) => student.graduationYear === year)}
              columns={4}
            />
          ))
        )}
      </div>
    </>
  );
}
