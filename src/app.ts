interface MessageTemplate {
    name: string,
    message: string;
}

class ErrorBug {
    private readonly name: string;

    private templates: MessageTemplate[] = [];

    constructor(name: string, templates?: MessageTemplate[]) {
        this.name = name;
        if(templates) templates.forEach((template) => this.addTemplate(template));
    }

    private getReplaceStr(replace: ({ [key: string]: string } | string[]), msg: string): string {
        if(Array.isArray(replace)) replace.forEach((arg, i) => { msg = msg.replace(`{${i}}`, arg); });
        else for(const key in replace) msg = msg.replace(`{${key}}`, replace[key]);
        return msg;
    }

    addTemplate(template: MessageTemplate): void {
        this.templates.push(template);
    }

    log(name: string, replace?: { [key: string]: string } | string[], log = true): string {
        const template = this.templates.find(t => t.name === name);
        if(template) {
            const str: string = replace ? this.getReplaceStr(replace, template.message) : template.message,
                msg = `${this.name}: ${str}`;
            if(log) dl.errorInProd(msg);
            return msg;
        }

        const msg = `Error Bug: Try use undefined template "${name}"`;
        throw new Error(msg);
    }

    error(name: string, replace?: { [key: string]: string } | string[], log = false): void {
        const msg = this.log(name, replace, log);
        throw new Error(msg);
    }
}

export default ErrorBug;