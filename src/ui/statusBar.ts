import * as vscode from 'vscode';

export class StatusBarManager {
    private statusBarItem: vscode.StatusBarItem;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        this.setupStatusBar();
    }

    private setupStatusBar(): void {
        this.statusBarItem.command = 'incrementar_contador';
        this.statusBarItem.tooltip = 'Click para incrementar contador';
        this.statusBarItem.text = 'Contador: 0';
        this.statusBarItem.show();
    }

    public getStatusBarItem(): vscode.StatusBarItem {
        return this.statusBarItem;
    }

    public updateText(text: string): void {
        this.statusBarItem.text = text;
    }

    public register(context: vscode.ExtensionContext): void {
        context.subscriptions.push(this.statusBarItem);
    }
}
