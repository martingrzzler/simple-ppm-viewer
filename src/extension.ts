import * as vscode from "vscode";
import { PreviewProvider, VIEW_TYPE } from "./editor";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.window.registerCustomEditorProvider(
        VIEW_TYPE,
        new PreviewProvider(context),
        {
            supportsMultipleEditorsPerDocument: false,
        }
    );
    context.subscriptions.push(disposable);
}

export function deactivate() {}
