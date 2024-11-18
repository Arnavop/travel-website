import React, { useState } from 'react';

export function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded mb-2">
      <button
        className="w-full p-4 font-bold text-left bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && (
        <div className="p-4 border-t bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

export function AccordionItem({ title, children }) {
  return <Accordion title={title}>{children}</Accordion>;
}

export function AccordionTrigger({ title, onClick }) {
  return (
    <button onClick={onClick} className="font-bold">
      {title}
    </button>
  );
}

export function AccordionContent({ children }) {
  return <div>{children}</div>;
}
