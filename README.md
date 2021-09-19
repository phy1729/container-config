# container-config

container-config is a helper script to configure [Multi-Account Containers](https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/).

## Usage

1. Configure containers constant in `script.ts`.

1. Generate javascript.
	```sh
	npx tsc
	```

1. Open the Multi-Account Containers debugger (`about:devtools-toolbox?id=%40testpilot-containers&type=extension`).

1. Paste the generated javascript code in `script.js` into the debugger and run it.

## Configuration

- color: `string`. The color for the identity. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/contextualIdentities/ContextualIdentity#type) for supported values.
- icon: `string`. The icon for the identity. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/contextualIdentities/ContextualIdentity#type) for supported values.
- isolate: `boolean`. If the MAC `Limit to designated sites` checkbox should be checked.
- URLs: `Map<string, boolean>`. Map with URLs for keys (e.g. `https://example.com`) and values correspond to the `Remember my decision for this site` checkbox.

### Example

```js
		['Github', {
			color: 'green',
			icon: 'circle',
			isolate: true,
			URLs: new Map([
				['https://github.com', false],
				['https://gist.github.com', false],
			]),
		}],
```
