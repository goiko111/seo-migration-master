import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import Presentation from "@/pages/Presentation";
import CataloniaPresentation from "@/pages/CataloniaPresentation";

const snapshot = (root: HTMLElement) => [...root.querySelectorAll('.presentation-slide')].map(slide => ({
  text: slide.textContent,
  structure: [...slide.querySelectorAll('*')].map(node => [node.tagName,node.getAttribute('class')]),
  images: [...slide.querySelectorAll('img')].map(node => [node.getAttribute('src'),node.getAttribute('alt')]),
}));

describe("Catalonia is the unchanged general deck plus an appendix", () => {
  it("preserves all24 slides in order and adds exactly one final pricing slide", () => {
    const general=render(<MemoryRouter initialEntries={['/presentacion']}><LanguageProvider><Presentation /></LanguageProvider></MemoryRouter>);
    const baseline=snapshot(general.container);
    general.unmount();
    const partner=render(<MemoryRouter initialEntries={['/presentacion/catalonia']}><LanguageProvider><CataloniaPresentation /></LanguageProvider></MemoryRouter>);
    const result=snapshot(partner.container);
    expect(baseline).toHaveLength(24);
    expect(result).toHaveLength(25);
    expect(result.slice(0,24)).toEqual(baseline);
    expect(result[24].text).toContain('175 €');
    expect(partner.container.querySelectorAll('nav button')).toHaveLength(25);
    expect(partner.container.querySelectorAll('h1')).toHaveLength(1);
    partner.unmount();
  });
});
