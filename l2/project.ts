/// <mls fileReference="_102030_/l2/project.ts"  enhancement="_blank" />

export const projectConfig = {   
  modules: [
    { name: "petShopStripe", path: "petShopStripe", auth: "admin" }
  ],

  layouts: {
    1: { name: 'standard', skill: '_102020_/l2/agentMaterializeSolution/skills/genPageRender.ts' },
  },

  designSystems: {
    1: { name: 'default', skill: '_102020_/l2/agentMaterializeSolution/skills/genPageDS.ts' },
  }
}
