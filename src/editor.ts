import * as vscode from "vscode";
import { generateHTML } from "./html";
import { parsePPM } from "./parse";

export const VIEW_TYPE = "simple-ppm-viewer.imagepreview";

class PreviewDocument
    extends vscode.Disposable
    implements vscode.CustomDocument
{
    readonly uri: vscode.Uri;
    readonly data: string;

    static async create(uri: vscode.Uri) {
        const fileData = await PreviewDocument.readFile(uri);
        return new PreviewDocument(uri, fileData);
    }

    private constructor(uri: vscode.Uri, data: string) {
        super(() => {});
        this.uri = uri;
        this.data = data;
    }
    private static async readFile(uri: vscode.Uri) {
        const handle = await vscode.workspace.openTextDocument(uri);
        return handle.getText();
    }

    dispose() {
        super.dispose();
    }
}

export class PreviewProvider
    implements vscode.CustomReadonlyEditorProvider<PreviewDocument>
{
    constructor(private readonly _context: vscode.ExtensionContext) {}
    async openCustomDocument(
        uri: vscode.Uri,
        _openContext: {},
        _token: vscode.CancellationToken
    ): Promise<PreviewDocument> {
        const doc = await PreviewDocument.create(uri);
        return doc;
    }

    async resolveCustomEditor(
        document: PreviewDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ) {
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        try {
            const imageData = parsePPM(document.data);
            webviewPanel.webview.html = generateHTML(imageData);
        } catch (err: any) {
            vscode.window.showErrorMessage(err.message);
            webviewPanel.webview.html = "ERROR❌: " + err.message;
        }
    }
}
