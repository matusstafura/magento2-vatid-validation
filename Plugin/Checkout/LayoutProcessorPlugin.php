<?php
declare(strict_types=1);

namespace MatusStafura\VatIdValidation\Plugin\Checkout;

use Magento\Checkout\Block\Checkout\LayoutProcessor;

class LayoutProcessorPlugin
{
    /**
     * @param LayoutProcessor $subject
     * @param array $result
     * @return array
     */
    public function afterProcess(
        LayoutProcessor $subject,
        array $result
    ): array {
        // Extend Shipping Address Fields
        if (isset(
            $result['components']['checkout']['children']['steps']
            ['children']['shipping-step']['children']['shippingAddress']['children']
            ['shipping-address-fieldset']['children']
        )) {
            $shippingFields = &$result['components']['checkout']['children']['steps']
                ['children']['shipping-step']['children']['shippingAddress']['children']
                ['shipping-address-fieldset']['children'];

            $this->extendAddressFields($shippingFields);
        }

        // Extend Billing Address Fields
        if (isset(
            $result['components']['checkout']['children']['steps']
            ['children']['billing-step']['children']['payment']['children']
            ['afterMethods']['children']['billing-address-form']['children']
            ['form-fields']['children']
        )) {
            $billingFields = &$result['components']['checkout']['children']['steps']
                ['children']['billing-step']['children']['payment']['children']
                ['afterMethods']['children']['billing-address-form']['children']
                ['form-fields']['children'];

            $this->extendAddressFields($billingFields);
        }

        return $result;
    }

    /**
     * Extend address fields with custom validation
     *
     * @param array $fields
     */
    protected function extendAddressFields(array &$fields): void
    {
        if (isset($fields['vat_id'])) {
            $fields['vat_id']['validation']['vat_id_validation'] = true;
        }
    }
}
