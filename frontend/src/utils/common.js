export const roles = ["Manager", "Designer", "Developer", "HR", "Team Lead", "Receptionist"]


export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options).replace(' ', ' ').replace(/ /, ',');
}

export function formatAmount(amount) {
  return  Number(amount).toLocaleString()
}