import { useMDXComponents as getDocsComponents } from 'nextra-theme-docs'
import { EndpointHero } from './components/EndpointHero'
import { ParamsCard } from './components/ParamsCard'
import { ParamGroup } from './components/ParamGroup'
import { ResponseExplorer } from './components/ResponseExplorer'
import { TryItPanel } from './components/TryItPanel'
import { CategoryHero } from './components/CategoryHero'
import { MethodBadge } from './components/MethodBadge'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMDXComponents(components: Record<string, any> = {}) {
  return {
    ...getDocsComponents(),
    EndpointHero,
    ParamsCard,
    ParamGroup,
    ResponseExplorer,
    TryItPanel,
    CategoryHero,
    MethodBadge,
    ...components,
  }
}
