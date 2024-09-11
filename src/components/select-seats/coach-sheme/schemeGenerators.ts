import { CoachClass } from '../../../types';
import { calculateColIndex, calculateCoupeNumber } from './helpers';
import {
  TOP_SHIFT, LEFT_SHIFT, SECOND_TOP_SHIFT, COUPE_SHIFT, SECOND_LEFT_SHIFT, SLOT_WIDTH,
  COUPE_HEIGHT, SEAT_TOP_SHIFT, THIRD_LEFT_SHIFT, SEATED_HEIGHT, SINGLE_SEATED_TOP, LUX_HEIGHT,
  SIDE_SEAT_WIDTH, THIRD_TOP_SHIFT
} from './sizeConfig';

export const SEAT_MAP = {
  [CoachClass.LUX]: 16,
  [CoachClass.COUPE]: 32,
  [CoachClass.RESERVED]: 48,
  [CoachClass.SEATED]: 62
}

export const coupeMappingFunc = (index: number) => {
  let top = TOP_SHIFT;
  let left = LEFT_SHIFT;

  // if the seat number is odd than it seats on the second row
  if ((index + 1) % 2 === 1) {
    top = SECOND_TOP_SHIFT;
  }
  left = left + calculateCoupeNumber(index + 1) * COUPE_SHIFT;
  const colIndex = calculateColIndex(index + 1);

  if (colIndex % 2 !== 0) {
    left += SECOND_LEFT_SHIFT;
  }

  return { top, left, number: index + 1, width: SLOT_WIDTH, height: COUPE_HEIGHT }
}

export const seatedMappingFunc = (index: number, coupeCount: number) => {
  if (index < coupeCount) {
    let top = TOP_SHIFT;
    let left = LEFT_SHIFT;

    // if the seat number is odd than it seats on the second row
    if ((index + 1) % 2 === 1) {
      top = SEAT_TOP_SHIFT;
    }
    left = left + calculateCoupeNumber(index + 1, 2) * THIRD_LEFT_SHIFT;

    return { top, left, number: index + 1, width: SLOT_WIDTH, height: SEATED_HEIGHT }
  }
  // Seat number 33
  if (index === coupeCount) {
    return {
      top: SINGLE_SEATED_TOP,
      left: LEFT_SHIFT,
      number: index + 1,
      width: SLOT_WIDTH,
      height: SEATED_HEIGHT
    }
  }

  // Seat number 62
  if (index + 1 === SEAT_MAP[CoachClass.SEATED]) {
    return {
      top: SINGLE_SEATED_TOP,
      left: LEFT_SHIFT + THIRD_LEFT_SHIFT + calculateCoupeNumber(index - coupeCount, 2) * THIRD_LEFT_SHIFT,
      number: index + 1,
      width: SLOT_WIDTH,
      height: SEATED_HEIGHT
    }
  }
  // Since 33 already handled we need to add one more left shift
  let left = LEFT_SHIFT + THIRD_LEFT_SHIFT;
  let top = SINGLE_SEATED_TOP - SEATED_HEIGHT - 3;

  if ((index + 1) % 2 === 1) {
    top = SINGLE_SEATED_TOP;
  }
  left = left + calculateCoupeNumber(index - coupeCount, 2) * THIRD_LEFT_SHIFT;

  return { top, left, number: index + 1, width: SLOT_WIDTH, height: SEATED_HEIGHT }

}

export const luxMappingFunc = (index: number) => {
  const top = TOP_SHIFT;
  let left = LEFT_SHIFT + calculateCoupeNumber(index + 1, 2) * COUPE_SHIFT;

  if (((index + 1) % 2 === 0)) {
    left += SECOND_LEFT_SHIFT;
  }

  return { top, left, number: index + 1, width: SLOT_WIDTH, height: LUX_HEIGHT }
}

export const reservedMappingFunc = (index: number, coupeCount: number) => {
  if (index < coupeCount) {
    return coupeMappingFunc(index);
  }

  let left = LEFT_SHIFT + calculateCoupeNumber(index - coupeCount + 1, 2) * COUPE_SHIFT;

  if (((index - coupeCount + 1) % 2 === 0)) {
    left += SIDE_SEAT_WIDTH;
  }

  return {
    top: THIRD_TOP_SHIFT,
    left,
    number: index + 1,
    width: SIDE_SEAT_WIDTH,
    height: COUPE_HEIGHT
  };
}

export const calculatePositions = (type: CoachClass) => {
  const seatsSpaces = new Array(SEAT_MAP[type]).fill(0);
  const coupeCount = SEAT_MAP[CoachClass.COUPE];

  switch (type) {
    case CoachClass.COUPE:
      return seatsSpaces.map((_, index) => coupeMappingFunc(index));
    case CoachClass.LUX:
      return seatsSpaces.map((_, index) => luxMappingFunc(index));
    case CoachClass.RESERVED:
      return seatsSpaces.map((_, index) => reservedMappingFunc(index, coupeCount));
    case CoachClass.SEATED:
      return seatsSpaces.map((_, index) => seatedMappingFunc(index, coupeCount));
    default:
      return [];
  }
}
