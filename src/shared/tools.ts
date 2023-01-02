export function swapArray(
  arr: any[],
  originIndex: number,
  targetIndex: number
) {
  const help = arr[originIndex];
  arr[originIndex] = arr[targetIndex];
  arr[targetIndex] = help;
}
