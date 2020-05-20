// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { BundlerProvider } from './bundler/bundlerProvider';
import { registerTerminalCommand } from './ui/terminalUtils';
import { createDependencyTreeview } from './ui/dependencyTreeView';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
  const config = vscode.workspace.getConfiguration('bundler');
  const bundlerPath = config.get('bundlerPath');
  const bundlerProvider = new BundlerProvider(context);

  registerTerminalCommand(
    context,
    'bundler.bundleInstall',
    `${bundlerPath} install`,
  );
  registerTerminalCommand(
    context,
    'bundler.bundleOutdated',
    `${bundlerPath} outdated`,
  );

  const reloadCommand = vscode.commands.registerCommand(
    'bundler.reloadDependencies',
    () => bundlerProvider.reload(),
  );
  context.subscriptions.push(reloadCommand);

  const treeView = createDependencyTreeview(bundlerProvider);
  context.subscriptions.push(treeView);

  bundlerProvider.init();
}

// this method is called when your extension is deactivated
export function deactivate(): void {}
