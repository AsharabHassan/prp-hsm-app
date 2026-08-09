// GoHighLevel (LeadConnector) configuration — same pattern as the main HSA site.
// Fill the webhook IDs / calendar URLs in .env.local (see .env.example).

export type ClinicLocation = "london" | "glasgow";

export function getWebhookUrl(location: ClinicLocation): string | null {
  const byLocation: Record<ClinicLocation, string | undefined> = {
    london: process.env.GHL_WEBHOOK_LONDON,
    glasgow: process.env.GHL_WEBHOOK_GLASGOW,
  };
  return byLocation[location] || process.env.GHL_WEBHOOK_FALLBACK || null;
}

// Public (client-visible) booking calendar links, one per clinic.
export const CALENDAR_URLS: Record<ClinicLocation, string> = {
  london: process.env.NEXT_PUBLIC_GHL_CALENDAR_LONDON || "",
  glasgow: process.env.NEXT_PUBLIC_GHL_CALENDAR_GLASGOW || "",
};

export const CLINIC_INFO: Record<
  ClinicLocation,
  { label: string; address: string; phone: string }
> = {
  london: {
    label: "London",
    address: "10 Harley Street, Marylebone, London W1G 9PF",
    phone: "020 4628 3165",
  },
  glasgow: {
    label: "Glasgow",
    address: "5th Floor, Ingram House, 227 Ingram Street, Glasgow G1 1DA",
    phone: "0141 488 8985",
  },
};
