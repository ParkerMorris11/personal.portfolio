import { horizontalFlow, layerMap, stackedLayers, verticalFlow } from "@/lib/ascii-diagram";

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
}: ArchitecturePanelProps) => {
  const wideFlow = horizontalFlow(steps);
  const tallFlow = verticalFlow(steps);
  const wideLayers = layerMap(layers);
  const tallLayers = stackedLayers(layers);

  return (
    <figure id={id} className="arch-panel">
      <figcaption>
        <strong>{title}</strong>
        <span>{summary}</span>
      </figcaption>

      <div className="ascii-block">
        <p className="ascii-label">pipeline</p>
        <pre className="ascii-art ascii-wide" aria-hidden="true">
          {wideFlow}
        </pre>
        <pre className="ascii-art ascii-narrow" aria-hidden="true">
          {tallFlow}
        </pre>
        <ol className="sr-only" aria-label={`${title} pipeline`}>
          {steps.map((step) => (
            <li key={step.label}>
              {step.label}: {step.detail}
            </li>
          ))}
        </ol>
      </div>

      <div className="ascii-block">
        <p className="ascii-label">layers</p>
        <pre className="ascii-art ascii-wide" aria-hidden="true">
          {wideLayers}
        </pre>
        <pre className="ascii-art ascii-narrow" aria-hidden="true">
          {tallLayers}
        </pre>
      </div>

      <ul className="sr-only">
        {layers.flatMap((layer) =>
          layer.items.map((item) => (
            <li key={`${layer.name}-${item}`}>{item}</li>
          )),
        )}
      </ul>

      <p className="arch-constraint">
        <strong>Constraint. </strong>
        {constraint}
      </p>
    </figure>
  );
};

export default ArchitecturePanel;
