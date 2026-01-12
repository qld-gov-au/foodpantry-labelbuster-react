import React, { createContext, useContext, useEffect, useState } from "react";

export type FoodNameData = {
  foodName: string;
  productDescription: string;
  ingredientHighlightChoice: string | null;
  followChoice: string | null;
};

export type BusinessDetailsData = {
  businessName: string;
  businessAddress: string;
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  stateValue: string;
  postcode: string;
};

export type IngredientsFormState = {
  ingredientInName: "1" | "2" | null;
  ingredientMakeFood: "1" | "2" | null;
  ingredientAlternative: "1" | "2" | null;
  ingredientGenericName: "1" | "2" | null;
  foodAdditives: "1" | "2" | null;
  exemptIngredients: "1" | "2" | null;
};

export type IngredientsData = {
  ingredientRows: string[][];
  form: IngredientsFormState;
};

export type DateMarksData = {
  shelfLife2DaysChoice: string | null;
  shelfLife7DaysChoice: string | null;
  shelfLifeCertainDaysChoice: string | null;
  dateMarkType: string | null;
  dateValue: string;
  lotIdentification: string;
};

export type StorageAndUseData = {
  coolDryConditions: boolean;
  refrigerateAfterOpening: boolean;
  refrigerateAfterPurchase: boolean;
  keepRefrigeratedAt: boolean;
  refrigeratedDegreeFrom: string;
  refrigeratedDegreeTo: string;
  refrigeratedDegreeBelow: string;
  keepRefrigeratedAtBelow: boolean;
  keepFrozenSolid: boolean;
  keepFrozenSolidReady: boolean;
  otherFrozen: boolean;
  otherFrozenNote: string;
  washBeforeUse: boolean;
  storeAirtight: boolean;
  shakeWell: boolean;
  drainFood: boolean;
  keepRefrigerated: boolean;
  consumeWithin: boolean;
  thawBeforeCooking: boolean;
  cookFromFrozen: boolean;
  onceThawedDoNotRefreeze: boolean;
  consumeDays: string;
  onceThawedUseWithin: boolean;
  onceThawedUseWithinDays: string;
  notSuitableMicrowaveCooking: boolean;
  rawProductMustBeCooked: boolean;
  cookUntilSteamingHot: boolean;
  microwaveOn: boolean;
  microwavePower: string;
  microwaveMinutes: string;
  cautionContentsHot: boolean;
  cookFor: boolean;
  useMinutes: string;
  cookForAt: string;
  allowToStand: boolean;
  standMinutes: string;
  doNotRefrigerateOrReheat: boolean;
  careTakenRemoveBones: boolean;
  otherDirectionsForUse: boolean;
  otherDirectionsForUseDetails: string;
  cookingPreparationInstructions: boolean;
  cookingPreparationInstructionsDetails: string;
};

export type StatementsFormData = {
  cerealsContainingGluten: string;
  wheat: string;
  egg: string;
  crustaceaCereals: string;
  fish: string;
  mollusc: string;
  addedSulphites: string;
  lupin: string;
  soybeans: string;
  milk: string;
  almond: string;
  brazilNut: string;
  cashew: string;
  hazelnut: string;
  macadamia: string;
  peanuts: string;
  pecan: string;
  pineNut: string;
  pistachio: string;
  sesameSeed: string;
  walnut: string;
  eggAndEggProducts: string;
  fishCrustaceaSeafood: string;
  foodAdditivesAndFlavours: string;
  foodContainingAlcohol: string;
  honeyAndBeeProducts: string;
  kavaAndKavaRoot: string;
  legumesAndPulses: string;
  meatAndMeatProducts: string;
  milkDairyAndDairyAlternatives: string;
  nonAlcoholicDrinks: string;
  oilsAndMargarine: string;
  saltAndSaltSubstitutes: string;
};

export type StatementsData = {
  form: StatementsFormData;
  statementSelections: Record<string, boolean>;
  sodiumPotassiumContent: string;
};

export type StepKey =
  | "terms"
  | "about"
  | "limitations"
  | "foodName"
  | "businessDetails"
  | "dateMarks"
  | "storageUse"
  | "ingredients"
  | "statements"
  | "yourLabel";

export type ProgressData = {
  started: boolean;
} & Record<StepKey, boolean>;

export type FormData = {
  foodName: FoodNameData;
  businessDetails: BusinessDetailsData;
  ingredients: IngredientsData;
  dateMarks: DateMarksData;
  storageAndUse: StorageAndUseData;
  statements: StatementsData;
};

type FormDataContextValue = {
  formData: FormData;
  progress: ProgressData;
  updateFoodName: (updates: Partial<FoodNameData>) => void;
  updateBusinessDetails: (updates: Partial<BusinessDetailsData>) => void;
  updateIngredients: (updates: Partial<IngredientsData>) => void;
  updateDateMarks: (updates: Partial<DateMarksData>) => void;
  updateStorageAndUse: (updates: Partial<StorageAndUseData>) => void;
  updateStatements: (updates: Partial<StatementsData>) => void;
  startSession: () => void;
  completeStep: (step: StepKey) => void;
  resetProgress: () => void;
};

const FormDataContext = createContext<FormDataContextValue | null>(null);
const PROGRESS_STORAGE_KEY = "label-buster-progress";

const getDefaultProgress = (): ProgressData => ({
  started: false,
  terms: false,
  about: false,
  limitations: false,
  foodName: false,
  businessDetails: false,
  dateMarks: false,
  storageUse: false,
  ingredients: false,
  statements: false,
  yourLabel: false,
});

const initialFormData: FormData = {
  foodName: {
    foodName: "",
    productDescription: "",
    ingredientHighlightChoice: null,
    followChoice: null,
  },
  businessDetails: {
    businessName: "",
    businessAddress: "",
    addressLine1: "",
    addressLine2: "",
    suburb: "",
    stateValue: "",
    postcode: "",
  },
  ingredients: {
    ingredientRows: [[""]],
    form: {
      ingredientInName: null,
      ingredientMakeFood: null,
      ingredientAlternative: null,
      ingredientGenericName: null,
      foodAdditives: null,
      exemptIngredients: null,
    },
  },
  dateMarks: {
    shelfLife2DaysChoice: null,
    shelfLife7DaysChoice: null,
    shelfLifeCertainDaysChoice: null,
    dateMarkType: null,
    dateValue: "",
    lotIdentification: "",
  },
  storageAndUse: {
    coolDryConditions: false,
    refrigerateAfterOpening: false,
    refrigerateAfterPurchase: false,
    keepRefrigeratedAt: false,
    refrigeratedDegreeFrom: "",
    refrigeratedDegreeTo: "",
    keepRefrigeratedAtBelow: false,
    refrigeratedDegreeBelow: "",
    keepFrozenSolid: false,
    keepFrozenSolidReady: false,
    otherFrozen: false,
    otherFrozenNote: "",
    washBeforeUse: false,
    storeAirtight: false,
    shakeWell: false,
    drainFood: false,
    keepRefrigerated: false,
    consumeWithin: false,
    thawBeforeCooking: false,
    cookFromFrozen: false,
    onceThawedDoNotRefreeze: false,
    consumeDays: "",
    onceThawedUseWithin: false,
    onceThawedUseWithinDays: "",
    notSuitableMicrowaveCooking: false,
    rawProductMustBeCooked: false,
    cookUntilSteamingHot: false,
    microwaveOn: false,
    microwavePower: "",
    microwaveMinutes: "",
    cautionContentsHot: false,
    cookFor: false,
    useMinutes: "",
    cookForAt: "",
    allowToStand: false,
    standMinutes: "",
    doNotRefrigerateOrReheat: false,
    careTakenRemoveBones: false,
    otherDirectionsForUse: false,
    otherDirectionsForUseDetails: "",
    cookingPreparationInstructions: false,
    cookingPreparationInstructionsDetails: "",
  },
  statements: {
    form: {
      cerealsContainingGluten: "",
      wheat: "",
      egg: "",
      crustaceaCereals: "",
      fish: "",
      mollusc: "",
      addedSulphites: "",
      lupin: "",
      soybeans: "",
      milk: "",
      almond: "",
      brazilNut: "",
      cashew: "",
      hazelnut: "",
      macadamia: "",
      peanuts: "",
      pecan: "",
      pineNut: "",
      pistachio: "",
      sesameSeed: "",
      walnut: "",
      eggAndEggProducts: "",
      fishCrustaceaSeafood: "",
      foodAdditivesAndFlavours: "",
      foodContainingAlcohol: "",
      honeyAndBeeProducts: "",
      kavaAndKavaRoot: "",
      legumesAndPulses: "",
      meatAndMeatProducts: "",
      milkDairyAndDairyAlternatives: "",
      nonAlcoholicDrinks: "",
      oilsAndMargarine: "",
      saltAndSaltSubstitutes: "",
    },
    statementSelections: {},
    sodiumPotassiumContent: "",
  },
};

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [progress, setProgress] = useState<ProgressData>(() => {
    const fallback = getDefaultProgress();
    try {
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!stored) {
        return fallback;
      }
      const parsed = JSON.parse(stored) as Partial<ProgressData>;
      return { ...fallback, ...parsed };
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateFoodName = (updates: Partial<FoodNameData>) => {
    setFormData((prev) => ({
      ...prev,
      foodName: { ...prev.foodName, ...updates },
    }));
  };

  const updateBusinessDetails = (updates: Partial<BusinessDetailsData>) => {
    setFormData((prev) => ({
      ...prev,
      businessDetails: { ...prev.businessDetails, ...updates },
    }));
  };

  const updateIngredients = (updates: Partial<IngredientsData>) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: { ...prev.ingredients, ...updates },
    }));
  };

  const updateDateMarks = (updates: Partial<DateMarksData>) => {
    setFormData((prev) => ({
      ...prev,
      dateMarks: { ...prev.dateMarks, ...updates },
    }));
  };

  const updateStorageAndUse = (updates: Partial<StorageAndUseData>) => {
    setFormData((prev) => ({
      ...prev,
      storageAndUse: { ...prev.storageAndUse, ...updates },
    }));
  };

  const updateStatements = (updates: Partial<StatementsData>) => {
    setFormData((prev) => ({
      ...prev,
      statements: { ...prev.statements, ...updates },
    }));
  };

  const startSession = () => {
    setProgress((prev) => ({ ...prev, started: true }));
  };

  const completeStep = (step: StepKey) => {
    setProgress((prev) => {
      if (prev[step]) {
        return prev;
      }
      return { ...prev, [step]: true };
    });
  };

  const resetProgress = () => {
    setProgress(getDefaultProgress());
  };

  const value: FormDataContextValue = {
    formData,
    progress,
    updateFoodName,
    updateBusinessDetails,
    updateIngredients,
    updateDateMarks,
    updateStorageAndUse,
    updateStatements,
    startSession,
    completeStep,
    resetProgress,
  };

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within FormDataProvider");
  }
  return context;
};
