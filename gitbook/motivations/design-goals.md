# Design Goals

We know we could write a program directly in bytecode,
and that everything else can be an example of "syntactic sugar",
but isn't life an endless attempt to improve
_"how we communicate with each other"_?

<br />

### Expressiveness

We've been writing redux-fluent with functional programming in mind,
we wanted it as much declarative as it can be.
We wanted to hide the _"how this is happening"_
and surface the "what is happening".
The application flow should be easy to grasp at first glance.

```typescript
GIVEN I have a counter                     /**/
WHEN action is of type 'INCREMENT'         /**/
THEN state is equal to state plus one      /**/   const counter = createReduce('counter')
                                           /**/     .actions(
GIVEN I have a counter                     /**/       ofType('INCREMENT').map((state) => state + 1),
WHEN action is of type 'DECREMENT'         /**/       ofType('DECREMENT').map((state) => state - 1),
THEN state is equal to state minus one     /**/       ofType('RESET').map(() => 0),
                                           /**/     )
GIVEN I have a counter                     /**/     .default(() => 0);
WHEN action is of type 'RESET'             /**/
THEN state is equal to zero                /**/
```

<br />

### Type Safety

Type Safety is a must-have for a great developer experience,
and we've been building redux-fluent with that in mind.
We've got first-class support for typescript declarations so that you can
benefit from it in your projects (whether they are on typescript or javascript).

![redux-fluent-typescript-definitions.gif](https://github.com/Code-Y/redux-fluent/blob/master/gitbook/redux-fluent-typescript-definitions.gif?raw=true)

<br />

### λ Going Functional

Redux is a perfect fit for functional programming,
it leverages on [Immutability](https://en.wikipedia.org/wiki/Immutable_object),
makes it easy to think in terms of [state machines](https://en.wikipedia.org/wiki/Mealy_machine)
and its architecture clearly defines how to handle side effects so that your
entire state management can be left pure.

However, in real world applications, reducers tend to easily
grow uncontrolled and become unmaintainable.
This is due to a reducer having to handle the whole life cycle of its
state (embed update logic, case logic and handle default values).

We wanted to offer a pattern for [splitting up reducers](https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic#splitting-up-reducer-logic).
A way to stop piling up switch-cases and start doing some function composition!

- Reducers as function combinators to build up complex behaviour by composing small functions together.
- Action Filters to nail down the case logic (the _"which action to respond to"_).
- Action Handlers to granularly define transition logics (`A ~> B`).

```typescript
import { ofType, createReducer } from 'redux-fluent';

export const fooReducer = createReducer('foo')
  .actions(
    // nail down to a specific action of type `bar`
    ofType('bar')
      // work out what's the new state value for actions of type bar
      .map((state, action) => {
        /* do Something */
      }),
  )
  // define default state value
  .default(() => 'foobar');
```

<br />

### FSA by design

[Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)
represents the most established design pattern for
shaping actions in a flux-like application.
It enables interoperability so that it becomes possible to build
extensions ([read about the need of a standard](https://github.com/redux-utilities/flux-standard-action/issues/4)).

redux-fluent is just built around FSA. That's it.
Flux Standard Actions are first-class citizens in redux-fluent.

```typescript
import * as actions from './todos.actions';

actions.addTodo({ title: 'Play some music' }, { date: new Date() });

{
  type: 'ADD_TODO',
  payload: { title: 'Play some music' },
  meta: { date: 'Thu Dec 19 2019 19:05:16 GMT+0000 (Greenwich Mean Time)' },
}
```
