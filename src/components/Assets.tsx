import { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path
        className="stroke-miterlimit fill-none stroke-base-content stroke-[32px]"
        d="M412.03,311.87c-8.36-8.29-21.92-8.29-30.21.13l-3.09,3.09-5-55.68,25.87-25.87c35.61-35.35,55.55-83.46,55.42-133.68,0-23.63-19.15-42.78-42.78-42.78-50.16-.13-98.34,19.81-133.68,55.42l-25.67,25.67-55.68-5,2.9-2.9s.07-.07.13-.13c8.29-8.36,8.29-21.92-.13-30.21-8.36-8.29-21.79-8.29-30.15,0l-28.24,28.24-35.48-3.23c-12.77-1.25-25.41,3.29-34.42,12.37l-38.31,39.16s-.07.07-.13.13c-8.29,8.36-8.29,21.92.13,30.21l75.96,74.58-.26.26c-8.03,8.1-12.44,19.02-12.37,30.34,0,11.32,4.48,22.12,12.37,30.15l60.75,60.75h0c16.72,16.72,43.77,16.72,60.49,0l.26-.26,74.58,75.96c8.29,8.36,21.85,8.43,30.21.13l.13-.13,39.16-38.31c9.02-9.08,13.49-21.72,12.18-34.42l-3.16-35.28,28.43-28.43c8.29-8.36,8.29-21.79,0-30.15,0,0-.07-.07-.13-.13h-.07ZM257.49,328.59c-40.87,0-74.05-33.17-74.05-74.05s33.17-74.05,74.05-74.05,74.05,33.17,74.05,74.05-33.17,74.05-74.05,74.05Z"
      />
    </svg>
  );
}

export function Favicon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <rect
        className="isolate fill-[#1c1c1c]"
        width="512"
        height="512"
        rx="42"
        ry="42"
      />
      <path
        className="stroke-miterlimit fill-none stroke-white stroke-[32px]"
        d="M412.03,311.87c-8.36-8.29-21.92-8.29-30.21.13l-3.09,3.09-5-55.68,25.87-25.87c35.61-35.35,55.55-83.46,55.42-133.68,0-23.63-19.15-42.78-42.78-42.78-50.16-.13-98.34,19.81-133.68,55.42l-25.67,25.67-55.68-5,2.9-2.9s.07-.07.13-.13c8.29-8.36,8.29-21.92-.13-30.21-8.36-8.29-21.79-8.29-30.15,0l-28.24,28.24-35.48-3.23c-12.77-1.25-25.41,3.29-34.42,12.37l-38.31,39.16s-.07.07-.13.13c-8.29,8.36-8.29,21.92.13,30.21l75.96,74.58-.26.26c-8.03,8.1-12.44,19.02-12.37,30.34,0,11.32,4.48,22.12,12.37,30.15l60.75,60.75h0c16.72,16.72,43.77,16.72,60.49,0l.26-.26,74.58,75.96c8.29,8.36,21.85,8.43,30.21.13l.13-.13,39.16-38.31c9.02-9.08,13.49-21.72,12.18-34.42l-3.16-35.28,28.43-28.43c8.29-8.36,8.29-21.79,0-30.15,0,0-.07-.07-.13-.13h-.07ZM257.49,328.59c-40.87,0-74.05-33.17-74.05-74.05s33.17-74.05,74.05-74.05,74.05,33.17,74.05,74.05-33.17,74.05-74.05,74.05Z"
      />
    </svg>
  );
}

export function OAuthGoogle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      style={{ display: "block" }}
      {...props}
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      ></path>
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      ></path>
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      ></path>
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      ></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
  );
}