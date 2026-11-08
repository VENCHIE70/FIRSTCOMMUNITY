import { Contact } from '../types';

/**
 * Clean phone number for tel:, sms:, and WhatsApp protocols
 */
export function cleanPhoneNumber(phone?: string): string {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Format Italian or international phone number for WhatsApp
 */
export function getWhatsAppNumber(phone?: string): string {
  const cleaned = cleanPhoneNumber(phone);
  if (!cleaned) return '';
  if (cleaned.startsWith('+')) {
    return cleaned.replace('+', '');
  }
  // Standard Italian mobile (starts with 3...)
  if (cleaned.startsWith('3')) {
    return '39' + cleaned;
  }
  return cleaned;
}

/**
 * Splits fullName into family name / given name for vCard N property
 */
function parseName(contact: Contact): { lastName: string; firstName: string } {
  const parts = contact.fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { lastName: parts[0], firstName: '' };
  }
  // If starts with "don ", handle title
  if (contact.fullName.toLowerCase().startsWith('don ')) {
    return { lastName: parts.slice(2).join(' ') || parts[1], firstName: parts[0] + ' ' + parts[1] };
  }
  return { lastName: parts[0], firstName: parts.slice(1).join(' ') };
}

/**
 * Generates a vCard 3.0 formatted text string for a single contact
 */
export function generateVCardString(contact: Contact): string {
  const { lastName, firstName } = parseName(contact);
  const cleanMobile = cleanPhoneNumber(contact.mobilePhone);
  const cleanLandline = cleanPhoneNumber(contact.landlinePhone);
  const cleanAlt = cleanPhoneNumber(contact.altPhone);

  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contact.fullName}`,
    `N:${lastName};${firstName};;;`,
    `ORG:1^ Comunità S.AP.;Famiglia ${contact.familyGroup}`,
  ];

  if (cleanMobile) {
    // Prefix +39 for standard Italian mobile if not already prefixed
    const formatted = cleanMobile.startsWith('+') || cleanMobile.length > 10 ? cleanMobile : `+39${cleanMobile}`;
    lines.push(`TEL;TYPE=CELL,VOICE:${formatted}`);
  }

  if (cleanLandline) {
    const formatted = cleanLandline.startsWith('+') ? cleanLandline : `+39${cleanLandline}`;
    lines.push(`TEL;TYPE=HOME,VOICE:${formatted}`);
  }

  if (cleanAlt) {
    const formatted = cleanAlt.startsWith('+') ? cleanAlt : `+39${cleanAlt}`;
    lines.push(`TEL;TYPE=WORK,VOICE:${formatted}`);
  }

  const noteParts: string[] = ['1^ Comunità S.AP.'];
  if (contact.familyGroup) noteParts.push(`Famiglia: ${contact.familyGroup}`);
  if (contact.locationNote) noteParts.push(`Sede: ${contact.locationNote}`);
  if (contact.notes) noteParts.push(contact.notes);
  lines.push(`NOTE:${noteParts.join(' - ')}`);
  lines.push('CATEGORIES:1^ Comunità,Chiesa');
  lines.push('END:VCARD');

  return lines.join('\r\n');
}

/**
 * Downloads a .vcf file for a single contact.
 * When tapped on Android or iPhone, the system automatically opens "Add to Contacts".
 */
export function downloadSingleVCard(contact: Contact): void {
  const vcardText = generateVCardString(contact);
  const safeName = contact.fullName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `${safeName}.vcf`;

  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8' });
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
 * Downloads a combined .vcf file containing all contacts.
 * Allows importing the entire community address book in a single click on Android!
 */
export function downloadAllVCards(contacts: Contact[]): void {
  const allCards = contacts.map(c => generateVCardString(c)).join('\r\n\r\n');
  const blob = new Blob([allCards], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Tutti_Contatti_1_Comunita_S_AP.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
