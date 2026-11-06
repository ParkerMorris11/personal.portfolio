type Step = { label: string; detail: string };
type Layer = { name: string; items: readonly string[] };

type ArchitecturePanelProps = {
  id: string;
  title: string;
  summary: string;
  steps: readonly Step[];
  layers: readonly Layer[];
  constraint: string;
};

const ArchitecturePanel = ({
  id,
  title,
  summary,
  steps,
  layers,
  constraint,
}: ArchitecturePanelProps) => (
  <figure id={id} className="arch-panel">
    <figcaption>
      <strong>{title}</strong>
      <span>{summary}</span>
    </figcaption>

    <ol className="arch-pipe" aria-label={`${title} pipeline`}>
      {steps.map((step, index) => (
        <li key={step.label}>
          <span className="flow-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <strong>{step.label}</strong>
          <span>{step.detail}</span>
        </li>
      ))}
    </ol>

    <div className="arch-layers">
      {layers.map((layer) => (
        <div key={layer.name}>
          <p>{layer.name}</p>
          <ul>
            {layer.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <p className="arch-constraint">
      <strong>Constraint. </strong>
      {constraint}
    </p>
  </figure>
);

export default ArchitecturePanel;
