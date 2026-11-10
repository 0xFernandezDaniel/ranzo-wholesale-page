/**
 * The hex-nut mark from the Ranzo logo (the same two paths as Logo.tsx), on
 * its own, for use as one large quiet background shape. It takes its colour
 * from the text colour of its parent.
 */
export default function HexNut({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="1072 471 77 88"
      aria-hidden
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1110.43,472.89l-36.54,21.1l19.97,11.53c3.31-5.72,9.48-9.58,16.57-9.58c10.57,0,19.15,8.57,19.15,19.15c0,3.49-0.95,6.75-2.58,9.57l19.97,11.53v-42.19L1110.43,472.89z" />
      <path
        opacity={0.55}
        d="M1110.43,534.23c-10.57,0-19.15-8.57-19.15-19.15c0-3.49,0.95-6.75,2.58-9.57l-19.97-11.53v42.19l36.54,21.1l36.54-21.1L1127,524.65C1123.69,530.37,1117.52,534.23,1110.43,534.23z"
      />
    </svg>
  );
}
