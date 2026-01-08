// Sample data for the VEDARA CRM Lead Management system
// This file contains dummy data for development and testing

export const sampleLeads = [
  {
    id: 1,
    name: "Rajesh Sharma",
    phone: "+91 98705 43210",
    email: "rajesh.sharma@email.com",
    source: "Instagram",
    budget: "₹25-35 Lakhs",
    property: "Apartment",
    city: "Mumbai",
    address: "Andheri West, Mumbai, Maharashtra",
    followUp: "20 Jan",
    stage: "Site Visit",
    stageColor: "yellow",
    createdOn: "15 Jan 2026",
    leadScore: 4,
    leadScoreLabel: "Hot"
  },
  {
    id: 2,
    name: "Ananya Patel",
    phone: "+91 87654 32109",
    email: "ananya.patel@email.com",
    source: "Referral",
    budget: "₹40-50 Lakhs",
    property: "Villa",
    city: "Bangalore",
    address: "Whitefield, Bangalore, Karnataka",
    followUp: "18 Jan",
    stage: "Quote Shared",
    stageColor: "green",
    createdOn: "12 Jan 2026",
    leadScore: 5,
    leadScoreLabel: "Hot"
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    phone: "+91 76543 21098",
    email: "vikram.m@email.com",
    source: "Website",
    budget: "₹15-20 Lakhs",
    property: "Apartment",
    city: "Delhi",
    address: "Dwarka, New Delhi",
    followUp: "22 Jan",
    stage: "New",
    stageColor: "blue",
    createdOn: "14 Jan 2026",
    leadScore: 2,
    leadScoreLabel: "Cold"
  },
  {
    id: 4,
    name: "Meera Krishnan",
    phone: "+91 65432 10987",
    email: "meera.k@email.com",
    source: "Google Ads",
    budget: "₹60-80 Lakhs",
    property: "Penthouse",
    city: "Chennai",
    address: "Anna Nagar, Chennai, Tamil Nadu",
    followUp: "19 Jan",
    stage: "Discussion",
    stageColor: "yellow",
    createdOn: "10 Jan 2026",
    leadScore: 4,
    leadScoreLabel: "Hot"
  },
  {
    id: 5,
    name: "Arjun Reddy",
    phone: "+91 54321 09876",
    email: "arjun.reddy@email.com",
    source: "Instagram",
    budget: "₹30-40 Lakhs",
    property: "Villa",
    city: "Hyderabad",
    address: "Gachibowli, Hyderabad, Telangana",
    followUp: "21 Jan",
    stage: "Site Visit",
    stageColor: "yellow",
    createdOn: "13 Jan 2026",
    leadScore: 3,
    leadScoreLabel: "Warm"
  },
  {
    id: 6,
    name: "Kavitha Nair",
    phone: "+91 43210 98765",
    email: "kavitha.nair@email.com",
    source: "Referral",
    budget: "₹20-25 Lakhs",
    property: "Apartment",
    city: "Kochi",
    address: "Kakkanad, Kochi, Kerala",
    followUp: "23 Jan",
    stage: "New",
    stageColor: "blue",
    createdOn: "16 Jan 2026",
    leadScore: 3,
    leadScoreLabel: "Warm"
  },
  {
    id: 7,
    name: "Sanjay Kapoor",
    phone: "+91 32109 87654",
    email: "sanjay.kapoor@email.com",
    source: "Walk-in",
    budget: "₹1-1.5 Crore",
    property: "Commercial",
    city: "Mumbai",
    address: "Bandra Kurla Complex, Mumbai, Maharashtra",
    followUp: "17 Jan",
    stage: "Quote Shared",
    stageColor: "green",
    createdOn: "08 Jan 2026",
    leadScore: 5,
    leadScoreLabel: "Hot"
  },
  {
    id: 8,
    name: "Deepa Iyer",
    phone: "+91 21098 76543",
    email: "deepa.iyer@email.com",
    source: "Website",
    budget: "₹35-45 Lakhs",
    property: "Bungalow",
    city: "Pune",
    address: "Koregaon Park, Pune, Maharashtra",
    followUp: "24 Jan",
    stage: "Discussion",
    stageColor: "yellow",
    createdOn: "11 Jan 2026",
    leadScore: 4,
    leadScoreLabel: "Hot"
  }
];

export const sampleActivities = [
  {
    type: "Site Visit",
    title: "Site Visit Scheduled",
    description: "Client wants to visit the Andheri project site this weekend",
    time: "2 hours ago",
    by: "Arpita Singh",
    note: "Client is specifically interested in 2BHK units with sea view. Budget confirmed at ₹30 Lakhs."
  },
  {
    type: "Call",
    title: "Follow-up Call",
    description: "Discussed project amenities and payment plans",
    time: "Yesterday, 4:30 PM",
    by: "Arpita Singh"
  },
  {
    type: "Email",
    title: "Brochure Sent",
    description: "Sent project brochure and floor plans via email",
    time: "2 days ago",
    by: "System"
  },
  {
    type: "Discussion",
    title: "Initial Discussion",
    description: "First consultation about interior requirements",
    time: "3 days ago",
    by: "Arpita Singh",
    note: "Client prefers modern contemporary style. Timeline: 6-8 months."
  },
  {
    type: "Meeting",
    title: "Lead Created",
    description: "New lead inquiry from Instagram",
    time: "5 days ago",
    by: "System"
  }
];

export const leadStages = [
  { value: "New", label: "New", color: "blue" },
  { value: "Discussion", label: "Discussion", color: "yellow" },
  { value: "Site Visit", label: "Site Visit", color: "yellow" },
  { value: "Quote Shared", label: "Quote Shared", color: "green" },
  { value: "Negotiation", label: "Negotiation", color: "yellow" },
  { value: "Converted", label: "Converted", color: "green" },
  { value: "Dropped", label: "Dropped", color: "red" }
];

export const leadSources = [
  "Instagram",
  "Facebook",
  "Website",
  "Google Ads",
  "Referral",
  "Walk-in",
  "Email Campaign",
  "LinkedIn",
  "Trade Show",
  "Cold Call"
];

export const propertyTypes = [
  "Apartment",
  "Villa",
  "Penthouse",
  "Bungalow",
  "Commercial",
  "Office Space",
  "Retail Space",
  "Duplex",
  "Studio"
];

export const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Kochi"
];

// Activity type configurations
export const activityTypes = {
  "Site Visit": { icon: "🏠", color: "bg-accent" },
  "Discussion": { icon: "💬", color: "bg-blue-500" },
  "Quote Shared": { icon: "📄", color: "bg-green-500" },
  "Payment": { icon: "💰", color: "bg-green-500" },
  "Call": { icon: "📞", color: "bg-blue-500" },
  "Email": { icon: "📧", color: "bg-purple-500" },
  "Meeting": { icon: "👥", color: "bg-accent" },
  "Follow-up": { icon: "📅", color: "bg-orange-500" }
};

// Lead statistics
export const leadStats = {
  totalLeads: 8,
  hotLeads: 4,
  converted: 3,
  dropped: 1
};

// Quick action buttons configuration
export const quickActions = [
  {
    id: "call",
    icon: "📞",
    title: "Make a Call",
    description: "Connect instantly",
    action: "call"
  },
  {
    id: "email",
    icon: "📧",
    title: "Send Email",
    description: "Compose message",
    action: "email"
  },
  {
    id: "whatsapp",
    icon: "💬",
    title: "Send WhatsApp",
    description: "Quick message",
    action: "whatsapp"
  },
  {
    id: "quote",
    icon: "📄",
    title: "Generate Quote",
    description: "Create proposal",
    action: "quote"
  },
  {
    id: "site-visit",
    icon: "🏠",
    title: "Schedule Site Visit",
    description: "Book appointment",
    action: "site-visit"
  }
];

// Team members for assignment
export const teamMembers = [
  {
    id: 1,
    name: "Arpita Singh",
    initials: "PS",
    role: "Sales Manager",
    color: "from-accent to-yellow-600"
  },
  {
    id: 2,
    name: "Rahul Mehta",
    initials: "RM",
    role: "Sales Executive",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 3,
    name: "Anjali Desai",
    initials: "AD",
    role: "Design Consultant",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 4,
    name: "Karan Sharma",
    initials: "KS",
    role: "Project Manager",
    color: "from-green-500 to-green-600"
  }
];

// Helper function to get lead by ID
export const getLeadById = (id) => {
  return sampleLeads.find(lead => lead.id === parseInt(id)) || sampleLeads[0];
};

// Helper function to get stage color classes
export const getStageColorClasses = (stageColor) => {
  const colorMap = {
    yellow: "border-accent text-accent",
    green: "border-green-500 text-green-400",
    blue: "border-blue-500 text-blue-400",
    red: "border-red-500 text-red-400"
  };
  return colorMap[stageColor] || colorMap.blue;
};

// Helper function to get lead score stars
export const getLeadScoreStars = (score) => {
  return "⭐".repeat(score) + "☆".repeat(5 - score);
};
