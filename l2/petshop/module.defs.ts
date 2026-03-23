export const skill = {
  moduleId: 'petshop',
  purpose: 'Petshop client module with desktop and mobile page variations.',
  pages: ['home', 'edit-products'],
  genome: {
    page11: 'desktop-standard',
    page21: 'mobile-standard',
  },
  states: [
    'ui.petshop.currentSection',
    'ui.petshop.selectedCategory',
    'ui.petshop.searchQuery',
    'ui.petshop.editorAuthor',
  ],
} as const;
