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
    bedroomWashrooms: true,
  });

  // State for which rooms are expanded
  const [expandedRooms, setExpandedRooms] = useState({});

  // State for removed/hidden rooms
  const [removedRooms, setRemovedRooms] = useState([]);

  // State for dynamic Bedroom + Washroom instances
  const [bedroomWashroomInstances, setBedroomWashroomInstances] = useState([]);
  const [expandedBedroomWashrooms, setExpandedBedroomWashrooms] = useState({});

  // State for dynamic Balcony instances
  const [balconyInstances, setBalconyInstances] = useState([]);
  const [expandedBalconies, setExpandedBalconies] = useState({});

  // State for multiple Room-Wise Details sections
  const [roomWiseInstances, setRoomWiseInstances] = useState([{ id: 1, name: "Room Set 1" }]);
  const [expandedRoomWiseSections, setExpandedRoomWiseSections] = useState({ 1: true });
  const [roomWiseRooms, setRoomWiseRooms] = useState({ 1: {} });
  const [roomWiseExpandedRooms, setRoomWiseExpandedRooms] = useState({ 1: {} });
  const [roomWiseRemovedRooms, setRoomWiseRemovedRooms] = useState({ 1: [] });

  // Available rooms
  const roomsList = [
    "Main Entrance",
    "Foyer",
    "Living Room",
    "Dining Area",
    "Kitchen",
    "Domestic Help Room",
    "Store Room",
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
    const isDomesticHelpRoom = roomName === "Domestic Help Room";
    const isStoreRoom = roomName === "Store Room";

    // Store Room has its own structure without base fields
    if (isStoreRoom) {
      return {
        storeRoom: {
          basicInfo: {
            length: "",
            width: "",
            ceilingHeight: "",
          },
          wardrobe: {
            suggestedWidth: "",
            suggestedHeight: "",
            material: "",
            carcass: "",
            hardwareLevel: "",
            lofts: "",
            shelfConfiguration: "",
            storageZoning: {
              luggage: false,
              grocery: false,
              cleaningSupplies: false,
              seasonalStorage: false,
            },
          },
          lighting: {
            ceilingLightType: "",
            stripLightingInsideShelves: false,
            sensorLights: false,
            emergencyBackupLight: false,
          },
          ventilation: {
            exhaustFan: false,
            louverVents: false,
            dehumidifierProvision: false,
            windowOption: false,
          },
          paint: {
            wallFinish: "",
            moistureResistantPaint: false,
            ceilingFinish: "",
          },
          electrical: {
            wiringBrand: "",
            wireType: "",
            switches: "",
            lightPoints: "",
            extraPlugPoints: {
              vacuum: false,
              iron: false,
              inverter: false,
              other: false,
            },
          },
          optionalEnhancements: {
            heavyDutyRackingSystem: false,
            metalStorageRacks: false,
            lockableCabinet: false,
            cctvCameraPoint: false,
            automationSensorLight: false,
          },
          budgetRange: "",
          notes: "",
        },
      };
    }

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

    // Add Domestic Help Room-specific fields
    if (isDomesticHelpRoom) {
      baseRoom.domesticHelpRoom = {
        basicInfo: {
          length: "",
          width: "",
          height: "",
        },
        wardrobe: {
          width: "",
          height: "",
          material: "",
          finish: "",
          hardwareLevel: "",
          lofts: "",
          shelves: "",
        },
        bedNiche: {
          required: "",
        },
        electrical: {
          wiringBrand: "",
          wireType: "",
          switches: "",
          fan: "",
          lights: "",
          ventilation: "",
        },
        paint: {
          wallPaint: "",
          ceilingPaint: "",
        },
        helpBathroom: {
          wallCovering: {
            tile: false,
            marble: false,
            granite: false,
          },
          floorCovering: {
            antiSkidTile: false,
            marble: false,
            granite: false,
          },
          wc: "",
          basin: "",
          fittings: "",
          fittingsOther: "",
          plumbingLineMaterial: "",
          exhaust: "",
          switches: "",
          geyser: "",
          paint: "",
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

  // Remove/hide a room
  const removeRoom = (roomName) => {
    if (window.confirm(`Are you sure you want to remove ${roomName}? You can add it back later.`)) {
      setRemovedRooms((prev) => [...prev, roomName]);
      setExpandedRooms((prev) => {
        const newExpanded = { ...prev };
        delete newExpanded[roomName];
        return newExpanded;
      });
    }
  };

  // Restore a removed room
  const restoreRoom = (roomName) => {
    setRemovedRooms((prev) => prev.filter(room => room !== roomName));
  };

  // Add new Room-Wise Details section
  const addRoomWiseSection = () => {
    const newId = roomWiseInstances.length > 0 
      ? Math.max(...roomWiseInstances.map(i => i.id)) + 1 
      : roomWiseInstances.length + 1;
    const newInstance = { id: newId, name: `Room Set ${newId}` };
    setRoomWiseInstances([...roomWiseInstances, newInstance]);
    setExpandedRoomWiseSections({ ...expandedRoomWiseSections, [newId]: true });
    setRoomWiseRooms({ ...roomWiseRooms, [newId]: {} });
    setRoomWiseExpandedRooms({ ...roomWiseExpandedRooms, [newId]: {} });
    setRoomWiseRemovedRooms({ ...roomWiseRemovedRooms, [newId]: [] });
  };

  // Remove Room-Wise Details section
  const removeRoomWiseSection = (id) => {
    if (window.confirm("Are you sure you want to remove this entire room-wise details section?")) {
      setRoomWiseInstances(roomWiseInstances.filter(instance => instance.id !== id));
      const newExpanded = { ...expandedRoomWiseSections };
      delete newExpanded[id];
      setExpandedRoomWiseSections(newExpanded);
      const newRooms = { ...roomWiseRooms };
      delete newRooms[id];
      setRoomWiseRooms(newRooms);
      const newExpandedRooms = { ...roomWiseExpandedRooms };
      delete newExpandedRooms[id];
      setRoomWiseExpandedRooms(newExpandedRooms);
      const newRemovedRooms = { ...roomWiseRemovedRooms };
      delete newRemovedRooms[id];
      setRoomWiseRemovedRooms(newRemovedRooms);
    }
  };

  // Toggle Room-Wise Details section expansion
  const toggleRoomWiseSection = (id) => {
    setExpandedRoomWiseSections({
      ...expandedRoomWiseSections,
      [id]: !expandedRoomWiseSections[id],
    });
  };

  // Toggle room in a specific section
  const toggleRoomInSection = (sectionId, roomName) => {
    setRoomWiseExpandedRooms((prev) => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [roomName]: !(prev[sectionId] || {})[roomName],
      },
    }));

    // Initialize room data if not exists
    if (!(roomWiseRooms[sectionId] || {})[roomName]) {
      setRoomWiseRooms((prev) => ({
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [roomName]: initializeRoom(roomName),
        },
      }));
    }
  };

  // Handle room change in a specific section
  const handleRoomChangeInSection = (sectionId, roomName, field, value) => {
    setRoomWiseRooms((prev) => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [roomName]: {
          ...(prev[sectionId] || {})[roomName],
          [field]: value,
        },
      },
    }));
  };

  // Remove room in a specific section
  const removeRoomInSection = (sectionId, roomName) => {
    if (window.confirm(`Are you sure you want to remove ${roomName} from this section?`)) {
      setRoomWiseRemovedRooms((prev) => ({
        ...prev,
        [sectionId]: [...(prev[sectionId] || []), roomName],
      }));
      setRoomWiseExpandedRooms((prev) => {
        const newExpanded = { ...prev };
        if (newExpanded[sectionId]) {
          delete newExpanded[sectionId][roomName];
        }
        return newExpanded;
      });
    }
  };

  // Restore room in a specific section
  const restoreRoomInSection = (sectionId, roomName) => {
    setRoomWiseRemovedRooms((prev) => ({
      ...prev,
      [sectionId]: (prev[sectionId] || []).filter(room => room !== roomName),
    }));
  };

  // Initialize a new Bedroom + Washroom instance
  const initializeBedroomWashroom = (id) => ({
    id,
    name: `Bedroom + Washroom ${id}`,
    bedroom: {
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
        coveLighting: "",
        design: "",
      },
      floorCovering: {
        glossTile: false,
        mattTile: false,
        marble: false,
        granite: false,
      },
      wallPaneling: {
        required: "",
        numberOfWalls: "",
        material: "",
      },
      wardrobe: {
        type: "",
        height: "",
        width: "",
        depth: "",
        loftHeight: "",
        internalLayout: {
          hangingRod: false,
          hangingPullout: false,
          shelves: false,
          drawers: false,
          shoeRack: false,
          trouserPullout: false,
          tieRack: false,
          jewelleryTray: false,
          mirrorInside: false,
          sensorLight: false,
        },
        shutterFinish: "",
        hardwareLevel: "",
      },
      otherCarpentry: {
        bed: "",
        headboard: false,
        footboard: false,
        sideTables: false,
        studyTable: false,
        dressingTable: false,
        tvPanel: false,
        bookshelf: false,
        looseFurniture: {
          chair: false,
          ottoman: false,
          sofa: false,
          bench: false,
        },
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
          chandelier: false,
          wallLights: false,
          wallLightsQty: "",
        },
        fansQty: "",
        acWiringQty: "",
        automation: {
          required: "",
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
    },
    washroom: {
      basicInfo: {
        length: "",
        width: "",
        ceilingHeight: "",
        windowCount: "",
        sillHeight: "",
        lintelHeight: "",
      },
      civil: {
        waterproofing: false,
        replaceFittingsOnly: false,
        fullDemolition: false,
        drainPipeChange: false,
        supplyPipeChange: false,
      },
      wallCoverings: {
        tile: false,
        marble: false,
        granite: false,
        featureTile: false,
        groutColor: "",
      },
      floorCoverings: {
        antiSkidTile: false,
        marble: false,
        granite: false,
        groutColor: "",
      },
      basinType: "",
      showerType: "",
      fittingBrand: "",
      fittingBrandOther: "",
      plumbingMaterial: "",
      electrical: {
        mirrorLight: false,
        ceilingLight: false,
        exhaustFan: false,
        geyser: false,
        wiringBrand: "",
        wireType: "",
        switchType: "",
      },
      paint: {
        ceilingPaint: "",
      },
    },
  });

  // Add new Bedroom + Washroom instance
  const addBedroomWashroomInstance = () => {
    const newId = bedroomWashroomInstances.length > 0 
      ? Math.max(...bedroomWashroomInstances.map(i => i.id)) + 1 
      : 1;
    const newInstance = initializeBedroomWashroom(newId);
    setBedroomWashroomInstances([...bedroomWashroomInstances, newInstance]);
    setExpandedBedroomWashrooms({ ...expandedBedroomWashrooms, [newId]: true });
  };

  // Remove Bedroom + Washroom instance
  const removeBedroomWashroomInstance = (id) => {
    if (window.confirm("Are you sure you want to remove this Bedroom + Washroom?")) {
      setBedroomWashroomInstances(bedroomWashroomInstances.filter(instance => instance.id !== id));
      const newExpanded = { ...expandedBedroomWashrooms };
      delete newExpanded[id];
      setExpandedBedroomWashrooms(newExpanded);
    }
  };

  // Toggle Bedroom + Washroom expansion
  const toggleBedroomWashroom = (id) => {
    setExpandedBedroomWashrooms({
      ...expandedBedroomWashrooms,
      [id]: !expandedBedroomWashrooms[id],
    });
  };

  // Handle Bedroom + Washroom data change
  const handleBedroomWashroomChange = (id, path, value) => {
    setBedroomWashroomInstances(instances =>
      instances.map(instance => {
        if (instance.id !== id) return instance;
        
        const pathArray = path.split(".");
        const newInstance = JSON.parse(JSON.stringify(instance));
        let target = newInstance;
        
        for (let i = 0; i < pathArray.length - 1; i++) {
          target = target[pathArray[i]];
        }
        target[pathArray[pathArray.length - 1]] = value;
        
        return newInstance;
      })
    );
  };

  // Initialize a new Balcony instance
  const initializeBalcony = (id) => ({
    id,
    name: `Balcony ${id}`,
    basic: {
      length: "",
      width: "",
      ceilingHeight: "",
      doorType: "",
      doorWindowSize: "",
      railingType: "",
      railingTypeOther: "",
      railingHeight: "",
    },
    civil: {
      waterproofingRequired: false,
      slopeCorrection: false,
      pccLeveling: false,
      tileRemoval: false,
      wallPlasterRepair: false,
      ceilingRepairWaterproofing: false,
      drainCleaningNewDrain: false,
    },
    floorCoverings: {
      antiSkidTile: false,
      stone: false,
      granite: false,
      woodenTile: false,
      concreteTexture: false,
      tileStoneSize: "",
      groutColor: "",
    },
    wallCoverings: {
      exteriorPaint: false,
      texturePaint: false,
      stoneCladding: false,
      tileCladding: false,
      brickCladding: false,
      featureWall: "",
      featureWallMaterial: "",
    },
    ceiling: {
      exteriorPaint: false,
      cementSheetCeiling: false,
      woodenSlats: false,
      metalUpvcCeiling: false,
      waterproofCoatRequired: false,
      lighting: "",
      fanPoint: "",
    },
    carpentryBuiltIn: {
      seatingBench: "",
      seatingBenchMaterial: "",
      storageUnit: "",
      storageUnitMaterial: "",
      outdoorCabinet: false,
      planterBox: false,
      privacyScreen: false,
      privacyScreenMaterial: "",
      privacyScreenMaterialOther: "",
    },
    looseFurniture: {
      outdoorChairs: false,
      outdoorChairsQty: "",
      outdoorTable: false,
      outdoorTableQty: "",
      outdoorSofa: false,
      swingJhoola: false,
      swingType: "",
      weatherproofCushions: false,
    },
    electrical: {
      wallLamps: false,
      outdoorSpotlights: false,
      outdoorStripLights: false,
      profileLights: false,
      fanPoint: false,
      heaterPoint: false,
      speakers: false,
      cctvCameraPoint: false,
    },
    waterPlumbing: {
      waterTapRequired: "",
      waterTapType: "",
      drainPosition: "",
      reRoutingRequired: "",
    },
    greeneryPlanters: {
      potsRequired: false,
      dripIrrigation: false,
      artificialTurf: false,
      verticalGarden: false,
      material: "",
    },
    safety: {
      childSafetyGrill: false,
      birdNet: false,
      antiSlipCoating: false,
      checkRailingHeightCompliance: false,
    },
    notes: "",
  });

  // Add new Balcony instance
  const addBalconyInstance = () => {
    const newId = balconyInstances.length > 0 
      ? Math.max(...balconyInstances.map(i => i.id)) + 1 
      : 1;
    const newInstance = initializeBalcony(newId);
    setBalconyInstances([...balconyInstances, newInstance]);
    setExpandedBalconies({ ...expandedBalconies, [newId]: true });
  };

  // Remove Balcony instance
  const removeBalconyInstance = (id) => {
    if (window.confirm("Are you sure you want to remove this Balcony?")) {
      setBalconyInstances(balconyInstances.filter(instance => instance.id !== id));
      const newExpanded = { ...expandedBalconies };
      delete newExpanded[id];
      setExpandedBalconies(newExpanded);
    }
  };

  // Toggle Balcony expansion
  const toggleBalcony = (id) => {
    setExpandedBalconies({
      ...expandedBalconies,
      [id]: !expandedBalconies[id],
    });
  };

  // Handle Balcony data change
  const handleBalconyChange = (id, path, value) => {
    setBalconyInstances(instances =>
      instances.map(instance => {
        if (instance.id !== id) return instance;
        
        const pathArray = path.split(".");
        const newInstance = JSON.parse(JSON.stringify(instance));
        let target = newInstance;
        
        for (let i = 0; i < pathArray.length - 1; i++) {
          target = target[pathArray[i]];
        }
        target[pathArray[pathArray.length - 1]] = value;
        
        return newInstance;
      })
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const completeFormData = {
      ...formData,
      roomWiseInstances: roomWiseInstances.map(instance => ({
        ...instance,
        rooms: roomWiseRooms[instance.id] || {},
        removedRooms: roomWiseRemovedRooms[instance.id] || [],
      })),
      bedroomWashroomInstances,
      balconyInstances,
    };
    console.log("Form Data:", completeFormData);
    alert("Form submitted! Check console for data.");
    // Here you would typically send the data to your API
  };

  // Handle save as draft
  const handleSaveDraft = () => {
    const completeFormData = {
      formData,
      bedroomWashroomInstances,
      balconyInstances,
    };
    localStorage.setItem("interiorDesignForm", JSON.stringify(completeFormData));
    alert("Form saved as draft!");
  };

  // Load draft
  const handleLoadDraft = () => {
    const draft = localStorage.getItem("interiorDesignForm");
    if (draft) {
      const parsedDraft = JSON.parse(draft);
      setFormData(parsedDraft.formData || parsedDraft);
      if (parsedDraft.bedroomWashroomInstances) {
        setBedroomWashroomInstances(parsedDraft.bedroomWashroomInstances);
      }
      if (parsedDraft.balconyInstances) {
        setBalconyInstances(parsedDraft.balconyInstances);
      }
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
                      <option value="Farmhouse">Indivisual</option>
                      <option value="Farmhouse">Commercial</option>
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
              <div className="p-6 border-t border-gray-border space-y-6">
                {/* Add Room-Wise Details Section Button */}
                <div className="flex items-center justify-between bg-dark border border-accent rounded-lg p-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">📋 Room-Wise Details Sections</h3>
                    <p className="text-gray-text text-sm mt-1">
                      Add multiple room-wise detail sections if you have different areas or floors to specify.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addRoomWiseSection}
                    className="bg-accent hover:bg-yellow-500 text-dark px-4 py-2 rounded font-medium transition flex items-center gap-2 whitespace-nowrap"
                  >
                    <span className="text-lg">➕</span> Add Section
                  </button>
                </div>

                {/* Render all Room-Wise Details instances */}
                {roomWiseInstances.map((instance, index) => (
                  <div key={instance.id} className="bg-dark border-2 border-accent/30 rounded-lg overflow-hidden">
                    {/* Section Header */}
                    <div className="bg-dark-light px-6 py-4 flex items-center justify-between border-b border-accent/30">
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={instance.name}
                          onChange={(e) => {
                            setRoomWiseInstances(roomWiseInstances.map(inst => 
                              inst.id === instance.id ? { ...inst, name: e.target.value } : inst
                            ));
                          }}
                          className="bg-dark border border-gray-border rounded px-3 py-1.5 text-white font-semibold focus:outline-none focus:border-accent transition"
                        />
                        <button
                          type="button"
                          onClick={() => toggleRoomWiseSection(instance.id)}
                          className="text-accent hover:text-yellow-500 transition"
                        >
                          {expandedRoomWiseSections[instance.id] ? "▲ Collapse" : "▼ Expand"}
                        </button>
                      </div>
                      {roomWiseInstances.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRoomWiseSection(instance.id)}
                          className="text-red-500 hover:text-red-400 text-sm font-medium transition"
                        >
                          Remove Section
                        </button>
                      )}
                    </div>

                    {/* Section Content */}
                    {expandedRoomWiseSections[instance.id] && (
                      <div className="p-6 space-y-4">
                        {/* Show removed rooms for restore option */}
                        {(roomWiseRemovedRooms[instance.id] || []).length > 0 && (
                          <div className="mb-4 p-4 bg-dark-light border border-gray-border rounded-lg">
                            <h4 className="text-white font-semibold mb-2 text-sm">Removed Rooms (Click to restore)</h4>
                            <div className="flex flex-wrap gap-2">
                              {(roomWiseRemovedRooms[instance.id] || []).map((roomName) => (
                                <button
                                  key={roomName}
                                  type="button"
                                  onClick={() => restoreRoomInSection(instance.id, roomName)}
                                  className="px-3 py-1 bg-dark border border-accent text-accent rounded text-sm hover:bg-accent hover:text-dark transition"
                                >
                                  ➕ {roomName}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Rooms before Kitchen */}
                        {roomsList.slice(0, roomsList.indexOf("Kitchen") + 1)
                          .filter(roomName => !(roomWiseRemovedRooms[instance.id] || []).includes(roomName))
                          .map((roomName) => (
                          <RoomSection
                            key={`${instance.id}-${roomName}`}
                            roomName={roomName}
                            roomData={(roomWiseRooms[instance.id] || {})[roomName] || initializeRoom(roomName)}
                            isExpanded={(roomWiseExpandedRooms[instance.id] || {})[roomName]}
                            onToggle={() => toggleRoomInSection(instance.id, roomName)}
                            onChange={(roomName, field, value) => handleRoomChangeInSection(instance.id, roomName, field, value)}
                            onRemove={() => removeRoomInSection(instance.id, roomName)}
                          />
                        ))}

                        {/* Bedroom + Washroom Dynamic Section */}
                        <div className="mt-6 pt-6 border-t-2 border-accent">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-accent font-bold text-lg">🛏 Bedroom + Attached Washroom</h3>
                              <p className="text-gray-text text-sm mt-1">
                                Add multiple bedroom + washroom combinations dynamically. Each instance is independent.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={addBedroomWashroomInstance}
                              className="bg-accent hover:bg-yellow-500 text-dark px-4 py-2 rounded font-medium transition flex items-center gap-2 whitespace-nowrap"
                            >
                              <span className="text-lg">➕</span> Add Bedroom + Washroom
                            </button>
                          </div>

                          {bedroomWashroomInstances.length === 0 ? (
                            <div className="text-center py-8 bg-dark border border-gray-border rounded-lg text-gray-text">
                              No bedroom + washroom added yet. Click "Add Bedroom + Washroom" to create one.
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {bedroomWashroomInstances.map((instance) => (
                                <BedroomWithWashroomSection
                                  key={instance.id}
                                  instance={instance}
                                  isExpanded={expandedBedroomWashrooms[instance.id]}
                                  onToggle={() => toggleBedroomWashroom(instance.id)}
                                  onChange={handleBedroomWashroomChange}
                                  onRemove={() => removeBedroomWashroomInstance(instance.id)}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Rooms after Kitchen */}
                        {roomsList.slice(roomsList.indexOf("Kitchen") + 1)
                          .filter(roomName => !(roomWiseRemovedRooms[instance.id] || []).includes(roomName))
                          .map((roomName) => (
                          <RoomSection
                            key={`${instance.id}-${roomName}`}
                            roomName={roomName}
                            roomData={(roomWiseRooms[instance.id] || {})[roomName] || initializeRoom(roomName)}
                            isExpanded={(roomWiseExpandedRooms[instance.id] || {})[roomName]}
                            onToggle={() => toggleRoomInSection(instance.id, roomName)}
                            onChange={(roomName, field, value) => handleRoomChangeInSection(instance.id, roomName, field, value)}
                            onRemove={() => removeRoomInSection(instance.id, roomName)}
                          />
                        ))}

                        {/* Balconies Dynamic Section */}
                        <div className="mt-6 pt-6 border-t-2 border-accent">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-accent font-bold text-lg">🏡 Balconies</h3>
                              <p className="text-gray-text text-sm mt-1">
                                Add multiple balconies dynamically. Each balcony is independent with full customization.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={addBalconyInstance}
                              className="bg-accent hover:bg-yellow-500 text-dark px-4 py-2 rounded font-medium transition flex items-center gap-2 whitespace-nowrap"
                            >
                              <span className="text-lg">➕</span> Add Balcony
                            </button>
                          </div>

                          {balconyInstances.length === 0 ? (
                            <div className="text-center py-8 bg-dark border border-gray-border rounded-lg text-gray-text">
                              No balcony added yet. Click "Add Balcony" to create one.
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {balconyInstances.map((instance) => (
                                <BalconySection
                                  key={instance.id}
                                  instance={instance}
                                  isExpanded={expandedBalconies[instance.id]}
                                  onToggle={() => toggleBalcony(instance.id)}
                                  onChange={handleBalconyChange}
                                  onRemove={() => removeBalconyInstance(instance.id)}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
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
function RoomSection({ roomName, roomData, isExpanded, onToggle, onChange, onRemove }) {
  const isKitchen = roomName === "Kitchen";
  const isWashroom = roomName.includes("Washroom");
  const isBalcony = roomName.includes("Balcony");
  const isMainEntrance = roomName === "Main Entrance";
  const isFoyer = roomName === "Foyer";
  const isLivingRoom = roomName === "Living Room" || roomName === "Drawing Room";
  const isDiningArea = roomName === "Dining Area" || roomName === "Dining Room";
  const isDomesticHelpRoom = roomName === "Domestic Help Room";
  const isStoreRoom = roomName === "Store Room";

  return (
    <div className="bg-dark border border-gray-border rounded-lg overflow-hidden">
      <div className="w-full px-5 py-3 flex items-center justify-between hover:bg-dark-light transition">
        <button
          type="button"
          onClick={onToggle}
          className="flex-1 flex items-center justify-between"
        >
          <span className="text-white font-semibold">{roomName}</span>
          <span className="text-accent">{isExpanded ? "▲" : "▼"}</span>
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="ml-3 px-3 py-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition text-sm font-medium"
          title="Remove this room section"
        >
          ✕ Remove
        </button>
      </div>

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
          ) : !isDomesticHelpRoom && !isStoreRoom ? (
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
          ) : null}

          {/* DOMESTIC HELP ROOM SECTIONS */}
          {isDomesticHelpRoom && roomData.domesticHelpRoom && (
            <>
              {/* 🏠 1️⃣ BASIC INFO */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  🏠 1️⃣ BASIC INFO
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Length (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.domesticHelpRoom.basicInfo.length}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.basicInfo.length", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.domesticHelpRoom.basicInfo.width}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.basicInfo.width", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Height (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.domesticHelpRoom.basicInfo.height}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.basicInfo.height", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                </div>
              </div>

              {/* 🪵 2️⃣ WARDROBE */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  🪵 2️⃣ WARDROBE
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wardrobe Width (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.domesticHelpRoom.wardrobe.width}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.width", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wardrobe Height (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.domesticHelpRoom.wardrobe.height}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.height", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Material</label>
                    <select
                      value={roomData.domesticHelpRoom.wardrobe.material}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.material", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="laminate">Laminate</option>
                      <option value="veneer">Veneer</option>
                      <option value="pu">PU</option>
                      <option value="acrylic">Acrylic</option>
                      <option value="hdhmr">HDHMR</option>
                      <option value="ply">Ply</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Finish</label>
                    <select
                      value={roomData.domesticHelpRoom.wardrobe.finish}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.finish", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="laminateFinish">Laminate Finish</option>
                      <option value="veneerFinish">Veneer Finish</option>
                      <option value="puFinish">PU Finish</option>
                      <option value="acrylicFinish">Acrylic Finish</option>
                    </select>
                  </div>
                </div>

                {/* Hardware Level */}
                <div className="mt-4">
                  <label className="block text-xs text-gray-text mb-2">Hardware Level</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`hardwareLevel-${roomName}`}
                        value="basic"
                        checked={roomData.domesticHelpRoom.wardrobe.hardwareLevel === "basic"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.hardwareLevel", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Basic</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`hardwareLevel-${roomName}`}
                        value="mid"
                        checked={roomData.domesticHelpRoom.wardrobe.hardwareLevel === "mid"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.hardwareLevel", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Mid</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`hardwareLevel-${roomName}`}
                        value="premium"
                        checked={roomData.domesticHelpRoom.wardrobe.hardwareLevel === "premium"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.hardwareLevel", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Premium</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`hardwareLevel-${roomName}`}
                        value="ultraPremium"
                        checked={roomData.domesticHelpRoom.wardrobe.hardwareLevel === "ultraPremium"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.hardwareLevel", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Ultra Premium</span>
                    </label>
                  </div>
                </div>

                {/* Lofts and Shelves */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="block text-xs text-gray-text mb-2">Lofts</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`lofts-${roomName}`}
                          value="yes"
                          checked={roomData.domesticHelpRoom.wardrobe.lofts === "yes"}
                          onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.lofts", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`lofts-${roomName}`}
                          value="no"
                          checked={roomData.domesticHelpRoom.wardrobe.lofts === "no"}
                          onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.lofts", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Shelves (Quantity)</label>
                    <input
                      type="number"
                      value={roomData.domesticHelpRoom.wardrobe.shelves}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.wardrobe.shelves", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                </div>
              </div>

              {/* 🛏 3️⃣ BED NICHE */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  🛏 3️⃣ BED NICHE
                </h5>
                <div>
                  <label className="block text-xs text-gray-text mb-2">Bed Niche Required</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`bedNiche-${roomName}`}
                        value="yes"
                        checked={roomData.domesticHelpRoom.bedNiche.required === "yes"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.bedNiche.required", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`bedNiche-${roomName}`}
                        value="no"
                        checked={roomData.domesticHelpRoom.bedNiche.required === "no"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.bedNiche.required", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 💡 4️⃣ ELECTRICAL */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  💡 4️⃣ ELECTRICAL
                </h5>
                
                {/* Wiring Brand */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-text mb-2">Wiring Brand</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wiringBrand-${roomName}`}
                        value="havells"
                        checked={roomData.domesticHelpRoom.electrical.wiringBrand === "havells"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Havells</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wiringBrand-${roomName}`}
                        value="polycab"
                        checked={roomData.domesticHelpRoom.electrical.wiringBrand === "polycab"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Polycab</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wiringBrand-${roomName}`}
                        value="finolex"
                        checked={roomData.domesticHelpRoom.electrical.wiringBrand === "finolex"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Finolex</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wiringBrand-${roomName}`}
                        value="local"
                        checked={roomData.domesticHelpRoom.electrical.wiringBrand === "local"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.wiringBrand", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Local</span>
                    </label>
                  </div>
                </div>

                {/* Wire Type */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-text mb-2">Wire Type</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wireType-${roomName}`}
                        value="fr"
                        checked={roomData.domesticHelpRoom.electrical.wireType === "fr"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.wireType", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">FR</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wireType-${roomName}`}
                        value="frls"
                        checked={roomData.domesticHelpRoom.electrical.wireType === "frls"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.wireType", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">FRLS</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wireType-${roomName}`}
                        value="nonFr"
                        checked={roomData.domesticHelpRoom.electrical.wireType === "nonFr"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.wireType", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Non-FR</span>
                    </label>
                  </div>
                </div>

                {/* Switches */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-text mb-2">Switches</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`switches-${roomName}`}
                        value="anchor"
                        checked={roomData.domesticHelpRoom.electrical.switches === "anchor"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.switches", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Anchor</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`switches-${roomName}`}
                        value="gm"
                        checked={roomData.domesticHelpRoom.electrical.switches === "gm"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.switches", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">GM</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`switches-${roomName}`}
                        value="legrand"
                        checked={roomData.domesticHelpRoom.electrical.switches === "legrand"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.switches", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Legrand</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`switches-${roomName}`}
                        value="schneider"
                        checked={roomData.domesticHelpRoom.electrical.switches === "schneider"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.switches", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Schneider</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`switches-${roomName}`}
                        value="basic"
                        checked={roomData.domesticHelpRoom.electrical.switches === "basic"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.switches", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Basic</span>
                    </label>
                  </div>
                </div>

                {/* Fan and Lights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-text mb-2">Fan</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`fan-${roomName}`}
                          value="yes"
                          checked={roomData.domesticHelpRoom.electrical.fan === "yes"}
                          onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.fan", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`fan-${roomName}`}
                          value="no"
                          checked={roomData.domesticHelpRoom.electrical.fan === "no"}
                          onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.fan", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Lights</label>
                    <input
                      type="text"
                      value={roomData.domesticHelpRoom.electrical.lights}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.lights", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Specify lights"
                    />
                  </div>
                </div>

                {/* Ventilation */}
                <div>
                  <label className="block text-xs text-gray-text mb-2">Ventilation</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`ventilation-${roomName}`}
                        value="window"
                        checked={roomData.domesticHelpRoom.electrical.ventilation === "window"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.ventilation", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Window</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`ventilation-${roomName}`}
                        value="exhaust"
                        checked={roomData.domesticHelpRoom.electrical.ventilation === "exhaust"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.ventilation", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Exhaust</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`ventilation-${roomName}`}
                        value="both"
                        checked={roomData.domesticHelpRoom.electrical.ventilation === "both"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.electrical.ventilation", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Both</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 🎨 5️⃣ PAINT */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  🎨 5️⃣ PAINT
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wall Paint</label>
                    <select
                      value={roomData.domesticHelpRoom.paint.wallPaint}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.paint.wallPaint", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="royaleShine">Royale Shine</option>
                      <option value="pu">PU</option>
                      <option value="texture">Texture</option>
                      <option value="royaleMatt">Royale Matt</option>
                      <option value="satin">Satin</option>
                      <option value="plasticPremium">Plastic Premium</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Ceiling Paint</label>
                    <select
                      value={roomData.domesticHelpRoom.paint.ceilingPaint}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.paint.ceilingPaint", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="royaleShine">Royale Shine</option>
                      <option value="pu">PU</option>
                      <option value="texture">Texture</option>
                      <option value="royaleMatt">Royale Matt</option>
                      <option value="satin">Satin</option>
                      <option value="plasticPremium">Plastic Premium</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 🚿 6️⃣ HELP BATHROOM */}
              <div className="mb-6 p-4 bg-dark border border-gray-border rounded">
                <h5 className="text-accent font-medium mb-4 text-sm flex items-center gap-2">
                  🚿 6️⃣ HELP BATHROOM
                </h5>

                {/* Wall Covering */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-text mb-2">Wall Covering</label>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roomData.domesticHelpRoom.helpBathroom.wallCovering.tile}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.wallCovering.tile", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">Tile</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roomData.domesticHelpRoom.helpBathroom.wallCovering.marble}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.wallCovering.marble", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">Marble</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roomData.domesticHelpRoom.helpBathroom.wallCovering.granite}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.wallCovering.granite", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">Granite</span>
                    </label>
                  </div>
                </div>

                {/* Floor Covering */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-text mb-2">Floor Covering</label>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roomData.domesticHelpRoom.helpBathroom.floorCovering.antiSkidTile}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.floorCovering.antiSkidTile", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">Anti-Skid Tile</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roomData.domesticHelpRoom.helpBathroom.floorCovering.marble}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.floorCovering.marble", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">Marble</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roomData.domesticHelpRoom.helpBathroom.floorCovering.granite}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.floorCovering.granite", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">Granite</span>
                    </label>
                  </div>
                </div>

                {/* WC */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-text mb-2">WC</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wc-${roomName}`}
                        value="floorMounted"
                        checked={roomData.domesticHelpRoom.helpBathroom.wc === "floorMounted"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.wc", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Floor Mounted</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wc-${roomName}`}
                        value="wallMounted"
                        checked={roomData.domesticHelpRoom.helpBathroom.wc === "wallMounted"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.wc", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Wall Mounted</span>
                    </label>
                  </div>
                </div>

                {/* Basin */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-text mb-2">Basin</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`basin-${roomName}`}
                        value="wallMounted"
                        checked={roomData.domesticHelpRoom.helpBathroom.basin === "wallMounted"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.basin", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Wall Mounted</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`basin-${roomName}`}
                        value="tableTop"
                        checked={roomData.domesticHelpRoom.helpBathroom.basin === "tableTop"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.basin", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Table Top</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`basin-${roomName}`}
                        value="basic"
                        checked={roomData.domesticHelpRoom.helpBathroom.basin === "basic"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.basin", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Basic</span>
                    </label>
                  </div>
                </div>

                {/* Fittings */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-text mb-1">Fittings</label>
                  <select
                    value={roomData.domesticHelpRoom.helpBathroom.fittings}
                    onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.fittings", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="cera">Cera</option>
                    <option value="hindware">Hindware</option>
                    <option value="jaquar">Jaquar</option>
                    <option value="kohler">Kohler</option>
                    <option value="grohe">Grohe</option>
                    <option value="other">Other</option>
                  </select>
                  {roomData.domesticHelpRoom.helpBathroom.fittings === "other" && (
                    <input
                      type="text"
                      value={roomData.domesticHelpRoom.helpBathroom.fittingsOther}
                      onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.fittingsOther", e.target.value)}
                      placeholder="Specify other brand"
                      className="w-full mt-2 bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  )}
                </div>

                {/* Plumbing Line Material */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-text mb-2">Plumbing Line Material</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`plumbingLine-${roomName}`}
                        value="astral"
                        checked={roomData.domesticHelpRoom.helpBathroom.plumbingLineMaterial === "astral"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.plumbingLineMaterial", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Astral</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`plumbingLine-${roomName}`}
                        value="supreme"
                        checked={roomData.domesticHelpRoom.helpBathroom.plumbingLineMaterial === "supreme"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.plumbingLineMaterial", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Supreme</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`plumbingLine-${roomName}`}
                        value="prakash"
                        checked={roomData.domesticHelpRoom.helpBathroom.plumbingLineMaterial === "prakash"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.plumbingLineMaterial", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Prakash</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`plumbingLine-${roomName}`}
                        value="ashirvad"
                        checked={roomData.domesticHelpRoom.helpBathroom.plumbingLineMaterial === "ashirvad"}
                        onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.plumbingLineMaterial", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Ashirvad</span>
                    </label>
                  </div>
                </div>

                {/* Exhaust and Geyser */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-text mb-2">Exhaust</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`exhaust-${roomName}`}
                          value="yes"
                          checked={roomData.domesticHelpRoom.helpBathroom.exhaust === "yes"}
                          onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.exhaust", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`exhaust-${roomName}`}
                          value="no"
                          checked={roomData.domesticHelpRoom.helpBathroom.exhaust === "no"}
                          onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.exhaust", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-2">Geyser</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`geyser-${roomName}`}
                          value="yes"
                          checked={roomData.domesticHelpRoom.helpBathroom.geyser === "yes"}
                          onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.geyser", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`geyser-${roomName}`}
                          value="no"
                          checked={roomData.domesticHelpRoom.helpBathroom.geyser === "no"}
                          onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.geyser", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Switches */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-text mb-1">Switches</label>
                  <select
                    value={roomData.domesticHelpRoom.helpBathroom.switches}
                    onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.switches", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="anchor">Anchor</option>
                    <option value="gm">GM</option>
                    <option value="legrand">Legrand</option>
                    <option value="schneider">Schneider</option>
                    <option value="basic">Basic</option>
                  </select>
                </div>

                {/* Paint (Ceiling) */}
                <div>
                  <label className="block text-xs text-gray-text mb-1">Ceiling Paint</label>
                  <select
                    value={roomData.domesticHelpRoom.helpBathroom.paint}
                    onChange={(e) => onChange(roomName, "domesticHelpRoom.helpBathroom.paint", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="royaleShine">Royale Shine</option>
                    <option value="pu">PU</option>
                    <option value="texture">Texture</option>
                    <option value="royaleMatt">Royale Matt</option>
                    <option value="satin">Satin</option>
                    <option value="plasticPremium">Plastic Premium</option>
                  </select>
                </div>
              </div>

              {/* 📝 7️⃣ NOTES */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  📝 7️⃣ NOTES
                </h5>
                <textarea
                  value={roomData.domesticHelpRoom.notes}
                  onChange={(e) => onChange(roomName, "domesticHelpRoom.notes", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  rows="4"
                  placeholder="Add any additional notes for the domestic help room..."
                />
              </div>
            </>
          )}

          {/* STORE ROOM SECTIONS */}
          {isStoreRoom && roomData.storeRoom && (
            <>
              {/* 🏠 1️⃣ BASIC INFORMATION */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  🏠 1️⃣ BASIC INFORMATION
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Length (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.storeRoom.basicInfo.length}
                      onChange={(e) => onChange(roomName, "storeRoom.basicInfo.length", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.storeRoom.basicInfo.width}
                      onChange={(e) => onChange(roomName, "storeRoom.basicInfo.width", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Ceiling Height (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roomData.storeRoom.basicInfo.ceilingHeight}
                      onChange={(e) => onChange(roomName, "storeRoom.basicInfo.ceilingHeight", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                </div>
              </div>

              {/* 🗄️ 2️⃣ STORE WARDROBE DETAILS */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  🗄️ 2️⃣ STORE WARDROBE DETAILS
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Suggested Width (ft)</label>
                    <input
                      type="text"
                      value={roomData.storeRoom.wardrobe.suggestedWidth}
                      onChange={(e) => onChange(roomName, "storeRoom.wardrobe.suggestedWidth", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="e.g., 4-6 ft"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Suggested Height (ft)</label>
                    <input
                      type="text"
                      value={roomData.storeRoom.wardrobe.suggestedHeight}
                      onChange={(e) => onChange(roomName, "storeRoom.wardrobe.suggestedHeight", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="e.g., 7-8 ft"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Material</label>
                    <select
                      value={roomData.storeRoom.wardrobe.material}
                      onChange={(e) => onChange(roomName, "storeRoom.wardrobe.material", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="laminate">Laminate</option>
                      <option value="veneer">Veneer</option>
                      <option value="pu">PU</option>
                      <option value="acrylic">Acrylic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Carcass</label>
                    <select
                      value={roomData.storeRoom.wardrobe.carcass}
                      onChange={(e) => onChange(roomName, "storeRoom.wardrobe.carcass", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="hdhmr">HDHMR</option>
                      <option value="bwp">BWP</option>
                      <option value="plywood">Plywood</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs text-gray-text mb-2">Hardware Level</label>
                  <div className="flex flex-wrap gap-4">
                    {["Basic", "Mid", "Premium", "Ultra Premium"].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`hardwareLevel-${roomName}`}
                          value={level}
                          checked={roomData.storeRoom.wardrobe.hardwareLevel === level}
                          onChange={(e) => onChange(roomName, "storeRoom.wardrobe.hardwareLevel", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="block text-xs text-gray-text mb-2">Lofts Required</label>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((val) => (
                        <label key={val} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`lofts-${roomName}`}
                            value={val}
                            checked={roomData.storeRoom.wardrobe.lofts === val}
                            onChange={(e) => onChange(roomName, "storeRoom.wardrobe.lofts", e.target.value)}
                            className="w-4 h-4 text-accent focus:ring-accent"
                          />
                          <span className="text-white text-sm">{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Shelf Configuration</label>
                    <select
                      value={roomData.storeRoom.wardrobe.shelfConfiguration}
                      onChange={(e) => onChange(roomName, "storeRoom.wardrobe.shelfConfiguration", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="adjustable">Adjustable</option>
                      <option value="fixed">Fixed</option>
                      <option value="heavyDuty">Heavy-Duty</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs text-gray-text mb-2">Storage Zoning</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: "luggage", label: "Luggage" },
                      { key: "grocery", label: "Grocery" },
                      { key: "cleaningSupplies", label: "Cleaning Supplies" },
                      { key: "seasonalStorage", label: "Seasonal Storage" },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={roomData.storeRoom.wardrobe.storageZoning[key]}
                          onChange={(e) => onChange(roomName, `storeRoom.wardrobe.storageZoning.${key}`, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* 💡 3️⃣ LIGHTING OPTIONS */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  💡 3️⃣ LIGHTING OPTIONS
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Ceiling Light Type</label>
                    <select
                      value={roomData.storeRoom.lighting.ceilingLightType}
                      onChange={(e) => onChange(roomName, "storeRoom.lighting.ceilingLightType", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="ledPanel">LED Panel</option>
                      <option value="cob">COB</option>
                      <option value="tubeLight">Tube Light</option>
                      <option value="bulb">Bulb</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: "stripLightingInsideShelves", label: "Strip Lighting Inside Shelves" },
                    { key: "sensorLights", label: "Sensor Lights" },
                    { key: "emergencyBackupLight", label: "Emergency Backup Light" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roomData.storeRoom.lighting[key]}
                        onChange={(e) => onChange(roomName, `storeRoom.lighting.${key}`, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 🌬️ 4️⃣ VENTILATION */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  🌬️ 4️⃣ VENTILATION
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: "exhaustFan", label: "Exhaust Fan" },
                    { key: "louverVents", label: "Louver Vents" },
                    { key: "dehumidifierProvision", label: "Dehumidifier Provision" },
                    { key: "windowOption", label: "Window Option" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roomData.storeRoom.ventilation[key]}
                        onChange={(e) => onChange(roomName, `storeRoom.ventilation.${key}`, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 🎨 5️⃣ PAINT */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  🎨 5️⃣ PAINT
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wall Finish</label>
                    <select
                      value={roomData.storeRoom.paint.wallFinish}
                      onChange={(e) => onChange(roomName, "storeRoom.paint.wallFinish", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="royaleMatt">Royale Matt</option>
                      <option value="plasticPremium">Plastic Premium</option>
                      <option value="washablePaint">Washable Paint</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Ceiling Finish</label>
                    <select
                      value={roomData.storeRoom.paint.ceilingFinish}
                      onChange={(e) => onChange(roomName, "storeRoom.paint.ceilingFinish", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="royaleMatt">Royale Matt</option>
                      <option value="plasticPremium">Plastic Premium</option>
                      <option value="washablePaint">Washable Paint</option>
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roomData.storeRoom.paint.moistureResistantPaint}
                    onChange={(e) => onChange(roomName, "storeRoom.paint.moistureResistantPaint", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">Moisture-Resistant Paint</span>
                </label>
              </div>

              {/* ⚡ 6️⃣ ELECTRICAL */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  ⚡ 6️⃣ ELECTRICAL
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-text mb-2">Wiring Brand</label>
                    <div className="flex flex-wrap gap-3">
                      {["Havells", "Polycab", "Finolex"].map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`wiringBrand-${roomName}`}
                            value={brand}
                            checked={roomData.storeRoom.electrical.wiringBrand === brand}
                            onChange={(e) => onChange(roomName, "storeRoom.electrical.wiringBrand", e.target.value)}
                            className="w-4 h-4 text-accent focus:ring-accent"
                          />
                          <span className="text-white text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-2">Wire Type</label>
                    <div className="flex gap-4">
                      {["FR", "FRLS"].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`wireType-${roomName}`}
                            value={type}
                            checked={roomData.storeRoom.electrical.wireType === type}
                            onChange={(e) => onChange(roomName, "storeRoom.electrical.wireType", e.target.value)}
                            className="w-4 h-4 text-accent focus:ring-accent"
                          />
                          <span className="text-white text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-text mb-2">Switches</label>
                    <div className="flex flex-wrap gap-3">
                      {["Anchor", "GM", "Legrand", "Schneider", "Smart"].map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`switches-${roomName}`}
                            value={brand}
                            checked={roomData.storeRoom.electrical.switches === brand}
                            onChange={(e) => onChange(roomName, "storeRoom.electrical.switches", e.target.value)}
                            className="w-4 h-4 text-accent focus:ring-accent"
                          />
                          <span className="text-white text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Number of Light Points</label>
                    <input
                      type="number"
                      value={roomData.storeRoom.electrical.lightPoints}
                      onChange={(e) => onChange(roomName, "storeRoom.electrical.lightPoints", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-2">Extra Plug Points</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: "vacuum", label: "Vacuum" },
                      { key: "iron", label: "Iron" },
                      { key: "inverter", label: "Inverter" },
                      { key: "other", label: "Other" },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={roomData.storeRoom.electrical.extraPlugPoints[key]}
                          onChange={(e) => onChange(roomName, `storeRoom.electrical.extraPlugPoints.${key}`, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {/* 📝 9️⃣ NOTES */}
              <div className="mb-6">
                <h5 className="text-accent font-medium mb-3 text-sm flex items-center gap-2">
                  📝 9️⃣ NOTES
                </h5>
                <textarea
                  value={roomData.storeRoom.notes}
                  onChange={(e) => onChange(roomName, "storeRoom.notes", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  rows="4"
                  placeholder="Add any additional notes or special requirements for the store room..."
                />
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
            <RoomBalconySection
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
function RoomBalconySection({ roomName, balconyData, onChange }) {
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

// Bedroom + Washroom Dynamic Section Component
function BedroomWithWashroomSection({ instance, isExpanded, onToggle, onChange, onRemove }) {
  const { id, name, bedroom, washroom } = instance;

  return (
    <div className="bg-dark border border-gray-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-dark-light">
        <button
          type="button"
          onClick={onToggle}
          className="flex-1 flex items-center justify-between hover:text-accent transition"
        >
          <span className="text-white font-semibold">{name}</span>
          <span className="text-accent">{isExpanded ? "▲" : "▼"}</span>
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="ml-4 px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Remove
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-5 space-y-8 border-t border-gray-border">
          
          {/* ==================== PART 1: BEDROOM DETAILS ==================== */}
          <div className="space-y-6">
            <h3 className="text-accent font-bold text-lg">🛏 PART 1 – BEDROOM DETAILS</h3>

            {/* 1️⃣ Basic Information */}
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
                    value={bedroom.basicInfo.length}
                    onChange={(e) => onChange(id, "bedroom.basicInfo.length", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={bedroom.basicInfo.width}
                    onChange={(e) => onChange(id, "bedroom.basicInfo.width", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Ceiling Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={bedroom.basicInfo.ceilingHeight}
                    onChange={(e) => onChange(id, "bedroom.basicInfo.ceilingHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Window Count</label>
                  <input
                    type="number"
                    value={bedroom.basicInfo.windowCount}
                    onChange={(e) => onChange(id, "bedroom.basicInfo.windowCount", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Sill Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={bedroom.basicInfo.sillHeight}
                    onChange={(e) => onChange(id, "bedroom.basicInfo.sillHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Lintel Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={bedroom.basicInfo.lintelHeight}
                    onChange={(e) => onChange(id, "bedroom.basicInfo.lintelHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
              </div>

              {/* Balcony Access */}
              <div className="mt-4">
                <label className="block text-xs text-gray-text mb-2">Balcony Access</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`balconyAccess-${id}`}
                      value="yes"
                      checked={bedroom.basicInfo.balconyAccess === "yes"}
                      onChange={(e) => onChange(id, "bedroom.basicInfo.balconyAccess", e.target.value)}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="text-white text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`balconyAccess-${id}`}
                      value="no"
                      checked={bedroom.basicInfo.balconyAccess === "no"}
                      onChange={(e) => onChange(id, "bedroom.basicInfo.balconyAccess", e.target.value)}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="text-white text-sm">No</span>
                  </label>
                </div>

                {/* Conditional Balcony Details */}
                {bedroom.basicInfo.balconyAccess === "yes" && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-dark-light rounded">
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Balcony Door Type</label>
                      <select
                        value={bedroom.basicInfo.balconyDoorType}
                        onChange={(e) => onChange(id, "bedroom.basicInfo.balconyDoorType", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      >
                        <option value="">Select</option>
                        <option value="sliding">Sliding</option>
                        <option value="hingedSingle">Hinged Single</option>
                        <option value="hingedDouble">Hinged Double</option>
                        <option value="fixed">Fixed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Door Width (ft)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={bedroom.basicInfo.balconyDoorWidth}
                        onChange={(e) => onChange(id, "bedroom.basicInfo.balconyDoorWidth", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Door Height (ft)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={bedroom.basicInfo.balconyDoorHeight}
                        onChange={(e) => onChange(id, "bedroom.basicInfo.balconyDoorHeight", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs text-gray-text mb-1">Balcony Railing Type</label>
                      <select
                        value={bedroom.basicInfo.balconyRailingType}
                        onChange={(e) => onChange(id, "bedroom.basicInfo.balconyRailingType", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      >
                        <option value="">Select</option>
                        <option value="brick">Brick</option>
                        <option value="glass">Glass</option>
                        <option value="aluminiumGlass">Aluminium + Glass</option>
                        <option value="ss">SS</option>
                        <option value="ms">MS</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2️⃣ Civil Work */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                2️⃣ Civil Work (Multi Select)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries({
                  demolitionFlooring: "Demolition of flooring",
                  demolitionWalls: "Demolition of walls",
                  newPartitions: "New partitions / wall shifting",
                  floorLeveling: "Floor leveling",
                  newFlooring: "New flooring installation",
                  skirting: "Skirting installation",
                  beamCovering: "Beam/column covering",
                  windowModification: "Window enlargement/reduction",
                  doorModification: "Door shifting / enlargement",
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={bedroom.civilWork[key]}
                      onChange={(e) => onChange(id, `bedroom.civilWork.${key}`, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3️⃣ False Ceiling */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                3️⃣ False Ceiling
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-text mb-2">False Ceiling Required</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`falseCeilingRequired-${id}`}
                        value="yes"
                        checked={bedroom.falseCeiling.required === "yes"}
                        onChange={(e) => onChange(id, "bedroom.falseCeiling.required", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`falseCeilingRequired-${id}`}
                        value="no"
                        checked={bedroom.falseCeiling.required === "no"}
                        onChange={(e) => onChange(id, "bedroom.falseCeiling.required", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">No</span>
                    </label>
                  </div>
                </div>

                {bedroom.falseCeiling.required === "yes" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-dark-light rounded">
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Ceiling Type</label>
                      <select
                        value={bedroom.falseCeiling.type}
                        onChange={(e) => onChange(id, "bedroom.falseCeiling.type", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      >
                        <option value="">Select</option>
                        <option value="pop">POP</option>
                        <option value="wooden">Wooden</option>
                        <option value="stretch">Stretch</option>
                        <option value="grid">Grid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Cove Lighting</label>
                      <select
                        value={bedroom.falseCeiling.coveLighting}
                        onChange={(e) => onChange(id, "bedroom.falseCeiling.coveLighting", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      >
                        <option value="">Select</option>
                        <option value="outside">Outside</option>
                        <option value="inside">Inside</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Ceiling Design</label>
                      <select
                        value={bedroom.falseCeiling.design}
                        onChange={(e) => onChange(id, "bedroom.falseCeiling.design", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      >
                        <option value="">Select</option>
                        <option value="grooves">Grooves</option>
                        <option value="mouldings">Mouldings</option>
                        <option value="beamCovering">Beam Covering</option>
                        <option value="noDesign">No Design</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 4️⃣ Floor Covering */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                4️⃣ Floor Covering
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries({
                  glossTile: "Gloss Tile",
                  mattTile: "Matt Tile",
                  marble: "Marble",
                  granite: "Granite",
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={bedroom.floorCovering[key]}
                      onChange={(e) => onChange(id, `bedroom.floorCovering.${key}`, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5️⃣ Wall Paneling */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                5️⃣ Wall Paneling
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-text mb-2">Wall Paneling Required</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wallPanelingRequired-${id}`}
                        value="yes"
                        checked={bedroom.wallPaneling.required === "yes"}
                        onChange={(e) => onChange(id, "bedroom.wallPaneling.required", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`wallPanelingRequired-${id}`}
                        value="no"
                        checked={bedroom.wallPaneling.required === "no"}
                        onChange={(e) => onChange(id, "bedroom.wallPaneling.required", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">No</span>
                    </label>
                  </div>
                </div>

                {bedroom.wallPaneling.required === "yes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-dark-light rounded">
                    <div>
                      <label className="block text-xs text-gray-text mb-1">Number of Walls</label>
                      <select
                        value={bedroom.wallPaneling.numberOfWalls}
                        onChange={(e) => onChange(id, "bedroom.wallPaneling.numberOfWalls", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
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
                        value={bedroom.wallPaneling.material}
                        onChange={(e) => onChange(id, "bedroom.wallPaneling.material", e.target.value)}
                        className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      >
                        <option value="">Select</option>
                        <option value="pop">POP</option>
                        <option value="laminate">Laminate</option>
                        <option value="veneer">Veneer</option>
                        <option value="pu">PU</option>
                        <option value="mdf">MDF</option>
                        <option value="fabric">Fabric</option>
                        <option value="glass">Glass</option>
                        <option value="acrylic">Acrylic</option>
                        <option value="stone">Stone</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 6️⃣ Wardrobe Details */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                6️⃣ Wardrobe Details
              </h4>
              <div className="space-y-4">
                {/* Wardrobe Type */}
                <div>
                  <label className="block text-xs text-gray-text mb-1">Wardrobe Type</label>
                  <select
                    value={bedroom.wardrobe.type}
                    onChange={(e) => onChange(id, "bedroom.wardrobe.type", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="normal">Normal Wardrobe</option>
                    <option value="walkIn">Walk-In Wardrobe</option>
                  </select>
                </div>

                {/* Wardrobe Height */}
                <div>
                  <label className="block text-xs text-gray-text mb-1">Wardrobe Height</label>
                  <select
                    value={bedroom.wardrobe.height}
                    onChange={(e) => onChange(id, "bedroom.wardrobe.height", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="fullHeight">Full Height</option>
                    <option value="8ft">8 ft</option>
                    <option value="8ftLoft">8 ft + Loft</option>
                  </select>
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={bedroom.wardrobe.width}
                      onChange={(e) => onChange(id, "bedroom.wardrobe.width", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Depth (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={bedroom.wardrobe.depth}
                      onChange={(e) => onChange(id, "bedroom.wardrobe.depth", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Loft Height (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={bedroom.wardrobe.loftHeight}
                      onChange={(e) => onChange(id, "bedroom.wardrobe.loftHeight", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                </div>

                {/* Internal Layout */}
                <div>
                  <label className="block text-xs text-gray-text mb-2">Internal Layout (Multi Select)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Object.entries({
                      hangingRod: "Hanging Rod",
                      hangingPullout: "Hanging Pullout",
                      shelves: "Shelves",
                      drawers: "Drawers",
                      shoeRack: "Shoe Rack",
                      trouserPullout: "Trouser Pullout",
                      tieRack: "Tie Rack",
                      jewelleryTray: "Jewellery Tray",
                      mirrorInside: "Mirror Inside",
                      sensorLight: "Sensor Light",
                    }).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={bedroom.wardrobe.internalLayout[key]}
                          onChange={(e) => onChange(id, `bedroom.wardrobe.internalLayout.${key}`, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Shutter Finish & Hardware */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Shutter Finish</label>
                    <select
                      value={bedroom.wardrobe.shutterFinish}
                      onChange={(e) => onChange(id, "bedroom.wardrobe.shutterFinish", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="laminate">Laminate</option>
                      <option value="veneer">Veneer</option>
                      <option value="pu">PU</option>
                      <option value="acrylic">Acrylic</option>
                      <option value="glass">Glass</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Hardware Level</label>
                    <select
                      value={bedroom.wardrobe.hardwareLevel}
                      onChange={(e) => onChange(id, "bedroom.wardrobe.hardwareLevel", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="basic">Basic</option>
                      <option value="mid">Mid</option>
                      <option value="premium">Premium</option>
                      <option value="ultraPremium">Ultra Premium</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 7️⃣ Other Carpentry */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                7️⃣ Other Carpentry
              </h4>
              <div className="space-y-4">
                {/* Bed Type */}
                <div>
                  <label className="block text-xs text-gray-text mb-1">Bed</label>
                  <select
                    value={bedroom.otherCarpentry.bed}
                    onChange={(e) => onChange(id, "bedroom.otherCarpentry.bed", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="singleBox">Single Box</option>
                    <option value="doubleBox">Double Box</option>
                  </select>
                </div>

                {/* Other Items */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.entries({
                    headboard: "Headboard",
                    footboard: "Footboard",
                    sideTables: "Side Tables",
                    studyTable: "Study Table",
                    dressingTable: "Dressing Table",
                    tvPanel: "TV Panel",
                    bookshelf: "Bookshelf",
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={bedroom.otherCarpentry[key]}
                        onChange={(e) => onChange(id, `bedroom.otherCarpentry.${key}`, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                    </label>
                  ))}
                </div>

                {/* Loose Furniture */}
                <div>
                  <label className="block text-xs text-gray-text mb-2">Loose Furniture</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries({
                      chair: "Chair",
                      ottoman: "Ottoman",
                      sofa: "Sofa",
                      bench: "Bench",
                    }).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={bedroom.otherCarpentry.looseFurniture[key]}
                          onChange={(e) => onChange(id, `bedroom.otherCarpentry.looseFurniture.${key}`, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 8️⃣ Electrical */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                8️⃣ Electrical
              </h4>
              <div className="space-y-4">
                {/* Wiring Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wiring Brand</label>
                    <select
                      value={bedroom.electrical.wiringBrand}
                      onChange={(e) => onChange(id, "bedroom.electrical.wiringBrand", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="havells">Havells</option>
                      <option value="polycab">Polycab</option>
                      <option value="finolex">Finolex</option>
                      <option value="local">Local</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wire Type</label>
                    <select
                      value={bedroom.electrical.wireType}
                      onChange={(e) => onChange(id, "bedroom.electrical.wireType", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="fr">FR</option>
                      <option value="frls">FRLS</option>
                      <option value="nonFr">Non-FR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Switch Type</label>
                    <select
                      value={bedroom.electrical.switchType}
                      onChange={(e) => onChange(id, "bedroom.electrical.switchType", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="anchor">Anchor</option>
                      <option value="gm">GM</option>
                      <option value="legrand">Legrand</option>
                      <option value="schneider">Schneider</option>
                      <option value="smart">Smart</option>
                    </select>
                  </div>
                </div>

                {/* Lighting */}
                <div>
                  <label className="block text-xs text-gray-text mb-2">Lighting</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Object.entries({
                      cob: "COB",
                      downlights: "Downlights",
                      panelLights: "Panel Lights",
                      profileLights: "Profile Lights",
                      coveLights: "Cove Lights",
                      chandelier: "Chandelier",
                      wallLights: "Wall Lights",
                    }).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={bedroom.electrical.lighting[key]}
                          onChange={(e) => onChange(id, `bedroom.electrical.lighting.${key}`, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                        />
                        <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                      </label>
                    ))}
                  </div>
                  {bedroom.electrical.lighting.wallLights && (
                    <div className="mt-2">
                      <label className="block text-xs text-gray-text mb-1">Wall Lights Quantity</label>
                      <input
                        type="number"
                        value={bedroom.electrical.lighting.wallLightsQty}
                        onChange={(e) => onChange(id, "bedroom.electrical.lighting.wallLightsQty", e.target.value)}
                        className="w-full max-w-xs bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      />
                    </div>
                  )}
                </div>

                {/* Fans & AC */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Fans (Quantity)</label>
                    <input
                      type="number"
                      value={bedroom.electrical.fansQty}
                      onChange={(e) => onChange(id, "bedroom.electrical.fansQty", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">AC Wiring (Quantity)</label>
                    <input
                      type="number"
                      value={bedroom.electrical.acWiringQty}
                      onChange={(e) => onChange(id, "bedroom.electrical.acWiringQty", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                </div>

                {/* Automation */}
                <div>
                  <label className="block text-xs text-gray-text mb-2">Automation Required</label>
                  <div className="flex gap-4 mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`automationRequired-${id}`}
                        value="yes"
                        checked={bedroom.electrical.automation.required === "yes"}
                        onChange={(e) => onChange(id, "bedroom.electrical.automation.required", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`automationRequired-${id}`}
                        value="no"
                        checked={bedroom.electrical.automation.required === "no"}
                        onChange={(e) => onChange(id, "bedroom.electrical.automation.required", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">No</span>
                    </label>
                  </div>

                  {bedroom.electrical.automation.required === "yes" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-dark-light rounded">
                      {Object.entries({
                        lights: "Lights",
                        curtains: "Curtains",
                        ac: "AC",
                        tv: "TV",
                        speakers: "Speakers",
                        sceneSettings: "Scene Settings",
                      }).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={bedroom.electrical.automation[key]}
                            onChange={(e) => onChange(id, `bedroom.electrical.automation.${key}`, e.target.checked)}
                            className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                          />
                          <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* AC Type & Wiring Length */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Air Conditioning Type</label>
                    <select
                      value={bedroom.electrical.acType}
                      onChange={(e) => onChange(id, "bedroom.electrical.acType", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="split">Split</option>
                      <option value="cassette">Cassette</option>
                      <option value="ductable">Ductable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Approx. Wiring Length (ft)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={bedroom.electrical.wiringLength}
                      onChange={(e) => onChange(id, "bedroom.electrical.wiringLength", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 9️⃣ Paint */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                9️⃣ Paint
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-1">Wall Paint</label>
                  <select
                    value={bedroom.paint.wallPaint}
                    onChange={(e) => onChange(id, "bedroom.paint.wallPaint", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="royaleShine">Royale Shine</option>
                    <option value="pu">PU</option>
                    <option value="texture">Texture</option>
                    <option value="royaleMatt">Royale Matt</option>
                    <option value="satin">Satin</option>
                    <option value="plasticPremium">Plastic Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Ceiling Paint</label>
                  <select
                    value={bedroom.paint.ceilingPaint}
                    onChange={(e) => onChange(id, "bedroom.paint.ceilingPaint", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  >
                    <option value="">Select</option>
                    <option value="royaleShine">Royale Shine</option>
                    <option value="pu">PU</option>
                    <option value="texture">Texture</option>
                    <option value="royaleMatt">Royale Matt</option>
                    <option value="satin">Satin</option>
                    <option value="plasticPremium">Plastic Premium</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== PART 2: ATTACHED WASHROOM DETAILS ==================== */}
          <div className="space-y-6 border-t-2 border-accent pt-6">
            <h3 className="text-accent font-bold text-lg">🚿 PART 2 – ATTACHED WASHROOM DETAILS</h3>

            {/* 1️⃣ Basic */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                1️⃣ Basic
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-text mb-1">Length (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={washroom.basicInfo.length}
                    onChange={(e) => onChange(id, "washroom.basicInfo.length", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={washroom.basicInfo.width}
                    onChange={(e) => onChange(id, "washroom.basicInfo.width", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Ceiling Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={washroom.basicInfo.ceilingHeight}
                    onChange={(e) => onChange(id, "washroom.basicInfo.ceilingHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Window Count</label>
                  <input
                    type="number"
                    value={washroom.basicInfo.windowCount}
                    onChange={(e) => onChange(id, "washroom.basicInfo.windowCount", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Sill Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={washroom.basicInfo.sillHeight}
                    onChange={(e) => onChange(id, "washroom.basicInfo.sillHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Lintel Height (ft)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={washroom.basicInfo.lintelHeight}
                    onChange={(e) => onChange(id, "washroom.basicInfo.lintelHeight", e.target.value)}
                    className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                </div>
              </div>
            </div>

            {/* 2️⃣ Civil */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                2️⃣ Civil
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries({
                  waterproofing: "Waterproofing",
                  replaceFittingsOnly: "Replace Fittings Only",
                  fullDemolition: "Full Demolition",
                  drainPipeChange: "Drain Pipe Change",
                  supplyPipeChange: "Supply Pipe Change",
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={washroom.civil[key]}
                      onChange={(e) => onChange(id, `washroom.civil.${key}`, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3️⃣ Wall Coverings */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                3️⃣ Wall Coverings
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries({
                    tile: "Tile",
                    marble: "Marble",
                    granite: "Granite",
                    featureTile: "Feature Tile",
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={washroom.wallCoverings[key]}
                        onChange={(e) => onChange(id, `washroom.wallCoverings.${key}`, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Grout Color</label>
                  <input
                    type="text"
                    value={washroom.wallCoverings.groutColor}
                    onChange={(e) => onChange(id, "washroom.wallCoverings.groutColor", e.target.value)}
                    className="w-full max-w-md bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    placeholder="Enter grout color"
                  />
                </div>
              </div>
            </div>

            {/* 4️⃣ Floor Coverings */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                4️⃣ Floor Coverings
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries({
                    antiSkidTile: "Anti-Skid Tile",
                    marble: "Marble",
                    granite: "Granite",
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={washroom.floorCoverings[key]}
                        onChange={(e) => onChange(id, `washroom.floorCoverings.${key}`, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-xs text-gray-text mb-1">Grout Color</label>
                  <input
                    type="text"
                    value={washroom.floorCoverings.groutColor}
                    onChange={(e) => onChange(id, "washroom.floorCoverings.groutColor", e.target.value)}
                    className="w-full max-w-md bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    placeholder="Enter grout color"
                  />
                </div>
              </div>
            </div>

            {/* 5️⃣ Basin Type */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                5️⃣ Basin Type
              </h4>
              <select
                value={washroom.basinType}
                onChange={(e) => onChange(id, "washroom.basinType", e.target.value)}
                className="w-full max-w-md bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              >
                <option value="">Select</option>
                <option value="overCounter">Over-Counter</option>
                <option value="underCounter">Under-Counter</option>
                <option value="tableTop">Table-Top</option>
                <option value="integrated">Integrated</option>
                <option value="wallMounted">Wall-Mounted</option>
              </select>
            </div>

            {/* 6️⃣ Shower Type */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                6️⃣ Shower Type
              </h4>
              <select
                value={washroom.showerType}
                onChange={(e) => onChange(id, "washroom.showerType", e.target.value)}
                className="w-full max-w-md bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              >
                <option value="">Select</option>
                <option value="wallMounted">Wall-Mounted</option>
                <option value="ceilingMounted">Ceiling-Mounted</option>
                <option value="showerPanel">Shower Panel</option>
                <option value="bodyJets">Body Jets</option>
              </select>
            </div>

            {/* 7️⃣ Fitting Brands */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                7️⃣ Fitting Brands
              </h4>
              <div className="space-y-2">
                <select
                  value={washroom.fittingBrand}
                  onChange={(e) => onChange(id, "washroom.fittingBrand", e.target.value)}
                  className="w-full max-w-md bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="cera">Cera</option>
                  <option value="hindware">Hindware</option>
                  <option value="jaquar">Jaquar</option>
                  <option value="kohler">Kohler</option>
                  <option value="grohe">Grohe</option>
                  <option value="hansgrohe">Hansgrohe</option>
                  <option value="other">Other</option>
                </select>
                {washroom.fittingBrand === "other" && (
                  <input
                    type="text"
                    value={washroom.fittingBrandOther}
                    onChange={(e) => onChange(id, "washroom.fittingBrandOther", e.target.value)}
                    placeholder="Specify other brand"
                    className="w-full max-w-md bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  />
                )}
              </div>
            </div>

            {/* 8️⃣ Plumbing Material */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                8️⃣ Plumbing Material
              </h4>
              <select
                value={washroom.plumbingMaterial}
                onChange={(e) => onChange(id, "washroom.plumbingMaterial", e.target.value)}
                className="w-full max-w-md bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              >
                <option value="">Select</option>
                <option value="astral">Astral</option>
                <option value="supreme">Supreme</option>
                <option value="prakash">Prakash</option>
                <option value="ashirvad">Ashirvad</option>
              </select>
            </div>

            {/* 9️⃣ Electrical */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                9️⃣ Electrical
              </h4>
              <div className="space-y-4">
                {/* Electrical Items */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries({
                    mirrorLight: "Mirror Light",
                    ceilingLight: "Ceiling Light",
                    exhaustFan: "Exhaust Fan",
                    geyser: "Geyser",
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={washroom.electrical[key]}
                        onChange={(e) => onChange(id, `washroom.electrical.${key}`, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm group-hover:text-accent transition">{label}</span>
                    </label>
                  ))}
                </div>

                {/* Wiring Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wiring Brand</label>
                    <select
                      value={washroom.electrical.wiringBrand}
                      onChange={(e) => onChange(id, "washroom.electrical.wiringBrand", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="havells">Havells</option>
                      <option value="polycab">Polycab</option>
                      <option value="finolex">Finolex</option>
                      <option value="local">Local</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Wire Type</label>
                    <select
                      value={washroom.electrical.wireType}
                      onChange={(e) => onChange(id, "washroom.electrical.wireType", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="fr">FR</option>
                      <option value="frls">FRLS</option>
                      <option value="nonFr">Non-FR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-text mb-1">Switch Type</label>
                    <select
                      value={washroom.electrical.switchType}
                      onChange={(e) => onChange(id, "washroom.electrical.switchType", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    >
                      <option value="">Select</option>
                      <option value="anchor">Anchor</option>
                      <option value="gm">GM</option>
                      <option value="legrand">Legrand</option>
                      <option value="schneider">Schneider</option>
                      <option value="smart">Smart</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 🔟 Paint */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                🔟 Paint
              </h4>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Paint</label>
                <select
                  value={washroom.paint.ceilingPaint}
                  onChange={(e) => onChange(id, "washroom.paint.ceilingPaint", e.target.value)}
                  className="w-full max-w-md bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select</option>
                  <option value="royaleShine">Royale Shine</option>
                  <option value="pu">PU</option>
                  <option value="texture">Texture</option>
                  <option value="royaleMatt">Royale Matt</option>
                  <option value="satin">Satin</option>
                  <option value="plasticPremium">Plastic Premium</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// BalconySection Component
function BalconySection({ instance, isExpanded, onToggle, onChange, onRemove }) {
  const { id, name, basic, civil, floorCoverings, wallCoverings, ceiling, carpentryBuiltIn, looseFurniture, electrical, waterPlumbing, greeneryPlanters, safety, notes } = instance;

  return (
    <div className="bg-dark border border-gray-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-dark-light">
        <button
          type="button"
          onClick={onToggle}
          className="flex-1 flex items-center justify-between hover:text-accent transition"
        >
          <span className="text-white font-semibold">{name}</span>
          <span className="text-accent">{isExpanded ? "▲" : "▼"}</span>
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="ml-4 px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Remove
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-5 space-y-6">
          
          {/* 🏠 1️⃣ BASIC */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">🏠 1️⃣ BASIC</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="block text-xs text-gray-text mb-1">Length (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={basic.length}
                  onChange={(e) => onChange(id, "basic.length", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Width (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={basic.width}
                  onChange={(e) => onChange(id, "basic.width", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Ceiling Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={basic.ceilingHeight}
                  onChange={(e) => onChange(id, "basic.ceilingHeight", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Door / Window Size (W x H)</label>
                <input
                  type="text"
                  value={basic.doorWindowSize}
                  onChange={(e) => onChange(id, "basic.doorWindowSize", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                  placeholder="e.g., 4x7"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-text mb-2">Door Type</label>
                <div className="flex gap-4">
                  {["Sliding", "Hinged Single", "Hinged Double"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`doorType-${id}`}
                        value={type}
                        checked={basic.doorType === type}
                        onChange={(e) => onChange(id, "basic.doorType", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-2">Railing Type</label>
                <div className="flex flex-wrap gap-3">
                  {["Glass", "MS", "SS", "Brick", "Other"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`railingType-${id}`}
                        value={type}
                        checked={basic.railingType === type}
                        onChange={(e) => onChange(id, "basic.railingType", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm">{type}</span>
                    </label>
                  ))}
                </div>
                {basic.railingType === "Other" && (
                  <input
                    type="text"
                    value={basic.railingTypeOther}
                    onChange={(e) => onChange(id, "basic.railingTypeOther", e.target.value)}
                    className="w-full mt-2 bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                    placeholder="Specify other railing type"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-text mb-1">Railing Height</label>
              <input
                type="text"
                value={basic.railingHeight}
                onChange={(e) => onChange(id, "basic.railingHeight", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                placeholder="Enter railing height"
              />
            </div>
          </div>

          {/* 🧱 2️⃣ CIVIL */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">🧱 2️⃣ CIVIL</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { key: "waterproofingRequired", label: "Waterproofing Required" },
                { key: "slopeCorrection", label: "Slope Correction" },
                { key: "pccLeveling", label: "PCC / Leveling" },
                { key: "tileRemoval", label: "Tile Removal" },
                { key: "wallPlasterRepair", label: "Wall Plaster Repair" },
                { key: "ceilingRepairWaterproofing", label: "Ceiling Repair / Waterproofing" },
                { key: "drainCleaningNewDrain", label: "Drain Cleaning / New Drain" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={civil[key]}
                    onChange={(e) => onChange(id, `civil.${key}`, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 🪵 3️⃣ FLOOR COVERINGS */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">🪵 3️⃣ FLOOR COVERINGS</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {[
                { key: "antiSkidTile", label: "Anti-Skid Tile" },
                { key: "stone", label: "Stone" },
                { key: "granite", label: "Granite" },
                { key: "woodenTile", label: "Wooden Tile" },
                { key: "concreteTexture", label: "Concrete Texture" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={floorCoverings[key]}
                    onChange={(e) => onChange(id, `floorCoverings.${key}`, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">{label}</span>
                </label>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-1">Tile / Stone Size</label>
                <input
                  type="text"
                  value={floorCoverings.tileStoneSize}
                  onChange={(e) => onChange(id, "floorCoverings.tileStoneSize", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Grout Color</label>
                <input
                  type="text"
                  value={floorCoverings.groutColor}
                  onChange={(e) => onChange(id, "floorCoverings.groutColor", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>
          </div>

          {/* 🧱 4️⃣ WALL COVERINGS */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">🧱 4️⃣ WALL COVERINGS</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {[
                { key: "exteriorPaint", label: "Exterior Paint" },
                { key: "texturePaint", label: "Texture Paint" },
                { key: "stoneCladding", label: "Stone Cladding" },
                { key: "tileCladding", label: "Tile Cladding" },
                { key: "brickCladding", label: "Brick Cladding" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wallCoverings[key]}
                    onChange={(e) => onChange(id, `wallCoverings.${key}`, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">{label}</span>
                </label>
              ))}
            </div>
            <div className="mb-3">
              <label className="block text-xs text-gray-text mb-2">Feature Wall</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`featureWall-${id}`}
                    value="yes"
                    checked={wallCoverings.featureWall === "yes"}
                    onChange={(e) => onChange(id, "wallCoverings.featureWall", e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="text-white text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`featureWall-${id}`}
                    value="no"
                    checked={wallCoverings.featureWall === "no"}
                    onChange={(e) => onChange(id, "wallCoverings.featureWall", e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="text-white text-sm">No</span>
                </label>
              </div>
            </div>
            {wallCoverings.featureWall === "yes" && (
              <div>
                <label className="block text-xs text-gray-text mb-1">Feature Wall Material</label>
                <input
                  type="text"
                  value={wallCoverings.featureWallMaterial}
                  onChange={(e) => onChange(id, "wallCoverings.featureWallMaterial", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
            )}
          </div>

          {/* 🏗 5️⃣ CEILING */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">🏗 5️⃣ CEILING</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {[
                { key: "exteriorPaint", label: "Exterior Paint" },
                { key: "cementSheetCeiling", label: "Cement Sheet Ceiling" },
                { key: "woodenSlats", label: "Wooden Slats" },
                { key: "metalUpvcCeiling", label: "Metal / UPVC Ceiling" },
                { key: "waterproofCoatRequired", label: "Waterproof Coat Required" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ceiling[key]}
                    onChange={(e) => onChange(id, `ceiling.${key}`, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">{label}</span>
                </label>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-text mb-2">Lighting</label>
                <div className="flex gap-4">
                  {["yes", "no"].map((val) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`lighting-${id}`}
                        value={val}
                        checked={ceiling.lighting === val}
                        onChange={(e) => onChange(id, "ceiling.lighting", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm capitalize">{val}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-2">Fan Point</label>
                <div className="flex gap-4">
                  {["yes", "no"].map((val) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`fanPoint-${id}`}
                        value={val}
                        checked={ceiling.fanPoint === val}
                        onChange={(e) => onChange(id, "ceiling.fanPoint", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm capitalize">{val}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 🪑 6️⃣ CARPENTRY / BUILT-IN ELEMENTS */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">🪑 6️⃣ CARPENTRY / BUILT-IN ELEMENTS</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-text mb-2">Seating Bench</label>
                <div className="flex gap-4 mb-2">
                  {["yes", "no"].map((val) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`seatingBench-${id}`}
                        value={val}
                        checked={carpentryBuiltIn.seatingBench === val}
                        onChange={(e) => onChange(id, "carpentryBuiltIn.seatingBench", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm capitalize">{val}</span>
                    </label>
                  ))}
                </div>
                {carpentryBuiltIn.seatingBench === "yes" && (
                  <div>
                    <label className="block text-xs text-gray-text mb-2">Material</label>
                    <div className="flex flex-wrap gap-3">
                      {["Stone", "Wood", "WPC", "Composite"].map((mat) => (
                        <label key={mat} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`seatingBenchMaterial-${id}`}
                            value={mat}
                            checked={carpentryBuiltIn.seatingBenchMaterial === mat}
                            onChange={(e) => onChange(id, "carpentryBuiltIn.seatingBenchMaterial", e.target.value)}
                            className="w-4 h-4 text-accent focus:ring-accent"
                          />
                          <span className="text-white text-sm">{mat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-2">Storage Unit</label>
                <div className="flex gap-4 mb-2">
                  {["yes", "no"].map((val) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`storageUnit-${id}`}
                        value={val}
                        checked={carpentryBuiltIn.storageUnit === val}
                        onChange={(e) => onChange(id, "carpentryBuiltIn.storageUnit", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm capitalize">{val}</span>
                    </label>
                  ))}
                </div>
                {carpentryBuiltIn.storageUnit === "yes" && (
                  <div>
                    <label className="block text-xs text-gray-text mb-2">Material</label>
                    <div className="flex flex-wrap gap-3">
                      {["Laminate", "PU", "Veneer", "Exterior Ply", "WPC"].map((mat) => (
                        <label key={mat} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`storageUnitMaterial-${id}`}
                            value={mat}
                            checked={carpentryBuiltIn.storageUnitMaterial === mat}
                            onChange={(e) => onChange(id, "carpentryBuiltIn.storageUnitMaterial", e.target.value)}
                            className="w-4 h-4 text-accent focus:ring-accent"
                          />
                          <span className="text-white text-sm">{mat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-2">Other Built-In Options</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: "outdoorCabinet", label: "Outdoor Cabinet" },
                    { key: "planterBox", label: "Planter Box (Built-In)" },
                    { key: "privacyScreen", label: "Privacy Screen / Jaali" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={carpentryBuiltIn[key]}
                        onChange={(e) => onChange(id, `carpentryBuiltIn.${key}`, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                      />
                      <span className="text-white text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {carpentryBuiltIn.privacyScreen && (
                <div>
                  <label className="block text-xs text-gray-text mb-2">Privacy Screen Material</label>
                  <div className="flex flex-wrap gap-3 mb-2">
                    {["Metal", "WPC", "Cement", "Wood", "Other"].map((mat) => (
                      <label key={mat} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`privacyScreenMaterial-${id}`}
                          value={mat}
                          checked={carpentryBuiltIn.privacyScreenMaterial === mat}
                          onChange={(e) => onChange(id, "carpentryBuiltIn.privacyScreenMaterial", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">{mat}</span>
                      </label>
                    ))}
                  </div>
                  {carpentryBuiltIn.privacyScreenMaterial === "Other" && (
                    <input
                      type="text"
                      value={carpentryBuiltIn.privacyScreenMaterialOther}
                      onChange={(e) => onChange(id, "carpentryBuiltIn.privacyScreenMaterialOther", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Specify other material"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 🪑 7️⃣ LOOSE FURNITURE */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">🪑 7️⃣ LOOSE FURNITURE</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={looseFurniture.outdoorChairs}
                      onChange={(e) => onChange(id, "looseFurniture.outdoorChairs", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm">Outdoor Chairs</span>
                  </label>
                  {looseFurniture.outdoorChairs && (
                    <input
                      type="number"
                      value={looseFurniture.outdoorChairsQty}
                      onChange={(e) => onChange(id, "looseFurniture.outdoorChairsQty", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Quantity"
                    />
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={looseFurniture.outdoorTable}
                      onChange={(e) => onChange(id, "looseFurniture.outdoorTable", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-white text-sm">Outdoor Table</span>
                  </label>
                  {looseFurniture.outdoorTable && (
                    <input
                      type="number"
                      value={looseFurniture.outdoorTableQty}
                      onChange={(e) => onChange(id, "looseFurniture.outdoorTableQty", e.target.value)}
                      className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                      placeholder="Quantity"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={looseFurniture.outdoorSofa}
                    onChange={(e) => onChange(id, "looseFurniture.outdoorSofa", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">Outdoor Sofa</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={looseFurniture.swingJhoola}
                    onChange={(e) => onChange(id, "looseFurniture.swingJhoola", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">Swing / Jhoola</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={looseFurniture.weatherproofCushions}
                    onChange={(e) => onChange(id, "looseFurniture.weatherproofCushions", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">Weatherproof Cushions</span>
                </label>
              </div>
              {looseFurniture.swingJhoola && (
                <div>
                  <label className="block text-xs text-gray-text mb-2">Swing Type</label>
                  <div className="flex gap-3">
                    {["Rope", "Wood", "Metal"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`swingType-${id}`}
                          value={type}
                          checked={looseFurniture.swingType === type}
                          onChange={(e) => onChange(id, "looseFurniture.swingType", e.target.value)}
                          className="w-4 h-4 text-accent focus:ring-accent"
                        />
                        <span className="text-white text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 💡 8️⃣ ELECTRICAL */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">💡 8️⃣ ELECTRICAL</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { key: "wallLamps", label: "Wall Lamps" },
                { key: "outdoorSpotlights", label: "Outdoor Spotlights" },
                { key: "outdoorStripLights", label: "Outdoor Strip Lights" },
                { key: "profileLights", label: "Profile Lights" },
                { key: "fanPoint", label: "Fan Point" },
                { key: "heaterPoint", label: "Heater Point" },
                { key: "speakers", label: "Speakers" },
                { key: "cctvCameraPoint", label: "CCTV / Camera Point" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={electrical[key]}
                    onChange={(e) => onChange(id, `electrical.${key}`, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 🚿 9️⃣ WATER / PLUMBING */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">🚿 9️⃣ WATER / PLUMBING</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-text mb-2">Water Tap Required</label>
                <div className="flex gap-4 mb-3">
                  {["yes", "no"].map((val) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`waterTapRequired-${id}`}
                        value={val}
                        checked={waterPlumbing.waterTapRequired === val}
                        onChange={(e) => onChange(id, "waterPlumbing.waterTapRequired", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm capitalize">{val}</span>
                    </label>
                  ))}
                </div>
                {waterPlumbing.waterTapRequired === "yes" && (
                  <div className="mb-3">
                    <label className="block text-xs text-gray-text mb-2">Type</label>
                    <div className="flex gap-3">
                      {["Standard", "Garden Tap", "Nozzle Tap"].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`waterTapType-${id}`}
                            value={type}
                            checked={waterPlumbing.waterTapType === type}
                            onChange={(e) => onChange(id, "waterPlumbing.waterTapType", e.target.value)}
                            className="w-4 h-4 text-accent focus:ring-accent"
                          />
                          <span className="text-white text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-1">Drain Position</label>
                <input
                  type="text"
                  value={waterPlumbing.drainPosition}
                  onChange={(e) => onChange(id, "waterPlumbing.drainPosition", e.target.value)}
                  className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-text mb-2">Re-Routing Required</label>
                <div className="flex gap-4">
                  {["yes", "no"].map((val) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`reRoutingRequired-${id}`}
                        value={val}
                        checked={waterPlumbing.reRoutingRequired === val}
                        onChange={(e) => onChange(id, "waterPlumbing.reRoutingRequired", e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-white text-sm capitalize">{val}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 🌿 🔟 GREENERY / PLANTERS */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">🌿 🔟 GREENERY / PLANTERS</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {[
                { key: "potsRequired", label: "Pots Required (Small / Medium / Large)" },
                { key: "dripIrrigation", label: "Drip Irrigation" },
                { key: "artificialTurf", label: "Artificial Turf" },
                { key: "verticalGarden", label: "Vertical Garden" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={greeneryPlanters[key]}
                    onChange={(e) => onChange(id, `greeneryPlanters.${key}`, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">{label}</span>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-xs text-gray-text mb-1">Material</label>
              <input
                type="text"
                value={greeneryPlanters.material}
                onChange={(e) => onChange(id, "greeneryPlanters.material", e.target.value)}
                className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              />
            </div>
          </div>

          {/* 🛡 1️⃣1️⃣ SAFETY */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">🛡 1️⃣1️⃣ SAFETY</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { key: "childSafetyGrill", label: "Child Safety Grill" },
                { key: "birdNet", label: "Bird Net" },
                { key: "antiSlipCoating", label: "Anti-Slip Coating" },
                { key: "checkRailingHeightCompliance", label: "Check Railing Height Compliance" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safety[key]}
                    onChange={(e) => onChange(id, `safety.${key}`, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-border bg-dark text-accent focus:ring-1 focus:ring-accent cursor-pointer"
                  />
                  <span className="text-white text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 📝 1️⃣2️⃣ NOTES */}
          <div>
            <h4 className="text-accent font-semibold mb-3 text-sm">📝 1️⃣2️⃣ NOTES</h4>
            <textarea
              value={notes}
              onChange={(e) => onChange(id, "notes", e.target.value)}
              className="w-full bg-dark-light border border-gray-border rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition"
              rows="4"
              placeholder="Add any additional notes for this balcony..."
            />
          </div>

        </div>
      )}
    </div>
  );
}

// Helper function to get room-specific furniture options
function getFurnitureOptions(roomName) {
  const furnitureMap = {
    "Living Room": ["TV Unit", "Console", "Side Table", "Display Unit", "Shoe Rack"],
    "Dining Area": ["Crockery Unit", "Bar Unit", "Buffet Unit", "Console"],
    Kitchen: ["Base Units", "Wall Units", "Tall Units", "Loft", "Breakfast Counter"],
    "Domestic Help Room": ["Wardrobe", "Bed", "Storage Unit"],
    Foyer: ["Shoe Rack", "Console", "Mirror Frame", "Storage Bench"],
    "Main Entrance": ["Shoe Rack", "Key Holder", "Console"],
  };

  return furnitureMap[roomName] || ["Storage Unit", "Seating", "Display Unit"];
}

