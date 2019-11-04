# security-validation
Using express validator and other tools to protect web services and prevent potential secrity breaches

## Using Helmet
[Helmet](https://www.npmjs.com/package/helmet) is used to harden the Express server headers to set sane defaults and prevent common vulnerabiliy hacks

## AuditJS
Auditjs can be used to check our dependency tree against vulnerability databases.

```bash
npm run audit
```

## Example Tasks

### Task 1 - Valdation checks on form inputs

 - Validate a form input data

### Task 2 - Guard against JSON pollution

 - Validate a API payload

### Task 3 - Properly encode input data

 - Validate a form input and other URL inputs

