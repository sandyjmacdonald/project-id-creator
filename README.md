This simple web app generates project IDs that fit our University of York Bioscience TF Data Science Hub project ID schema, e.g. P2024-CRD-WXYZ for a 2024 project for someone with the initials CRD. The four-character alphabetical suffix is randomly generated to hopefully make each project ID unique.

The app is written with [Hono](https://hono.dev) and styled with [Tailwind CSS](https://tailwindcss.com) and deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/). My version can be accessed here - [https://project-id-creator.sandyjmacdonald.workers.dev](https://project-id-creator.sandyjmacdonald.workers.dev) - or you can follow the instructions below to deploy your own version.

## How to deploy locally, or to Cloudflare Workers

1. Set up a Cloudflare account: [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Install node.js/npm
3. `git clone https://github.com/sandyjmacdonald/project-id-creator`
4. `cd project-id-creator`
5. `npm install`
6. Install Bun: `curl -fsSL https://bun.sh/install | bash`

To test locally:

`bun run dev`

To deploy your own version to Cloudflare Workers:

`bun run deploy`