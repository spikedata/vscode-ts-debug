interface A {
  a: string;
  b: string;
}
const a: A = {
  a: "a",
  b: "b",
};
if (true) {
  debugger;
  a.a = "x";
}
console.log(a);
