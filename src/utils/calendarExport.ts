import { CalendarEvent } from '../types';

/**
 * Format date for Google Calendar URL and iCal
 * @param dateStr "YYYY-MM-DD"
 * @param timeStr "HH:MM" (optional)
 * @param durationMinutes defaults to 90
 */
function getEventDates(dateStr: string, timeStr?: string, durationMinutes = 90): { startIso: string; endIso: string; startIcal: string; endIcal: string; isAllDay: boolean } {
  const [year, month, day] = dateStr.split('-').map(Number);

  if (timeStr && timeStr.includes(':')) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes, 0);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    const pad = (n: number) => String(n).padStart(2, '0');

    // Local representations formatted as YYYYMMDDTHHmmss
    const sYear = startDate.getFullYear();
    const sMonth = pad(startDate.getMonth() + 1);
    const sDay = pad(startDate.getDate());
    const sHour = pad(startDate.getHours());
    const sMin = pad(startDate.getMinutes());
    const sSec = pad(startDate.getSeconds());

    const eYear = endDate.getFullYear();
    const eMonth = pad(endDate.getMonth() + 1);
    const eDay = pad(endDate.getDate());
    const eHour = pad(endDate.getHours());
    const eMin = pad(endDate.getMinutes());
    const eSec = pad(endDate.getSeconds());

    const startFormatted = `${sYear}${sMonth}${sDay}T${sHour}${sMin}${sSec}`;
    const endFormatted = `${eYear}${eMonth}${eDay}T${eHour}${eMin}${eSec}`;

    return {
      startIso: startFormatted,
      endIso: endFormatted,
      startIcal: startFormatted,
      endIcal: endFormatted,
      isAllDay: false,
    };
  }

  // All day event: end date is next day
  const pad = (n: number) => String(n).padStart(2, '0');
  const nextDate = new Date(year, month - 1, day + 1);
  const startDay = `${year}${pad(month)}${pad(day)}`;
  const nextDay = `${nextDate.getFullYear()}${pad(nextDate.getMonth() + 1)}${pad(nextDate.getDate())}`;

  return {
    startIso: `${startDay}/${nextDay}`,
    endIso: nextDay,
    startIcal: startDay,
    endIcal: nextDay,
    isAllDay: true,
  };
}

/**
 * Builds details description string for calendar events
 */
function buildEventDetails(event: CalendarEvent): string {
  const parts: string[] = [];
  parts.push(`1^ Comunità S.AP. - ${event.dayOfWeek} ${event.date}`);
  if (event.preparationGroup) {
    parts.push(`Gruppo di Preparazione: ${event.preparationGroup}`);
  }
  if (event.time) {
    parts.push(`Orario: ${event.time}`);
  }
  if (event.location) {
    parts.push(`Luogo: ${event.location}`);
  }
  if (event.notice) {
    parts.push(`Nota: ${event.notice}`);
  }
  return parts.join('\n');
}

/**
 * Generates direct Google Calendar template URL
 * On Android, clicking this link will open Google Calendar with prefilled fields!
 */
export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const dates = getEventDates(event.date, event.time);
  const details = buildEventDetails(event);
  const location = event.location || 'Chiesa Parrocchiale';
  const title = `1^ Comunità: ${event.title}`;

  const dateParam = dates.isAllDay ? dates.startIso : `${dates.startIso}/${dates.endIso}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: dateParam,
    details: details,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates an iCalendar (RFC 5545) event block
 */
function createVEventBlock(event: CalendarEvent): string {
  const dates = getEventDates(event.date, event.time);
  const summary = `1^ Comunità: ${event.title}`.replace(/,/g, '\\,');
  const description = buildEventDetails(event).replace(/\n/g, '\\n').replace(/,/g, '\\,');
  const location = (event.location || 'Comunità').replace(/,/g, '\\,');
  const uid = `${event.id}-${event.date.replace(/-/g, '')}@1comunita.app`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const lines = [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    dates.isAllDay ? `DTSTART;VALUE=DATE:${dates.startIcal}` : `DTSTART:${dates.startIcal}`,
    dates.isAllDay ? `DTEND;VALUE=DATE:${dates.endIcal}` : `DTEND:${dates.endIcal}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
  ];

  return lines.join('\r\n');
}

/**
 * Downloads a single event .ics file
 */
export function downloadSingleICS(event: CalendarEvent): void {
  const vevent = createVEventBlock(event);
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//1 Comunità S.AP.//Calendario Preparazioni//IT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    vevent,
    'END:VCALENDAR',
  ].join('\r\n');

  const safeTitle = event.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  const filename = `Evento_${event.date}_${safeTitle}.ics`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Downloads the full schedule as a single .ics file containing all events.
 * Users can import this into Google Calendar on mobile or web to get every event instantly!
 */
export function downloadAllICS(events: CalendarEvent[]): void {
  const vevents = events.map(createVEventBlock).join('\r\n');
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//1 Comunità S.AP.//Calendario Preparazioni//IT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:1^ Comunità - Calendario Preparazioni',
    'X-WR-TIMEZONE:Europe/Rome',
    vevents,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Calendario_Completo_1_Comunita_S_AP.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
