export default function (s: string): string {
  if (s === "") return "";
  return s[0].toUpperCase() + s.slice(1);
}
