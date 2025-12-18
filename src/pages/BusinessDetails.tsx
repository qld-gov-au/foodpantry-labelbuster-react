import React, { useState } from "react";
import { createNavHandlers } from "./help";

type BusinessDetailsProps = {
  onBack?: () => void;
  onNext?: () => void;
};

export const BusinessDetails = ({ onBack, onNext }: BusinessDetailsProps) => {
  const { handleBackClick } = createNavHandlers(undefined, onBack);
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [suburb, setSuburb] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [postcode, setPostcode] = useState("");

  const isValid =
    businessName.trim() &&
    businessAddress.trim() &&
    addressLine1.trim() &&
    suburb.trim() &&
    stateValue.trim() &&
    postcode.trim();

  const handleNext = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!isValid) return;
    onNext?.();
  };
    
  return (
    <>
      <div>
        <h1>Business details</h1>
        <figure style={{ display: "flex" }} className="">
          <figcaption>
            Food labels must include the business details (name and address) of
            the supplier on the label. <br /> A supplier is a business which
            packs, manufactures, sells or imports food.{" "}
            <a href="">Business details</a> help <br />
            consumers, other businesses and government agencies know who to
            contact in the event of a <br />
            complaint or food recall.
          </figcaption>
          <img
            className="image-ratio-2x3  position-x-center position-y-center"
            src="https://www.qld.gov.au/?a=145919"
            alt="Example food label with the business name and the street address of the food business."
          ></img>
        </figure>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div className="business-name">
          <label className="qld-text-input-label field-required ">
            Business name
          </label>

          <span className="qld-hint-text">
            This is the name of the food business that is the supplier,
            manufacturer, packer, vendor or importer of the food.
          </span>

          <div className="valid-feedback">Success message</div>

          <div className="invalid-feedback">Error message</div>

          <input
            className="form-control   "
            type="text"
            placeholder=""
            tabIndex={0}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
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

          <div className="valid-feedback">Success message</div>

          <div className="invalid-feedback">Error message</div>

          <input
            className="form-control   "
            type="text"
            placeholder=""
            tabIndex={0}
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            required
          />
        </div>

        <div className="address-line1">
          <label className="qld-text-input-label field-required ">
            Address line 1
          </label>

          <div className="valid-feedback">Success message</div>
          <div className="invalid-feedback">Error message</div>

          <input
            className="form-control   "
            type="text"
            placeholder=""
            tabIndex={0}
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />
        </div>

        <div className="address-line2">
          <label className="qld-text-input-label">Address line 2</label>

          <div className="valid-feedback">Success message</div>
          <div className="invalid-feedback">Error message</div>

          <input
            className="form-control   "
            type="text"
            placeholder=""
            tabIndex={0}
          />
        </div>

        <div className="suburb-town-city">
          <label className="qld-text-input-label field-required ">
            Suburb, town or city
          </label>

          <div className="valid-feedback">Success message</div>
          <div className="invalid-feedback">Error message</div>

          <input
            className="form-control   "
            type="text"
            placeholder=""
            tabIndex={0}
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            required
          />
        </div>

        <div className="state ">
          <label className="qld-text-input-label field-required ">State</label>

          <div className="valid-feedback">Success message</div>
          <div className="invalid-feedback">Error message</div>

          <select
            className="form-select   "
            aria-describedby="example-1-hint"
            tabIndex={0}
            value={stateValue}
            onChange={(e) => setStateValue(e.target.value)}
            required
          >
            <option selected value="">
              Please select
            </option>
            <option value="NSW">New South Wales</option>
            <option value="ACT">Australian Capital Territory</option>
            <option value="NT">Northern Territory</option>
            <option value="QLD">Queensland</option>
            <option value="SA">South Australia</option>
            <option value="TAS">Tasmania</option>
            <option value="VIC">Victoria</option>
            <option value="WA">Western Australia</option>
          </select>
        </div>

        <div className="postcode">
          <label className="qld-text-input-label field-required ">
            Postcode
          </label>

          <div className="valid-feedback">Success message</div>
          <div className="invalid-feedback">Error message</div>

          <input
            className="form-control"
            type="text"
            inputMode="numeric"
            pattern="\d{1,4}"
            maxLength={4}
            onInput={(e) => {
              const target = e.currentTarget;
              target.value = target.value.replace(/\D/g, "").slice(0, 4);
            }}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
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
          onClick={handleNext}
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
    </>
  );
};
