import { expect, test } from '@playwright/test';

test.describe('Mobile Viewport Overflow Detection', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should not have horizontal scroll on mobile', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        const hasHorizontalScroll = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
        });

        const viewportInfo = await page.evaluate(() => ({
            windowWidth: window.innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            bodyWidth: document.body.scrollWidth,
            overflow: document.documentElement.scrollWidth - window.innerWidth,
        }));

        console.log('Viewport Info:', viewportInfo);

        if (hasHorizontalScroll) {
            const culprits = await page.evaluate(() => {
                const suspects: Array<{
                    tag: string;
                    id: string;
                    classes: string;
                    width: number;
                    right: number;
                    overflow: number;
                }> = [];

                const allElements = document.querySelectorAll('*');
                const viewportWidth = window.innerWidth;

                allElements.forEach(el => {
                    const rect = el.getBoundingClientRect();

                    if (rect.right > viewportWidth + 5) {
                        suspects.push({
                            tag: el.tagName,
                            id: el.id || '',
                            classes: el.className || '',
                            width: Math.round(rect.width),
                            right: Math.round(rect.right),
                            overflow: Math.round(rect.right - viewportWidth),
                        });
                    }
                });

                return suspects;
            });

            console.log('Overflow elements:', culprits);
        }

        expect(hasHorizontalScroll).toBe(false);
    });

    test('should have correct viewport meta tag', async ({ page }) => {
        const viewportMeta = await page.evaluate(() => {
            const meta = document.querySelector('meta[name="viewport"]');
            return meta ? meta.getAttribute('content') : null;
        });

        expect(viewportMeta).toBeTruthy();
        expect(viewportMeta).toContain('width=device-width');
    });

    test('should have overflow-x hidden on html and body', async ({ page }) => {
        const overflowSettings = await page.evaluate(() => {
            const htmlStyle = window.getComputedStyle(document.documentElement);
            const bodyStyle = window.getComputedStyle(document.body);

            return {
                html: {
                    overflowX: htmlStyle.overflowX,
                    maxWidth: htmlStyle.maxWidth,
                    boxSizing: htmlStyle.boxSizing,
                },
                body: {
                    overflowX: bodyStyle.overflowX,
                    maxWidth: bodyStyle.maxWidth,
                    boxSizing: bodyStyle.boxSizing,
                }
            };
        });

        expect(overflowSettings.html.overflowX).toBe('hidden');
        expect(overflowSettings.body.overflowX).toBe('hidden');
    });

    test('should not have elements with w-screen class', async ({ page }) => {
        const wScreenElements = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('[class*="w-screen"]'));
            return elements.map(el => ({
                tag: el.tagName,
                classes: el.className,
            }));
        });

        expect(wScreenElements.length).toBe(0);
    });

    test('visual regression - screenshot mobile homepage', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot('mobile-homepage.png', {
            fullPage: true,
            maxDiffPixels: 100,
        });
    });

    test('should check all sections for overflow', async ({ page }) => {

        const sections = [
            { name: 'Hero', selector: 'section:first-of-type' },
            { name: 'Skills', selector: 'section#habilidades' },
            { name: 'Projects', selector: 'section#projetos' },
            { name: 'About', selector: 'section#sobre' },
            { name: 'Contact', selector: 'section#contato' },
        ];

        for (const section of sections) {
            const hasOverflow = await page.evaluate((sel) => {
                const element = document.querySelector(sel);
                if (!element) return { found: false };

                const rect = element.getBoundingClientRect();
                const overflow = rect.right > window.innerWidth;

                return {
                    found: true,
                    overflow,
                    width: Math.round(rect.width),
                    right: Math.round(rect.right),
                    viewportWidth: window.innerWidth,
                };
            }, section.selector);

            if (hasOverflow.found) {
                expect(hasOverflow.overflow).toBe(false);
            }
        }
    });
});
