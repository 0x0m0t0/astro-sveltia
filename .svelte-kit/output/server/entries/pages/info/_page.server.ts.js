import matter from "gray-matter";
const aboutRaw = "---\nlinks:\n  - label: instagram\n    url: https://www.instagram.com/oxomoto/\n    handle: '@oxomoto'\n  - label: github\n    url: https://github.com/0x0m0t0\n    handle: '@0x0m0t0'\n  - label: are.na\n    url: https://www.are.na/oxomoto/index\n    handle: '@oxomoto'\nurl: oxomoto.co\nservices:\n  - art direction\n  - web development\n  - graphic design\n  - branding\n  - ui/ux\n  - typography\n  - seo\n  - e-commerce\ntitle: About\n---\nUpdating this now.\n\nDesign and development practice of Louis Desmet. Brussels based.\n\nOpen for projects & collaboration starting March 2026.\n";
const load = async () => {
  const { data, content } = matter(aboutRaw);
  return {
    info: {
      links: data.links || [],
      services: data.services || [],
      body: content.trim()
    }
  };
};
export {
  load
};
