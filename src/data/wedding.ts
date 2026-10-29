export interface WeddingEvent {
  id: string;
  name: string;
  subtitle?: string;
  date: string; // e.g. "Monday, November 16, 2026"
  dayOfWeek: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  dressCode?: string;
  description?: string;
  isMainEvent?: boolean;
}

export interface WeddingData {
  groom: {
    firstName: string;
    fullName: string;
    qualification?: string;
    parents: string;
    familyDetails?: string;
    paternalGrandfather?: string;
    maternalGrandfather?: string;
  };
  bride: {
    firstName: string;
    fullName: string;
    qualification?: string;
    parents: string;
    familyDetails?: string;
    paternalGrandfather?: string;
  };
  ceremony: {
    title: string;
    bismillahArabic: string;
    bismillahEnglish: string;
    inshaAllahText: string;
    invitationMessage: string;
    tagline: string;
    bestCompliments: string;
    date: string;
    time: string;
    isoDateTime: string; // For countdown calculation in IST (UTC+05:30)
    timezone: string;
    venueName: string;
    venueAddress: string;
    mapsUrl: string;
    dressCode?: string;
  };
  events: WeddingEvent[];
  rsvp: {
    deadlineDate?: string;
    phone: string;
    whatsappNumber: string; // international format without spaces/dashes
    contactPerson: string;
    note?: string;
  };
  media: {
    backgroundMusic?: string;
    coverCardImage: string;
    insideCardImage: string;
  };
  website: {
    title: string;
    description: string;
    hashtag: string;
    monogram: string;
    canonicalUrl?: string;
  };
}

export const weddingData: WeddingData = {
  groom: {
    firstName: "Ibnan",
    fullName: "Ibnan Shaik",
    qualification: "M.B.A.",
    parents: "Mr. & Mrs. A.H. Shabeer Hussain",
    familyDetails: "Prop. SHEIKH TRADERS, Mysore",
    paternalGrandfather: "Late Janab Alhaj AHMED HUSSAIN Saheb",
    maternalGrandfather: "Janab Alhaj GHOUSE KHAN Saheb",
  },
  bride: {
    firstName: "Tanziya",
    fullName: "Tanziya Banu",
    qualification: "B.Com.",
    parents: "Janab MOHAMMED FAIROZ Saheb",
    paternalGrandfather: "Late Janab MOHAMMED DASTAGIR Saheb",
  },
  ceremony: {
    title: "VALIMA CEREMONY",
    bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahEnglish: "In the name of ALLAH, the Most Gracious, the Most Merciful",
    inshaAllahText: "Insha Allah",
    invitationMessage:
      "We cordially invite your esteemed presence with family and blessings on the Valima Ceremony of our son",
    tagline: "Your name is in our heart — You & Your family are invited",
    bestCompliments: "With Best Compliments From : Relatives & Friends",
    date: "Monday, 16th November 2026",
    time: "Dinner : 7:30 p.m. onwards",
    isoDateTime: "2026-11-16T19:30:00+05:30",
    timezone: "Asia/Kolkata",
    venueName: "Hilton Garden",
    venueAddress: "Beside Siddiqia Arabic College, Mys.-B'lore Road, Bannimantap, Mysore - 570015",
    mapsUrl: "https://maps.google.com/?q=Hilton+Garden+Convention+Centre,+Mysore-Bangalore+Road,+Bannimantap,+Mysore",
    dressCode: "Traditional Royal / Elegant Formal",
  },
  events: [
    {
      id: "valima",
      name: "Valima Ceremony",
      subtitle: "The Grand Wedding Reception",
      date: "16th November 2026",
      dayOfWeek: "Monday",
      time: "7:30 PM Onwards",
      venue: "Hilton Garden",
      address: "Beside Siddiqia Arabic College, Mys.-B'lore Road, Mysore",
      mapsUrl: "https://maps.google.com/?q=Hilton+Garden+Convention+Centre,+Mysore-Bangalore+Road,+Bannimantap,+Mysore",
      dressCode: "Traditional / Elegant Formal",
      description: "Join us for an evening of celebration, heartfelt prayers, and a sumptuous royal banquet dinner.",
      isMainEvent: true,
    },
    {
      id: "nikah",
      name: "Nikah Ceremony",
      subtitle: "Solemnization of Marriage",
      date: "16th November 2026",
      dayOfWeek: "Monday",
      time: "11:30 AM",
      venue: "Grand Occasion Hall",
      address: "Mysore, Karnataka",
      mapsUrl: "https://maps.google.com/?q=Mysore,+Karnataka",
      dressCode: "Traditional Attire",
      description: "The sacred union and vows in accordance with Islamic tradition, seeking divine blessings.",
      isMainEvent: false,
    },
  ],
  rsvp: {
    deadlineDate: "November 10, 2026",
    phone: "+91 9900213276",
    whatsappNumber: "919900213276",
    contactPerson: "Mr. A.H. Shabeer Hussain",
    note: "Please let us know your attendance to help us arrange the banquet gracefully.",
  },
  media: {
    backgroundMusic: "/audio/wedding-melody.mp3",
    coverCardImage: "/images/wedding-card-cover.jpg",
    insideCardImage: "/images/wedding-card-inside.jpg",
  },
  website: {
    title: "Ibnan & Tanziya | Wedding & Valima Invitation",
    description: "Mr. & Mrs. A.H. Shabeer Hussain cordially invite you and your family to celebrate the Valima Ceremony of Ibnan Shaik and Tanziya Banu on Monday, 16th November 2026 at Hilton Garden, Mysore.",
    hashtag: "#IbnanWedsTanziya",
    monogram: "IT",
  },
};
