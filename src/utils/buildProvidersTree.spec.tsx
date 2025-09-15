import { cleanup, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { buildProvidersTree } from './buildProvidersTree';

type ProviderAProps = { children: ReactNode; value?: number };
type ProviderBProps = { children: ReactNode; label?: string };

describe('buildProvidersTree', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders children inside all providers with props', () => {
		const ProviderA = ({ children, value }: ProviderAProps) => (
			<div data-testid='A'>
				{children}-{value}
			</div>
		);
		const ProviderB = ({ children, label }: ProviderBProps) => (
			<span data-testid='B'>
				{children}-{label}
			</span>
		);

		const Tree = buildProvidersTree([
			[ProviderA, { value: 123 }],
			[ProviderB, { label: 'test' }],
		]);

		render(
			<Tree>
				<p data-testid='child'>Hello</p>
			</Tree>
		);

		const child = screen.getByTestId('child');

		expect(child).toBeTruthy();
		expect(screen.getByTestId('A').textContent).toContain('Hello');
		expect(screen.getByTestId('B').textContent).toContain('Hello');
		expect(screen.getByTestId('A').textContent).toContain('123');
		expect(screen.getByTestId('B').textContent).toContain('test');
	});

	it('works with empty providers array', () => {
		const Tree = buildProvidersTree([]);

		render(
			<Tree>
				<p data-testid='child'>Hi</p>
			</Tree>
		);

		expect(screen.getByTestId('child').textContent).toBe('Hi');
	});

	it('handles providers without props', () => {
		const SimpleProvider = ({ children }: { children: ReactNode }) => (
			<div data-testid='simple'>{children}</div>
		);
		const Tree = buildProvidersTree([[SimpleProvider]]);

		render(
			<Tree>
				<span data-testid='child'>X</span>
			</Tree>
		);

		expect(screen.getByTestId('simple')).toBeTruthy();
		expect(screen.getByTestId('child').textContent).toBe('X');
	});
});
