import React, { useRef, useState } from "react";
import { createNavHandlers } from "./help";
import { BusinessDetailsPage } from "./helpGuide/BusinessDetailsPage";
import { useFormData } from "../context/FormDataContext";
import { HelpGuides } from "../components/helpGuides/Helpguides";

type BusinessDetailsProps = {
  onBack?: () => void;
  onNext?: () => void;
  onCancel?: () => void;
};

export const BusinessDetails = ({
  onBack,
  onNext,
  onCancel,
}: BusinessDetailsProps) => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const { formData, updateBusinessDetails } = useFormData();
  const {
    businessName,
    businessAddress,
    addressLine1,
    addressLine2,
    suburb,
    stateValue,
    postcode,
  } = formData.businessDetails;
  const formRef = useRef<HTMLFormElement>(null);

  const isValid =
    businessName.trim() &&
    businessAddress.trim() &&
    addressLine1.trim() &&
    suburb.trim() &&
    stateValue.trim() &&
    postcode.trim();

  const { handleBackClick, handleCancelClick } = createNavHandlers(
    undefined,
    onBack,
    onCancel
  );

  const handleGuideLink = (
    sectionId: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setActiveSectionId(sectionId);
    setGuideOpen(true);
  };

  const toggleInvalidState = (el: HTMLInputElement | HTMLSelectElement) => {
    if (el.value.trim()) {
      el.classList.remove("is-invalid");
    } else {
      el.classList.add("is-invalid");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    onNext?.();
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <div>
          <h1>Business details</h1>
          <figure className="d-flex flex-column flex-lg-row gap-3 align-items-start">
            <figcaption>
              Food labels must include the business details (name and address)
              of the supplier on the label. <br /> A supplier is a business
              which packs, manufactures, sells or imports food.{" "}
              <a
                href="#business-details"
                onClick={(e) => handleGuideLink("business-details", e)}
              >
                Business details
              </a>{" "}
              help consumers, other businesses and government agencies know who
              to contact in the event of a complaint or food recall.
            </figcaption>
            <img
              className="image-ratio-2x3 position-x-center position-y-center img-fluid"
              src="https://www.qld.gov.au/?a=145919"
              alt="Example food label with the business name and the street address of the food business."
            ></img>
          </figure>
        </div>

        <div className="d-flex flex-column gap-4">
          <div className="business-name">
            <label className="qld-text-input-label field-required ">
              Business name
            </label>

            <span className="qld-hint-text">
              This is the name of the food business that is the supplier,
              manufacturer, packer, vendor or importer of the food.
            </span>

            <input
              className="form-control"
              type="text"
              tabIndex={0}
              value={businessName}
              onChange={(e) =>
                updateBusinessDetails({ businessName: e.target.value })
              }
              onInput={(e) => toggleInvalidState(e.currentTarget)}
              onBlur={(e) => toggleInvalidState(e.currentTarget)}
              required
            />
            <div className="invalid-feedback">Business name is required</div>
          </div>
          <div className="business-address">
            <label className="qld-text-input-label field-required ">
              Business address
            </label>

            <span className="qld-hint-text">
              A business address is the street address, or a description of the
              location, of the premises, where the business is operating in
              Australia. A post office box or similar is not allowed.
            </span>

            <input
              className="form-control"
              type="text"
              tabIndex={0}
              value={businessAddress}
              onChange={(e) =>
                updateBusinessDetails({ businessAddress: e.target.value })
              }
              onInput={(e) => toggleInvalidState(e.currentTarget)}
              onBlur={(e) => toggleInvalidState(e.currentTarget)}
              required
            />
            <div className="invalid-feedback">Business address is required</div>
          </div>

          <div className="address-line1">
            <label className="qld-text-input-label field-required ">
              Address line 1
            </label>
            <input
              className="form-control"
              type="text"
              placeholder=""
              tabIndex={0}
              value={addressLine1}
              onChange={(e) =>
                updateBusinessDetails({ addressLine1: e.target.value })
              }
              onInput={(e) => toggleInvalidState(e.currentTarget)}
              onBlur={(e) => toggleInvalidState(e.currentTarget)}
              required
            />
            <div className="invalid-feedback">Address line 1 is required</div>
          </div>

          <div className="address-line2">
            <label
              className="qld-text-input-label"
              htmlFor="address-line2-input"
            >
              Address line 2
            </label>
            <input
              className="form-control"
              id="address-line2-input"
              type="text"
              placeholder=""
              tabIndex={0}
              value={addressLine2}
              onChange={(e) =>
                updateBusinessDetails({ addressLine2: e.target.value })
              }
            />
          </div>

          <div className="suburb-town-city">
            <label className="qld-text-input-label field-required ">
              Suburb, town or city
            </label>

            <input
              className="form-control"
              type="text"
              tabIndex={0}
              value={suburb}
              onChange={(e) =>
                updateBusinessDetails({ suburb: e.target.value })
              }
              onInput={(e) => toggleInvalidState(e.currentTarget)}
              onBlur={(e) => toggleInvalidState(e.currentTarget)}
              required
            />
            <div className="invalid-feedback">
              Suburb, town or city is required
            </div>
          </div>

          <div className="state ">
            <label className="qld-text-input-label field-required ">
              State
            </label>

            <select
              className="form-select"
              aria-describedby="example-1-hint"
              tabIndex={0}
              value={stateValue}
              onChange={(e) => {
                updateBusinessDetails({ stateValue: e.target.value });
                toggleInvalidState(e.currentTarget);
              }}
              onBlur={(e) => toggleInvalidState(e.currentTarget)}
              required
              title="Please select a state"
            >
              <option value="">Please select</option>
              <option value="NSW">New South Wales</option>
              <option value="ACT">Australian Capital Territory</option>
              <option value="NT">Northern Territory</option>
              <option value="QLD">Queensland</option>
              <option value="SA">South Australia</option>
              <option value="TAS">Tasmania</option>
              <option value="VIC">Victoria</option>
              <option value="WA">Western Australia</option>
            </select>
            <div className="invalid-feedback">State is required</div>
          </div>

          <div className="postcode">
            <label className="qld-text-input-label field-required ">
              Postcode
            </label>

            <input
              className="form-control"
              type="text"
              inputMode="numeric"
              pattern="\d{1,4}"
              maxLength={4}
              onInput={(e) => {
                const target = e.currentTarget;
                target.value = target.value.replace(/\D/g, "").slice(0, 4);
                toggleInvalidState(target);
              }}
              value={postcode}
              onChange={(e) =>
                updateBusinessDetails({ postcode: e.target.value })
              }
              onBlur={(e) => toggleInvalidState(e.currentTarget)}
              required
            />
            <div className="invalid-feedback">Postcode is required</div>
          </div>
        </div>

        <div className="page-navigation-block d-flex flex-wrap gap-3 mt-3">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleBackClick}
          >
            <span className="btn-label-default">Back</span>
          </button>

          <button
            className="btn btn-primary"
            type="submit"
            aria-disabled={!isValid}
            disabled={!isValid}
          >
            <span className="btn-label-default">Next</span>
          </button>

          <a
            className="btn btn-tertiary"
            target="_blank"
            data-progress-label="Loading"
            onClick={handleCancelClick}
          >
            <span className="btn-label-default">Cancel</span>
          </a>
        </div>
      </form>

      <HelpGuides
        initialOpen={false}
        content={<BusinessDetailsPage activeSectionId={activeSectionId} />}
        onOpenChange={setGuideOpen}
        open={guideOpen}
      />
    </>
  );
};
