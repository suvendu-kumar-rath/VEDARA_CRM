import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function fmt(val) {
  const n = parseFloat(val);
  if (!n || isNaN(n)) return "\u2014";
  return "\u20B9\u00A0" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtNum(val) {
  const n = parseFloat(val);
  return !n || isNaN(n) ? 0 : n;
}

function camelToTitle(str) {
  if (!str) return "";
  return str.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()).replace(/_/g, " ").trim();
}

function itemLabel(it) {
  return (it.item || it.type || it.itemType || it.name || "").trim() || "\u2014";
}

function itemAmt(it) {
  return fmtNum(it.total != null ? it.total : it.totalAmount != null ? it.totalAmount : it.amount);
}

/**
 * Generate a quotation PDF from the API response object.
 * Accepts the shape returned by the Create Quotation API (as in Postman).
 * @param {object} apiResponse
 */
export function generateQuotationPDF(apiResponse) {
  const {
    projectInfo     = {},
    globalScope     = {},
    deliverables    = {},
    roomWiseDetails = {},
    discountPercent = 0,
    validUntil      = "",
    notes           = "",
  } = (apiResponse || {});

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  //  Colours 
  const DARK        = [18, 18, 24];
  const ACCENT      = [234, 179, 8];
  const SECTION_BG  = [38, 38, 52];
  const ROOM_HDR_BG = [52, 52, 72];
  const SUBSEC_BG   = [230, 230, 250];
  const SUBTOTAL_BG = [55, 55, 75];
  const DIM_BG      = [218, 234, 255];
  const INFO_ALT    = [246, 246, 252];
  const WHITE       = [255, 255, 255];
  const LIGHT_GRAY  = [242, 242, 252];
  const BORDER      = [80, 80, 100];
  const LIGHT_TEXT  = [160, 160, 185];

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const mL    = 14;
  const mR    = 14;
  const cW    = pageW - mL - mR;

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

  //  Header Banner 
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pageW, 42, "F");
  doc.setFont("helvetica", "bold");   doc.setFontSize(22); doc.setTextColor(...ACCENT);
  doc.text("VEDARA", mL, 16);
  doc.setFont("helvetica", "normal"); doc.setFontSize(9);  doc.setTextColor(...WHITE);
  doc.text("Interior Design & Execution", mL, 23);
  doc.setFont("helvetica", "bold");   doc.setFontSize(16); doc.setTextColor(...WHITE);
  doc.text("QUOTATION", pageW - mR, 16, { align: "right" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(8);  doc.setTextColor(...LIGHT_TEXT);
  doc.text("Date: " + today, pageW - mR, 23, { align: "right" });
  if (validUntil) doc.text("Valid Until: " + validUntil, pageW - mR, 30, { align: "right" });

  //  Row definitions 
  // section | room-header | subsection | info | field | check | dimension | item | subtotal | grandtotal | empty
  const rowDefs   = [];
  let   sno       = 1;
  let   grandTotal = 0;

  //  Small helpers 
  function pushSection(lbl)        { rowDefs.push({ type: "section",    label: lbl }); }
  function pushRoomHdr(lbl)        { rowDefs.push({ type: "room-header",label: lbl }); }
  function pushSubsec(lbl)         { rowDefs.push({ type: "subsection", label: lbl }); }
  function pushField(lbl, val)     { if (val !== "" && val != null) rowDefs.push({ type: "field", label: lbl, detail: String(val) }); }
  function pushCheck(lbl)          { rowDefs.push({ type: "check", label: lbl }); }

  function pushDims(info) {
    if (!info) return;
    const L = info.lengthFt          || info.length;
    const W = info.widthFt           || info.width;
    const H = info.ceilingHeightFt   || info.ceilingHeight;
    const parts = [];
    if (L) parts.push("L: " + L + " ft");
    if (W) parts.push("W: " + W + " ft");
    if (H) parts.push("H: " + H + " ft");
    if (parts.length) rowDefs.push({ type: "dimension", detail: parts.join("   |   ") });
  }

  // Render boolean / string fields of an object (skips _items arrays, basicInfo)
  const SKIP_RENDER = new Set([
    "items","basicInfo","lengthFt","widthFt","ceilingHeightFt","length","width",
    "ceilingHeight","largthFt","amount",
  ]);
  function renderFlags(obj, subLabel) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
    const bools = [], fields = [];
    Object.entries(obj).forEach(([k, v]) => {
      if (SKIP_RENDER.has(k) || k.endsWith("_items")) return;
      if (v === true)  bools.push(camelToTitle(k));
      else if (v === false || v === null || v === undefined || v === "") return;
      else if (Array.isArray(v))           fields.push([camelToTitle(k), v.join(", ")]);
      else if (typeof v === "object")      return; // skip nested objects (caller recurses)
      else                                 fields.push([camelToTitle(k), String(v)]);
    });
    if (bools.length === 0 && fields.length === 0) return;
    if (subLabel) pushSubsec(subLabel);
    bools.forEach(b  => pushCheck(b));
    fields.forEach(([l, d]) => pushField(l, d));
  }

  // Push one *_items array as cost rows; return sum
  function pushItems(items, subLabel) {
    if (!items || items.length === 0) return 0;
    if (subLabel) pushSubsec(subLabel);
    let tot = 0;
    items.forEach(it => {
      const amt  = itemAmt(it);
      const area = fmtNum(it.areaSqFt != null ? it.areaSqFt : it.area);
      const ppsf = fmtNum(it.pricePerSqFt != null ? it.pricePerSqFt : it.pricePerSqft);
      const note = [
        area > 0 ? area + " sq.ft"                                                      : "",
        ppsf > 0 ? "@ \u20B9" + ppsf.toLocaleString("en-IN") + "/sq.ft"                : "",
        it.quantity ? "Qty: " + it.quantity                                              : "",
      ].filter(Boolean).join("  ");
      rowDefs.push({ type: "item", sno: sno++, label: itemLabel(it), note, amount: amt });
      tot += amt;
    });
    return tot;
  }

  // Push every *_items (and plain items) array found on a room object; return total
  // Also reads amounts stored directly on sub-section objects (e.g. carpentry.amount, paint.amount)
  // and from kitchen/storeRoom-style `amounts` sub-objects.
  const AMOUNT_SECS = ['carpentry','paint','softFurnishing','plumbing','falseCeiling',
    'floorCovering','electrical','civilWork','lighting','ventilation','wardrobe',
    'wallCovering','floor','wall','safety'];
  function pushRoomItems(roomObj) {
    let tot = 0;
    Object.entries(roomObj).forEach(([k, v]) => {
      if (!Array.isArray(v)) return;
      const secName = k === "items" ? null : camelToTitle(k.replace(/_items$/, ""));
      tot += pushItems(v, secName);
    });
    // Sub-section .amount fields (foyer / living-room style)
    AMOUNT_SECS.forEach(sec => {
      const secData = roomObj[sec];
      if (secData && typeof secData === "object" && !Array.isArray(secData) && secData.amount) {
        const amt = parseFloat(secData.amount) || 0;
        if (amt > 0) {
          rowDefs.push({ type: "item", sno: sno++, label: camelToTitle(sec), note: "", amount: amt });
          tot += amt;
        }
      }
    });
    // Kitchen / storeRoom-style `amounts` sub-object
    if (roomObj.amounts && typeof roomObj.amounts === "object") {
      Object.entries(roomObj.amounts).forEach(([k, v]) => {
        if (k === "total") return;
        const amt = parseFloat(v) || 0;
        if (amt > 0) {
          rowDefs.push({ type: "item", sno: sno++, label: camelToTitle(k), note: "", amount: amt });
          tot += amt;
        }
      });
    }
    return tot;
  }

  //  SECTION 1: PROJECT INFORMATION 
  pushSection("PROJECT INFORMATION");
  const pi = projectInfo;
  if (pi.clientName)            rowDefs.push({ type: "info", sno: sno++, label: "Client Name",           detail: pi.clientName });
  if (pi.projectAddress)        rowDefs.push({ type: "info", sno: sno++, label: "Project Address",        detail: pi.projectAddress });
  if (pi.propertyType)          rowDefs.push({ type: "info", sno: sno++, label: "Property Type",          detail: pi.propertyType });
  if (pi.unitType)              rowDefs.push({ type: "info", sno: sno++, label: "Unit Type",              detail: pi.unitType });
  if (pi.totalCarpetAreaSqFt)   rowDefs.push({ type: "info", sno: sno++, label: "Total Carpet Area",      detail: pi.totalCarpetAreaSqFt + " sq.ft" });
  if (pi.ceilingHeights?.general) rowDefs.push({ type: "info", sno: sno++, label: "General Ceiling Height", detail: pi.ceilingHeights.general + " ft" });
  if (pi.windowInfo) {
    const wi = pi.windowInfo;
    const wParts = [];
    if (wi.windowCountPerRoom)  wParts.push(wi.windowCountPerRoom + " per room");
    if (wi.windowType)          wParts.push(wi.windowType);
    if (wi.sillHeightFeet)      wParts.push("Sill: " + wi.sillHeightFeet + " ft");
    if (wi.lintelHeightFeet)    wParts.push("Lintel: " + wi.lintelHeightFeet + " ft");
    if (wParts.length) rowDefs.push({ type: "info", sno: sno++, label: "Window Info", detail: wParts.join("  |  ") });
  }
  if (validUntil) rowDefs.push({ type: "info", sno: sno++, label: "Valid Until", detail: validUntil });
  if (notes)      rowDefs.push({ type: "info", sno: sno++, label: "Notes",       detail: notes });

  //  SECTION 2: GLOBAL PROJECT SCOPE 
  const scopeItems = globalScope.items || [];
  if (scopeItems.length > 0) {
    pushSection("GLOBAL PROJECT SCOPE");
    renderFlags(globalScope, null);
    let tot = 0;
    scopeItems.forEach(it => {
      const amt = itemAmt(it);
      rowDefs.push({ type: "item", sno: sno++, label: it.type || it.item || "\u2014", note: "", amount: amt });
      tot += amt;
    });
    if (tot > 0) { rowDefs.push({ type: "subtotal", label: "Global Scope Total", amount: tot }); grandTotal += tot; }
  }

  //  SECTION 3: PROJECT DELIVERABLES 
  const delItems = deliverables.items || [];
  if (delItems.length > 0) {
    pushSection("PROJECT DELIVERABLES");
    renderFlags(deliverables, null);
    let tot = 0;
    delItems.forEach(it => {
      const amt = itemAmt(it);
      rowDefs.push({ type: "item", sno: sno++, label: it.type || it.item || "\u2014", note: "", amount: amt });
      tot += amt;
    });
    if (tot > 0) { rowDefs.push({ type: "subtotal", label: "Deliverables Total", amount: tot }); grandTotal += tot; }
  }

  //  SECTION 4: ROOM-WISE DETAILS 
  const ROOM_ORDER = ["mainEntrance","foyer","livingRoom","diningArea","kitchen","domesticHelpRoom","storeRoom"];
  const hasRooms = ROOM_ORDER.some(k => roomWiseDetails[k]);
  if (hasRooms) {
    pushSection("ROOM-WISE DETAILS");
    ROOM_ORDER.forEach(key => {
      const room = roomWiseDetails[key];
      if (!room) return;
      // Unwrap nested room-specific data (e.g. room.foyer.foyer → merge into room.foyer)
      const innerData = room[key];
      const effectiveRoom = (innerData && typeof innerData === "object" && !Array.isArray(innerData))
        ? { ...room, ...innerData }
        : room;
      const roomName = camelToTitle(key);
      pushRoomHdr(roomName);
      pushDims(effectiveRoom.basicInfo);
      // Render feature flags from each non-items sub-object
      Object.entries(effectiveRoom).forEach(([sk, sv]) => {
        if (sk === "basicInfo" || sk.endsWith("_items") || sk === "items" || sk === key) return;
        if (sv && typeof sv === "object" && !Array.isArray(sv)) renderFlags(sv, camelToTitle(sk));
      });
      // Cost items
      const roomTot = pushRoomItems(effectiveRoom);
      if (roomTot > 0) { rowDefs.push({ type: "subtotal", label: roomName + " Total", amount: roomTot }); grandTotal += roomTot; }
    });
  }

  //  SECTION 5: BEDROOMS + WASHROOMS 
  const bedrooms = roomWiseDetails.bedrooms || [];
  if (bedrooms.length > 0) {
    pushSection("BEDROOMS + WASHROOMS");
    bedrooms.forEach((br, idx) => {
      const lbl = "Bedroom " + (idx + 1);
      pushRoomHdr(lbl);
      if (br.bedroom) {
        pushSubsec("Bedroom");
        pushDims(br.bedroom.basicInfo);
        Object.entries(br.bedroom).forEach(([k, v]) => {
          if (k === "basicInfo" || k.endsWith("_items")) return;
          if (v && typeof v === "object" && !Array.isArray(v)) renderFlags(v, camelToTitle(k));
        });
        const bdTot = pushRoomItems(br.bedroom);
        if (bdTot > 0) { rowDefs.push({ type: "subtotal", label: lbl + " Total", amount: bdTot }); grandTotal += bdTot; }
      }
      if (br.washroom) {
        pushSubsec("Washroom");
        pushDims(br.washroom.basicInfo);
        Object.entries(br.washroom).forEach(([k, v]) => {
          if (k === "basicInfo" || k.endsWith("_items")) return;
          if (v && typeof v === "object" && !Array.isArray(v)) renderFlags(v, camelToTitle(k));
        });
        const wsTot = pushRoomItems(br.washroom);
        if (wsTot > 0) { rowDefs.push({ type: "subtotal", label: lbl + " Washroom Total", amount: wsTot }); grandTotal += wsTot; }
      }
    });
  }

  //  SECTION 6: BALCONIES 
  const balconies = roomWiseDetails.balconies || [];
  if (balconies.length > 0) {
    pushSection("BALCONIES");
    balconies.forEach((bal, idx) => {
      const lbl = "Balcony " + (idx + 1);
      pushRoomHdr(lbl);
      pushDims(bal.basic);
      Object.entries(bal).forEach(([k, v]) => {
        if (k === "basic" || k.endsWith("_items")) return;
        if (v && typeof v === "object" && !Array.isArray(v)) renderFlags(v, camelToTitle(k));
      });
      const balTot = pushRoomItems(bal);
      if (balTot > 0) { rowDefs.push({ type: "subtotal", label: lbl + " Total", amount: balTot }); grandTotal += balTot; }
    });
  }

  if (!rowDefs.some(r => r.type === "item")) rowDefs.push({ type: "empty" });
  rowDefs.push({ type: "grandtotal", amount: grandTotal });

  //  Table 
  const colSno  = 12;
  const colNote = 52;
  const colAmt  = 40;
  const colDesc = cW - colSno - colNote - colAmt;

  const tableHead = [[
    { content: "S.No",            styles: { halign: "center" } },
    { content: "Description",     styles: { halign: "left"   } },
    { content: "Details / Note",  styles: { halign: "left"   } },
    { content: "Amount (\u20B9)", styles: { halign: "right"  } },
  ]];

  const tableBody = rowDefs.map(r => {
    switch (r.type) {
      case "section":    return ["", r.label, "", ""];
      case "room-header":return ["", r.label, "", ""];
      case "subsection": return ["", r.label, "", ""];
      case "info":       return [r.sno, r.label, r.detail || "", ""];
      case "field":      return ["", r.label, r.detail || "", ""];
      case "check":      return ["", "\u2713  " + r.label, "", ""];
      case "dimension":  return ["", "Dimensions", r.detail, ""];
      case "item":       return [r.sno, r.label, r.note || "", fmt(r.amount)];
      case "subtotal":   return ["", r.label, "", fmt(r.amount)];
      case "grandtotal": return ["", "GRAND TOTAL", "", fmt(r.amount)];
      case "empty":      return ["", "No data entered yet.", "", "\u2014"];
      default:           return ["", "", "", ""];
    }
  });

  autoTable(doc, {
    startY:     46,
    margin:     { left: mL, right: mR },
    tableWidth: cW,
    head:       tableHead,
    body:       tableBody,
    theme:      "plain",
    styles: {
      font: "helvetica", fontSize: 7.5, textColor: [30, 30, 40],
      lineColor: BORDER, lineWidth: 0.15,
      overflow: "linebreak",
      cellPadding: { top: 2, bottom: 2, left: 3, right: 3 },
    },
    headStyles: {
      fillColor: DARK, textColor: ACCENT, fontStyle: "bold",
      fontSize: 8.5, lineColor: BORDER, lineWidth: 0.35,
    },
    columnStyles: {
      0: { cellWidth: colSno,  halign: "center", overflow: "linebreak" },
      1: { cellWidth: colDesc, halign: "left",   overflow: "linebreak" },
      2: { cellWidth: colNote, halign: "left",   overflow: "linebreak" },
      3: { cellWidth: colAmt,  halign: "right",  overflow: "linebreak" },
    },
    willDrawCell(cell) {
      const idx = cell.row.index;
      const row = rowDefs[idx];
      if (!row) return;
      const ci = cell.column.index;

      switch (row.type) {
        case "section":
          doc.setFillColor(...SECTION_BG);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          if (ci === 1) { doc.setFont("helvetica","bold"); doc.setFontSize(8.5); doc.setTextColor(...ACCENT); }
          else            doc.setTextColor(...SECTION_BG);
          break;

        case "room-header":
          doc.setFillColor(...ROOM_HDR_BG);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          doc.setFont("helvetica","bold"); doc.setFontSize(8);
          doc.setTextColor(...(ci === 1 ? WHITE : ROOM_HDR_BG));
          break;

        case "subsection":
          doc.setFillColor(...SUBSEC_BG);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          if (ci === 1) { doc.setFont("helvetica","bold"); doc.setFontSize(7.5); doc.setTextColor(50,50,120); }
          else            doc.setTextColor(...SUBSEC_BG);
          break;

        case "dimension":
          doc.setFillColor(...DIM_BG);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          doc.setFont("helvetica","italic"); doc.setFontSize(7.5); doc.setTextColor(40,60,120);
          break;

        case "info": {
          const bg = idx % 2 === 0 ? INFO_ALT : WHITE;
          doc.setFillColor(...bg);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          if      (ci === 1) { doc.setFont("helvetica","bold");   doc.setFontSize(7.5); doc.setTextColor(60,60,90);  }
          else if (ci === 2) { doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(30,30,40);  }
          else                 doc.setTextColor(...bg);
          break;
        }

        case "field": {
          const bg = idx % 2 === 0 ? INFO_ALT : WHITE;
          doc.setFillColor(...bg);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          if      (ci === 1) { doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(80,80,110); }
          else if (ci === 2) { doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(30,30,40);  }
          else                 doc.setTextColor(...bg);
          break;
        }

        case "check": {
          const bg = idx % 2 === 0 ? INFO_ALT : WHITE;
          doc.setFillColor(...bg);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          if (ci === 1) { doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(30,100,50); }
          else            doc.setTextColor(...bg);
          break;
        }

        case "subtotal":
          doc.setFillColor(...SUBTOTAL_BG);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(...WHITE);
          break;

        case "grandtotal":
          doc.setFillColor(...DARK);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          doc.setFont("helvetica","bold"); doc.setFontSize(11); doc.setTextColor(...ACCENT);
          break;

        case "empty":
          doc.setFillColor(...LIGHT_GRAY);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          doc.setFont("helvetica","italic"); doc.setFontSize(8); doc.setTextColor(120,120,140);
          break;

        default:
          if (idx % 2 === 1) { doc.setFillColor(...LIGHT_GRAY); doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F"); }
          doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(30,30,40);
          break;
      }
    },
  });

  //  Footer 
  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFillColor(...DARK);
    doc.rect(0, pageH - 12, pageW, 12, "F");
    doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(150,150,170);
    doc.text("VEDARA \u2014 Interior Design & Execution | Preliminary quotation subject to revision.", mL, pageH - 5);
    doc.text("Page " + p + " of " + totalPages, pageW - mR, pageH - 5, { align: "right" });
  }

  //  Save 
  const slug = (pi.clientName || "Client").replace(/\s+/g, "_");
  doc.save("Vedara_Quotation_" + slug + "_" + today.replace(/ /g, "-") + ".pdf");
}
