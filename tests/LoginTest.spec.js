const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {

        await page.goto('https://helsi.pro/');
        await page.waitForTimeout(2000);

        await page.fill('#email', 'Lesivnb59@ukr.net');
        await page.fill('#usercreds', '0803trockiy1992');
        await page.waitForTimeout(2000);
        await page.click('input[type="submit"][value="Увійти"]');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);


        async function performActions(page) {

            await page.goto('https://helsi.pro/doctor/95e4ecac-0072-44a2-89ba-91fd222f1918/patients/declaration', { waitUntil: 'networkidle' });
            await page.waitForTimeout(1000);


            try {
                const filterButton = await page.waitForSelector('button:has-text("Фільтри (1)")', { timeout: 30000 });
                await filterButton.click();
                console.log('Фильтр открыт');
            } catch (error) {
                console.error('Ошибка при открытии фильтра:', error);
                return;
            }

            await page.waitForTimeout(2000);

            try {
                const dropdownIndicator = await page.locator('div.Select__dropdown-indicator').nth(2);
                await dropdownIndicator.scrollIntoViewIfNeeded();
                await dropdownIndicator.click();
                console.log('Выпадающий список открыт');

                const option = await page.locator('text=дані відсутні');
                await option.click();
                console.log('Элемент "дані відсутні" выбран');

                const applyButton = await page.locator('button.btn.btn-info', { hasText: 'Застосувати' });
                await applyButton.click();
                console.log('Кнопка "Застосувати" нажата');
            } catch (error) {
                console.error('Ошибка при выборе элемента или кнопки:', error);
                return;
            }
            await page.waitForTimeout(2000);

            try {
                // const firstRow = await page.locator('tbody.ant-table-tbody tr.ant-table-row').first();
                const firstRow = await page.locator('tbody.ant-table-tbody tr.ant-table-row').nth(1);
                await firstRow.scrollIntoViewIfNeeded();
                await firstRow.click();
                console.log('Первая строка таблицы выбрана');

                const fullNameLink = await firstRow.locator('div.fullName a');
                await fullNameLink.click();
                console.log('Ссылка с именем выбрана');
            } catch (error) {
                console.error('Ошибка при выборе строки таблицы или ссылки:', error);
                return;
            }
            await page.waitForTimeout(2000);

            try {
                const profileButton = await page.locator('span.ant-menu-title-content >> text="Профіль"');
                await profileButton.click();
                console.log('Кнопка "Профіль" нажата');
            } catch (error) {
                console.error('Ошибка при нажатии кнопки "Профіль":', error);
                return;
            }
            await page.waitForTimeout(2000);

            try {
                await page.waitForSelector('a.verification-container-link', { state: 'visible' });
                const blankLink = await page.locator('a.verification-container-link >> text="Бланк"');
                await blankLink.click();
                console.log('Ссылка "Бланк" нажата');
            } catch (error) {
                console.error('Ошибка при ожидании или нажатии на ссылку "Бланк":', error);
                return;
            }

            try {
                await page.waitForSelector('button#savePatientWithVerificate', { state: 'visible' });
                const confirmButton = await page.locator('button#savePatientWithVerificate');
                await confirmButton.click();
                console.log('Кнопка "Підтвердити" нажата');
            } catch (error) {
                console.error('Ошибка при ожидании или нажатии кнопки "Підтвердити":', error);
                return;
            }

            await page.waitForTimeout(3000);
        }

        const numberOfIterations = 9999; // Количество итераций, если требуется повторение
        for (let i = 0; i < numberOfIterations; i++) {
            await performActions(page);
        }

        await page.waitForTimeout(1000);

    } catch (error) {
        console.error('Ошибка при выполнении теста:', error);
    } finally {
        await browser.close();
    }
})();

