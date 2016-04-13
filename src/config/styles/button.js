import ash from 'ash';

import hexToRGBAString from '../../internals/hexToRGBAString';
import tintHex from '../../internals/tintHex';


let button = {};

button.default = {
	depth: '0.125bh',
	color: ash.config.colors.secondary1.shade[3],
	backgroundColor: ash.config.colors.secondary1.base,
	sideColor: ash.config.colors.secondary1.shade[1],
	borderColor: 'transparent',
	borderWidth: 0,
	borderRadius: '0.125bh',
	boxShadow: `0 0.125bh 0.125bh ${hexToRGBAString(ash.config.colors.neutral.base, 0.4)}`,
	fontSize: ash.config.text.fontSize,
	
	badge: {
		color: ash.config.colors.background,
		backgroundColor: ash.config.colors.primary1.base,
		borderRadius: '1bh',
		fontSize: ash.config.typographicScale[4]
	}
};

button.default.focused = {
	depth: '0.125bh',
	color: ash.config.colors.secondary1.shade[3],
	backgroundColor: ash.config.colors.secondary1.tint[1],
	sideColor: ash.config.colors.secondary1.shade[1],
	borderColor: 'transparent',
	boxShadow: `0 0.125bh 0.125bh ${hexToRGBAString(ash.config.colors.neutral.base, 0.4)}`
};

button.default.hovered = {
	depth: '0.125bh',
	color: ash.config.colors.secondary1.shade[3],
	backgroundColor: tintHex(ash.config.colors.secondary1.base, 0.1),
	sideColor: tintHex(ash.config.colors.secondary1.shade[1], 0.1),
	borderColor: 'transparent',
	boxShadow: `0 0.125bh 0.125bh ${hexToRGBAString(ash.config.colors.neutral.base, 0.4)}`
};

button.default.pressed = {
	depth: '0.0625bh',
	color: ash.config.colors.secondary1.shade[3],
	backgroundColor: ash.config.colors.secondary1.base,
	sideColor: ash.config.colors.secondary1.shade[1],
	borderColor: 'transparent',
	boxShadow: `0 0.0625bh 0.0625bh ${hexToRGBAString(ash.config.colors.neutral.base, 0.3)}`
};

button.default.disabled = {
	depth: '0.125bh',
	color: ash.config.colors.neutral.tint[3],
	backgroundColor: ash.config.colors.neutral.tint[5],
	sideColor: ash.config.colors.neutral.tint[3],
	borderColor: 'transparent',
	boxShadow: `0 0.125bh 0.125bh ${hexToRGBAString(ash.config.colors.neutral.base, 0.4)}`
};

export default button;
