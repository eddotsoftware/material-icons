import type { ElementType, CSSProperties, ReactElement, Ref } from 'react';
import { forwardRef } from 'react';
import type { MaterialSymbolWeight, PolymorphicComponentProps, SymbolCodepoints } from './types';
export type { MaterialSymbolWeight, SymbolCodepoints } from './types';
import { combineClasses } from './utils';

export const MATERIAL_SYMBOL_FILL_VAR = "--material-symbols-fill";
export const MATERIAL_SYMBOL_GRAD_VAR = "--material-symbols-grad";
export const MATERIAL_SYMBOL_SIZE_VAR = "--material-symbols-size";
export const MATERIAL_SYMBOL_WEIGHT_VAR = "--material-symbols-weight";

export type MaterialSymbolProps = {
	/** Required. The name of the icon to render. */
	icon: SymbolCodepoints;
	/** Default `false`.
	 *
	 * Fill gives you the ability to modify the default icon style. A single icon can render both unfilled and filled states. */
	fill?: boolean;
	/** Weight defines the symbol’s stroke weight, with a range of weights between thin (100) and heavy (900). Weight can also affect the overall size of the symbol. */
	weight?: MaterialSymbolWeight;
	/** Weight and grade affect a symbol’s thickness. Adjustments to grade are more granular than adjustments to weight and have a small impact on the size of the symbol. */
	grade?: number;
	/** Default `'inherit'`.
	 *
	 * Size defines the icon width and height in pixels. For the image to look the same at different sizes, the stroke weight (thickness) changes as the icon size scales. */
	size?: number;
	/** Default `'inherit'`
	 *
	 * Color accepts key values (`'red'`, `'blue'`, `'indigo'`, etc.), `<hex-color>`, `<rgb()>`, `<hsl()>` and `<hwb()>` values.  */
	color?: CSSProperties['color'];
	className?: string;
	style?: CSSProperties;
};

export type PolymorphicMaterialSymbolProps<C extends ElementType> = PolymorphicComponentProps<
	C,
	MaterialSymbolProps
>;

export const MaterialSymbol = forwardRef(
	<C extends ElementType>(
		{
			icon,
			onClick,
			as,
			weight,
			fill = false,
			grade,
			size,
			style: propStyle,
			color,
			className,
			...props
		}: PolymorphicMaterialSymbolProps<C>,
		ref: Ref<C>
	): ReactElement => {
		const Component = onClick !== undefined ? 'button' : (as as ElementType) ?? 'span';
		const style = { color, "--material-symbols-size-px": "calc(var(--material-symbols-size) * 1px)", ...propStyle };

		if (fill)
			(style as Record<string, unknown>)[MATERIAL_SYMBOL_FILL_VAR] = 1;
		if (weight)
			// When weight is supplied, we also set the `data-weight` attribute
			// so that we can switch to the CSS rule that specifies the "wght"
			// font variation axis.
			(style as Record<string, unknown>)[MATERIAL_SYMBOL_WEIGHT_VAR] = weight;
		if (grade)
			(style as Record<string, unknown>)[MATERIAL_SYMBOL_GRAD_VAR] = grade;
		if (size) {
			(style as Record<string, unknown>)[MATERIAL_SYMBOL_SIZE_VAR] = size;
		}

		return (
			<Component
				{...props}
				ref={ref}
				style={style}
				onClick={onClick}
				className={combineClasses('material-symbols', className)}
				{...(weight && { "data-weight": true})}
			>
				{icon}
			</Component>
		);
	}
) as <C extends ElementType>(props: PolymorphicMaterialSymbolProps<C>) => ReactElement;
