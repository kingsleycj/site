import type { SVGProps } from "react";

/** Hand-drawn stroke icons, one weight, 24-unit grid. No icon pack. */
const paths = {
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowRight: <path d="M4 12h16M14 6l6 6-6 6" />,
  arrowLeft: <path d="M20 12H4m6-6-6 6 6 6" />,
  arrowUp: <path d="M12 20V4m-6 6 6-6 6 6" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  chevronUp: <path d="m5 15 7-7 7 7" />,
  home: <path d="M4 11 12 4l8 7v9h-5v-6H9v6H4Z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </>
  ),
  path: (
    <>
      <path d="M5 19c0-6 4-6 7-7s7-1 7-7" />
      <circle cx="5" cy="19" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="19" cy="5" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  work: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18" />
    </>
  ),
  toolkit: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
      <circle cx="9" cy="7" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  now: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.5 2" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="m3.5 7.5 8.5 5.5 8.5-5.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />,
  github: (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 7v10M18 11c0 4-8 2-10 6" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="8.5" cy="10.5" r="2" />
      <path d="M13 10h5M13 13.5h5M5.5 16.5c0-2 1.5-2.5 3-2.5s3 .5 3 2.5" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3L11 7.5 9 9c1 2.5 3.5 5 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2c-8 0-14-6-14-14a2 2 0 0 1 2-2Z" />
  ),
  download: <path d="M12 4v11m-5-5 5 5 5-5M4 19h16" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 13v6H5V6h6" />,
  telegram: <path d="M3.5 11.5 20.5 4 17 20l-5.5-5-3 3.5V14Zm8 3.5 9-11" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  contract: (
    <>
      <path d="M7 3h7l5 5v13H7Zm7 0v5h5" />
      <circle cx="12" cy="15" r="2.5" />
    </>
  ),
  spark: <path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8Z" />,
  bolt: <path d="M13 2 5 13h6l-1 9 9-12h-6l1-8Z" fill="currentColor" stroke="none" />,
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  wave: <path d="M3 12c3-6 6-6 9 0s6 6 9 0" />,
  mail: <path d="M4 7.5 12 13l8-5.5M4 6h16v12H4Z" />,
  play: <path d="M8 5v14l11-7Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  x: <path d="M17.8 3h3.2l-7 8 8.2 10h-6.4l-5-6.6L5 21H1.8l7.5-8.6L1.5 3h6.6l4.5 6L17.8 3Zm-1.1 16.1h1.8L7.1 4.8H5.2l11.5 14.3Z" fill="currentColor" stroke="none" />,
  whatsapp: (
    <>
      <path d="M4.5 20l1.2-3.6A8 8 0 1 1 8.6 19L4.5 20Z" />
      <path d="M9.3 9.2c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.4.5c.5.9 1.3 1.7 2.3 2.2l.5-.4c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.6c0 .3-.1.6-.5.8-.6.4-1.3.4-2 .1a7 7 0 0 1-4.4-4.4c-.3-.7-.3-1.4.1-2Z" fill="currentColor" stroke="none" />
    </>
  ),
  sparkle: <path d="m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6Z" />,
} as const;

export type IconName = keyof typeof paths;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  title?: string;
}

export function Icon({ name, size = 20, title, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
