import { DateTime } from "luxon";

export const dateTimeToUnix = (dateTime: DateTime) => Math.floor(dateTime.toSeconds());