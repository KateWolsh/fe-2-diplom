export const calculateCoupeNumber = (number: number, seatsInCoupe = 4) => {
  const divided = number / seatsInCoupe;

  if (divided % 1 === 0) {
    return divided - 1;
  }

  return Math.floor(divided);
}

export const calculateColIndex = (number: number) => {
  let colIndex = 0;
  if (number % 2 === 0) { // Even seat numbers are in the first row
    // For even seats: 2 -> index 0, 4 -> index 1, ..., 32 -> index 15
    colIndex = (number / 2) - 1;
  } else { // Odd seat numbers are in the second row
    // For odd seats: 1 -> index 0, 3 -> index 1, ..., 31 -> index 15
    colIndex = Math.floor(number / 2);
  }

  return colIndex;
}
