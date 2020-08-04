import React from 'react'

import config from 'site.config'
/* -------------------------------------------------------------------------- */

export default function Projects() {
  return (
    <div className="pt-16">
      <h3>Projects</h3>
      <hr />
      {config.projects.map((project) => (
        <p key={project.url} className="my-4">
          <a className="text-2xl font-semibold" href={project.url}>
            {project.name}
          </a>
          <span> &mdash;</span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="mx-2 font-mono text-lg inline-block leading-none text-gray-700 dark:text-gray-200 align-middle bg-gray-100 dark:bg-gray-800 rounded shadow py-1 px-2"
            >
              {tag}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}
