import { InstanceBase, InstanceStatus, runEntrypoint, SomeCompanionConfigField } from '@companion-module/base'
import { UpdateActions, Mail } from './actions'
import { SMTPConfig, GetConfigFields } from './config'
import { UpdateVariableDefinitions } from './variables'

import request from 'request'

export class SMTPInstance extends InstanceBase<SMTPConfig> {
	private config: SMTPConfig
	status: string

	constructor(internal: unknown) {
		super(internal)
		this.config = {
			host: '',
			port: 4647,
		}
		this.status = ''
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 */
	public async init(config: SMTPConfig): Promise<void> {
		this.updateStatus(InstanceStatus.Connecting)
		this.config = config

		this.updateStatus(InstanceStatus.Ok)
		this.status = InstanceStatus.Ok

		this.updateActions()
		this.updateVariableDefinitions()
		return Promise.resolve()
	}

	/**
	 * Process an updated configuration array.
	 */
	async configUpdated(config: SMTPConfig): Promise<void> {
		this.config = config
		return Promise.resolve()
	}

	/**
	 * Creates the configuration fields for web config.
	 */
	public getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	/**
	 * Clean up the instance before it is destroyed.
	 */
	public async destroy(): Promise<void> {
		this.log('debug', `destroy ${this.id}`)
		return Promise.resolve()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}

	async setLiveMode(state: boolean): Promise<void> {
		this.log('debug', `set live moe: ${state}`)

		// request
		const res = await request('/live/' + state ? 'on' : 'off', {
			host: this.config.host,
			port: this.config.port,
		})

		if (res.statusCode === 200) {
			this.log('info', `Live mode set to: ${state}`)
		} else {
			this.log('error', `Failed to set live mode: ${res.statusCode}`)
		}

		return Promise.resolve()
	}
}

runEntrypoint(SMTPInstance, [])
