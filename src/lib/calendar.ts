import { weddingData } from "@/data/wedding";

export function generateGoogleCalendarUrl(event = weddingData.events[0]): string {
  // Format dates: ISO 8601 without hyphens/colons in UTC
  // 16 Nov 2026 19:30 IST is 14:00 UTC
  const startIso = "20261116T140000Z";
  const endIso = "20261116T180000Z";

  const title = encodeURIComponent(`${weddingData.groom.firstName} & ${weddingData.bride.firstName} - ${event.name}`);
  const details = encodeURIComponent(
    `${weddingData.ceremony.invitationMessage}\n\nVenue: ${event.venue}\nAddress: ${event.address}\nHosts: ${weddingData.groom.parents}\nContact: ${weddingData.rsvp.phone}`
  );
  const location = encodeURIComponent(`${event.venue}, ${event.address}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
}

export function downloadIcsFile(event = weddingData.events[0]) {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ibnan and Tanziya//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:ibnan-tanziya-valima-20261116@wedding.invite",
    "DTSTAMP:20261116T000000Z",
    "DTSTART:20261116T140000Z",
    "DTEND:20261116T180000Z",
    `SUMMARY:${weddingData.groom.firstName} & ${weddingData.bride.firstName} - ${event.name}`,
    `DESCRIPTION:${weddingData.ceremony.invitationMessage} | Hosts: ${weddingData.groom.parents}`,
    `LOCATION:${event.venue}, ${event.address}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "ibnan-tanziya-valima.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
