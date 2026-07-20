# Public Emergency Data Contract

The public website may consume the read-only endpoint:

```text
GET /api/public-data
```

## Safety boundary

This endpoint is for public awareness only. It is not an emergency reporting or dispatch endpoint. It must never expose reporter names, phone numbers, email addresses, private notes, internal moderation notes, exact private-property coordinates, or unreviewed uploads.

## Emergency classification

Only these Mobile 311 request types are classified as emergency signals:

- `Tree/Limb Down in Street`
- `Broken/Hanging Limb in Right-of-Way`

All other tree-related request types are returned separately as `secondaryRequests`.

## Source modes

Each source reports one of these modes:

- `live` — current data was retrieved from the configured public source
- `sample` — demonstration data is being displayed
- `error` — the source failed and no current result should be inferred

The interface must make `sample` and `error` states prominent. It must never present sample records as current incidents.

## Public request fields

- `id`
- `requestType`
- `priority`
- `publicLocation`
- `publicDescription`
- `status`
- `submittedAt`
- `daysOpen`
- `latitude`
- `longitude`
- `publicUrl`

Descriptions are sanitized to remove email addresses, phone-like strings, control characters, and excessive length. Only HTTPS public links are allowed.

## Integration rule

`tree251.xyz` may display this payload in `/emergency-tree-board`, but the data contract and source adapters remain owned by this repository.
