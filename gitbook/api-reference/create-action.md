# createAction

Factory for redux-fluent action creators.

```typescript
import { createAction } from 'redux-fluent';

createAction(type, payloadCreator?, metaCreator?);
```

## Arguments

- `string` - the action type
- `(rawPayload: any, rawMeta: any, type: string) => Payload` - the payload creator
- `(rawPayload: any, rawMeta: any, type: string) => Meta` - the meta creator

## Returns

```typescript
(rawPayload, rawMeta) => FluxStandardAction;
```

## Usage

```typescript
createAction(
  'action-type',
  () => Payload,
  () => Meta,
);
```
