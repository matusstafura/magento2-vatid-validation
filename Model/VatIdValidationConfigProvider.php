<?php

namespace MatusStafura\VatIdValidation\Model;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;

class VatIdValidationConfigProvider implements ConfigProviderInterface
{
    const XML_PATH_ENABLED = 'customer/vatid_validation/enabled';

    protected ScopeConfigInterface $scopeConfig;

    public function __construct(ScopeConfigInterface $scopeConfig)
    {
        $this->scopeConfig = $scopeConfig;
    }

    public function getConfig(): array
    {
        return [
            'vatIdValidation' => $this->scopeConfig->isSetFlag(self::XML_PATH_ENABLED)
        ];
    }
}