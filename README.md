## LuluLedger

Lululedger is a platform for SFIT Lululemon fundraising orders.

## Getting Started

`config.ts` must be placed in `src/server/` with the following:

```
export const API_URI="your_api_uri"
export const API_TOKEN="bearer your_API_token"
```

TODO: Add a `config.ts.example` (there are some additional parameters now).

Run `npm start` to compile source and start server.

OR
- Run `npm run watch` to live reload the frontend.
- Run `npm run watch_server` to live reload the backend.

It's preferred to run both `watch` and `watch_server` above for typical development

## Deployment

### Deploy code

1. On GitHub: Create a new release.
2. Ssh into your server.
3. Get the code for the latest release tag, then run `npm run build_prod`.
4. Restart the server.

### Update data

- A lot of constants are in `src/constants.ts`. TODO: Maybe these should live in a DB.
- Script to automate getting links from Lululemoon: `scripts/lulurl_parser.ts`.
  1. Update data in `scripts/lulurls.txt`
  2. Run `npm run lulurl_parser`
- Script to automate adding products to the DB: `src/server/utils/populate_db.ts`.
  1. Update data in `src/server/utils/data.ts`.
  2. Run `npx ts-node src/server/utils/populate_db.ts`.

## License

Distributed under the MIT License. See LICENSE.txt for more information.
