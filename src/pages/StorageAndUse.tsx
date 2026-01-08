import { useState } from "react";
import type { MouseEvent } from "react";
import { createNavHandlers } from "./help";
import { HelpGuide } from "../components/helpGuides/HelpGuide";
import {
  CheckboxWithInput,
  type CheckboxConfig,
} from "../components/CheckboxWithInput";
import { Alert } from "../components/GlobalWarnings";
import { Input } from "../components/Input";
import { StorageAndUsePage } from "./helpGuide/StorageAndUsePage";

type StorageAndUseProps = {
  onBack?: () => void;
  onNext?: () => void;
};

type Rule<T> = {
  when: (d: T) => boolean;
  text: (d: T) => string;
};

interface FormData {
  // Storage conditions
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

  // Directions for use
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
}

const storageRules: Rule<FormData>[] = [
  {
    when: (d) => d.coolDryConditions,
    text: () => "Store in cool dry conditions.",
  },
  {
    when: (d) => d.refrigerateAfterPurchase,
    text: () => "Refrigerate after purchase.",
  },
  {
    when: (d) => d.refrigerateAfterOpening,
    text: () => "Refrigerate after opening.",
  },
  {
    when: (d) =>
      d.keepRefrigeratedAt &&
      !!d.refrigeratedDegreeFrom &&
      !!d.refrigeratedDegreeTo,
    text: (d) =>
      `Keep refrigerated at ${d.refrigeratedDegreeFrom} °C to ${d.refrigeratedDegreeTo} °C.`,
  },
  {
    when: (d) => d.keepRefrigeratedAtBelow && !!d.refrigeratedDegreeBelow,
    text: (d) =>
      `Keep refrigerated at or below ${d.refrigeratedDegreeBelow} °C.`,
  },
  { when: (d) => d.keepFrozenSolid, text: () => "Keep frozen solid." },
  {
    when: (d) => d.keepFrozenSolidReady,
    text: () => "Keep frozen solid until ready to use.",
  },
  {
    when: (d) => d.otherFrozen && !!d.otherFrozenNote,
    text: (d) => d.otherFrozenNote,
  },
];

const directionsRules: Rule<FormData>[] = [
  { when: (d) => d.washBeforeUse, text: () => "Wash before use." },
  {
    when: (d) => d.storeAirtight,
    text: () => "Once opened, store in an airtight container.",
  },
  { when: (d) => d.shakeWell, text: () => "Shake well before use." },
  {
    when: (d) => d.drainFood,
    text: () => "Food should be drained before consumption.",
  },
  {
    when: (d) => d.keepRefrigerated,
    text: () => "Once opened, keep refrigerated.",
  },
  {
    when: (d) => d.thawBeforeCooking,
    text: () => "Thaw before cooking.",
  },
  {
    when: (d) => d.cookFromFrozen,
    text: () => "Cook from frozen.",
  },
  {
    when: (d) => d.onceThawedDoNotRefreeze,
    text: () => "Once thawed, do not refreeze.",
  },
  {
    when: (d) => d.consumeWithin && !!d.consumeDays,
    text: (d) => `Consume within ${d.consumeDays} days of opening.`,
  },
  {
    when: (d) => d.onceThawedUseWithin && !!d.onceThawedUseWithinDays,
    text: (d) => `Once thawed, use within ${d.onceThawedUseWithinDays} hours.`,
  },
  {
    when: (d) => d.notSuitableMicrowaveCooking,
    text: () => "Not suitable for microwave cooking.",
  },
  {
    when: (d) => d.rawProductMustBeCooked,
    text: () => "This is a raw product and must be cooked before eating.",
  },
  {
    when: (d) => d.cookUntilSteamingHot,
    text: () => "Cook until steaming hot in the middle.",
  },
  {
    when: (d) => d.microwaveOn && !!d.microwavePower && !!d.microwaveMinutes,
    text: (d) =>
      `Microwave on ${d.microwavePower} for ${d.microwaveMinutes} minutes.`,
  },
  {
    when: (d) => d.cautionContentsHot,
    text: () => "Caution, contents may be hot after heating.",
  },
  {
    when: (d) => d.cookFor && !!d.useMinutes && !!d.cookForAt,
    text: (d) => `Cook for ${d.useMinutes} minutes at ${d.cookForAt} °C.`,
  },
  {
    when: (d) => d.allowToStand && !!d.standMinutes,
    text: (d) => `Allow to stand for ${d.standMinutes} minutes before serving.`,
  },
  {
    when: (d) => d.doNotRefrigerateOrReheat,
    text: () => "Do not refrigerate or reheat once heated.",
  },
  {
    when: (d) => d.careTakenRemoveBones,
    text: () =>
      "Care has been taken to remove all bones from this product, however some bones may remain.",
  },
  {
    when: (d) => d.otherDirectionsForUse && !!d.otherDirectionsForUseDetails,
    text: (d) => d.otherDirectionsForUseDetails,
  },
  {
    when: (d) =>
      d.cookingPreparationInstructions &&
      !!d.cookingPreparationInstructionsDetails,
    text: (d) => d.cookingPreparationInstructionsDetails,
  },
];

const buildMessage = <T,>(data: T, rules: Rule<T>[]) =>
  rules
    .filter((r) => r.when(data))
    .map((r) => r.text(data).trim())
    .filter(Boolean)
    .join(" ");

export const StorageAndUse = ({ onBack, onNext }: StorageAndUseProps) => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    // Storage conditions
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

    // Directions for use
    washBeforeUse: false,
    storeAirtight: false,
    shakeWell: false,
    drainFood: false,
    keepRefrigerated: false,
    consumeWithin: false,
    consumeDays: "",
    thawBeforeCooking: false,
    cookFromFrozen: false,
    onceThawedDoNotRefreeze: false,
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
  });

  const generateStorageConditionsMessage = () =>
    buildMessage(formData, storageRules);

  const generateDirectionsForUseMessage = () =>
    buildMessage(formData, directionsRules);

  const { handleBackClick, handleNextClick } = createNavHandlers(
    onNext,
    onBack
  );

  const handleGuideLink = (
    sectionId: string,
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setActiveSectionId(sectionId);
    setGuideOpen(true);
  };

  const toggleInvalidState = (el: HTMLInputElement) => {
    if (el.value.trim()) {
      el.classList.remove("is-invalid");
    } else {
      el.classList.add("is-invalid");
    }
  };

  const toggleMaxValueInvalid = (el: HTMLInputElement, max: number) => {
    const value = el.value.trim();
    const numericValue = Number(value);

    if (!value || Number.isNaN(numericValue) || numericValue > max) {
      el.classList.add("is-invalid");
    } else {
      el.classList.remove("is-invalid");
    }
  };

  const StorageConditionsCheckboxConfigs: CheckboxConfig[] = [
    {
      key: "coolDryConditions",
      label: "Store in cool dry conditions.",
    },
    {
      label: "Refrigerate after opening.",
      key: "refrigerateAfterOpening",
    },
    {
      label: "Refrigerate after purchase.",
      key: "refrigerateAfterPurchase",
    },
    {
      label: "Keep refrigerated at",
      key: "keepRefrigeratedAt",
      inputConfig: {
        inputKey: "refrigeratedDegreeFrom",
        type: "number",
        placeholder: "5",
        suffix: "°C",
      },
      requiredFields: ["refrigeratedDegreeFrom", "refrigeratedDegreeTo"],
      renderChildren: (data, handleChange) => (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span>to</span>
          <Input
            type="number"
            id="refrigeratedDegreeTo"
            value={data?.refrigeratedDegreeTo}
            onChange={(e) =>
              handleChange("refrigeratedDegreeTo", e.target.value)
            }
            onInput={(e) => toggleInvalidState(e.currentTarget)}
            onBlur={(e) => toggleInvalidState(e.currentTarget)}
            suffix="°C"
            required
          />
        </div>
      ),
    },
    {
      label: "Keep refrigerated at or below",
      key: "keepRefrigeratedAtBelow",
      requiredFields: ["refrigeratedDegreeBelow"],
      renderChildren: (data, handleChange) => (
        <Input
          type="number"
          id="refrigeratedDegreeBelow"
          value={data.refrigeratedDegreeBelow}
          onChange={(e) => {
            const nextValue = e.target.value;
            if (!nextValue) {
              handleChange("refrigeratedDegreeBelow", "");
              return;
            }
            const numericValue = Number(nextValue);
            if (Number.isNaN(numericValue)) {
              handleChange("refrigeratedDegreeBelow", nextValue);
              return;
            }
            handleChange("refrigeratedDegreeBelow", numericValue.toString());
          }}
          onInput={(e) => toggleMaxValueInvalid(e.currentTarget, 30)}
          onBlur={(e) => toggleMaxValueInvalid(e.currentTarget, 30)}
          suffix="°C"
          required
          invalidMessage="Keep refrigerated at or below temperature cannot be greater than 30."
        />
      ),
    },

    {
      label: "Keep frozen solid.",
      key: "keepFrozenSolid",
    },
    {
      label: "Keep frozen solid until ready to use.",
      key: "keepFrozenSolidReady",
    },
    {
      label: "Other, please enter.",
      key: "otherFrozen",
      inputConfig: {
        inputKey: "otherFrozenNote",
        textAreaInput: true,
      },
      requiredFields: ["otherFrozenNote"],
    },
  ];

  const DirectionForUseConfigs: CheckboxConfig[] = [
    {
      label: "Wash before use.",
      key: "washBeforeUse",
    },
    {
      label: "Once opened, store in an airtight container.",
      key: "storeAirtight",
    },
    {
      label: "Shake well before use.",
      key: "shakeWell",
    },
    {
      label: "Food should be drained before consumption.",
      key: "drainFood",
    },
    {
      label: "Once opened, keep refrigerated.",
      key: "keepRefrigerated",
    },
    {
      label: "Consume within",
      key: "consumeWithin",
      inputConfig: {
        inputKey: "consumeDays",
        suffix: "days of opening.",
        type: "number",
      },
      requiredFields: ["consumeDays"],
    },
    {
      label: "Thaw before cooking.",
      key: "thawBeforeCooking",
    },
    {
      label: "Cook from frozen.",
      key: "cookFromFrozen",
    },
    {
      label: "Once thawed, do not refreeze.",
      key: "onceThawedDoNotRefreeze",
    },
    {
      label: "Once thawed, use within",
      key: "onceThawedUseWithin",
      requiredFields: ["onceThawedUseWithinDays"],
      renderChildren: (data, handleChange) => (
        <Input
          type="number"
          id="onceThawedUseWithinDays"
          value={data.onceThawedUseWithinDays}
          onChange={(e) => {
            const nextValue = e.target.value;
            if (!nextValue) {
              handleChange("onceThawedUseWithinDays", "");
              return;
            }
            const numericValue = Number(nextValue);
            if (Number.isNaN(numericValue)) {
              handleChange("onceThawedUseWithinDays", nextValue);
              return;
            }
            handleChange("onceThawedUseWithinDays", numericValue.toString());
          }}
          onInput={(e) => toggleMaxValueInvalid(e.currentTarget, 100)}
          onBlur={(e) => toggleMaxValueInvalid(e.currentTarget, 100)}
          suffix="hours."
          required
          invalidMessage="Once thawed, use within hours cannot be greater than 100."
        />
      ),
    },
    {
      label: "Not suitable for microwave cooking.",
      key: "notSuitableMicrowaveCooking",
    },
    {
      label: "This is a raw product and must be cooked before eating.",
      key: "rawProductMustBeCooked",
    },
    {
      label: "Cook until steaming hot in the middle.",
      key: "cookUntilSteamingHot",
    },
    {
      key: "microwaveOn",
      label: "Microwave on",
      inputConfig: {
        inputKey: "microwavePower",
      },
      requiredFields: ["microwavePower", "microwaveMinutes"],
      renderChildren: (data, handleChange) => (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span>for</span>
          <Input
            type="number"
            id="microwaveMinutes"
            value={data.microwaveMinutes}
            onChange={(e) => handleChange("microwaveMinutes", e.target.value)}
            onInput={(e) => toggleInvalidState(e.currentTarget)}
            onBlur={(e) => toggleInvalidState(e.currentTarget)}
            suffix="minutes"
            required
          />
        </div>
      ),
    },
    {
      label: "Caution, contents may be hot after heating.",
      key: "cautionContentsHot",
    },
    {
      label: "Cook for",
      key: "cookFor",
      inputConfig: {
        inputKey: "useMinutes",
        suffix: "minutes",
        type: "number",
      },
      requiredFields: ["useMinutes", "cookForAt"],
      renderChildren: (data, handleChange) => (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span>at</span>
          <Input
            type="number"
            id="cookForAt"
            value={data.cookForAt}
            onChange={(e) => handleChange("cookForAt", e.target.value)}
            onInput={(e) => toggleInvalidState(e.currentTarget)}
            onBlur={(e) => toggleInvalidState(e.currentTarget)}
            suffix="°C"
            invalidMessage="This field is required."
            required
          />
        </div>
      ),
    },
    {
      label: "Allow to stand for",
      key: "allowToStand",
      inputConfig: {
        inputKey: "standMinutes",
        type: "number",
        suffix: "minutes before serving.",
      },
      requiredFields: ["standMinutes"],
    },
    {
      label: "Do not refrigerate or reheat once heated.",
      key: "doNotRefrigerateOrReheat",
    },
    {
      label:
        "Care has been taken to remove all bones from this product, however some bones may remain.",
      key: "careTakenRemoveBones",
    },
    {
      label: "Other directions for use, please enter.",
      key: "otherDirectionsForUse",
      inputConfig: {
        inputKey: "otherDirectionsForUseDetails",
        textAreaInput: true,
      },
      requiredFields: ["otherDirectionsForUseDetails"],
    },
    {
      label: "Cooking / preparation instructions, please enter.",
      key: "cookingPreparationInstructions",
      inputConfig: {
        inputKey: "cookingPreparationInstructionsDetails",
        textAreaInput: true,
      },
      requiredFields: ["cookingPreparationInstructionsDetails"],
    },
  ];

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const hasValue = (value: string | number | null | undefined) =>
    String(value ?? "").trim().length > 0;

  const validateField = (key: keyof FormData) => {
    const rawValue = formData[key];
    if (!hasValue(rawValue as string)) {
      return false;
    }
    if (key === "refrigeratedDegreeBelow") {
      const value = Number(rawValue);
      return !Number.isNaN(value) && value <= 30;
    }
    if (key === "onceThawedUseWithinDays") {
      const value = Number(rawValue);
      return !Number.isNaN(value) && value <= 100;
    }
    return true;
  };

  const missingRequiredInputs = [
    ...StorageConditionsCheckboxConfigs,
    ...DirectionForUseConfigs,
  ].some((config) => {
    const isChecked = Boolean(formData[config.key]);
    if (!isChecked) return false;
    const requiredFields: (keyof FormData)[] = [];
    if (config.inputConfig) {
      requiredFields.push(config.inputConfig.inputKey as keyof FormData);
    }
    if (config.requiredFields) {
      requiredFields.push(...config.requiredFields);
    }
    return requiredFields.some((field) => !validateField(field));
  });

  const isValid = !missingRequiredInputs;

  return (
    <>
      <div>
        <div className="title-image">
          <h1>Date marks</h1>
          <figure style={{ display: "flex" }} className="">
            <figcaption>
              Storage conditions describe how to keep food until its best-before
              or use-by date. <br /> Directions for use are instructions for how
              to prepare the food so that it is ready to eat.
            </figcaption>
            <img
              src="https://www.qld.gov.au/?a=145924"
              alt="Example food label with storage conditions and directions for use."
            />
          </figure>
        </div>

        <div
          style={{ marginBottom: "20px" }}
          className="storage-condition-block"
        >
          <h3>Storage conditions</h3>
          <section>
            <article>
              <b>
                Select the
                <a
                  href="#storage-conditions"
                  onClick={(e) => handleGuideLink("storage-conditions", e)}
                >
                  {" "}
                  storage conditions{" "}
                </a>
                for your food.
              </b>
            </article>
            <article>
              <small>
                If your food has specific storage conditions to make sure it
                will keep until the best-before or use-by date, then you must
                include these on the label. Examples of some storage conditions
                have been included. You may select none, or one or more of
                these, depending on your requirements.
              </small>
            </article>
          </section>

          <div>
            {StorageConditionsCheckboxConfigs.map((config) => (
              <CheckboxWithInput
                key={config.key}
                label={config.label}
                checked={formData[config.key]}
                onChange={(val) => handleCheckboxChange(config.key, val)}
                inputConfig={config.inputConfig}
                inputValue={
                  config.inputConfig
                    ? formData[config.inputConfig.inputKey]
                    : ""
                }
                onInputChange={
                  config.inputConfig
                    ? (val) =>
                        handleInputChange(config.inputConfig?.inputKey, val)
                    : null
                }
              >
                {config.renderChildren &&
                  config.renderChildren(formData, handleInputChange)}
              </CheckboxWithInput>
            ))}
            <Alert
              alertHeading="The storage conditions should be shown on the food label as:"
              alertMessage={
                <>
                  Storage conditions:{" "}
                  <span>{generateStorageConditionsMessage()}</span>
                </>
              }
            />
          </div>
        </div>

        <div className="direction-for-use-block">
          <div>
            <h3>Directions for use</h3>
            <section>
              <article>
                <b>
                  Select the
                  <a
                    href="#directions-for-use"
                    onClick={(e) => handleGuideLink("directions-for-use", e)}
                  >
                    {" "}
                    directions for use{" "}
                  </a>
                  for your food.
                </b>
              </article>
              <article>
                <small>
                  All food must include directions for the use if those
                  directions are required for health or safety reasons. The
                  directions for use are the instructions for how to prepare the
                  food so it is ready to eat. Examples of some directions for
                  use have been included. You may select none, or one or more of
                  these, depending on your requirements.
                </small>
              </article>
            </section>
          </div>

          {DirectionForUseConfigs.map((config) => (
            <CheckboxWithInput
              key={config.key}
              label={config.label}
              checked={formData[config.key]}
              onChange={(val) => handleCheckboxChange(config.key, val)}
              inputConfig={config.inputConfig}
              inputValue={
                config.inputConfig ? formData[config.inputConfig.inputKey] : ""
              }
              onInputChange={
                config.inputConfig
                  ? (val) =>
                      handleInputChange(config.inputConfig?.inputKey, val)
                  : null
              }
            >
              {config.renderChildren &&
                config.renderChildren(formData, handleInputChange)}
            </CheckboxWithInput>
          ))}

          <Alert
            alertHeading="The directions for use should be shown on the food label as:"
            alertMessage={
              <>
                Directions for use: Allow to stand for
                <span>{generateDirectionsForUseMessage()}</span>
              </>
            }
          />
        </div>
      </div>

      <div
        className="page-navigation-block"
        style={{ display: "flex", gap: "20px", marginTop: "20px" }}
      >
        <a className="btn btn-primary" role="button" onClick={handleBackClick}>
          <span className="btn-label-default">Back</span>
        </a>

        <a
          className="btn btn-primary"
          role="button"
          onClick={handleNextClick}
          aria-disabled={!isValid}
          style={
            !isValid
              ? { pointerEvents: "none", opacity: 0.65, color: "white" }
              : undefined
          }
        >
          <span className="btn-label-default">Next</span>
        </a>

        <a
          className="btn btn-tertiary"
          target="_blank"
          data-progress-label="Loading"
        >
          <span className="btn-label-default">Cancel</span>
        </a>
      </div>

      <HelpGuide
        initialOpen={guideOpen}
        onOpenChange={setGuideOpen}
        open={guideOpen}
        content={<StorageAndUsePage activeSectionId={activeSectionId} />}
      />
    </>
  );
};
