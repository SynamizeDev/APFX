export const WIDGET_SCRIPT_URL = 'https://app.apfxglobal.com/widget.js';

export async function loadCTraderWidgetScript(): Promise<void> {
    if (typeof window === 'undefined') {
        return;
    }

    return new Promise((resolve, reject) => {
        const win = window as any;

        const pollForWidget = () => {
            const checkInterval = setInterval(() => {
                if (typeof win.runPlugin !== 'undefined' && typeof win.putInitScript !== 'undefined') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 50);

            setTimeout(() => {
                clearInterval(checkInterval);
                if (typeof win.runPlugin === 'undefined') {
                    console.warn('cTrader widget functions failed to initialize after timeout. Gracefully aborting widget render.');
                    resolve(); // Resolve anyway to allow graceful failure downstream
                }
            }, 10000);
        };

        // Check if script is already injected
        const existingScript = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
        
        if (existingScript) {
            if (typeof win.runPlugin !== 'undefined' && typeof win.putInitScript !== 'undefined') {
                resolve();
            } else {
                pollForWidget();
            }
            return;
        }

        const script = document.createElement('script');
        script.src = WIDGET_SCRIPT_URL;
        script.type = 'text/javascript';
        script.async = true;

        script.onload = pollForWidget;
        script.onerror = (error) => reject(new Error(`Failed to load cTrader script`));

        document.head.appendChild(script);
    });
}
