// Create a function to validate emails with email regex.
export const validateEmail = (email: string): boolean => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Create a function to validate that the email is from a common provider (gmail, yahoo, outlook).
export const validateCommonEmailProvider = (email: string): boolean => {
  const commonEmailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com|icloud\.com|mail\.com|zoho\.com|protonmail\.com|gmx\.com|yandex\.com|fastmail\.com|tutanota\.com|hushmail\.com|posteo\.net|runbox\.com|countermail\.net|mailfence\.com|startmail\.com)$/;
  return commonEmailRegex.test(email);
};