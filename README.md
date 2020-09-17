# Debugging ts / js in vscode

How do I hit a breakpoint? The method used seems to change with every vscode release. Auto attach sometimes attaches, sometimes just hangs and then you press F5 and pick a process. node works but ts-node doesn't, or wait now ts-node works but node doesn't, oh scratch that it's actually showing the .js source code in the debugger - just the tab is called "hello.ts".

WTF is going on?

Try this:

```sh
npm i
npm run build

# ts-node = works
node -r ts-node/register src/hello.ts

# ts-node --inspect-brk = kind of works = you get the weird .js names as .ts hack
node --inspect-brk -r ts-node/register src/hello.ts

# node = doesn't work = Could not load source '/src/hello.ts': Unable to retrieve source content.
node build/main/src/hello.js
```

To fix `node` you have to do this:

- edit [sourcemap](./build/main/src/hello.js.map)
- change `"sources":["../../../src/hello.ts"]` from relative to full path (or else a path relative to ~)
- e.g. `"sources":["/spike/prototype/vscode-ts-debug/src/hello.ts"]`
- now `node build/main/src/hello.js` works as expected, and thankfully so does ts-node
