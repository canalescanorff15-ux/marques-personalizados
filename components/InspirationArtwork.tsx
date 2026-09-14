import type { InspirationModel } from '@/lib/inspirations';

type Scene='garden'|'space'|'sport'|'adventure'|'package'|'kit'|'keepsake'|'celebration';

function sceneFor(model:InspirationModel):Scene{
  const haystack=`${model.title} ${model.style} ${model.tags.join(' ')}`.toLocaleLowerCase('pt-BR');
  if(/espaço|foguete|planeta|galáxia/.test(haystack))return 'space';
  if(/futebol|campeão|esporte/.test(haystack))return 'sport';
  if(/safari|dinossauro|ursinho|aventura|bichinho/.test(haystack))return 'adventure';
  if(/floral|jardim|borboleta|flores|botânico|romântico|rosé/.test(haystack))return 'garden';
  if(model.group==='Caixas personalizadas')return 'package';
  if(model.group==='Kits completos')return 'kit';
  if(model.group==='Lembranças e detalhes')return 'keepsake';
  return 'celebration';
}

function Garden(){return <><path className="ia-paper ia-back" d="M43 123c13-28 34-45 62-51 24 8 38 26 42 54-29 19-75 20-104-3Z"/><path className="ia-stem" d="M70 126c7-24 18-42 35-55M99 126c1-27 9-46 24-61M124 128c-2-22 2-39 13-53"/><g className="ia-accent"><circle cx="69" cy="81" r="15"/><circle cx="101" cy="65" r="18"/><circle cx="132" cy="78" r="14"/></g><g className="ia-paper"><path d="M60 89c-12-4-20-12-22-24 13-1 23 5 29 17Z"/><path d="M111 83c-13-4-20-13-20-25 14 1 23 7 28 18Z"/><path d="M137 96c10-7 21-8 32-3-6 12-15 18-28 18Z"/></g><path className="ia-ink" d="M81 133h57l-5 16H86Z"/></>}
function Space(){return <><circle className="ia-back" cx="98" cy="91" r="54"/><circle className="ia-paper" cx="58" cy="62" r="13"/><circle className="ia-accent" cx="142" cy="63" r="18"/><path className="ia-ink" d="M99 45c22 13 33 31 31 55l-29 34-31-31c-2-24 8-44 29-58Zm0 19a11 11 0 1 0 0 22 11 11 0 0 0 0-22Z"/><path className="ia-accent" d="m79 108-18 9 9-22 9 13Zm40 0 18 9-9-22-9 13Z"/><path className="ia-paper" d="m97 139-10 23h22Z"/><g className="ia-paper"><circle cx="40" cy="112" r="4"/><circle cx="154" cy="117" r="5"/><circle cx="151" cy="38" r="4"/></g></>}
function Sport(){return <><path className="ia-back" d="M34 117c21-36 43-54 66-54 25 0 47 18 67 54-24 21-107 22-133 0Z"/><circle className="ia-paper" cx="101" cy="95" r="42"/><path className="ia-ink" d="m101 72 19 14-7 23H89l-8-23Zm-20 14-21-4-8 18 14 19 23-10Zm39 0 21-4 8 18-14 19-22-10Zm-31 23-15 19 13 12h27l13-12-14-19Z"/><path className="ia-accent" d="M68 142h66l-9 14H78Z"/></>}
function Adventure(){return <><path className="ia-back" d="M35 129c13-24 31-40 55-47 17 2 31 10 42 24 14 1 26 9 35 23-30 20-101 22-132 0Z"/><path className="ia-paper" d="M72 116c-6-21 2-41 22-60 15 7 24 20 28 39 14 2 25 11 30 28-24 17-57 19-80-7Z"/><path className="ia-ink" d="M86 80c6-12 17-18 33-17l-6 13 15 7-11 8 11 10-18 2-6 17H89l4-19-15-10Z"/><circle className="ia-accent" cx="108" cy="82" r="4"/><g className="ia-accent"><path d="M58 135c-15-17-17-35-7-54 16 16 22 34 17 55Z"/><path d="M143 136c-3-24 4-42 21-55 5 22-1 42-17 58Z"/></g></>}
function Package(){return <><path className="ia-back" d="M49 70h103l-10 82H58Z"/><path className="ia-paper" d="m44 70 13-28h88l14 28Z"/><path className="ia-ink" d="M98 42h12v110H98Z"/><path className="ia-ink" d="M49 92h103v12H49Z"/><path className="ia-accent" d="M104 57c-14-20-34-25-43-13 6 17 25 22 43 13Zm1 0c14-20 34-25 43-13-6 17-25 22-43 13Z"/><circle className="ia-paper" cx="104" cy="58" r="9"/></>}
function Kit(){return <><path className="ia-back" d="M35 114h130v39H35Z"/><rect className="ia-paper" x="47" y="67" width="49" height="47" rx="3"/><rect className="ia-accent" x="105" y="77" width="43" height="37" rx="3"/><path className="ia-ink" d="M67 67h9v47h-9Zm58 10h8v37h-8Z"/><path className="ia-paper" d="M75 55c-13-17-27-18-35-8 7 13 19 17 35 8Zm0 0c13-17 27-18 35-8-7 13-19 17-35 8Z"/><path className="ia-accent" d="M126 67c-10-14-21-15-28-7 5 11 15 14 28 7Zm0 0c10-14 21-15 28-7-5 11-15 14-28 7Z"/><path className="ia-ink" d="M58 129h83v10H58Z"/></>}
function Keepsake(){return <><path className="ia-back" d="M53 52h92l12 101H41Z"/><path className="ia-paper" d="M67 68h64v70H67Z"/><path className="ia-accent" d="M77 57c11-16 32-17 43 0-12 8-31 8-43 0Z"/><circle className="ia-ink" cx="99" cy="93" r="18"/><path className="ia-paper" d="m99 80 4 9 10 1-8 7 3 10-9-5-9 5 3-10-8-7 10-1Z"/></>}
function Celebration(){return <><path className="ia-back" d="M41 129c18-34 38-51 60-51 23 0 43 17 60 51-28 20-91 20-120 0Z"/><path className="ia-paper" d="M62 122h78l-7 30H69Z"/><path className="ia-ink" d="M74 105h54l6 17H68Z"/><path className="ia-accent" d="M87 105 99 59l13 46Z"/><circle className="ia-paper" cx="100" cy="51" r="11"/><g className="ia-paper"><path d="m54 75 5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1Z"/><path d="m147 69 4 9 10 1-8 7 3 10-9-5-9 5 3-10-8-7 10-1Z"/></g></>}

export default function InspirationArtwork({model,className='',label=false}:{model:InspirationModel;className?:string;label?:boolean}){
  const scene=sceneFor(model);
  return <div className={`inspiration-artwork scene-${scene} ${className}`.trim()} aria-hidden="true">
    <svg viewBox="0 0 200 180" focusable="false">
      <g className="ia-shadow"><ellipse cx="101" cy="156" rx="66" ry="10"/></g>
      {scene==='garden'?<Garden/>:scene==='space'?<Space/>:scene==='sport'?<Sport/>:scene==='adventure'?<Adventure/>:scene==='package'?<Package/>:scene==='kit'?<Kit/>:scene==='keepsake'?<Keepsake/>:<Celebration/>}
    </svg>
    {label&&<span className="inspiration-artwork-label">arte conceitual em camadas</span>}
  </div>;
}
