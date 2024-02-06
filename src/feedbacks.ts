import request from 'request'
import { SMTPInstance } from './index'

export function UpdateFeedbacks(self: SMTPInstance): void {
	self.setFeedbackDefinitions({
		liveMode: {
			type: 'advanced',
			name: 'LiveMode',
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
					type: 'colorpicker',
					label: 'True Background Color',
					id: 'trueBgColor',
					default: '#ee3311',
				},
				{
					type: 'colorpicker',
					label: 'False Background Color',
					id: 'falseBgColor',
					default: '#111111',
				},
				{
					type: 'colorpicker',
					label: 'True Color',
					id: 'trueColor',
					default: '#aaaaaa',
				},
				{
					type: 'colorpicker',
					label: 'False Color',
					id: 'falseColor',
					default: '#444444',
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
					const res = await request('http://' + 'localhost' + ':' + '4647' + '/live')
					if (res.response?.statusCode !== 200) return {}

					const state = res.response?.body === 'true' ? true : false

					const change: any = {}

					if (state && feedback.options.trueColor) {
						change['color'] = feedback.options.trueColor
					}
					if (state && feedback.options.trueBgColor) {
						change['background-color'] = feedback.options.trueBgColor
					}
					if (!state && feedback.options.falseColor) {
						change['color'] = feedback.options.falseColor
					}
					if (!state && feedback.options.falseBgColor) {
						change['background-color'] = feedback.options.falseBgColor
					}
					if (state) {
						change['text'] = 'ON'
					}
					if (!state) {
						change['text'] = 'OFF'
					}

					return change
				} catch (e) {
					// Image failed to load so log it and output nothing
					self.log('error', `Failed to fetch image: ${e}`)

					return {}
				}
			},
		},
	})
}
