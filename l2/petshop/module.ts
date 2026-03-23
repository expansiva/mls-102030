/// <mls fileReference="_102030_/l2/petshop/module.ts" enhancement="_blank" />
export const moduleGenome = {
  page11: {
    device: 'desktop',
    layout: 'standard',
  },
  page21: {
    device: 'mobile',
    layout: 'standard',
  },
} as const;

export const moduleStates = {
  currentSection: 'ui.petshop.currentSection',
  selectedCategory: 'ui.petshop.selectedCategory',
  searchQuery: 'ui.petshop.searchQuery',
  editorAuthor: 'ui.petshop.editorAuthor',
} as const;

export const moduleShellPreferences = {
  layout: {
    asideMode: {
      desktop: 'inline',
      mobile: 'fullscreen',
    },
  },
} as const;
