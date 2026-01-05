export const SeekProAdvice = () => {
  return (
    <div
      className="alert alert-warning"
      role="alert"
      aria-label="Warning alert"
    >
      <h2 className="alert-heading">Seek professional advice</h2>
      <p>
        Thank you for your interest in Label Buster. Unfortunately, Label Buster
        does not provide labelling information for these drinks. We recommend
        you seek professional advice from a food labelling consultant to prepare
        your food label.
      </p>
    </div>
  );
};

type InfoAlertProps = {
  alertHeading: string;
  alertMessage: React.ReactNode;
  alertLink?: boolean;
};

export const InfoAlert = ({
  alertHeading,
  alertMessage,
  alertLink,
}: InfoAlertProps) => {
  return (
    <div
      className="alert alert-info"
      style={{ maxWidth: "1000px" }}
      role="alert"
      aria-label="Success alert"
    >
      <h2 className="alert-heading">{alertHeading}</h2>
      <p>
        {alertMessage}
        {alertLink && <a href="#">Find out more</a>}
      </p>
    </div>
  );
};

type WarningAlertProps = {
  alertHeading: string;
  alertMessage: React.ReactNode;
  alertLink?: boolean;
};

export const WarningAlert = ({
  alertHeading,
  alertMessage,
  alertLink,
}: WarningAlertProps) => {
  return (
    <div
      className="alert alert-warning "
      role="alert"
      aria-label="Success alert"
      style={{ maxWidth: "1000px" }}

    >
      <h2 className="alert-heading">{alertHeading}</h2>
      <p>
        {alertMessage}
        {alertLink && <a href="#">Find out more</a>}
      </p>
    </div>
  );
};
