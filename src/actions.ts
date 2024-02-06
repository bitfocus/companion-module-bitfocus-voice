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
				await self.checkFeedbacks('liveMode')
			},
		},
		test: {
			name: 'Say Something',
			description: 'Test the outputs',
			options: [],
			callback: async () => {
				await self.test()
			},
		},
		activateNextSetlist: {
			name: 'Activate Next Setlist',
			description: 'Activate the next setlist',
			options: [],
			callback: async () => {
				await self.activateNextSetlist()
				await self.checkFeedbacks('activeSetlist')
			},
		},
		activatePreviousSetlist: {
			name: 'Activate Previous Setlist',
			description: 'Activate the previous setlist',
			options: [],
			callback: async () => {
				await self.activatePreviousSetlist()
				await self.checkFeedbacks('activeSetlist')
			},
		},
	})
}
