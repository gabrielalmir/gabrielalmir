import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'list',

    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'mobile-412px',
            use: {
                ...devices['Pixel 5'],
                viewport: { width: 412, height: 915 },
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
            },
        },
        {
            name: 'mobile-540px',
            use: {
                ...devices['Pixel 5'],
                viewport: { width: 540, height: 720 },
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
            },
        },
    ],

    webServer: {
        command: 'bun run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});
