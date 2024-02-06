import { InstanceStatus } from '@companion-module/base'
import { SMTPInstance } from './index'

export interface Mail {
	recipient?: string
	cc?: string
	bcc?: string
	subject?: string
	message?: string
	replyTo?: string
}

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
						{ id: 'true', label: 'True' },
						{ id: 'false', label: 'False' },
					],
				},
			],
		},
	})
}
