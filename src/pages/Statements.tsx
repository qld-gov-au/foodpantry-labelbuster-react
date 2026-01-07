import React from 'react'

type StatementsProps = {
  onBack?: () => void;
  onNext?: () => void;
};


export const Statements = ({onBack,onNext}:StatementsProps) => {
  return (
    <div>Statements</div>
  )
}
