export function processIntent(intent: string): string {
  const upper = intent.toUpperCase().replace(/[^A-Z]/g, "");
  let result = "";
  for (const char of upper) {
    if ("AEIOU".includes(char)) continue;
    if (!result.includes(char)) result += char;
  }
  return result;
}
