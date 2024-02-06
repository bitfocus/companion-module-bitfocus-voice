"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTPInstance = void 0;
const base_1 = require("@companion-module/base");
const actions_1 = require("./actions");
const config_1 = require("./config");
const variables_1 = require("./variables");
class SMTPInstance extends base_1.InstanceBase {
    config;
    status;
    constructor(internal) {
        super(internal);
        this.config = {
            host: '',
            port: 4647,
        };
        this.status = '';
    }
    /**
     * Main initialization function called once the module
     * is OK to start doing things.
     */
    async init(config) {
        this.updateStatus(base_1.InstanceStatus.Connecting);
        this.config = config;
        this.updateStatus(base_1.InstanceStatus.Ok);
        this.status = base_1.InstanceStatus.Ok;
        this.updateActions();
        this.updateVariableDefinitions();
        return Promise.resolve();
    }
    /**
     * Process an updated configuration array.
     */
    async configUpdated(config) {
        this.config = config;
        return Promise.resolve();
    }
    /**
     * Creates the configuration fields for web config.
     */
    getConfigFields() {
        return (0, config_1.GetConfigFields)();
    }
    /**
     * Clean up the instance before it is destroyed.
     */
    async destroy() {
        this.log('debug', `destroy ${this.id}`);
        return Promise.resolve();
    }
    updateActions() {
        (0, actions_1.UpdateActions)(this);
    }
    updateVariableDefinitions() {
        (0, variables_1.UpdateVariableDefinitions)(this);
    }
    async setLiveMode(state) {
        this.log('debug', `set live moe: ${state}`);
        // request
        const res = await request('/live/' + state ? 'on' : 'off', {
            host: this.config.host,
            port: this.config.port,
        });
        if (res. !== 200) {
            this.log('error', `Failed to set live mode: ${res.statusCode}`);
        }
    }
}
exports.SMTPInstance = SMTPInstance;
(0, base_1.runEntrypoint)(SMTPInstance, []);
//# sourceMappingURL=index.js.map