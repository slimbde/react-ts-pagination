# FEATURES

- to install icons: `npm install @material-ui/icons @material-ui/core`
- to use icons: `import MenuIcon from "@material-ui/icons/Menu"`
- to make TypeScript understand materialize: `npm install --save @types/materialize-css`
- To import Sass files, you first need to install node-sass. Run `npm install node-sass` inside your workspace


***THE PROPS ISSUE***
- to pass on props one should merge them with the rest props of a component
  using spread operator for instance


***THE IMPLICIT ANY ISSUE***
- to avoid ts errors about implicit any and it didn't find a file
  1. Create index.d.ts in ClientApp folder
  2. Add there *declare module ...*
  3. Add "index.d.ts" in "include" section of the [tsconfig.json]
