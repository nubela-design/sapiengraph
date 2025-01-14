// Initialize Univer when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        const { createUniver } = UniverPresets;
        const { LocaleType } = UniverCore;
        const { defaultTheme } = UniverDesign;
        const { UniverSheetsCorePreset } = UniverPresetSheetsCore;

        const { univerAPI } = createUniver({
            locale: LocaleType.EN_US,
            locales: {
                [LocaleType.EN_US]: UniverPresetSheetsCoreEnUS,
            },
            theme: defaultTheme,
            presets: [
                UniverSheetsCorePreset({
                    container: 'univerContainer',
                }),
            ],
        });

        // Create workbook with initial data
        univerAPI.createUniverSheet({
            id: 'workbook1',
            name: 'My Workbook',
            sheetOrder: ['sheet1'],
            sheets: {
                sheet1: {
                    id: 'sheet1',
                    name: 'Sheet 1',
                    rowCount: 100,
                    columnCount: 20
                }
            }
        });

        console.log('Sheet initialized successfully');
    } catch (error) {
        console.error('Error initializing sheet:', error);
    }
});