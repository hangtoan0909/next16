import 'server-only';

export async function getUsersData() {
  // const res = await fetch('https://66b0310d6a693a95b538097a.mockapi.io/users');
  const res = await fetch('PATH_API');
  const data = res.json();
  return data;
}
