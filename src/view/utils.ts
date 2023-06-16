// export function strikeThrough(text) {
//   return text
//     .split("")
//     .map((char) => char + "\u0336")
//     .join("");
// }

export function strikeThrough(text) {
  var result = "<del>" + text + "</del>";
  return result;
}
