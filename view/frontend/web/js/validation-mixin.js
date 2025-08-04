define(['jquery', 'mage/translate'], function ($) {
    'use strict';

    return function (validator) {
        const vatPatterns = {
            AT: /^ATU\d{8}$/,
            BE: /^BE0?\d{9}$/,
            BG: /^BG\d{9,10}$/,
            HR: /^HR\d{11}$/,
            CY: /^CY\d{8}[A-Z]$/,
            CZ: /^CZ\d{8,10}$/,
            DK: /^DK\d{8}$/,
            EE: /^EE\d{9}$/,
            FI: /^FI\d{8}$/,
            FR: /^FR[A-HJ-NP-Z0-9]{2}\d{9}$/,
            DE: /^DE\d{9}$/,
            EL: /^EL\d{9}$/,
            HU: /^HU\d{8}$/,
            IE: /^IE\d{7}[A-W][A-I0-9]?$/,
            IT: /^IT\d{11}$/,
            LV: /^LV\d{11}$/,
            LT: /^LT(\d{9}|\d{12})$/,
            LU: /^LU\d{8}$/,
            MT: /^MT\d{8}$/,
            NL: /^NL\d{9}B\d{2}$/,
            PL: /^PL\d{10}$/,
            PT: /^PT\d{9}$/,
            RO: /^RO\d{2,10}$/,
            SK: /^SK\d{10}$/,
            SI: /^SI\d{8}$/,
            ES: /^ES[A-Z0-9]\d{7}[A-Z0-9]$/,
            SE: /^SE\d{12}$/
        };

        const vatFormats = {
            AT: ['ATU12345678'],
            BE: ['BE0123456789'],
            BG: ['BG123456789', 'BG1234567890'],
            HR: ['HR12345678901'],
            CY: ['CY12345678X'],
            CZ: ['CZ12345678', 'CZ1234567890'],
            DK: ['DK12345678'],
            EE: ['EE123456789'],
            FI: ['FI12345678'],
            FR: ['FRXX123456789'],
            DE: ['DE123456789'],
            EL: ['EL123456789'],
            HU: ['HU12345678'],
            IE: ['IE1234567X'],
            IT: ['IT12345678901'],
            LV: ['LV12345678901'],
            LT: ['LT123456789', 'LT123456789012'],
            LU: ['LU12345678'],
            MT: ['MT12345678'],
            NL: ['NL123456789B01'],
            PL: ['PL1234567890'],
            PT: ['PT123456789'],
            RO: ['RO1234567890'],
            SK: ['SK1234567890'],
            SI: ['SI12345678'],
            ES: ['ESA1234567Z'],
            SE: ['SE123456789012']
        };

        validator.addRule(
            'vat_id_validation',
            function (value) {
                const isEnabled = window.checkoutConfig.vatIdValidation === true;

                if (!isEnabled) {
                    return true;
                }

                if (value === '') return true;

                const country = $('select[name="country_id"]').val();

                if (country && vatPatterns[country]) {
                    return vatPatterns[country].test(value);
                }

                return true;
            },
            function () {
                const country = $('select[name="country_id"]').val();

                if (country && vatFormats[country]) {
                    return $.mage.__('Enter VAT number in format: %1')
                        .replace('%1', vatFormats[country].join(', '));
                }

                return $.mage.__('Enter a valid VAT number.');
            }
        );

        // Revalidate on country change
        $(function () {
            $(document).on('change', 'select[name="country_id"]', function () {
                const vatInput = $('input[name="vat_id"]');
                if (vatInput.length && vatInput.valid) {
                    vatInput.valid();
                }
            });
        });

        return validator;
    };
});
