import type { ComponentType, ReactNode } from 'react';

type ProviderProps = {
	children: ReactNode;
	[key: string]: unknown;
};

type ProviderComponent = ComponentType<ProviderProps>;
type ProviderEntry = [ProviderComponent, Record<string, unknown>?];

export const buildProvidersTree =
	(entries: ProviderEntry[]) =>
	({ children }: { children: ReactNode }) =>
		entries.reduceRight(
			(acc, [Provider, props = {}]) => <Provider {...props}>{acc}</Provider>,
			children
		);
