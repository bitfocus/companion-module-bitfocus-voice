import { InstanceBase } from '@companion-module/base'
import { SMTPConfig } from './config'

export function UpdatePresets(instance: InstanceBase<SMTPConfig>): void {
	instance.setPresetDefinitions({
		'setlists-activate-previous': {
			category: 'All',
			type: 'button',
			style: {
				text: '<<',
				size: 20,
				color: 16777215,
				bgcolor: 0,
			},
			name: 'Activate Next Setlist',
			feedbacks: [],
			steps: [
				{
					up: [],
					down: [
						{
							actionId: 'activatePreviousSetlist',
							options: {},
						},
					],
				},
			],
		},
		'setlists-active': {
			category: 'All',
			type: 'button',
			style: {
				text: '*Setlist*',
				size: 14,
				color: 16777215,
				bgcolor: 0,
			},
			name: 'Active Setlist',
			feedbacks: [
				{
					feedbackId: 'activeSetlist',
					options: {
						interval: 30000,
					},
				},
			],
			steps: [],
		},
		'setlists-activate-next': {
			category: 'All',
			type: 'button',
			style: {
				text: '>>',
				size: 20,
				color: 16777215,
				bgcolor: 0,
			},
			name: 'Activate Next Setlist',
			feedbacks: [],
			steps: [
				{
					up: [],
					down: [
						{
							actionId: 'activateNextSetlist',
							options: {},
						},
					],
				},
			],
		},
		test: {
			category: 'All',
			type: 'button',
			style: {
				text: 'Test',
				size: 16,
				color: 16777215,
				bgcolor: 0,
			},
			name: 'Test',
			feedbacks: [],
			steps: [
				{
					up: [],
					down: [
						{
							actionId: 'test',
							options: {},
						},
					],
				},
			],
		},
		liveMode: {
			category: 'All',
			type: 'button',
			style: {
				text: 'Live Mode',
				size: 16,
				color: 16777215,
				bgcolor: 0,
			},
			name: 'Live Mode',
			feedbacks: [
				{
					feedbackId: 'liveMode',
					options: {
						interval: 1000,
						trueText: 'ON',
						falseText: 'OFF',
					},
				},
			],
			steps: [
				{
					up: [],
					down: [
						{
							actionId: 'setLiveMode',
							options: {
								liveMode: 'toggle',
							},
						},
					],
				},
			],
		},
		timecode: {
			category: 'All',
			type: 'button',
			style: {
				text: '00:00:00',
				size: 15,
				color: 16777215,
				bgcolor: 0,
			},
			name: 'Timecode',
			feedbacks: [
				{
					feedbackId: 'timecode',
					options: {
						interval: 1000,
					},
				},
			],
			steps: [],
		},
	})
}
