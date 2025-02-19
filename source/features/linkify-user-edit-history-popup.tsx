import React from 'dom-chef';
import * as pageDetect from 'github-url-detection';

import {wrap} from '../helpers/dom-utils';
import features from '.';
import observe from '../helpers/selector-observer';

function linkify(avatar: HTMLImageElement): void {
	const userName = avatar.alt.slice(1);
	// Linkify name first
	wrap(avatar.nextElementSibling!, <a className="Link--primary" href={`/${userName}`}/>);

	// Then linkify avatar
	wrap(avatar, <a href={`/${userName}`}/>);
}

function init(signal: AbortSignal): void {
	observe('details-dialog .Box-header .mr-3 > img:not([alt*="[bot]"])', linkify, {signal});
}

void features.add(import.meta.url, {
	include: [
		pageDetect.isConversation,
	],
	deduplicate: 'has-rgh-inner',
	init,
});
