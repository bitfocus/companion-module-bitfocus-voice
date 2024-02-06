import { SMTPInstance } from './index'
import { CompanionButtonStyleProps, combineRgb } from '@companion-module/base'
import axios from 'axios'

export function UpdateFeedbacks(self: SMTPInstance): void {
	self.setFeedbackDefinitions({
		liveMode: {
			type: 'advanced',
			name: 'Live Mode',
			options: [
				{
					type: 'number',
					label: 'Interval',
					id: 'interval',
					default: 1000,
					min: 100,
					max: 10000,
				},
				{
					type: 'textinput',
					label: 'True Text',
					id: 'trueText',
					default: 'ON',
				},
				{
					type: 'textinput',
					label: 'False Text',
					id: 'falseText',
					default: 'OFF',
				},
			],
			subscribe: (feedback) => {
				// Ensure existing timer is cleared
				if (self.feedbackTimers[feedback.id]) {
					clearInterval(self.feedbackTimers[feedback.id])
					delete self.feedbackTimers[feedback.id]
				}

				// Start new timer if needed
				if (feedback.options.interval) {
					self.feedbackTimers[feedback.id] = setInterval(() => {
						self.checkFeedbacksById(feedback.id)
					}, Number(feedback.options.interval))
				}
			},
			unsubscribe: (feedback) => {
				// Ensure timer is cleared
				if (self.feedbackTimers[feedback.id]) {
					clearInterval(self.feedbackTimers[feedback.id])
					delete self.feedbackTimers[feedback.id]
				}
			},
			callback: async (feedback) => {
				try {
					// use axios to fetch json value of localhost:4647/live
					const res = await axios.get('http://localhost:4647/live')
					const state = res.data.live

					const change: Partial<CompanionButtonStyleProps> = {}

					if (state) {
						change['color'] = combineRgb(255, 40, 40)
						change['bgcolor'] = combineRgb(80, 10, 10)
					}
					if (!state) {
						change['color'] = combineRgb(60, 60, 60)
						change['bgcolor'] = combineRgb(20, 20, 20)
					}
					if (state && feedback.options.trueText !== '') {
						change['text'] = feedback.options.trueText + ''
					}
					if (!state && feedback.options.falseText !== '') {
						change['text'] = feedback.options.falseText + ''
					}

					return change
				} catch (e) {
					// Image failed to load so log it and output nothing
					self.log('error', `Failed to fetch: ${e}`)

					return {}
				}
			},
		},
		timecode: {
			type: 'advanced',
			name: 'Timecode',
			options: [
				{
					type: 'number',
					label: 'Interval',
					id: 'interval',
					default: 500,
					min: 100,
					max: 10000,
				},
			],
			subscribe: (feedback) => {
				// Ensure existing timer is cleared
				if (self.feedbackTimers[feedback.id]) {
					clearInterval(self.feedbackTimers[feedback.id])
					delete self.feedbackTimers[feedback.id]
				}

				// Start new timer if needed
				if (feedback.options.interval) {
					self.feedbackTimers[feedback.id] = setInterval(() => {
						self.checkFeedbacksById(feedback.id)
					}, Number(feedback.options.interval))
				}
			},
			unsubscribe: (feedback) => {
				// Ensure timer is cleared
				if (self.feedbackTimers[feedback.id]) {
					clearInterval(self.feedbackTimers[feedback.id])
					delete self.feedbackTimers[feedback.id]
				}
			},
			callback: async () => {
				try {
					// use axios to fetch json value of localhost:4647/live
					const res = await axios.get('http://localhost:4647/tc')
					const state = res.data

					const change: Partial<CompanionButtonStyleProps> = {}

					if (state.running) {
						change['color'] = combineRgb(0, 100, 240)
						change['bgcolor'] = combineRgb(0, 30, 100)
					}

					if (!state.running) {
						change['color'] = combineRgb(50, 50, 50)
						change['bgcolor'] = combineRgb(10, 10, 10)
					}

					change['text'] = state.timecode

					return change
				} catch (e) {
					// Image failed to load so log it and output nothing
					self.log('error', `Failed to fetch: ${e}`)

					return {}
				}
			},
		},
		activeSetlist: {
			type: 'advanced',
			name: 'Active Setlist',
			options: [
				{
					type: 'number',
					label: 'Interval',
					id: 'interval',
					default: 30000,
					min: 100,
					max: 30000,
				},
			],
			subscribe: (feedback) => {
				// Ensure existing timer is cleared
				if (self.feedbackTimers[feedback.id]) {
					clearInterval(self.feedbackTimers[feedback.id])
					delete self.feedbackTimers[feedback.id]
				}

				// Start new timer if needed
				if (feedback.options.interval) {
					self.feedbackTimers[feedback.id] = setInterval(() => {
						self.checkFeedbacksById(feedback.id)
					}, Number(feedback.options.interval))
				}
			},
			unsubscribe: (feedback) => {
				// Ensure timer is cleared
				if (self.feedbackTimers[feedback.id]) {
					clearInterval(self.feedbackTimers[feedback.id])
					delete self.feedbackTimers[feedback.id]
				}
			},
			callback: async () => {
				try {
					// use axios to fetch json value of localhost:4647/live
					const res = await axios.get('http://localhost:4647/setlists/active')
					const state = res.data

					const change: Partial<CompanionButtonStyleProps> = {}

					change['text'] = state.title

					return change
				} catch (e) {
					// Image failed to load so log it and output nothing
					self.log('error', `Failed to fetch: ${e}`)

					return {}
				}
			},
		},
	})
}
