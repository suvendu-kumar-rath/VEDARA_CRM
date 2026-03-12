import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function fmt(val) {
  const n = parseFloat(val);
  if (!n || isNaN(n)) return "-";
  // Manual Indian format (avoids locale/font issues in jsPDF)
  const fixed = Math.abs(n).toFixed(2);
  const [intPart, dec] = fixed.split(".");
  let grp = "";
  if (intPart.length <= 3) {
    grp = intPart;
  } else {
    grp = intPart.slice(-3);
    let rem = intPart.slice(0, -3);
    while (rem.length > 2) { grp = rem.slice(-2) + "," + grp; rem = rem.slice(0, -2); }
    grp = rem + "," + grp;
  }
  return (n < 0 ? "-" : "") + "Rs." + grp + "." + dec;
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

  //  Header 
  // Centered logo
  doc.setFont("helvetica", "bold");   doc.setFontSize(26); doc.setTextColor(...ACCENT);
  doc.text("vedara", pageW / 2, 18, { align: "center" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(8);  doc.setTextColor(130, 100, 40);
  doc.text("h o m e   d e s i g n   s t u d i o", pageW / 2, 25, { align: "center" });
  // Date top-right
  doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(100, 100, 100);
  doc.text("Date: " + today, pageW - mR, 18, { align: "right" });
  if (validUntil) doc.text("Valid Until: " + validUntil, pageW - mR, 24.5, { align: "right" });
  // Title bar
  const titleClient = projectInfo.clientName ? ", " + projectInfo.clientName : "";
  const titleText = "Interior Work Estimate For" + titleClient;
  doc.setFillColor(...SECTION_BG);
  doc.rect(mL, 29, cW, 9, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...WHITE);
  doc.text(titleText, pageW / 2, 35, { align: "center" });

  //  Row definitions 
  // section | room-header | subsection | info | field | check | dimension | item | subtotal | grandtotal | empty
  const rowDefs   = [];
  let   sno       = 1;
  let   grandTotal = 0;

  //  Small helpers 
  function pushSection(lbl)        { rowDefs.push({ type: "section",     label: lbl }); }
  function pushRoomHdr(lbl)        { rowDefs.push({ type: "room-header", label: lbl }); }
  function pushSubsec(lbl)         { rowDefs.push({ type: "subsection",  label: lbl }); }
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

  function pushDesc(roomObj) {
    if (!roomObj) return;
    const desc = roomObj.description
      || roomObj.basicInfo?.description
      || roomObj.basicInfo?.roomDescription
      || roomObj.roomDescription;
    if (desc && String(desc).trim()) pushField("Description", String(desc).trim());
  }

  // Render boolean / string fields of an object (skips _items arrays, basicInfo)
  const SKIP_RENDER = new Set([
    "items","basicInfo","lengthFt","widthFt","ceilingHeightFt",
    "ceilingHeight","largthFt","amount","description","item","total","id",
  ]);

  // Check if obj has any field that renderFlags would show
  function hasContent(obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    return Object.entries(obj).some(([k, v]) => {
      if (SKIP_RENDER.has(k) || k.endsWith("_items")) return false;
      if (v === false || v === null || v === undefined || v === "") return false;
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === "object") return hasContent(v);
      return true;
    });
  }
  function renderFlags(obj, subLabel) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
    const bools = [], fields = [], nested = [];
    Object.entries(obj).forEach(([k, v]) => {
      if (SKIP_RENDER.has(k) || k.endsWith("_items")) return;
      if (v === true)  bools.push(camelToTitle(k));
      else if (v === false || v === null || v === undefined || v === "") return;
      else if (Array.isArray(v)) { if (v.length > 0) fields.push([camelToTitle(k), v.join(", ")]); }
      else if (typeof v === "object") nested.push([camelToTitle(k), v]);
      else                             fields.push([camelToTitle(k), String(v)]);
    });
    if (bools.length === 0 && fields.length === 0 && nested.length === 0) return;
    if (subLabel) pushSubsec(subLabel);
    bools.forEach(b  => pushCheck(b));
    fields.forEach(([l, d]) => pushField(l, d));
    // Recurse into nested sub-objects (e.g. lighting, internalLayout, automationOptions)
    nested.forEach(([l, o]) => renderFlags(o, l));
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
      const dimNote = [
        area > 0 ? area + " sq.ft" : "",
        it.quantity ? "Qty: " + it.quantity : "",
      ].filter(Boolean).join("  ");
      const note = it.description || dimNote;
      rowDefs.push({ type: "item", sno: sno++, label: itemLabel(it), note, amount: amt });
      tot += amt;
    });
    return tot;
  }

  // Push every *_items (and plain items) array found on a room object; return total
  // Also reads amounts stored directly on sub-section objects (e.g. carpentry.amount, paint.amount)
  // and from kitchen/storeRoom-style `amounts` sub-objects.
  const AMOUNT_SECS = ['carpentry','otherCarpentry','paint','softFurnishing','softFurnishings',
    'plumbing','falseCeiling','floorCovering','flooring','electrical','civilWork','lighting',
    'ventilation','wardrobe','wallCovering','wallPaneling','floor','wall','safety',
    'modularKitchen','bathroom','helpBathroom','bedNiche','optionalEnhancements',
    'storageZoning','internalLayout','looseFurniture','greeneryPlanters','waterPlumbing'];

  function pushRoomItems(roomObj) {
    let tot = 0;

    // Top-level primitive flags on the room itself (e.g. storeRoom.budgetRange, .notes,
    // .metalStorageRacks; bedroom top-level booleans, etc.)
    // We render only non-object primitives here to avoid duplicating sub-section objects.
    {
      const bools = [], fields = [];
      Object.entries(roomObj).forEach(([k, v]) => {
        if (SKIP_RENDER.has(k) || k.endsWith("_items")) return;
        if (typeof v === "object" || Array.isArray(v)) return; // sub-objects handled below
        if (v === true) bools.push(camelToTitle(k));
        else if (v !== false && v !== null && v !== undefined && v !== "")
          fields.push([camelToTitle(k), String(v)]);
      });
      bools.forEach(b => pushCheck(b));
      fields.forEach(([l, d]) => pushField(l, d));
    }

    // Arrays of items
    Object.entries(roomObj).forEach(([k, v]) => {
      if (!Array.isArray(v)) return;
      const secName = k === "items" ? null : camelToTitle(k.replace(/_items$/, ""));
      tot += pushItems(v, secName);
    });

    // Named sub-sections — render flags + optional cost row
    AMOUNT_SECS.forEach(sec => {
      const secData = roomObj[sec];
      if (!secData || typeof secData !== "object" || Array.isArray(secData)) return;
      const amt = parseFloat(secData.amount) || 0;
      if (amt <= 0 && !hasContent(secData)) return;
      const label = (secData.item && String(secData.item).trim())
        ? String(secData.item).trim() : camelToTitle(sec);
      renderFlags(secData, camelToTitle(sec));
      if (amt > 0) {
        rowDefs.push({ type: "item", sno: sno++, label, note: secData.description || "", amount: amt });
        tot += amt;
      }
    });

    // amounts sub-object (bedroom / balcony / help-room style)
    if (roomObj.amounts && typeof roomObj.amounts === "object") {
      Object.entries(roomObj.amounts).forEach(([k, v]) => {
        if (k === "total") return;
        const amt = parseFloat(v) || 0;
        const secDetail = roomObj[k];
        const hasSec = secDetail && typeof secDetail === "object" && !Array.isArray(secDetail);
        if (amt <= 0 && (!hasSec || !hasContent(secDetail))) return;
        if (hasSec) renderFlags(secDetail, camelToTitle(k));
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
  if (pi.clientName)            rowDefs.push({ type: "info", label: "Client Name",           detail: pi.clientName });
  if (pi.projectAddress)        rowDefs.push({ type: "info", label: "Project Address",        detail: pi.projectAddress });
  if (pi.propertyType)          rowDefs.push({ type: "info", label: "Property Type",          detail: pi.propertyType });
  if (pi.unitType)              rowDefs.push({ type: "info", label: "Unit Type",              detail: pi.unitType });
  if (pi.totalCarpetAreaSqFt)   rowDefs.push({ type: "info", label: "Total Carpet Area",      detail: pi.totalCarpetAreaSqFt + " sq.ft" });
  if (pi.ceilingHeights?.general) rowDefs.push({ type: "info", label: "General Ceiling Height", detail: pi.ceilingHeights.general + " ft" });
  if (pi.windowInfo) {
    const wi = pi.windowInfo;
    const wParts = [];
    if (wi.windowCountPerRoom)  wParts.push(wi.windowCountPerRoom + " per room");
    if (wi.windowType)          wParts.push(wi.windowType);
    if (wi.sillHeightFeet)      wParts.push("Sill: " + wi.sillHeightFeet + " ft");
    if (wi.lintelHeightFeet)    wParts.push("Lintel: " + wi.lintelHeightFeet + " ft");
    if (wParts.length) rowDefs.push({ type: "info", label: "Window Info", detail: wParts.join("  |  ") });
  }
  if (validUntil) rowDefs.push({ type: "info", label: "Valid Until", detail: validUntil });
  if (notes)      rowDefs.push({ type: "info", label: "Notes",       detail: notes });

  // Reset sno so numbering starts from Section 2 onwards
  sno = 1;

  //  SECTION 2: GLOBAL PROJECT SCOPE 
  const scopeItems = globalScope.items || [];
  if (scopeItems.length > 0) {
    pushSection("GLOBAL PROJECT SCOPE");
    renderFlags(globalScope, null);
    let tot = 0;
    scopeItems.forEach(it => {
      const amt = itemAmt(it);
      rowDefs.push({ type: "item", sno: sno++, label: it.type || it.item || "\u2014", note: it.description || "", amount: amt });
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
      rowDefs.push({ type: "item", sno: sno++, label: it.type || it.item || "\u2014", note: it.description || "", amount: amt });
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
      pushDesc(effectiveRoom);
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
        const bdTot = pushRoomItems(br.bedroom);
        if (bdTot > 0) { rowDefs.push({ type: "subtotal", label: lbl + " Total", amount: bdTot }); grandTotal += bdTot; }
      }
      if (br.washroom) {
        pushSubsec("Washroom");
        pushDims(br.washroom.basicInfo);
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
      pushDesc(bal);
      const balTot = pushRoomItems(bal);
      if (balTot > 0) { rowDefs.push({ type: "subtotal", label: lbl + " Total", amount: balTot }); grandTotal += balTot; }
    });
  }

  if (!rowDefs.some(r => r.type === "item")) rowDefs.push({ type: "empty" });
  rowDefs.push({ type: "grandtotal", amount: grandTotal });

  //  Table 
  const colSno  = 14;               // Sl. No.
  const colItem = 54;               // Items of work
  const colAmt  = 44;               // Total cost (Rs.9,99,999.00 = 14 chars fits easily)
  const colDesc = cW - colSno - colItem - colAmt; // Description fills remainder

  const tableHead = [[
    { content: "Sl.\nNo.",           styles: { halign: "center", valign: "middle" } },
    { content: "Items of work",     styles: { halign: "left",   valign: "middle" } },
    { content: "Description",       styles: { halign: "left",   valign: "middle" } },
    { content: "Total cost (INR)",  styles: { halign: "right",  valign: "middle" } },
  ]];

  const tableBody = rowDefs.map(r => {
    switch (r.type) {
      case "section":    return [{ content: r.label, colSpan: 4, styles: { halign: "center", fontStyle: "bold" } }];
      case "room-header":return [{ content: r.label, colSpan: 4, styles: { halign: "center", fontStyle: "bold" } }];
      case "subsection": return [{ content: r.label, colSpan: 4, styles: { halign: "left",   fontStyle: "bold" } }];
      case "info":       return ["", r.label, r.detail || "", ""];
      case "field":      return ["", r.label, r.detail || "", ""];
      case "check":      return ["", "\u2713  " + r.label, "", ""];
      case "dimension":  return ["", "Dimensions", r.detail, ""];
      case "item":       return [r.sno, r.label, r.note || "", { content: fmt(r.amount), styles: { halign: "right" } }];
      case "subtotal":   return [{ content: r.label, colSpan: 3, styles: { halign: "right", fontStyle: "bold" } }, { content: fmt(r.amount), styles: { halign: "right", fontStyle: "bold" } }];
      case "grandtotal": return [{ content: "GRAND TOTAL", colSpan: 3, styles: { halign: "right", fontStyle: "bold", fontSize: 9 } }, { content: fmt(r.amount), styles: { halign: "right", fontStyle: "bold", fontSize: 9 } }];
      case "empty":      return [{ content: "No data entered yet.", colSpan: 4, styles: { halign: "center", fontStyle: "italic" } }];
      default:           return ["", "", "", ""];
    }
  });

  autoTable(doc, {
    startY:     41,
    margin:     { left: mL, right: mR },
    tableWidth: cW,
    head:       tableHead,
    body:       tableBody,
    theme:      "plain",
    styles: {
      font: "helvetica", fontSize: 8, textColor: [30, 30, 40],
      lineColor: [180, 180, 180], lineWidth: 0.2,
      overflow: "linebreak",
      cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
    },
    headStyles: {
      fillColor: [181, 148, 16], textColor: [255, 255, 255], fontStyle: "bold",
      fontSize: 9, lineColor: [150, 120, 10], lineWidth: 0.4,
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
    },
    columnStyles: {
      0: { cellWidth: colSno,  halign: "center", overflow: "hidden" },
      1: { cellWidth: colItem, halign: "left",   overflow: "linebreak" },
      2: { cellWidth: colDesc, halign: "left",   overflow: "linebreak" },
      3: { cellWidth: colAmt,  halign: "right",  overflow: "hidden", cellPadding: { top: 3, bottom: 3, left: 2, right: 4 } },
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
          doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(...WHITE);
          break;

        case "room-header":
          doc.setFillColor(...ROOM_HDR_BG);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(...WHITE);
          break;

        case "subsection":
          doc.setFillColor(...SUBSEC_BG);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(50,50,120);
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
          doc.setFont("helvetica","bold"); doc.setFontSize(6.5); doc.setTextColor(...WHITE);
          break;

        case "grandtotal":
          doc.setFillColor(...DARK);
          doc.rect(cell.cell.x, cell.cell.y, cell.cell.width, cell.cell.height, "F");
          doc.setFont("helvetica","bold"); doc.setFontSize(6.5); doc.setTextColor(...ACCENT);
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

  // ── Terms & Conditions last page ─────────────────────────────────────────────
  doc.addPage();

  // Section header bar
  doc.setFillColor(...SECTION_BG);
  doc.rect(mL, 18, cW, 8, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...WHITE);
  doc.text("TERMS & CONDITIONS", mL + cW / 2, 23.5, { align: "center" });

  autoTable(doc, {
    startY: 28,
    margin: { left: mL, right: mR },
    tableWidth: cW,
    body: [
      [{ content: "NOTE: The final price may vary with choice of materials and addition of any extra requirement by the client.", colSpan: 2 }],
      [{ content: "The proposal also includes 1 year free maintenance of any interior related glitch. The prices are inclusive of transportation and design charges.", colSpan: 2 }],
      [{ content: "Ply used will be of Austin/century BWP 710 grade, Fittings will be of Hettich. Outer finish will be of Premium Laminate & Acrylic finishing.", colSpan: 2 }],
      [{ content: "Above Timeline should be followed religiuosly for the work conduct. In case of any delay due to certain unavoidable reasons that should be considered as grace period, it should be pre-decided by the client and Vedara Spaces. If the work delays due to the company\u2019s fault, after the grace period of 14 days, The Client is eligible for Penalty clause of rupees 5000/Day.", colSpan: 2 }],
      [{ content: "", colSpan: 2 }],
      [
        { content: "OFFICIAL PARTNER - AUSTIN PLY, GREENPLY, GYPROC, HXPERTS." },
        { content: "VEDARA SPACES" },
      ],
    ],
    columnStyles: {
      0: { cellWidth: cW * 0.72 },
      1: { cellWidth: cW * 0.28 },
    },
    styles: {
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
      valign: "middle",
      textColor: [20, 20, 30],
      lineColor: [0, 0, 0],
      lineWidth: 0.4,
      cellPadding: { top: 7, right: 6, bottom: 7, left: 6 },
    },
    theme: "plain",
    didParseCell(data) {
      // Empty spacing row — taller padding
      if (data.row.index === 4) {
        data.cell.styles.cellPadding = { top: 14, right: 6, bottom: 14, left: 6 };
      }
      // Last row right cell — gold background, white text
      if (data.row.index === 5 && data.column.index === 1) {
        data.cell.styles.fillColor = ACCENT;
        data.cell.styles.textColor = WHITE;
        data.cell.styles.fontSize = 10;
      }
      // Last row left cell — left-aligned
      if (data.row.index === 5 && data.column.index === 0) {
        data.cell.styles.halign = "left";
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
