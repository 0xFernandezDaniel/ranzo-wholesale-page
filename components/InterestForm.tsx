"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { ArrowRight, Check, X } from "lucide-react";

import Blank from "./Blank";

/**
 * The wholesale interest form (RAN-52). Two steps: the button opens the
 * form, nothing is typed before that click. Six fields in the brief's order,
 * then the thank-you screen. Design only: nothing is sent anywhere. Daniel
 * wires the submit into the B2B system when the page is ported.
 */

const OpenFormContext = createContext<() => void>(() => {});

const BUTTON_LABEL = "Get wholesale pricing";

// The brief's six fields, in its order. Neither the brief nor RAN-52 marks
// any of them optional, so all six are required.
const FIELD_NAMES = ["company", "contactName", "phone", "email", "shipToZip", "heardFrom"] as const;
type FieldName = (typeof FIELD_NAMES)[number];
type Errors = Partial<Record<FieldName, string>>;

/** Returns a short plain message, or undefined when the value is fine. */
function validate(name: FieldName, raw: string): string | undefined {
  const value = raw.trim();
  switch (name) {
    case "company":
      return value ? undefined : "Enter your company name.";
    case "contactName":
      return value ? undefined : "Enter a contact name.";
    case "phone": {
      if (!value) return "Enter a phone number.";
      const digits = value.replace(/\D/g, "");
      const ok = digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
      return ok ? undefined : "Enter a 10-digit phone number.";
    }
    case "email":
      if (!value) return "Enter an email address.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? undefined : "Enter a valid email address.";
    case "shipToZip":
      if (!value) return "Enter the ship-to ZIP code.";
      return /^\d{5}(-\d{4})?$/.test(value) ? undefined : "Enter a 5-digit ZIP code.";
    case "heardFrom":
      return value ? undefined : "Choose one.";
  }
}

const controlClass =
  "mt-1.5 block h-[2.875rem] w-full rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-base font-normal text-gray-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/25 aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/20";

function Field({
  name,
  label,
  error,
  children,
}: {
  name: FieldName;
  label: string;
  error?: string;
  /** Receives the props that tie the control to its label and message. */
  children: (control: {
    id: string;
    name: FieldName;
    className: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
}) {
  const id = `interest-${name}`;
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-accent-500">
        {label}
      </label>
      {children({
        id,
        name,
        className: controlClass,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} className="mt-1 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function InterestFormProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const open = useCallback(() => {
    dialogRef.current?.showModal();
    // showModal() would focus the close button (first in the markup). Put the
    // cursor in Company instead, or on the heading once the form is sent.
    (companyRef.current ?? thanksRef.current)?.focus();
  }, []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    if (sent) thanksRef.current?.focus();
  }, [sent]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Design only: no request is made.
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found: Errors = {};
    for (const name of FIELD_NAMES) {
      const message = validate(name, String(data.get(name) ?? ""));
      if (message) found[name] = message;
    }
    setErrors(found);
    const firstInvalid = FIELD_NAMES.find((name) => found[name]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    setSent(true);
  }

  // Once a field has shown a message, re-check it as the buyer corrects it.
  function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    const { name, value } = event.target as unknown as { name: FieldName; value: string };
    if (!errors[name]) return;
    setErrors((current) => ({ ...current, [name]: validate(name, value) }));
  }

  return (
    <OpenFormContext.Provider value={open}>
      {children}

      {/* Sized to its content and centred (h-fit + m-auto). If the content is
          taller than the screen, it scrolls inside the dialog. */}
      <dialog
        ref={dialogRef}
        aria-labelledby="interest-form-title"
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto h-fit max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-[28.75rem] overflow-y-auto overscroll-contain rounded-2xl bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-accent-900/70 sm:max-h-[calc(100dvh-3rem)]"
      >
        <div className="relative px-5 pb-6 pt-6 sm:px-8 sm:pb-7 sm:pt-7">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-accent-500"
          >
            <X className="h-5 w-5" />
          </button>

          {sent ? (
            <ThankYou headingRef={thanksRef} onClose={close} />
          ) : (
            <form noValidate onSubmit={handleSubmit} onChange={handleChange}>
              <h2
                id="interest-form-title"
                className="pr-10 text-2xl font-extrabold tracking-tight text-accent-500"
              >
                Get wholesale pricing
              </h2>
              <p className="mt-2 text-base leading-snug text-gray-600">
                Six fields and we call you. We reach out within the hour,
                Monday to Friday, 9 to 6 Eastern.
              </p>

              {/* One column on a phone. From the sm breakpoint the dialog is
                  about 460px wide: Phone and Email keep a full row each so a
                  long email address has room, and ZIP pairs with the dropdown. */}
              <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field name="company" label="Company" error={errors.company}>
                    {(control) => (
                      <input
                        {...control}
                        ref={companyRef}
                        type="text"
                        autoComplete="organization"
                        autoCapitalize="words"
                        spellCheck={false}
                        enterKeyHint="next"
                      />
                    )}
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field name="contactName" label="Contact name" error={errors.contactName}>
                    {(control) => (
                      <input
                        {...control}
                        type="text"
                        autoComplete="name"
                        autoCapitalize="words"
                        spellCheck={false}
                        enterKeyHint="next"
                      />
                    )}
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field name="phone" label="Phone" error={errors.phone}>
                    {(control) => (
                      <input {...control} type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" />
                    )}
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field name="email" label="Email" error={errors.email}>
                    {(control) => (
                      <input
                        {...control}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        enterKeyHint="next"
                      />
                    )}
                  </Field>
                </div>
                <Field name="shipToZip" label="Ship-to ZIP" error={errors.shipToZip}>
                  {(control) => (
                    <input
                      {...control}
                      type="text"
                      inputMode="numeric"
                      autoComplete="shipping postal-code"
                      maxLength={10}
                      enterKeyHint="next"
                    />
                  )}
                </Field>
                <Field name="heardFrom" label="How did you hear of us?" error={errors.heardFrom}>
                  {(control) => (
                    <select {...control} defaultValue="">
                      <option value="" disabled>
                        Select one
                      </option>
                      {/* BLANK: the dropdown's options are agreed in RAN-39. */}
                      <option value="blank-1">To come: option 1</option>
                      <option value="blank-2">To come: option 2</option>
                      <option value="blank-3">To come: option 3</option>
                    </select>
                  )}
                </Field>
                <p className="text-sm sm:col-span-2">
                  <Blank source="review, RAN-39">dropdown options</Blank>
                </p>
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 py-3.5 text-lg font-bold text-white transition-colors hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                {BUTTON_LABEL}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
              <p className="mt-3 text-center text-sm text-gray-500">
                Business buyers only. Resale certificate required.
              </p>
            </form>
          )}
        </div>
      </dialog>
    </OpenFormContext.Provider>
  );
}

function ThankYou({
  headingRef,
  onClose,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onClose: () => void;
}) {
  return (
    <div>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500">
        <Check className="h-6 w-6" strokeWidth={3} aria-hidden />
      </span>
      <h2
        ref={headingRef}
        tabIndex={-1}
        id="interest-form-title"
        className="mt-5 text-2xl font-extrabold tracking-tight text-accent-500 outline-none"
      >
        Thank you.
      </h2>
      {/* RAN-52's thank-you wording. */}
      <p className="mt-2 text-base leading-relaxed text-gray-700">
        Someone from Ranzo will reach out within the hour, Monday to Friday,
        9 to 6 Eastern.
      </p>

      {/* The only place WhatsApp appears on the page (RAN-52). */}
      <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-5">
        <h3 className="text-base font-bold text-accent-500">
          Join the WhatsApp deals channel
        </h3>
        {/* From RAN-53: the channel is "for promotional pricing posts to
            wholesale buyers". */}
        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          Promotional pricing posts for wholesale buyers.
        </p>
        <span
          aria-disabled
          className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border border-dashed border-stone-300 bg-white px-5 py-3 text-base font-bold text-stone-400"
        >
          Join the channel
        </span>
        <p className="mt-2 text-sm">
          <Blank source="Daniel, RAN-53">WhatsApp channel invite link</Blank>
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-6 w-full rounded-lg border border-stone-300 px-6 py-3 text-base font-bold text-accent-500 transition-colors hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
      >
        Close
      </button>
    </div>
  );
}

/** The page's one call to action. Every instance opens the same form. */
export function PricingButton({
  size = "lg",
  id,
  className = "",
}: {
  size?: "sm" | "lg";
  id?: string;
  className?: string;
}) {
  const open = useContext(OpenFormContext);
  const sizing =
    size === "lg"
      ? "gap-2.5 whitespace-nowrap rounded-lg px-6 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl"
      : "gap-1.5 rounded-md px-4 py-2 text-sm";
  return (
    <button
      type="button"
      id={id}
      onClick={open}
      className={`inline-flex items-center justify-center bg-brand-500 font-bold text-white shadow-sm transition-colors hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 ${sizing} ${className}`}
    >
      {BUTTON_LABEL}
      <ArrowRight className={size === "lg" ? "h-6 w-6" : "h-4 w-4"} aria-hidden />
    </button>
  );
}
