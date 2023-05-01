# Presentational components

----------------

Have two data sources:

1) Input from parent with name "{fooComponent}Input" 
2) State observable from facade with name "{fooComponent}View$"
Later in the template, both of them are joined using ngrxLet and given alias "vm"

## Why glossary uses component-store with facade and exercises global store?

-----------------

The decision was made purely for didactic purposes, to see practical difference in implementation and functionality between component-store and feature-store (branch with individual action files) approaches.