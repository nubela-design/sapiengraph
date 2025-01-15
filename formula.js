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
                    name: 'Person Formulas',
                    rowCount: 100,
                    columnCount: 20,
                    cellData: {
                        0: { // Row 1 (0-based index)
                            0: { // Column A
                                v: 'Person Lookup',
                                t: 0,
                                s: { bl: 1, fs: 12 }
                            },
                            1: { // Column B
                                v: 'Role Lookup',
                                t: 0,
                                s: { bl: 1, fs: 12 }
                            },
                            2: { // Column C
                                v: 'Person Profile Enrichment',
                                t: 0,
                                s: { bl: 1, fs: 12 }
                            },
                        },
                        1: { // Row 2
                            0: { v: 'Bill Gates', t: 0 },
                            1: { // Column B
                                v: 'https://www.linkedin.com/in/williamhgates',
                                t: 0,
                                s: { ul: 1, cl: '#0563C1' } // Underlined and blue color for URL
                            },
                            2: { v: 'John', t: 0 }
                        },
                        2: { // Row 3
                            0: { v: 'gatesfoundation.org', t: 0 }
                        },
                        3: { // Row 4
                            0: { v: 'Seattle', t: 0 }
                        },
                        4: { // Row 5
                            0: { v: 'Co-chair', t: 0 }
                        }
                    },
                    columnData: {
                        0: { w: 300 }, // Column A width
                        1: { w: 300 }, // Column B width
                        2: { w: 300 }, // Column C width
                        3: { w: 300 }, // Column D width
                        4: { w: 300 }  // Column E width
                    }
                }
            }
        });

        console.log('Sheet initialized successfully');
    } catch (error) {
        console.error('Error initializing sheet:', error);
    }
});