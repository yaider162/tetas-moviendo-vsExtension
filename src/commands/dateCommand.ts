import * as vscode from 'vscode';

export class DateCommand {
    public static registerCommand(context: vscode.ExtensionContext): void {
        const disposable = vscode.commands.registerCommand('prueba', () => {
            const date = new Date();
            vscode.window.showInformationMessage('Hoy es ' + date.toLocaleDateString());
        });
        context.subscriptions.push(disposable);
    }
}
