import * as vscode from 'vscode';

let count: number = 0;

export class CounterCommand {
    private statusBarItem: vscode.StatusBarItem;
    
    constructor(statusBarItem: vscode.StatusBarItem) {
        this.statusBarItem = statusBarItem;
    }

    public increment(): void {
        count++;
        this.updateStatusBar();
    }

    public getCount(): number {
        return count;
    }

    public reset(): void {
        count = 0;
        this.updateStatusBar();
    }

    private updateStatusBar(): void {
        this.statusBarItem.text = `Contador: ${count}`;
    }

    public registerCommand(context: vscode.ExtensionContext): void {
        const incrementCounter = vscode.commands.registerCommand('incrementar_contador', () => {
            this.increment();
        });

        const resetCounter = vscode.commands.registerCommand('resetear_contador', () => {
            this.reset();
            vscode.window.showInformationMessage('Contador reseteado');
        });

        context.subscriptions.push(incrementCounter);
        context.subscriptions.push(resetCounter);
    }
}
