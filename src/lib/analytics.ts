export const trackEvent = (action: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
};

export const trackPhoneClick = (location: string) => {
  trackEvent("click_phone", { location });
};

export const trackEmailClick = (location: string) => {
  trackEvent("click_email", { location });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent("form_submit", { form_name: formName });
};

export const trackProjectClick = (projectName: string, projectSlug: string) => {
  trackEvent("click_project", { project_name: projectName, project_slug: projectSlug });
};
