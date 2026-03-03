/**
 * script.js
 * Handles updating of dynamic time elements based on user locale and standard ISO 8601 formatting.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const timeWidgetText = document.getElementById('current-time');
    const isoTimeText = document.getElementById('iso-time');
    const yearText = document.getElementById('year');
    
    // Set Footer Year
    const currentFullYear = new Date().getFullYear();
    if(yearText) yearText.textContent = currentFullYear;

    /**
     * Updates the time widget with formatted sleek time
     * Update the floating card with exact ISO format string
     */
    function updateTime() {
        const now = new Date();
        
        // 1. Sleek human-readable format for the top nav widget (e.g. "Mar 03, 10:35 AM")
        const options = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        // We use sv-SE for a cleaner locale string format base or just standard en-US format
        let sleekTime = now.toLocaleString('en-US', options);
        if(timeWidgetText) {
            timeWidgetText.textContent = sleekTime;
        }

        // 2. Format exact ISO string maintaining local offset (e.g., 2026-03-03T10:35:00+08:00)
        // Since JS doesn't have a built-in "local ISO with offset" we format it manually
        const pad = (num) => num.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
        
        const tzOffset = -now.getTimezoneOffset(); // in minutes
        const diff = tzOffset >= 0 ? '+' : '-';
        const absOffset = Math.abs(tzOffset);
        const tzHours = pad(Math.floor(absOffset / 60));
        const tzMinutes = pad(absOffset % 60);

        const isoFormat = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${diff}${tzHours}:${tzMinutes}`;
        if(isoTimeText) {
            isoTimeText.textContent = isoFormat;
        }
    }

    // Initialize immediately
    updateTime();

    // Update time every second
    setInterval(updateTime, 1000);

});
