import { SomeCompanionConfigField } from '@companion-module/base'

export interface SMTPConfig {
	host: string
	port: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Server',
			default: 'localhost',
			width: 12,
		},
		{
			type: 'number',
			id: 'port',
			label: 'Port',
			default: 4647,
			min: 1,
			max: 65535,
			width: 10,
		},
	]
}
