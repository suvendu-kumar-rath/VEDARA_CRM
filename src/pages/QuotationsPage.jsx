import React, { useState } from "react";
import CreateQuotationModal from "../components/CreateQuotationModal";

const quotationsData = [
  {
    id: 1,
    quoteId: "Q-2024-031",
    date: "March 15, 2024",
    projectName: "Juhu Villa Project",
    client: "Rajesh & Priya Mehra",
    designPhase: "Complete Home Interior",
    status: "Sent",
    statusColor: "yellow",
    sections: [
      {
        name: "Living Room",
        total: "₹4,85,000",
        items: [
          { name: "TV Unit & Wall Paneling", amount: "₹1,85,000" },
          { name: "Sofa & Seating", amount: "₹1,45,000" },
          { name: "Lighting & Electrical", amount: "₹85,000" },
          { name: "Decor & Accessories", amount: "₹70,000" }
        ]
      },
      {
        name: "Kitchen",
        total: "₹6,75,000",
        items: []
      },
      {
        name: "Master Bedroom",
        total: "₹3,95,000",
        items: []
      },
      {
        name: "Custom Work",
        total: "₹2,25,000",
        items: [
          { name: "Ceiling Design", amount: "₹65,000" },
          { name: "Wall Treatments", amount: "₹75,000" },
          { name: "Special Installations", amount: "₹65,000" }
        ]
      }
    ]
  },
  {
    id: 2,
    quoteId: "Q-2024-028",
    date: "March 12, 2024",
    projectName: "BKC Office Project",
    client: "TechCorp Solutions",
    designPhase: "Corporate Office Interior",
    status: "Draft",
    statusColor: "gray",
    sections: [
      {
        name: "Reception & Lobby",
        total: "₹8,50,000",
        items: []
      },
      {
        name: "Workstations & Cabins",
        total: "₹12,75,000",
        items: []
      },
      {
        name: "Conference Rooms",
        total: "₹6,25,000",
        items: []
      }
    ]
  }
];

export default function QuotationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedQuote, setSelectedQuote] = useState(quotationsData[0]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateQuotation = (formData) => {
    console.log("New quotation created:", formData);
    // Here you would typically add the new quotation to your state/backend
  };

  const toggleSection = (quoteId, sectionName) => {
    const key = `${quoteId}-${sectionName}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isSectionExpanded = (quoteId, sectionName) => {
    const key = `${quoteId}-${sectionName}`;
    return expandedSections[key];
  };

  const filteredQuotations = quotationsData.filter(quote =>
    quote.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.quoteId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateQuoteSummary = (quote) => {
    const subtotal = quote.sections.reduce((acc, section) => {
      const sectionAmount = parseFloat(section.total.replace(/[₹,]/g, ''));
      return acc + sectionAmount;
    }, 0);

    const designFee = subtotal * 0.08;
    const gst = (subtotal + designFee) * 0.18;
    const total = subtotal + designFee + gst;

    return {
      subtotal,
      designFee,
      gst,
      total,
      advance: total * 0.3,
      midPayment: total * 0.5,
      final: total * 0.2
    };
  };

  const summary = selectedQuote ? calculateQuoteSummary(selectedQuote) : null;

  return (
    <div className="flex-1 flex bg-dark">
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Quotations</h1>
            <p className="text-gray-text mt-1">Create, review, and approve project quotations</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-accent text-dark px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-500 transition text-sm font-medium w-fit"
          >
            <span className="text-lg">📋</span> Create New Quotation
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search projects, quotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-light border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
          />
        </div>

        {/* Quotation Cards */}
        <div className="space-y-4">
          {filteredQuotations.map((quote) => (
            <div
              key={quote.id}
              onClick={() => setSelectedQuote(quote)}
              className={`bg-dark-light border rounded-lg overflow-hidden transition cursor-pointer ${
                selectedQuote?.id === quote.id ? 'border-accent' : 'border-gray-border hover:border-gray-text'
              }`}
            >
              {/* Quote Header */}
              <div className="p-5 border-b border-gray-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{quote.projectName}</h3>
                    <p className="text-sm text-gray-text mb-2">
                      <span className="font-medium">Client:</span> {quote.client}
                    </p>
                    <p className="text-sm text-gray-text">
                      <span className="font-medium">Design Phase:</span> {quote.designPhase}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-text mb-2">
                      <div className="font-medium">Quote ID: {quote.quoteId}</div>
                      <div>{quote.date}</div>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                        quote.statusColor === 'yellow'
                          ? 'bg-accent text-dark'
                          : 'bg-gray-border text-gray-text'
                      }`}
                    >
                      {quote.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote Sections */}
              <div className="divide-y divide-gray-border">
                {quote.sections.map((section) => (
                  <div key={section.name}>
                    {/* Section Header */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSection(quote.id, section.name);
                      }}
                      className="w-full px-5 py-3 flex items-center justify-between hover:bg-dark transition text-left"
                    >
                      <span className="text-white font-medium">{section.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-accent font-semibold">{section.total}</span>
                        {section.items.length > 0 && (
                          <span className="text-gray-text text-lg">
                            {isSectionExpanded(quote.id, section.name) ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Section Items */}
                    {isSectionExpanded(quote.id, section.name) && section.items.length > 0 && (
                      <div className="bg-dark px-5 py-3">
                        {section.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-2 text-sm"
                          >
                            <span className="text-gray-text pl-4">{item.name}</span>
                            <span className="text-white">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar - Quote Summary */}
      <aside className="w-96 bg-dark-light border-l border-gray-border p-6 overflow-y-auto hidden lg:block">
        {selectedQuote && summary ? (
          <>
            <h2 className="text-lg font-bold text-white mb-6">Quote Summary</h2>

            {/* Financial Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-text">Subtotal</span>
                <span className="text-white font-medium">₹{summary.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-text">Design Fee (8%)</span>
                <span className="text-white font-medium">₹{summary.designFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-text">GST (18%)</span>
                <span className="text-white font-medium">₹{summary.gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-3 border-t border-gray-border">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Total Amount</span>
                  <span className="text-accent text-xl font-bold">
                    ₹{Math.round(summary.total).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Milestones */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Payment Milestones</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-text">Advance (30%)</span>
                  <span className="text-white font-medium">₹{Math.round(summary.advance).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-text">Mid Payment (50%)</span>
                  <span className="text-white font-medium">₹{Math.round(summary.midPayment).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-text">Final (20%)</span>
                  <span className="text-white font-medium">₹{Math.round(summary.final).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-accent text-dark px-4 py-3 rounded font-medium hover:bg-yellow-500 transition">
                Send to Client
              </button>
              <button className="w-full bg-dark border border-gray-border text-white px-4 py-3 rounded font-medium hover:border-accent hover:text-accent transition">
                Download PDF
              </button>
              <button className="w-full bg-dark border border-gray-border text-white px-4 py-3 rounded font-medium hover:border-accent hover:text-accent transition">
                Mark as Approved
              </button>
              <button className="w-full bg-dark border border-gray-border text-white px-4 py-3 rounded font-medium hover:border-accent hover:text-accent transition">
                Convert to Invoice
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-text py-10">
            Select a quotation to view summary
          </div>
        )}
      </aside>

      {/* Create Quotation Modal */}
      <CreateQuotationModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateQuotation={handleCreateQuotation}
      />
    </div>
  );
}
