import React, { useState } from "react";

export default function FormsPage() {
  const [formData, setFormData] = useState({
    projectAddress: "",
    clientName: "",
    propertyType: "",
    unitType: "",
    totalCarpetArea: "",
    ceilingHeights: {
      general: "",
      floorToFloor: "",
      foyer: "",
      living: "",
      dining: "",
      kitchen: "",
      bedroom1: "",
      bedroom2: "",
      bedroom3: "",
      bedroom4: "",
      bedroom5: "",
      storeRoom: "",
      helpRoom: "",
    },
    windowInfo: {
      count: "",
      sillHeight: "",
      lintelHeight: "",
      type: "",
    },
    globalScope: {
      fullHomeRenovation: false,
      interiorFitOut: false,
      civilInteriorTurnkey: false,
      onlineDesignOnly: false,
      materialSelection: false,
      projectManagement: false,
      furnitureStyling: false,
      vastuConsultation: false,
    },
    // Project Deliverables
    deliverables: {
      layouts2D: false,
      furnitureLayout: false,
      electricalLayout: false,
      plumbingLayout: false,
      ceilingLayout: false,
      tileLayout: false,
      workingDrawings: false,
      renders3D: false,
      materialBoards: false,
      BOQ: false,
      siteVisits: false,
      vendorCoordination: false,
      procurementSupport: false,
      finalStyling: false,
      photoshoot: false,
    },
    // Rooms
    rooms: {},
  });

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    projectInfo: true,
    globalScope: true,
    deliverables: true,
    rooms: true,
  });

  // State for which rooms are expanded
  const [expandedRooms, setExpandedRooms] = useState({});

  // Available rooms
  const roomsList = [
    "Main Entrance",
    "Foyer",
    "Living Room",
    "Dining Area",
    "Kitchen",
    "Bedroom 1",
    "Bedroom 2",
    "Bedroom 3",
    "Bedroom 4",
    "Bedroom 5",
    "Washroom 1",
    "Washroom 2",
    "Washroom 3",
    "Domestic Help Room",
    "Store Room",
    "Balcony 1",
    "Balcony 2",
  ];

  // Initialize room data structure
  const initializeRoom = (roomName) => {
    const isKitchen = roomName === "Kitchen";
    const isWashroom = roomName.includes("Washroom");
    const isBalcony = roomName.includes("Balcony");
    const isMainEntrance = roomName === "Main Entrance";
    const isFoyer = roomName === "Foyer";
    const isLivingRoom = roomName === "Living Room" || roomName === "Drawing Room";
    const isDiningArea = roomName === "Dining Area" || roomName === "Dining Room";

    const baseRoom = {
      // Basic Information
      length: "",
      width: "",
      ceilingHeight: "",
      windowCount: "",
      sillHeight: "",
      lintelHeight: "",
      balconyAccess: "",
      balconyDoorType: "",
      balconyRailingType: "",
      // Civil Work
      civilWork: {
        demolitionFlooring: false,
        demolitionWalls: false,
        newPartitions: false,
        floorLeveling: false,
        newFlooring: false,
        skirting: false,
        beamCovering: false,
        windowModification: false,
        doorModification: false,
      },
      // False Ceiling
      falseCeiling: {
        required: "",
        type: "",
        coveLighting: "",
        design: "",
      },
      // Floor Covering
      floorCovering: {
        glossTile: false,
        mattTile: false,
        marble: false,
        granite: false,
        antiSkid: false,
      },
      // Carpentry
      carpentry: {
        wallPaneling: {
          required: "",
          numberOfWalls: "",
          material: "",
        },
        furniture: {},
        hardwareLevel: "",
        material: "",
      },
      // Electrical
      electrical: {
        wiringBrand: "",
        wireType: "",
        switchType: "",
        lighting: {
          cob: false,
          downlights: false,
          panelLights: false,
          profileLights: false,
          coveLights: false,
          chandelier: false,
          wallLights: false,
        },
        fans: false,
        acWiring: false,
        speakers: false,
        automation: {
          lights: false,
          curtains: false,
          ac: false,
          tv: false,
          sceneSettings: false,
        },
      },
      // Paint
      paint: {
        wallPaint: "",
        ceilingPaint: "",
      },
    };

    // Add kitchen-specific fields
    if (isKitchen) {
      baseRoom.kitchen = {
        basicInfo: {
          length: "",
          width: "",
          ceilingHeight: "",
          windowCount: "",
          sillHeight: "",
          lintelHeight: "",
          balconyAccess: "",
          balconyDoorType: "",
          balconyDoorWidth: "",
          balconyDoorHeight: "",
          balconyRailingType: "",
          balconyRailingTypeOther: "",
          balconyRailingSize: "",
          balconyNotes: "",
        },
        civilWork: {
          demolitionFlooring: false,
          demolitionWalls: false,
          newPartitions: false,
          floorLeveling: false,
          newFlooringInstallation: false,
          skirtingInstallation: false,
          beamColumnCovering: false,
          windowEnlargementReduction: false,
          doorShiftingEnlargement: false,
        },
        falseCeiling: {
          required: "",
          type: "",
          coveLightingOptions: {
            outsideCoveOnly: false,
            insideCoveOnly: false,
            insideOutsideCove: false,
          },
          ceilingDesignOptions: {
            grooves: false,
            mouldings: false,
            beamCovering: false,
            noDesign: false,
          },
          notes: "",
        },
        floorCovering: {
          glossTile: false,
          mattTile: false,
          marble: false,
          granite: false,
        },
        constructionType: "",
        carcassMaterial: "",
        shutterFinish: "",
        hardwareLevel: "",
        fittings: {
          cornerUnit: false,
          cornerUnitQuantity: "",
          tandemDrawers: false,
          tandemDrawersQuantity: "",
          bottlePullout: false,
          bottlePulloutQuantity: "",
          pantryUnit: false,
          rollingShutter: false,
          cutleryTray: false,
          grainTrolley: false,
          wickerBasket: false,
          integratedDustbin: false,
          glassTrayPlateTray: false,
        },
        counterBacksplash: {
          counterMaterial: "",
          backsplashMaterial: "",
        },
        electrical: {
          switchType: "",
          lightingCategories: {
            cob: false,
            panelLights: false,
            profileLights: false,
            coveLights: false,
            underCabinetLED: false,
            ceilingLights: false,
          },
          heavyAppliances: {
            hobPoint: false,
            chimneyDuctRoute: false,
            microwave: false,
            oven: false,
            refrigerator: false,
            dishwasherElectricalPoint: false,
            exhaust: false,
            aquaguardRO: false,
          },
          wiringBrand: "",
          wireSafety: "",
          otherElectrical: {
            fans: false,
            fansQuantity: "",
            acWiring: false,
            acWiringQuantity: "",
            speakers: "",
          },
          acType: "",
          wiringLength: "",
        },
        paint: {
          ceilingPaint: "",
        },
        plumbing: {
          sinkRelocation: false,
          drainLineChange: false,
          dishwasherPlumbing: false,
          geyserRequired: "",
          roLocation: "",
          plumbingMaterialBrand: "",
        },
        notes: "",
      };
    }

    // Add washroom-specific fields
    if (isWashroom) {
      baseRoom.washroom = {
        wallCovering: {
          tile: false,
          marble: false,
          granite: false,
          featureTile: false,
        },
        floor: {
          antiSkidTile: false,
          marble: false,
          granite: false,
        },
        basinType: "",
        showerType: "",
        fittingBrand: "",
        plumbingMaterial: "",
      };
    }

    // Add balcony-specific fields
    if (isBalcony) {
      baseRoom.balcony = {
        civil: {
          waterproofing: false,
          slopeCorrection: false,
          drainCleaning: false,
          tileRemoval: false,
        },
        floor: {
          antiSkidTile: false,
          stone: false,
          granite: false,
          woodenTile: false,
        },
        wall: {
          exteriorPaint: false,
          texturePaint: false,
          stoneCladding: false,
          brickCladding: false,
        },
        carpentry: {
          seatingBench: false,
          storageUnit: false,
          planterBox: false,
          privacyScreen: false,
        },
        electrical: {
          wallLamps: false,
          outdoorSpotlights: false,
          outdoorStripLights: false,
          fanPoint: false,
          cctvPoint: false,
        },
        safety: {
          childSafetyGrill: false,
          birdNet: false,
          antiSlipCoating: false,
        },
      };
    }

    // Add main entrance-specific fields
    if (isMainEntrance) {
      baseRoom.mainEntrance = {
        notes: "",
        doorType: "",
        doorWidth: "",
        doorHeight: "",
        doorNotes: "",
        shoeRack: "",
        wallPanel: "",
        wallPanelFinish: "",
        mirror: "",
        seatingNearShoeRack: "",
        wallLight: "",
        ceilingLights: "",
        ceilingLightsQty: "",
        bellWiring: "",
        staircaseLight: "",
        planters: "",
        wallDecor: "",
        rugsMats: "",
        entranceFlooring: "",
      };
    }

    // Add foyer-specific fields
    if (isFoyer) {
      baseRoom.foyer = {
        basicInfo: {
          notes: "",
        },
        windowInfo: {
          count: "",
          sillHeight: "",
          lintelHeight: "",
          type: "",
        },
        civilWork: {
          demolitionFlooring: false,
          demolitionWalls: false,
          newPartitions: false,
          floorLeveling: false,
          newFlooring: false,
          skirting: false,
          beamCovering: false,
          windowModification: false,
          doorModification: false,
          notes: "",
        },
        carpentry: {
          consoleTable: false,
          shoeStorage: false,
          coatHanger: false,
          mirrorUnit: false,
          hardwareLevel: "",
        },
        falseCeiling: {
          required: "",
          type: "",
          coveLighting: {
            outsideCove: false,
            insideCove: false,
            insideOutsideCove: false,
          },
          design: {
            grooves: false,
            mouldings: false,
            beamCovering: false,
            noDesign: false,
          },
          notes: "",
        },
        wallPaneling: {
          required: "",
          material: {
            popDesign: false,
            laminate: false,
            veneer: false,
            puCoated: false,
            fabricWrapped: false,
            glass: false,
            acrylic: false,
            stoneCladding: false,
          },
          carpentryMaterial: "",
        },
        electrical: {
          wiringBrand: "",
          wireSafety: "",
          switchType: "",
          lighting: {
            cob: false,
            downlights: false,
            panelLights: false,
            profileLights: false,
            coveLights: false,
          },
          wallLights: false,
          wallLightsQty: "",
          consoleLedStrip: false,
          acWiring: false,
          speakers: "",
          automation: "",
          automationOptions: {
            lights: false,
            ac: false,
            tv: false,
            speakers: false,
          },
          entranceBell: "",
          acType: "",
          wiringLength: "",
        },
        paint: {
          wallPaint: "",
          ceilingPaint: "",
        },
        softFurnishings: {
          curtains: "",
          windowCovering: "",
          notes: "",
        },
      };
    }

    // Add living room specific fields
    if (isLivingRoom) {
      baseRoom.livingRoom = {
        basicInfo: {
          length: "",
          width: "",
          ceilingHeight: "",
          windowCount: "",
          sillHeight: "",
          lintelHeight: "",
          balconyAccess: "",
          balconyDoorType: "",
          balconyDoorWidth: "",
          balconyDoorHeight: "",
          balconyRailingType: "",
          balconyRailingOther: "",
          balconyRailingSize: "",
          notes: "",
        },
        civilWork: {
          demolitionFlooring: false,
          demolitionWalls: false,
          newPartitions: false,
          floorLeveling: false,
          newFlooring: false,
          skirting: false,
          beamCovering: false,
          windowModification: false,
          doorModification: false,
        },
        falseCeiling: {
          required: "",
          type: "",
          coveLighting: {
            outsideOnly: false,
            insideOnly: false,
            insideOutside: false,
          },
          design: {
            grooves: false,
            mouldings: false,
            beamHiding: false,
          },
        },
        floorCovering: {
          glossTile: false,
          mattTile: false,
          marble: false,
          granite: false,
        },
        softFurnishings: {
          curtains: "",
          blinds: false,
          rug: false,
          upholsteryRequirements: "",
        },
        wallPaneling: {
          required: "",
          numberOfWalls: "",
          materials: {
            pop: false,
            laminate: false,
            veneer: false,
            pu: false,
            mdf: false,
            fabric: false,
            glass: false,
            acrylic: false,
            stone: false,
          },
          wall1Size: "",
          wall2Size: "",
          wall3Size: "",
        },
        carpentry: {
          furnitureUnits: {
            tvUnit: false,
            crockeryUnit: false,
            barUnit: false,
            console: false,
            windowSeating: false,
            looseFurniture: false,
          },
          sofa: "",
          armchairs: "",
          loungeChairs: "",
          coffeeTable: false,
          sideTables: false,
          rug: false,
          hardwareLevel: "",
          notes: "",
        },
        electrical: {
          wiringBrand: "",
          wireType: "",
          switchType: "",
          lighting: {
            cob: false,
            downlights: false,
            panelLights: false,
            profileLights: false,
            coveLights: false,
          },
          chandelier: false,
          wallLights: false,
          wallLightsQty: "",
          fans: false,
          fansQty: "",
          acWiring: false,
          acWiringQty: "",
          speakersRequired: "",
          automationRequired: "",
          automationOptions: {
            lights: false,
            curtains: false,
            ac: false,
            tv: false,
            speakers: false,
            sceneSettings: false,
          },
          acType: "",
          wiringLength: "",
        },
        paint: {
          wallPaint: "",
          ceilingPaint: "",
        },
        notes: "",
      };
    }

    // Add dining area specific fields
    if (isDiningArea) {
      baseRoom.diningArea = {
        basicInfo: {
          length: "",
          width: "",
          ceilingHeight: "",
          windowCount: "",
          sillHeight: "",
          lintelHeight: "",
          balconyAccess: "",
          balconyDoorType: "",
          balconyDoorWidth: "",
          balconyDoorHeight: "",
          balconyRailingType: "",
          balconyRailingOther: "",
          balconyRailingSize: "",
          notes: "",
        },
        civilWork: {
          demolitionFlooring: false,
          demolitionWalls: false,
          newPartitions: false,
          floorLeveling: false,
          newFlooring: false,
          skirting: false,
          beamCovering: false,
          windowModification: false,
          doorModification: false,
        },
        falseCeiling: {
          required: "",
          type: "",
          coveLighting: {
            outsideOnly: false,
            insideOnly: false,
            insideOutside: false,
          },
          design: {
            grooves: false,
            mouldings: false,
            beamCovering: false,
            noDesign: false,
          },
          notes: "",
        },
        floorCovering: {
          glossTile: false,
          mattTile: false,
          marble: false,
          granite: false,
        },
        softFurnishings: {
          curtains: "",
          blinds: false,
          rug: false,
          upholsteryRequirements: "",
        },
        wallPaneling: {
          required: "",
          numberOfWalls: "",
          materials: {
            pop: false,
            laminate: false,
            veneer: false,
            pu: false,
            mdf: false,
            fabric: false,
            glass: false,
            acrylic: false,
            stone: false,
          },
          wall1Size: "",
          wall2Size: "",
          wall3Size: "",
        },
        diningStorage: {
          crockeryUnit: false,
          consoleTable: false,
          buffet: false,
        },
        furniture: {
          diningTablePersons: "",
          chairsQuantity: "",
          benchSeating: false,
        },
        carpentry: {
          hardwareLevel: "",
        },
        electrical: {
          wiringBrand: "",
          wireType: "",
          switchType: "",
          lighting: {
            cob: false,
            downlights: false,
            panelLights: false,
            profileLights: false,
            coveLights: false,
          },
          chandelier: false,
          wallLights: false,
          wallLightsQty: "",
          fans: false,
          fansQty: "",
          acWiring: false,
          acWiringQty: "",
          speakersRequired: "",
          automationRequired: "",
          automationOptions: {
            lights: false,
            curtains: false,
            ac: false,
            tv: false,
            speakers: false,
            sceneSettings: false,
          },
          acType: "",
          wiringLength: "",
        },
        paint: {
          wallPaint: "",
          ceilingPaint: "",
        },
        notes: "",
      };
    }

    return baseRoom;
  };

  // Handle input change
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (section, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field],
      },
    }));
  };

  // Handle room data change
  const handleRoomChange = (roomName, path, value) => {
    setFormData((prev) => {
      const newRooms = { ...prev.rooms };
      if (!newRooms[roomName]) {
        newRooms[roomName] = initializeRoom(roomName);
      }

      // Navigate through path and set value
      const pathArray = path.split(".");
      let target = newRooms[roomName];
      for (let i = 0; i < pathArray.length - 1; i++) {
        target = target[pathArray[i]];
      }
      target[pathArray[pathArray.length - 1]] = value;

      return { ...prev, rooms: newRooms };
    });
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Toggle room expansion
  const toggleRoom = (roomName) => {
    setExpandedRooms((prev) => ({
      ...prev,
      [roomName]: !prev[roomName],
    }));

    // Initialize room data if not exists
    if (!formData.rooms[roomName]) {
      setFormData((prev) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          [roomName]: initializeRoom(roomName),
        },
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted! Check console for data.");
    // Here you would typically send the data to your API
  };

  // Handle save as draft
  const handleSaveDraft = () => {
    localStorage.setItem("interiorDesignForm", JSON.stringify(formData));
    alert("Form saved as draft!");
  };

  // Load draft
  const handleLoadDraft = () => {
    const draft = localStorage.getItem("interiorDesignForm");
    if (draft) {
      setFormData(JSON.parse(draft));
      alert("Draft loaded!");
    } else {
      alert("No draft found!");
    }
  };

  return (
    <div className="flex-1 bg-dark overflow-y-auto">
      <main className="p-6 md:p-10">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Residential Interior Design Scope Form</h1>
            <p className="text-gray-text mt-1">Complete interior execution details for residential projects</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleLoadDraft}
              className="bg-dark-light border border-gray-border text-white px-4 py-2 rounded hover:border-accent transition text-sm font-medium"
            >
              📂 Load Draft
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="bg-dark-light border border-gray-border text-white px-4 py-2 rounded hover:border-accent transition text-sm font-medium"
            >
              💾 Save Draft
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1️⃣ PROJECT INFORMATION */}
          <div className="bg-dark-light border border-gray-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("projectInfo")}
              className="w-full px-6 py-4 flex items-center justify-between bg-dark-light hover:bg-dark transition"
            >
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>1️⃣</span> PROJECT INFORMATION
              </h2>
              <span className="text-accent text-xl">
                {expandedSections.projectInfo ? "▲" : "▼"}
              </span>
            </button>

            {expandedSections.projectInfo && (
              <div className="p-6 space-y-6 border-t border-gray-border">
                {/* Basic Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-text mb-2">
                      Project Address *
                    </label>
                    <input
                      type="text"
                      value={formData.projectAddress}
                      onChange={(e) => setFormData({ ...formData, projectAddress: e.target.value })}
                      className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                      placeholder="Enter project address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-text mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                      placeholder="Enter client name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-text mb-2">
                      Property Type *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition"
                      required
                    >
                      <option value="">Select property type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Farmhouse">Farmhouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-text mb-2">
                      Unit Type *
                    </label>
                    <select
                      value={formData.unitType}
                      onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                      className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition"
                      required
                    >
                      <option value="">Select unit type</option>
                      <option value="2BHK">2BHK</option>
                      <option value="3BHK">3BHK</option>
                      <option value="4BHK">4BHK</option>
                      <option value="5BHK">5BHK</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-text mb-2">
                      Total Carpet Area (sq ft) *
                    </label>
                    <input
                      type="number"
                      value={formData.totalCarpetArea}
                      onChange={(e) => setFormData({ ...formData, totalCarpetArea: e.target.value })}
                      className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                      placeholder="Enter carpet area"
                      required
                    />
                  </div>
                </div>

                {/* Ceiling Heights */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Ceiling Heights (feet)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.keys(formData.ceilingHeights).map((key) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-text mb-2">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.ceilingHeights[key]}
                          onChange={(e) =>
                            handleInputChange("ceilingHeights", key, e.target.value)
                          }
                          className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white placeholder-gray-text focus:outline-none focus:border-accent transition text-sm"
                          placeholder="0.0"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Window Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Window Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-text mb-2">
                        Window Count per Room
                      </label>
                      <input
                        type="number"
                        value={formData.windowInfo.count}
                        onChange={(e) => handleInputChange("windowInfo", "count", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-text mb-2">
                        Sill Height (feet)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.windowInfo.sillHeight}
                        onChange={(e) =>
                          handleInputChange("windowInfo", "sillHeight", e.target.value)
                        }
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                        placeholder="0.0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-text mb-2">
                        Lintel Height (feet)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.windowInfo.lintelHeight}
                        onChange={(e) =>
                          handleInputChange("windowInfo", "lintelHeight", e.target.value)
                        }
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                        placeholder="0.0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-text mb-2">
                        Window Type
                      </label>
                      <select
                        value={formData.windowInfo.type}
                        onChange={(e) => handleInputChange("windowInfo", "type", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white focus:outline-none focus:border-accent transition"
                      >
                        <option value="">Select type</option>
                        <option value="Sliding">Sliding</option>
                        <option value="Openable">Openable</option>
                        <option value="Fixed">Fixed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2️⃣ GLOBAL PROJECT SCOPE */}
          <div className="bg-dark-light border border-gray-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("globalScope")}
              className="w-full px-6 py-4 flex items-center justify-between bg-dark-light hover:bg-dark transition"
            >
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>2️⃣</span> GLOBAL PROJECT SCOPE
              </h2>
              <span className="text-accent text-xl">
                {expandedSections.globalScope ? "▲" : "▼"}
              </span>
            </button>

            {expandedSections.globalScope && (
              <div className="p-6 border-t border-gray-border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(formData.globalScope).map((key) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.globalScope[key]}
                        onChange={() => handleCheckboxChange("globalScope", key)}
                        className="w-5 h-5 rounded border-gray-border bg-dark text-accent focus:ring-2 focus:ring-accent focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-white group-hover:text-accent transition">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3️⃣ PROJECT DELIVERABLES */}
          <div className="bg-dark-light border border-gray-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("deliverables")}
              className="w-full px-6 py-4 flex items-center justify-between bg-dark-light hover:bg-dark transition"
            >
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>3️⃣</span> PROJECT DELIVERABLES
              </h2>
              <span className="text-accent text-xl">
                {expandedSections.deliverables ? "▲" : "▼"}
              </span>
            </button>

            {expandedSections.deliverables && (
              <div className="p-6 border-t border-gray-border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(formData.deliverables).map((key) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.deliverables[key]}
                        onChange={() => handleCheckboxChange("deliverables", key)}
                        className="w-5 h-5 rounded border-gray-border bg-dark text-accent focus:ring-2 focus:ring-accent focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-white group-hover:text-accent transition">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())
                          .replace("2 D", "2D")
                          .replace("3 D", "3D")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4️⃣ ROOM-WISE DETAILS */}
          <div className="bg-dark-light border border-gray-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("rooms")}
              className="w-full px-6 py-4 flex items-center justify-between bg-dark-light hover:bg-dark transition"
            >
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>4️⃣</span> ROOM-WISE DETAILS
              </h2>
              <span className="text-accent text-xl">
                {expandedSections.rooms ? "▲" : "▼"}
              </span>
            </button>

            {expandedSections.rooms && (
              <div className="p-6 border-t border-gray-border space-y-4">
                {roomsList.map((roomName) => (
                  <RoomSection
                    key={roomName}
                    roomName={roomName}
                    roomData={formData.rooms[roomName] || initializeRoom(roomName)}
                    isExpanded={expandedRooms[roomName]}
                    onToggle={() => toggleRoom(roomName)}
                    onChange={handleRoomChange}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to reset the form?")) {
                  window.location.reload();
                }
              }}
              className="bg-dark-light border border-gray-border text-white px-6 py-3 rounded font-medium hover:border-red-500 hover:text-red-500 transition"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="bg-accent text-dark px-8 py-3 rounded font-medium hover:bg-yellow-500 transition"
            >
              Submit Form
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

// Room Section Component
function RoomSection({ roomName, roomData, isExpanded, onToggle, onChange }) {
  const isKitchen = roomName === "Kitchen";
  const isWashroom = roomName.includes("Washroom");
  const isBalcony = roomName.includes("Balcony");
  const isMainEntrance = roomName === "Main Entrance";
  const isFoyer = roomName === "Foyer";
  const isLivingRoom = roomName === "Living Room" || roomName === "Drawing Room";
  const isDiningArea = roomName === "Dining Area" || roomName === "Dining Room";

  return (
    <div className="bg-dark border border-gray-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-3 flex items-center justify-between hover:bg-dark-light transition"
      >
        <span className="text-white font-semibold">{roomName}</span>
        <span className="text-accent">{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <div className="p-5 space-y-6 border-t border-gray-border">
          {/* MAIN ENTRANCE CUSTOM SECTIONS */}
          {isMainEntrance && roomData.mainEntrance ? (
            <>
              {/* 1. BASIC INFORMATION */}
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                  1️⃣ Basic Information
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Length (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.length}
                      onChange={(e) => onChange(roomName, "length", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.width}
                      onChange={(e) => onChange(roomName, "width", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Ceiling Height (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.ceilingHeight}
                      onChange={(e) => onChange(roomName, "ceilingHeight", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-xs text-gray-text mb-1">Notes</label>
                  <textarea
                    value={roomData.mainEntrance.notes}
                    onChange={(e) => onChange(roomName, "mainEntrance.notes", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    rows="2"
                    placeholder="Add any notes..."
                  />
                </div>
              </div>

              {/* 2. DOOR SYSTEM & SIZE */}
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                  2️⃣ Door System & Size
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Door Type</label>
                    <select
                      value={roomData.mainEntrance.doorType}
                      onChange={(e) => onChange(roomName, "mainEntrance.doorType", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Safety Door">Safety Door</option>
                      <option value="Main Wooden Door">Main Wooden Door</option>
                      <option value="Two-Door System">Two-Door System</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.mainEntrance.doorWidth}
                      onChange={(e) => onChange(roomName, "mainEntrance.doorWidth", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Height (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.mainEntrance.doorHeight}
                      onChange={(e) => onChange(roomName, "mainEntrance.doorHeight", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-xs text-gray-text mb-1">Door Notes</label>
                  <textarea
                    value={roomData.mainEntrance.doorNotes}
                    onChange={(e) => onChange(roomName, "mainEntrance.doorNotes", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    rows="2"
                    placeholder="Add notes about door..."
                  />
                </div>
              </div>

              {/* 3. CARPENTRY ELEMENTS */}
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                  3️⃣ Carpentry Elements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Shoe Rack</label>
                    <select
                      value={roomData.mainEntrance.shoeRack}
                      onChange={(e) => onChange(roomName, "mainEntrance.shoeRack", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wall Panel</label>
                    <select
                      value={roomData.mainEntrance.wallPanel}
                      onChange={(e) => onChange(roomName, "mainEntrance.wallPanel", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {roomData.mainEntrance.wallPanel === "Yes" && (
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Wall Panel Finish</label>
                      <select
                        value={roomData.mainEntrance.wallPanelFinish}
                        onChange={(e) => onChange(roomName, "mainEntrance.wallPanelFinish", e.target.value)}
                        className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      >
                        <option value="">Select</option>
                        <option value="POP Design">POP Design</option>
                        <option value="Laminate">Laminate</option>
                        <option value="Veneer">Veneer</option>
                        <option value="PU">PU</option>
                        <option value="Fabric">Fabric</option>
                        <option value="Glass">Glass</option>
                        <option value="Duco">Duco</option>
                        <option value="Acrylic">Acrylic</option>
                        <option value="Stone">Stone</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Mirror</label>
                    <select
                      value={roomData.mainEntrance.mirror}
                      onChange={(e) => onChange(roomName, "mainEntrance.mirror", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Seating Near Shoe Rack</label>
                    <select
                      value={roomData.mainEntrance.seatingNearShoeRack}
                      onChange={(e) => onChange(roomName, "mainEntrance.seatingNearShoeRack", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. ELECTRICAL */}
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                  4️⃣ Electrical
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wall Light</label>
                    <select
                      value={roomData.mainEntrance.wallLight}
                      onChange={(e) => onChange(roomName, "mainEntrance.wallLight", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Ceiling Lights</label>
                    <select
                      value={roomData.mainEntrance.ceilingLights}
                      onChange={(e) => onChange(roomName, "mainEntrance.ceilingLights", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {roomData.mainEntrance.ceilingLights === "Yes" && (
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Ceiling Lights Quantity</label>
                      <input
                        type="number"
                        value={roomData.mainEntrance.ceilingLightsQty}
                        onChange={(e) => onChange(roomName, "mainEntrance.ceilingLightsQty", e.target.value)}
                        className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Bell Wiring</label>
                    <select
                      value={roomData.mainEntrance.bellWiring}
                      onChange={(e) => onChange(roomName, "mainEntrance.bellWiring", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Staircase Light</label>
                    <select
                      value={roomData.mainEntrance.staircaseLight}
                      onChange={(e) => onChange(roomName, "mainEntrance.staircaseLight", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 5. DECOR ELEMENTS */}
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                  5️⃣ Decor Elements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Planters</label>
                    <select
                      value={roomData.mainEntrance.planters}
                      onChange={(e) => onChange(roomName, "mainEntrance.planters", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wall Decor</label>
                    <select
                      value={roomData.mainEntrance.wallDecor}
                      onChange={(e) => onChange(roomName, "mainEntrance.wallDecor", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Rugs / Mats</label>
                    <select
                      value={roomData.mainEntrance.rugsMats}
                      onChange={(e) => onChange(roomName, "mainEntrance.rugsMats", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Entrance Flooring</label>
                    <select
                      value={roomData.mainEntrance.entranceFlooring}
                      onChange={(e) => onChange(roomName, "mainEntrance.entranceFlooring", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : isFoyer && roomData.foyer ? (
            <>
          {/* FOYER CUSTOM SECTIONS */}
          {/* 1️⃣ BASIC INFORMATION */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              1️⃣ Basic Information
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Length (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.length}
                  onChange={(e) => onChange(roomName, "length", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.width}
                  onChange={(e) => onChange(roomName, "width", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.ceilingHeight}
                  onChange={(e) => onChange(roomName, "ceilingHeight", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>
            
            {/* Window Information */}
            <div className="mt-4">
              <h5 className="text-gray-text text-xs font-medium mb-2">Window Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-1">Window Count</label>
                  <input
                    type="number"
                    value={roomData.foyer.windowInfo.count}
                    onChange={(e) => onChange(roomName, "foyer.windowInfo.count", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Sill Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={roomData.foyer.windowInfo.sillHeight}
                    onChange={(e) => onChange(roomName, "foyer.windowInfo.sillHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Lintel Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={roomData.foyer.windowInfo.lintelHeight}
                    onChange={(e) => onChange(roomName, "foyer.windowInfo.lintelHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-xs text-gray-text mb-1">Window Type</label>
                <select
                  value={roomData.foyer.windowInfo.type}
                  onChange={(e) => onChange(roomName, "foyer.windowInfo.type", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Sliding">Sliding</option>
                  <option value="Openable">Openable</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>
            </div>
            
            <div className="mt-3">
              <label className="block text-xs text-gray-text mb-1">Notes</label>
              <textarea
                value={roomData.foyer.basicInfo.notes}
                onChange={(e) => onChange(roomName, "foyer.basicInfo.notes", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                rows="2"
                placeholder="Add any notes..."
              />
            </div>
          </div>

          {/* 2️⃣ CIVIL WORK */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              2️⃣ Civil Work
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.foyer.civilWork.demolitionFlooring}
                  onChange={(e) => onChange(roomName, "foyer.civilWork.demolitionFlooring", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Demolition of flooring</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.foyer.civilWork.demolitionWalls}
                  onChange={(e) => onChange(roomName, "foyer.civilWork.demolitionWalls", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Demolition of walls</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.foyer.civilWork.newPartitions}
                  onChange={(e) => onChange(roomName, "foyer.civilWork.newPartitions", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">New partitions / wall shifting</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.foyer.civilWork.floorLeveling}
                  onChange={(e) => onChange(roomName, "foyer.civilWork.floorLeveling", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Floor leveling / screeding</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.foyer.civilWork.newFlooring}
                  onChange={(e) => onChange(roomName, "foyer.civilWork.newFlooring", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">New flooring installation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.foyer.civilWork.skirting}
                  onChange={(e) => onChange(roomName, "foyer.civilWork.skirting", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Skirting installation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.foyer.civilWork.beamCovering}
                  onChange={(e) => onChange(roomName, "foyer.civilWork.beamCovering", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Beam/column covering</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.foyer.civilWork.windowModification}
                  onChange={(e) => onChange(roomName, "foyer.civilWork.windowModification", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Window enlargement / reduction</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.foyer.civilWork.doorModification}
                  onChange={(e) => onChange(roomName, "foyer.civilWork.doorModification", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Door shifting / enlargement / add extra door</span>
              </label>
            </div>
            <div className="mt-3">
              <label className="block text-xs text-gray-text mb-1">Notes</label>
              <textarea
                value={roomData.foyer.civilWork.notes}
                onChange={(e) => onChange(roomName, "foyer.civilWork.notes", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                rows="2"
                placeholder="Add civil work notes..."
              />
            </div>
          </div>

          {/* 3️⃣ CARPENTRY */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              3️⃣ Carpentry
            </h4>
            <div>
              <h5 className="text-gray-text text-xs font-medium mb-2">Console / Storage</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.carpentry.consoleTable}
                    onChange={(e) => onChange(roomName, "foyer.carpentry.consoleTable", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Console Table</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.carpentry.shoeStorage}
                    onChange={(e) => onChange(roomName, "foyer.carpentry.shoeStorage", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Shoe Storage</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.carpentry.coatHanger}
                    onChange={(e) => onChange(roomName, "foyer.carpentry.coatHanger", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Coat Hanger</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.carpentry.mirrorUnit}
                    onChange={(e) => onChange(roomName, "foyer.carpentry.mirrorUnit", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Mirror Unit</span>
                </label>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs text-gray-text mb-2">Hardware Level</label>
              <select
                value={roomData.foyer.carpentry.hardwareLevel}
                onChange={(e) => onChange(roomName, "foyer.carpentry.hardwareLevel", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              >
                <option value="">Select</option>
                <option value="Basic">Basic (Local Indian Brands)</option>
                <option value="Mid">Mid (Hettich India / Ozone / Inox)</option>
                <option value="Premium">Premium (Hafele / Hettich Germany)</option>
                <option value="Ultra Premium">Ultra Premium (Blum Soft-Close)</option>
              </select>
            </div>
          </div>

          {/* 4️⃣ FALSE CEILING */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              4️⃣ False Ceiling
            </h4>
            <div>
              <label className="block text-xs text-gray-text mb-2">False Ceiling Required</label>
              <select
                value={roomData.foyer.falseCeiling.required}
                onChange={(e) => onChange(roomName, "foyer.falseCeiling.required", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            
            {roomData.foyer.falseCeiling.required === "Yes" && (
              <>
                <div className="mt-3">
                  <label className="block text-xs text-gray-text mb-2">Ceiling Type</label>
                  <select
                    value={roomData.foyer.falseCeiling.type}
                    onChange={(e) => onChange(roomName, "foyer.falseCeiling.type", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="POP">POP</option>
                    <option value="Wooden">Wooden</option>
                    <option value="Stretch">Stretch</option>
                    <option value="Grid">Grid</option>
                  </select>
                </div>
                
                <div className="mt-3">
                  <h5 className="text-gray-text text-xs font-medium mb-2">Cove Lighting Options</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.falseCeiling.coveLighting.outsideCove}
                        onChange={(e) => onChange(roomName, "foyer.falseCeiling.coveLighting.outsideCove", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Outside Cove Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.falseCeiling.coveLighting.insideCove}
                        onChange={(e) => onChange(roomName, "foyer.falseCeiling.coveLighting.insideCove", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Inside Cove Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.falseCeiling.coveLighting.insideOutsideCove}
                        onChange={(e) => onChange(roomName, "foyer.falseCeiling.coveLighting.insideOutsideCove", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Inside + Outside Cove</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h5 className="text-gray-text text-xs font-medium mb-2">Ceiling Design Options</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.falseCeiling.design.grooves}
                        onChange={(e) => onChange(roomName, "foyer.falseCeiling.design.grooves", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Grooves</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.falseCeiling.design.mouldings}
                        onChange={(e) => onChange(roomName, "foyer.falseCeiling.design.mouldings", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Mouldings</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.falseCeiling.design.beamCovering}
                        onChange={(e) => onChange(roomName, "foyer.falseCeiling.design.beamCovering", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Beam Covering</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.falseCeiling.design.noDesign}
                        onChange={(e) => onChange(roomName, "foyer.falseCeiling.design.noDesign", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">No Design</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="block text-xs text-gray-text mb-1">Notes</label>
                  <textarea
                    value={roomData.foyer.falseCeiling.notes}
                    onChange={(e) => onChange(roomName, "foyer.falseCeiling.notes", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    rows="2"
                    placeholder="Add false ceiling notes..."
                  />
                </div>
              </>
            )}
          </div>

          {/* 5️⃣ WALL PANELING */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              5️⃣ Wall Paneling
            </h4>
            <div>
              <label className="block text-xs text-gray-text mb-2">Wall Paneling Required</label>
              <select
                value={roomData.foyer.wallPaneling.required}
                onChange={(e) => onChange(roomName, "foyer.wallPaneling.required", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            
            {roomData.foyer.wallPaneling.required === "Yes" && (
              <>
                <div className="mt-3">
                  <h5 className="text-gray-text text-xs font-medium mb-2">Material</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.wallPaneling.material.popDesign}
                        onChange={(e) => onChange(roomName, "foyer.wallPaneling.material.popDesign", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">POP Design</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.wallPaneling.material.laminate}
                        onChange={(e) => onChange(roomName, "foyer.wallPaneling.material.laminate", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Laminate</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.wallPaneling.material.veneer}
                        onChange={(e) => onChange(roomName, "foyer.wallPaneling.material.veneer", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Veneer</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.wallPaneling.material.puCoated}
                        onChange={(e) => onChange(roomName, "foyer.wallPaneling.material.puCoated", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">PU Coated</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.wallPaneling.material.fabricWrapped}
                        onChange={(e) => onChange(roomName, "foyer.wallPaneling.material.fabricWrapped", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Fabric Wrapped</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.wallPaneling.material.glass}
                        onChange={(e) => onChange(roomName, "foyer.wallPaneling.material.glass", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Glass</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.wallPaneling.material.acrylic}
                        onChange={(e) => onChange(roomName, "foyer.wallPaneling.material.acrylic", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Acrylic</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.foyer.wallPaneling.material.stoneCladding}
                        onChange={(e) => onChange(roomName, "foyer.wallPaneling.material.stoneCladding", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Stone Cladding</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="block text-xs text-gray-text mb-1">Carpentry Material</label>
                  <select
                    value={roomData.foyer.wallPaneling.carpentryMaterial}
                    onChange={(e) => onChange(roomName, "foyer.wallPaneling.carpentryMaterial", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="Ply">Ply</option>
                    <option value="HDHMR">HDHMR</option>
                    <option value="MDF">MDF</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* 6️⃣ ELECTRICAL */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              6️⃣ Electrical
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="block text-xs text-gray-text mb-1">Wiring Brand</label>
                <select
                  value={roomData.foyer.electrical.wiringBrand}
                  onChange={(e) => onChange(roomName, "foyer.electrical.wiringBrand", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Havells">Havells</option>
                  <option value="Polycab">Polycab</option>
                  <option value="Finolex">Finolex</option>
                  <option value="Local">Local</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Wire Safety Rating</label>
                <select
                  value={roomData.foyer.electrical.wireSafety}
                  onChange={(e) => onChange(roomName, "foyer.electrical.wireSafety", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="FR">FR</option>
                  <option value="FRLS">FRLS</option>
                  <option value="Non-FR">Non-FR</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Switch Type</label>
                <select
                  value={roomData.foyer.electrical.switchType}
                  onChange={(e) => onChange(roomName, "foyer.electrical.switchType", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Anchor Roma">Anchor Roma</option>
                  <option value="GM">GM</option>
                  <option value="Legrand Myrius">Legrand Myrius</option>
                  <option value="Schneider Norysis">Schneider Norysis</option>
                  <option value="Premium Smart Switches">Premium Smart Switches</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-gray-text text-xs font-medium mb-2">Lighting</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.electrical.lighting.cob}
                    onChange={(e) => onChange(roomName, "foyer.electrical.lighting.cob", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">COB</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.electrical.lighting.downlights}
                    onChange={(e) => onChange(roomName, "foyer.electrical.lighting.downlights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Downlights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.electrical.lighting.panelLights}
                    onChange={(e) => onChange(roomName, "foyer.electrical.lighting.panelLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Panel Lights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.electrical.lighting.profileLights}
                    onChange={(e) => onChange(roomName, "foyer.electrical.lighting.profileLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Profile Lights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.electrical.lighting.coveLights}
                    onChange={(e) => onChange(roomName, "foyer.electrical.lighting.coveLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Cove Lights</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-gray-text text-xs font-medium mb-2">Additional Electrical</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.foyer.electrical.wallLights}
                      onChange={(e) => onChange(roomName, "foyer.electrical.wallLights", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Wall Lights</span>
                  </label>
                  {roomData.foyer.electrical.wallLights && (
                    <input
                      type="number"
                      value={roomData.foyer.electrical.wallLightsQty}
                      onChange={(e) => onChange(roomName, "foyer.electrical.wallLightsQty", e.target.value)}
                      className="w-20 bg-dark-light border border-gray-border rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Qty"
                      min="0"
                    />
                  )}
                </div>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.electrical.consoleLedStrip}
                    onChange={(e) => onChange(roomName, "foyer.electrical.consoleLedStrip", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Console LED Strip</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.foyer.electrical.acWiring}
                    onChange={(e) => onChange(roomName, "foyer.electrical.acWiring", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">AC Wiring</span>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs text-gray-text mb-1">Speakers Required</label>
                <select
                  value={roomData.foyer.electrical.speakers}
                  onChange={(e) => onChange(roomName, "foyer.electrical.speakers", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Automation Required</label>
                <select
                  value={roomData.foyer.electrical.automation}
                  onChange={(e) => onChange(roomName, "foyer.electrical.automation", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            
            {roomData.foyer.electrical.automation === "Yes" && (
              <div className="mb-4">
                <h5 className="text-gray-text text-xs font-medium mb-2">Automation Options</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.foyer.electrical.automationOptions.lights}
                      onChange={(e) => onChange(roomName, "foyer.electrical.automationOptions.lights", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Lights</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.foyer.electrical.automationOptions.ac}
                      onChange={(e) => onChange(roomName, "foyer.electrical.automationOptions.ac", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">AC</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.foyer.electrical.automationOptions.tv}
                      onChange={(e) => onChange(roomName, "foyer.electrical.automationOptions.tv", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">TV</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.foyer.electrical.automationOptions.speakers}
                      onChange={(e) => onChange(roomName, "foyer.electrical.automationOptions.speakers", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Speakers</span>
                  </label>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Entrance Bell</label>
                <select
                  value={roomData.foyer.electrical.entranceBell}
                  onChange={(e) => onChange(roomName, "foyer.electrical.entranceBell", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Normal Bell">Normal Bell</option>
                  <option value="Smart Bell">Smart Bell (WiFi)</option>
                  <option value="Video Bell">Bell with Video Screen / Digital Door Camera</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Air Conditioning Type</label>
                <select
                  value={roomData.foyer.electrical.acType}
                  onChange={(e) => onChange(roomName, "foyer.electrical.acType", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Split">Split</option>
                  <option value="Cassette">Cassette</option>
                  <option value="Ductable">Ductable</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Approx. Wiring Length (ft)</label>
                <input
                  type="number"
                  value={roomData.foyer.electrical.wiringLength}
                  onChange={(e) => onChange(roomName, "foyer.electrical.wiringLength", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* 7️⃣ PAINT */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              7️⃣ Paint
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Wall Paint Options</label>
                <select
                  value={roomData.foyer.paint.wallPaint}
                  onChange={(e) => onChange(roomName, "foyer.paint.wallPaint", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Royale Shine">Royale Shine</option>
                  <option value="PU">PU</option>
                  <option value="Texture">Texture</option>
                  <option value="Royale Matt">Royale Matt</option>
                  <option value="Satin">Satin</option>
                  <option value="Plastic Premium">Plastic Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Paint Options</label>
                <select
                  value={roomData.foyer.paint.ceilingPaint}
                  onChange={(e) => onChange(roomName, "foyer.paint.ceilingPaint", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Royale Shine">Royale Shine</option>
                  <option value="PU">PU</option>
                  <option value="Texture">Texture</option>
                  <option value="Royale Matt">Royale Matt</option>
                  <option value="Satin">Satin</option>
                  <option value="Plastic Premium">Plastic Premium</option>
                </select>
              </div>
            </div>
          </div>

          {/* 8️⃣ SOFT FURNISHINGS */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              8️⃣ Soft Furnishings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Curtains</label>
                <select
                  value={roomData.foyer.softFurnishings.curtains}
                  onChange={(e) => onChange(roomName, "foyer.softFurnishings.curtains", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Sheer Only">Sheer Only</option>
                  <option value="Blackout Only">Blackout Only</option>
                  <option value="Sheer + Blackout">Sheer + Blackout</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Window Covering</label>
                <select
                  value={roomData.foyer.softFurnishings.windowCovering}
                  onChange={(e) => onChange(roomName, "foyer.softFurnishings.windowCovering", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Blinds">Blinds</option>
                  <option value="Curtains">Curtains</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs text-gray-text mb-1">Notes</label>
              <textarea
                value={roomData.foyer.softFurnishings.notes}
                onChange={(e) => onChange(roomName, "foyer.softFurnishings.notes", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                rows="2"
                placeholder="Add soft furnishings notes..."
              />
            </div>
          </div>
            </>
          ) : isLivingRoom && roomData.livingRoom ? (
            <>
          {/* LIVING / DRAWING ROOM CUSTOM SECTIONS */}
          {/* 1️⃣ BASIC INFORMATION */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              1️⃣ Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Length (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.livingRoom.basicInfo.length}
                  onChange={(e) => onChange(roomName, "livingRoom.basicInfo.length", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.livingRoom.basicInfo.width}
                  onChange={(e) => onChange(roomName, "livingRoom.basicInfo.width", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.livingRoom.basicInfo.ceilingHeight}
                  onChange={(e) => onChange(roomName, "livingRoom.basicInfo.ceilingHeight", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Window Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-1">Window Count</label>
                  <input
                    type="number"
                    value={roomData.livingRoom.basicInfo.windowCount}
                    onChange={(e) => onChange(roomName, "livingRoom.basicInfo.windowCount", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Sill Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={roomData.livingRoom.basicInfo.sillHeight}
                    onChange={(e) => onChange(roomName, "livingRoom.basicInfo.sillHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Lintel Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={roomData.livingRoom.basicInfo.lintelHeight}
                    onChange={(e) => onChange(roomName, "livingRoom.basicInfo.lintelHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Balcony Access</h5>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-balconyAccess`}
                    value="Yes"
                    checked={roomData.livingRoom.basicInfo.balconyAccess === "Yes"}
                    onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyAccess", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-balconyAccess`}
                    value="No"
                    checked={roomData.livingRoom.basicInfo.balconyAccess === "No"}
                    onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyAccess", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">No</span>
                </label>
              </div>
              
              {roomData.livingRoom.basicInfo.balconyAccess === "Yes" && (
                <>
                  <div className="mb-3">
                    <h6 className="text-gray-text text-xs font-medium mb-2">Balcony Door Type</h6>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name={`${roomName}-balconyDoorType`}
                          value="Sliding"
                          checked={roomData.livingRoom.basicInfo.balconyDoorType === "Sliding"}
                          onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyDoorType", e.target.value)}
                          className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">Sliding</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name={`${roomName}-balconyDoorType`}
                          value="Hinged Single"
                          checked={roomData.livingRoom.basicInfo.balconyDoorType === "Hinged Single"}
                          onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyDoorType", e.target.value)}
                          className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">Hinged Single</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name={`${roomName}-balconyDoorType`}
                          value="Hinged Double"
                          checked={roomData.livingRoom.basicInfo.balconyDoorType === "Hinged Double"}
                          onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyDoorType", e.target.value)}
                          className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">Hinged Double</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name={`${roomName}-balconyDoorType`}
                          value="Fixed"
                          checked={roomData.livingRoom.basicInfo.balconyDoorType === "Fixed"}
                          onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyDoorType", e.target.value)}
                          className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">Fixed</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="text-gray-text text-xs font-medium mb-2">Door Size</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={roomData.livingRoom.basicInfo.balconyDoorWidth}
                          onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyDoorWidth", e.target.value)}
                          className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-text mb-1">Height (ft)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={roomData.livingRoom.basicInfo.balconyDoorHeight}
                          onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyDoorHeight", e.target.value)}
                          className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-xs text-gray-text mb-2">Balcony Railing Type</label>
                    <select
                      value={roomData.livingRoom.basicInfo.balconyRailingType}
                      onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyRailingType", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Brick">Brick</option>
                      <option value="Glass">Glass</option>
                      <option value="Aluminium + Glass">Aluminium + Glass</option>
                      <option value="SS">SS</option>
                      <option value="MS">MS</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  {roomData.livingRoom.basicInfo.balconyRailingType === "Other" && (
                    <div className="mb-3">
                      <label className="block text-xs text-gray-text mb-1">Specify Other Railing Type</label>
                      <input
                        type="text"
                        value={roomData.livingRoom.basicInfo.balconyRailingOther}
                        onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyRailingOther", e.target.value)}
                        className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                        placeholder="Enter railing type"
                      />
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label className="block text-xs text-gray-text mb-1">Railing Size</label>
                    <input
                      type="text"
                      value={roomData.livingRoom.basicInfo.balconyRailingSize}
                      onChange={(e) => onChange(roomName, "livingRoom.basicInfo.balconyRailingSize", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Enter railing size"
                    />
                  </div>
                </>
              )}
            </div>
            
            <div>
              <label className="block text-xs text-gray-text mb-1">Notes</label>
              <textarea
                value={roomData.livingRoom.basicInfo.notes}
                onChange={(e) => onChange(roomName, "livingRoom.basicInfo.notes", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                rows="2"
                placeholder="Add basic information notes..."
              />
            </div>
          </div>

          {/* 2️⃣ CIVIL WORK */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              2️⃣ Civil Work
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.civilWork.demolitionFlooring}
                  onChange={(e) => onChange(roomName, "livingRoom.civilWork.demolitionFlooring", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Demolition of flooring</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.civilWork.demolitionWalls}
                  onChange={(e) => onChange(roomName, "livingRoom.civilWork.demolitionWalls", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Demolition of walls</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.civilWork.newPartitions}
                  onChange={(e) => onChange(roomName, "livingRoom.civilWork.newPartitions", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">New partitions / wall shifting</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.civilWork.floorLeveling}
                  onChange={(e) => onChange(roomName, "livingRoom.civilWork.floorLeveling", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Floor leveling / screeding</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.civilWork.newFlooring}
                  onChange={(e) => onChange(roomName, "livingRoom.civilWork.newFlooring", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">New flooring installation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.civilWork.skirting}
                  onChange={(e) => onChange(roomName, "livingRoom.civilWork.skirting", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Skirting installation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.civilWork.beamCovering}
                  onChange={(e) => onChange(roomName, "livingRoom.civilWork.beamCovering", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Beam/column covering</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.civilWork.windowModification}
                  onChange={(e) => onChange(roomName, "livingRoom.civilWork.windowModification", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Window enlargement/reduction</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.civilWork.doorModification}
                  onChange={(e) => onChange(roomName, "livingRoom.civilWork.doorModification", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Door shifting / door enlargement / add extra door</span>
              </label>
            </div>
          </div>

          {/* 3️⃣ FALSE CEILING */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              3️⃣ False Ceiling
            </h4>
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">False Ceiling Required</h5>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-falseCeilingRequired`}
                    value="Yes"
                    checked={roomData.livingRoom.falseCeiling.required === "Yes"}
                    onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.required", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-falseCeilingRequired`}
                    value="No"
                    checked={roomData.livingRoom.falseCeiling.required === "No"}
                    onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.required", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">No</span>
                </label>
              </div>
            </div>
            
            {roomData.livingRoom.falseCeiling.required === "Yes" && (
              <>
                <div className="mb-3">
                  <h5 className="text-gray-text text-xs font-medium mb-2">False Ceiling Type</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-falseCeilingType`}
                        value="POP"
                        checked={roomData.livingRoom.falseCeiling.type === "POP"}
                        onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.type", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">POP</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-falseCeilingType`}
                        value="Wooden"
                        checked={roomData.livingRoom.falseCeiling.type === "Wooden"}
                        onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.type", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Wooden</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-falseCeilingType`}
                        value="Stretch"
                        checked={roomData.livingRoom.falseCeiling.type === "Stretch"}
                        onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.type", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Stretch</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-falseCeilingType`}
                        value="Grid"
                        checked={roomData.livingRoom.falseCeiling.type === "Grid"}
                        onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.type", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Grid</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h5 className="text-gray-text text-xs font-medium mb-2">Cove Lighting Options</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.falseCeiling.coveLighting.outsideOnly}
                        onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.coveLighting.outsideOnly", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Outside Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.falseCeiling.coveLighting.insideOnly}
                        onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.coveLighting.insideOnly", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Inside Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.falseCeiling.coveLighting.insideOutside}
                        onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.coveLighting.insideOutside", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Inside + Outside</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-gray-text text-xs font-medium mb-2">Ceiling Design</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.falseCeiling.design.grooves}
                        onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.design.grooves", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Grooves</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.falseCeiling.design.mouldings}
                        onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.design.mouldings", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Mouldings</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.falseCeiling.design.beamHiding}
                        onChange={(e) => onChange(roomName, "livingRoom.falseCeiling.design.beamHiding", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Beam Hiding</span>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 4️⃣ FLOOR COVERING */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              4️⃣ Floor Covering
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.floorCovering.glossTile}
                  onChange={(e) => onChange(roomName, "livingRoom.floorCovering.glossTile", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Gloss Tile</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.floorCovering.mattTile}
                  onChange={(e) => onChange(roomName, "livingRoom.floorCovering.mattTile", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Matt Tile</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.floorCovering.marble}
                  onChange={(e) => onChange(roomName, "livingRoom.floorCovering.marble", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Marble</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.livingRoom.floorCovering.granite}
                  onChange={(e) => onChange(roomName, "livingRoom.floorCovering.granite", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Granite</span>
              </label>
            </div>
          </div>

          {/* 5️⃣ SOFT FURNISHINGS */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              5️⃣ Soft Furnishings
            </h4>
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Curtains</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-curtains`}
                    value="Sheer"
                    checked={roomData.livingRoom.softFurnishings.curtains === "Sheer"}
                    onChange={(e) => onChange(roomName, "livingRoom.softFurnishings.curtains", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Sheer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-curtains`}
                    value="Blackout"
                    checked={roomData.livingRoom.softFurnishings.curtains === "Blackout"}
                    onChange={(e) => onChange(roomName, "livingRoom.softFurnishings.curtains", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Blackout</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-curtains`}
                    value="Both"
                    checked={roomData.livingRoom.softFurnishings.curtains === "Both"}
                    onChange={(e) => onChange(roomName, "livingRoom.softFurnishings.curtains", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Both</span>
                </label>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.softFurnishings.blinds}
                    onChange={(e) => onChange(roomName, "livingRoom.softFurnishings.blinds", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Blinds</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.softFurnishings.rug}
                    onChange={(e) => onChange(roomName, "livingRoom.softFurnishings.rug", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Rug</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-text mb-1">Upholstery Requirements</label>
              <textarea
                value={roomData.livingRoom.softFurnishings.upholsteryRequirements}
                onChange={(e) => onChange(roomName, "livingRoom.softFurnishings.upholsteryRequirements", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                rows="3"
                placeholder="Describe upholstery requirements..."
              />
            </div>
          </div>

          {/* 6️⃣ WALL PANELING */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              6️⃣ Wall Paneling
            </h4>
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Wall Paneling Required</h5>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-wallPanelingRequired`}
                    value="Yes"
                    checked={roomData.livingRoom.wallPaneling.required === "Yes"}
                    onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.required", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-wallPanelingRequired`}
                    value="No"
                    checked={roomData.livingRoom.wallPaneling.required === "No"}
                    onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.required", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">No</span>
                </label>
              </div>
            </div>
            
            {roomData.livingRoom.wallPaneling.required === "Yes" && (
              <>
                <div className="mb-3">
                  <label className="block text-xs text-gray-text mb-2">Number of Walls</label>
                  <select
                    value={roomData.livingRoom.wallPaneling.numberOfWalls}
                    onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.numberOfWalls", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <h5 className="text-gray-text text-xs font-medium mb-2">Materials</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.wallPaneling.materials.pop}
                        onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.materials.pop", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">POP</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.wallPaneling.materials.laminate}
                        onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.materials.laminate", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Laminate</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.wallPaneling.materials.veneer}
                        onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.materials.veneer", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Veneer</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.wallPaneling.materials.pu}
                        onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.materials.pu", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">PU</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.wallPaneling.materials.mdf}
                        onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.materials.mdf", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">MDF</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.wallPaneling.materials.fabric}
                        onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.materials.fabric", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Fabric</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.wallPaneling.materials.glass}
                        onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.materials.glass", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Glass</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.wallPaneling.materials.acrylic}
                        onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.materials.acrylic", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Acrylic</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.livingRoom.wallPaneling.materials.stone}
                        onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.materials.stone", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Stone</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-gray-text text-xs font-medium mb-2">Wall Sizes</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {parseInt(roomData.livingRoom.wallPaneling.numberOfWalls) >= 1 && (
                      <div>
                        <label className="block text-xs text-gray-text mb-1">Wall 1 Size</label>
                        <input
                          type="text"
                          value={roomData.livingRoom.wallPaneling.wall1Size}
                          onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.wall1Size", e.target.value)}
                          className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                          placeholder="e.g., 10ft x 8ft"
                        />
                      </div>
                    )}
                    {parseInt(roomData.livingRoom.wallPaneling.numberOfWalls) >= 2 && (
                      <div>
                        <label className="block text-xs text-gray-text mb-1">Wall 2 Size</label>
                        <input
                          type="text"
                          value={roomData.livingRoom.wallPaneling.wall2Size}
                          onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.wall2Size", e.target.value)}
                          className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                          placeholder="e.g., 10ft x 8ft"
                        />
                      </div>
                    )}
                    {parseInt(roomData.livingRoom.wallPaneling.numberOfWalls) >= 3 && (
                      <div>
                        <label className="block text-xs text-gray-text mb-1">Wall 3 Size</label>
                        <input
                          type="text"
                          value={roomData.livingRoom.wallPaneling.wall3Size}
                          onChange={(e) => onChange(roomName, "livingRoom.wallPaneling.wall3Size", e.target.value)}
                          className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                          placeholder="e.g., 10ft x 8ft"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 7️⃣ CARPENTRY */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              7️⃣ Carpentry
            </h4>
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Furniture Units</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.carpentry.furnitureUnits.tvUnit}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.furnitureUnits.tvUnit", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">TV Unit</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.carpentry.furnitureUnits.crockeryUnit}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.furnitureUnits.crockeryUnit", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Crockery Unit</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.carpentry.furnitureUnits.barUnit}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.furnitureUnits.barUnit", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Bar Unit</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.carpentry.furnitureUnits.console}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.furnitureUnits.console", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Console</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.carpentry.furnitureUnits.windowSeating}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.furnitureUnits.windowSeating", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Window Seating</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.carpentry.furnitureUnits.looseFurniture}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.furnitureUnits.looseFurniture", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Loose Furniture</span>
                </label>
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Seating & Tables</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-1">Sofa (Seater)</label>
                  <input
                    type="number"
                    value={roomData.livingRoom.carpentry.sofa}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.sofa", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    placeholder="e.g., 5"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Armchairs (Qty)</label>
                  <input
                    type="number"
                    value={roomData.livingRoom.carpentry.armchairs}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.armchairs", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Lounge Chairs (Qty)</label>
                  <input
                    type="number"
                    value={roomData.livingRoom.carpentry.loungeChairs}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.loungeChairs", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.carpentry.coffeeTable}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.coffeeTable", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Coffee Table</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.carpentry.sideTables}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.sideTables", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Side Tables</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.carpentry.rug}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.rug", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Rug</span>
                </label>
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Hardware Level</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-hardwareLevel`}
                    value="Basic"
                    checked={roomData.livingRoom.carpentry.hardwareLevel === "Basic"}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.hardwareLevel", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Basic (Local Brands)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-hardwareLevel`}
                    value="Mid"
                    checked={roomData.livingRoom.carpentry.hardwareLevel === "Mid"}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.hardwareLevel", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Mid (Hettich India / Ozone / Inox)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-hardwareLevel`}
                    value="Premium"
                    checked={roomData.livingRoom.carpentry.hardwareLevel === "Premium"}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.hardwareLevel", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Premium (Hafele / Hettich Germany)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-hardwareLevel`}
                    value="Ultra Premium"
                    checked={roomData.livingRoom.carpentry.hardwareLevel === "Ultra Premium"}
                    onChange={(e) => onChange(roomName, "livingRoom.carpentry.hardwareLevel", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Ultra Premium (Blum Soft-Close)</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-text mb-1">Notes</label>
              <textarea
                value={roomData.livingRoom.carpentry.notes}
                onChange={(e) => onChange(roomName, "livingRoom.carpentry.notes", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                rows="2"
                placeholder="Add carpentry notes..."
              />
            </div>
          </div>

          {/* 8️⃣ ELECTRICAL */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              8️⃣ Electrical
            </h4>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Wiring & Switches</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-2">Wiring Brand</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wiringBrand`}
                        value="Havells"
                        checked={roomData.livingRoom.electrical.wiringBrand === "Havells"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Havells</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wiringBrand`}
                        value="Polycab"
                        checked={roomData.livingRoom.electrical.wiringBrand === "Polycab"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Polycab</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wiringBrand`}
                        value="Finolex"
                        checked={roomData.livingRoom.electrical.wiringBrand === "Finolex"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Finolex</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wiringBrand`}
                        value="Local"
                        checked={roomData.livingRoom.electrical.wiringBrand === "Local"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Local</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-text mb-2">Wire Type</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wireType`}
                        value="FR"
                        checked={roomData.livingRoom.electrical.wireType === "FR"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.wireType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">FR</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wireType`}
                        value="FRLS"
                        checked={roomData.livingRoom.electrical.wireType === "FRLS"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.wireType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">FRLS</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wireType`}
                        value="Non-FR"
                        checked={roomData.livingRoom.electrical.wireType === "Non-FR"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.wireType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Non-FR</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-text mb-2">Switch Type</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-switchType`}
                        value="Anchor"
                        checked={roomData.livingRoom.electrical.switchType === "Anchor"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.switchType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Anchor</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-switchType`}
                        value="GM"
                        checked={roomData.livingRoom.electrical.switchType === "GM"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.switchType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">GM</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-switchType`}
                        value="Legrand"
                        checked={roomData.livingRoom.electrical.switchType === "Legrand"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.switchType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Legrand</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-switchType`}
                        value="Schneider"
                        checked={roomData.livingRoom.electrical.switchType === "Schneider"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.switchType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Schneider</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-switchType`}
                        value="Smart"
                        checked={roomData.livingRoom.electrical.switchType === "Smart"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.switchType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Smart</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Light Categories</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.electrical.lighting.cob}
                    onChange={(e) => onChange(roomName, "livingRoom.electrical.lighting.cob", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">COB</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.electrical.lighting.downlights}
                    onChange={(e) => onChange(roomName, "livingRoom.electrical.lighting.downlights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Downlights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.electrical.lighting.panelLights}
                    onChange={(e) => onChange(roomName, "livingRoom.electrical.lighting.panelLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Panel Lights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.electrical.lighting.profileLights}
                    onChange={(e) => onChange(roomName, "livingRoom.electrical.lighting.profileLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Profile Lights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.electrical.lighting.coveLights}
                    onChange={(e) => onChange(roomName, "livingRoom.electrical.lighting.coveLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Cove Lights</span>
                </label>
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Other Electrical</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.livingRoom.electrical.chandelier}
                    onChange={(e) => onChange(roomName, "livingRoom.electrical.chandelier", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Chandelier</span>
                </label>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.livingRoom.electrical.wallLights}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.wallLights", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Wall Lights</span>
                  </label>
                  {roomData.livingRoom.electrical.wallLights && (
                    <input
                      type="number"
                      value={roomData.livingRoom.electrical.wallLightsQty}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.wallLightsQty", e.target.value)}
                      className="w-16 bg-dark-light border border-gray-border rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Qty"
                    />
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.livingRoom.electrical.fans}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.fans", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Fans</span>
                  </label>
                  {roomData.livingRoom.electrical.fans && (
                    <input
                      type="number"
                      value={roomData.livingRoom.electrical.fansQty}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.fansQty", e.target.value)}
                      className="w-16 bg-dark-light border border-gray-border rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Qty"
                    />
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.livingRoom.electrical.acWiring}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.acWiring", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">AC Wiring</span>
                  </label>
                  {roomData.livingRoom.electrical.acWiring && (
                    <input
                      type="number"
                      value={roomData.livingRoom.electrical.acWiringQty}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.acWiringQty", e.target.value)}
                      className="w-16 bg-dark-light border border-gray-border rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Qty"
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-2">Speakers Required</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-speakersRequired`}
                        value="Yes"
                        checked={roomData.livingRoom.electrical.speakersRequired === "Yes"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.speakersRequired", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-speakersRequired`}
                        value="No"
                        checked={roomData.livingRoom.electrical.speakersRequired === "No"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.speakersRequired", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">No</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-text mb-2">Automation Required</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-automationRequired`}
                        value="Yes"
                        checked={roomData.livingRoom.electrical.automationRequired === "Yes"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.automationRequired", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-automationRequired`}
                        value="No"
                        checked={roomData.livingRoom.electrical.automationRequired === "No"}
                        onChange={(e) => onChange(roomName, "livingRoom.electrical.automationRequired", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {roomData.livingRoom.electrical.automationRequired === "Yes" && (
              <div className="mb-3">
                <h5 className="text-gray-text text-xs font-medium mb-2">Automation Options</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.livingRoom.electrical.automationOptions.lights}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.automationOptions.lights", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Lights</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.livingRoom.electrical.automationOptions.curtains}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.automationOptions.curtains", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Curtains</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.livingRoom.electrical.automationOptions.ac}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.automationOptions.ac", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">AC</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.livingRoom.electrical.automationOptions.tv}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.automationOptions.tv", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">TV</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.livingRoom.electrical.automationOptions.speakers}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.automationOptions.speakers", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Speakers</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.livingRoom.electrical.automationOptions.sceneSettings}
                      onChange={(e) => onChange(roomName, "livingRoom.electrical.automationOptions.sceneSettings", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Scene Settings</span>
                  </label>
                </div>
              </div>
            )}
            
            <div>
              <h5 className="text-gray-text text-xs font-medium mb-2">Air Conditioning</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-1">AC Type</label>
                  <select
                    value={roomData.livingRoom.electrical.acType}
                    onChange={(e) => onChange(roomName, "livingRoom.electrical.acType", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="Split">Split</option>
                    <option value="Cassette">Cassette</option>
                    <option value="Ductable">Ductable</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Approx. Wiring Length (ft)</label>
                  <input
                    type="number"
                    value={roomData.livingRoom.electrical.wiringLength}
                    onChange={(e) => onChange(roomName, "livingRoom.electrical.wiringLength", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 9️⃣ PAINT */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              9️⃣ Paint
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Wall Paint Options</label>
                <select
                  value={roomData.livingRoom.paint.wallPaint}
                  onChange={(e) => onChange(roomName, "livingRoom.paint.wallPaint", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Royale Shine">Royale Shine</option>
                  <option value="PU">PU</option>
                  <option value="Texture">Texture</option>
                  <option value="Royale Matt">Royale Matt</option>
                  <option value="Satin">Satin</option>
                  <option value="Plastic Premium">Plastic Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Paint Options</label>
                <select
                  value={roomData.livingRoom.paint.ceilingPaint}
                  onChange={(e) => onChange(roomName, "livingRoom.paint.ceilingPaint", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Royale Shine">Royale Shine</option>
                  <option value="PU">PU</option>
                  <option value="Texture">Texture</option>
                  <option value="Royale Matt">Royale Matt</option>
                  <option value="Satin">Satin</option>
                  <option value="Plastic Premium">Plastic Premium</option>
                </select>
              </div>
            </div>
          </div>

          {/* 🔟 NOTES */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              🔟 Notes
            </h4>
            <textarea
              value={roomData.livingRoom.notes}
              onChange={(e) => onChange(roomName, "livingRoom.notes", e.target.value)}
              className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              rows="4"
              placeholder="Add any additional notes for the living/drawing room..."
            />
          </div>
            </>
          ) : isDiningArea && roomData.diningArea ? (
            <>
          {/* DINING AREA CUSTOM SECTIONS */}
          {/* 1️⃣ BASIC INFORMATION */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              1️⃣ Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Length (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.diningArea.basicInfo.length}
                  onChange={(e) => onChange(roomName, "diningArea.basicInfo.length", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.diningArea.basicInfo.width}
                  onChange={(e) => onChange(roomName, "diningArea.basicInfo.width", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.diningArea.basicInfo.ceilingHeight}
                  onChange={(e) => onChange(roomName, "diningArea.basicInfo.ceilingHeight", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Window Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-1">Window Count</label>
                  <input
                    type="number"
                    value={roomData.diningArea.basicInfo.windowCount}
                    onChange={(e) => onChange(roomName, "diningArea.basicInfo.windowCount", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Sill Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={roomData.diningArea.basicInfo.sillHeight}
                    onChange={(e) => onChange(roomName, "diningArea.basicInfo.sillHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Lintel Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={roomData.diningArea.basicInfo.lintelHeight}
                    onChange={(e) => onChange(roomName, "diningArea.basicInfo.lintelHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Balcony Access</h5>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-balconyAccess`}
                    value="Yes"
                    checked={roomData.diningArea.basicInfo.balconyAccess === "Yes"}
                    onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyAccess", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-balconyAccess`}
                    value="No"
                    checked={roomData.diningArea.basicInfo.balconyAccess === "No"}
                    onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyAccess", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">No</span>
                </label>
              </div>
              
              {roomData.diningArea.basicInfo.balconyAccess === "Yes" && (
                <>
                  <div className="mb-3">
                    <h6 className="text-gray-text text-xs font-medium mb-2">Balcony Door Type</h6>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name={`${roomName}-balconyDoorType`}
                          value="Sliding"
                          checked={roomData.diningArea.basicInfo.balconyDoorType === "Sliding"}
                          onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyDoorType", e.target.value)}
                          className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">Sliding</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name={`${roomName}-balconyDoorType`}
                          value="Hinged Single"
                          checked={roomData.diningArea.basicInfo.balconyDoorType === "Hinged Single"}
                          onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyDoorType", e.target.value)}
                          className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">Hinged Single</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name={`${roomName}-balconyDoorType`}
                          value="Hinged Double"
                          checked={roomData.diningArea.basicInfo.balconyDoorType === "Hinged Double"}
                          onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyDoorType", e.target.value)}
                          className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">Hinged Double</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name={`${roomName}-balconyDoorType`}
                          value="Fixed"
                          checked={roomData.diningArea.basicInfo.balconyDoorType === "Fixed"}
                          onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyDoorType", e.target.value)}
                          className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">Fixed</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="text-gray-text text-xs font-medium mb-2">Door Size</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={roomData.diningArea.basicInfo.balconyDoorWidth}
                          onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyDoorWidth", e.target.value)}
                          className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-text mb-1">Height (ft)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={roomData.diningArea.basicInfo.balconyDoorHeight}
                          onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyDoorHeight", e.target.value)}
                          className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-xs text-gray-text mb-2">Balcony Railing Type</label>
                    <select
                      value={roomData.diningArea.basicInfo.balconyRailingType}
                      onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyRailingType", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Brick">Brick</option>
                      <option value="Glass">Glass</option>
                      <option value="Aluminium + Glass">Aluminium + Glass</option>
                      <option value="SS">SS</option>
                      <option value="MS">MS</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  {roomData.diningArea.basicInfo.balconyRailingType === "Other" && (
                    <div className="mb-3">
                      <label className="block text-xs text-gray-text mb-1">Specify Other Railing Type</label>
                      <input
                        type="text"
                        value={roomData.diningArea.basicInfo.balconyRailingOther}
                        onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyRailingOther", e.target.value)}
                        className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                        placeholder="Enter railing type"
                      />
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label className="block text-xs text-gray-text mb-1">Railing Size</label>
                    <input
                      type="text"
                      value={roomData.diningArea.basicInfo.balconyRailingSize}
                      onChange={(e) => onChange(roomName, "diningArea.basicInfo.balconyRailingSize", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Enter railing size"
                    />
                  </div>
                </>
              )}
            </div>
            
            <div>
              <label className="block text-xs text-gray-text mb-1">Notes</label>
              <textarea
                value={roomData.diningArea.basicInfo.notes}
                onChange={(e) => onChange(roomName, "diningArea.basicInfo.notes", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                rows="2"
                placeholder="Add basic information notes..."
              />
            </div>
          </div>

          {/* 2️⃣ CIVIL WORK */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              2️⃣ Civil Work
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.civilWork.demolitionFlooring}
                  onChange={(e) => onChange(roomName, "diningArea.civilWork.demolitionFlooring", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Demolition of flooring</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.civilWork.demolitionWalls}
                  onChange={(e) => onChange(roomName, "diningArea.civilWork.demolitionWalls", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Demolition of walls</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.civilWork.newPartitions}
                  onChange={(e) => onChange(roomName, "diningArea.civilWork.newPartitions", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">New partitions / wall shifting</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.civilWork.floorLeveling}
                  onChange={(e) => onChange(roomName, "diningArea.civilWork.floorLeveling", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Floor leveling / screeding</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.civilWork.newFlooring}
                  onChange={(e) => onChange(roomName, "diningArea.civilWork.newFlooring", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">New flooring installation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.civilWork.skirting}
                  onChange={(e) => onChange(roomName, "diningArea.civilWork.skirting", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Skirting installation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.civilWork.beamCovering}
                  onChange={(e) => onChange(roomName, "diningArea.civilWork.beamCovering", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Beam/column covering</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.civilWork.windowModification}
                  onChange={(e) => onChange(roomName, "diningArea.civilWork.windowModification", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Window enlargement/reduction</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.civilWork.doorModification}
                  onChange={(e) => onChange(roomName, "diningArea.civilWork.doorModification", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Door shifting / door enlargement / add extra door</span>
              </label>
            </div>
          </div>

          {/* 3️⃣ FALSE CEILING */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              3️⃣ False Ceiling
            </h4>
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">False Ceiling Required</h5>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-falseCeilingRequired`}
                    value="Yes"
                    checked={roomData.diningArea.falseCeiling.required === "Yes"}
                    onChange={(e) => onChange(roomName, "diningArea.falseCeiling.required", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-falseCeilingRequired`}
                    value="No"
                    checked={roomData.diningArea.falseCeiling.required === "No"}
                    onChange={(e) => onChange(roomName, "diningArea.falseCeiling.required", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">No</span>
                </label>
              </div>
            </div>
            
            {roomData.diningArea.falseCeiling.required === "Yes" && (
              <>
                <div className="mb-3">
                  <h5 className="text-gray-text text-xs font-medium mb-2">False Ceiling Type</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-falseCeilingType`}
                        value="POP"
                        checked={roomData.diningArea.falseCeiling.type === "POP"}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.type", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">POP</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-falseCeilingType`}
                        value="Wooden"
                        checked={roomData.diningArea.falseCeiling.type === "Wooden"}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.type", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Wooden</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-falseCeilingType`}
                        value="Stretch"
                        checked={roomData.diningArea.falseCeiling.type === "Stretch"}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.type", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Stretch</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-falseCeilingType`}
                        value="Grid"
                        checked={roomData.diningArea.falseCeiling.type === "Grid"}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.type", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Grid</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h5 className="text-gray-text text-xs font-medium mb-2">Cove Lighting Options</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.falseCeiling.coveLighting.outsideOnly}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.coveLighting.outsideOnly", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Outside Cove Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.falseCeiling.coveLighting.insideOnly}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.coveLighting.insideOnly", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Inside Cove Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.falseCeiling.coveLighting.insideOutside}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.coveLighting.insideOutside", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Inside + Outside Cove</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h5 className="text-gray-text text-xs font-medium mb-2">Ceiling Design Options</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.falseCeiling.design.grooves}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.design.grooves", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Grooves</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.falseCeiling.design.mouldings}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.design.mouldings", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Mouldings</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.falseCeiling.design.beamCovering}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.design.beamCovering", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Beam Covering</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.falseCeiling.design.noDesign}
                        onChange={(e) => onChange(roomName, "diningArea.falseCeiling.design.noDesign", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">No Design</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-text mb-1">Notes</label>
                  <textarea
                    value={roomData.diningArea.falseCeiling.notes}
                    onChange={(e) => onChange(roomName, "diningArea.falseCeiling.notes", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    rows="2"
                    placeholder="Add false ceiling notes..."
                  />
                </div>
              </>
            )}
          </div>

          {/* 4️⃣ FLOOR COVERING */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              4️⃣ Floor Covering
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.floorCovering.glossTile}
                  onChange={(e) => onChange(roomName, "diningArea.floorCovering.glossTile", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Gloss Tile</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.floorCovering.mattTile}
                  onChange={(e) => onChange(roomName, "diningArea.floorCovering.mattTile", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Matt Tile</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.floorCovering.marble}
                  onChange={(e) => onChange(roomName, "diningArea.floorCovering.marble", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Marble</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.floorCovering.granite}
                  onChange={(e) => onChange(roomName, "diningArea.floorCovering.granite", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Granite</span>
              </label>
            </div>
          </div>

          {/* 5️⃣ SOFT FURNISHINGS */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              5️⃣ Soft Furnishings
            </h4>
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Curtains</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-curtains`}
                    value="Sheer"
                    checked={roomData.diningArea.softFurnishings.curtains === "Sheer"}
                    onChange={(e) => onChange(roomName, "diningArea.softFurnishings.curtains", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Sheer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-curtains`}
                    value="Blackout"
                    checked={roomData.diningArea.softFurnishings.curtains === "Blackout"}
                    onChange={(e) => onChange(roomName, "diningArea.softFurnishings.curtains", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Blackout</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-curtains`}
                    value="Both"
                    checked={roomData.diningArea.softFurnishings.curtains === "Both"}
                    onChange={(e) => onChange(roomName, "diningArea.softFurnishings.curtains", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Both</span>
                </label>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.diningArea.softFurnishings.blinds}
                    onChange={(e) => onChange(roomName, "diningArea.softFurnishings.blinds", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Blinds</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.diningArea.softFurnishings.rug}
                    onChange={(e) => onChange(roomName, "diningArea.softFurnishings.rug", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Rug</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-text mb-1">Upholstery Requirements</label>
              <textarea
                value={roomData.diningArea.softFurnishings.upholsteryRequirements}
                onChange={(e) => onChange(roomName, "diningArea.softFurnishings.upholsteryRequirements", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                rows="3"
                placeholder="Describe upholstery requirements..."
              />
            </div>
          </div>

          {/* 6️⃣ WALL PANELING */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              6️⃣ Wall Paneling
            </h4>
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Wall Paneling Required</h5>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-wallPanelingRequired`}
                    value="Yes"
                    checked={roomData.diningArea.wallPaneling.required === "Yes"}
                    onChange={(e) => onChange(roomName, "diningArea.wallPaneling.required", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-wallPanelingRequired`}
                    value="No"
                    checked={roomData.diningArea.wallPaneling.required === "No"}
                    onChange={(e) => onChange(roomName, "diningArea.wallPaneling.required", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">No</span>
                </label>
              </div>
            </div>
            
            {roomData.diningArea.wallPaneling.required === "Yes" && (
              <>
                <div className="mb-3">
                  <label className="block text-xs text-gray-text mb-2">Number of Walls</label>
                  <select
                    value={roomData.diningArea.wallPaneling.numberOfWalls}
                    onChange={(e) => onChange(roomName, "diningArea.wallPaneling.numberOfWalls", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <h5 className="text-gray-text text-xs font-medium mb-2">Materials</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.wallPaneling.materials.pop}
                        onChange={(e) => onChange(roomName, "diningArea.wallPaneling.materials.pop", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">POP</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.wallPaneling.materials.laminate}
                        onChange={(e) => onChange(roomName, "diningArea.wallPaneling.materials.laminate", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Laminate</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.wallPaneling.materials.veneer}
                        onChange={(e) => onChange(roomName, "diningArea.wallPaneling.materials.veneer", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Veneer</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.wallPaneling.materials.pu}
                        onChange={(e) => onChange(roomName, "diningArea.wallPaneling.materials.pu", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">PU</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.wallPaneling.materials.mdf}
                        onChange={(e) => onChange(roomName, "diningArea.wallPaneling.materials.mdf", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">MDF</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.wallPaneling.materials.fabric}
                        onChange={(e) => onChange(roomName, "diningArea.wallPaneling.materials.fabric", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Fabric</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.wallPaneling.materials.glass}
                        onChange={(e) => onChange(roomName, "diningArea.wallPaneling.materials.glass", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Glass</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.wallPaneling.materials.acrylic}
                        onChange={(e) => onChange(roomName, "diningArea.wallPaneling.materials.acrylic", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Acrylic</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.diningArea.wallPaneling.materials.stone}
                        onChange={(e) => onChange(roomName, "diningArea.wallPaneling.materials.stone", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Stone</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-gray-text text-xs font-medium mb-2">Wall Sizes</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {parseInt(roomData.diningArea.wallPaneling.numberOfWalls) >= 1 && (
                      <div>
                        <label className="block text-xs text-gray-text mb-1">Wall 1 Size</label>
                        <input
                          type="text"
                          value={roomData.diningArea.wallPaneling.wall1Size}
                          onChange={(e) => onChange(roomName, "diningArea.wallPaneling.wall1Size", e.target.value)}
                          className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                          placeholder="e.g., 10ft x 8ft"
                        />
                      </div>
                    )}
                    {parseInt(roomData.diningArea.wallPaneling.numberOfWalls) >= 2 && (
                      <div>
                        <label className="block text-xs text-gray-text mb-1">Wall 2 Size</label>
                        <input
                          type="text"
                          value={roomData.diningArea.wallPaneling.wall2Size}
                          onChange={(e) => onChange(roomName, "diningArea.wallPaneling.wall2Size", e.target.value)}
                          className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                          placeholder="e.g., 10ft x 8ft"
                        />
                      </div>
                    )}
                    {parseInt(roomData.diningArea.wallPaneling.numberOfWalls) >= 3 && (
                      <div>
                        <label className="block text-xs text-gray-text mb-1">Wall 3 Size</label>
                        <input
                          type="text"
                          value={roomData.diningArea.wallPaneling.wall3Size}
                          onChange={(e) => onChange(roomName, "diningArea.wallPaneling.wall3Size", e.target.value)}
                          className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                          placeholder="e.g., 10ft x 8ft"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 7️⃣ DINING STORAGE */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              7️⃣ Dining Storage
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.diningStorage.crockeryUnit}
                  onChange={(e) => onChange(roomName, "diningArea.diningStorage.crockeryUnit", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Crockery Unit</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.diningStorage.consoleTable}
                  onChange={(e) => onChange(roomName, "diningArea.diningStorage.consoleTable", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Console Table</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.diningStorage.buffet}
                  onChange={(e) => onChange(roomName, "diningArea.diningStorage.buffet", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Buffet / Sideboard</span>
              </label>
            </div>
          </div>

          {/* 8️⃣ FURNITURE */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              8️⃣ Furniture
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Dining Table (Number of persons)</label>
                <input
                  type="number"
                  value={roomData.diningArea.furniture.diningTablePersons}
                  onChange={(e) => onChange(roomName, "diningArea.furniture.diningTablePersons", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  placeholder="e.g., 6"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Chairs (Quantity)</label>
                <input
                  type="number"
                  value={roomData.diningArea.furniture.chairsQuantity}
                  onChange={(e) => onChange(roomName, "diningArea.furniture.chairsQuantity", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.diningArea.furniture.benchSeating}
                  onChange={(e) => onChange(roomName, "diningArea.furniture.benchSeating", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Bench Seating</span>
              </label>
            </div>
          </div>

          {/* 9️⃣ CARPENTRY */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              9️⃣ Carpentry
            </h4>
            <div>
              <h5 className="text-gray-text text-xs font-medium mb-2">Hardware Level</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-hardwareLevel`}
                    value="Basic"
                    checked={roomData.diningArea.carpentry.hardwareLevel === "Basic"}
                    onChange={(e) => onChange(roomName, "diningArea.carpentry.hardwareLevel", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Basic (Local Indian Brands)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-hardwareLevel`}
                    value="Mid"
                    checked={roomData.diningArea.carpentry.hardwareLevel === "Mid"}
                    onChange={(e) => onChange(roomName, "diningArea.carpentry.hardwareLevel", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Mid (Hettich India / Ozone / Inox)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-hardwareLevel`}
                    value="Premium"
                    checked={roomData.diningArea.carpentry.hardwareLevel === "Premium"}
                    onChange={(e) => onChange(roomName, "diningArea.carpentry.hardwareLevel", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Premium (Hafele / Hettich Germany)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`${roomName}-hardwareLevel`}
                    value="Ultra Premium"
                    checked={roomData.diningArea.carpentry.hardwareLevel === "Ultra Premium"}
                    onChange={(e) => onChange(roomName, "diningArea.carpentry.hardwareLevel", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Ultra Premium (Blum Soft-Close)</span>
                </label>
              </div>
            </div>
          </div>

          {/* 🔟 ELECTRICAL */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              🔟 Electrical
            </h4>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Wiring & Switches</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-2">Wiring Brand</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wiringBrand`}
                        value="Havells"
                        checked={roomData.diningArea.electrical.wiringBrand === "Havells"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Havells</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wiringBrand`}
                        value="Polycab"
                        checked={roomData.diningArea.electrical.wiringBrand === "Polycab"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Polycab</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wiringBrand`}
                        value="Finolex"
                        checked={roomData.diningArea.electrical.wiringBrand === "Finolex"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Finolex</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wiringBrand`}
                        value="Local"
                        checked={roomData.diningArea.electrical.wiringBrand === "Local"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Local</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-text mb-2">Wire Type</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wireType`}
                        value="FR"
                        checked={roomData.diningArea.electrical.wireType === "FR"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.wireType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">FR</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wireType`}
                        value="FRLS"
                        checked={roomData.diningArea.electrical.wireType === "FRLS"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.wireType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">FRLS</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-wireType`}
                        value="Non-FR"
                        checked={roomData.diningArea.electrical.wireType === "Non-FR"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.wireType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Non-FR</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-text mb-2">Switch Type</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-switchType`}
                        value="Anchor"
                        checked={roomData.diningArea.electrical.switchType === "Anchor"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.switchType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Anchor</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-switchType`}
                        value="GM"
                        checked={roomData.diningArea.electrical.switchType === "GM"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.switchType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">GM</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-switchType`}
                        value="Legrand"
                        checked={roomData.diningArea.electrical.switchType === "Legrand"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.switchType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Legrand</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-switchType`}
                        value="Schneider"
                        checked={roomData.diningArea.electrical.switchType === "Schneider"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.switchType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Schneider</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-switchType`}
                        value="Smart"
                        checked={roomData.diningArea.electrical.switchType === "Smart"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.switchType", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Smart</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Light Categories</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.diningArea.electrical.lighting.cob}
                    onChange={(e) => onChange(roomName, "diningArea.electrical.lighting.cob", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">COB</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.diningArea.electrical.lighting.downlights}
                    onChange={(e) => onChange(roomName, "diningArea.electrical.lighting.downlights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Downlights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.diningArea.electrical.lighting.panelLights}
                    onChange={(e) => onChange(roomName, "diningArea.electrical.lighting.panelLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Panel Lights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.diningArea.electrical.lighting.profileLights}
                    onChange={(e) => onChange(roomName, "diningArea.electrical.lighting.profileLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Profile Lights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.diningArea.electrical.lighting.coveLights}
                    onChange={(e) => onChange(roomName, "diningArea.electrical.lighting.coveLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Cove Lights</span>
                </label>
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-gray-text text-xs font-medium mb-2">Other Electrical</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.diningArea.electrical.chandelier}
                    onChange={(e) => onChange(roomName, "diningArea.electrical.chandelier", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Chandelier</span>
                </label>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.diningArea.electrical.wallLights}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.wallLights", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Wall Lights</span>
                  </label>
                  {roomData.diningArea.electrical.wallLights && (
                    <input
                      type="number"
                      value={roomData.diningArea.electrical.wallLightsQty}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.wallLightsQty", e.target.value)}
                      className="w-16 bg-dark-light border border-gray-border rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Qty"
                    />
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.diningArea.electrical.fans}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.fans", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Fans</span>
                  </label>
                  {roomData.diningArea.electrical.fans && (
                    <input
                      type="number"
                      value={roomData.diningArea.electrical.fansQty}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.fansQty", e.target.value)}
                      className="w-16 bg-dark-light border border-gray-border rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Qty"
                    />
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.diningArea.electrical.acWiring}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.acWiring", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">AC Wiring</span>
                  </label>
                  {roomData.diningArea.electrical.acWiring && (
                    <input
                      type="number"
                      value={roomData.diningArea.electrical.acWiringQty}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.acWiringQty", e.target.value)}
                      className="w-16 bg-dark-light border border-gray-border rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Qty"
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-2">Speakers Required</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-speakersRequired`}
                        value="Yes"
                        checked={roomData.diningArea.electrical.speakersRequired === "Yes"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.speakersRequired", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-speakersRequired`}
                        value="No"
                        checked={roomData.diningArea.electrical.speakersRequired === "No"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.speakersRequired", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">No</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-text mb-2">Automation Required</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-automationRequired`}
                        value="Yes"
                        checked={roomData.diningArea.electrical.automationRequired === "Yes"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.automationRequired", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`${roomName}-automationRequired`}
                        value="No"
                        checked={roomData.diningArea.electrical.automationRequired === "No"}
                        onChange={(e) => onChange(roomName, "diningArea.electrical.automationRequired", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {roomData.diningArea.electrical.automationRequired === "Yes" && (
              <div className="mb-3">
                <h5 className="text-gray-text text-xs font-medium mb-2">Automation Options</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.diningArea.electrical.automationOptions.lights}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.automationOptions.lights", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Lights</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.diningArea.electrical.automationOptions.curtains}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.automationOptions.curtains", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Curtains</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.diningArea.electrical.automationOptions.ac}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.automationOptions.ac", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">AC</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.diningArea.electrical.automationOptions.tv}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.automationOptions.tv", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">TV</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.diningArea.electrical.automationOptions.speakers}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.automationOptions.speakers", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Speakers</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.diningArea.electrical.automationOptions.sceneSettings}
                      onChange={(e) => onChange(roomName, "diningArea.electrical.automationOptions.sceneSettings", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Scene Settings</span>
                  </label>
                </div>
              </div>
            )}
            
            <div>
              <h5 className="text-gray-text text-xs font-medium mb-2">Air Conditioning</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-1">AC Type</label>
                  <select
                    value={roomData.diningArea.electrical.acType}
                    onChange={(e) => onChange(roomName, "diningArea.electrical.acType", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="Split">Split</option>
                    <option value="Cassette">Cassette</option>
                    <option value="Ductable">Ductable</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Approx. Wiring Length (ft)</label>
                  <input
                    type="number"
                    value={roomData.diningArea.electrical.wiringLength}
                    onChange={(e) => onChange(roomName, "diningArea.electrical.wiringLength", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 1️⃣1️⃣ PAINT */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              1️⃣1️⃣ Paint
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Wall Paint Options</label>
                <select
                  value={roomData.diningArea.paint.wallPaint}
                  onChange={(e) => onChange(roomName, "diningArea.paint.wallPaint", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Royale Shine">Royale Shine</option>
                  <option value="PU">PU</option>
                  <option value="Texture">Texture</option>
                  <option value="Royale Matt">Royale Matt</option>
                  <option value="Satin">Satin</option>
                  <option value="Plastic Premium">Plastic Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Paint Options</label>
                <select
                  value={roomData.diningArea.paint.ceilingPaint}
                  onChange={(e) => onChange(roomName, "diningArea.paint.ceilingPaint", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Royale Shine">Royale Shine</option>
                  <option value="PU">PU</option>
                  <option value="Texture">Texture</option>
                  <option value="Royale Matt">Royale Matt</option>
                  <option value="Satin">Satin</option>
                  <option value="Plastic Premium">Plastic Premium</option>
                </select>
              </div>
            </div>
          </div>

          {/* 1️⃣2️⃣ NOTES */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              1️⃣2️⃣ Notes
            </h4>
            <textarea
              value={roomData.diningArea.notes}
              onChange={(e) => onChange(roomName, "diningArea.notes", e.target.value)}
              className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              rows="4"
              placeholder="Add any additional notes for the dining area..."
            />
          </div>
            </>
          ) : isKitchen && roomData.kitchen ? (
            <>
          {/* KITCHEN CUSTOM SECTIONS */}
          {/* Section H – Kitchen */}
          
          {/* 1️⃣ BASIC INFORMATION */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              Section H – Kitchen
            </h4>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              1️⃣ Basic Information
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Length (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.kitchen.basicInfo.length}
                  onChange={(e) => onChange(roomName, "kitchen.basicInfo.length", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.kitchen.basicInfo.width}
                  onChange={(e) => onChange(roomName, "kitchen.basicInfo.width", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.kitchen.basicInfo.ceilingHeight}
                  onChange={(e) => onChange(roomName, "kitchen.basicInfo.ceilingHeight", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Window Count</label>
                <input
                  type="number"
                  value={roomData.kitchen.basicInfo.windowCount}
                  onChange={(e) => onChange(roomName, "kitchen.basicInfo.windowCount", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Sill Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.kitchen.basicInfo.sillHeight}
                  onChange={(e) => onChange(roomName, "kitchen.basicInfo.sillHeight", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Lintel Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.kitchen.basicInfo.lintelHeight}
                  onChange={(e) => onChange(roomName, "kitchen.basicInfo.lintelHeight", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>

            {/* Balcony Access */}
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-2">Balcony Access</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`${roomName}-balconyAccess`}
                    value="Yes"
                    checked={roomData.kitchen.basicInfo.balconyAccess === "Yes"}
                    onChange={(e) => onChange(roomName, "kitchen.basicInfo.balconyAccess", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`${roomName}-balconyAccess`}
                    value="No"
                    checked={roomData.kitchen.basicInfo.balconyAccess === "No"}
                    onChange={(e) => onChange(roomName, "kitchen.basicInfo.balconyAccess", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">No</span>
                </label>
              </div>
            </div>

            {/* Conditional Balcony Details */}
            {roomData.kitchen.basicInfo.balconyAccess === "Yes" && (
              <div className="ml-6 space-y-3 border-l-2 border-accent/30 pl-4">
                <div>
                  <label className="block text-xs text-gray-text mb-2">Balcony Door Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Sliding", "Hinged Single", "Hinged Double", "Fixed"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`${roomName}-balconyDoorType`}
                          value={type}
                          checked={roomData.kitchen.basicInfo.balconyDoorType === type}
                          onChange={(e) => onChange(roomName, "kitchen.basicInfo.balconyDoorType", e.target.value)}
                          className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-text mb-1">Door Size</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Width (ft)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={roomData.kitchen.basicInfo.balconyDoorWidth}
                        onChange={(e) => onChange(roomName, "kitchen.basicInfo.balconyDoorWidth", e.target.value)}
                        className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Height (ft)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={roomData.kitchen.basicInfo.balconyDoorHeight}
                        onChange={(e) => onChange(roomName, "kitchen.basicInfo.balconyDoorHeight", e.target.value)}
                        className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-text mb-1">Balcony Railing Type</label>
                  <select
                    value={roomData.kitchen.basicInfo.balconyRailingType}
                    onChange={(e) => onChange(roomName, "kitchen.basicInfo.balconyRailingType", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="Brick">Brick</option>
                    <option value="Glass">Glass</option>
                    <option value="Aluminium + Glass">Aluminium + Glass</option>
                    <option value="SS">SS</option>
                    <option value="MS">MS</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {roomData.kitchen.basicInfo.balconyRailingType === "Other" && (
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Other Railing Type</label>
                    <input
                      type="text"
                      value={roomData.kitchen.basicInfo.balconyRailingTypeOther}
                      onChange={(e) => onChange(roomName, "kitchen.basicInfo.balconyRailingTypeOther", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Specify other railing type"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-gray-text mb-1">Railing Size</label>
                  <input
                    type="text"
                    value={roomData.kitchen.basicInfo.balconyRailingSize}
                    onChange={(e) => onChange(roomName, "kitchen.basicInfo.balconyRailingSize", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    placeholder="e.g., 3ft x 4ft"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-text mb-1">Notes</label>
                  <textarea
                    value={roomData.kitchen.basicInfo.balconyNotes}
                    onChange={(e) => onChange(roomName, "kitchen.basicInfo.balconyNotes", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    rows="2"
                    placeholder="Additional balcony notes..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2️⃣ CIVIL WORK */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              2️⃣ Civil Work
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.civilWork.demolitionFlooring}
                  onChange={(e) => onChange(roomName, "kitchen.civilWork.demolitionFlooring", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Demolition of flooring</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.civilWork.demolitionWalls}
                  onChange={(e) => onChange(roomName, "kitchen.civilWork.demolitionWalls", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Demolition of walls</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.civilWork.newPartitions}
                  onChange={(e) => onChange(roomName, "kitchen.civilWork.newPartitions", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">New partitions / wall shifting</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.civilWork.floorLeveling}
                  onChange={(e) => onChange(roomName, "kitchen.civilWork.floorLeveling", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Floor leveling / screeding</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.civilWork.newFlooringInstallation}
                  onChange={(e) => onChange(roomName, "kitchen.civilWork.newFlooringInstallation", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">New flooring installation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.civilWork.skirtingInstallation}
                  onChange={(e) => onChange(roomName, "kitchen.civilWork.skirtingInstallation", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Skirting installation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.civilWork.beamColumnCovering}
                  onChange={(e) => onChange(roomName, "kitchen.civilWork.beamColumnCovering", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Beam/column covering</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.civilWork.windowEnlargementReduction}
                  onChange={(e) => onChange(roomName, "kitchen.civilWork.windowEnlargementReduction", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Window enlargement/reduction</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.civilWork.doorShiftingEnlargement}
                  onChange={(e) => onChange(roomName, "kitchen.civilWork.doorShiftingEnlargement", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Door shifting / door enlargement / add extra door</span>
              </label>
            </div>
          </div>

          {/* 3️⃣ FALSE CEILING */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              3️⃣ False Ceiling
            </h5>
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-2">False Ceiling Required</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`${roomName}-falseCeilingRequired`}
                    value="Yes"
                    checked={roomData.kitchen.falseCeiling.required === "Yes"}
                    onChange={(e) => onChange(roomName, "kitchen.falseCeiling.required", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`${roomName}-falseCeilingRequired`}
                    value="No"
                    checked={roomData.kitchen.falseCeiling.required === "No"}
                    onChange={(e) => onChange(roomName, "kitchen.falseCeiling.required", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">No</span>
                </label>
              </div>
            </div>

            {roomData.kitchen.falseCeiling.required === "Yes" && (
              <div className="ml-6 space-y-3 border-l-2 border-accent/30 pl-4">
                <div>
                  <label className="block text-xs text-gray-text mb-2">False Ceiling Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["POP", "Wooden", "Stretch", "Grid"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`${roomName}-falseCeilingType`}
                          value={type}
                          checked={roomData.kitchen.falseCeiling.type === type}
                          onChange={(e) => onChange(roomName, "kitchen.falseCeiling.type", e.target.value)}
                          className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-text mb-2">Cove Lighting Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.kitchen.falseCeiling.coveLightingOptions.outsideCoveOnly}
                        onChange={(e) => onChange(roomName, "kitchen.falseCeiling.coveLightingOptions.outsideCoveOnly", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Outside Cove Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.kitchen.falseCeiling.coveLightingOptions.insideCoveOnly}
                        onChange={(e) => onChange(roomName, "kitchen.falseCeiling.coveLightingOptions.insideCoveOnly", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Inside Cove Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.kitchen.falseCeiling.coveLightingOptions.insideOutsideCove}
                        onChange={(e) => onChange(roomName, "kitchen.falseCeiling.coveLightingOptions.insideOutsideCove", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Inside + Outside Cove</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-text mb-2">Ceiling Design Options</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.kitchen.falseCeiling.ceilingDesignOptions.grooves}
                        onChange={(e) => onChange(roomName, "kitchen.falseCeiling.ceilingDesignOptions.grooves", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Grooves</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.kitchen.falseCeiling.ceilingDesignOptions.mouldings}
                        onChange={(e) => onChange(roomName, "kitchen.falseCeiling.ceilingDesignOptions.mouldings", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Mouldings</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.kitchen.falseCeiling.ceilingDesignOptions.beamCovering}
                        onChange={(e) => onChange(roomName, "kitchen.falseCeiling.ceilingDesignOptions.beamCovering", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">Beam Covering</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.kitchen.falseCeiling.ceilingDesignOptions.noDesign}
                        onChange={(e) => onChange(roomName, "kitchen.falseCeiling.ceilingDesignOptions.noDesign", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">No Design</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-text mb-1">Notes</label>
                  <textarea
                    value={roomData.kitchen.falseCeiling.notes}
                    onChange={(e) => onChange(roomName, "kitchen.falseCeiling.notes", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    rows="2"
                    placeholder="Additional false ceiling notes..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* 4️⃣ FLOOR COVERING */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              4️⃣ Floor Covering
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.floorCovering.glossTile}
                  onChange={(e) => onChange(roomName, "kitchen.floorCovering.glossTile", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Gloss Tile</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.floorCovering.mattTile}
                  onChange={(e) => onChange(roomName, "kitchen.floorCovering.mattTile", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Matt Tile</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.floorCovering.marble}
                  onChange={(e) => onChange(roomName, "kitchen.floorCovering.marble", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Marble</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={roomData.kitchen.floorCovering.granite}
                  onChange={(e) => onChange(roomName, "kitchen.floorCovering.granite", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm group-hover:text-accent transition">Granite</span>
              </label>
            </div>
          </div>

          {/* 5️⃣ CONSTRUCTION TYPE */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              5️⃣ Construction Type
            </h5>
            <div className="space-y-2">
              {["On-Site Carpenter", "Carcass On-Site + Factory-Made Shutters", "Full Modular Factory-Made Kitchen"].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`${roomName}-constructionType`}
                    value={type}
                    checked={roomData.kitchen.constructionType === type}
                    onChange={(e) => onChange(roomName, "kitchen.constructionType", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 6️⃣ CARCASS MATERIAL */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              6️⃣ Carcass Material
            </h5>
            <div className="space-y-2">
              {["HDHMR", "BWP Below Sink Only", "BWP Entire Kitchen", "Plywood (BWR/BWP)"].map((material) => (
                <label key={material} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`${roomName}-carcassMaterial`}
                    value={material}
                    checked={roomData.kitchen.carcassMaterial === material}
                    onChange={(e) => onChange(roomName, "kitchen.carcassMaterial", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">{material}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 7️⃣ SHUTTER FINISH */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              7️⃣ Shutter Finish
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Laminate", "Acrylic", "PU", "Veneer", "Glass"].map((finish) => (
                <label key={finish} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`${roomName}-shutterFinish`}
                    value={finish}
                    checked={roomData.kitchen.shutterFinish === finish}
                    onChange={(e) => onChange(roomName, "kitchen.shutterFinish", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">{finish}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 8️⃣ HARDWARE LEVEL */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              8️⃣ Hardware Level
            </h5>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`${roomName}-hardwareLevel`}
                  value="Basic (Local)"
                  checked={roomData.kitchen.hardwareLevel === "Basic (Local)"}
                  onChange={(e) => onChange(roomName, "kitchen.hardwareLevel", e.target.value)}
                  className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm">Basic (Local)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`${roomName}-hardwareLevel`}
                  value="Mid (Hettich India / Ozone / Inox)"
                  checked={roomData.kitchen.hardwareLevel === "Mid (Hettich India / Ozone / Inox)"}
                  onChange={(e) => onChange(roomName, "kitchen.hardwareLevel", e.target.value)}
                  className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm">Mid (Hettich India / Ozone / Inox)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`${roomName}-hardwareLevel`}
                  value="Premium (Hafele / Hettich Germany)"
                  checked={roomData.kitchen.hardwareLevel === "Premium (Hafele / Hettich Germany)"}
                  onChange={(e) => onChange(roomName, "kitchen.hardwareLevel", e.target.value)}
                  className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm">Premium (Hafele / Hettich Germany)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`${roomName}-hardwareLevel`}
                  value="Ultra Premium (Blum)"
                  checked={roomData.kitchen.hardwareLevel === "Ultra Premium (Blum)"}
                  onChange={(e) => onChange(roomName, "kitchen.hardwareLevel", e.target.value)}
                  className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                />
                <span className="text-white text-sm">Ultra Premium (Blum)</span>
              </label>
            </div>
          </div>

          {/* 9️⃣ FITTINGS */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              9️⃣ Fittings
            </h5>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer group mb-2">
                    <input
                      type="checkbox"
                      checked={roomData.kitchen.fittings.cornerUnit}
                      onChange={(e) => onChange(roomName, "kitchen.fittings.cornerUnit", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Corner Unit</span>
                  </label>
                  {roomData.kitchen.fittings.cornerUnit && (
                    <input
                      type="number"
                      value={roomData.kitchen.fittings.cornerUnitQuantity}
                      onChange={(e) => onChange(roomName, "kitchen.fittings.cornerUnitQuantity", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Quantity"
                    />
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer group mb-2">
                    <input
                      type="checkbox"
                      checked={roomData.kitchen.fittings.tandemDrawers}
                      onChange={(e) => onChange(roomName, "kitchen.fittings.tandemDrawers", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Tandem Drawers</span>
                  </label>
                  {roomData.kitchen.fittings.tandemDrawers && (
                    <input
                      type="number"
                      value={roomData.kitchen.fittings.tandemDrawersQuantity}
                      onChange={(e) => onChange(roomName, "kitchen.fittings.tandemDrawersQuantity", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Quantity"
                    />
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer group mb-2">
                    <input
                      type="checkbox"
                      checked={roomData.kitchen.fittings.bottlePullout}
                      onChange={(e) => onChange(roomName, "kitchen.fittings.bottlePullout", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Bottle Pullout</span>
                  </label>
                  {roomData.kitchen.fittings.bottlePullout && (
                    <input
                      type="number"
                      value={roomData.kitchen.fittings.bottlePulloutQuantity}
                      onChange={(e) => onChange(roomName, "kitchen.fittings.bottlePulloutQuantity", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Quantity"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.fittings.pantryUnit}
                    onChange={(e) => onChange(roomName, "kitchen.fittings.pantryUnit", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Pantry Unit</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.fittings.rollingShutter}
                    onChange={(e) => onChange(roomName, "kitchen.fittings.rollingShutter", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Rolling Shutter</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.fittings.cutleryTray}
                    onChange={(e) => onChange(roomName, "kitchen.fittings.cutleryTray", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Cutlery Tray</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.fittings.grainTrolley}
                    onChange={(e) => onChange(roomName, "kitchen.fittings.grainTrolley", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Grain Trolley</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.fittings.wickerBasket}
                    onChange={(e) => onChange(roomName, "kitchen.fittings.wickerBasket", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Wicker Basket</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.fittings.integratedDustbin}
                    onChange={(e) => onChange(roomName, "kitchen.fittings.integratedDustbin", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Integrated Dustbin</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.fittings.glassTrayPlateTray}
                    onChange={(e) => onChange(roomName, "kitchen.fittings.glassTrayPlateTray", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Glass Tray / Plate Tray</span>
                </label>
              </div>
            </div>
          </div>

          {/* 🔟 COUNTER & BACKSPLASH */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              🔟 Counter & Backsplash
            </h5>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-text mb-2">Counter Material</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Granite", "Quartz", "Marble"].map((material) => (
                    <label key={material} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`${roomName}-counterMaterial`}
                        value={material}
                        checked={roomData.kitchen.counterBacksplash.counterMaterial === material}
                        onChange={(e) => onChange(roomName, "kitchen.counterBacksplash.counterMaterial", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">{material}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Backsplash Material</label>
                <input
                  type="text"
                  value={roomData.kitchen.counterBacksplash.backsplashMaterial}
                  onChange={(e) => onChange(roomName, "kitchen.counterBacksplash.backsplashMaterial", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  placeholder="Enter backsplash material"
                />
              </div>
            </div>
          </div>

          {/* 1️⃣1️⃣ ELECTRICAL */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              1️⃣1️⃣ Electrical
            </h5>
            
            {/* Switch Type */}
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-2">Switch Type</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Anchor", "GM", "Legrand", "Schneider", "Smart"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`${roomName}-switchType`}
                      value={type}
                      checked={roomData.kitchen.electrical.switchType === type}
                      onChange={(e) => onChange(roomName, "kitchen.electrical.switchType", e.target.value)}
                      className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Lighting Categories */}
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-2">Lighting Categories</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.lightingCategories.cob}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.lightingCategories.cob", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">COB</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.lightingCategories.panelLights}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.lightingCategories.panelLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Panel Lights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.lightingCategories.profileLights}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.lightingCategories.profileLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Profile Lights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.lightingCategories.coveLights}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.lightingCategories.coveLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Cove Lights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.lightingCategories.underCabinetLED}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.lightingCategories.underCabinetLED", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Under-Cabinet LED</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.lightingCategories.ceilingLights}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.lightingCategories.ceilingLights", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Ceiling Lights</span>
                </label>
              </div>
            </div>

            {/* Heavy Appliances */}
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-2">Heavy Appliances</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.heavyAppliances.hobPoint}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.heavyAppliances.hobPoint", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Hob Point</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.heavyAppliances.chimneyDuctRoute}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.heavyAppliances.chimneyDuctRoute", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Chimney + Duct Route</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.heavyAppliances.microwave}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.heavyAppliances.microwave", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Microwave</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.heavyAppliances.oven}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.heavyAppliances.oven", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Oven</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.heavyAppliances.refrigerator}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.heavyAppliances.refrigerator", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Refrigerator</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.heavyAppliances.dishwasherElectricalPoint}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.heavyAppliances.dishwasherElectricalPoint", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Dishwasher Electrical Point</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.heavyAppliances.exhaust}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.heavyAppliances.exhaust", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Exhaust</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.electrical.heavyAppliances.aquaguardRO}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.heavyAppliances.aquaguardRO", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Aquaguard / RO</span>
                </label>
              </div>
            </div>

            {/* Wiring Brand */}
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-2">Wiring Brand</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Havells", "Polycab", "Finolex", "Local"].map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`${roomName}-wiringBrand`}
                      value={brand}
                      checked={roomData.kitchen.electrical.wiringBrand === brand}
                      onChange={(e) => onChange(roomName, "kitchen.electrical.wiringBrand", e.target.value)}
                      className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Wire Safety */}
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-2">Wire Safety</label>
              <div className="grid grid-cols-3 gap-3">
                {["FR", "FRLS", "Non-FR"].map((safety) => (
                  <label key={safety} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`${roomName}-wireSafety`}
                      value={safety}
                      checked={roomData.kitchen.electrical.wireSafety === safety}
                      onChange={(e) => onChange(roomName, "kitchen.electrical.wireSafety", e.target.value)}
                      className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm">{safety}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Electrical */}
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-2">Additional Electrical</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer group mb-2">
                    <input
                      type="checkbox"
                      checked={roomData.kitchen.electrical.otherElectrical.fans}
                      onChange={(e) => onChange(roomName, "kitchen.electrical.otherElectrical.fans", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">Fans</span>
                  </label>
                  {roomData.kitchen.electrical.otherElectrical.fans && (
                    <input
                      type="number"
                      value={roomData.kitchen.electrical.otherElectrical.fansQuantity}
                      onChange={(e) => onChange(roomName, "kitchen.electrical.otherElectrical.fansQuantity", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Quantity"
                    />
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer group mb-2">
                    <input
                      type="checkbox"
                      checked={roomData.kitchen.electrical.otherElectrical.acWiring}
                      onChange={(e) => onChange(roomName, "kitchen.electrical.otherElectrical.acWiring", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">AC Wiring</span>
                  </label>
                  {roomData.kitchen.electrical.otherElectrical.acWiring && (
                    <input
                      type="number"
                      value={roomData.kitchen.electrical.otherElectrical.acWiringQuantity}
                      onChange={(e) => onChange(roomName, "kitchen.electrical.otherElectrical.acWiringQuantity", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Quantity"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Speakers Required */}
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-2">Speakers Required</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`${roomName}-speakers`}
                    value="Yes"
                    checked={roomData.kitchen.electrical.otherElectrical.speakers === "Yes"}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.otherElectrical.speakers", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`${roomName}-speakers`}
                    value="No"
                    checked={roomData.kitchen.electrical.otherElectrical.speakers === "No"}
                    onChange={(e) => onChange(roomName, "kitchen.electrical.otherElectrical.speakers", e.target.value)}
                    className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">No</span>
                </label>
              </div>
            </div>

            {/* Air Conditioning Type */}
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-1">Air Conditioning Type</label>
              <select
                value={roomData.kitchen.electrical.acType}
                onChange={(e) => onChange(roomName, "kitchen.electrical.acType", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              >
                <option value="">Select</option>
                <option value="Split">Split</option>
                <option value="Cassette">Cassette</option>
                <option value="Ductable">Ductable</option>
              </select>
            </div>

            {/* Wiring Length */}
            <div>
              <label className="block text-xs text-gray-text mb-1">Approx. Wiring Length (meters)</label>
              <input
                type="number"
                value={roomData.kitchen.electrical.wiringLength}
                onChange={(e) => onChange(roomName, "kitchen.electrical.wiringLength", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                placeholder="Enter approximate wiring length"
              />
            </div>
          </div>

          {/* 1️⃣2️⃣ PAINT */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              1️⃣2️⃣ Paint
            </h5>
            <div>
              <label className="block text-xs text-gray-text mb-1">Ceiling Paint Options</label>
              <select
                value={roomData.kitchen.paint.ceilingPaint}
                onChange={(e) => onChange(roomName, "kitchen.paint.ceilingPaint", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              >
                <option value="">Select</option>
                <option value="Royale Shine">Royale Shine</option>
                <option value="PU">PU</option>
                <option value="Texture">Texture</option>
                <option value="Royale Matt">Royale Matt</option>
                <option value="Satin">Satin</option>
                <option value="Plastic Premium">Plastic Premium</option>
              </select>
            </div>
          </div>

          {/* 1️⃣3️⃣ PLUMBING */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              1️⃣3️⃣ Plumbing
            </h5>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.plumbing.sinkRelocation}
                    onChange={(e) => onChange(roomName, "kitchen.plumbing.sinkRelocation", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Sink Relocation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.plumbing.drainLineChange}
                    onChange={(e) => onChange(roomName, "kitchen.plumbing.drainLineChange", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Drain Line Change</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.kitchen.plumbing.dishwasherPlumbing}
                    onChange={(e) => onChange(roomName, "kitchen.plumbing.dishwasherPlumbing", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">Dishwasher Plumbing</span>
                </label>
              </div>

              <div>
                <label className="block text-xs text-gray-text mb-2">Geyser Required</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`${roomName}-geyserRequired`}
                      value="Yes"
                      checked={roomData.kitchen.plumbing.geyserRequired === "Yes"}
                      onChange={(e) => onChange(roomName, "kitchen.plumbing.geyserRequired", e.target.value)}
                      className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`${roomName}-geyserRequired`}
                      value="No"
                      checked={roomData.kitchen.plumbing.geyserRequired === "No"}
                      onChange={(e) => onChange(roomName, "kitchen.plumbing.geyserRequired", e.target.value)}
                      className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-text mb-2">RO Location</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`${roomName}-roLocation`}
                      value="Under-Sink"
                      checked={roomData.kitchen.plumbing.roLocation === "Under-Sink"}
                      onChange={(e) => onChange(roomName, "kitchen.plumbing.roLocation", e.target.value)}
                      className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm">Under-Sink</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`${roomName}-roLocation`}
                      value="Over-Head"
                      checked={roomData.kitchen.plumbing.roLocation === "Over-Head"}
                      onChange={(e) => onChange(roomName, "kitchen.plumbing.roLocation", e.target.value)}
                      className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm">Over-Head</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-text mb-2">Plumbing Material Brand</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Astral", "Supreme", "Prakash", "Ashirvad"].map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`${roomName}-plumbingMaterialBrand`}
                        value={brand}
                        checked={roomData.kitchen.plumbing.plumbingMaterialBrand === brand}
                        onChange={(e) => onChange(roomName, "kitchen.plumbing.plumbingMaterialBrand", e.target.value)}
                        className="w-4 h-4 border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 1️⃣4️⃣ NOTES */}
          <div>
            <h5 className="text-gray-text font-medium mb-3 text-xs uppercase">
              1️⃣4️⃣ Notes
            </h5>
            <textarea
              value={roomData.kitchen.notes}
              onChange={(e) => onChange(roomName, "kitchen.notes", e.target.value)}
              className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              rows="4"
              placeholder="Add any additional notes for the kitchen..."
            />
          </div>
            </>
          ) : (
            <>
          {/* A. BASIC INFORMATION */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              A. Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Length (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.length}
                  onChange={(e) => onChange(roomName, "length", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.width}
                  onChange={(e) => onChange(roomName, "width", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.ceilingHeight}
                  onChange={(e) => onChange(roomName, "ceilingHeight", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Window Count</label>
                <input
                  type="number"
                  value={roomData.windowCount}
                  onChange={(e) => onChange(roomName, "windowCount", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Sill Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.sillHeight}
                  onChange={(e) => onChange(roomName, "sillHeight", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Lintel Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomData.lintelHeight}
                  onChange={(e) => onChange(roomName, "lintelHeight", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Balcony Access</label>
                <select
                  value={roomData.balconyAccess}
                  onChange={(e) => onChange(roomName, "balconyAccess", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {roomData.balconyAccess === "Yes" && (
                <>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Balcony Door Type</label>
                    <select
                      value={roomData.balconyDoorType}
                      onChange={(e) => onChange(roomName, "balconyDoorType", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Sliding">Sliding</option>
                      <option value="Hinged Single">Hinged Single</option>
                      <option value="Hinged Double">Hinged Double</option>
                      <option value="Fixed">Fixed</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* B. CIVIL WORK */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              B. Civil Work
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.keys(roomData.civilWork).map((key) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.civilWork[key]}
                    onChange={(e) => onChange(roomName, `civilWork.${key}`, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* C. FALSE CEILING */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              C. False Ceiling
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Required</label>
                <select
                  value={roomData.falseCeiling.required}
                  onChange={(e) => onChange(roomName, "falseCeiling.required", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {roomData.falseCeiling.required === "Yes" && (
                <>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Ceiling Type</label>
                    <select
                      value={roomData.falseCeiling.type}
                      onChange={(e) => onChange(roomName, "falseCeiling.type", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="POP">POP</option>
                      <option value="Wooden">Wooden</option>
                      <option value="Stretch">Stretch</option>
                      <option value="Grid">Grid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Cove Lighting</label>
                    <select
                      value={roomData.falseCeiling.coveLighting}
                      onChange={(e) =>
                        onChange(roomName, "falseCeiling.coveLighting", e.target.value)
                      }
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Outside Only">Outside Only</option>
                      <option value="Inside Only">Inside Only</option>
                      <option value="Inside + Outside">Inside + Outside</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Ceiling Design</label>
                    <select
                      value={roomData.falseCeiling.design}
                      onChange={(e) => onChange(roomName, "falseCeiling.design", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="Grooves">Grooves</option>
                      <option value="Mouldings">Mouldings</option>
                      <option value="Beam Covering">Beam Covering</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* D. FLOOR COVERING */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              D. Floor Covering
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {Object.keys(roomData.floorCovering).map((key) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={roomData.floorCovering[key]}
                    onChange={(e) =>
                      onChange(roomName, `floorCovering.${key}`, e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm group-hover:text-accent transition">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* E. CARPENTRY */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              E. Carpentry
            </h4>
            
            {/* Wall Paneling */}
            <div className="mb-4">
              <h5 className="text-gray-text text-xs font-medium mb-2">Wall Paneling</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-1">Required</label>
                  <select
                    value={roomData.carpentry.wallPaneling.required}
                    onChange={(e) =>
                      onChange(roomName, "carpentry.wallPaneling.required", e.target.value)
                    }
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {roomData.carpentry.wallPaneling.required === "Yes" && (
                  <>
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Number of Walls</label>
                      <select
                        value={roomData.carpentry.wallPaneling.numberOfWalls}
                        onChange={(e) =>
                          onChange(
                            roomName,
                            "carpentry.wallPaneling.numberOfWalls",
                            e.target.value
                          )
                        }
                        className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Material</label>
                      <select
                        value={roomData.carpentry.wallPaneling.material}
                        onChange={(e) =>
                          onChange(roomName, "carpentry.wallPaneling.material", e.target.value)
                        }
                        className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      >
                        <option value="">Select</option>
                        <option value="POP">POP</option>
                        <option value="Laminate">Laminate</option>
                        <option value="Veneer">Veneer</option>
                        <option value="PU">PU</option>
                        <option value="MDF">MDF</option>
                        <option value="Fabric">Fabric</option>
                        <option value="Glass">Glass</option>
                        <option value="Acrylic">Acrylic</option>
                        <option value="Stone">Stone</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Furniture Units - Room specific */}
            <div className="mb-4">
              <h5 className="text-gray-text text-xs font-medium mb-2">Furniture Units</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {getFurnitureOptions(roomName).map((furniture) => (
                  <label key={furniture} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.carpentry.furniture[furniture] || false}
                      onChange={(e) =>
                        onChange(roomName, `carpentry.furniture.${furniture}`, e.target.checked)
                      }
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">
                      {furniture}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hardware & Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Hardware Level</label>
                <select
                  value={roomData.carpentry.hardwareLevel}
                  onChange={(e) =>
                    onChange(roomName, "carpentry.hardwareLevel", e.target.value)
                  }
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Basic">Basic</option>
                  <option value="Mid">Mid</option>
                  <option value="Premium">Premium</option>
                  <option value="Ultra Premium">Ultra Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Material</label>
                <select
                  value={roomData.carpentry.material}
                  onChange={(e) => onChange(roomName, "carpentry.material", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="HDHMR">HDHMR</option>
                  <option value="BWP">BWP</option>
                  <option value="Plywood">Plywood</option>
                  <option value="MDF">MDF</option>
                </select>
              </div>
            </div>
          </div>

          {/* F. ELECTRICAL */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              F. Electrical
            </h4>
            
            <div className="space-y-4">
              {/* Wiring Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-1">Wiring Brand</label>
                  <select
                    value={roomData.electrical.wiringBrand}
                    onChange={(e) => onChange(roomName, "electrical.wiringBrand", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="Havells">Havells</option>
                    <option value="Polycab">Polycab</option>
                    <option value="Finolex">Finolex</option>
                    <option value="Local">Local</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Wire Type</label>
                  <select
                    value={roomData.electrical.wireType}
                    onChange={(e) => onChange(roomName, "electrical.wireType", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="FR">FR</option>
                    <option value="FRLS">FRLS</option>
                    <option value="Non-FR">Non-FR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Switch Type</label>
                  <select
                    value={roomData.electrical.switchType}
                    onChange={(e) => onChange(roomName, "electrical.switchType", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="Anchor">Anchor</option>
                    <option value="GM">GM</option>
                    <option value="Legrand">Legrand</option>
                    <option value="Schneider">Schneider</option>
                    <option value="Smart Switch">Smart Switch</option>
                  </select>
                </div>
              </div>

              {/* Lighting Types */}
              <div>
                <h5 className="text-gray-text text-xs font-medium mb-2">Lighting Types</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.keys(roomData.electrical.lighting).map((key) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.electrical.lighting[key]}
                        onChange={(e) =>
                          onChange(roomName, `electrical.lighting.${key}`, e.target.checked)
                        }
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition uppercase">
                        {key}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Electrical */}
              <div>
                <h5 className="text-gray-text text-xs font-medium mb-2">Additional</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.electrical.fans}
                      onChange={(e) => onChange(roomName, "electrical.fans", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">
                      Fans
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.electrical.acWiring}
                      onChange={(e) => onChange(roomName, "electrical.acWiring", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">
                      AC Wiring
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={roomData.electrical.speakers}
                      onChange={(e) =>
                        onChange(roomName, "electrical.speakers", e.target.checked)
                      }
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">
                      Speakers
                    </span>
                  </label>
                </div>
              </div>

              {/* Automation */}
              <div>
                <h5 className="text-gray-text text-xs font-medium mb-2">Automation</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {Object.keys(roomData.electrical.automation).map((key) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={roomData.electrical.automation[key]}
                        onChange={(e) =>
                          onChange(roomName, `electrical.automation.${key}`, e.target.checked)
                        }
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition uppercase">
                        {key}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* G. PAINT */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              G. Paint
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Wall Paint</label>
                <select
                  value={roomData.paint.wallPaint}
                  onChange={(e) => onChange(roomName, "paint.wallPaint", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Royale Shine">Royale Shine</option>
                  <option value="PU">PU</option>
                  <option value="Texture">Texture</option>
                  <option value="Royale Matt">Royale Matt</option>
                  <option value="Satin">Satin</option>
                  <option value="Plastic Premium">Plastic Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Paint</label>
                <select
                  value={roomData.paint.ceilingPaint}
                  onChange={(e) => onChange(roomName, "paint.ceilingPaint", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="Royale Shine">Royale Shine</option>
                  <option value="PU">PU</option>
                  <option value="Texture">Texture</option>
                  <option value="Royale Matt">Royale Matt</option>
                  <option value="Satin">Satin</option>
                  <option value="Plastic Premium">Plastic Premium</option>
                </select>
              </div>
            </div>
          </div>
            </>
          )}

          {/* WASHROOM-SPECIFIC SECTIONS */}
          {isWashroom && roomData.washroom && (
            <WashroomSection
              roomName={roomName}
              washroomData={roomData.washroom}
              onChange={onChange}
            />
          )}

          {/* BALCONY-SPECIFIC SECTIONS */}
          {isBalcony && roomData.balcony && (
            <BalconySection
              roomName={roomName}
              balconyData={roomData.balcony}
              onChange={onChange}
            />
          )}
        </div>
      )}
    </div>
  );
}

// Washroom-specific component
function WashroomSection({ roomName, washroomData, onChange }) {
  return (
    <div className="space-y-4 border-t border-gray-border pt-4">
      <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
        Washroom-Specific Details
      </h4>

      {/* Wall Covering */}
      <div>
        <h5 className="text-gray-text text-xs font-medium mb-2">Wall Covering</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.keys(washroomData.wallCovering).map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={washroomData.wallCovering[key]}
                onChange={(e) =>
                  onChange(roomName, `washroom.wallCovering.${key}`, e.target.checked)
                }
                className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
              />
              <span className="text-white text-sm group-hover:text-accent transition">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Floor */}
      <div>
        <h5 className="text-gray-text text-xs font-medium mb-2">Floor</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.keys(washroomData.floor).map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={washroomData.floor[key]}
                onChange={(e) => onChange(roomName, `washroom.floor.${key}`, e.target.checked)}
                className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
              />
              <span className="text-white text-sm group-hover:text-accent transition">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Basin & Shower Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-text mb-1">Basin Type</label>
          <select
            value={washroomData.basinType}
            onChange={(e) => onChange(roomName, "washroom.basinType", e.target.value)}
            className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
          >
            <option value="">Select</option>
            <option value="Over Counter">Over Counter</option>
            <option value="Under Counter">Under Counter</option>
            <option value="Table-Top">Table-Top</option>
            <option value="Integrated">Integrated</option>
            <option value="Wall Mounted">Wall Mounted</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-text mb-1">Shower Type</label>
          <select
            value={washroomData.showerType}
            onChange={(e) => onChange(roomName, "washroom.showerType", e.target.value)}
            className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
          >
            <option value="">Select</option>
            <option value="Wall Mounted">Wall Mounted</option>
            <option value="Ceiling Mounted">Ceiling Mounted</option>
            <option value="Shower Panel">Shower Panel</option>
            <option value="Body Jets">Body Jets</option>
          </select>
        </div>
      </div>

      {/* Brands */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-text mb-1">Fitting Brand</label>
          <select
            value={washroomData.fittingBrand}
            onChange={(e) => onChange(roomName, "washroom.fittingBrand", e.target.value)}
            className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
          >
            <option value="">Select</option>
            <option value="Cera">Cera</option>
            <option value="Hindware">Hindware</option>
            <option value="Jaquar">Jaquar</option>
            <option value="Kohler">Kohler</option>
            <option value="Grohe">Grohe</option>
            <option value="Hansgrohe">Hansgrohe</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-text mb-1">Plumbing Material</label>
          <select
            value={washroomData.plumbingMaterial}
            onChange={(e) => onChange(roomName, "washroom.plumbingMaterial", e.target.value)}
            className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
          >
            <option value="">Select</option>
            <option value="Astral">Astral</option>
            <option value="Supreme">Supreme</option>
            <option value="Prakash">Prakash</option>
            <option value="Ashirvad">Ashirvad</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Balcony-specific component
function BalconySection({ roomName, balconyData, onChange }) {
  return (
    <div className="space-y-4 border-t border-gray-border pt-4">
      <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
        Balcony-Specific Details
      </h4>

      {/* Civil Work */}
      <div>
        <h5 className="text-gray-text text-xs font-medium mb-2">Civil Work</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.keys(balconyData.civil).map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={balconyData.civil[key]}
                onChange={(e) => onChange(roomName, `balcony.civil.${key}`, e.target.checked)}
                className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
              />
              <span className="text-white text-sm group-hover:text-accent transition">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Floor */}
      <div>
        <h5 className="text-gray-text text-xs font-medium mb-2">Floor</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.keys(balconyData.floor).map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={balconyData.floor[key]}
                onChange={(e) => onChange(roomName, `balcony.floor.${key}`, e.target.checked)}
                className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
              />
              <span className="text-white text-sm group-hover:text-accent transition">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Wall */}
      <div>
        <h5 className="text-gray-text text-xs font-medium mb-2">Wall</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.keys(balconyData.wall).map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={balconyData.wall[key]}
                onChange={(e) => onChange(roomName, `balcony.wall.${key}`, e.target.checked)}
                className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
              />
              <span className="text-white text-sm group-hover:text-accent transition">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Carpentry */}
      <div>
        <h5 className="text-gray-text text-xs font-medium mb-2">Carpentry</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.keys(balconyData.carpentry).map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={balconyData.carpentry[key]}
                onChange={(e) => onChange(roomName, `balcony.carpentry.${key}`, e.target.checked)}
                className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
              />
              <span className="text-white text-sm group-hover:text-accent transition">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Electrical */}
      <div>
        <h5 className="text-gray-text text-xs font-medium mb-2">Electrical</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.keys(balconyData.electrical).map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={balconyData.electrical[key]}
                onChange={(e) =>
                  onChange(roomName, `balcony.electrical.${key}`, e.target.checked)
                }
                className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
              />
              <span className="text-white text-sm group-hover:text-accent transition">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Safety */}
      <div>
        <h5 className="text-gray-text text-xs font-medium mb-2">Safety</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.keys(balconyData.safety).map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={balconyData.safety[key]}
                onChange={(e) => onChange(roomName, `balcony.safety.${key}`, e.target.checked)}
                className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
              />
              <span className="text-white text-sm group-hover:text-accent transition">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to get room-specific furniture options
function getFurnitureOptions(roomName) {
  const furnitureMap = {
    "Living Room": ["TV Unit", "Console", "Side Table", "Display Unit", "Shoe Rack"],
    "Dining Area": ["Crockery Unit", "Bar Unit", "Buffet Unit", "Console"],
    Kitchen: ["Base Units", "Wall Units", "Tall Units", "Loft", "Breakfast Counter"],
    "Bedroom 1": [
      "Wardrobe",
      "Bed (Single Box)",
      "Bed (Double Box)",
      "Study Table",
      "Dressing Table",
      "Side Tables",
      "TV Unit",
    ],
    "Bedroom 2": [
      "Wardrobe",
      "Bed (Single Box)",
      "Bed (Double Box)",
      "Study Table",
      "Dressing Table",
      "Side Tables",
      "TV Unit",
    ],
    "Bedroom 3": [
      "Wardrobe",
      "Bed (Single Box)",
      "Bed (Double Box)",
      "Study Table",
      "Dressing Table",
      "Side Tables",
      "TV Unit",
    ],
    "Bedroom 4": [
      "Wardrobe",
      "Bed (Single Box)",
      "Bed (Double Box)",
      "Study Table",
      "Dressing Table",
      "Side Tables",
      "TV Unit",
    ],
    "Bedroom 5": [
      "Wardrobe",
      "Bed (Single Box)",
      "Bed (Double Box)",
      "Study Table",
      "Dressing Table",
      "Side Tables",
      "TV Unit",
    ],
    "Store Room": ["Storage Units", "Shelving", "Overhead Storage"],
    "Domestic Help Room": ["Wardrobe", "Bed", "Storage Unit"],
    Foyer: ["Shoe Rack", "Console", "Mirror Frame", "Storage Bench"],
    "Main Entrance": ["Shoe Rack", "Key Holder", "Console"],
  };

  return furnitureMap[roomName] || ["Storage Unit", "Seating", "Display Unit"];
}
