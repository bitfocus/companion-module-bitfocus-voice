import { CompanionVariableDefinition, InstanceBase } from '@companion-module/base'
import { SMTPConfig } from './config'

export function UpdateVariableDefinitions(instance: InstanceBase<SMTPConfig>): void {
	const variables: CompanionVariableDefinition[] = [
		//{ variableId: 'variable1', name: 'My first variable' }
	]

	instance.setVariableDefinitions(variables)
}
