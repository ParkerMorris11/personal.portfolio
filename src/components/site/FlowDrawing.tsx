type Step = {
  label: string;
  detail: string;
};

const FlowDrawing = ({ title, steps }: { title: string; steps: readonly Step[] }) => (
  <figure className="flow-drawing">
    <figcaption>{title}</figcaption>
    <ol>
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
  </figure>
);

export default FlowDrawing;
