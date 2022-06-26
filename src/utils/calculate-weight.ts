export const distanceWeight = (distance: number): number => {
  if (distance <= 3.0) {
    return 7;
  } else if (distance <= 5.0) {
    return 3;
  } else {
    return 0;
  }
};

export const ratingWeight = (
  userRating: number,
  driverRating: number,
): number => {
  if (userRating >= driverRating) {
    return 2;
  } else {
    return 0;
  }
};

export const noOfRidesWeight = (
  userNoOfRiders: number,
  driverNoOfRides: number,
): number => {
  if (userNoOfRiders <= 2 && driverNoOfRides >= 3) {
    return 5;
  } else if (userNoOfRiders > 2 && driverNoOfRides < 3) {
    return 2;
  } else {
    return 0;
  }
};
