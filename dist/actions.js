"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActions = void 0;
function UpdateActions(self) {
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
    });
}
exports.UpdateActions = UpdateActions;
//# sourceMappingURL=actions.js.map