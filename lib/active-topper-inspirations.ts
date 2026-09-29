import { topperLevelBySlug } from './topper-catalog';
import { publicTopperInspirations, type TopperInspiration } from './topper-inspirations';

export type ActiveTopperInspiration=TopperInspiration&{category:string};

export const activePublicTopperInspirations:ActiveTopperInspiration[]=publicTopperInspirations.flatMap(item=>{
  const level=topperLevelBySlug(item.levelSlug);
  return level?[{...item,category:level.name}]:[];
});

export function isActivePublicTopperInspiration(code:string){
  const normalized=code.trim().toUpperCase();
  return activePublicTopperInspirations.some(item=>item.code.toUpperCase()===normalized);
}
