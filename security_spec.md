# Security Specification - Richkiss Publishing

## 1. Data Invariants
- **Settings**: Only one global document exists. Values must be strings or specific lists (hero images).
- **Categories**: Must have a valid slug and name. Image URL is optional but must be a string.
- **Books**: Must belong to a category. Price is stored as a string (since we removed pricing logic from display, it might still exist in data).
- **Events**: Must have a name and location. Gallery must be a list of strings.
- **Why Richkiss**: Benefits for the careers page. Must have a title and image URL.

## 2. The "Dirty Dozen" Payloads (Red Team Attacks)

### Identity & Access Attacks
1. **Unauthorized Settings Write**: Attempt to update `settings/global` as an unauthenticated user.
2. **Settings Poisoning**: Attempt to add a 2MB string to `vision` field.
3. **Category Shadow Field**: Attempt to create a category with `isAdmin: true` ghost field.
4. **WhyRichkiss Deletion**: Attempt to delete a value proposition as an unauthenticated user.

### Integrity & Schema Attacks
5. **Invalid ID Poisoning**: Create a book with an ID like `!!!invalid_id!!!`.
6. **Type Mismatch (Books)**: Update a book with `featured: "Yes"` (should be boolean).
7. **Size Limit Bypass**: Create a category with a name longer than 100 characters.
8. **WhyRichkiss Empty Title**: Create a value prop with an empty string for title.

### Relational & State Attacks
9. **Event Gallery Poisoning**: Update an event gallery with a list containing a non-string object.
10. **Settings Metadata Hijack**: Attempt to change immutable `createdAt` if it existed (not currently used but good to guard).
11. **Orphaned Book**: Create a book referencing a non-existent category (though rules don't strictly enforce existence yet, we should guard).
12. **Bulk Data Injection**: Attempt to create 1000 items in a single batch (not rule-enforced, but we check per-document limits).

## 3. Test Runner Plan
The `firestore.rules.test.ts` (if implemented) would verify that all the above "Dirty" payloads result in `PERMISSION_DENIED`.
