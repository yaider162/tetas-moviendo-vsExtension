import * as vscode from 'vscode';
import * as path from 'path';

// Clase que muestra un GIF como overlay flotante en el editor
export class ShowGif {
  private panel: vscode.WebviewPanel | undefined;

  constructor(private context: vscode.ExtensionContext) {}

  public showAsOverlay() {
    try {
      if (this.panel) {
        return; // Ya está mostrado
      }

      // Crear un webview que aparezca en la columna activa pero como overlay
      this.panel = vscode.window.createWebviewPanel(
        'gifOverlay',
        '', // Sin título para que sea más discreto
        { viewColumn: vscode.ViewColumn.Active, preserveFocus: true }, // preserveFocus mantiene el foco en el editor
        {
          enableScripts: true,
          localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'src', 'media'))],
          retainContextWhenHidden: true
        }
      );

      const gifPath = vscode.Uri.file(
        path.join(this.context.extensionPath, 'src', 'media', 'gato.gif')
      );
      const gifSrc = this.panel.webview.asWebviewUri(gifPath);

      this.panel.webview.html = this.getOverlayContent(gifSrc);

      // Auto-cerrar después de unos segundos (opcional)
      // setTimeout(() => {
      //   if (this.panel) {
      //     this.panel.dispose();
      //   }
      // }, 10000); // 10 segundos

      this.panel.onDidDispose(() => {
        this.panel = undefined;
      });

    } catch (error) {
      console.error('Error al mostrar GIF overlay:', error);
    }
  }

  private getOverlayContent(gifSrc: vscode.Uri): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            background: transparent;
            overflow: hidden;
            pointer-events: none; /* Permite hacer click a través del overlay */
          }
          .gif-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            pointer-events: auto; /* Solo el GIF es clickeable */
            background: rgba(0,0,0,0.1);
            border-radius: 10px;
            padding: 5px;
            backdrop-filter: blur(2px);
          }
          img {
            width: 120px;
            height: auto;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s ease;
          }
          img:hover {
            transform: scale(1.1);
          }
          .close-btn {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        </style>
      </head>
      <body>
        <div class="gif-container">
          <button class="close-btn" onclick="closeOverlay()">×</button>
          <img src="${gifSrc}" alt="Gato animado" onclick="toggleSize()" />
        </div>
        
        <script>
          function closeOverlay() {
            // Enviar mensaje a la extensión para cerrar
            window.close();
          }
          
          function toggleSize() {
            const img = document.querySelector('img');
            if (img.style.width === '200px') {
              img.style.width = '120px';
            } else {
              img.style.width = '200px';
            }
          }
        </script>
      </body>
      </html>
    `;
  }

  public registerCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('show_gif', () => {
      this.showAsOverlay();
    });
    context.subscriptions.push(disposable);
  }

  // Método para mostrar automáticamente al iniciar
  public autoShow() {
    // Pequeño delay para que VS Code termine de cargar
    setTimeout(() => {
      this.showAsOverlay();
    }, 2000); // 2 segundos después del inicio
  }
}
