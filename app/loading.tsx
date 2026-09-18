export default function Loading(){
  return <main className="public-state-page public-loading-state" aria-busy="true" aria-live="polite">
    <section className="public-state-card">
      <div className="public-state-loading-mark" aria-hidden="true">M.</div>
      <div className="public-state-loading-copy">
        <span>Carregando a Merlin</span>
        <strong>Preparando esta página para você…</strong>
      </div>
      <div className="public-state-skeletons" aria-hidden="true">
        <i/><i/><i/>
      </div>
    </section>
  </main>;
}
