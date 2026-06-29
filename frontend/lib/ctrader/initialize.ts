import { loadCTraderWidgetScript } from './loader';

export interface CTraderWidgetConfig {
    containerId: string;
    route: string;
    theme?: 'light' | 'dark';
    language?: string;
    appConfig?: Record<string, any>;
}

declare global {
    interface Window {
        putInitScript?: (action: string) => void;
        runPlugin?: (id: string, config: any) => void;
    }
}

/**
 * Initializes a cTrader widget in the specified container.
 * Loads the script if not already present.
 */
export async function initializeWidget(config: CTraderWidgetConfig): Promise<void> {
    try {
        await loadCTraderWidgetScript();
        
        const win = window as any;
        if (win.putInitScript && win.runPlugin) {
            // Inform the widget system that a plugin is being initialized
            win.putInitScript('runPlugin');
            
            // Execute the plugin in the targeted container
            win.runPlugin(config.containerId, {
                route: config.route,
                appConfig: config.appConfig || {}
            });
        } else {
            console.error('cTrader widget functions (runPlugin, putInitScript) not found on window object.', {
                putInitScript: typeof win.putInitScript,
                runPlugin: typeof win.runPlugin
            });
        }
    } catch (error) {
        console.error('Error initializing cTrader widget:', error);
    }
}
