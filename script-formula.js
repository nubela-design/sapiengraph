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
                            0: { v: 'Enrich person\'s profile data', t: 0 },
                            1: { // Column B
                                v: 'Enrich person\'s by company\'s role',
                                t: 0,
                                s: { ul: 1, cl: '#0563C1' } // Underlined and blue color for URL
                            },
                            2: { v: 'Enrich person\'s by profile URL and attribute', t: 0 }
                        },
                        2: { // Row 3
                            0: { v: 'Enrich person\'s by company', t: 0 }
                        },
                        3: { // Row 4
                            0: { v: 'Enrich person\'s by location', t: 0 }
                        },
                        4: { // Row 5
                            0: { v: 'Enrich person\'s by role', t: 0 }
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

        // Add event listener for all Apply buttons
        document.querySelectorAll('.apply-formula').forEach(button => {
            button.addEventListener('click', function() {
                try {
                    const formula = this.getAttribute('data-formula');
                    const workbook = univerAPI.getWorkbook('workbook1');
                    const worksheet = workbook.getSheet('sheet1');
                    
                    // Get the command service
                    const commandService = univerAPI.getCommandService();
                    
                    // Execute the set value command
                    commandService.executeCommand('sheet.command.set-cell-value', {
                        value: formula,
                        row: 1,    // Row 2 (0-based)
                        col: 0,    // Column A (0-based)
                    });
                    
                    // Hide any popovers that might be open
                    hidePopovers();
                } catch (error) {
                    console.error('Error applying formula:', error);
                }
            });
        });

        console.log('Sheet initialized successfully');
    } catch (error) {
        console.error('Error initializing sheet:', error);
    }
});