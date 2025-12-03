
export function numberFormat(number: string | number): string {
  if (number === undefined) {
    number = 0;
  }
  
  let num = typeof number === 'string' ? parseFloat(number) : number;
  
  // Convert the number to a string with up to 2 decimal places
  let formattedNum = num.toFixed(2);
  
  // Remove trailing zeros and decimal point if not needed
  formattedNum = formattedNum.replace(/\.?0+$/, '');
  
  // Add commas for thousands separator
  return formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// usage
// const number = "1230.12";
// const formattedNumber: string = formatNumber(number); // "1,230.12"
// console.log(formattedNumber);
