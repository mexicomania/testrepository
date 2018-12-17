<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class LoginStatus extends Enum
{
    const Off = 0;
    const On = 1;
    const Idle = 2;
}
