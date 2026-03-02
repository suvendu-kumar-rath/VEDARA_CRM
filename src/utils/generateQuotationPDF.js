import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ─── Label maps for each room's amounts keys ─────────────────────────────────
const AMOUNT_LABELS = {
  // Living Room / Dining Area
  basicInfo:        "Basic Info",
  civilWork:        "Civil Work",
  falseCeiling:     "False Ceiling",
  floorCovering:    "Floor Covering",
  softFurnishings:  "Soft Furnishings",
  wallPaneling:     "Wall Paneling",
  carpentry:        "Carpentry",
  electrical:       "Electrical",
  paint:            "Paint",
  // Kitchen extras
  modularKitchen:   "Modular Kitchen",
  plumbing:         "Plumbing",
  // Domestic Help Room extras
  bathroom:         "Help Bathroom",
  flooring:         "Flooring",
  // Store Room extras
  lighting:         "Lighting",
  ventilation:      "Ventilation",
  // Washroom extras
  wallCovering:     "Wall Covering",
  sanitary:         "Sanitary Fittings",
  // Bedroom+Washroom extras
  bedroomCivil:     "Bedroom Civil Work",
  wardrobe:         "Wardrobe",
  washroomWork:     "Washroom Work",
  washroomElectrical: "Washroom Electrical",
  // Balcony extras
  civil:            "Civil Work",
  ceiling:          "Ceiling",
};

function fmt(val) {
  const num = parseFloat(val);
  if (!num) return "—";
  return "₹ " + num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtNum(val) {
  const num = parseFloat(val);
  if (!num || isNaN(num)) return 0;
  return num;
}

/**
 * Builds rows for a single amounts object.
 * Returns { rows: [[label, amount]], sectionTotal: number }
 */
function buildAmountRows(amounts, startSno) {
  const rows = [];
  let sno = startSno;
  let sectionTotal = 0;

  Object.entries(amounts).forEach(([key, val]) => {
    if (key === "total") return; // skip total key — we'll show our own
    const num = fmtNum(val);
    if (num > 0) {
      rows.push([sno++, AMOUNT_LABELS[key] || key, fmt(val)]);
      sectionTotal += num;
    }
  });

  // Fall back to stored total if no line items but total has value
  if (rows.length === 0 && fmtNum(amounts.total) > 0) {
    sectionTotal = fmtNum(amounts.total);
  }

  return { rows, sectionTotal, nextSno: sno };
}

/**
 * Adds a section block to the PDF bodies array.
 * body rows: [ [sno, description, amount], ... ]
 * Returns updated running sno and grand total.
 */
function addSection(bodies, sectionName, amounts, sno, grandTotal) {
  if (!amounts) return { sno, grandTotal };

  const hasAnyValue = Object.entries(amounts).some(
    ([k, v]) => k !== "total" && fmtNum(v) > 0
  );
  const hasTotal = fmtNum(amounts.total) > 0;
  if (!hasAnyValue && !hasTotal) return { sno, grandTotal };

  const { rows, sectionTotal, nextSno } = buildAmountRows(amounts, sno);

  bodies.push({
    sectionName,
    rows,
    sectionTotal,
  });

  return { sno: nextSno, grandTotal: grandTotal + sectionTotal };
}

export function generateQuotationPDF(formData, bedroomWashroomInstances, balconyInstances) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // ── Colours ──────────────────────────────────────────────────────────────
  const DARK        = [18, 18, 24];      // #121218
  const ACCENT      = [234, 179, 8];     // yellow-500
  const HEADER_BG   = [30, 30, 40];
  const SECTION_BG  = [40, 40, 55];
  const TOTAL_BG    = [50, 50, 70];
  const WHITE       = [255, 255, 255];
  const LIGHT_GRAY  = [240, 240, 248];
  const BORDER      = [80, 80, 100];

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginL = 14;
  const marginR = 14;
  const contentW = pageW - marginL - marginR;

  // ── Header Banner ─────────────────────────────────────────────────────────
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pageW, 40, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...ACCENT);
  doc.text("VEDARA", marginL, 16);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...WHITE);
  doc.text("Interior Design & Execution", marginL, 22);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...WHITE);
  doc.text("QUOTATION", pageW - marginR, 16, { align: "right" });

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 180, 200);
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  doc.text(`Date: ${today}`, pageW - marginR, 22, { align: "right" });

  // ── Project Info Box ──────────────────────────────────────────────────────
  doc.setFillColor(...HEADER_BG);
  doc.setDrawColor(...BORDER);
  doc.roundedRect(marginL, 44, contentW, 28, 2, 2, "FD");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...ACCENT);
  doc.text("PROJECT DETAILS", marginL + 4, 51);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...WHITE);
  const infoLeft = [
    ["Client", formData.clientName || "—"],
    ["Address", formData.projectAddress || "—"],
  ];
  const infoRight = [
    ["Property Type", formData.propertyType || "—"],
    ["Unit Type", formData.unitType || "—"],
    ["Carpet Area", formData.totalCarpetArea ? `${formData.totalCarpetArea} sq.ft` : "—"],
  ];

  let iy = 58;
  infoLeft.forEach(([label, value]) => {
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(180, 180, 200);
    doc.text(`${label}:`, marginL + 4, iy);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...WHITE);
    doc.text(value, marginL + 24, iy);
    iy += 6;
  });

  iy = 58;
  infoRight.forEach(([label, value]) => {
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(180, 180, 200);
    doc.text(`${label}:`, pageW / 2 + 4, iy);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...WHITE);
    doc.text(value, pageW / 2 + 30, iy);
    iy += 6;
  });

  // ── Build sections data ───────────────────────────────────────────────────
  const bodies = [];  // [{ sectionName, rows, sectionTotal }]
  let sno = 1;
  let grandTotal = 0;

  const rooms = formData.rooms || {};

  // Helper to get room data amounts by room key in roomData
  const pushRoom = (displayName, roomData, amountsKey) => {
    if (!roomData) return;
    const result = addSection(bodies, displayName, roomData[amountsKey]?.amounts || roomData.amounts, sno, grandTotal);
    sno = result.sno;
    grandTotal = result.grandTotal;
  };

  // Iterate all rooms in formData.rooms
  Object.entries(rooms).forEach(([roomName, roomData]) => {
    if (!roomData) return;

    if (roomName === "Kitchen") {
      const result = addSection(bodies, "Kitchen", roomData.kitchen?.amounts, sno, grandTotal);
      sno = result.sno; grandTotal = result.grandTotal;
    } else if (roomName === "Living Room" || roomName === "Drawing Room") {
      const result = addSection(bodies, roomName, roomData.livingRoom?.amounts, sno, grandTotal);
      sno = result.sno; grandTotal = result.grandTotal;
    } else if (roomName === "Dining Area" || roomName === "Dining Room") {
      const result = addSection(bodies, roomName, roomData.diningArea?.amounts, sno, grandTotal);
      sno = result.sno; grandTotal = result.grandTotal;
    } else if (roomName === "Domestic Help Room") {
      const result = addSection(bodies, "Domestic Help Room", roomData.domesticHelpRoom?.amounts, sno, grandTotal);
      sno = result.sno; grandTotal = result.grandTotal;
    } else if (roomName === "Store Room") {
      const result = addSection(bodies, "Store Room", roomData.storeRoom?.amounts, sno, grandTotal);
      sno = result.sno; grandTotal = result.grandTotal;
    } else if (roomName.toLowerCase().includes("washroom")) {
      const result = addSection(bodies, roomName, roomData.washroom?.amounts, sno, grandTotal);
      sno = result.sno; grandTotal = result.grandTotal;
    } else {
      // Generic room — try to find any amounts object directly
      const amt = roomData.amounts;
      if (amt) {
        const result = addSection(bodies, roomName, amt, sno, grandTotal);
        sno = result.sno; grandTotal = result.grandTotal;
      }
    }
  });

  // Bedroom + Washroom instances
  bedroomWashroomInstances.forEach((inst) => {
    const result = addSection(bodies, inst.name || `Bedroom + Washroom ${inst.id}`, inst.amounts, sno, grandTotal);
    sno = result.sno; grandTotal = result.grandTotal;
  });

  // Balcony instances
  balconyInstances.forEach((inst) => {
    const result = addSection(bodies, inst.name || `Balcony ${inst.id}`, inst.amounts, sno, grandTotal);
    sno = result.sno; grandTotal = result.grandTotal;
  });

  // ── Render table ──────────────────────────────────────────────────────────
  let startY = 78;

  // Column widths
  const colSno  = 14;
  const colAmt  = 38;
  const colDesc = contentW - colSno - colAmt;

  const allRows = [];

  bodies.forEach(({ sectionName, rows, sectionTotal }) => {
    // Section header
    allRows.push({ type: "section", label: sectionName });
    // Detail rows
    rows.forEach((r) => allRows.push({ type: "row", data: r }));
    // Section total
    allRows.push({ type: "subtotal", label: `${sectionName} Total`, amount: sectionTotal });
  });

  // Grand total
  allRows.push({ type: "grandtotal", amount: grandTotal });

  // If no data at all
  if (bodies.length === 0) {
    allRows.push({ type: "empty" });
  }

  // Custom render using autoTable with willDrawCell
  const tableBody = allRows.map((r) => {
    if (r.type === "section")    return ["", r.label, ""];
    if (r.type === "row")        return r.data;
    if (r.type === "subtotal")   return ["", `${r.label}`, fmt(r.amount)];
    if (r.type === "grandtotal") return ["", "GRAND TOTAL", fmt(r.amount)];
    if (r.type === "empty")      return ["", "No amount data entered in the form.", ""];
    return ["", "", ""];
  });

  autoTable(doc, {
    startY,
    margin: { left: marginL, right: marginR },
    tableWidth: contentW,
    head: [[
      { content: "S.No", styles: { halign: "center" } },
      { content: "Description", styles: { halign: "left" } },
      { content: "Amount (₹)", styles: { halign: "right" } },
    ]],
    body: tableBody,
    theme: "plain",
    styles: {
      font: "helvetica",
      fontSize: 9,
      textColor: [30, 30, 40],
      lineColor: BORDER,
      lineWidth: 0.3,
      cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
    },
    headStyles: {
      fillColor: DARK,
      textColor: ACCENT,
      fontStyle: "bold",
      fontSize: 9.5,
      lineColor: BORDER,
      lineWidth: 0.4,
    },
    columnStyles: {
      0: { cellWidth: colSno,  halign: "center" },
      1: { cellWidth: colDesc, halign: "left" },
      2: { cellWidth: colAmt,  halign: "right" },
    },
    willDrawCell(data) {
      const rowIdx = data.row.index;
      const row = allRows[rowIdx];
      if (!row) return;

      if (row.type === "section") {
        doc.setFillColor(...SECTION_BG);
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
        if (data.column.index === 1) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);
          doc.setTextColor(...ACCENT);
        } else {
          doc.setTextColor(...SECTION_BG); // hide other cols
        }
      } else if (row.type === "subtotal") {
        doc.setFillColor(...TOTAL_BG);
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(...WHITE);
      } else if (row.type === "grandtotal") {
        doc.setFillColor(...DARK);
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(...ACCENT);
      } else if (row.type === "empty") {
        doc.setFillColor(...LIGHT_GRAY);
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.5);
        doc.setTextColor(120, 120, 140);
      } else {
        // Normal row — alternating
        if (rowIdx % 2 === 1) {
          doc.setFillColor(...LIGHT_GRAY);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
        }
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...DARK);
      }
    },
  });

  // ── Footer on all pages ───────────────────────────────────────────────────
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(...DARK);
    doc.rect(0, pageH - 12, pageW, 12, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 170);
    doc.text("VEDARA — Interior Design & Execution | This is a preliminary quotation subject to revision.", marginL, pageH - 5);
    doc.text(`Page ${i} of ${totalPages}`, pageW - marginR, pageH - 5, { align: "right" });
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  const clientSlug = (formData.clientName || "Client").replace(/\s+/g, "_");
  doc.save(`Vedara_Quotation_${clientSlug}_${today.replace(/ /g, "-")}.pdf`);
}
