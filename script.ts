async function main() {
	const containers = new Map<string, {
		color: browser.contextualIdentities.IdentityColor,
		icon: browser.contextualIdentities.IdentityIcon,
		isolate: boolean,
		URLs: Map<string, boolean>
	}>([
	]);

	// @ts-ignore
	const assignManager = window.assignManager;

	for (const [name, spec] of containers) {
		const context_identities = await browser.contextualIdentities.query({name: name});
		let container;
		if (context_identities.length === 0) {
			container = await browser.contextualIdentities.create({
				name: name,
				color: spec.color,
				icon: spec.icon,
			});
		} else if (context_identities.length == 1) {
			container = await browser.contextualIdentities.update(context_identities[0].cookieStoreId, {
				name: name,
				color: spec.color,
				icon: spec.icon,
			});
		} else {
			throw new Error(`More than one container with name ${name}.`);
		};

		const cookieStoreId = container.cookieStoreId;
		// @ts-ignore
		const userContextId = backgroundLogic.getUserContextIdFromCookieStoreId(cookieStoreId);
		for (const [url, neverAsk] of spec.URLs) {
			await assignManager._setOrRemoveAssignment(false, url, userContextId, false);
			if (neverAsk) {
				await assignManager._neverAsk({
					neverAsk: true,
					pageUrl: url,
				});
			}
		}

		// @ts-ignore
		const state = await identityState.storageArea.get(cookieStoreId);
		if (spec.isolate != (!!state.isIsolated)) {
			// @ts-ignore
			await backgroundLogic.addRemoveSiteIsolation(cookieStoreId);
		}
	}
}

(async function() { await main(); })();
