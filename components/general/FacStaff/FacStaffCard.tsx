import Image from 'next/image';
import Link from 'next/link';

export interface FacStaffMember {
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  office?: string;
  advisor?: string;
  /** Path relative to /public, e.g. "/faculty/beard.jpg" */
  image?: string;
  /** Optional URL — wraps photo + name in a Next.js Link */
  link?: string;
}

export default function FacStaffCard({
  name,
  title,
  email,
  phone,
  office,
  advisor,
  image,
  link,
}: FacStaffMember) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const PhotoAndName = (
    <>
      <div className="relative mb-3 h-[130px] w-[130px] flex-shrink-0 overflow-hidden rounded-full bg-gray-100 transition-shadow duration-200 group-hover:shadow-lg">
        {image ? (
          <Image src={image} alt={name} fill sizes="130px" className="object-cover object-top" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-500 select-none">
            {initials}
          </div>
        )}
      </div>
      <span className="text-[0.85rem] leading-snug font-bold text-gray-900 underline-offset-2 group-hover:underline">
        {name}
      </span>
    </>
  );

  return (
    <div className="flex flex-col items-center text-center">
      {link ? (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center"
        >
          {PhotoAndName}
        </Link>
      ) : (
        <div className="group flex cursor-default flex-col items-center">{PhotoAndName}</div>
      )}

      <div className="mt-1.5 flex flex-col items-center gap-0.5">
        {title && (
          <p
            className="mb-1 text-[0.82rem] leading-snug font-semibold text-gray-900"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {title}
          </p>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-[0.76rem] text-gray-600 transition-colors hover:text-blue-700 hover:underline"
          >
            {email}
          </a>
        )}
        {phone && <span className="text-[0.76rem] text-gray-600">{phone}</span>}
        {office && <span className="text-[0.76rem] text-gray-600">{office}</span>}
        {advisor && <span className="text-[0.76rem] text-gray-600">Advisor: {advisor}</span>}
      </div>
    </div>
  );
}
