import { SMTPInstance } from './index'

export function UpdateActions(self: SMTPInstance): void {
	self.setActionDefinitions({
		setLiveMode: {
			name: 'Set live mode',
			description: 'Set the live mode of the app',
			options: [
				{
					type: 'dropdown',
					id: 'liveMode',
					label: 'Live mode',
					default: 'true',
					choices: [
						{ id: 'true', label: 'On' },
						{ id: 'false', label: 'Off' },
						{ id: 'toggle', label: 'Toggle' },
					],
				},
			],
			callback: async (action) => {
				if (action.options.liveMode) await self.setLiveMode(action.options.liveMode)
			},
		},
	})
}
