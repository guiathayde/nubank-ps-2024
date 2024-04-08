export function getRandomDate(startDate: Date, endDate: Date): Date {
  const start = startDate.getTime();
  const end = endDate.getTime();

  const randomTime = start + Math.random() * (end - start);

  return new Date(randomTime);
}
