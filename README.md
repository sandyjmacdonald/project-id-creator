This simple web app generates project IDs that fit our University of York Bioscience TF Data Science Hub project ID schema, e.g. P2024-CRD-WXYZ for a 2024 project for someone with the initials CRD. The four-character alphabetical suffix is randomly generated to hopefully make each project ID unique.

Both a web UI and API endpoints are available.

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

## Web UI usage

![Web UI screenshot](web-ui.png)

To use the web UI, simply enter a valid three-character user ID into the form field and a PYYYY prefix and random four-letter suffix will be generated. The user ID form field will turn green for a valid user ID or red for an invalid one. The paste button on the far right copies the generated project ID to your clipboard if the project ID is valid.

## API endpoints

Three API endpoints are provided to allow project IDs, prefixes, and suffixes to be generated programmatically.

The base URL for all of the endpoints is `/api/v1/` and all (of the current routes) accept GET requests.

Valid API responses will have a `200` response code.

### `/api/v1/prefix`

To generate a prefix:

```bash
curl -s https://project-id-creator.sandyjmacdonald.workers.dev/api/v1/prefix

{"prefix":"P2024"}
```

### `/api/v1/suffix`

To generate a suffix:

```bash
curl -s https://project-id-creator.sandyjmacdonald.workers.dev/api/v1/suffix

{"suffix":"ADQX"}
```

### `/api/v1/project-id/{UID}`

To generate a project ID, use the `/api/v1/project-id/` route and append a valid three-character user ID:

```bash
curl -s https://project-id-creator.sandyjmacdonald.workers.dev/api/v1/project-id/CRD

{"project_id":"P2024-CRD-VTZB"}
```

A `400` response will be returned if the user ID provided is not valid.

A valid user ID is either three letters, or two letters followed by an integer number from 1 to 9.
