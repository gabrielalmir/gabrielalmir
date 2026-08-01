import { useState } from "react";
import type { Story } from "@/lib/portfolio-content";

export function FlowStories({ stories, labels }: { stories: Story[]; labels: readonly string[] }) {
  const [activeId, setActiveId] = useState(stories[0].id);
  const active = stories.find((story) => story.id === activeId) ?? stories[0];

  return (
    <div className="flow-explorer">
      <div className="flow-tabs" aria-label="Selected projects">
        {stories.map((story) => (
          <button key={story.id} type="button" aria-pressed={active.id === story.id} onClick={() => setActiveId(story.id)} className="flow-tab">
            <span>{story.index}</span><strong>{story.title}</strong><small>{story.eyebrow}</small>
          </button>
        ))}
      </div>

      <article className="flow-active" aria-live="polite">
        <header><p className="eyebrow">{active.eyebrow}</p><h3>{active.title}</h3><p>{active.summary}</p></header>
        <div className="flow-path" aria-label={`${labels[0]}, ${labels[1]}, ${labels[2]}`}>
          {[active.constraint, active.decision, active.result].map((text, index) => (
            <div className="flow-state" key={labels[index]}>
              <span className="state-node" aria-hidden="true">{index + 1}</span>
              <div><small>{labels[index]}</small><p>{text}</p>{index === 2 && active.metric && <strong className="flow-metric">{active.metric}</strong>}</div>
            </div>
          ))}
        </div>
        {active.href && <a className="text-link" href={active.href} target={active.href.startsWith("http") ? "_blank" : undefined} rel={active.href.startsWith("http") ? "noreferrer" : undefined}>{active.hrefLabel} <span aria-hidden="true">↗</span></a>}
      </article>
    </div>
  );
}

