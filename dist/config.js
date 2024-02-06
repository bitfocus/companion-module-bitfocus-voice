"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConfigFields = void 0;
function GetConfigFields() {
    return [
        {
            type: 'textinput',
            id: 'host',
            label: 'SMTP Server',
            width: 12,
        },
        {
            type: 'number',
            id: 'port',
            label: 'Port',
            default: 465,
            min: 1,
            max: 65535,
            width: 10,
        },
        {
            type: 'checkbox',
            id: 'secure',
            label: 'Secure',
            default: true,
            width: 1,
        },
        {
            type: 'textinput',
            id: 'name',
            label: 'Name of sender',
            width: 12,
        },
        {
            type: 'textinput',
            id: 'user',
            label: 'Address',
            width: 6,
        },
        {
            type: 'textinput',
            id: 'password',
            label: 'Password',
            width: 6,
        },
    ];
}
exports.GetConfigFields = GetConfigFields;
//# sourceMappingURL=config.js.map