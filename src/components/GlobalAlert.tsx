type AlertVariant = "info" | "warning" | "success";

type AlertProps = {
  alertHeading: string;
  alertMessage: React.ReactNode;
  alertLink?: string;
  variant?: AlertVariant;
};

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

export const Alert = ({
  alertHeading,
  alertMessage,
  alertLink,
  variant = "info",
}: AlertProps) => {
  return (
    <div
      className={`alert alert-${variant}`}
      role="alert"
      aria-label={`${variant} alert`}
    >
      <h2 className="alert-heading">{alertHeading}</h2>
      <div>
        {alertMessage}
        {alertLink && <a href={alertLink}>Find out more</a>}
      </div>
    </div>
  );
};
