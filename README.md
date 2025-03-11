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

## Running a Sale

### Update data

- Script to automate getting links from public Lululemon website: `scripts/lulurl_parser.ts`.
  1. Update data in `scripts/lulurls.txt`
  2. Run `npm run lulurl_parser`
  3. Put the result in `src/server/utils/data.ts` and edit accordingly.
- OR: Script to parse list of products, sizes, and links: `scripts/luludoc_parser.py`.
  1. Update data in `scripts/luludocs.txt`
  2. Run `python3 luludoc_parser.py` from the `scripts` directory
  3. Put the result in `src/server/utils/data.ts`
- Script to automate adding products to the DB: `src/server/utils/populate_db.ts`.
  1. Update data in `src/server/utils/data.ts`.
  2. Transpile the code (i.e. run `npx tsc`).
  3. Run `node dist/server/utils/populate_db.js`.
- Update the shop configuration in the DB.

### Deployment

1. On GitHub: Create a new release.
2. Ssh into your server.
3. Get the code for the latest release tag, then run `npm run build_prod`.
4. Restart the server.

### Open shop

- Back up data if not already done so.
- Run script to automatically back up data while fundraising is ongoing.

### Close shop

- Turn off script to automatically back up data.

## License

Distributed under the MIT License. See LICENSE.txt for more information.
