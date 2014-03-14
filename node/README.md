pfgraph
=======

LogicBlox based Pipefish graph analyzer and visualizer. A NodeJS and AngularJS
application that exposes a LogicBlox graph that follows these conventions:

```
person(p), person_id(p:id) -> int(id).
thing(t), thing_id(t:id) -> int(id).

person_rates_thing[p, t] = rating -> person(p), thing(t), int(rating). // Note I'm using entity predicates here, not ints
```

Then to model the inheritance-like structure, we can use:

```
movie(m) -> thing(t).
lang:entity(`movie). // We have to explicitly say this is an entity this time

// These can have their own "properties"
movie_title[m] = title -> movie(m), string(title).

wine(w) -> thing(w).
lang:entity(`wine).

wine_origin[w] = origin -> wine(w), string(origin).
```
