import * as vscode from 'vscode';
import { CounterCommand } from './commands/counter';
import { DateCommand } from './commands/dateCommand';
import { StatusBarManager } from './ui/statusBar';
import { ShowGif } from './ui/Gifts';

// La funcion activate se llama cuando la extensión es activada
export function activate(context: vscode.ExtensionContext) {
	// Inicializar la barra de estado
	const statusBarManager = new StatusBarManager();
	statusBarManager.register(context);

	// Inicializar el comando del contador
	const counterCommand = new CounterCommand(statusBarManager.getStatusBarItem());
	counterCommand.registerCommand(context);

	// Registrar el comando de fecha
	DateCommand.registerCommand(context);

	// Inicializar la clase gifts
	const gifts = new ShowGif(context);
	gifts.registerCommand(context);
	
	// Mostrar el GIF automáticamente al iniciar
	gifts.autoShow();
}

// Esta función se llama cuando la extensión es desactivada
export function deactivate() {}
