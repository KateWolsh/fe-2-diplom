export const IMAGE_WIDTH = 900; // change this value to fit to design here and in css file
export const INITIAL_IMAGE_WIDTH = 400;

export const getAbsoluteSize = (size: number) => size * IMAGE_WIDTH / INITIAL_IMAGE_WIDTH;

// COMMON
export const SLOT_WIDTH = getAbsoluteSize(11);
export const LEFT_SHIFT = getAbsoluteSize(60);
export const TOP_SHIFT = getAbsoluteSize(12);
export const COUPE_SHIFT = getAbsoluteSize(38.8);
export const SECOND_LEFT_SHIFT = getAbsoluteSize(24);
export const THIRD_TOP_SHIFT = getAbsoluteSize(50);

// SEATED
export const SINGLE_SEATED_TOP = getAbsoluteSize(51);
export const SEAT_TOP_SHIFT = getAbsoluteSize(24);
export const SEATED_HEIGHT = getAbsoluteSize(9);

// LUX
export const LUX_HEIGHT = getAbsoluteSize(25);

// COUPE
export const COUPE_HEIGHT = getAbsoluteSize(10);
export const SECOND_TOP_SHIFT = getAbsoluteSize(27);

// RESERVED
export const SIDE_SEAT_WIDTH = getAbsoluteSize(18);
export const THIRD_LEFT_SHIFT = getAbsoluteSize(19.6);
