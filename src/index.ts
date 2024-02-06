import {
	InputValue,
	InstanceBase,
	InstanceStatus,
	runEntrypoint,
	SomeCompanionConfigField,
} from '@companion-module/base'
import { UpdateActions } from './actions'
import { SMTPConfig, GetConfigFields } from './config'
import { UpdateVariableDefinitions } from './variables'

import { UpdateFeedbacks } from './feedbacks'
import axios from 'axios'
import { UpdatePresets } from './presets'

export class SMTPInstance extends InstanceBase<SMTPConfig> {
	config: SMTPConfig
	status: string
	feedbackTimers: { [key: string]: any } = {}

	constructor(internal: unknown) {
		super(internal)
		this.config = {
			host: '',
			port: 4648,
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
		this.updateFeedbacks()
		this.updatePresets()

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

	updateFeedbacks(): void {
		// Update feedbacks here
		UpdateFeedbacks(this)
	}

	updatePresets(): void {
		// Update presets here
		UpdatePresets(this)
	}

	async setLiveMode(state: InputValue): Promise<void> {
		this.log('debug', `set live mode: ${state}`)

		// request
		const res = await axios.post('http://' + this.config.host + ':' + this.config.port + '/live/' + state)

		if (res.status === 200) {
			this.log('info', `Live mode set to: ${state}`)
		} else {
			this.log('error', `Failed to set live mode: ${res.statusText}`)
		}

		return Promise.resolve()
	}

	async test(): Promise<void> {
		const path = 'http://' + this.config.host + ':' + this.config.port + '/test'

		try {
			const res = await axios.post(path)

			if (res.status === 200) {
				this.log('info', `Success`)
			} else {
				this.log('error', `Failed to test: ${res.statusText}`)
			}
		} catch (e) {
			this.log('error', `Failed to test: ${path} ${e} `)
		}

		return Promise.resolve()
	}

	async activateNextSetlist(): Promise<void> {
		const path = 'http://' + this.config.host + ':' + this.config.port + '/setlists/activate/next'

		try {
			const res = await axios.post(path)

			if (res.status === 200) {
				this.log('info', `Success`)
			} else {
				this.log('error', `Failed to activate next setlist: ${res.statusText}`)
			}
		} catch (e) {
			this.log('error', `Failed to activate next setlist: ${path} ${e} `)
		}

		return Promise.resolve()
	}

	async activatePreviousSetlist(): Promise<void> {
		const path = 'http://' + this.config.host + ':' + this.config.port + '/setlists/activate/previous'

		try {
			const res = await axios.post(path)

			if (res.status === 200) {
				this.log('info', `Success`)
			} else {
				this.log('error', `Failed to activate previous setlist: ${res.statusText}`)
			}
		} catch (e) {
			this.log('error', `Failed to activate previous setlist: ${path} ${e} `)
		}

		return Promise.resolve()
	}
}

runEntrypoint(SMTPInstance, [])
