import { DateTime, Duration } from "luxon";

export function offsetToOffsetString(offsetInMinutes: number): string {
    if (offsetInMinutes === 0) {
        return 'UTC';
    }
  
    const dur = Duration.fromObject({ minutes: offsetInMinutes });
  
    const { hours, minutes } = dur.shiftTo('hours', 'minutes').toObject();
  
    return `UTC${offsetInMinutes > 0 ? '+' : '-'}${Math.abs(hours).toString()}:${Math.abs(minutes).toString().padStart(2, '0')}`;
}

export function toDateTimeWithOffset(isoString: string, offsetInMinutes: number): DateTime {
    return DateTime.fromISO(isoString).setZone(offsetToOffsetString(offsetInMinutes));
}

export function toDateStringWithOffset(date: Date, offsetInMinutes: number): string {
    return toDateTimeWithOffset(date.toISOString(), offsetInMinutes).toISO();
}

export function toJSDateWithOffset(date: Date, offsetInMinutes: number): Date {
    return toDateTimeWithOffset(date.toISOString(), offsetInMinutes).toJSDate();
}