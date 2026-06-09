/// <mls fileReference="_102030_/l2/petShopStripe/module.ts" enhancement="_blank" />
import type { AuraModuleFrontendDefinition, IPaths, IGenomeConfig } from '/_102029_/l2/contracts/bootstrap.js';

export const moduleGenome: Record<string, IGenomeConfig> = {
  'web/desktop/page11': {
    designSystem: 'default',
    device: 'desktop',
    layout: 'standard',
  }
} as const;

export const skills: IPaths = {
  web: {
    sharedPath: '/_102030_/l2/petShopStripe/web/shared',
    sharedSkill: '/_102020_/l2/agentMaterializeSolution/skills/genPageShared.ts'
  }
}

export const moduleStates = {
} as const;

export const moduleShellPreferences = {
  layout: {
    asideMode: {
      desktop: 'inline',
      mobile: 'fullscreen',
    },
  },
} as const;

export const moduleFrontendDefinition: AuraModuleFrontendDefinition = {
  pageTitle: 'petShopStripe',
  device: 'desktop',
  navigation: [
    
  ],
  routes: [
    
  ],
};
