import { DateTime } from "luxon";

export const dateTimeToUnix = (dateTime: DateTime) => dateTime.toSeconds();